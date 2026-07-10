"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Globe, Smartphone, Network, Code2, Search, FileCheck, AlertTriangle } from "lucide-react";

const stats = [
  { value: 5, suffix: "+", label: "Years Experience", color: "green" },
  { value: 500, suffix: "+", label: "Vulnerabilities Assessed", color: "cyan" },
  { value: 50, suffix: "+", label: "Applications Tested", color: "blue" },
  { value: 50, suffix: "+", label: "Critical Findings", color: "green" },
  { value: 15, suffix: "+", label: "Enterprise Engagements", color: "cyan" },
];

const expertise = [
  { icon: Globe, label: "Web Security", desc: "OWASP Top 10, Business Logic Flaws, Auth Bypass" },
  { icon: Code2, label: "API Security", desc: "REST, GraphQL, SOAP — Full Attack Surface Coverage" },
  { icon: Smartphone, label: "Mobile Security", desc: "Android — Static & Dynamic Analysis" },
  { icon: Network, label: "Network Security", desc: "Internal & External Network Penetration Testing" },
  { icon: Search, label: "Manual Pentesting", desc: "Deep Dive Vulnerability Discovery & Validation" },
  { icon: AlertTriangle, label: "Vulnerability Assessment", desc: "Risk-based Prioritization & CVSS Scoring" },
  { icon: FileCheck, label: "Security Audits", desc: "Secure Code Review, Configuration Audits" },
  { icon: Shield, label: "Risk Assessment", desc: "Threat Modeling & Risk Mitigation Strategies" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 circuit-overlay" />
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">// ABOUT_ME.exe</p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Offensive Security{" "}
            <span className="gradient-text">Professional</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            An experienced offensive security professional who specializes in
            identifying, validating, and mitigating vulnerabilities before
            attackers can exploit them.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass neon-border-green rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] text-[#00FF88] tracking-widest">
                  // PROFILE.json
                </span>
              </div>
              <div className="font-mono text-xs text-gray-400 space-y-2">
                <div><span className="text-[#00E5FF]">"name"</span>: <span className="text-[#00FF88]">"Harshavardhan P"</span>,</div>
                <div><span className="text-[#00E5FF]">"role"</span>: <span className="text-[#00FF88]">"Associate Consultant @ KPMG India"</span>,</div>
                <div><span className="text-[#00E5FF]">"location"</span>: <span className="text-[#00FF88]">"Bangalore, Karnataka"</span>,</div>
                <div><span className="text-[#00E5FF]">"specialization"</span>: <span className="text-[#00FF88]">"VAPT"</span>,</div>
                <div><span className="text-[#00E5FF]">"certifications"</span>: [<span className="text-[#00FF88]">"CEH"</span>, <span className="text-[#00FF88]">"AZ-500"</span>, <span className="text-[#00FF88]">"SC-200"</span>, <span className="text-[#00FF88]">"ISO 42001"</span>],</div>
                <div><span className="text-[#00E5FF]">"threat_model"</span>: <span className="text-[#00FF88]">"Think like an attacker"</span>,</div>
                <div><span className="text-[#00E5FF]">"status"</span>: <span className="text-[#00FF88]">"Open to opportunities"</span></div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Associate Consultant at KPMG India with 5+ years of hands-on VAPT
              expertise. Previously a Security Analyst at Deutsche Bank (2021–2025),
              where I conducted end-to-end testing across web apps, APIs, and
              mobile environments — delivering consistent vulnerability findings and
              actionable remediation reports across multiple enterprise engagements.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              At KPMG India, my primary focus is Web Application VAPT — manually testing
              enterprise applications for OWASP Top 10 vulnerabilities, business logic flaws,
              authentication bypasses, and injection attacks. I also independently manage the
              Qualys VMDR program, driving risk-based prioritization and remediation closure
              across the organization.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["OWASP Top 10", "CEH", "CVSS", "SAST/DAST", "Web Security", "Vuln Management", "Burp Suite Pro"].map((tag) => (
                <span key={tag} className="cyber-tag">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass rounded-xl p-5 text-center glow-card ${
                    stat.color === "green"
                      ? "border border-[rgba(0,255,136,0.2)]"
                      : stat.color === "cyan"
                      ? "border border-[rgba(0,229,255,0.2)]"
                      : "border border-[rgba(59,130,246,0.2)]"
                  } ${i === 4 ? "col-span-2" : ""}`}
                >
                  <div
                    className={`text-3xl font-black font-mono ${
                      stat.color === "green"
                        ? "text-[#00FF88]"
                        : stat.color === "cyan"
                        ? "text-[#00E5FF]"
                        : "text-[#3B82F6]"
                    }`}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] font-mono text-gray-500 tracking-wider uppercase mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Expertise grid */}
        <div className="mt-16">
          <p className="section-label text-center mb-8">// EXPERTISE_MATRIX</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {expertise.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass neon-border-green rounded-xl p-5 glow-card group"
              >
                <item.icon className="w-6 h-6 text-[#00FF88] mb-3 group-hover:drop-shadow-[0_0_6px_rgba(0,255,136,0.8)] transition-all" />
                <h3 className="text-white font-semibold text-sm mb-1">{item.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
