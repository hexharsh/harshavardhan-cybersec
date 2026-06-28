"""
Logs every trade entry and exit to a daily CSV file.
"""
import csv
import os
from datetime import date, datetime


LOG_DIR = os.path.join(os.path.dirname(__file__), "..", "logs")
os.makedirs(LOG_DIR, exist_ok=True)


class TradeLogger:
    def __init__(self):
        self._file = os.path.join(LOG_DIR, f"trades_{date.today()}.csv")
        self._ensure_header()

    def _ensure_header(self):
        if not os.path.exists(self._file):
            with open(self._file, "w", newline="") as f:
                writer = csv.writer(f)
                writer.writerow([
                    "timestamp", "symbol", "strategy", "action",
                    "qty", "entry", "sl", "target", "exit_price", "pnl", "note"
                ])

    def log(self, symbol, strategy, action, qty, entry, sl, target):
        with open(self._file, "a", newline="") as f:
            csv.writer(f).writerow([
                datetime.now().isoformat(), symbol, strategy, action,
                qty, entry, sl, target, "", "", ""
            ])

    def log_exit(self, symbol, exit_price, pnl, note=""):
        rows, updated = [], False
        with open(self._file, "r") as f:
            reader = csv.reader(f)
            header = next(reader)
            for row in reader:
                if row[1] == symbol and row[9] == "":
                    row[9] = f"{exit_price:.2f}"
                    row[10] = f"{pnl:+.2f}" if pnl is not None else ""
                    row[11] = note
                    updated = True
                rows.append(row)

        if updated:
            with open(self._file, "w", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(header)
                writer.writerows(rows)


trade_logger = TradeLogger()
