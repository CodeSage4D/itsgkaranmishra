// 10X Advanced Client-side Analytics, Deep Telemetry, and Lead CRM Engine

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
  referrer: string;
  referrerDomain?: string;
  landingPage: string;
  timestamp: string;
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
}

export interface ClientLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  ip?: string;
  city?: string;
  country?: string;
  source: string;
  timestamp: string;
  status: "New" | "Contacted" | "In-Discussion" | "Proposal Sent" | "Converted" | "Closed";
  priority?: "High" | "Medium" | "Low";
  adminNotes?: string;
}

const STORAGE_KEY_VISITORS = "ahs_analytics_visitors_v3";
const STORAGE_KEY_CLICKS = "ahs_analytics_clicks_v3";
const STORAGE_KEY_LEADS = "ahs_analytics_leads_v3";
const STORAGE_KEY_SESSION = "ahs_analytics_session_id_v3";

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
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
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
    version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || "Latest";
  } else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) {
    browser = "Safari";
    version = ua.match(/Version\/([0-9.]+)/)?.[1] || "Latest";
  } else if (ua.indexOf("Edg") > -1) {
    browser = "Edge";
    version = ua.match(/Edg\/([0-9.]+)/)?.[1] || "Latest";
  } else if (ua.indexOf("OPR") > -1 || ua.indexOf("Opera") > -1) {
    browser = "Opera";
    version = ua.match(/(OPR|Opera)\/([0-9.]+)/)?.[2] || "Latest";
  } else if (ua.indexOf("Chrome") > -1) {
    browser = "Chrome";
    version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || "Latest";
  }

  let os = "Desktop OS";
  if (ua.indexOf("Win") > -1) os = "Windows";
  else if (ua.indexOf("Mac") > -1) os = "macOS";
  else if (ua.indexOf("Linux") > -1) os = "Linux";
  else if (ua.indexOf("Android") > -1) os = "Android";
  else if (ua.indexOf("like Mac") > -1) os = "iOS";

  return { browser, version, os };
}

// Parse referrer to friendly string with deep domain analysis
export function getReadableReferrer(): { friendly: string; domain: string } {
  if (typeof document === "undefined" || !document.referrer) {
    return { friendly: "Direct (Typed / Bookmark)", domain: "direct" };
  }
  const ref = document.referrer.toLowerCase();
  let domain = "";
  try {
    domain = new URL(document.referrer).hostname;
  } catch (e) {
    domain = document.referrer;
  }

  if (ref.includes("linkedin.com")) return { friendly: "LinkedIn", domain };
  if (ref.includes("instagram.com")) return { friendly: "Instagram", domain };
  if (ref.includes("github.com")) return { friendly: "GitHub", domain };
  if (ref.includes("google.")) return { friendly: "Google Search", domain };
  if (ref.includes("twitter.com") || ref.includes("t.co") || ref.includes("x.com")) return { friendly: "Twitter / X", domain };
  if (ref.includes("whatsapp")) return { friendly: "WhatsApp", domain };
  if (ref.includes("facebook.com")) return { friendly: "Facebook", domain };

  return { friendly: domain || "External Site", domain };
}

// Track a visitor on load with deep telemetry
export async function trackVisitor(currentPath: string): Promise<void> {
  if (typeof window === "undefined") return;

  const sessionId = getOrCreateSessionId();
  const device = getDeviceType();
  const { browser, version: browserVersion, os } = getBrowserInfo();
  const { friendly: referrer, domain: referrerDomain } = getReadableReferrer();

  const screenResolution = `${window.screen.width}x${window.screen.height} (${window.screen.colorDepth}-bit)`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const language = navigator.language || "en-US";

  let networkType = "High-Speed";
  const conn = (navigator as any).connection;
  if (conn) {
    networkType = conn.effectiveType ? `${conn.effectiveType.toUpperCase()} (${conn.type || "Cellular/Wifi"})` : "Broadband";
  }

  // Retrieve existing visitors
  let visitors: ClientVisitorLog[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISITORS);
    if (raw) visitors = JSON.parse(raw);
  } catch (e) {
    visitors = [];
  }

  // Find if current session exists
  const existing = visitors.find((v) => v.id === sessionId);

  if (existing) {
    if (!existing.profileViews.includes(currentPath)) {
      existing.profileViews.push(currentPath);
    }
    localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));
    return;
  }

  // New session: fetch Geo & IP asynchronously
  let ip = "127.0.0.1";
  let city = "Indore";
  let region = "Madhya Pradesh";
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
    // Fail-safe IP fallback
    try {
      const res2 = await fetch("https://api.ipify.org?format=json");
      if (res2.ok) {
        const d2 = await res2.json();
        ip = d2.ip || ip;
      }
    } catch {}
  }

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
    referrer,
    referrerDomain,
    landingPage: currentPath,
    timestamp: new Date().toISOString(),
    profileViews: [currentPath],
    clicksCount: 0,
  };

  visitors.unshift(newLog);
  if (visitors.length > 250) visitors = visitors.slice(0, 250);

  localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));
}

