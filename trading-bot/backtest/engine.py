"""
Backtesting engine — replays historical OHLCV candles bar-by-bar through
any BaseStrategy and records every simulated trade.

Supports:
  - Slippage (% of price)
  - Brokerage per order (flat or %)
  - ATR-based or fixed stop-loss / target
  - Intraday square-off at configurable time
"""
from __future__ import annotations

import pandas as pd
from dataclasses import dataclass, field
from datetime import datetime, time as dtime
from typing import Optional

from strategy.base import BaseStrategy


SQUARE_OFF_TIME = dtime(15, 15)
DEFAULT_SLIPPAGE = 0.0005      # 0.05%
DEFAULT_BROKERAGE = 20.0       # INR per order (Upstox flat fee)


@dataclass
class Trade:
    symbol: str
    strategy: str
    action: str                # BUY | SELL
    entry_time: datetime
    entry_price: float
    qty: int
    sl: float
    target: float
    exit_time: Optional[datetime] = None
    exit_price: Optional[float] = None
    exit_reason: str = ""
    pnl: float = 0.0

    @property
    def is_open(self) -> bool:
        return self.exit_time is None

    def close(self, ts: datetime, price: float, reason: str, brokerage: float):
        self.exit_time   = ts
        self.exit_price  = price
        self.exit_reason = reason
        multiplier = 1 if self.action == "BUY" else -1
        gross = multiplier * (price - self.entry_price) * self.qty
        self.pnl = gross - 2 * brokerage   # entry + exit brokerage

    def to_dict(self) -> dict:
        return {
            "symbol":       self.symbol,
            "strategy":     self.strategy,
            "action":       self.action,
            "entry_time":   self.entry_time,
            "entry_price":  self.entry_price,
            "qty":          self.qty,
            "sl":           self.sl,
            "target":       self.target,
            "exit_time":    self.exit_time,
            "exit_price":   self.exit_price,
            "exit_reason":  self.exit_reason,
            "pnl":          round(self.pnl, 2),
        }


class BacktestEngine:
    def __init__(
        self,
        strategy: BaseStrategy,
        capital: float = 100_000,
        risk_pct: float = 0.01,
        slippage: float = DEFAULT_SLIPPAGE,
        brokerage: float = DEFAULT_BROKERAGE,
        max_positions: int = 1,
    ):
        self.strategy      = strategy
        self.capital       = capital
        self.risk_pct      = risk_pct
        self.slippage      = slippage
        self.brokerage     = brokerage
        self.max_positions = max_positions

        self.trades: list[Trade]    = []
        self._open: dict[str, Trade] = {}
        self._equity_curve: list[tuple[datetime, float]] = []
        self._running_capital = capital

    # ------------------------------------------------------------------
    def run(self, symbol: str, df: pd.DataFrame) -> list[Trade]:
        """
        Replay df bar-by-bar.
        df must have columns: open, high, low, close, volume
        and a DatetimeIndex.
        """
        for i in range(2, len(df)):
            window = df.iloc[: i + 1]
            bar    = df.iloc[i]
            ts     = df.index[i]

            # Force square-off at end of day
            if ts.time() >= SQUARE_OFF_TIME and symbol in self._open:
                self._close_trade(symbol, bar["close"], ts, "Square-off")
                continue

            # Check exits for open position
            if symbol in self._open:
                self._check_exit(symbol, bar, ts)
                continue

            # Generate signal on closed bar
            signal = self.strategy.generate_signal(symbol, window)
            if signal["action"] == "HOLD":
                continue

            if len(self._open) >= self.max_positions:
                continue

            self._open_trade(symbol, signal, ts, bar)

        # Close any remaining open trade at last bar close
        if symbol in self._open:
            last_ts    = df.index[-1]
            last_price = df["close"].iloc[-1]
            self._close_trade(symbol, last_price, last_ts, "End of data")

        return self.trades

    # ------------------------------------------------------------------
    def _open_trade(self, symbol: str, signal: dict, ts: datetime, bar: pd.Series):
        entry = signal["entry"] or bar["close"]
        entry = entry * (1 + self.slippage) if signal["action"] == "BUY" \
                else entry * (1 - self.slippage)

        risk_per_unit = abs(entry - signal["sl"]) if signal["sl"] else entry * 0.01
        if risk_per_unit == 0:
            return
        qty = max(1, int((self._running_capital * self.risk_pct) / risk_per_unit))

        trade = Trade(
            symbol=symbol,
            strategy=self.strategy.name,
            action=signal["action"],
            entry_time=ts,
            entry_price=round(entry, 2),
            qty=qty,
            sl=round(signal["sl"], 2),
            target=round(signal["target"], 2),
        )
        self._open[symbol] = trade
        self.trades.append(trade)

    def _check_exit(self, symbol: str, bar: pd.Series, ts: datetime):
        trade = self._open[symbol]
        high, low = bar["high"], bar["low"]

        if trade.action == "BUY":
            if low <= trade.sl:
                self._close_trade(symbol, trade.sl, ts, "Stop-loss")
            elif high >= trade.target:
                self._close_trade(symbol, trade.target, ts, "Target")
        else:
            if high >= trade.sl:
                self._close_trade(symbol, trade.sl, ts, "Stop-loss")
            elif low <= trade.target:
                self._close_trade(symbol, trade.target, ts, "Target")

    def _close_trade(self, symbol: str, price: float, ts: datetime, reason: str):
        trade = self._open.pop(symbol)
        trade.close(ts, round(price, 2), reason, self.brokerage)
        self._running_capital += trade.pnl
        self._equity_curve.append((ts, self._running_capital))

    # ------------------------------------------------------------------
    @property
    def equity_curve(self) -> pd.Series:
        if not self._equity_curve:
            return pd.Series(dtype=float)
        ts, vals = zip(*self._equity_curve)
        return pd.Series(vals, index=ts, name="equity")
