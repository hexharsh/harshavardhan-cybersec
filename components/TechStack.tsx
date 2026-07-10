"use client";

import { motion } from "framer-motion";

const tools = [
  { name: "Kali Linux", abbr: "KALI", color: "#3B82F6" },
  { name: "Burp Suite", abbr: "BURP", color: "#00FF88" },
  { name: "Python", abbr: "PY", color: "#F59E0B" },
  { name: "Linux", abbr: "LNX", color: "#00FF88" },
  { name: "OWASP", abbr: "OWA", color: "#EF4444" },
  { name: "Nmap", abbr: "NMAP", color: "#00E5FF" },
  { name: "Wireshark", abbr: "WIRE", color: "#3B82F6" },
  { name: "Metasploit", abbr: "MSF", color: "#F59E0B" },
  { name: "Frida", abbr: "FRI", color: "#00FF88" },
  { name: "BloodHound", abbr: "BH", color: "#EF4444" },
  { name: "Nessus", abbr: "NES", color: "#00E5FF" },
  { name: "Qualys VMDR", abbr: "QLYS", color: "#F59E0B" },
  { name: "Ollama AI", abbr: "OLLM", color: "#00E5FF" },
  { name: "SQLMap", abbr: "SQL", color: "#F59E0B" },
  { name: "FFUF", abbr: "FUF", color: "#00FF88" },
  { name: "MobSF", abbr: "MOB", color: "#6366F1" },
];

export default function TechStack() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="section-label mb-2">// TECH_STACK.loaded</p>
          <h2 className="text-3xl font-black">
            Security <span className="gradient-text">Arsenal</span>
          </h2>
        </motion.div>

        {/* Scrolling row */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-[scroll_30s_linear_infinite]" style={{
            animation: "scroll 30s linear infinite",
          }}>
            {[...tools, ...tools].map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="flex-shrink-0 glass rounded-xl px-5 py-4 text-center cursor-default group transition-all"
                style={{ borderColor: `${tool.color}30`, border: `1px solid ${tool.color}30` }}
              >
                <div
                  className="text-lg font-black font-mono mb-1"
                  style={{
                    color: tool.color,
                    textShadow: `0 0 10px ${tool.color}60`,
                  }}
                >
                  {tool.abbr}
                </div>
                <div className="text-[10px] font-mono text-gray-500 whitespace-nowrap">
                  {tool.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
