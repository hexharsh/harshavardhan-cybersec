"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface HistoryEntry {
  type: "input" | "output";
  text: string;
  color?: string;
}

const commands: Record<string, string[]> = {
  help: [
    "┌─────────────────────────────────────────────┐",
    "│         AVAILABLE COMMANDS                  │",
    "├─────────────────────────────────────────────┤",
    "│  whoami      — Display operator profile     │",
    "│  skills      — List technical skills        │",
    "│  experience  — Show work history            │",
    "│  projects    — View security engagements    │",
    "│  contact     — Get contact information      │",
    "│  resume      — Download resume              │",
    "│  clear       — Clear terminal               │",
    "│  help        — Show this menu               │",
    "└─────────────────────────────────────────────┘",
  ],
  whoami: [
    "╔══════════════════════════════════════════════╗",
    "║  OPERATOR: Harshavardhan P                  ║",
    "║  ROLE: Associate Consultant @ KPMG India    ║",
    "║  CLEARANCE: CONFIDENTIAL                    ║",
    "║  CERT: CEH Trained | Ethical Hacker         ║",
    "║  SPECIALIZATION: VAPT                       ║",
    "║  LOCATION: Bangalore, Karnataka             ║",
    "║  STATUS: Open to opportunities              ║",
    "╚══════════════════════════════════════════════╝",
  ],
  skills: [
    ">> OFFENSIVE SECURITY TOOLKIT",
    "  ├── Web Pentesting       [████████████] 95%",
    "  ├── API Security         [███████████░] 93%",
    "  ├── Mobile Security      [██████████░░] 88%",
    "  ├── Network Pentesting   [██████████░░] 90%",
    "  └── Thick Client Testing [█████████░░░] 82%",
    "",
    ">> SECURITY TOOLS",
    "  Burp Suite | Kali Linux | Nmap | Metasploit",
    "  Wireshark | Nessus | OWASP ZAP | SQLMap",
    "  MobSF | FFUF | Frida | BloodHound",
    "",
    ">> STANDARDS",
    "  OWASP Top 10 | CVSS | MITRE ATT&CK | NIST | PTES",
  ],
  experience: [
    ">> WORK HISTORY",
    "",
    "  [Nov 2025 — Present]   KPMG India",
    "  Role: Associate Consultant",
    "  Focus: VAPT, Security Audits, Client Assessments",
    "",
    "  [Jan 2021 — Nov 2025]  Deutsche Bank",
    "  Role: Security Analyst",
    "  Focus: VAPT, DAST, Secure Code Review",
    "  - Web app, API & mobile security testing",
    "  - OWASP Top 10, BOLA, Auth bypass, IDOR",
    "  - VAPT reports & remediation advisory",
    "",
    "  Education:",
    "  - MBA, Sri Krishnadevaraya University (2020)",
    "  - B.Com, Vivekananda Degree College (2018)",
  ],
  projects: [
    ">> SECURITY ENGAGEMENTS [CLASSIFIED]",
    "",
    "  [01] Enterprise Web Penetration Test",
    "       Severity: CRITICAL | Vulns: 23",
    "",
    "  [02] API Security Assessment",
    "       Severity: HIGH | Vulns: 16",
    "",
    "  [03] Mobile Application Security Audit",
    "       Severity: CRITICAL | Vulns: 16",
    "",
    "  [04] Internal Network Pentest",
    "       Severity: CRITICAL | Vulns: 26",
    "",
    "  [05] Red Team Simulation",
    "       Severity: CRITICAL | Vulns: 26",
    "",
    "  [06] Cloud Security Assessment",
    "       Severity: CRITICAL | Vulns: 25",
    "",
    "  NOTE: Details redacted for client confidentiality",
  ],
  contact: [
    ">> CONTACT INFORMATION",
    "",
    "  Email    : paliviriharshavardhan1998@gmail.com",
    "  LinkedIn : linkedin.com/in/harshavardhanpaliviri",
    "  Phone    : +91 9666730668",
    "  Location : Bangalore, Karnataka",
    "",
    "  Availability: Open to opportunities",
    "  Response Time: < 24 hours",
  ],
  resume: [
    ">> INITIATING RESUME DOWNLOAD...",
    "",
    "  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%",
    "",
    "  ✓ Resume package ready",
    "  Note: Please use the Download Resume button",
    "        in the hero section to download.",
  ],
};

