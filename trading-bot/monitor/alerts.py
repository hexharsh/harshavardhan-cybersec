"""
Telegram alert sender for trade notifications and daily P&L summary.
"""
import requests
from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID


def _send(message: str):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        return
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    try:
        requests.post(url, data={"chat_id": TELEGRAM_CHAT_ID, "text": message}, timeout=5)
    except Exception as e:
        print(f"[Alerts] Telegram send failed: {e}")


def send_trade_alert(action: str, symbol: str, qty: int,
                     price: float, sl: float, target: float, reason: str = ""):
    emoji = "BUY" if action == "BUY" else "SELL"
    msg = (
        f"[{emoji}] {symbol}\n"
        f"Qty    : {qty}\n"
        f"Price  : {price:.2f}\n"
        f"SL     : {sl:.2f}\n"
        f"Target : {target:.2f}\n"
        f"Reason : {reason}"
    )
    _send(msg)


def send_daily_summary(daily_pnl: float, trades: int, wins: int):
    win_rate = (wins / trades * 100) if trades else 0
    msg = (
        f"Daily Summary\n"
        f"P&L      : {daily_pnl:+.2f} INR\n"
        f"Trades   : {trades}\n"
        f"Win rate : {win_rate:.1f}%"
    )
    _send(msg)
