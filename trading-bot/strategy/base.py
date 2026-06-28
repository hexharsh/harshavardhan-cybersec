from abc import ABC, abstractmethod
import pandas as pd


class BaseStrategy(ABC):
    name: str = "base"

    @abstractmethod
    def generate_signal(self, symbol: str, df: pd.DataFrame) -> dict:
        """
        Returns a signal dict:
        {
            "action":  "BUY" | "SELL" | "HOLD",
            "entry":   float,
            "sl":      float,   # stop-loss price
            "target":  float,
            "reason":  str,
        }
        """
