// 10X Advanced Real-Time Analytics, Deep Network Telemetry, Audit Trail & Lead CRM Engine

export interface ClientVisitorLog {
  id: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode?: string;
  flagEmoji?: string;
  org?: string;
  device: "Mobile" | "Tablet" | "Desktop";
  browser: string;
  browserVersion?: string;
  os: string;
  screenResolution: string;
  timezone: string;
  language: string;
  networkType?: string;
  downlink?: string; // e.g. "10 Mbps"
  rtt?: string; // e.g. "45 ms"
  effectiveType?: string; // e.g. "4g"
  cpuCores?: number;
  ramGb?: string;
  referrer: string;
  referrerDomain?: string;
  landingPage: string;
  timestamp: string; // ISO
  formattedTime: string; // e.g. "03 Oct 2026, 13:25:10 IST"
  profileViews: string[];
  clicksCount: number;
}

export interface ClientClickLog {
  id: string;
  elementId?: string;
  elementText: string;
  targetUrl?: string;
  page: string;
  timestamp: string;
  formattedTime?: string;
}

export interface ClientLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  subject: string;
  message: string;
  ip?: string;
  city?: string;
  country?: string;
  source: string;
  timestamp: string;
  formattedTime: string;
  status: "New" | "Contacted" | "In-Discussion" | "Converted" | "Closed";
  priority?: "High" | "Medium" | "Low";
  adminNotes?: string;
}

export interface ClientAuditLog {
  id: string;
  eventType:
    | "PORTFOLIO_OPEN"
    | "PORTFOLIO_CHANGE"
    | "BLOG_UPDATE"
    | "PROJECT_UPDATE"
    | "CARD_DOWNLOAD"
    | "SECTION_VIEW"
    | "LEAD_CAPTURED"
    | "ADMIN_LOGIN"
    | "SYSTEM_PURGE"
    | "SECURITY";
  title: string;
  details: string;
  page: string;
  ip?: string;
  location?: string;
  device?: string;
  browser?: string;
  timestamp: string;
  timestampIst?: string;
  formattedTime: string;
}

// Storage Keys - v4 ensures zero old mock seeds
const STORAGE_KEY_VISITORS = "ahs_real_visitors_v4";
const STORAGE_KEY_CLICKS = "ahs_real_clicks_v4";
const STORAGE_KEY_LEADS = "ahs_real_leads_v4";
const STORAGE_KEY_AUDIT = "ahs_real_audit_v4";
const STORAGE_KEY_SESSION = "ahs_real_session_id_v4";

// Helper: Format readable Indian Standard Time (IST) & UTC
export function formatISTTime(dateObj?: Date): string {
  const d = dateObj || new Date();
  try {
    return (
      d.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }) + " IST"
    );
  } catch {
    return d.toISOString();
  }
}

// Helper: generate unique session ID
export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "server-session";
  let sId = sessionStorage.getItem(STORAGE_KEY_SESSION);
  if (!sId) {
    sId = "sess_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);
    sessionStorage.setItem(STORAGE_KEY_SESSION, sId);
  }
  return sId;
}

// Convert 2-letter country code to flag emoji
export function getFlagEmoji(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Helper: detect device type
export function getDeviceType(): "Mobile" | "Tablet" | "Desktop" {
  if (typeof navigator === "undefined") return "Desktop";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
}

// Helper: detect browser name and version
export function getBrowserInfo(): { browser: string; version: string; os: string } {
  if (typeof navigator === "undefined") return { browser: "Unknown", version: "1.0", os: "Unknown" };
  const ua = navigator.userAgent;
  let browser = "Chrome";
  let version = "Latest";

  if (ua.indexOf("Firefox") > -1) {
    browser = "Firefox";
    version = ua.match(/Firefox\/(\d+(\.\d+)?)/)?.[1] || "Latest";
  } else if (ua.indexOf("SamsungBrowser") > -1) {
    browser = "Samsung Internet";
    version = ua.match(/SamsungBrowser\/(\d+(\.\d+)?)/)?.[1] || "Latest";
  } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
    browser = "Opera";
    version = ua.match(/(Opera|OPR)\/(\d+(\.\d+)?)/)?.[2] || "Latest";
  } else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) {
    browser = "Edge";
    version = ua.match(/Edg?\/(\d+(\.\d+)?)/)?.[1] || "Latest";
  } else if (ua.indexOf("Chrome") > -1) {
    browser = "Chrome";
    version = ua.match(/Chrome\/(\d+(\.\d+)?)/)?.[1] || "Latest";
  } else if (ua.indexOf("Safari") > -1) {
    browser = "Safari";
    version = ua.match(/Version\/(\d+(\.\d+)?)/)?.[1] || "Latest";
  }

  let os = "Linux";
  if (ua.indexOf("Win") > -1) os = "Windows 11/10";
  else if (ua.indexOf("Mac") > -1) os = "macOS";
  else if (ua.indexOf("Android") > -1) os = "Android";
  else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) os = "iOS";

  return { browser, version, os };
}

