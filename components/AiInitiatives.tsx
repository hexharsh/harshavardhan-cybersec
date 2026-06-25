"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Terminal, Link2, ChevronRight } from "lucide-react";

const initiatives = [
  {
    icon: Zap,
    title: "Agentic AI Security Workflows",
    description:
      "Proposed and contributed concepts for agentic AI pipelines that chain security tools (Nmap, Burp Suite, Metasploit) with LLM reasoning for end-to-end automated assessments — covering recon, enumeration, exploitation, and report generation.",
    tags: ["Agentic AI", "LLM Pipelines", "Security Automation"],
    color: "green",
  },
  {
    icon: Terminal,
    title: "Ollama + Kali Linux Integration",
    description:
      "Integrated Ollama (local LLM) with Kali Linux to enable AI-assisted penetration testing automation — reducing manual effort in reconnaissance and enumeration phases by chaining tool output directly into LLM analysis.",
    tags: ["Ollama", "Kali Linux", "Local LLM", "Recon Automation"],
    color: "cyan",
  },
  {
    icon: Brain,
    title: "Prompt Injection Testing",
    description:
      "Explored and tested prompt injection attack vectors against AI/LLM-integrated applications — identifying vulnerabilities where user-controlled input could manipulate model behaviour, bypass guardrails, or extract system prompts.",
    tags: ["Prompt Injection", "LLM Security", "AI Red Teaming"],
    color: "green",
  },
  {
    icon: Link2,
    title: "LLM-Aided Scripting & Reporting",
    description:
      "Leveraged LLM-aided scripting for automating vulnerability triage, drafting VAPT report narratives, and generating remediation recommendations — accelerating reporting workflows without compromising accuracy.",
    tags: ["LLM Scripting", "VAPT Automation", "Report Generation"],
    color: "cyan",
  },
];

const colorMap = {
  green: {
    border: "border-[rgba(0,255,136,0.2)]",
    iconBg: "bg-[rgba(0,255,136,0.12)] border border-[rgba(0,255,136,0.3)]",
    icon: "text-[#00FF88]",
    tag: "cyber-tag",
    glow: "hover:shadow-[0_0_24px_rgba(0,255,136,0.12)]",
  },
  cyan: {
    border: "border-[rgba(0,229,255,0.2)]",
    iconBg: "bg-[rgba(0,229,255,0.12)] border border-[rgba(0,229,255,0.3)]",
    icon: "text-[#00E5FF]",
    tag: "cyber-tag cyber-tag-cyan",
    glow: "hover:shadow-[0_0_24px_rgba(0,229,255,0.12)]",
  },
};

export default function AiInitiatives() {
  return (
    <section id="ai-initiatives" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">// AI_AUTOMATION.initiatives</p>
          <h2 className="text-4xl lg:text-5xl font-black">
            AI & <span className="gradient-text">Automation</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Exploring the intersection of AI and offensive security — integrating local LLMs, agentic workflows, and prompt injection research into real-world security operations.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {initiatives.map((item, i) => {
            const colors = colorMap[item.color as keyof typeof colorMap];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-xl p-6 border ${colors.border} ${colors.glow} transition-all duration-300 cursor-default`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.iconBg}`}>
                    <item.icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className={colors.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 glass border border-[rgba(0,255,136,0.15)] rounded-xl px-6 py-4 flex items-center gap-3"
        >
          <ChevronRight className="w-4 h-4 text-[#00FF88] flex-shrink-0" />
          <p className="text-gray-400 text-sm font-mono">
            <span className="text-[#00FF88]">STATUS:</span> Actively researching agentic AI security frameworks — Ollama, open-source LLMs, and chained tool execution for autonomous pentesting assistance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
