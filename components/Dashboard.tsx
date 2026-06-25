"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Shield, AlertTriangle, TrendingUp, Crosshair, Lock, Eye, Zap } from "lucide-react";

function GaugeChart({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const [animated, setAnimated] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let v = 0;
        const inc = value / 60;
        const t = setInterval(() => {
          v += inc;
          if (v >= value) { setAnimated(value); clearInterval(t); }
          else setAnimated(Math.floor(v));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const pct = (animated / max) * 100;
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <circle
            cx="44" cy="44" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-black font-mono" style={{ color }}>{animated}</span>
          <span className="text-[9px] font-mono text-gray-600">/{max}</span>
        </div>
      </div>
      <span className="text-[10px] font-mono text-gray-500 text-center">{label}</span>
    </div>
  );
}

function LiveMetricBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setInterval(() => {
      setV((prev) => {
        const delta = (Math.random() - 0.4) * 5;
        return Math.max(0, Math.min(max, prev + delta));
      });
    }, 2000);
    return () => clearInterval(t);
  }, [max]);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-mono text-gray-400">{label}</span>
        <span className="text-xs font-mono" style={{ color }}>{Math.round(v)}</span>
      </div>
      <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${(v / max) * 100}%`,
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

const threatFeed = [
  { time: "00:04:12", type: "SQL Injection", severity: "HIGH", status: "BLOCKED" },
  { time: "00:03:47", type: "XSS Attempt", severity: "MED", status: "BLOCKED" },
  { time: "00:02:33", type: "CSRF Token", severity: "LOW", status: "MITIGATED" },
  { time: "00:01:58", type: "Auth Bypass", severity: "CRIT", status: "BLOCKED" },
  { time: "00:00:41", type: "Path Traversal", severity: "HIGH", status: "BLOCKED" },
  { time: "00:00:09", type: "IDOR Probe", severity: "MED", status: "DETECTED" },
];

export default function Dashboard() {
  const [time, setTime] = useState<Date | null>(null);
  const [threatCount, setThreatCount] = useState(2847);

  useEffect(() => {
    setTime(new Date());
    const t1 = setInterval(() => setTime(new Date()), 1000);
    const t2 = setInterval(() => setThreatCount((p) => p + Math.floor(Math.random() * 3)), 3000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <section id="dashboard" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">// SECURITY_DASHBOARD.live</p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Live <span className="gradient-text">Security Metrics</span>
          </h2>
        </motion.div>

        {/* Dashboard header bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass neon-border-green rounded-xl px-6 py-3 mb-6 flex flex-wrap gap-4 items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
            <span className="font-mono text-xs text-[#00FF88]">SOC DASHBOARD — LIVE MONITORING</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-gray-500">
              {time ? time.toLocaleTimeString("en-US", { hour12: false }) : "--:--:--"} UTC
            </span>
            <span className="cyber-tag">THREAT LEVEL: LOW</span>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-[#00FF88]" />
              <span className="font-mono text-[11px] text-[#00FF88]">MONITORING ACTIVE</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left panel — gauges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass border border-[rgba(0,255,136,0.15)] rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-[#00FF88]" />
              <span className="font-mono text-xs text-[#00FF88]">SECURITY GAUGES</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <GaugeChart value={98} max={100} color="#00FF88" label="Security Score" />
              <GaugeChart value={9.2} max={10} color="#00E5FF" label="CVSS Base" />
              <GaugeChart value={76} max={100} color="#3B82F6" label="Attack Surface" />
              <GaugeChart value={4} max={10} color="#F59E0B" label="Risk Index" />
            </div>

            <div className="mt-6 space-y-3">
              <LiveMetricBar label="Firewall Efficiency" value={97} max={100} color="#00FF88" />
              <LiveMetricBar label="IDS Coverage" value={94} max={100} color="#00E5FF" />
              <LiveMetricBar label="Patch Compliance" value={89} max={100} color="#3B82F6" />
            </div>
          </motion.div>

          {/* Center panel — main metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { icon: Shield, label: "Threats Blocked", value: threatCount.toLocaleString(), change: "+12", color: "green" },
              { icon: AlertTriangle, label: "Critical Findings", value: "3", change: "-2", color: "red" },
              { icon: Crosshair, label: "Attack Vectors", value: "847", change: "+4", color: "cyan" },
              { icon: Lock, label: "Controls Active", value: "124", change: "0", color: "blue" },
              { icon: TrendingUp, label: "Vuln Resolved", value: "1,241", change: "+23", color: "green" },
              { icon: Zap, label: "Pen Tests Run", value: "89", change: "+1", color: "cyan" },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`glass rounded-xl p-4 flex items-center gap-4 glow-card ${
                  metric.color === "green"
                    ? "border border-[rgba(0,255,136,0.15)]"
                    : metric.color === "cyan"
                    ? "border border-[rgba(0,229,255,0.15)]"
                    : metric.color === "red"
                    ? "border border-[rgba(239,68,68,0.2)]"
                    : "border border-[rgba(59,130,246,0.15)]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    metric.color === "green"
                      ? "bg-[rgba(0,255,136,0.1)]"
                      : metric.color === "cyan"
                      ? "bg-[rgba(0,229,255,0.1)]"
                      : metric.color === "red"
                      ? "bg-[rgba(239,68,68,0.1)]"
                      : "bg-[rgba(59,130,246,0.1)]"
                  }`}
                >
                  <metric.icon
                    className={`w-5 h-5 ${
                      metric.color === "green"
                        ? "text-[#00FF88]"
                        : metric.color === "cyan"
                        ? "text-[#00E5FF]"
                        : metric.color === "red"
                        ? "text-[#EF4444]"
                        : "text-[#3B82F6]"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-mono text-gray-500">{metric.label}</div>
                  <div
                    className={`text-xl font-black font-mono ${
                      metric.color === "green"
                        ? "text-[#00FF88]"
                        : metric.color === "cyan"
                        ? "text-[#00E5FF]"
                        : metric.color === "red"
                        ? "text-[#EF4444]"
                        : "text-[#3B82F6]"
                    }`}
                  >
                    {metric.value}
                  </div>
                </div>
                <div
                  className={`text-xs font-mono ${
                    metric.change.startsWith("+") ? "text-[#00FF88]" : metric.change === "0" ? "text-gray-500" : "text-[#EF4444]"
                  }`}
                >
                  {metric.change !== "0" ? metric.change : "—"}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right panel — threat feed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass border border-[rgba(0,229,255,0.15)] rounded-xl overflow-hidden"
          >
            <div className="px-5 py-3 bg-[rgba(0,229,255,0.04)] border-b border-[rgba(0,229,255,0.1)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00E5FF]" />
                <span className="font-mono text-xs text-[#00E5FF]">THREAT FEED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-[#00E5FF]">LIVE</span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {threatFeed.map((threat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-lg p-3 border border-[rgba(255,255,255,0.04)]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-gray-600">{threat.time}</span>
                    <span
                      className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
                        threat.status === "BLOCKED"
                          ? "bg-[rgba(0,255,136,0.1)] text-[#00FF88]"
                          : threat.status === "MITIGATED"
                          ? "bg-[rgba(59,130,246,0.1)] text-[#3B82F6]"
                          : "bg-[rgba(245,158,11,0.1)] text-[#F59E0B]"
                      }`}
                    >
                      {threat.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-xs font-mono">{threat.type}</span>
                    <span
                      className={`font-mono text-[9px] ${
                        threat.severity === "CRIT"
                          ? "text-[#EF4444]"
                          : threat.severity === "HIGH"
                          ? "text-[#F59E0B]"
                          : threat.severity === "MED"
                          ? "text-[#00E5FF]"
                          : "text-[#00FF88]"
                      }`}
                    >
                      {threat.severity}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="px-5 py-3 border-t border-[rgba(0,229,255,0.1)]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-600">PERIMETER INTEGRITY</span>
                <span className="font-mono text-[10px] text-[#00FF88]">SECURE ✓</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
