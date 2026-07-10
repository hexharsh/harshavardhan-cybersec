"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="relative border-t border-[rgba(0,255,136,0.1)] overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass neon-border-green rounded-xl p-6 mb-8"
        >
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-gray-400">
            {["About", "Experience", "Skills", "Projects", "Certifications", "Contact"].map((label) => (
              <button
                key={label}
                onClick={() => document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-[#00FF88] transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#00FF88]" />
            <div>
              <div className="font-mono text-sm text-white font-bold">
                HV<span className="text-[#00FF88]">::</span>SEC
              </div>
              <div className="font-mono text-[10px] text-gray-600">
                Harshavardhan P — Associate Consultant @ KPMG India
              </div>
            </div>
          </div>

          <div className="font-mono text-[10px] text-gray-600 text-center">
            <div className="text-[#00FF88] mb-1">
              &gt; © {new Date().getFullYear()} Harsha Vardhan. All rights reserved.
            </div>
            <div>Session: {time ? time.toLocaleTimeString("en-US", { hour12: false }) : "--:--:--"} UTC | Secure Connection Active</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-[#00FF88]">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
