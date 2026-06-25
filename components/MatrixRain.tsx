"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);

    // Each column: position, speed, color theme, brightness
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -50);
    const speeds: number[] = Array(columns).fill(0).map(() => 0.3 + Math.random() * 0.7);
    const themes: number[] = Array(columns).fill(0).map(() => Math.floor(Math.random() * 3));

    const chars = "01アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%^&*<>/\\{}[]|;:";
    const colors = [
      { head: "#ffffff", body: "rgba(0,255,136,", dim: "rgba(0,180,90," },
      { head: "#00ffff", body: "rgba(0,229,255,", dim: "rgba(0,150,180," },
      { head: "#ffffff", body: "rgba(59,130,246,", dim: "rgba(30,80,180," },
    ];

    function draw() {
      if (!ctx || !canvas) return;

      // Semi-transparent fade
      ctx.fillStyle = "rgba(5,5,5,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const theme = colors[themes[i]];
        const y = drops[i] * fontSize;

        // Bright glowing head character
        const headChar = chars[Math.floor(Math.random() * chars.length)];
        ctx.shadowBlur = 12;
        ctx.shadowColor = theme.body + "1)";
        ctx.fillStyle = theme.head;
        ctx.fillText(headChar, i * fontSize, y);

        // Body trail — fading
        for (let t = 1; t < 6; t++) {
          const trailChar = chars[Math.floor(Math.random() * chars.length)];
          const alpha = (1 - t / 6) * 0.6;
          ctx.shadowBlur = 4;
          ctx.fillStyle = theme.body + alpha + ")";
          ctx.fillText(trailChar, i * fontSize, y - t * fontSize);
        }

        ctx.shadowBlur = 0;

        drops[i] += speeds[i];

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
          drops[i] = Math.random() * -20;
          themes[i] = Math.floor(Math.random() * 3);
          speeds[i] = 0.3 + Math.random() * 0.7;
        }
      }
    }

    const interval = setInterval(draw, 40);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.18, mixBlendMode: "screen" }}
    />
  );
}
