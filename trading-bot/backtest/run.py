"""
Backtest runner — entry point.

Usage:
  # Use live Upstox data (requires ACCESS_TOKEN):
  python backtest/run.py --from 2024-01-01 --to 2024-03-31

  # Use local CSV (offline, no token needed):
  python backtest/run.py --csv backtest/sample_data/RELIANCE_5min.csv --symbol RELIANCE

  # Run specific strategy only:
  python backtest/run.py --csv backtest/sample_data/RELIANCE_5min.csv --symbol RELIANCE --strategy ORB
"""
import argparse
import os
import sys

# Allow imports from the trading-bot root
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from backtest.data_loader import load_data
from backtest.engine import BacktestEngine
from backtest.metrics import compute_metrics, print_metrics
from backtest.report import save_trades_csv, save_html_report
from strategy.orb import ORBStrategy
from strategy.vwap_reversion import VWAPReversionStrategy
from strategy.ema_crossover import EMACrossoverStrategy
from config import SYMBOLS, CAPITAL


ALL_STRATEGIES = {
    "ORB":  ORBStrategy,
    "VWAP": VWAPReversionStrategy,
    "EMA":  EMACrossoverStrategy,
}


def run_backtest(symbol: str, strategy_name: str, df,
                 capital: float, slippage: float, brokerage: float) -> dict:
    strategy = ALL_STRATEGIES[strategy_name]()
    engine   = BacktestEngine(
        strategy=strategy,
        capital=capital,
        slippage=slippage,
        brokerage=brokerage,
    )
    trades  = engine.run(symbol, df)
    metrics = compute_metrics(trades, capital, engine.equity_curve)
    print_metrics(metrics, strategy_name, symbol)

    if trades:
        save_trades_csv(trades, strategy_name, symbol)

    return {
        "symbol":       symbol,
        "strategy":     strategy_name,
        "metrics":      metrics,
        "trades":       trades,
        "equity_curve": engine.equity_curve,
    }


def main():
    parser = argparse.ArgumentParser(description="Intraday Backtest Runner")
    parser.add_argument("--symbol",    default="RELIANCE",
                        help="Symbol name (must exist in config.SYMBOLS)")
    parser.add_argument("--strategy",  default="ALL",
                        choices=["ALL", "ORB", "VWAP", "EMA"])
    parser.add_argument("--from",      dest="from_date", default=None,
                        help="Start date YYYY-MM-DD (Upstox live data)")
    parser.add_argument("--to",        dest="to_date",   default=None,
                        help="End date YYYY-MM-DD (Upstox live data)")
    parser.add_argument("--csv",       default=None,
                        help="Path to local CSV file (overrides live fetch)")
    parser.add_argument("--capital",   type=float, default=CAPITAL)
    parser.add_argument("--slippage",  type=float, default=0.0005)
    parser.add_argument("--brokerage", type=float, default=20.0)
    parser.add_argument("--interval",  type=int,   default=5,
                        help="Candle interval in minutes (default 5)")
    args = parser.parse_args()

    # ── Load data ─────────────────────────────────────────────────────
    symbols_to_test = list(SYMBOLS.keys()) if args.symbol == "ALL" else [args.symbol]
    strategies_to_test = list(ALL_STRATEGIES.keys()) if args.strategy == "ALL" \
                         else [args.strategy]

    all_results = []

    for symbol in symbols_to_test:
        csv_path = args.csv if args.csv else None
        try:
            df = load_data(
                symbol=symbol,
                interval_min=args.interval,
                from_date=args.from_date,
                to_date=args.to_date,
                csv_path=csv_path,
            )
        except Exception as e:
            print(f"[Run] Failed to load data for {symbol}: {e}")
            continue

        if df.empty:
            print(f"[Run] No data for {symbol}, skipping")
            continue

        print(f"\n[Run] {len(df)} candles loaded for {symbol}")

        for strat_name in strategies_to_test:
            result = run_backtest(
                symbol=symbol,
                strategy_name=strat_name,
                df=df,
                capital=args.capital,
                slippage=args.slippage,
                brokerage=args.brokerage,
            )
            all_results.append(result)

    if all_results:
        save_html_report(all_results)
        print(f"\n[Run] All done. Reports saved in trading-bot/reports/")
    else:
        print("[Run] No results to report.")


if __name__ == "__main__":
    main()
