"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "KPMG India",
    role: "Associate Consultant",
    period: "Nov 2025 — Present",
    type: "Full Time",
    color: "green",
    logo: "KPMG",
    description:
      "Dual focus at KPMG: primary responsibility is Web Application VAPT for enterprise clients, alongside independently handling the Qualys VMDR-based Vulnerability Management program — covering the full lifecycle from scanning to remediation closure.",
    responsibilities: [
      "// WEB APPLICATION VAPT",
      "Manual & automated web application penetration testing for enterprise clients",
      "OWASP Top 10 vulnerability identification, exploitation & reporting",
      "Business logic testing, session management & auth/authz bypass",
      "Comprehensive VAPT reports with CVSS scores, PoC & remediation guidance",
      "Remediation validation & retesting to confirm closure of findings",
      "Client security assessments & advisory to dev and infra teams",
      "// VULNERABILITY MANAGEMENT (VMDR)",
      "Vulnerability analysis & remediation assessment using Qualys VMDR",
      "Review high & critical vulns — analyse system impact & provide guidance",
      "Risk-based prioritization — CVSS, asset criticality, KEV & internet exposure",
      "Remediation tickets in ServiceNow/Jira (Critical-7d, High-15d SLA)",
      "Fix validation via re-scan & closure confirmation",
      "Weekly dashboards — severity trend, SLA compliance, top vulnerable assets",
    ],
    tech: ["Qualys VMDR", "Nessus", "Burp Suite Pro", "Nmap", "OWASP ZAP", "ServiceNow", "Jira", "Kali Linux"],
  },
  {
    company: "Deutsche Bank",
    role: "Security Analyst",
    period: "Jan 2021 — Nov 2025",
    type: "Full Time",
    color: "cyan",
    logo: "DB",
    description:
      "Conducted end-to-end VAPT across 15+ banking and financial platforms at Deutsche Bank — primary focus on web application testing, with API security assessments and mobile (Android), network, and SAST/DAST activities.",
    responsibilities: [
      "// WEB APPLICATION PENTESTING",
      "In-depth manual & automated web app pentesting across 15+ banking platforms",
      "Auth bypass, session management, business logic & input validation testing",
      "Burp Suite Pro & OWASP ZAP DAST — improved testing coverage by 30%",
      "Cryptographic implementation assessments & TLS certificate hardening",
      "Secure code review for early-stage vulnerability detection",
      "Project-level threat reviews & test scope definition",
      "Weekly VAPT reports — reduced issue turnaround time by 20%",
      "// API SECURITY TESTING",
      "REST & SOAP API assessments — BOLA, mass assignment, auth flaws, rate limiting",
      "API testing via Postman & Burp Suite Pro — mapped to OWASP API Top 10",
      "Security controls validation across banking microservices & third-party integrations",
      "// OTHER SECURITY ACTIVITIES",
      "Android mobile security testing — MobSF, Dex2jar, Frida, Android Studio",
      "Internal network vulnerability scans — Nmap, Nessus; identified misconfigs",
      "SAST/DAST via Veracode, AppScan Standard, SonarQube across SDLC pipeline",
    ],
    tech: ["Burp Suite Pro", "OWASP ZAP", "Nessus", "MobSF", "Kali Linux", "Metasploit", "SQLMap", "Frida", "Veracode", "AppScan"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">// EXPERIENCE_LOG.timeline</p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Career <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FF88] via-[#00E5FF] to-transparent opacity-30 hidden lg:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative grid lg:grid-cols-2 gap-8 items-start"
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 top-8 -translate-x-1/2 hidden lg:block">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      exp.color === "green"
                        ? "bg-[#00FF88] border-[#00FF88] shadow-[0_0_12px_rgba(0,255,136,0.8)]"
                        : "bg-[#00E5FF] border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.8)]"
                    }`}
                  />
                </div>

                {/* Card — alternating sides */}
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div
                    className={`glass rounded-xl overflow-hidden glow-card ${
                      exp.color === "green"
                        ? "border border-[rgba(0,255,136,0.2)]"
                        : "border border-[rgba(0,229,255,0.2)]"
                    }`}
                  >
                    {/* Card header */}
                    <div
                      className={`px-6 py-4 border-b ${
                        exp.color === "green"
                          ? "border-[rgba(0,255,136,0.1)] bg-[rgba(0,255,136,0.04)]"
                          : "border-[rgba(0,229,255,0.1)] bg-[rgba(0,229,255,0.04)]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm ${
                              exp.color === "green"
                                ? "bg-[rgba(0,255,136,0.15)] text-[#00FF88] border border-[rgba(0,255,136,0.3)]"
                                : "bg-[rgba(0,229,255,0.15)] text-[#00E5FF] border border-[rgba(0,229,255,0.3)]"
                            }`}
                          >
                            {exp.logo}
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-base">{exp.company}</h3>
                            <p
                              className={`text-sm font-mono ${
                                exp.color === "green" ? "text-[#00FF88]" : "text-[#00E5FF]"
                              }`}
                            >
                              {exp.role}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-mono mb-1">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </div>
                          <span className="cyber-tag">{exp.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="px-6 py-5">
                      <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        {exp.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-2 mb-5">
                        {exp.responsibilities.map((resp) => (
                          <div key={resp} className="flex items-start gap-2">
                            <ChevronRight
                              className={`w-3 h-3 mt-0.5 flex-shrink-0 ${
                                exp.color === "green" ? "text-[#00FF88]" : "text-[#00E5FF]"
                              }`}
                            />
                            <span className="text-gray-400 text-xs">{resp}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className={exp.color === "green" ? "cyber-tag" : "cyber-tag cyber-tag-cyan"}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty column for alignment */}
                <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
