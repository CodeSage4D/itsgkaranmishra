"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface LightningSpark {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  life: number;
  maxLife: number;
  color: string;
  width: number;
}

export const GravityUniverseBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = theme === "dark";

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Interactive mouse state for reactive lightning streaks
    let mouseX = -9999;
    let mouseY = -9999;
    let prevMouseX = -9999;
    let prevMouseY = -9999;
    let isMouseMoving = false;
    let mouseTimeout: ReturnType<typeof setTimeout>;

    const sparks: LightningSpark[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;

      // Spawn reactive neon laser micro-sparks on cursor move
      if (prevMouseX > 0 && Math.random() < 0.35 && sparks.length < 24) {
        const colors = isDark
          ? ["#CEA17A", "#73C4BF", "#38bdf8", "#d4af37"]
          : ["#062456", "#CEA17A", "#0284c7"];
        sparks.push({
          x: prevMouseX + (Math.random() - 0.5) * 15,
          y: prevMouseY + (Math.random() - 0.5) * 15,
          targetX: mouseX + (Math.random() - 0.5) * 40,
          targetY: mouseY + (Math.random() - 0.5) * 40,
          life: 1,
          maxLife: 20 + Math.random() * 15,
          color: colors[Math.floor(Math.random() * colors.length)],
          width: Math.random() * 1.8 + 0.6,
        });
      }

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 1500);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Flowing Neon Waves parameters
    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // 1. Base Canvas Fill: 100% Pure Deep Black in Dark Mode
      if (isDark) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        // Subtle ambient radial velvet glow (Navy & Champagne)
        const darkGlow1 = ctx.createRadialGradient(
          width * 0.2,
          height * 0.25,
          50,
          width * 0.2,
          height * 0.25,
          width * 0.6
        );
        darkGlow1.addColorStop(0, "rgba(6, 36, 86, 0.18)");
        darkGlow1.addColorStop(0.6, "rgba(9, 23, 31, 0.08)");
        darkGlow1.addColorStop(1, "transparent");
        ctx.fillStyle = darkGlow1;
        ctx.fillRect(0, 0, width, height);

        const darkGlow2 = ctx.createRadialGradient(
          width * 0.85,
          height * 0.75,
          50,
          width * 0.85,
          height * 0.75,
          width * 0.5
        );
        darkGlow2.addColorStop(0, "rgba(206, 161, 122, 0.08)");
        darkGlow2.addColorStop(1, "transparent");
        ctx.fillStyle = darkGlow2;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Pristine Silk Pearl for Light Mode
        ctx.fillStyle = "#fcfdfd";
        ctx.fillRect(0, 0, width, height);

        const lightGlow = ctx.createRadialGradient(
          width * 0.5,
          height * 0.15,
          50,
          width * 0.5,
          height * 0.15,
          width * 0.7
        );
        lightGlow.addColorStop(0, "rgba(206, 161, 122, 0.06)");
        lightGlow.addColorStop(0.5, "rgba(115, 196, 191, 0.04)");
        lightGlow.addColorStop(1, "transparent");
        ctx.fillStyle = lightGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Harmonic Ethereal Waves (No dots/balls, pure luminous ribbons)
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const yOffset = height * (0.35 + w * 0.2);
        const waveSpeed = time * (1 + w * 0.4);
        const amplitude = 35 + w * 20;

        ctx.moveTo(0, yOffset);
        for (let x = 0; x <= width; x += 15) {
          const y =
            yOffset +
            Math.sin(x * 0.0025 + waveSpeed) * amplitude +
            Math.cos(x * 0.0012 + waveSpeed * 0.6) * (amplitude * 0.4);
          ctx.lineTo(x, y);
        }

        if (isDark) {
          const strokeAlpha = 0.07 + w * 0.04;
          const waveGrad = ctx.createLinearGradient(0, yOffset, width, yOffset);
          waveGrad.addColorStop(0, `rgba(206, 161, 122, ${strokeAlpha * 0.6})`);
          waveGrad.addColorStop(0.5, `rgba(56, 189, 248, ${strokeAlpha * 0.9})`);
          waveGrad.addColorStop(1, `rgba(115, 196, 191, ${strokeAlpha * 0.6})`);
          ctx.strokeStyle = waveGrad;
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = `rgba(6, 36, 86, ${0.04 + w * 0.02})`;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      }

      // 3. Interactive Lightning Streaks / Neon Laser Micro-Filaments
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += 1;

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        const progress = s.life / s.maxLife;
        const currentAlpha = Math.sin(progress * Math.PI) * (isDark ? 0.75 : 0.45);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);

        // Subtle electric jitter in the stroke
        const midX = (s.x + s.targetX) / 2 + (Math.random() - 0.5) * 8;
        const midY = (s.y + s.targetY) / 2 + (Math.random() - 0.5) * 8;
        ctx.quadraticCurveTo(midX, midY, s.targetX, s.targetY);

        ctx.strokeStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.lineWidth = s.width;
        if (isDark) {
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 8;
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      // 4. Subtle Cursor Laser Focal Ring
      if (isMouseMoving && isDark) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 32, 0, Math.PI * 2);
        const cursorGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 32);
        cursorGlow.addColorStop(0, "rgba(206, 161, 122, 0.12)");
        cursorGlow.addColorStop(1, "transparent");
        ctx.fillStyle = cursorGlow;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(mouseTimeout);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      id="gravity-universe-canvas"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        display: "block",
        willChange: "transform",
      }}
    />
  );
};
