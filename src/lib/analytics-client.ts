// Deep Network Telemetry, Hardware Profiling, Screen Matrix, Geolocation & Click Intelligence Engine

export interface ClientVisitorLog {
  id: string;
  ip: string;
  ipType?: "IPv4" | "IPv6";
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
  screenWidth?: number;
  screenHeight?: number;
  screenResolution: string;
  viewportSize?: string;
  devicePixelRatio?: number;
  screenOrientation?: string;
  colorDepth?: number;
  touchSupport?: boolean;
  timezone: string;
  language: string;
  networkType?: string;
  downlink?: string; // e.g. "10.5 Mbps"
  downlinkMbps?: number;
  rtt?: string; // e.g. "35 ms"
  rttMs?: number;
  effectiveType?: string; // e.g. "4G"
  saveData?: boolean;
  cpuCores?: number;
  ramGb?: string;
  referrer: string;
  referrerDomain?: string;
  landingPage: string;
  lastPage?: string;
  timestamp: string; // ISO
  formattedTime: string; // e.g. "04 Oct 2026, 20:45:10 IST"
  profileViews: string[];
  clicksCount: number;
}

export interface ClientClickLog {
  id: string;
  elementId?: string;
  elementText: string;
  elementTag?: string;
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

// Storage Keys
const STORAGE_KEY_VISITORS = "ahs_real_visitors_v4";
const STORAGE_KEY_CLICKS = "ahs_real_clicks_v4";
const STORAGE_KEY_LEADS = "ahs_real_leads_v4";
const STORAGE_KEY_AUDIT = "ahs_real_audit_v4";
const STORAGE_KEY_SESSION = "ahs_real_session_id_v4";

// Helper: Format readable Indian Standard Time (IST) & UTC
export function formatISTTime(dateObj?: Date | string | number): string {
  let d: Date;
  if (!dateObj) {
    d = new Date();
  } else if (typeof dateObj === "string" || typeof dateObj === "number") {
    d = new Date(dateObj);
  } else {
    d = dateObj;
  }

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
  const touch = typeof navigator.maxTouchPoints === "number" ? navigator.maxTouchPoints > 0 : false;

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
  // Detection for iPad on iOS 13+ which sends Macintosh UA
  if (navigator.platform === "MacIntel" && touch && window.screen.width < 1366) {
    return "Tablet";
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
  if (ua.indexOf("Win") > -1) os = "Windows";
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

// Helper: Measure real-time round trip latency (RTT)
export async function measurePingLatency(): Promise<number> {
  if (typeof window === "undefined") return 30;
  const start = performance.now();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800);
    const res = await fetch("/api/analytics/ping", { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      return Math.round(performance.now() - start);
    }
  } catch {}
  return 32;
}

// ================= TRACK VISITOR (DEEP TELEMETRY & NETWORK SPECS) =================

export async function trackVisitor(currentPath: string): Promise<void> {
  if (typeof window === "undefined") return;

  const sessionId = getOrCreateSessionId();
  const device = getDeviceType();
  const { browser, version: browserVersion, os } = getBrowserInfo();
  const { friendly: referrer, domain: referrerDomain } = getReadableReferrer();

  // Screen & Display Matrix
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const screenResolution = `${screenWidth}x${screenHeight}`;
  const viewportSize = `${window.innerWidth}x${window.innerHeight}`;
  const devicePixelRatio = Number((window.devicePixelRatio || 1).toFixed(2));
  const screenOrientation =
    window.screen.orientation?.type ||
    (window.innerWidth > window.innerHeight ? "landscape-primary" : "portrait-primary");
  const colorDepth = window.screen.colorDepth || 24;
  const touchSupport = navigator.maxTouchPoints > 0;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const language = navigator.language || "en-US";

  // Hardware telemetry
  const cpuCores = navigator.hardwareConcurrency || undefined;
  const ramGb = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : undefined;

  // Real Network connection telemetry
  let networkType = "Broadband";
  let downlink = "Fast";
  let downlinkMbps = 15;
  let rtt = "30 ms";
  let rttMs = 30;
  let effectiveType = "4G";
  let saveData = false;

  const conn =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (conn) {
    if (conn.downlink) {
      downlinkMbps = Number(conn.downlink);
      downlink = `${downlinkMbps} Mbps`;
    }
    if (conn.rtt) {
      rttMs = Number(conn.rtt);
      rtt = `${rttMs} ms`;
    }
    if (conn.effectiveType) {
      effectiveType = conn.effectiveType.toUpperCase();
    }
    saveData = Boolean(conn.saveData);
    networkType = conn.type
      ? `${conn.type.toUpperCase()}`
      : conn.effectiveType
      ? `${conn.effectiveType.toUpperCase()} Network`
      : "Broadband";
  }

  // Ping latency refinement
  try {
    const measuredPing = await measurePingLatency();
    if (measuredPing && measuredPing > 0) {
      rttMs = measuredPing;
      rtt = `${measuredPing} ms`;
    }
  } catch {}

  // Retrieve existing visitors from local cache
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
    existing.lastPage = currentPath;
    if (!existing.profileViews.includes(currentPath)) {
      existing.profileViews.push(currentPath);
    }
    localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));

