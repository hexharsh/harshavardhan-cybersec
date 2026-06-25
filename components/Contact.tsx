"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Globe, Phone, MapPin, Send, Lock, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [encrypting, setEncrypting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEncrypting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setEncrypting(false);
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "paliviriharshavardhan1998@gmail.com",
      href: "mailto:paliviriharshavardhan1998@gmail.com",
      color: "green",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/harshavardhanpaliviri",
      href: "https://www.linkedin.com/in/harshavardhanpaliviri",
      color: "cyan",
    },
    {
      icon: Globe,
      label: "Portfolio",
      value: "harshavardhan-cybersec.vercel.app",
      href: "https://harshavardhan-cybersec.vercel.app",
      color: "blue",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9666730668",
      href: "tel:+919666730668",
      color: "green",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bangalore, Karnataka",
      href: "#",
      color: "cyan",
    },
  ];

  const colorMap = {
    green: { icon: "text-[#00FF88]", bg: "bg-[rgba(0,255,136,0.1)]", border: "border-[rgba(0,255,136,0.2)]" },
    cyan: { icon: "text-[#00E5FF]", bg: "bg-[rgba(0,229,255,0.1)]", border: "border-[rgba(0,229,255,0.2)]" },
    blue: { icon: "text-[#3B82F6]", bg: "bg-[rgba(59,130,246,0.1)]", border: "border-[rgba(59,130,246,0.2)]" },
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      <div className="absolute inset-0 circuit-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">// SECURE_COMMS.encrypted</p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Establish <span className="gradient-text">Secure Contact</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm">
            All transmissions are encrypted end-to-end. Available for enterprise
            engagements, security consultations, and collaboration.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="glass neon-border-green rounded-xl p-5 mb-6">
              <div className="font-mono text-xs text-[#00FF88] mb-3">// CONNECTION_STATUS</div>
              <div className="space-y-2">
                {[
                  { label: "Secure Channel", value: "ESTABLISHED", color: "#00FF88" },
                  { label: "Encryption", value: "AES-256-GCM", color: "#00E5FF" },
                  { label: "Response Time", value: "< 24 HOURS", color: "#3B82F6" },
                  { label: "Availability", value: "OPEN TO HIRE", color: "#00FF88" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-500">{row.label}</span>
                    <span style={{ color: row.color }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {contactInfo.map((item, i) => {
              const colors = colorMap[item.color as keyof typeof colorMap];
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 glass rounded-xl p-4 border transition-all duration-200 glow-card ${colors.border}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
                    <item.icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">{item.label}</div>
                    <div className="text-white text-sm font-mono">{item.value}</div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass neon-border-green rounded-xl overflow-hidden">
              {/* Form header */}
              <div className="px-6 py-4 bg-[rgba(0,255,136,0.05)] border-b border-[rgba(0,255,136,0.1)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#00FF88]" />
                    <span className="font-mono text-xs text-[#00FF88]">SECURE_MESSAGE_FORM</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] text-[#00FF88]">ENCRYPTED</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "name", label: "Name", placeholder: "Your name" },
                    { id: "email", label: "Email", placeholder: "your@email.com", type: "email" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                        {field.label}
                      </label>
                      <input
                        type={field.type ?? "text"}
                        value={form[field.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,136,0.2)] rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,255,136,0.5)] focus:shadow-[0_0_10px_rgba(0,255,136,0.1)] transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Security consultation / Engagement inquiry"
                    required
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,136,0.2)] rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,255,136,0.5)] focus:shadow-[0_0_10px_rgba(0,255,136,0.1)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your security requirements..."
                    required
                    rows={4}
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,136,0.2)] rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,255,136,0.5)] focus:shadow-[0_0_10px_rgba(0,255,136,0.1)] transition-all resize-none"
                  />
                </div>

                {/* Encryption status */}
                {(encrypting || sending) && (
                  <div className="font-mono text-xs text-[#00FF88] animate-pulse">
                    {encrypting ? ">> Encrypting message with AES-256..." : ">> Transmitting secure packet..."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending || encrypting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sent ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Message Transmitted
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {encrypting ? "Encrypting..." : sending ? "Transmitting..." : "Send Encrypted Message"}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
