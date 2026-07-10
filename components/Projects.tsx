"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Smartphone, Network, Target, Cloud, ExternalLink, ChevronDown } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Enterprise Web Pentest",
    icon: Globe,
    color: "green",
    category: "Web Security",
    description:
      "Comprehensive black-box and grey-box penetration testing engagement for a Fortune 500 financial services platform. Discovered 23 vulnerabilities including 4 critical business logic flaws.",
    tech: ["Burp Suite Pro", "OWASP ZAP", "Python", "SQLMap"],
    methodology: "OWASP Testing Guide v4.2, PTES",
    impact: "Prevented potential data breach affecting 2M+ users",
    owasp: ["A01: Broken Access Control", "A02: Cryptographic Failures", "A03: Injection", "A07: Auth Failures"],
    severity: { critical: 4, high: 8, medium: 11 },
  },
  {
    id: 2,
    title: "API Security Assessment",
    icon: Server,
    color: "cyan",
    category: "API Security",
    description:
      "Full security audit of a REST and GraphQL API ecosystem including authentication flows, authorization controls, rate limiting, and data exposure analysis.",
    tech: ["Postman", "Burp Suite", "FFUF", "Python"],
    methodology: "OWASP API Security Top 10",
    impact: "Identified mass assignment and BOLA vulnerabilities in production",
    owasp: ["API1: BOLA", "API2: Broken Auth", "API3: Excessive Data", "API6: Mass Assignment"],
    severity: { critical: 2, high: 5, medium: 9 },
  },
  {
    id: 3,
    title: "Mobile App Security Audit",
    icon: Smartphone,
    color: "blue",
    category: "Mobile Security",
    description:
      "Static and dynamic analysis of Android and iOS banking applications. Reverse engineered APK, identified insecure data storage, certificate pinning bypass, and API key exposure.",
    tech: ["MobSF", "Frida", "Jadx", "ADB", "Objection"],
    methodology: "OWASP MASVS, MSTG",
    impact: "Hardened mobile authentication and patched insecure data storage",
    owasp: ["M1: Credential Usage", "M2: Data Storage", "M5: Insufficient Crypto", "M6: Auth"],
    severity: { critical: 3, high: 6, medium: 7 },
  },
  {
    id: 4,
    title: "Internal Network Pentest",
    icon: Network,
    color: "green",
    category: "Network Security",
    description:
      "Internal network penetration test simulating an insider threat. Performed AD enumeration, privilege escalation, lateral movement, and achieved domain admin access.",
    tech: ["Nmap", "Metasploit", "BloodHound", "Impacket", "Mimikatz"],
    methodology: "PTES, MITRE ATT&CK",
    impact: "Exposed critical AD misconfigurations and Kerberoastable accounts",
    owasp: ["Privilege Escalation", "Lateral Movement", "Kerberoasting", "Pass-the-Hash"],
    severity: { critical: 5, high: 9, medium: 12 },
  },
  {
    id: 5,
    title: "Red Team Simulation",
    icon: Target,
    color: "cyan",
    category: "Red Teaming",
    description:
      "Adversarial simulation engagement testing detection and response capabilities. Multi-stage attack chain including OSINT, initial access, persistence, lateral movement, and data exfiltration simulation.",
    tech: ["Metasploit", "Custom Python", "OSINT Tools", "BloodHound"],
    methodology: "MITRE ATT&CK Enterprise, Cyber Kill Chain",
    impact: "Exposed gaps in detection and IR capabilities",
    owasp: ["Initial Access", "Persistence", "Defense Evasion", "Exfiltration"],
    severity: { critical: 7, high: 11, medium: 8 },
  },
  {
    id: 6,
    title: "Cloud Security Assessment",
    icon: Cloud,
    color: "blue",
    category: "Cloud Security",
    description:
      "AWS and Azure security configuration review covering IAM misconfigurations, publicly exposed S3 buckets, overly permissive security groups, and serverless security gaps.",
    tech: ["Prowler", "ScoutSuite", "Pacu", "AWS CLI", "Nmap"],
    methodology: "CIS Benchmarks, CSA CCM, NIST CSF",
    impact: "Discovered 3 publicly exposed S3 buckets with PII data",
    owasp: ["IAM Misconfig", "Insecure Storage", "Excessive Permissions", "Missing Logging"],
    severity: { critical: 3, high: 7, medium: 15 },
  },
];

const colorMap = {
  green: {
    border: "border-[rgba(0,255,136,0.2)]",
    headerBg: "bg-[rgba(0,255,136,0.04)]",
    icon: "text-[#00FF88]",
    iconBg: "bg-[rgba(0,255,136,0.1)]",
    badge: "bg-[rgba(0,255,136,0.1)] text-[#00FF88]",
    tag: "cyber-tag",
  },
  cyan: {
    border: "border-[rgba(0,229,255,0.2)]",
    headerBg: "bg-[rgba(0,229,255,0.04)]",
    icon: "text-[#00E5FF]",
    iconBg: "bg-[rgba(0,229,255,0.1)]",
    badge: "bg-[rgba(0,229,255,0.1)] text-[#00E5FF]",
    tag: "cyber-tag cyber-tag-cyan",
  },
  blue: {
    border: "border-[rgba(59,130,246,0.2)]",
    headerBg: "bg-[rgba(59,130,246,0.04)]",
    icon: "text-[#3B82F6]",
    iconBg: "bg-[rgba(59,130,246,0.1)]",
    badge: "bg-[rgba(59,130,246,0.1)] text-[#3B82F6]",
    tag: "cyber-tag cyber-tag-blue",
  },
};

export default function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">// PROJECT_ARCHIVE.classified</p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Security <span className="gradient-text">Engagements</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm">
            Selected security assessments and penetration testing engagements.
            Details anonymized for client confidentiality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const colors = colorMap[project.color as keyof typeof colorMap];
            const isExpanded = expanded === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass rounded-xl overflow-hidden glow-card ${colors.border}`}
              >
                {/* Card header */}
                <div className={`px-6 py-4 ${colors.headerBg} border-b ${colors.border}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.iconBg}`}>
                        <project.icon className={`w-5 h-5 ${colors.icon}`} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{project.title}</h3>
                        <span className={`text-[11px] font-mono ${colors.icon}`}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[rgba(239,68,68,0.15)] text-[#EF4444]">
                          {project.severity.critical} CRIT
                        </span>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[rgba(245,158,11,0.15)] text-[#F59E0B]">
                          {project.severity.high} HIGH
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-6 py-4">
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-600 text-[10px] font-mono">IMPACT:</span>
                    <span className={`text-[11px] font-mono ${colors.icon}`}>{project.impact}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className={colors.tag}>{t}</span>
                    ))}
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : project.id)}
                    className={`flex items-center gap-1.5 text-[11px] font-mono ${colors.icon} opacity-70 hover:opacity-100 transition-opacity`}
                  >
                    <span>{isExpanded ? "Hide details" : "View methodology"}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 overflow-hidden"
                      >
                        <div className={`rounded-lg p-4 ${colors.headerBg} border ${colors.border}`}>
                          <div className="mb-3">
                            <span className="text-[10px] font-mono text-gray-600 tracking-wider">METHODOLOGY</span>
                            <p className="text-white text-xs mt-1">{project.methodology}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-gray-600 tracking-wider">OWASP MAPPING</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {project.owasp.map((o) => (
                                <span key={o} className={`${colors.tag} text-[9px]`}>{o}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
