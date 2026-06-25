"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Mail, FolderOpen, ChevronDown, Terminal } from "lucide-react";

const terminalLines = [
  { text: "$ Initializing Security Console...", delay: 0 },
  { text: "$ Scanning Attack Surface...", delay: 800 },
  { text: "$ Running Reconnaissance...", delay: 1600 },
  { text: "$ Enumerating Services [443, 80, 8080]...", delay: 2400 },
  { text: "$ Burp Suite Community Edition — Ready", delay: 3200 },
  { text: "$ Kali Linux 2024.1 — Loaded", delay: 4000 },
  { text: "$ Exploit-DB — Updated [42,891 entries]", delay: 4800 },
  { text: "$ OWASP ZAP — Active", delay: 5600 },
  { text: "$ Nmap 7.95 — Network Ready", delay: 6400 },
  { text: "✓ No Critical Vulnerabilities Detected", delay: 7200, green: true },
  { text: "✓ Access Granted — Welcome, Harsha Vardhan", delay: 8000, green: true },
];

const subtitles = [
  "Associate Consultant @ KPMG India",
  "Web Application VAPT Specialist",
  "Vulnerability Management — Qualys VMDR",
  "Web • API • Mobile • Network Pentesting",
  "CEH Trained | Ethical Hacker",
  "OWASP Top 10 | CVSS | Risk-Based Remediation",
];

export default function Hero() {
  const [displayedLines, setDisplayedLines] = useState<typeof terminalLines>([]);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [subtitleText, setSubtitleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Terminal lines effect
  useEffect(() => {
    terminalLines.forEach((line) => {
      setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, line.delay);
    });
  }, []);

  // Subtitle typing effect
  useEffect(() => {
    const current = subtitles[subtitleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && subtitleText.length < current.length) {
      timeout = setTimeout(() => {
        setSubtitleText(current.slice(0, subtitleText.length + 1));
      }, 60);
    } else if (!isDeleting && subtitleText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && subtitleText.length > 0) {
      timeout = setTimeout(() => {
        setSubtitleText(current.slice(0, subtitleText.length - 1));
      }, 30);
    } else if (isDeleting && subtitleText.length === 0) {
      setIsDeleting(false);
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }

    return () => clearTimeout(timeout);
  }, [subtitleText, isDeleting, subtitleIndex]);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 animated-grid" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,255,136,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,229,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Main content */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass neon-border-green rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
            <span className="font-mono text-[11px] text-[#00FF88] tracking-widest">
              ASSOCIATE_CONSULTANT @ KPMG_INDIA
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-black leading-none mb-2">
              <span className="text-white">Harshavardhan</span>
              <br />
              <span className="gradient-text">P</span>
            </h1>
          </motion.div>

          {/* Subtitle with typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 mb-8 h-8 flex items-center"
          >
            <span className="font-mono text-lg text-[#00E5FF]">
              {subtitleText}
              <span className="terminal-cursor" />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-gray-400 text-sm leading-relaxed max-w-lg mb-8"
          >
            Offensive security professional specializing in Web Application VAPT
            and Vulnerability Management (Qualys VMDR) — identifying, validating,
            and remediating vulnerabilities across web, API, mobile, and network
            attack surfaces before threat actors can exploit them.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {["CEH Trained", "OWASP", "KPMG India", "Qualys VMDR", "Burp Suite Pro", "Kali Linux", "VAPT", "Vuln Management"].map((tag) => (
              <span key={tag} className="cyber-tag">{tag}</span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollToSection("#projects")}
              className="btn-primary flex items-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              View Projects
            </button>
            <a href="/resume.pdf" download="Harshavardhan_P_VAPT_Resume.pdf" className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <button
              onClick={() => scrollToSection("#contact")}
              className="btn-secondary flex items-center gap-2 border-[rgba(59,130,246,0.4)] text-[#3B82F6]"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 grid grid-cols-4 gap-4"
          >
            {[
              { value: "5+", label: "Years" },
              { value: "500+", label: "Vulns" },
              { value: "100+", label: "Apps" },
              { value: "50+", label: "Reports" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black neon-text-green">{stat.value}</div>
                <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="glass neon-border-green rounded-lg overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(0,255,136,0.05)] border-b border-[rgba(0,255,136,0.1)]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <Terminal className="w-3 h-3 text-[#00FF88]" />
                <span className="font-mono text-[11px] text-[#00FF88]">
                  harsha@kali:~$ security_console
                </span>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-[#00FF88]">LIVE</span>
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="p-4 h-72 overflow-y-auto font-mono text-xs space-y-1.5"
              style={{ scrollbarWidth: "none" }}
            >
              {displayedLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={line.green ? "text-[#00FF88]" : "text-gray-400"}
                >
                  {line.text}
                </motion.div>
              ))}
              {displayedLines.length === terminalLines.length && (
                <div className="flex items-center gap-1 text-gray-400 mt-2">
                  <span className="text-[#00FF88]">harsha@kali:~$</span>
                  <span className="terminal-cursor" />
                </div>
              )}
            </div>

            {/* Terminal footer */}
            <div className="px-4 py-2 bg-[rgba(0,0,0,0.3)] border-t border-[rgba(0,255,136,0.08)] flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-600">
                SESSION: SECURE | ENCRYPT: AES-256 | STATUS: ACTIVE
              </span>
              <span className="font-mono text-[10px] text-[#00FF88]">●</span>
            </div>
          </div>

          {/* Floating badges */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Threats Blocked", value: "2,847", color: "green" },
              { label: "Security Score", value: "98/100", color: "cyan" },
              { label: "Risk Level", value: "LOW", color: "blue" },
            ].map((metric) => (
              <div
                key={metric.label}
                className={`glass rounded-lg p-3 text-center ${
                  metric.color === "green"
                    ? "border border-[rgba(0,255,136,0.2)]"
                    : metric.color === "cyan"
                    ? "border border-[rgba(0,229,255,0.2)]"
                    : "border border-[rgba(59,130,246,0.2)]"
                }`}
              >
                <div
                  className={`text-lg font-black font-mono ${
                    metric.color === "green"
                      ? "text-[#00FF88]"
                      : metric.color === "cyan"
                      ? "text-[#00E5FF]"
                      : "text-[#3B82F6]"
                  }`}
                >
                  {metric.value}
                </div>
                <div className="text-[9px] font-mono text-gray-500 tracking-wider uppercase mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-gray-600 tracking-widest">SCROLL_DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-[#00FF88]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
