"""
Historical data loader — fetches OHLCV candles from Upstox API
or reads from local CSV files for offline backtesting.

CSV format expected:
  timestamp,open,high,low,close,volume
  2024-01-02 09:15:00,2450.0,2468.0,2445.0,2462.0,123456
"""
import os
import requests
import pandas as pd
from datetime import date, datetime, timedelta

from config import ACCESS_TOKEN, SYMBOLS


UPSTOX_HIST_URL = "https://api.upstox.com/v2/historical-candle/{instrument_key}/{interval}/{to_date}/{from_date}"

HEADERS = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Accept": "application/json",
}

INTERVAL_MAP = {
    1:  "1minute",
    5:  "5minute",
    15: "15minute",
    30: "30minute",
    60: "60minute",
}


def fetch_from_upstox(symbol: str, interval_min: int,
                      from_date: str, to_date: str) -> pd.DataFrame:
    """
    Fetch historical candles from Upstox API.
    from_date / to_date format: 'YYYY-MM-DD'
    """
    instrument_key = SYMBOLS.get(symbol)
    if not instrument_key:
        raise ValueError(f"Unknown symbol: {symbol}")

    interval = INTERVAL_MAP.get(interval_min, "5minute")
    # Upstox uses URL-encoded instrument key
    encoded_key = instrument_key.replace("|", "%7C")
    url = UPSTOX_HIST_URL.format(
        instrument_key=encoded_key,
        interval=interval,
        to_date=to_date,
        from_date=from_date,
    )
    resp = requests.get(url, headers=HEADERS, timeout=15)
    resp.raise_for_status()
    data = resp.json().get("data", {}).get("candles", [])

    df = pd.DataFrame(data, columns=["timestamp", "open", "high", "low", "close", "volume", "oi"])
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df = df.set_index("timestamp").sort_index()
    df = df[["open", "high", "low", "close", "volume"]].astype(float)
    return df


def load_from_csv(filepath: str) -> pd.DataFrame:
    df = pd.read_csv(filepath, parse_dates=["timestamp"])
    df = df.set_index("timestamp").sort_index()
    df = df[["open", "high", "low", "close", "volume"]].astype(float)
    return df


def load_data(symbol: str, interval_min: int = 5,
              from_date: str = None, to_date: str = None,
              csv_path: str = None) -> pd.DataFrame:
    """
    Unified loader — uses CSV if path provided, else fetches from Upstox.
    Defaults to last 30 days if dates not specified.
    """
    if csv_path:
        print(f"[Loader] Reading {symbol} from {csv_path}")
        return load_from_csv(csv_path)

    to_date   = to_date   or date.today().strftime("%Y-%m-%d")
    from_date = from_date or (date.today() - timedelta(days=30)).strftime("%Y-%m-%d")
    print(f"[Loader] Fetching {symbol} {interval_min}m candles {from_date} → {to_date}")
    return fetch_from_upstox(symbol, interval_min, from_date, to_date)
