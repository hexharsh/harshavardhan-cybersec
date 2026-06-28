"""
Builds OHLCV candles from raw tick data received via WebSocket.
Each symbol maintains its own rolling candle DataFrame.
"""
from collections import defaultdict
from datetime import datetime
import pandas as pd


class CandleBuilder:
    def __init__(self, interval_minutes: int = 5):
        self.interval = interval_minutes
        # symbol -> list of completed candle dicts
        self._candles: dict[str, list] = defaultdict(list)
        # symbol -> current open candle
        self._current: dict[str, dict] = {}

    def update(self, symbol: str, price: float, volume: int, ts: datetime = None):
        ts = ts or datetime.now()
        bucket = self._bucket(ts)

        if symbol not in self._current or self._current[symbol]["bucket"] != bucket:
            # Close previous candle
            if symbol in self._current:
                self._candles[symbol].append(self._current[symbol])
            # Open new candle
            self._current[symbol] = {
                "bucket": bucket,
                "open": price, "high": price, "low": price,
                "close": price, "volume": volume,
                "timestamp": ts,
            }
        else:
            c = self._current[symbol]
            c["high"]   = max(c["high"], price)
            c["low"]    = min(c["low"],  price)
            c["close"]  = price
            c["volume"] += volume

    def get_df(self, symbol: str) -> pd.DataFrame:
        rows = self._candles[symbol].copy()
        if symbol in self._current:
            rows.append(self._current[symbol])
        if not rows:
            return pd.DataFrame()
        df = pd.DataFrame(rows).set_index("timestamp")
        df.drop(columns=["bucket"], inplace=True)
        return df

    def _bucket(self, ts: datetime) -> datetime:
        minutes = (ts.hour * 60 + ts.minute) // self.interval * self.interval
        return ts.replace(hour=minutes // 60, minute=minutes % 60,
                          second=0, microsecond=0)


candle_builder = CandleBuilder()