// Helper: get clean referrer
export function getReadableReferrer(): { friendly: string; domain: string } {
  if (typeof document === "undefined" || !document.referrer) {
    return { friendly: "Direct (Typed / Bookmark)", domain: "Direct" };
  }

  const ref = document.referrer.toLowerCase();
  let domain = "";
  try {
    domain = new URL(document.referrer).hostname;
  } catch {
    domain = document.referrer;
  }

  if (ref.includes("linkedin.com")) return { friendly: "LinkedIn", domain };
  if (ref.includes("instagram.com")) return { friendly: "Instagram", domain };
  if (ref.includes("github.com")) return { friendly: "GitHub", domain };
  if (ref.includes("google.")) return { friendly: "Google Search", domain };
  if (ref.includes("twitter.com") || ref.includes("t.co") || ref.includes("x.com"))
    return { friendly: "Twitter / X", domain };
  if (ref.includes("whatsapp")) return { friendly: "WhatsApp", domain };
  if (ref.includes("facebook.com")) return { friendly: "Facebook", domain };

  return { friendly: domain || "External Site", domain };
}

// ================= TRACK VISITOR (100% REAL TELEMETRY) =================

export async function trackVisitor(currentPath: string): Promise<void> {
  if (typeof window === "undefined") return;

  const sessionId = getOrCreateSessionId();
  const device = getDeviceType();
  const { browser, version: browserVersion, os } = getBrowserInfo();
  const { friendly: referrer, domain: referrerDomain } = getReadableReferrer();

  const screenResolution = `${window.screen.width}x${window.screen.height} (${window.screen.colorDepth}-bit)`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const language = navigator.language || "en-US";

  // Hardware telemetry
  const cpuCores = navigator.hardwareConcurrency || undefined;
  const ramGb = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : undefined;

  // Real Network connection telemetry
  let networkType = "High-Speed";
  let downlink: string | undefined = undefined;
  let rtt: string | undefined = undefined;
  let effectiveType: string | undefined = undefined;

  const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (conn) {
    if (conn.downlink) downlink = `${conn.downlink} Mbps`;
    if (conn.rtt) rtt = `${conn.rtt} ms`;
    if (conn.effectiveType) effectiveType = conn.effectiveType.toUpperCase();
    networkType = conn.effectiveType
      ? `${conn.effectiveType.toUpperCase()} (${conn.type || "Broadband/WiFi"})`
      : "Broadband";
  }

  // Retrieve existing visitors
  let visitors: ClientVisitorLog[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISITORS);
    if (raw) visitors = JSON.parse(raw);
  } catch {
    visitors = [];
  }

  // Find if current session exists
  const existing = visitors.find((v) => v.id === sessionId);

  if (existing) {
    if (!existing.profileViews.includes(currentPath)) {
      existing.profileViews.push(currentPath);
      // Record section/page audit
      recordAuditEvent({
        eventType: "PORTFOLIO_OPEN",
        title: `Page Navigated: ${currentPath}`,
        details: `Visitor session ${sessionId.substring(0, 8)} opened ${currentPath}`,
        page: currentPath,
        ip: existing.ip,
        location: `${existing.city}, ${existing.country}`,
        device: existing.device,
      });
    }
    localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));
    return;
  }

  // New session: fetch Real Geo & IP asynchronously
  let ip = "127.0.0.1";
  let city = "Local / Direct";
  let region = "";
  let country = "India";
  let countryCode = "IN";
  let flagEmoji = "🇮🇳";
  let org = "";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2600);

    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      ip = data.ip || ip;
      city = data.city || city;
      region = data.region || region;
      country = data.country_name || country;
      countryCode = data.country_code || countryCode;
      flagEmoji = getFlagEmoji(countryCode);
      org = data.org || "";
    }
  } catch {
    try {
      const res2 = await fetch("https://api.ipify.org?format=json");
      if (res2.ok) {
        const d2 = await res2.json();
        ip = d2.ip || ip;
      }
    } catch {}
  }

  const now = new Date();
  const formattedTime = formatISTTime(now);

  const newLog: ClientVisitorLog = {
    id: sessionId,
    ip,
    city,
    region,
    country,
    countryCode,
    flagEmoji,
    org,
    device,
    browser,
    browserVersion,
    os,
    screenResolution,
    timezone,
    language,
    networkType,
    downlink,
    rtt,
    effectiveType,
    cpuCores,
    ramGb,
    referrer,
    referrerDomain,
    landingPage: currentPath,
    timestamp: now.toISOString(),
    formattedTime,
    profileViews: [currentPath],
    clicksCount: 0,
  };

  visitors.unshift(newLog);
  if (visitors.length > 250) visitors = visitors.slice(0, 250);
  localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));

  // Record Audit Trail for Portfolio Open
  recordAuditEvent({
    eventType: "PORTFOLIO_OPEN",
    title: `Portfolio Opened from ${city}, ${country}`,
    details: `${device} • ${browser} on ${os} • IP: ${ip} • Referrer: ${referrer}`,
    page: currentPath,
    ip,
    location: `${city}, ${country}`,
    device,
  });
}

