"""
Intraday Trading Bot — Upstox + All 3 Strategies
Entry point: starts the market feed, runs strategy loop every 5 minutes,
and auto squares off at SQUARE_OFF time.
"""
import time
import threading
from datetime import datetime

from config import SYMBOLS, SQUARE_OFF, ACTIVE_STRATEGY, CANDLE_INTERVAL
from data.feed import UpstoxFeed
from data.candles import candle_builder
from strategy.orb import ORBStrategy
from strategy.vwap_reversion import VWAPReversionStrategy
from strategy.ema_crossover import EMACrossoverStrategy
from execution.orders import process_signal, check_exits, square_off_positions, risk
from monitor.pnl import start_dashboard
from monitor.alerts import send_daily_summary

# --- Strategy instances ---
STRATEGIES = {
    "ORB":  ORBStrategy(),
    "VWAP": VWAPReversionStrategy(),
    "EMA":  EMACrossoverStrategy(),
}

if ACTIVE_STRATEGY != "ALL":
    STRATEGIES = {ACTIVE_STRATEGY: STRATEGIES[ACTIVE_STRATEGY]}


def _past_square_off() -> bool:
    now = datetime.now().strftime("%H:%M")
    return now >= SQUARE_OFF


def strategy_loop():
    """Runs every CANDLE_INTERVAL minutes during market hours."""
    print("[Main] Strategy loop started")
    while True:
        if _past_square_off():
            print("[Main] Square-off time reached — closing all positions")
            square_off_positions()
            _end_of_day()
            break

        # Current prices for exit checks
        current_prices = {
            sym: candle_builder.get_df(sym)["close"].iloc[-1]
            for sym in SYMBOLS
            if not candle_builder.get_df(sym).empty
        }
        check_exits(current_prices)

        # Generate and process signals
        for sym in SYMBOLS:
            df = candle_builder.get_df(sym)
            if df.empty:
                continue
            for strat_name, strat in STRATEGIES.items():
                signal = strat.generate_signal(sym, df)
                if signal["action"] != "HOLD":
                    print(f"[{strat_name}] {sym}: {signal['action']} — {signal['reason']}")
                    process_signal(sym, signal, strat_name)

        time.sleep(CANDLE_INTERVAL * 60)


def _end_of_day():
    import csv, os
    log_dir = os.path.join(os.path.dirname(__file__), "logs")
    trades, wins = 0, 0
    today_file = os.path.join(log_dir, f"trades_{datetime.now().date()}.csv")
    if os.path.exists(today_file):
        with open(today_file) as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row.get("pnl"):
                    trades += 1
                    if float(row["pnl"]) > 0:
                        wins += 1
    send_daily_summary(risk.daily_pnl, trades, wins)
    print(f"[Main] End of day. {risk.summary()}")


def main():
    print("[Main] Starting Intraday Bot...")
    feed = UpstoxFeed()
    feed.start()

    # Give WebSocket a moment to connect and receive first ticks
    print("[Main] Waiting for market data feed...")
    time.sleep(10)

    start_dashboard()

    loop_thread = threading.Thread(target=strategy_loop, daemon=False)
    loop_thread.start()
    loop_thread.join()

    print("[Main] Bot shut down.")


if __name__ == "__main__":
    main()