export default function TerminalSection() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "output", text: 'Type "help" for available commands.', color: "#00FF88" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: HistoryEntry[] = [
      ...history,
      { type: "input", text: `harsha@kali:~$ ${cmd}` },
    ];

    if (trimmed === "clear") {
      setHistory([{ type: "output", text: "Terminal cleared.", color: "#00FF88" }]);
    } else if (commands[trimmed]) {
      const lines = commands[trimmed].map((line) => ({
        type: "output" as const,
        text: line,
      }));
      setHistory([...newHistory, ...lines]);
    } else if (trimmed === "") {
      setHistory(newHistory);
    } else {
      setHistory([
        ...newHistory,
        {
          type: "output",
          text: `Command not found: ${cmd}. Type "help" for available commands.`,
          color: "#EF4444",
        },
      ]);
    }

    setCmdHistory((prev) => [cmd, ...prev.slice(0, 49)]);
    setHistoryIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(idx);
      setInput(cmdHistory[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? "" : cmdHistory[idx]);
    }
  };

  return (
    <section id="terminal" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">// INTERACTIVE_TERMINAL.sh</p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Live <span className="gradient-text">Terminal</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm">
            Interact directly. Type <code className="text-[#00FF88] font-mono">help</code> to get started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass neon-border-green rounded-xl overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-3 px-5 py-3 bg-[rgba(0,255,136,0.05)] border-b border-[rgba(0,255,136,0.1)]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Terminal className="w-3.5 h-3.5 text-[#00FF88]" />
              <span className="font-mono text-[11px] text-[#00FF88]">
                harsha@kali:~ — bash
              </span>
            </div>
            <div className="ml-auto font-mono text-[10px] text-gray-600">
              INTERACTIVE MODE
            </div>
          </div>

          {/* Terminal output — scrollable, input is NOT inside here */}
          <div
            ref={outputRef}
            className="p-5 h-72 overflow-y-auto font-mono text-xs space-y-0.5"
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
            style={{ scrollbarWidth: "none" }}
          >
            {/* Welcome banner */}
            <div className="text-[#00FF88] mb-3">
              <div>╔══════════════════════════════════════════════════╗</div>
              <div>║  HARSHAVARDHAN P — ASSOC. CONSULTANT @ KPMG     ║</div>
              <div>║  Version 2.4.1 | Build: 20260101 | SECURE       ║</div>
              <div>╚══════════════════════════════════════════════════╝</div>
            </div>

            {history.map((entry, i) => (
              <div
                key={i}
                className={
                  entry.type === "input"
                    ? "text-gray-300"
                    : entry.color
                    ? ""
                    : "text-gray-500"
                }
                style={entry.color ? { color: entry.color } : {}}
              >
                {entry.text}
              </div>
            ))}
          </div>

          {/* Input line — fixed outside scroll area so page never jumps */}
          <div
            className="px-5 py-3 border-t border-[rgba(0,255,136,0.1)] flex items-center gap-1 font-mono text-xs cursor-text"
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
          >
            <span className="text-[#00FF88]">harsha@kali:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-gray-300 font-mono text-xs ml-1"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="terminal-cursor" />
          </div>

          {/* Quick commands */}
          <div className="px-5 py-3 bg-[rgba(0,0,0,0.3)] border-t border-[rgba(0,255,136,0.08)] flex flex-wrap gap-2 items-center">
            <span className="font-mono text-[10px] text-gray-600 mr-2">QUICK:</span>
            {["help", "whoami", "skills", "projects", "contact"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="font-mono text-[10px] text-[#00FF88] hover:bg-[rgba(0,255,136,0.1)] px-2 py-0.5 rounded transition-colors border border-[rgba(0,255,136,0.2)]"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
