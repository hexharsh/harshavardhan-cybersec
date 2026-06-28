"""
Performance metrics calculated from a list of Trade objects.
"""
from __future__ import annotations

import math
import pandas as pd
from backtest.engine import Trade


def compute_metrics(trades: list[Trade], capital: float,
                    equity_curve: pd.Series = None) -> dict:
    if not trades:
        return {"error": "No trades to analyse"}

    closed = [t for t in trades if not t.is_open]
    if not closed:
        return {"error": "No closed trades"}

    pnls       = [t.pnl for t in closed]
    wins       = [p for p in pnls if p > 0]
    losses     = [p for p in pnls if p <= 0]
    total_pnl  = sum(pnls)

    win_rate   = len(wins) / len(closed) * 100
    avg_win    = sum(wins)   / len(wins)   if wins   else 0
    avg_loss   = sum(losses) / len(losses) if losses else 0
    profit_factor = abs(sum(wins) / sum(losses)) if losses else float("inf")

    best_trade  = max(pnls)
    worst_trade = min(pnls)

    # Max drawdown from equity curve
    max_drawdown = 0.0
    max_dd_pct   = 0.0
    if equity_curve is not None and not equity_curve.empty:
        roll_max  = equity_curve.cummax()
        drawdown  = equity_curve - roll_max
        max_drawdown     = drawdown.min()
        max_dd_pct       = (drawdown / roll_max).min() * 100

    # Sharpe ratio (annualised, daily returns from equity curve)
    sharpe = 0.0
    if equity_curve is not None and len(equity_curve) > 1:
        daily_eq   = equity_curve.resample("D").last().dropna()
        daily_ret  = daily_eq.pct_change().dropna()
        if daily_ret.std() > 0:
            sharpe = (daily_ret.mean() / daily_ret.std()) * math.sqrt(252)

    # Consecutive wins / losses
    max_consec_wins = max_consec_losses = curr = 0
    for p in pnls:
        if p > 0:
            curr = curr + 1 if curr > 0 else 1
            max_consec_wins = max(max_consec_wins, curr)
        else:
            curr = curr - 1 if curr < 0 else -1
            max_consec_losses = max(max_consec_losses, abs(curr))

    return {
        "total_trades":         len(closed),
        "wins":                 len(wins),
        "losses":               len(losses),
        "win_rate_%":           round(win_rate, 2),
        "total_pnl":            round(total_pnl, 2),
        "return_%":             round(total_pnl / capital * 100, 2),
        "avg_win":              round(avg_win, 2),
        "avg_loss":             round(avg_loss, 2),
        "profit_factor":        round(profit_factor, 2),
        "best_trade":           round(best_trade, 2),
        "worst_trade":          round(worst_trade, 2),
        "max_drawdown_inr":     round(max_drawdown, 2),
        "max_drawdown_%":       round(max_dd_pct, 2),
        "sharpe_ratio":         round(sharpe, 2),
        "max_consec_wins":      max_consec_wins,
        "max_consec_losses":    max_consec_losses,
    }


def print_metrics(metrics: dict, strategy_name: str, symbol: str):
    print(f"\n{'='*55}")
    print(f"  Backtest Results — {strategy_name} on {symbol}")
    print(f"{'='*55}")
    if "error" in metrics:
        print(f"  {metrics['error']}")
        return
    rows = [
        ("Total Trades",        metrics["total_trades"]),
        ("Win / Loss",          f"{metrics['wins']} / {metrics['losses']}"),
        ("Win Rate",            f"{metrics['win_rate_%']}%"),
        ("Total P&L",           f"{metrics['total_pnl']:+,.2f} INR"),
        ("Return",              f"{metrics['return_%']:+.2f}%"),
        ("Avg Win",             f"{metrics['avg_win']:+.2f}"),
        ("Avg Loss",            f"{metrics['avg_loss']:+.2f}"),
        ("Profit Factor",       metrics["profit_factor"]),
        ("Best Trade",          f"{metrics['best_trade']:+.2f}"),
        ("Worst Trade",         f"{metrics['worst_trade']:+.2f}"),
        ("Max Drawdown",        f"{metrics['max_drawdown_inr']:+.2f} ({metrics['max_drawdown_%']:.1f}%)"),
        ("Sharpe Ratio",        metrics["sharpe_ratio"]),
        ("Max Consec. Wins",    metrics["max_consec_wins"]),
        ("Max Consec. Losses",  metrics["max_consec_losses"]),
    ]
    for label, value in rows:
        print(f"  {label:<22}: {value}")
    print(f"{'='*55}\n")