    // Send pageview update to server API
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          currentPath,
          pageTitle: document.title,
        }),
      }).catch(() => {});
    } catch {}

    return;
  }

  // New session: fetch Real Geo & Public IP asynchronously
  let ip = "127.0.0.1";
  let city = "Local / Direct";
  let region = "";
  let country = "India";
  let countryCode = "IN";
  let flagEmoji = "🇮🇳";
  let org = "Direct Broadband";

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
      org = data.org || org;
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
    ipType: ip.includes(":") ? "IPv6" : "IPv4",
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
    screenWidth,
    screenHeight,
    screenResolution,
    viewportSize,
    devicePixelRatio,
    screenOrientation,
    colorDepth,
    touchSupport,
    timezone,
    language,
    networkType,
    downlink,
    downlinkMbps,
    rtt,
    rttMs,
    effectiveType,
    saveData,
    cpuCores,
    ramGb,
    referrer,
    referrerDomain,
    landingPage: currentPath,
    lastPage: currentPath,
    timestamp: now.toISOString(),
    formattedTime,
    profileViews: [currentPath],
    clicksCount: 0,
  };

  // 1. Sync to local storage for instant offline/static dashboard display
  visitors.unshift(newLog);
  if (visitors.length > 300) visitors = visitors.slice(0, 300);
  localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));

  // 2. Dispatch to backend SQLite database
  try {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        ip,
        city,
        region,
        country,
        countryCode,
        flagEmoji,
        org,
        deviceType: device,
        browser,
        browserVersion,
        os,
        screenWidth,
        screenHeight,
        screenResolution,
        viewportSize,
        devicePixelRatio,
        screenOrientation,
        colorDepth,
        touchSupport,
        networkType,
        effectiveType,
        downlinkMbps,
        rttMs,
        saveData,
        cpuCores,
        ramGb,
        timezone,
        language,
        referrer,
        referrerDomain,
        landingPage: currentPath,
        currentPath,
        pageTitle: document.title,
      }),
    }).catch(() => {});
  } catch {}

  // 3. Record Audit Trail for Portfolio Open
  recordAuditEvent({
    eventType: "PORTFOLIO_OPEN",
    title: `Portfolio Opened from ${city}, ${country}`,
    details: `${device} • ${screenResolution} (${devicePixelRatio}x) • ${browser} on ${os} • IP: ${ip} • Referrer: ${referrer}`,
    page: currentPath,
    ip,
    location: `${city}, ${country}`,
    device,
  });
}

// Track a click event
export function trackClick(
  elementText: string,
  targetUrl?: string,
  elementId?: string,
  elementTag: string = "BUTTON"
): void {
  if (typeof window === "undefined") return;

  const currentPath = window.location.pathname;
  const now = new Date();
  const sessionId = getOrCreateSessionId();

  const clickLog: ClientClickLog = {
    id: "clk_" + Math.random().toString(36).substring(2, 7) + "_" + Date.now().toString(36),
    elementId,
    elementText: (elementText || "Click").substring(0, 80),
    elementTag,
    targetUrl,
    page: currentPath,
    timestamp: now.toISOString(),
    formattedTime: formatISTTime(now),
  };

  // 1. Sync to local storage
  let clicks: ClientClickLog[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLICKS);
    if (raw) clicks = JSON.parse(raw);
  } catch {
    clicks = [];
  }

  clicks.unshift(clickLog);
  if (clicks.length > 400) clicks = clicks.slice(0, 400);
  localStorage.setItem(STORAGE_KEY_CLICKS, JSON.stringify(clicks));

  // Increment visitor session clicks
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

  // 2. Dispatch to backend API
  try {
    fetch("/api/analytics/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        elementId,
        elementText,
        elementTag,
        targetUrl,
        pagePath: currentPath,
      }),
    }).catch(() => {});
  } catch {}
}

