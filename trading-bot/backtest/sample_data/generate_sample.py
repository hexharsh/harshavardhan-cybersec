"""
Generates realistic synthetic 5-min OHLCV candles for offline testing.
Run once: python backtest/sample_data/generate_sample.py
Creates: backtest/sample_data/RELIANCE_5min.csv
"""
import os
import csv
import random
import math
from datetime import datetime, timedelta, time

OUTPUT_DIR = os.path.dirname(__file__)


def market_minutes(d: datetime.date):
    """Yield 5-min candle timestamps for a single trading day."""
    start = datetime.combine(d, time(9, 15))
    end   = datetime.combine(d, time(15, 30))
    ts = start
    while ts < end:
        yield ts
        ts += timedelta(minutes=5)


def generate(symbol: str, days: int = 60, base_price: float = 2450.0,
             volatility: float = 0.008):
    rows = []
    price = base_price
    start_date = datetime(2024, 1, 2).date()

    for day_offset in range(days):
        d = start_date + timedelta(days=day_offset)
        if d.weekday() >= 5:          # skip weekends
            continue
        daily_drift = random.gauss(0.0002, 0.005)
        intraday_vol = volatility * (1 + 0.3 * random.random())

        for ts in market_minutes(d):
            change  = random.gauss(daily_drift / 78, intraday_vol / math.sqrt(78))
            open_p  = round(price, 2)
            close_p = round(price * (1 + change), 2)
            high_p  = round(max(open_p, close_p) * (1 + abs(random.gauss(0, intraday_vol / 4))), 2)
            low_p   = round(min(open_p, close_p) * (1 - abs(random.gauss(0, intraday_vol / 4))), 2)
            volume  = int(random.lognormvariate(10, 0.8))
            rows.append([ts.strftime("%Y-%m-%d %H:%M:%S"),
                         open_p, high_p, low_p, close_p, volume])
            price = close_p

    fname = os.path.join(OUTPUT_DIR, f"{symbol}_5min.csv")
    with open(fname, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "open", "high", "low", "close", "volume"])
        writer.writerows(rows)
    print(f"Generated {len(rows)} candles → {fname}")
    return fname


if __name__ == "__main__":
    generate("RELIANCE", days=60, base_price=2450.0)
    generate("INFY",     days=60, base_price=1520.0, volatility=0.009)
    generate("SBIN",     days=60, base_price=760.0,  volatility=0.010)
