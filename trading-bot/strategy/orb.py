"""
Opening Range Breakout (ORB) Strategy
- Records the high/low of the first 15 minutes (9:15–9:30 IST).
- Generates BUY when price breaks above ORB high with above-average volume.
- Generates SELL when price breaks below ORB low with above-average volume.
- SL = opposite side of the ORB range; Target = 2× the range.
"""
from datetime import time
import pandas as pd

from strategy.base import BaseStrategy
from data.indicators import atr


class ORBStrategy(BaseStrategy):
    name = "ORB"

    def __init__(self):
        self._orb: dict[str, dict] = {}  # symbol -> {high, low, range}

    def generate_signal(self, symbol: str, df: pd.DataFrame) -> dict:
        if df.empty or len(df) < 2:
            return self._hold("Not enough candles")

        self._maybe_set_orb(symbol, df)
        if symbol not in self._orb:
            return self._hold("ORB range not yet established")

        orb     = self._orb[symbol]
        price   = df["close"].iloc[-1]
        avg_vol = df["volume"].mean()
        cur_vol = df["volume"].iloc[-1]
        orb_range = orb["high"] - orb["low"]

        if price > orb["high"] and cur_vol > 1.5 * avg_vol:
            return {
                "action": "BUY",
                "entry":  price,
                "sl":     orb["low"],
                "target": price + 2 * orb_range,
                "reason": f"ORB breakout above {orb['high']:.2f}",
            }

        if price < orb["low"] and cur_vol > 1.5 * avg_vol:
            return {
                "action": "SELL",
                "entry":  price,
                "sl":     orb["high"],
                "target": price - 2 * orb_range,
                "reason": f"ORB breakdown below {orb['low']:.2f}",
            }

        return self._hold("Price inside ORB range")

    def _maybe_set_orb(self, symbol: str, df: pd.DataFrame):
        if symbol in self._orb:
            return
        orb_candles = df[df.index.time <= time(9, 30)]
        if len(orb_candles) >= 2:
            self._orb[symbol] = {
                "high": orb_candles["high"].max(),
                "low":  orb_candles["low"].min(),
            }

    @staticmethod
    def _hold(reason: str) -> dict:
        return {"action": "HOLD", "entry": 0, "sl": 0, "target": 0, "reason": reason}
