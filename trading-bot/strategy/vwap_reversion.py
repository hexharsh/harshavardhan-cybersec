"""
VWAP Reversion Strategy
- BUY when price dips below VWAP and RSI < 40 (oversold, expect bounce).
- SELL when price rises above VWAP and RSI > 60 (overbought, expect fade).
- SL = ATR-based; Target = VWAP ± 0.5×ATR.
"""
import pandas as pd

from strategy.base import BaseStrategy
from data.indicators import vwap, rsi, atr


class VWAPReversionStrategy(BaseStrategy):
    name = "VWAP"

    def generate_signal(self, symbol: str, df: pd.DataFrame) -> dict:
        if len(df) < 15:
            return self._hold("Not enough candles for VWAP")

        vwap_series = vwap(df)
        rsi_series  = rsi(df["close"])
        atr_series  = atr(df)

        price      = df["close"].iloc[-1]
        vwap_val   = vwap_series.iloc[-1]
        rsi_val    = rsi_series.iloc[-1]
        atr_val    = atr_series.iloc[-1]

        if pd.isna(vwap_val) or pd.isna(rsi_val) or pd.isna(atr_val):
            return self._hold("Indicator not ready")

        if price < vwap_val and rsi_val < 40:
            return {
                "action": "BUY",
                "entry":  price,
                "sl":     price - 1.5 * atr_val,
                "target": vwap_val + 0.5 * atr_val,
                "reason": f"Below VWAP {vwap_val:.2f}, RSI={rsi_val:.1f}",
            }

        if price > vwap_val and rsi_val > 60:
            return {
                "action": "SELL",
                "entry":  price,
                "sl":     price + 1.5 * atr_val,
                "target": vwap_val - 0.5 * atr_val,
                "reason": f"Above VWAP {vwap_val:.2f}, RSI={rsi_val:.1f}",
            }

        return self._hold(f"VWAP={vwap_val:.2f}, RSI={rsi_val:.1f} — no edge")

    @staticmethod
    def _hold(reason: str) -> dict:
        return {"action": "HOLD", "entry": 0, "sl": 0, "target": 0, "reason": reason}
