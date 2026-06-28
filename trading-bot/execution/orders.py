"""
Order manager — coordinates signal → risk check → broker order → position tracking.
"""
from execution.broker import place_bracket_order, square_off_all
from execution.risk import RiskManager
from monitor.alerts import send_trade_alert
from monitor.logger import trade_logger

risk = RiskManager()


def process_signal(symbol: str, signal: dict, strategy_name: str):
    action = signal["action"]
    if action == "HOLD":
        return

    ok, reason = risk.can_trade()
    if not ok:
        print(f"[Orders] Skipping {symbol} {action}: {reason}")
        return

    if symbol in risk.open_positions:
        print(f"[Orders] Already have open position in {symbol}, skipping")
        return

    entry  = signal["entry"]
    sl     = signal["sl"]
    target = signal["target"]
    qty    = risk.position_size(entry, sl)

    if qty == 0:
        print(f"[Orders] Position size is 0 for {symbol}, skipping")
        return

    try:
        place_bracket_order(symbol, action, qty, entry, sl, target)
        risk.record_open(symbol, action, entry, qty, sl, target)
        trade_logger.log(symbol, strategy_name, action, qty, entry, sl, target)
        send_trade_alert(action, symbol, qty, entry, sl, target, signal["reason"])
        print(f"[Orders] {action} {qty}x{symbol} @ {entry:.2f} | "
              f"SL={sl:.2f} Target={target:.2f} [{strategy_name}]")
    except Exception as e:
        print(f"[Orders] Order failed for {symbol}: {e}")


def check_exits(candle_data: dict):
    """Check each open position for SL or target hit."""
    for symbol, pos in list(risk.open_positions.items()):
        price = candle_data.get(symbol)
        if price is None:
            continue

        hit = None
        if pos["action"] == "BUY":
            if price <= pos["sl"]:
                hit = ("SELL", "Stop-loss hit")
            elif price >= pos["target"]:
                hit = ("SELL", "Target hit")
        else:
            if price >= pos["sl"]:
                hit = ("BUY", "Stop-loss hit")
            elif price <= pos["target"]:
                hit = ("BUY", "Target hit")

        if hit:
            exit_action, exit_reason = hit
            try:
                from execution.broker import place_order
                place_order(symbol, exit_action, pos["qty"], order_type="MARKET")
                pnl = risk.record_close(symbol, price)
                trade_logger.log_exit(symbol, price, pnl, exit_reason)
                print(f"[Orders] Exited {symbol} @ {price:.2f} | {exit_reason} | P&L={pnl:+.2f}")
                send_trade_alert(exit_action, symbol, pos["qty"], price, 0, 0, exit_reason)
            except Exception as e:
                print(f"[Orders] Exit order failed for {symbol}: {e}")


def square_off_positions():
    square_off_all(risk.open_positions)
    risk.open_positions.clear()
