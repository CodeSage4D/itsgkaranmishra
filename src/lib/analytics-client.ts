// Client-side Analytics and Lead Tracking Engine

export interface ClientVisitorLog {
  id: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  org?: string;
  device: "Mobile" | "Tablet" | "Desktop";
  browser: string;
  os: string;
  referrer: string;
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
  status: "New" | "Contacted" | "In-Discussion" | "Closed";
}

const STORAGE_KEY_VISITORS = "ahs_analytics_visitors_v2";
const STORAGE_KEY_CLICKS = "ahs_analytics_clicks_v2";
const STORAGE_KEY_LEADS = "ahs_analytics_leads_v2";
const STORAGE_KEY_SESSION = "ahs_analytics_session_id";

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

// Helper: detect browser name
export function getBrowserInfo(): { browser: string; os: string } {
  if (typeof navigator === "undefined") return { browser: "Unknown", os: "Unknown" };
  const ua = navigator.userAgent;
  let browser = "Chrome";
  if (ua.indexOf("Firefox") > -1) browser = "Firefox";
  else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) browser = "Safari";
  else if (ua.indexOf("Edg") > -1) browser = "Edge";
  else if (ua.indexOf("OPR") > -1 || ua.indexOf("Opera") > -1) browser = "Opera";

  let os = "Desktop OS";
  if (ua.indexOf("Win") > -1) os = "Windows";
  else if (ua.indexOf("Mac") > -1) os = "macOS";
  else if (ua.indexOf("Linux") > -1) os = "Linux";
  else if (ua.indexOf("Android") > -1) os = "Android";
  else if (ua.indexOf("like Mac") > -1) os = "iOS";

  return { browser, os };
}

// Parse referrer to friendly string
export function getReadableReferrer(): string {
  if (typeof document === "undefined" || !document.referrer) return "Direct (Typed / Bookmark)";
  const ref = document.referrer.toLowerCase();
  if (ref.includes("linkedin.com")) return "LinkedIn";
  if (ref.includes("instagram.com")) return "Instagram";
  if (ref.includes("github.com")) return "GitHub";
  if (ref.includes("google.")) return "Google Search";
  if (ref.includes("twitter.com") || ref.includes("t.co") || ref.includes("x.com")) return "Twitter / X";
  if (ref.includes("whatsapp")) return "WhatsApp";
  return document.referrer;
}

// Track a visitor on load
export async function trackVisitor(currentPath: string): Promise<void> {
  if (typeof window === "undefined") return;

  const sessionId = getOrCreateSessionId();
  const device = getDeviceType();
  const { browser, os } = getBrowserInfo();
  const referrer = getReadableReferrer();

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

  // New session: fetch Geo & IP (asynchronously with timeout)
  let ip = "127.0.0.1";
  let city = "Local / Unknown";
  let region = "";
  let country = "India";
  let org = "";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      ip = data.ip || ip;
      city = data.city || city;
      region = data.region || region;
      country = data.country_name || country;
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
    } catch {
      // silent
    }
  }

  const newLog: ClientVisitorLog = {
    id: sessionId,
    ip,
    city,
    region,
    country,
    org,
    device,
    browser,
    os,
    referrer,
    landingPage: currentPath,
    timestamp: new Date().toISOString(),
    profileViews: [currentPath],
    clicksCount: 0,
  };

  visitors.unshift(newLog);
  // Keep last 150 visitors
  if (visitors.length > 150) visitors = visitors.slice(0, 150);

  localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));
}

// Track a click event
export function trackClick(elementText: string, targetUrl?: string, elementId?: string): void {
  if (typeof window === "undefined") return;

  const currentPath = window.location.pathname;
  const clickLog: ClientClickLog = {
    id: "clk_" + Math.random().toString(36).substring(2, 7) + "_" + Date.now().toString(36),
    elementId,
    elementText: elementText.substring(0, 60),
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
  if (clicks.length > 200) clicks = clicks.slice(0, 200);
  localStorage.setItem(STORAGE_KEY_CLICKS, JSON.stringify(clicks));

  // Also increment clicksCount in current visitor session
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
  } catch (e) {
    // silent
  }
}

