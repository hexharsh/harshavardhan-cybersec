"""
Upstox WebSocket market data feed.
Subscribes to full market depth for configured symbols and
pushes ticks into the shared CandleBuilder.
"""
import json
import ssl
import threading
import websocket

from config import ACCESS_TOKEN, SYMBOLS
from data.candles import candle_builder

# Reverse map: instrument_key -> symbol name
_KEY_TO_SYMBOL = {v: k for k, v in SYMBOLS.items()}

UPSTOX_WS_URL = "wss://api.upstox.com/v2/feed/market-data-feed"


class UpstoxFeed:
    def __init__(self, on_candle_close=None):
        self._ws = None
        self._thread = None
        self.on_candle_close = on_candle_close  # optional callback

    def start(self):
        headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
        self._ws = websocket.WebSocketApp(
            UPSTOX_WS_URL,
            header=headers,
            on_open=self._on_open,
            on_message=self._on_message,
            on_error=self._on_error,
            on_close=self._on_close,
        )
        self._thread = threading.Thread(
            target=self._ws.run_forever,
            kwargs={"sslopt": {"cert_reqs": ssl.CERT_NONE}},
            daemon=True,
        )
        self._thread.start()

    def stop(self):
        if self._ws:
            self._ws.close()

    def _on_open(self, ws):
        print("[Feed] WebSocket connected")
        payload = {
            "guid": "intraday-bot",
            "method": "sub",
            "data": {
                "mode": "full",
                "instrumentKeys": list(SYMBOLS.values()),
            },
        }
        ws.send(json.dumps(payload))

    def _on_message(self, ws, message):
        try:
            data = json.loads(message)
            feeds = data.get("feeds", {})
            for instrument_key, feed_data in feeds.items():
                symbol = _KEY_TO_SYMBOL.get(instrument_key)
                if not symbol:
                    continue
                ltp    = feed_data.get("ff", {}).get("marketFF", {}).get("ltpc", {}).get("ltp", 0)
                volume = feed_data.get("ff", {}).get("marketFF", {}).get("ltpc", {}).get("cp", 0)
                if ltp:
                    candle_builder.update(symbol, float(ltp), int(volume or 0))
        except Exception as e:
            print(f"[Feed] Message parse error: {e}")

    def _on_error(self, ws, error):
        print(f"[Feed] Error: {error}")

    def _on_close(self, ws, code, msg):
        print(f"[Feed] Closed: {code} {msg}")
