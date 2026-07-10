"use client";

import { motion } from "framer-motion";
import {
  Target, Wrench, BookOpen, Code2,
  Globe, Smartphone, Network, Server,
  Terminal, Activity, Shield, FileCode,
  Zap, Search, Lock, Database, MessageSquare, Brain,
} from "lucide-react";

const spokenLanguages = [
  { lang: "English", level: "Fluent", pct: 95 },
  { lang: "Hindi", level: "Fluent", pct: 90 },
  { lang: "Kannada", level: "Fluent", pct: 98 },
  { lang: "Telugu", level: "Native", pct: 100 },
  { lang: "Urdu", level: "Conversational", pct: 80 },
];

const skillCategories = [
  {
    title: "Offensive Security",
    icon: Target,
    color: "green",
    skills: [
      { name: "Web Pentesting", level: 95, icon: Globe },
      { name: "API Pentesting", level: 93, icon: Server },
      { name: "Mobile Pentesting", level: 88, icon: Smartphone },
      { name: "Network Pentesting", level: 90, icon: Network },
      { name: "Thick Client Testing", level: 82, icon: Terminal },
    ],
  },
  {
    title: "Security Tools",
    icon: Wrench,
    color: "cyan",
    skills: [
      { name: "Burp Suite Pro", level: 97, icon: Target },
      { name: "Qualys VMDR", level: 90, icon: Shield },
      { name: "Kali Linux", level: 95, icon: Terminal },
      { name: "Nmap", level: 92, icon: Search },
      { name: "Nessus", level: 88, icon: Shield },
      { name: "Metasploit", level: 85, icon: Zap },
      { name: "Wireshark", level: 88, icon: Activity },
      { name: "OWASP ZAP", level: 88, icon: Lock },
      { name: "SQLMap", level: 85, icon: Database },
      { name: "MobSF", level: 83, icon: Smartphone },
    ],
  },
  {
    title: "Security Standards",
    icon: BookOpen,
    color: "blue",
    skills: [
      { name: "OWASP Top 10", level: 98, icon: Shield },
      { name: "CWE", level: 92, icon: FileCode },
      { name: "CVSS", level: 95, icon: Activity },
      { name: "MITRE ATT&CK", level: 88, icon: Target },
      { name: "NIST Framework", level: 85, icon: BookOpen },
      { name: "PTES", level: 87, icon: FileCode },
    ],
  },
  {
    title: "AI in Security",
    icon: Brain,
    color: "green",
    skills: [
      { name: "Prompt Injection Testing", level: 85, icon: Brain },
      { name: "Agentic AI Workflow Design", level: 82, icon: Zap },
      { name: "Ollama + Kali Integration", level: 80, icon: Terminal },
      { name: "LLM-Aided Reporting", level: 78, icon: Code2 },
      { name: "AI Security Automation", level: 78, icon: Zap },
    ],
  },
];

const colorMap = {
  green: {
    border: "border-[rgba(0,255,136,0.2)]",
    headerBg: "bg-[rgba(0,255,136,0.05)]",
    headerBorder: "border-[rgba(0,255,136,0.1)]",
    icon: "text-[#00FF88]",
    progress: "from-[#00FF88] to-[#00E5FF]",
    tag: "cyber-tag",
    glow: "shadow-[0_0_8px_rgba(0,255,136,0.2)]",
  },
  cyan: {
    border: "border-[rgba(0,229,255,0.2)]",
    headerBg: "bg-[rgba(0,229,255,0.05)]",
    headerBorder: "border-[rgba(0,229,255,0.1)]",
    icon: "text-[#00E5FF]",
    progress: "from-[#00E5FF] to-[#3B82F6]",
    tag: "cyber-tag cyber-tag-cyan",
    glow: "shadow-[0_0_8px_rgba(0,229,255,0.2)]",
  },
  blue: {
    border: "border-[rgba(59,130,246,0.2)]",
    headerBg: "bg-[rgba(59,130,246,0.05)]",
    headerBorder: "border-[rgba(59,130,246,0.1)]",
    icon: "text-[#3B82F6]",
    progress: "from-[#3B82F6] to-[#00E5FF]",
    tag: "cyber-tag cyber-tag-blue",
    glow: "shadow-[0_0_8px_rgba(59,130,246,0.2)]",
  },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 hex-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">// SKILL_MATRIX.json</p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm">
            A comprehensive toolkit built over years of offensive security engagements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {skillCategories.map((cat, ci) => {
            const colors = colorMap[cat.color as keyof typeof colorMap];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
                className={`glass rounded-xl overflow-hidden glow-card ${colors.border}`}
              >
                {/* Category header */}
                <div className={`px-6 py-4 border-b ${colors.headerBg} ${colors.headerBorder}`}>
                  <div className="flex items-center gap-3">
                    <cat.icon className={`w-5 h-5 ${colors.icon}`} />
                    <h3 className="text-white font-bold">{cat.title}</h3>
                    <span className={`ml-auto font-mono text-[11px] ${colors.icon}`}>
                      [{cat.skills.length} skills]
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="p-6 space-y-4">
                  {cat.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.05 + si * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <skill.icon className={`w-3.5 h-3.5 ${colors.icon} opacity-70`} />
                          <span className="text-gray-300 text-xs font-mono">{skill.name}</span>
                        </div>
                        <span className={`text-xs font-mono font-bold ${colors.icon}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className={`progress-fill bg-gradient-to-r ${colors.progress}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: si * 0.05, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Spoken Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 glass border border-[rgba(0,229,255,0.2)] rounded-xl overflow-hidden"
        >
          <div className="px-6 py-4 bg-[rgba(0,229,255,0.04)] border-b border-[rgba(0,229,255,0.1)]">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#00E5FF]" />
              <h3 className="text-white font-bold">Spoken Languages</h3>
              <span className="ml-auto font-mono text-[11px] text-[#00E5FF]">[{spokenLanguages.length} languages]</span>
            </div>
          </div>
          <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {spokenLanguages.map((l, i) => (
              <motion.div
                key={l.lang}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="text-center"
              >
                <div className="relative w-14 h-14 mx-auto mb-2">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <motion.circle
                      cx="26" cy="26" r="22"
                      fill="none"
                      stroke="#00E5FF"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 22}
                      initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - l.pct / 100) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                      style={{ filter: "drop-shadow(0 0 4px rgba(0,229,255,0.6))" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-[#00E5FF]">{l.pct}%</span>
                  </div>
                </div>
                <div className="text-white text-xs font-semibold">{l.lang}</div>
                <div className="text-gray-500 text-[9px] font-mono mt-0.5">{l.level}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
