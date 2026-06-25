"use client";

import { useEffect, useRef } from "react";

interface FloatingText {
  x: number;
  y: number;
  text: string;
  alpha: number;
  speed: number;
  color: string;
  size: number;
}

interface ScanLine {
  y: number;
  speed: number;
  alpha: number;
}

interface RadarPing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export default function HackingVisuals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Floating hacking text snippets
    const hackTexts = [
      "SCANNING...", "0x4F 0x57 0x41 0x53", "CVE-2024-1337",
      "192.168.1.1", "PORT 443 OPEN", "SQL INJECTION",
      "XSS DETECTED", "PAYLOAD: <script>", "BURP SUITE PRO",
      "OWASP TOP 10", "AUTH BYPASS", "IDOR FOUND",
      "NMAP -sV -sC", "METASPLOIT", "PRIVESC ↑",
      "HASH: 5f4dcc3b", "ROOT ACCESS", "CVSSv3: 9.8",
      "/etc/passwd", "SHELL SPAWNED", "EXPLOIT SENT",
      "KALI LINUX", "REVERSE SHELL", "RECON COMPLETE",
      "TARGET: 10.0.0.1", "VULN FOUND!", "BURP INTERCEPT",
    ];

    const colors = ["rgba(0,255,136,", "rgba(0,229,255,", "rgba(59,130,246,"];

    const floatingTexts: FloatingText[] = [];
    const scanLines: ScanLine[] = [];
    const pings: RadarPing[] = [];

    // Initialize floating texts
    for (let i = 0; i < 18; i++) {
      floatingTexts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: hackTexts[Math.floor(Math.random() * hackTexts.length)],
        alpha: Math.random() * 0.4 + 0.05,
        speed: 0.15 + Math.random() * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 9 + Math.floor(Math.random() * 5),
      });
    }

    // Scan lines
    for (let i = 0; i < 3; i++) {
      scanLines.push({
        y: Math.random() * canvas.height,
        speed: 0.8 + Math.random() * 1.2,
        alpha: 0.06 + Math.random() * 0.08,
      });
    }

    // Spawn radar ping periodically
    let pingTimer = 0;

    function spawnPing() {
      pings.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: 80 + Math.random() * 80,
        alpha: 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Floating hacking texts ──
      floatingTexts.forEach((ft) => {
        ft.y -= ft.speed;
        if (ft.y < -20) {
          ft.y = canvas.height + 20;
          ft.x = Math.random() * canvas.width;
          ft.text = hackTexts[Math.floor(Math.random() * hackTexts.length)];
          ft.alpha = Math.random() * 0.35 + 0.05;
        }

        ctx.font = `${ft.size}px JetBrains Mono, monospace`;
        ctx.fillStyle = ft.color + ft.alpha + ")";
        ctx.shadowBlur = 6;
        ctx.shadowColor = ft.color + "0.5)";
        ctx.fillText(ft.text, ft.x, ft.y);
      });

      ctx.shadowBlur = 0;

      // ── Horizontal scan lines ──
      scanLines.forEach((sl) => {
        sl.y += sl.speed;
        if (sl.y > canvas.height) sl.y = 0;

        const grad = ctx.createLinearGradient(0, sl.y - 2, 0, sl.y + 2);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, `rgba(0,255,136,${sl.alpha})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, sl.y - 2, canvas.width, 4);
      });

      // ── Radar pings ──
      for (let i = pings.length - 1; i >= 0; i--) {
        const p = pings[i];
        p.radius += 1.5;
        p.alpha -= 0.008;

        if (p.alpha <= 0) {
          pings.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = p.color + p.alpha + ")";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color + "0.6)";
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Center dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.min(p.alpha * 3, 0.8) + ")";
        ctx.fill();
      }

      // Spawn ping every ~120 frames
      pingTimer++;
      if (pingTimer > 120) {
        spawnPing();
        pingTimer = 0;
      }
    }

    const animId = { id: 0 };
    function animate() {
      draw();
      animId.id = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId.id);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7, mixBlendMode: "screen" }}
    />
  );
}