// Track a click event
export function trackClick(elementText: string, targetUrl?: string, elementId?: string): void {
  if (typeof window === "undefined") return;

  const currentPath = window.location.pathname;
  const clickLog: ClientClickLog = {
    id: "clk_" + Math.random().toString(36).substring(2, 7) + "_" + Date.now().toString(36),
    elementId,
    elementText: elementText.substring(0, 70),
    targetUrl,
    page: currentPath,
    timestamp: new Date().toISOString(),
  };

  let clicks: ClientClickLog[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLICKS);
    if (raw) clicks = JSON.parse(raw);
  } catch (e) {
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
  } catch (e) {}
}

// ================= FULL LEADS CRM (CRUD) =================

export function recordLead(lead: Omit<ClientLead, "id" | "timestamp" | "status">): ClientLead {
  if (typeof window === "undefined") {
    return {
      id: "lead_temp",
      ...lead,
      timestamp: new Date().toISOString(),
      status: "New",
    };
  }

  let visitors: ClientVisitorLog[] = [];
  try {
    const rawV = localStorage.getItem(STORAGE_KEY_VISITORS);
    if (rawV) visitors = JSON.parse(rawV);
  } catch (e) {}

  const sessionId = getOrCreateSessionId();
  const currentVisitor = visitors.find((v) => v.id === sessionId);

  const newLead: ClientLead = {
    id: "lead_" + Math.random().toString(36).substring(2, 7) + "_" + Date.now().toString(36),
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    subject: lead.subject,
    message: lead.message,
    source: lead.source || (currentVisitor ? currentVisitor.referrer : "Direct"),
    ip: currentVisitor?.ip || "Unknown",
    city: currentVisitor?.city || "",
    country: currentVisitor?.country || "",
    timestamp: new Date().toISOString(),
    status: "New",
    priority: "High",
    adminNotes: "",
  };

  let leads: ClientLead[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (raw) leads = JSON.parse(raw);
  } catch (e) {
    leads = [];
  }

  leads.unshift(newLead);
  localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  return newLead;
}

export function updateLeadDetails(
  leadId: string,
  updates: Partial<Pick<ClientLead, "status" | "priority" | "adminNotes" | "name" | "email" | "phone" | "subject" | "message">>
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
  } catch (e) {}
}

export function deleteLead(leadId: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (!raw) return;
    let leads: ClientLead[] = JSON.parse(raw);
    leads = leads.filter((l) => l.id !== leadId);
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  } catch (e) {}
}

