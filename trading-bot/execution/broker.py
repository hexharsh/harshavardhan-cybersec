"""
Upstox broker wrapper — places orders via Upstox API v2.
"""
import requests
from config import ACCESS_TOKEN, SYMBOLS


UPSTOX_ORDER_URL = "https://api.upstox.com/v2/order/place"

HEADERS = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Content-Type":  "application/json",
    "Accept":        "application/json",
}


def place_order(symbol: str, action: str, qty: int,
                order_type: str = "MARKET", price: float = 0.0) -> dict:
    instrument_key = SYMBOLS.get(symbol)
    if not instrument_key:
        raise ValueError(f"Unknown symbol: {symbol}")

    payload = {
        "quantity":       qty,
        "product":        "I",          # Intraday (MIS)
        "validity":       "DAY",
        "price":          price,
        "tag":            "intraday-bot",
        "instrument_token": instrument_key,
        "order_type":     order_type,   # MARKET | LIMIT | SL | SL-M
        "transaction_type": action,     # BUY | SELL
        "disclosed_quantity": 0,
        "trigger_price":  0.0,
        "is_amo":         False,
    }

    resp = requests.post(UPSTOX_ORDER_URL, json=payload, headers=HEADERS, timeout=5)
    resp.raise_for_status()
    return resp.json()


def place_bracket_order(symbol: str, action: str, qty: int,
                        entry: float, sl: float, target: float) -> dict:
    """Places entry order; SL and target are managed by the monitor loop."""
    result = place_order(symbol, action, qty, order_type="LIMIT", price=entry)
    print(f"[Broker] {action} {qty}x{symbol} @ {entry} | SL={sl} Target={target}")
    return result


def square_off_all(open_positions: dict):
    """Market-sell/buy all open positions at market price."""
    for symbol, pos in open_positions.items():
        exit_action = "SELL" if pos["action"] == "BUY" else "BUY"
        try:
            place_order(symbol, exit_action, pos["qty"], order_type="MARKET")
            print(f"[Broker] Squared off {symbol}")
        except Exception as e:
            print(f"[Broker] Square-off failed for {symbol}: {e}")
