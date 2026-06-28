"""
Risk manager — enforces position sizing, daily loss limits, and max positions.
"""
from config import CAPITAL, RISK_PER_TRADE, MAX_DAILY_LOSS, MAX_POSITIONS


class RiskManager:
    def __init__(self):
        self.daily_pnl      = 0.0
        self.open_positions: dict[str, dict] = {}

    def can_trade(self) -> tuple[bool, str]:
        if self.daily_pnl <= -MAX_DAILY_LOSS:
            return False, f"Daily loss limit hit ({self.daily_pnl:.0f} INR)"
        if len(self.open_positions) >= MAX_POSITIONS:
            return False, f"Max {MAX_POSITIONS} positions open"
        return True, "OK"

    def position_size(self, entry: float, sl: float) -> int:
        risk_amount   = CAPITAL * RISK_PER_TRADE
        risk_per_unit = abs(entry - sl)
        if risk_per_unit == 0:
            return 0
        return max(1, int(risk_amount / risk_per_unit))

    def record_open(self, symbol: str, action: str, entry: float,
                    qty: int, sl: float, target: float):
        self.open_positions[symbol] = {
            "action": action, "entry": entry,
            "qty": qty, "sl": sl, "target": target,
        }

    def record_close(self, symbol: str, exit_price: float):
        pos = self.open_positions.pop(symbol, None)
        if not pos:
            return
        multiplier = 1 if pos["action"] == "BUY" else -1
        pnl = multiplier * (exit_price - pos["entry"]) * pos["qty"]
        self.daily_pnl += pnl
        return pnl

    def summary(self) -> str:
        return (f"Daily P&L: {self.daily_pnl:+.2f} INR | "
                f"Open positions: {len(self.open_positions)}")
