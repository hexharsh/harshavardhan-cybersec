"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "AI & Auto", href: "#ai-initiatives" },
  { label: "Skills", href: "#skills" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Projects", href: "#projects" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
    setActiveSection(href);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong border-b border-[rgba(0,255,136,0.15)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <Shield className="w-6 h-6 text-[#00FF88] group-hover:drop-shadow-[0_0_8px_rgba(0,255,136,0.8)] transition-all" />
            <div className="absolute inset-0 bg-[#00FF88] blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>
          <div>
            <span className="font-mono text-sm font-bold text-white tracking-wider">
              HV<span className="text-[#00FF88]">::</span>SEC
            </span>
          </div>
        </motion.div>

        {/* Status indicator */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-gray-500">
          <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse" />
          <span>SECURE_CONNECTION_ACTIVE</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all duration-200 ${
                activeSection === link.href
                  ? "text-[#00FF88] bg-[rgba(0,255,136,0.1)]"
                  : "text-gray-400 hover:text-[#00FF88] hover:bg-[rgba(0,255,136,0.05)]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="ml-3 btn-primary text-xs py-2 px-4"
          >
            &gt; Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#00FF88]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-[rgba(0,255,136,0.1)] px-6 py-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-2.5 text-sm font-mono text-gray-400 hover:text-[#00FF88] transition-colors"
              >
                <span className="text-[#00FF88]">&gt; </span>
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