// Record a new Lead
export function recordLead(lead: Omit<ClientLead, "id" | "timestamp" | "status">): void {
  if (typeof window === "undefined") return;

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

  // Provide realistic initial seed sample if brand new install so charts immediately display rich metrics
  if (visitors.length === 0) {
    visitors = [
      {
        id: "sess_seed_1",
        ip: "49.36.128.14",
        city: "Indore",
        region: "Madhya Pradesh",
        country: "India",
        org: "Reliance Jio",
        device: "Desktop",
        browser: "Chrome",
        os: "Windows",
        referrer: "LinkedIn",
        landingPage: "/",
        timestamp: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
        profileViews: ["/", "/about", "/portfolio"],
        clicksCount: 5,
      },
      {
        id: "sess_seed_2",
        ip: "103.21.124.9",
        city: "Bengaluru",
        region: "Karnataka",
        country: "India",
        org: "Airtel Broadband",
        device: "Mobile",
        browser: "Safari",
        os: "iOS",
        referrer: "Direct (Typed / Bookmark)",
        landingPage: "/portfolio",
        timestamp: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
        profileViews: ["/portfolio", "/contact"],
        clicksCount: 3,
      },
      {
        id: "sess_seed_3",
        ip: "142.250.190.46",
        city: "Mountain View",
        region: "California",
        country: "United States",
        org: "Google LLC",
        device: "Desktop",
        browser: "Chrome",
        os: "macOS",
        referrer: "Google Search",
        landingPage: "/",
        timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
        profileViews: ["/", "/services", "/blog"],
        clicksCount: 7,
      },
      {
        id: "sess_seed_4",
        ip: "185.220.101.5",
        city: "London",
        region: "England",
        country: "United Kingdom",
        org: "Vodafone UK",
        device: "Desktop",
        browser: "Edge",
        os: "Windows",
        referrer: "GitHub",
        landingPage: "/portfolio-details",
        timestamp: new Date(Date.now() - 3600 * 1000 * 36).toISOString(),
        profileViews: ["/portfolio-details", "/about"],
        clicksCount: 4,
      },
      {
        id: "sess_seed_5",
        ip: "157.240.22.35",
        city: "Mumbai",
        region: "Maharashtra",
        country: "India",
        org: "Tata Communications",
        device: "Mobile",
        browser: "Chrome",
        os: "Android",
        referrer: "Instagram",
        landingPage: "/",
        timestamp: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
        profileViews: ["/", "/contact"],
        clicksCount: 2,
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
        message: "Looking for an AI engineer to integrate predictive analytics into our logistics ERP platform. Would love to schedule a consultation call.",
        source: "LinkedIn",
        ip: "49.36.128.14",
        city: "Indore",
        country: "India",
        timestamp: new Date(Date.now() - 3600 * 1000 * 14).toISOString(),
        status: "New",
      },
      {
        id: "lead_seed_2",
        name: "Sarah Jenkins",
        email: "s.jenkins@synapseai.io",
        phone: "+1 415 555 0192",
        subject: "Full-Stack AI Project",
        message: "Impressed by your Cognivex and HemoAI projects. Are you available for a remote contract?",
        source: "Google Search",
        ip: "142.250.190.46",
        city: "Mountain View",
        country: "United States",
        timestamp: new Date(Date.now() - 3600 * 1000 * 30).toISOString(),
        status: "Contacted",
      },
    ];
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  }

  return { visitors, clicks, leads };
}

// Update lead status
export function updateLeadStatus(leadId: string, status: ClientLead["status"]): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (!raw) return;
    const leads: ClientLead[] = JSON.parse(raw);
    const target = leads.find((l) => l.id === leadId);
    if (target) {
      target.status = status;
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    }
  } catch (e) {}
}

// Clear all analytics logs
export function clearAnalyticsLogs(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY_VISITORS);
  localStorage.removeItem(STORAGE_KEY_CLICKS);
  localStorage.removeItem(STORAGE_KEY_LEADS);
}
