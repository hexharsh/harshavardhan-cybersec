"""
Real-time P&L tracker — prints a live dashboard to the console every minute.
"""
import time
import threading
from execution.orders import risk


def _dashboard():
    while True:
        positions = risk.open_positions
        print("\n" + "=" * 50)
        print(f"  Daily P&L : {risk.daily_pnl:+.2f} INR")
        print(f"  Open      : {len(positions)} position(s)")
        for sym, pos in positions.items():
            print(f"    {sym:10s} {pos['action']} {pos['qty']}qty "
                  f"@ {pos['entry']:.2f} | SL={pos['sl']:.2f} TGT={pos['target']:.2f}")
        print("=" * 50)
        time.sleep(60)


def start_dashboard():
    t = threading.Thread(target=_dashboard, daemon=True)
    t.start()
