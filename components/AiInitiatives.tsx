"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Terminal, Link2, ChevronRight, Bot } from "lucide-react";

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

        {/* VAPT Reporting Agents — featured card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 glass border border-[rgba(0,255,136,0.2)] rounded-xl p-6"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.25)]">
              <Bot className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-[#00FF88] bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.2)] rounded px-2 py-0.5 tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] inline-block" />
                  BUILT & WORKING
                </span>
              </div>
              <h3 className="text-white font-bold text-base">VAPT Reporting Agents</h3>
              <p className="text-gray-500 text-xs leading-relaxed mt-1 max-w-2xl">
                One workflow, three audience-specific outputs — structured findings, a detailed technical report, and a business-risk summary.
              </p>
            </div>
          </div>

          {/* Agent cards */}
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[
              {
                num: "AGENT 01",
                title: "Findings Builder",
                input: "Notes + PoCs",
                output: "Developer-ready finding",
                desc: "Structured finding with severity, CVSS v3.1, CWE/OWASP mapping, impact, and recommendation.",
              },
              {
                num: "AGENT 02",
                title: "Technical Report Builder",
                input: "Reviewed findings",
                output: "Detailed technical report",
                desc: "Consolidates 10–25 findings, aligns severity summaries, and applies the approved format.",
              },
              {
                num: "AGENT 03",
                title: "Management Report Builder",
                input: "Validated results",
                output: "Risk and decision summary",
                desc: "Business risk, priorities, remediation urgency, ownership, and retest status for executive audiences.",
              },
            ].map((agent) => (
              <div
                key={agent.num}
                className="bg-[rgba(0,255,136,0.03)] border border-[rgba(0,255,136,0.12)] rounded-lg p-4"
              >
                <span className="font-mono text-[9px] text-[#00FF88] tracking-widest">{agent.num}</span>
                <h4 className="text-sm font-semibold text-gray-200 mt-1 mb-2">{agent.title}</h4>
                <div className="flex items-center gap-1.5 flex-wrap mb-2">
                  <span className="text-[9px] text-gray-500">{agent.input}</span>
                  <span className="text-[#00FF88] text-[9px]">→</span>
                  <span className="text-[9px] text-[#00E5FF]">{agent.output}</span>
                </div>
                <p className="text-gray-600 text-[10px] leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>

          {/* Time comparison table */}
          <div className="mb-5">
            <p className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-2">// TIME_COMPARISON.estimated</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-[rgba(0,255,136,0.15)]">
                    <th className="text-left font-mono text-[10px] text-[#00FF88] tracking-wider py-2 pr-4">Agent</th>
                    <th className="text-left font-mono text-[10px] text-[#00FF88] tracking-wider py-2 pr-4">Manual baseline</th>
                    <th className="text-left font-mono text-[10px] text-[#00FF88] tracking-wider py-2 pr-4">Agent drafting</th>
                    <th className="text-left font-mono text-[10px] text-[#00FF88] tracking-wider py-2">Primary value</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {[
                    {
                      agent: "Findings Builder",
                      manual: "38–48 min / finding",
                      draft: "2–4 min / finding",
                      value: "Map evidence, place approved PoCs, apply template rules",
                    },
                    {
                      agent: "Technical Report Builder",
                      manual: "24–40 hrs / report",
                      draft: "3–5 min / report",
                      value: "Align finding IDs, severity counts, and formatting",
                    },
                    {
                      agent: "Management Report Builder",
                      manual: "~2 hrs / report",
                      draft: "3–5 min / report",
                      value: "Translate technical results into concise business-risk summary",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[rgba(255,255,255,0.04)]">
                      <td className="text-gray-200 font-semibold py-2.5 pr-4 text-[10px]">{row.agent}</td>
                      <td className="text-gray-500 py-2.5 pr-4 text-[10px]">{row.manual}</td>
                      <td className="text-[#00FF88] font-semibold py-2.5 pr-4 text-[10px]">{row.draft}</td>
                      <td className="text-gray-600 py-2.5 text-[10px] leading-relaxed">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {["Agentic AI", "VAPT Automation", "Report Generation", "CVSS v3.1", "OWASP Mapping"].map((tag) => (
              <span key={tag} className="cyber-tag">{tag}</span>
            ))}
          </div>
        </motion.div>

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