// Get all analytics data for dashboard
export function getStoredAnalyticsData(): {
  visitors: ClientVisitorLog[];
  clicks: ClientClickLog[];
  leads: ClientLead[];
} {
  if (typeof window === "undefined") {
    return { visitors: [], clicks: [], leads: [] };
  }

  let visitors: ClientVisitorLog[] = [];
  let clicks: ClientClickLog[] = [];
  let leads: ClientLead[] = [];

  try {
    const rawV = localStorage.getItem(STORAGE_KEY_VISITORS);
    if (rawV) visitors = JSON.parse(rawV);
  } catch (e) {}

  try {
    const rawC = localStorage.getItem(STORAGE_KEY_CLICKS);
    if (rawC) clicks = JSON.parse(rawC);
  } catch (e) {}

  try {
    const rawL = localStorage.getItem(STORAGE_KEY_LEADS);
    if (rawL) leads = JSON.parse(rawL);
  } catch (e) {}

  // Provide initial rich data if empty
  if (visitors.length === 0) {
    visitors = [
      {
        id: "sess_seed_1",
        ip: "49.36.128.14",
        city: "Indore",
        region: "Madhya Pradesh",
        country: "India",
        countryCode: "IN",
        flagEmoji: "🇮🇳",
        org: "Reliance Jio Infocomm",
        device: "Desktop",
        browser: "Chrome",
        browserVersion: "128.0",
        os: "Windows 11",
        screenResolution: "1920x1080 (24-bit)",
        timezone: "Asia/Kolkata",
        language: "en-IN",
        networkType: "4G (Fiber)",
        referrer: "LinkedIn",
        referrerDomain: "linkedin.com",
        landingPage: "/",
        timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
        profileViews: ["/", "/portfolio", "/about", "/blog"],
        clicksCount: 8,
      },
      {
        id: "sess_seed_2",
        ip: "103.21.124.9",
        city: "Bengaluru",
        region: "Karnataka",
        country: "India",
        countryCode: "IN",
        flagEmoji: "🇮🇳",
        org: "Bharti Airtel",
        device: "Mobile",
        browser: "Safari",
        browserVersion: "17.4",
        os: "iOS 17.5",
        screenResolution: "390x844 (24-bit)",
        timezone: "Asia/Kolkata",
        language: "en-GB",
        networkType: "5G",
        referrer: "Direct (Typed / Bookmark)",
        landingPage: "/portfolio",
        timestamp: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
        profileViews: ["/portfolio", "/contact"],
        clicksCount: 4,
      },
      {
        id: "sess_seed_3",
        ip: "142.250.190.46",
        city: "Mountain View",
        region: "California",
        country: "United States",
        countryCode: "US",
        flagEmoji: "🇺🇸",
        org: "Google LLC",
        device: "Desktop",
        browser: "Chrome",
        browserVersion: "129.0",
        os: "macOS Sonoma",
        screenResolution: "2560x1440 (30-bit Retina)",
        timezone: "America/Los_Angeles",
        language: "en-US",
        networkType: "Gigabit Ethernet",
        referrer: "Google Search",
        landingPage: "/",
        timestamp: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
        profileViews: ["/", "/services", "/blog"],
        clicksCount: 9,
      },
      {
        id: "sess_seed_4",
        ip: "185.220.101.5",
        city: "London",
        region: "England",
        country: "United Kingdom",
        countryCode: "GB",
        flagEmoji: "🇬🇧",
        org: "Vodafone UK",
        device: "Desktop",
        browser: "Edge",
        browserVersion: "128.0",
        os: "Windows 11",
        screenResolution: "1920x1080 (24-bit)",
        timezone: "Europe/London",
        language: "en-GB",
        networkType: "Fiber",
        referrer: "GitHub",
        landingPage: "/portfolio-details",
        timestamp: new Date(Date.now() - 3600 * 1000 * 30).toISOString(),
        profileViews: ["/portfolio-details", "/about"],
        clicksCount: 5,
      },
      {
        id: "sess_seed_5",
        ip: "157.240.22.35",
        city: "Mumbai",
        region: "Maharashtra",
        country: "India",
        countryCode: "IN",
        flagEmoji: "🇮🇳",
        org: "Tata Communications",
        device: "Mobile",
        browser: "Chrome",
        browserVersion: "127.0",
        os: "Android 14",
        screenResolution: "412x915 (24-bit)",
        timezone: "Asia/Kolkata",
        language: "en-IN",
        networkType: "5G",
        referrer: "Instagram",
        landingPage: "/",
        timestamp: new Date(Date.now() - 3600 * 1000 * 42).toISOString(),
        profileViews: ["/", "/contact"],
        clicksCount: 3,
      },
    ];
    localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));
  }

  if (leads.length === 0) {
    leads = [
      {
        id: "lead_seed_1",
        name: "Vikram Malhotra",
        email: "vikram@malhotratech.com",
        phone: "+91 98260 12345",
        subject: "Enterprise ERP & AI Consulting",
        message: "Looking for an AI engineer to integrate predictive analytics and FCOS edge modules into our logistics ERP platform.",
        source: "LinkedIn",
        ip: "49.36.128.14",
        city: "Indore",
        country: "India",
        timestamp: new Date(Date.now() - 3600 * 1000 * 14).toISOString(),
        status: "New",
        priority: "High",
        adminNotes: "Urgent inquiry regarding manufacturing automation. Follow up before Friday.",
      },
      {
        id: "lead_seed_2",
        name: "Sarah Jenkins",
        email: "s.jenkins@synapseai.io",
        phone: "+1 415 555 0192",
        subject: "Full-Stack AI Contract / Role",
        message: "Impressed by your Cognivex, HemoAI, and ALAMS research. Are you open to a high-equity lead AI engineering role?",
        source: "Google Search",
        ip: "142.250.190.46",
        city: "Mountain View",
        country: "United States",
        timestamp: new Date(Date.now() - 3600 * 1000 * 30).toISOString(),
        status: "Contacted",
        priority: "High",
        adminNotes: "Sent introductory portfolio deck and GitHub links.",
      },
    ];
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  }

  return { visitors, clicks, leads };
}

// Clear all analytics logs
export function clearAnalyticsLogs(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY_VISITORS);
  localStorage.removeItem(STORAGE_KEY_CLICKS);
  localStorage.removeItem(STORAGE_KEY_LEADS);
}
