"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulseSpeed: number;
  pulseVal: number;
  mass: number;
}

interface GravityNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  color: string;
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

    // Determine particle count based on screen width for maximum performance
    const isMobile = width < 768;
    const particleCount = isMobile ? 32 : 65;
    const gravityNodeCount = isMobile ? 2 : 4;

    // Cosmic color palette
    const darkStarColors = [
      "rgba(56, 189, 248, 0.8)",  // Cyan
      "rgba(129, 140, 248, 0.8)", // Indigo
      "rgba(192, 132, 252, 0.8)", // Violet
      "rgba(52, 211, 153, 0.75)", // Emerald
      "rgba(255, 255, 255, 0.85)", // Starlight White
    ];

    const lightStarColors = [
      "rgba(68, 88, 220, 0.35)",
      "rgba(133, 79, 238, 0.35)",
      "rgba(16, 185, 129, 0.35)",
    ];

    const starColors = isDark ? darkStarColors : lightStarColors;

    // Create star particles
    const particles: StarParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI * 2,
        mass: radius * 1.5,
      });
    }

    // Gravitational anchors (pulsars in the cosmic neural universe)
    const gravityNodes: GravityNode[] = [];
    for (let i = 0; i < gravityNodeCount; i++) {
      gravityNodes.push({
        x: (width / (gravityNodeCount + 1)) * (i + 1) + (Math.random() - 0.5) * 150,
        y: (height / 2) + (Math.random() - 0.5) * 250,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: isDark ? 4.5 : 3.5,
        pulse: Math.random() * Math.PI,
        color: isDark ? "rgba(56, 189, 248, 0.9)" : "rgba(68, 88, 220, 0.5)",
      });
    }

    // Track mouse coordinates for interactive gravitational pull
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseActive = false;
    let mouseTimer: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        isMouseActive = false;
      }, 3500);
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      isMouseActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Render loop
    const maxConnectionDist = isMobile ? 95 : 130;
    const mouseGravityRadius = isMobile ? 120 : 180;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // In dark mode: paint subtle cosmic atmospheric nebula dust
      if (isDark) {
        // Deep ambient glow 1 (Cyan/Blue)
        const radGrad1 = ctx.createRadialGradient(width * 0.2, height * 0.25, 0, width * 0.2, height * 0.25, width * 0.45);
        radGrad1.addColorStop(0, "rgba(14, 165, 233, 0.04)");
        radGrad1.addColorStop(1, "transparent");
        ctx.fillStyle = radGrad1;
        ctx.fillRect(0, 0, width, height);

        // Deep ambient glow 2 (Violet/Indigo)
        const radGrad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, width * 0.5);
        radGrad2.addColorStop(0, "rgba(168, 85, 247, 0.04)");
        radGrad2.addColorStop(1, "transparent");
        ctx.fillStyle = radGrad2;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and draw gravitational pulsar anchors
      for (let g = 0; g < gravityNodes.length; g++) {
        const node = gravityNodes[g];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.035;

        // Bounce within viewport boundaries
        if (node.x < 50 || node.x > width - 50) node.vx *= -1;
        if (node.y < 50 || node.y > height - 50) node.vy *= -1;

        if (isDark) {
          // Draw orbital ring around gravity anchor
          const ringRadius = node.radius * 5 + Math.sin(node.pulse) * 4;
          ctx.beginPath();
          ctx.arc(node.x, node.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Outer glowing aura
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(129, 140, 248, 0.25)";
          ctx.fill();

          // Core node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = "#38bdf8";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Process star particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gravitational pull toward nearby gravity nodes
        for (let g = 0; g < gravityNodes.length; g++) {
          const gn = gravityNodes[g];
          const gdx = gn.x - p.x;
          const gdy = gn.y - p.y;
          const gdist = Math.sqrt(gdx * gdx + gdy * gdy);
          if (gdist > 30 && gdist < 260) {
            const force = (1 / gdist) * 0.025;
            p.vx += gdx * force;
            p.vy += gdy * force;
          }
        }

        // Interactive mouse gravity effect
        if (isMouseActive) {
          const mdx = mouseX - p.x;
          const mdy = mouseY - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseGravityRadius && mdist > 15) {
            // Gentle gravitational pull towards cursor
            const mouseForce = (1 - mdist / mouseGravityRadius) * 0.045;
            p.vx += mdx * mouseForce;
            p.vy += mdy * mouseForce;

            // Render interactive neural thread to cursor
            if (isDark) {
              const alpha = (1 - mdist / mouseGravityRadius) * 0.35;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // Apply friction to prevent speed buildup
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Position update
        p.x += p.vx;
        p.y += p.vy;
        p.pulseVal += p.pulseSpeed;

        // Wrap around screen edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw neural constellation connections between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDist) {
            const alpha = (1 - dist / maxConnectionDist) * (isDark ? 0.22 : 0.09);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(99, 102, 241, ${alpha})`
              : `rgba(68, 88, 220, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw particle
        const currentRadius = p.baseRadius + Math.sin(p.pulseVal) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        if (isDark) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mouseTimer);
    };
  }, [theme]);

  return (
    <div
      className="gravity_universe_container"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        opacity: theme === "dark" ? 0.95 : 0.35,
        transition: "opacity 0.5s ease",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
