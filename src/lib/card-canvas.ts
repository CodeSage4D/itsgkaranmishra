"use client";

export interface CardDownloadOptions {
  format?: "png" | "jpeg";
  autoDownload?: boolean;
}

/**
 * Generates an ultra-high-resolution 9:16 portrait business card canvas
 * and triggers direct image download in PNG or JPEG format.
 */
export async function generateAndDownloadBusinessCard(
  format: "png" | "jpeg" = "png"
): Promise<string> {
  if (typeof window === "undefined") return "";

  const width = 1080;
  const height = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // 1. Deep Midnight Cosmic Background with Gradients
  const bgGrad = ctx.createRadialGradient(540, 450, 50, 540, 960, 1100);
  bgGrad.addColorStop(0, "#1e1b4b");
  bgGrad.addColorStop(0.35, "#0f172a");
  bgGrad.addColorStop(0.75, "#090d16");
  bgGrad.addColorStop(1, "#030712");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Futuristic Cyberpunk Grid Accents
  ctx.strokeStyle = "rgba(99, 102, 241, 0.07)";
  ctx.lineWidth = 1;
  const gridSize = 60;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 3. Glowing Card Border (Outer Frame)
  ctx.save();
  ctx.strokeStyle = "rgba(129, 140, 248, 0.4)";
  ctx.lineWidth = 4;
  roundRect(ctx, 40, 40, width - 80, height - 80, 48);
  ctx.stroke();

  // Subtle Inner Accent Frame
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 2;
  roundRect(ctx, 56, 56, width - 112, height - 112, 40);
  ctx.stroke();
  ctx.restore();

  // 4. Header Aurxon Emblem & Brand Typography
  // Brand Hexagon / Shield Badge
  ctx.save();
  const badgeX = 540;
  const badgeY = 160;
  ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
  ctx.strokeStyle = "#818cf8";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(99, 102, 241, 0.5)";
  ctx.shadowBlur = 25;
  roundRect(ctx, badgeX - 45, badgeY - 45, 90, 90, 24);
  ctx.fill();
  ctx.stroke();

  // Inner Aurxon Logo Initial / Icon
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 44px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AX", badgeX, badgeY);
  ctx.restore();

  // Brand Name
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 36px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "4px";
  ctx.fillText("AURXON TECHNOLOGIES", 540, 250);

  // Brand Slogan
  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Next-Gen Autonomous Intelligence & Neural Systems", 540, 290);

  // Divider Line
  const divGrad = ctx.createLinearGradient(240, 320, 840, 320);
  divGrad.addColorStop(0, "transparent");
  divGrad.addColorStop(0.5, "rgba(129, 140, 248, 0.6)");
  divGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(240, 325);
  ctx.lineTo(840, 325);
  ctx.stroke();

  // 5. Executive Identity Section
  // Name
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 68px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(129, 140, 248, 0.4)";
  ctx.shadowBlur = 30;
  ctx.fillText("Karan Mishra", 540, 410);
  ctx.restore();

  // Designation
  ctx.fillStyle = "#818cf8";
  ctx.font = "800 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Founder • Aurxon", 540, 460);

  // Specialty Pill
  ctx.save();
  const pillW = 540;
  const pillH = 48;
  const pillX = 540 - pillW / 2;
  const pillY = 485;
  ctx.fillStyle = "rgba(99, 102, 241, 0.18)";
  ctx.strokeStyle = "rgba(129, 140, 248, 0.45)";
  ctx.lineWidth = 2;
  roundRect(ctx, pillX, pillY, pillW, pillH, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#c7d2fe";
  ctx.font = "700 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("MACHINE LEARNING & PYTHON ARCHITECT", 540, pillY + pillH / 2);
  ctx.restore();

  // 6. Centered QR Code Box
  const qrBoxSize = 340;
  const qrX = 540 - qrBoxSize / 2;
  const qrY = 570;

  // White Card Housing for QR
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 35;
  ctx.shadowOffsetY = 15;
  roundRect(ctx, qrX, qrY, qrBoxSize, qrBoxSize, 28);
  ctx.fill();
  ctx.restore();

  // Load and Draw QR Code Image into Canvas
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    "https://itsgkaranmishra.web.app"
  )}&color=0f172a&bgcolor=ffffff&qzone=1`;

  try {
    await drawImageOntoCanvas(ctx, qrUrl, qrX + 20, qrY + 20, qrBoxSize - 40, qrBoxSize - 40);
  } catch (err) {
    // Fallback: draw stylish QR placeholder box if network fails
    ctx.fillStyle = "#0f172a";
    ctx.font = "700 24px monospace";
    ctx.textAlign = "center";
    ctx.fillText("[QR: itsgkaranmishra.web.app]", 540, qrY + qrBoxSize / 2);
  }

  // QR Label
  ctx.fillStyle = "#f8fafc";
  ctx.font = "800 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("📷 SCAN TO VISIT LIVE PORTFOLIO", 540, qrY + qrBoxSize + 45);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "600 22px monospace";
  ctx.fillText("https://itsgkaranmishra.web.app", 540, qrY + qrBoxSize + 80);

  // 7. Contact Details & Social Handles Cards
  const contactItems = [
    { icon: "🌐", title: "PORTFOLIO & COMPANY", val: "itsgkaranmishra.web.app" },
    { icon: "💻", title: "GITHUB REPOSITORIES", val: "github.com/CodeSage4D" },
    { icon: "💼", title: "LINKEDIN NETWORK", val: "linkedin.com/in/itsgkaranmishra4" },
    { icon: "📸", title: "INSTAGRAM CONNECT", val: "instagram.com/itsgkaranmishra" },
    { icon: "✉️", title: "DIRECT EMAIL INBOX", val: "karannmishra136@gmail.com" },
    { icon: "📱", title: "WHATSAPP & PHONE", val: "+91 7804895074" },
    { icon: "📍", title: "ENGINEERING BASE", val: "Indore, Madhya Pradesh, India" },
  ];

  let startItemY = 1060;
  const itemHeight = 72;
  const itemGap = 16;
  const itemWidth = 880;
  const itemX = 540 - itemWidth / 2;

  contactItems.forEach((item) => {
    // Card background
    ctx.save();
    ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, itemX, startItemY, itemWidth, itemHeight, 18);
    ctx.fill();
    ctx.stroke();

    // Icon Circle
    ctx.fillStyle = "rgba(99, 102, 241, 0.25)";
    ctx.beginPath();
    ctx.arc(itemX + 45, startItemY + itemHeight / 2, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.icon, itemX + 45, startItemY + itemHeight / 2);

    // Title
    ctx.textAlign = "left";
    ctx.fillStyle = "#94a3b8";
    ctx.font = "700 15px monospace";
    ctx.fillText(item.title, itemX + 88, startItemY + 28);

    // Value
    ctx.fillStyle = "#f1f5f9";
    ctx.font = "700 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(item.val, itemX + 88, startItemY + 54);

    ctx.restore();
    startItemY += itemHeight + itemGap;
  });

  // 8. Footer Verified Security Banner
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(160, 1720);
  ctx.lineTo(920, 1720);
  ctx.stroke();

  ctx.fillStyle = "#64748b";
  ctx.font = "700 18px monospace";
  ctx.textAlign = "center";
  ctx.fillText("AURXON SECURE EXECUTIVE CREDENTIAL • AXN-EXEC-2026-KM", 540, 1765);

  ctx.fillStyle = "#10b981";
  ctx.font = "800 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("✓ VERIFIED DIGITAL SMART BUSINESS CARD", 540, 1805);
  ctx.restore();

  // Export to Data URL and Trigger Download
  const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
  const fileExt = format === "jpeg" ? "jpg" : "png";
  const dataUrl = canvas.toDataURL(mimeType, 0.95);

  const downloadLink = document.createElement("a");
  downloadLink.download = `Karan_Mishra_Aurxon_Business_Card.${fileExt}`;
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
