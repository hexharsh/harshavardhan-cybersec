# Upstox API credentials — set via environment variables in production
import os

BROKER = "upstox"

API_KEY    = os.getenv("UPSTOX_API_KEY", "your_api_key")
API_SECRET = os.getenv("UPSTOX_API_SECRET", "your_api_secret")
REDIRECT_URI = os.getenv("UPSTOX_REDIRECT_URI", "https://127.0.0.1")
ACCESS_TOKEN = os.getenv("UPSTOX_ACCESS_TOKEN", "")

# Instruments (Upstox instrument keys)
# Format: NSE_EQ|<isin>  or use instrument key from Upstox instruments CSV
SYMBOLS = {
    "RELIANCE": "NSE_EQ|INE002A01018",
    "INFY":     "NSE_EQ|INE009A01021",
    "SBIN":     "NSE_EQ|INE062A01020",
}

# Capital & risk
CAPITAL          = 100000   # Total capital in INR
RISK_PER_TRADE   = 0.01     # 1% of capital risked per trade
MAX_DAILY_LOSS   = 3000     # Stop trading for the day if loss hits this
MAX_POSITIONS    = 3        # Max concurrent open positions

# Intraday timing (IST)
MARKET_OPEN    = "09:15"
ORB_END_TIME   = "09:30"    # Opening range window end
SQUARE_OFF     = "15:15"    # Force-close all positions before market close

# Strategy selector: "ORB", "VWAP", "EMA", or "ALL"
ACTIVE_STRATEGY = "ALL"

# Candle interval in minutes
CANDLE_INTERVAL = 5

# Telegram alerts (optional)
TELEGRAM_TOKEN   = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