// Track a click event
export function trackClick(elementText: string, targetUrl?: string, elementId?: string): void {
  if (typeof window === "undefined") return;

  const currentPath = window.location.pathname;
  const now = new Date();
  const clickLog: ClientClickLog = {
    id: "clk_" + Math.random().toString(36).substring(2, 7) + "_" + Date.now().toString(36),
    elementId,
    elementText: elementText.substring(0, 70),
    targetUrl,
    page: currentPath,
    timestamp: now.toISOString(),
    formattedTime: formatISTTime(now),
  };

  let clicks: ClientClickLog[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLICKS);
    if (raw) clicks = JSON.parse(raw);
  } catch {
    clicks = [];
  }

  clicks.unshift(clickLog);
  if (clicks.length > 300) clicks = clicks.slice(0, 300);
  localStorage.setItem(STORAGE_KEY_CLICKS, JSON.stringify(clicks));

  const sessionId = getOrCreateSessionId();
  try {
    const rawV = localStorage.getItem(STORAGE_KEY_VISITORS);
    if (rawV) {
      const visitors: ClientVisitorLog[] = JSON.parse(rawV);
      const cur = visitors.find((v) => v.id === sessionId);
      if (cur) {
        cur.clicksCount = (cur.clicksCount || 0) + 1;
        localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));
      }
    }
  } catch {}
}

// ================= AUDIT TRAIL ENGINE (WHERE & WHEN PORTFOLIO OPENED/CHANGED) =================

export function recordAuditEvent(
  event: Omit<ClientAuditLog, "id" | "timestamp" | "formattedTime">
): ClientAuditLog {
  const now = new Date();
  const formattedTime = formatISTTime(now);

  const newLog: ClientAuditLog = {
    id: "audit_" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString(36),
    eventType: event.eventType,
    title: event.title,
    details: event.details,
    page: event.page || "/",
    ip: event.ip,
    location: event.location,
    device: event.device,
    browser: event.browser,
    timestamp: now.toISOString(),
    timestampIst: formattedTime,
    formattedTime,
  };

  if (typeof window === "undefined") return newLog;

  try {
    let logs: ClientAuditLog[] = [];
    const raw = localStorage.getItem(STORAGE_KEY_AUDIT);
    if (raw) logs = JSON.parse(raw);
    logs.unshift(newLog);
    if (logs.length > 300) logs = logs.slice(0, 300);
    localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(logs));
  } catch {}

  return newLog;
}

export function getStoredAuditLogs(): ClientAuditLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUDIT);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

// Track Portfolio Change (Projects or Section Updated)
export function recordPortfolioChange(title: string, action: string, details?: string): void {
  recordAuditEvent({
    eventType: "PORTFOLIO_CHANGE",
    title: `Portfolio Changed: ${action} - "${title}"`,
    details: details || `Portfolio project or section modified by administrator at ${formatISTTime()}`,
    page: "/portfolio",
    device: "Admin Console",
  });
}

// Track Blog Change
export function recordBlogChange(title: string, action: string): void {
  recordAuditEvent({
    eventType: "BLOG_UPDATE",
    title: `Blog Post ${action}: "${title}"`,
    details: `Article content, metadata, or tags updated via admin dashboard at ${formatISTTime()}`,
    page: "/blog",
    device: "Admin Console",
  });
}

// ================= REAL LEADS CRM (CRUD) =================

