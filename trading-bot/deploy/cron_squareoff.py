"""
Failsafe square-off script.
Deploy as a separate AWS Lambda / Cloud Run job triggered at 3:15 PM IST.
Calls Upstox API to close all open intraday positions even if the main bot crashed.
"""
import requests
from config import ACCESS_TOKEN

HEADERS = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Accept": "application/json",
}


def get_positions():
    resp = requests.get(
        "https://api.upstox.com/v2/portfolio/short-term-positions",
        headers=HEADERS, timeout=10
    )
    resp.raise_for_status()
    return resp.json().get("data", [])


def close_position(instrument_key: str, qty: int, transaction_type: str):
    payload = {
        "quantity": qty,
        "product": "I",
        "validity": "DAY",
        "price": 0,
        "instrument_token": instrument_key,
        "order_type": "MARKET",
        "transaction_type": transaction_type,
        "disclosed_quantity": 0,
        "trigger_price": 0,
        "is_amo": False,
    }
    resp = requests.post(
        "https://api.upstox.com/v2/order/place",
        json=payload, headers={**HEADERS, "Content-Type": "application/json"},
        timeout=5
    )
    resp.raise_for_status()
    return resp.json()


def lambda_handler(event=None, context=None):
    positions = get_positions()
    closed = 0
    for pos in positions:
        net_qty = pos.get("quantity", 0)
        if net_qty == 0:
            continue
        exit_side = "SELL" if net_qty > 0 else "BUY"
        try:
            close_position(pos["instrument_token"], abs(net_qty), exit_side)
            print(f"Closed {pos['trading_symbol']} {abs(net_qty)}qty")
            closed += 1
        except Exception as e:
            print(f"Failed to close {pos.get('trading_symbol')}: {e}")
    print(f"Square-off complete: {closed} position(s) closed")


if __name__ == "__main__":
    lambda_handler()