// ================= AUDIT TRAIL ENGINE =================

export function recordAuditEvent(
  eventOrType: any,
  title?: string,
  page?: string,
  details?: string
): ClientAuditLog {
  const now = new Date();
  const formattedTime = formatISTTime(now);

  let event: Partial<ClientAuditLog>;
  if (typeof eventOrType === "string") {
    event = {
      eventType: eventOrType as any,
      title: title || eventOrType,
      details: details || "",
      page: page || "/",
    };
  } else {
    event = eventOrType || {};
  }

  const newLog: ClientAuditLog = {
    id: "audit_" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString(36),
    eventType: (event.eventType as any) || "SYSTEM",
    title: event.title || "Audit Event",
    details: event.details || "",
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

export function recordClientClick(data: { elementText: string; pagePath?: string; targetUrl?: string }): void {
  trackClick(data.elementText, data.pagePath || "/", undefined, data.targetUrl);
}

export function getStoredAuditLogs(): ClientAuditLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUDIT);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

// ================= LEADS CRM ENGINE =================

export function recordLead(leadData: Omit<ClientLead, "id" | "timestamp" | "formattedTime" | "status">): ClientLead {
  const now = new Date();
  const formattedTime = formatISTTime(now);

  const newLead: ClientLead = {
    id: "lead_" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString(36),
    ...leadData,
    status: "New",
    timestamp: now.toISOString(),
    formattedTime,
  };

  if (typeof window === "undefined") return newLead;

  try {
    let leads: ClientLead[] = [];
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (raw) leads = JSON.parse(raw);
    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));

    recordAuditEvent({
      eventType: "LEAD_CAPTURED",
      title: `New Direct Inquiry: ${newLead.name}`,
      details: `${newLead.email} • Subject: ${newLead.subject}`,
      page: "/contact",
      ip: newLead.ip,
      location: newLead.city && newLead.country ? `${newLead.city}, ${newLead.country}` : "Direct Contact",
    });
  } catch {}

  return newLead;
}

export function getStoredLeads(): ClientLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function updateLeadDetails(id: string, updates: Partial<ClientLead>): ClientLead | null {
  if (typeof window === "undefined") return null;
  try {
    let leads: ClientLead[] = getStoredLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...updates };
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
      return leads[idx];
    }
  } catch {}
  return null;
}

export function deleteLead(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    let leads = getStoredLeads().filter((l) => l.id !== id);
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    return true;
  } catch {}
  return false;
}

export function recordBlogChange(title: string, action: string, details?: string): void {
  recordAuditEvent({
    eventType: "BLOG_UPDATE",
    title: `Blog ${action}: ${title}`,
    details: details || `Blog post "${title}" was ${action.toLowerCase()} in CMS`,
    page: "/blog",
  });
}

export function recordPortfolioChange(title: string, action: string, details?: string): void {
  recordAuditEvent({
    eventType: "PROJECT_UPDATE",
    title: `Project ${action}: ${title}`,
    details: details || `Portfolio project "${title}" was ${action.toLowerCase()} in CMS`,
    page: "/portfolio",
  });
}

// Clear all analytics logs
export function clearAnalyticsLogs(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY_VISITORS);
  localStorage.removeItem(STORAGE_KEY_CLICKS);
  localStorage.removeItem(STORAGE_KEY_AUDIT);
  fetch("/api/analytics/purge", { method: "POST" }).catch(() => {});
}

// Get all stored analytics data
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
    const vRaw = localStorage.getItem(STORAGE_KEY_VISITORS);
    if (vRaw) visitors = JSON.parse(vRaw);
  } catch {}

  try {
    const cRaw = localStorage.getItem(STORAGE_KEY_CLICKS);
    if (cRaw) clicks = JSON.parse(cRaw);
  } catch {}

  try {
    const lRaw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (lRaw) leads = JSON.parse(lRaw);
  } catch {}

  try {
    const aRaw = localStorage.getItem(STORAGE_KEY_AUDIT);
    if (aRaw) auditLogs = JSON.parse(aRaw);
  } catch {}

  return { visitors, clicks, leads, auditLogs };
}
