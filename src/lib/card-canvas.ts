"use client";

export type CardTheme = "glacier" | "titanium" | "cyber";

export interface CardDownloadOptions {
  format?: "png" | "jpeg";
  theme?: CardTheme;
  autoDownload?: boolean;
}

/**
 * Downloads a vCard (.vcf) directly into the user's phone or computer contacts list
 */
export function downloadVCardContact(): void {
  if (typeof window === "undefined") return;

  const vCardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Karan Mishra",
    "N:Mishra;Karan;;;",
    "ORG:Aurxon",
    "TITLE:Founder & Chief AI Architect",
    "TEL;TYPE=CELL,VOICE,WHATSAPP:+917804895074",
    "EMAIL;TYPE=WORK,INTERNET:karannmishra136@gmail.com",
    "URL:https://aurxon.com",
    "URL;TYPE=Portfolio:https://itsgkaranmishra.web.app",
    "URL;TYPE=GitHub:https://github.com/CodeSage4D",
    "URL;TYPE=LinkedIn:https://linkedin.com/in/karannmishra136",
    "URL;TYPE=Instagram:https://instagram.com/karannmishra136",
    "URL;TYPE=Company-Instagram:https://instagram.com/buildwithaurxon",
    "ADR;TYPE=WORK:;;Killa Maidan, VIP Road;Indore;Madhya Pradesh;452006;India",
    "NOTE:Founder at Aurxon • Next Gen AI Solutions • Where Intelligence Meets Innovation.",
    "REV:" + new Date().toISOString(),
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Karan_Mishra_Aurxon_Contact.vcf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates an ultra-high-resolution 9:16 portrait digital smart business card
 * with crystal clear typography, oceanic glacier gradients, official logos, and QR code.
 */
export async function generateAndDownloadBusinessCard(
  format: "png" | "jpeg" = "png",
  theme: CardTheme = "glacier"
): Promise<string> {
  if (typeof window === "undefined") return "";

  // 1080 x 1920 high-res portrait resolution
  const width = 1080;
  const height = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Enable crisp text rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  if (theme === "glacier") {
    // ==========================================
    // THEME 1: PURE ATLANTIC OCEAN & GLACIER BLUE (Crystal Light Mode)
    // ==========================================
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "#ffffff");
    bgGrad.addColorStop(0.2, "#f0f9ff");
    bgGrad.addColorStop(0.55, "#e0f2fe");
    bgGrad.addColorStop(0.85, "#bae6fd");
    bgGrad.addColorStop(1, "#93c5fd");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle oceanic ambient waves / rings
    ctx.save();
    const oceanCircle = ctx.createRadialGradient(840, 200, 10, 840, 200, 500);
    oceanCircle.addColorStop(0, "rgba(56, 189, 248, 0.22)");
    oceanCircle.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = oceanCircle;
    ctx.beginPath();
    ctx.arc(840, 200, 500, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Bottom left glacial glow
    ctx.save();
    const bottomGlow = ctx.createRadialGradient(200, 1700, 20, 200, 1700, 480);
    bottomGlow.addColorStop(0, "rgba(14, 165, 233, 0.18)");
    bottomGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = bottomGlow;
    ctx.beginPath();
    ctx.arc(200, 1700, 480, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Outer Card Border
    ctx.save();
    ctx.strokeStyle = "rgba(2, 132, 199, 0.35)";
    ctx.lineWidth = 4;
    roundRect(ctx, 40, 40, width - 80, height - 80, 44);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 2;
    roundRect(ctx, 54, 54, width - 108, height - 108, 38);
    ctx.stroke();
    ctx.restore();

    // Company Header Block
    // Brand Emblem Circle
    ctx.save();
    const badgeX = 540;
    const badgeY = 150;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#0284c7";
    ctx.lineWidth = 3;
    ctx.shadowColor = "rgba(2, 132, 199, 0.25)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 6;
    roundRect(ctx, badgeX - 52, badgeY - 52, 104, 104, 28);
    ctx.fill();
    ctx.stroke();

    // Try loading Aurxon logo icon or fallback AX
    try {
      await drawImageOntoCanvas(ctx, "/img/png/logo-color.png", badgeX - 44, badgeY - 44, 88, 88);
    } catch {
      ctx.fillStyle = "#0284c7";
      ctx.font = "900 44px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AX", badgeX, badgeY);
    }
    ctx.restore();

    // Brand Name: Aurxon only
    ctx.fillStyle = "#0c4a6e"; // Deep Atlantic Navy
    ctx.font = "900 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("AURXON", 540, 244);

    // Official Tagline: Next Gen AI Solutions
    ctx.fillStyle = "#0284c7";
    ctx.font = "800 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Aurxon - Next Gen AI Solutions", 540, 280);

    // Sub-tagline: Where Intelligence Meets Innovation
    ctx.save();
    const tagW = 500;
    const tagH = 34;
    ctx.fillStyle = "rgba(2, 132, 199, 0.1)";
    ctx.strokeStyle = "rgba(2, 132, 199, 0.25)";
    ctx.lineWidth = 1;
    roundRect(ctx, 540 - tagW / 2, 298, tagW, tagH, 17);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0369a1";
    ctx.font = "700 16px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("WHERE INTELLIGENCE MEETS INNOVATION", 540, 298 + tagH / 2);
    ctx.restore();

    // Divider
    ctx.save();
    const divGrad = ctx.createLinearGradient(200, 350, 880, 350);
    divGrad.addColorStop(0, "transparent");
    divGrad.addColorStop(0.5, "rgba(2, 132, 199, 0.45)");
    divGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 350);
    ctx.lineTo(880, 350);
    ctx.stroke();
    ctx.restore();

    // Executive Identity
    ctx.fillStyle = "#082f49";
    ctx.font = "900 68px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Karan Mishra", 540, 426);

    ctx.fillStyle = "#0284c7";
    ctx.font = "800 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Founder • Aurxon", 540, 474);

    // Specialty Pill
    ctx.save();
    const pillW = 560;
    const pillH = 46;
    const pillX = 540 - pillW / 2;
    const pillY = 496;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(2, 132, 199, 0.15)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 4;
    roundRect(ctx, pillX, pillY, pillW, pillH, 23);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0369a1";
    ctx.font = "800 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("MACHINE LEARNING & PYTHON ARCHITECT", 540, pillY + pillH / 2);
    ctx.restore();

    // QR Code Frame
    const qrBoxSize = 330;
    const qrX = 540 - qrBoxSize / 2;
    const qrY = 574;

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(2, 132, 199, 0.28)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(2, 132, 199, 0.2)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 12;
    roundRect(ctx, qrX, qrY, qrBoxSize, qrBoxSize, 28);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // QR Image
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      "https://itsgkaranmishra.web.app"
    )}&color=082f49&bgcolor=ffffff&qzone=1`;

    try {
      await drawImageOntoCanvas(ctx, qrUrl, qrX + 20, qrY + 20, qrBoxSize - 40, qrBoxSize - 40);
    } catch {
      ctx.fillStyle = "#082f49";
      ctx.font = "700 22px monospace";
      ctx.textAlign = "center";
      ctx.fillText("[QR: itsgkaranmishra.web.app]", 540, qrY + qrBoxSize / 2);
    }

    // QR Label
    ctx.fillStyle = "#0c4a6e";
    ctx.font = "800 23px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("📷 SCAN TO OPEN LIVE PORTFOLIO & AI SUITE", 540, qrY + qrBoxSize + 40);

    ctx.fillStyle = "#0284c7";
    ctx.font = "700 21px monospace";
    ctx.fillText("https://itsgkaranmishra.web.app", 540, qrY + qrBoxSize + 74);

    // Contact List (Crystal Clear Atlantic Glass Cards)
    const contactItems = [
      { icon: "⚡", title: "OFFICIAL COMPANY PORTAL", val: "aurxon.com • itsgkaranmishra.web.app" },
      { icon: "💻", title: "GITHUB REPOSITORIES", val: "github.com/CodeSage4D (47+ Repos)" },
      { icon: "💼", title: "LINKEDIN NETWORK", val: "linkedin.com/in/karannmishra136" },
      { icon: "📸", title: "INSTAGRAM CONNECT", val: "@karannmishra136 • @buildwithaurxon" },
      { icon: "✉️", title: "DIRECT EMAIL INBOX", val: "karannmishra136@gmail.com" },
      { icon: "📱", title: "WHATSAPP & PHONE", val: "+91 7804895074" },
      {
        icon: "📍",
        title: "HEADQUARTERS ADDRESS",
        val: "AURXON HQ, Killa Maidan, VIP Rd, Indore, MP – 452006, India",
      },
    ];

    let startItemY = 1045;
    const itemHeight = 74;
    const itemGap = 16;
    const itemWidth = 900;
    const itemX = 540 - itemWidth / 2;

    contactItems.forEach((item) => {
      ctx.save();
      // Glass card background
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "rgba(186, 230, 253, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(2, 132, 199, 0.08)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
      roundRect(ctx, itemX, startItemY, itemWidth, itemHeight, 18);
      ctx.fill();
      ctx.stroke();

      // Icon circle with glacier gradient
      const iconGrad = ctx.createLinearGradient(itemX + 22, startItemY + 14, itemX + 68, startItemY + 60);
      iconGrad.addColorStop(0, "#e0f2fe");
      iconGrad.addColorStop(1, "#bae6fd");
      ctx.fillStyle = iconGrad;
      ctx.beginPath();
      ctx.arc(itemX + 46, startItemY + itemHeight / 2, 24, 0, Math.PI * 2);
      ctx.fill();

      // Icon
      ctx.fillStyle = "#0369a1";
      ctx.font = "24px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.icon, itemX + 46, startItemY + itemHeight / 2);

      // Title
      ctx.textAlign = "left";
      ctx.fillStyle = "#0284c7";
      ctx.font = "800 15px monospace";
      ctx.fillText(item.title, itemX + 88, startItemY + 28);

      // Value
      ctx.fillStyle = "#0f172a"; // Deep Slate Navy for 100% crisp readability
      ctx.font = "700 21px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(item.val, itemX + 88, startItemY + 54);

      ctx.restore();
      startItemY += itemHeight + itemGap;
    });

    // Footer Verified Security Banner
    ctx.save();
    ctx.strokeStyle = "rgba(2, 132, 199, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(140, 1720);
    ctx.lineTo(940, 1720);
    ctx.stroke();

    ctx.fillStyle = "#0369a1";
    ctx.font = "700 18px monospace";
    ctx.textAlign = "center";
    ctx.fillText("AURXON ENTERPRISE CREDENTIAL • SUAS COLLABORATION", 540, 1765);

    ctx.fillStyle = "#059669";
    ctx.font = "800 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("✓ VERIFIED EXECUTIVE SMART BUSINESS CARD", 540, 1805);
    ctx.restore();

  } else if (theme === "titanium") {
    // ==========================================
    // THEME 2: TITANIUM PLATINUM LUXE (Clean Minimal Light)
    // ==========================================
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "#f8fafc");
    bgGrad.addColorStop(0.5, "#ffffff");
    bgGrad.addColorStop(1, "#f1f5f9");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    roundRect(ctx, 40, 40, width - 80, height - 80, 40);
    ctx.stroke();
    ctx.restore();

    // Emblem
    ctx.save();
    const badgeX = 540;
    const badgeY = 150;
    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    roundRect(ctx, badgeX - 50, badgeY - 50, 100, 100, 26);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 44px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AX", badgeX, badgeY);
    ctx.restore();

    // Brand Name: Aurxon only
    ctx.fillStyle = "#0f172a";
    ctx.font = "900 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("AURXON", 540, 244);

    ctx.fillStyle = "#2563eb";
    ctx.font = "800 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Aurxon - Next Gen AI Solutions", 540, 280);

    // Name & Designation
    ctx.fillStyle = "#0f172a";
    ctx.font = "900 68px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Karan Mishra", 540, 420);

    ctx.fillStyle = "#2563eb";
    ctx.font = "800 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Founder • Aurxon", 540, 470);

    // Specialty Pill
    ctx.save();
    const pillW = 540;
    const pillH = 44;
    const pillX = 540 - pillW / 2;
    const pillY = 496;
    ctx.fillStyle = "#f1f5f9";
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.5;
    roundRect(ctx, pillX, pillY, pillW, pillH, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#1e293b";
    ctx.font = "800 19px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("MACHINE LEARNING & PYTHON ARCHITECT", 540, pillY + pillH / 2);
    ctx.restore();

    // QR Box
    const qrBoxSize = 330;
    const qrX = 540 - qrBoxSize / 2;
    const qrY = 574;

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(0,0,0,0.08)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;
    roundRect(ctx, qrX, qrY, qrBoxSize, qrBoxSize, 24);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      "https://itsgkaranmishra.web.app"
    )}&color=0f172a&bgcolor=ffffff&qzone=1`;

    try {
      await drawImageOntoCanvas(ctx, qrUrl, qrX + 20, qrY + 20, qrBoxSize - 40, qrBoxSize - 40);
    } catch {
      ctx.fillStyle = "#0f172a";
      ctx.font = "700 22px monospace";
      ctx.textAlign = "center";
      ctx.fillText("[QR: itsgkaranmishra.web.app]", 540, qrY + qrBoxSize / 2);
    }

    ctx.fillStyle = "#0f172a";
    ctx.font = "800 23px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("📷 SCAN TO VISIT LIVE PORTFOLIO", 540, qrY + qrBoxSize + 40);

    ctx.fillStyle = "#2563eb";
    ctx.font = "700 21px monospace";
    ctx.fillText("https://itsgkaranmishra.web.app", 540, qrY + qrBoxSize + 74);

    // Contact List
    const contactItems = [
      { icon: "⚡", title: "OFFICIAL COMPANY PORTAL", val: "aurxon.com • itsgkaranmishra.web.app" },
      { icon: "💻", title: "GITHUB REPOSITORIES", val: "github.com/CodeSage4D" },
      { icon: "💼", title: "LINKEDIN NETWORK", val: "linkedin.com/in/karannmishra136" },
      { icon: "📸", title: "INSTAGRAM CONNECT", val: "@karannmishra136 • @buildwithaurxon" },
      { icon: "✉️", title: "DIRECT EMAIL INBOX", val: "karannmishra136@gmail.com" },
      { icon: "📱", title: "PHONE & WHATSAPP", val: "+91 7804895074" },
      { icon: "📍", title: "HEADQUARTERS ADDRESS", val: "AURXON HQ, Killa Maidan, VIP Rd, Indore, MP – 452006, India" },
    ];

    let startItemY = 1045;
    const itemHeight = 74;
    const itemGap = 16;
    const itemWidth = 900;
    const itemX = 540 - itemWidth / 2;

    contactItems.forEach((item) => {
      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      roundRect(ctx, itemX, startItemY, itemWidth, itemHeight, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#f1f5f9";
      ctx.beginPath();
      ctx.arc(itemX + 46, startItemY + itemHeight / 2, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#0f172a";
      ctx.font = "24px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.icon, itemX + 46, startItemY + itemHeight / 2);

      ctx.textAlign = "left";
      ctx.fillStyle = "#64748b";
      ctx.font = "700 15px monospace";
      ctx.fillText(item.title, itemX + 88, startItemY + 28);

      ctx.fillStyle = "#0f172a";
      ctx.font = "700 21px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(item.val, itemX + 88, startItemY + 54);
      ctx.restore();
      startItemY += itemHeight + itemGap;
    });

    // Footer
    ctx.save();
    ctx.fillStyle = "#64748b";
    ctx.font = "700 18px monospace";
    ctx.textAlign = "center";
    ctx.fillText("TITANIUM LUXE SERIES • AURXON EXECUTIVE CREDENTIAL", 540, 1765);

    ctx.fillStyle = "#0f172a";
    ctx.font = "800 22px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("✓ VERIFIED DIGITAL SMART BUSINESS CARD", 540, 1805);
    ctx.restore();

  } else {
    // ==========================================
    // THEME 3: AURXON CYBER NEON OBSIDIAN (Dark)
    // ==========================================
    const bgGrad = ctx.createRadialGradient(540, 450, 50, 540, 960, 1100);
    bgGrad.addColorStop(0, "#1e1b4b");
    bgGrad.addColorStop(0.35, "#0f172a");
    bgGrad.addColorStop(0.75, "#090d16");
    bgGrad.addColorStop(1, "#030712");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
    ctx.lineWidth = 4;
    roundRect(ctx, 40, 40, width - 80, height - 80, 48);
    ctx.stroke();

    ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
    ctx.lineWidth = 2;
    roundRect(ctx, 56, 56, width - 112, height - 112, 40);
    ctx.stroke();
    ctx.restore();

    // Emblem
    ctx.save();
    const badgeX = 540;
    const badgeY = 150;
    ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    ctx.shadowColor = "rgba(56, 189, 248, 0.6)";
    ctx.shadowBlur = 25;
    roundRect(ctx, badgeX - 50, badgeY - 50, 100, 100, 26);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 44px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AX", badgeX, badgeY);
    ctx.restore();

    // Brand Name: Aurxon only
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 44px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("AURXON", 540, 244);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "800 24px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Aurxon - Next Gen AI Solutions", 540, 280);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 68px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Karan Mishra", 540, 420);

    ctx.fillStyle = "#a855f7";
    ctx.font = "800 32px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Founder • Aurxon", 540, 470);

    // Specialty Pill
    ctx.save();
    const pillW = 540;
    const pillH = 44;
    const pillX = 540 - pillW / 2;
    const pillY = 496;
    ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
    ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
    ctx.lineWidth = 2;
    roundRect(ctx, pillX, pillY, pillW, pillH, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#7dd3fc";
    ctx.font = "800 19px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("MACHINE LEARNING & PYTHON ARCHITECT", 540, pillY + pillH / 2);
    ctx.restore();

    // QR Box
    const qrBoxSize = 330;
    const qrX = 540 - qrBoxSize / 2;
    const qrY = 574;

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
    ctx.shadowBlur = 30;
    roundRect(ctx, qrX, qrY, qrBoxSize, qrBoxSize, 24);
    ctx.fill();
    ctx.restore();

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      "https://itsgkaranmishra.web.app"
    )}&color=0f172a&bgcolor=ffffff&qzone=1`;

    try {
      await drawImageOntoCanvas(ctx, qrUrl, qrX + 20, qrY + 20, qrBoxSize - 40, qrBoxSize - 40);
    } catch {
      ctx.fillStyle = "#0f172a";
      ctx.font = "700 22px monospace";
      ctx.textAlign = "center";
      ctx.fillText("[QR: itsgkaranmishra.web.app]", 540, qrY + qrBoxSize / 2);
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 23px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("📷 SCAN TO VISIT LIVE PORTFOLIO", 540, qrY + qrBoxSize + 40);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "700 21px monospace";
    ctx.fillText("https://itsgkaranmishra.web.app", 540, qrY + qrBoxSize + 74);

    const contactItems = [
      { icon: "⚡", title: "OFFICIAL COMPANY PORTAL", val: "aurxon.com • itsgkaranmishra.web.app" },
      { icon: "💻", title: "GITHUB REPOSITORIES", val: "github.com/CodeSage4D" },
      { icon: "💼", title: "LINKEDIN NETWORK", val: "linkedin.com/in/karannmishra136" },
      { icon: "📸", title: "INSTAGRAM CONNECT", val: "@karannmishra136 • @buildwithaurxon" },
      { icon: "✉️", title: "DIRECT EMAIL INBOX", val: "karannmishra136@gmail.com" },
      { icon: "📱", title: "PHONE & WHATSAPP", val: "+91 7804895074" },
      { icon: "📍", title: "HEADQUARTERS ADDRESS", val: "AURXON HQ, Killa Maidan, VIP Rd, Indore, MP – 452006, India" },
    ];

    let startItemY = 1045;
    const itemHeight = 74;
    const itemGap = 16;
    const itemWidth = 900;
    const itemX = 540 - itemWidth / 2;

    contactItems.forEach((item) => {
      ctx.save();
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.lineWidth = 1.5;
      roundRect(ctx, itemX, startItemY, itemWidth, itemHeight, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "rgba(56, 189, 248, 0.2)";
      ctx.beginPath();
      ctx.arc(itemX + 46, startItemY + itemHeight / 2, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#38bdf8";
      ctx.font = "24px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.icon, itemX + 46, startItemY + itemHeight / 2);

      ctx.textAlign = "left";
      ctx.fillStyle = "#94a3b8";
      ctx.font = "700 15px monospace";
      ctx.fillText(item.title, itemX + 88, startItemY + 28);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 21px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(item.val, itemX + 88, startItemY + 54);
      ctx.restore();
      startItemY += itemHeight + itemGap;
    });

    ctx.save();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "700 18px monospace";
    ctx.textAlign = "center";
    ctx.fillText("AURXON CYBER CREDENTIAL • SECURE PROTOCOL AXN-2026", 540, 1765);

    ctx.fillStyle = "#10b981";
    ctx.font = "800 22px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("✓ VERIFIED EXECUTIVE SMART BUSINESS CARD", 540, 1805);
    ctx.restore();
  }

  // Export to Data URL and Trigger Download
  const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
  const fileExt = format === "jpeg" ? "jpg" : "png";
  const dataUrl = canvas.toDataURL(mimeType, 0.96);

  const downloadLink = document.createElement("a");
  downloadLink.download = `Karan_Mishra_Aurxon_Card_${theme.toUpperCase()}.${fileExt}`;
  downloadLink.href = dataUrl;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  return dataUrl;
}

/**
 * Helper to draw rounded rectangle
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Helper to load and draw an image with CORS onto a canvas
 */
function drawImageOntoCanvas(
  ctx: CanvasRenderingContext2D,
  url: string,
  x: number,
  y: number,
  w: number,
  h: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, x, y, w, h);
      resolve();
    };
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}
