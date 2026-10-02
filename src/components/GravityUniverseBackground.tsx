"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  pulseSpeed: number;
  depth: number; // 0 (far) to 1 (near) for 3D parallax feel
}

interface SynapticPulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
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

    // Node density scaled for flawless performance
    const isMobile = width < 768;
    const nodeCount = isMobile ? 36 : 72;
    const connectionDistance = isMobile ? 120 : 160;

    // Royal Luxury Palette based on Noguchi Design & Aurxon Brand
    const darkNodeColors = [
      { fill: "#CEA17A", glow: "rgba(206, 161, 122, 0.6)" }, // Champagne Gold
      { fill: "#73C4BF", glow: "rgba(115, 196, 191, 0.6)" }, // Arctic Opal Teal
      { fill: "#38bdf8", glow: "rgba(56, 189, 248, 0.5)" },  // Royal Cyan
      { fill: "#a78bfa", glow: "rgba(167, 139, 250, 0.5)" }, // Ethereal Violet
      { fill: "#ffffff", glow: "rgba(255, 255, 255, 0.7)" }, // Pure Starlight
    ];

    const lightNodeColors = [
      { fill: "#062456", glow: "rgba(6, 36, 86, 0.3)" },    // Royal Sapphire
      { fill: "#CEA17A", glow: "rgba(206, 161, 122, 0.4)" }, // Champagne Gold
      { fill: "#0284c7", glow: "rgba(2, 132, 199, 0.3)" },  // Aegean Blue
      { fill: "#0d9488", glow: "rgba(13, 148, 136, 0.3)" }, // Emerald Opal
    ];

    const palette = isDark ? darkNodeColors : lightNodeColors;

    // Instantiate Neural Nodes
    const nodes: NeuralNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const col = palette[Math.floor(Math.random() * palette.length)];
      const depth = Math.random();
      const baseRadius = 1.2 + depth * 1.8;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.35 + depth * 0.25),
        vy: (Math.random() - 0.5) * (0.35 + depth * 0.25),
        baseRadius,
        radius: baseRadius,
        color: col.fill,
        glowColor: col.glow,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        depth,
      });
    }

    // Synaptic transmission pulses
    const pulses: SynapticPulse[] = [];

    // Interactive Gravitational Field
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseActive = false;
    let mouseTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseActive = false;
      }, 2500);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Cosmic Neural Gradient (Atmospheric Deep Field)
      if (isDark) {
        // Deep obsidian abyss with subtle royal indigo radial depths
        const bgGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.35,
          width * 0.1,
          width * 0.5,
          height * 0.5,
          width * 0.8
        );
        bgGrad.addColorStop(0, "rgba(9, 23, 31, 0.55)");
        bgGrad.addColorStop(0.5, "rgba(6, 11, 20, 0.75)");
        bgGrad.addColorStop(1, "rgba(4, 7, 13, 0.92)");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Faint champagne gold ethereal glow at bottom-right
        const goldGlow = ctx.createRadialGradient(
          width * 0.85,
          height * 0.8,
          10,
          width * 0.85,
          height * 0.8,
          width * 0.4
        );
        goldGlow.addColorStop(0, "rgba(206, 161, 122, 0.04)");
        goldGlow.addColorStop(1, "transparent");
        ctx.fillStyle = goldGlow;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Pristine glacial silk ivory for light mode
        const bgGradLight = ctx.createRadialGradient(
          width * 0.5,
          height * 0.2,
          100,
          width * 0.5,
          height * 0.5,
          width * 0.8
        );
        bgGradLight.addColorStop(0, "rgba(248, 250, 252, 0.6)");
        bgGradLight.addColorStop(0.6, "rgba(241, 245, 249, 0.75)");
        bgGradLight.addColorStop(1, "rgba(235, 240, 246, 0.88)");
        ctx.fillStyle = bgGradLight;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and Draw Neural Connections (Constellation Geometric Web)
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move nodes with gentle inertia
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Wrap around boundaries smoothly
        if (nodeA.x < -20) nodeA.x = width + 20;
        if (nodeA.x > width + 20) nodeA.x = -20;
        if (nodeA.y < -20) nodeA.y = height + 20;
        if (nodeA.y > height + 20) nodeA.y = -20;

        // Gravitational Cursor Reaction
        if (isMouseActive) {
          const dx = mouseX - nodeA.x;
          const dy = mouseY - nodeA.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          if (distToMouse < 220 && distToMouse > 20) {
            const force = (1 - distToMouse / 220) * 0.08 * (nodeA.depth + 0.5);
            nodeA.vx += (dx / distToMouse) * force;
            nodeA.vy += (dy / distToMouse) * force;
          }
        }

        // Dampen velocity to prevent runaway speeds
        nodeA.vx *= 0.992;
        nodeA.vy *= 0.992;

        // Quantum pulse
        nodeA.pulsePhase += nodeA.pulseSpeed;
        nodeA.radius = nodeA.baseRadius + Math.sin(nodeA.pulsePhase) * 0.6;

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * (isDark ? 0.35 : 0.22);

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);

            if (isDark) {
              // Dual-color gradient for luxury champagne-to-opal connections
              const lineGrad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
              lineGrad.addColorStop(0, `rgba(206, 161, 122, ${alpha * 0.8})`);
              lineGrad.addColorStop(1, `rgba(115, 196, 191, ${alpha * 0.8})`);
              ctx.strokeStyle = lineGrad;
            } else {
              ctx.strokeStyle = `rgba(6, 36, 86, ${alpha * 0.6})`;
            }

            ctx.lineWidth = (1 - dist / connectionDistance) * 1.2;
            ctx.stroke();

            // Random chance to initiate a synaptic energy pulse between nodes
            if (Math.random() < 0.0006 && pulses.length < 18) {
              pulses.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
                color: isDark ? "#CEA17A" : "#062456",
              });
            }
          }
        }
      }

      // 3. Render Synaptic Data Pulses (Traveling Photons of Thought)
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const nodeA = nodes[pulse.fromNode];
        const nodeB = nodes[pulse.toNode];
        if (!nodeA || !nodeB) {
          pulses.splice(p, 1);
          continue;
        }

        const px = nodeA.x + (nodeB.x - nodeA.x) * pulse.progress;
        const py = nodeA.y + (nodeB.y - nodeA.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, isDark ? 2.4 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#ffffff" : pulse.color;
        if (isDark) {
          ctx.shadowColor = "#CEA17A";
          ctx.shadowBlur = 10;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }

      // 4. Draw Neural Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Luminous outer aura
        if (isDark) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = node.glowColor;
          ctx.fill();
        }

        // Core star point
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.8, node.radius), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      // 5. Interactive Cursor Singularity Glow
      if (isMouseActive) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
        const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 40);
        mouseGlow.addColorStop(0, isDark ? "rgba(115, 196, 191, 0.18)" : "rgba(6, 36, 86, 0.08)");
        mouseGlow.addColorStop(1, "transparent");
        ctx.fillStyle = mouseGlow;
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
