"use client";

import { motion } from "framer-motion";
import { Award, Shield, BookOpen, Target, CheckCircle, GraduationCap } from "lucide-react";

const certs = [
  {
    name: "CEH",
    full: "Certified Ethical Hacker",
    issuer: "EC-Council Trained",
    icon: Shield,
    color: "green",
    desc: "Trained in CEH methodology covering ethical hacking, penetration testing frameworks, and advanced offensive security techniques.",
    skills: ["Footprinting", "Scanning", "Exploitation", "Post-Exploitation"],
  },
  {
    name: "VAPT",
    full: "Vulnerability Assessment & Penetration Testing",
    issuer: "Trained Security Tester",
    icon: Target,
    color: "cyan",
    desc: "Trained Security Tester with hands-on VAPT expertise across web, API, mobile, and network environments at Deutsche Bank.",
    skills: ["VA Scanning", "Manual Testing", "Report Writing", "Remediation"],
  },
  {
    name: "OWASP",
    full: "OWASP Top 10 Specialist",
    issuer: "Practical Expertise",
    icon: BookOpen,
    color: "blue",
    desc: "Deep practical expertise in all OWASP Top 10 web and API security risks — detection, exploitation, and remediation.",
    skills: ["Injection", "Broken Auth", "IDOR", "Misconfig"],
  },
  {
    name: "DAST",
    full: "Dynamic Application Security Testing",
    issuer: "Veracode / AppScan",
    icon: Award,
    color: "green",
    desc: "Experienced with enterprise DAST platforms including Veracode, AppScan Standard, and SonarQube for continuous security testing.",
    skills: ["Veracode", "AppScan", "SonarQube", "ZAP"],
  },
];

const colorMap = {
  green: {
    border: "border-[rgba(0,255,136,0.25)]",
    bg: "bg-[rgba(0,255,136,0.05)]",
    icon: "text-[#00FF88]",
    iconBg: "bg-[rgba(0,255,136,0.12)]",
    tag: "cyber-tag",
    badge: "text-[#00FF88]",
    glow: "hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]",
  },
  cyan: {
    border: "border-[rgba(0,229,255,0.25)]",
    bg: "bg-[rgba(0,229,255,0.05)]",
    icon: "text-[#00E5FF]",
    iconBg: "bg-[rgba(0,229,255,0.12)]",
    tag: "cyber-tag cyber-tag-cyan",
    badge: "text-[#00E5FF]",
    glow: "hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]",
  },
  blue: {
    border: "border-[rgba(59,130,246,0.25)]",
    bg: "bg-[rgba(59,130,246,0.05)]",
    icon: "text-[#3B82F6]",
    iconBg: "bg-[rgba(59,130,246,0.12)]",
    tag: "cyber-tag cyber-tag-blue",
    badge: "text-[#3B82F6]",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 hex-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">// CREDENTIALS.verified</p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Certifications & <span className="gradient-text">Credentials</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certs.map((cert, i) => {
            const colors = colorMap[cert.color as keyof typeof colorMap];
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`glass rounded-xl overflow-hidden border transition-all duration-300 cursor-default ${colors.border} ${colors.glow}`}
              >
                {/* Header */}
                <div className={`px-5 py-5 ${colors.bg} border-b ${colors.border} text-center`}>
                  {/* Animated hex badge */}
                  <div className="relative mx-auto w-20 h-20 mb-3 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 rounded-xl border-2 ${colors.border} animate-pulse`}
                      style={{ animationDuration: "3s" }}
                    />
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
                      <cert.icon className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                    <CheckCircle
                      className={`absolute -top-1 -right-1 w-5 h-5 ${colors.icon} bg-[#050505] rounded-full`}
                    />
                  </div>
                  <div className={`text-2xl font-black font-mono ${colors.badge}`}>{cert.name}</div>
                  <div className="text-[10px] font-mono text-gray-500 mt-0.5">{cert.issuer}</div>
                </div>

                {/* Body */}
                <div className="px-5 py-4">
                  <h3 className="text-white text-sm font-semibold mb-2">{cert.full}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{cert.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((s) => (
                      <span key={s} className={`${colors.tag} text-[9px]`}>{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="section-label mb-6 text-center">// EDUCATION.log</p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                degree: "Master of Business Administration (MBA)",
                year: "2020",
                institution: "Sri Krishnadevaraya University",
                location: "Ananthapur, Andhra Pradesh",
                color: "cyan",
              },
              {
                degree: "Bachelor of Commerce (B.Com)",
                year: "2018",
                institution: "Vivekananda Degree College",
                location: "Anantapur, Andhra Pradesh",
                color: "green",
              },
            ].map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-xl p-6 border ${
                  edu.color === "cyan"
                    ? "border-[rgba(0,229,255,0.2)]"
                    : "border-[rgba(0,255,136,0.2)]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    edu.color === "cyan"
                      ? "bg-[rgba(0,229,255,0.12)] border border-[rgba(0,229,255,0.3)]"
                      : "bg-[rgba(0,255,136,0.12)] border border-[rgba(0,255,136,0.3)]"
                  }`}>
                    <GraduationCap className={`w-5 h-5 ${edu.color === "cyan" ? "text-[#00E5FF]" : "text-[#00FF88]"}`} />
                  </div>
                  <div>
                    <div className={`font-mono text-xs mb-1 ${edu.color === "cyan" ? "text-[#00E5FF]" : "text-[#00FF88]"}`}>
                      {edu.year}
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">{edu.degree}</h3>
                    <p className="text-gray-400 text-xs">{edu.institution}</p>
                    <p className="text-gray-600 text-xs font-mono">{edu.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
