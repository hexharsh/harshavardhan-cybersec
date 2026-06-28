"""
EMA Crossover Strategy (9 EMA / 21 EMA on 5-min candles)
- BUY when EMA9 crosses above EMA21 and price > EMA21 (uptrend confirmation).
- SELL when EMA9 crosses below EMA21 and price < EMA21.
- SL = previous candle low (BUY) / high (SELL); Target = 2× SL distance.
"""
import pandas as pd

from strategy.base import BaseStrategy
from data.indicators import ema, rsi


class EMACrossoverStrategy(BaseStrategy):
    name = "EMA"

    FAST = 9
    SLOW = 21

    def generate_signal(self, symbol: str, df: pd.DataFrame) -> dict:
        if len(df) < self.SLOW + 2:
            return self._hold("Not enough candles for EMA")

        ema_fast = ema(df["close"], self.FAST)
        ema_slow = ema(df["close"], self.SLOW)
        rsi_val  = rsi(df["close"]).iloc[-1]
        price    = df["close"].iloc[-1]

        prev_fast, curr_fast = ema_fast.iloc[-2], ema_fast.iloc[-1]
        prev_slow, curr_slow = ema_slow.iloc[-2], ema_slow.iloc[-1]

        bullish_cross = prev_fast <= prev_slow and curr_fast > curr_slow
        bearish_cross = prev_fast >= prev_slow and curr_fast < curr_slow

        prev_low  = df["low"].iloc[-2]
        prev_high = df["high"].iloc[-2]

        if bullish_cross and price > curr_slow and rsi_val < 70:
            sl     = prev_low
            target = price + 2 * (price - sl)
            return {
                "action": "BUY",
                "entry":  price,
                "sl":     sl,
                "target": target,
                "reason": f"EMA9 crossed above EMA21, RSI={rsi_val:.1f}",
            }

        if bearish_cross and price < curr_slow and rsi_val > 30:
            sl     = prev_high
            target = price - 2 * (sl - price)
            return {
                "action": "SELL",
                "entry":  price,
                "sl":     sl,
                "target": target,
                "reason": f"EMA9 crossed below EMA21, RSI={rsi_val:.1f}",
            }

        return self._hold(
            f"EMA9={curr_fast:.2f}, EMA21={curr_slow:.2f}, RSI={rsi_val:.1f}"
        )

    @staticmethod
    def _hold(reason: str) -> dict:
        return {"action": "HOLD", "entry": 0, "sl": 0, "target": 0, "reason": reason}