export function recordLead(lead: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  subject: string;
  message: string;
  source?: string;
}): ClientLead {
  const now = new Date();
  const formattedTime = formatISTTime(now);

  let visitors: ClientVisitorLog[] = [];
  if (typeof window !== "undefined") {
    try {
      const rawV = localStorage.getItem(STORAGE_KEY_VISITORS);
      if (rawV) visitors = JSON.parse(rawV);
    } catch {}
  }

  const sessionId = getOrCreateSessionId();
  const currentVisitor = visitors.find((v) => v.id === sessionId);

  const newLead: ClientLead = {
    id: "lead_" + Math.random().toString(36).substring(2, 7) + "_" + Date.now().toString(36),
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    budget: lead.budget,
    subject: lead.subject,
    message: lead.message,
    source: lead.source || (currentVisitor ? currentVisitor.referrer : "Portfolio Contact Form"),
    ip: currentVisitor?.ip || "Unknown",
    city: currentVisitor?.city || "",
    country: currentVisitor?.country || "",
    timestamp: now.toISOString(),
    formattedTime,
    status: "New",
    priority: "High",
    adminNotes: "",
  };

  if (typeof window !== "undefined") {
    let leads: ClientLead[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LEADS);
      if (raw) leads = JSON.parse(raw);
    } catch {
      leads = [];
    }

    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));

    // Also record in audit log
    recordAuditEvent({
      eventType: "LEAD_CAPTURED",
      title: `New Lead Received from ${lead.name}`,
      details: `${lead.subject} • ${lead.email} • Source: ${newLead.source}`,
      page: "/contact",
      ip: newLead.ip,
      location: `${newLead.city}, ${newLead.country}`,
    });
  }

  return newLead;
}

export function updateLeadDetails(
  leadId: string,
  updates: Partial<Pick<ClientLead, "status" | "priority" | "adminNotes" | "name" | "email" | "phone" | "company" | "subject" | "message">>
): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (!raw) return;
    const leads: ClientLead[] = JSON.parse(raw);
    const target = leads.find((l) => l.id === leadId);
    if (target) {
      Object.assign(target, updates);
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    }
  } catch {}
}

export function deleteLead(leadId: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (!raw) return;
    let leads: ClientLead[] = JSON.parse(raw);
    leads = leads.filter((l) => l.id !== leadId);
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  } catch {}
}

// ================= DASHBOARD DATA RETRIEVAL (100% REAL - ZERO FAKE SEEDS) =================

export function getStoredAnalyticsData(): {
  visitors: ClientVisitorLog[];
  clicks: ClientClickLog[];
  leads: ClientLead[];
  auditLogs: ClientAuditLog[];
} {
  if (typeof window === "undefined") {
    return { visitors: [], clicks: [], leads: [], auditLogs: [] };
  }

  let visitors: ClientVisitorLog[] = [];
  let clicks: ClientClickLog[] = [];
  let leads: ClientLead[] = [];
  let auditLogs: ClientAuditLog[] = [];

  try {
    const rawV = localStorage.getItem(STORAGE_KEY_VISITORS);
    if (rawV) visitors = JSON.parse(rawV);
  } catch {}

  try {
    const rawC = localStorage.getItem(STORAGE_KEY_CLICKS);
    if (rawC) clicks = JSON.parse(rawC);
  } catch {}

  try {
    const rawL = localStorage.getItem(STORAGE_KEY_LEADS);
    if (rawL) leads = JSON.parse(rawL);
  } catch {}

  try {
    const rawA = localStorage.getItem(STORAGE_KEY_AUDIT);
    if (rawA) auditLogs = JSON.parse(rawA);
  } catch {}

  // Absolutely NO fake seed generation here! Real visitors only.
  return { visitors, clicks, leads, auditLogs };
}

// Purge all analytics & reset with fresh real session
export function clearAnalyticsLogs(): void {
  if (typeof window === "undefined") return;

  // Clear new real keys
  localStorage.removeItem(STORAGE_KEY_VISITORS);
  localStorage.removeItem(STORAGE_KEY_CLICKS);
  localStorage.removeItem(STORAGE_KEY_LEADS);
  localStorage.removeItem(STORAGE_KEY_AUDIT);

  // Clear any legacy mock keys from prior versions
  localStorage.removeItem("ahs_analytics_visitors_v3");
  localStorage.removeItem("ahs_analytics_clicks_v3");
  localStorage.removeItem("ahs_analytics_leads_v3");
  localStorage.removeItem("ahs_analytics_session_id_v3");

  // Record clean audit entry
  recordAuditEvent({
    eventType: "SYSTEM_PURGE",
    title: "Analytics Cache Purged by Administrator",
    details: "All historical and mock visitor data wiped. Telemetry reset to real-time live mode.",
    page: "/dashboard",
  });
}
