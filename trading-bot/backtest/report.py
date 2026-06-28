"""
Generates a CSV trade log and an HTML performance report
for each strategy / symbol combination tested.
"""
from __future__ import annotations

import os
import csv
import html
from datetime import datetime

import pandas as pd
from backtest.engine import Trade


REPORT_DIR = os.path.join(os.path.dirname(__file__), "..", "reports")
os.makedirs(REPORT_DIR, exist_ok=True)


def save_trades_csv(trades: list[Trade], strategy: str, symbol: str) -> str:
    fname = os.path.join(REPORT_DIR, f"{strategy}_{symbol}_{_today()}.csv")
    with open(fname, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(trades[0].to_dict().keys()))
        writer.writeheader()
        for t in trades:
            writer.writerow(t.to_dict())
    print(f"[Report] Trade log saved: {fname}")
    return fname


def save_html_report(all_results: list[dict]) -> str:
    """
    all_results: list of {symbol, strategy, metrics, trades, equity_curve}
    """
    fname = os.path.join(REPORT_DIR, f"backtest_report_{_today()}.html")
    with open(fname, "w") as f:
        f.write(_html_header())
        for res in all_results:
            f.write(_html_section(res))
        f.write(_html_footer())
    print(f"[Report] HTML report saved: {fname}")
    return fname


# ── internal helpers ──────────────────────────────────────────────────

def _today() -> str:
    return datetime.now().strftime("%Y%m%d_%H%M%S")


def _html_header() -> str:
    return """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Backtest Report</title>
<style>
  body { font-family: monospace; background:#0d1117; color:#e6edf3; padding:2rem; }
  h1   { color:#58a6ff; }
  h2   { color:#3fb950; border-bottom:1px solid #30363d; padding-bottom:.4rem; }
  table{ border-collapse:collapse; width:100%; margin-bottom:2rem; }
  th,td{ padding:.5rem 1rem; border:1px solid #30363d; text-align:left; }
  th   { background:#161b22; color:#58a6ff; }
  tr:nth-child(even){ background:#161b22; }
  .pos { color:#3fb950; }
  .neg { color:#f85149; }
  .metrics-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:2rem; }
  .metric { background:#161b22; border:1px solid #30363d; padding:1rem; border-radius:6px; }
  .metric .label { color:#8b949e; font-size:.85rem; }
  .metric .value { font-size:1.4rem; font-weight:bold; }
</style>
</head>
<body>
<h1>Intraday Backtest Report</h1>
<p style="color:#8b949e">Generated: """ + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "</p>"


def _html_section(res: dict) -> str:
    m   = res["metrics"]
    sym = html.escape(res["symbol"])
    strat = html.escape(res["strategy"])
    trades = res["trades"]

    pnl_color = "pos" if m.get("total_pnl", 0) >= 0 else "neg"

    metrics_html = f"""
<h2>{strat} — {sym}</h2>
<div class="metrics-grid">
  <div class="metric"><div class="label">Total P&amp;L</div>
    <div class="value {pnl_color}">{m.get('total_pnl', 0):+,.2f} INR</div></div>
  <div class="metric"><div class="label">Return</div>
    <div class="value {pnl_color}">{m.get('return_%', 0):+.2f}%</div></div>
  <div class="metric"><div class="label">Win Rate</div>
    <div class="value">{m.get('win_rate_%', 0):.1f}%</div></div>
  <div class="metric"><div class="label">Profit Factor</div>
    <div class="value">{m.get('profit_factor', 0):.2f}</div></div>
  <div class="metric"><div class="label">Sharpe Ratio</div>
    <div class="value">{m.get('sharpe_ratio', 0):.2f}</div></div>
  <div class="metric"><div class="label">Max Drawdown</div>
    <div class="value neg">{m.get('max_drawdown_%', 0):.1f}%</div></div>
  <div class="metric"><div class="label">Total Trades</div>
    <div class="value">{m.get('total_trades', 0)}</div></div>
  <div class="metric"><div class="label">Avg Win / Avg Loss</div>
    <div class="value">{m.get('avg_win', 0):+.0f} / {m.get('avg_loss', 0):+.0f}</div></div>
</div>"""

    rows = ""
    for t in sorted(trades, key=lambda x: x.entry_time):
        pnl_cls = "pos" if t.pnl >= 0 else "neg"
        rows += (
            f"<tr>"
            f"<td>{t.entry_time.strftime('%Y-%m-%d %H:%M')}</td>"
            f"<td>{t.action}</td>"
            f"<td>{t.qty}</td>"
            f"<td>{t.entry_price:.2f}</td>"
            f"<td>{t.exit_price or '—'}</td>"
            f"<td>{t.exit_reason}</td>"
            f"<td class='{pnl_cls}'>{t.pnl:+.2f}</td>"
            f"</tr>"
        )

    table_html = f"""
<table>
  <thead>
    <tr><th>Entry Time</th><th>Side</th><th>Qty</th>
        <th>Entry</th><th>Exit</th><th>Reason</th><th>P&amp;L</th></tr>
  </thead>
  <tbody>{rows}</tbody>
</table>"""

    return metrics_html + table_html


def _html_footer() -> str:
    return "</body></html>"
