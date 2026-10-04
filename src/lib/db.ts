import sqlite3 from "sqlite3";
import path from "path";

const DB_PATH = path.resolve(process.cwd(), "portfolio_analytics.sqlite3");

let dbInstance: sqlite3.Database | null = null;

// Helper: Promise wrapper for db.run
export function dbRun(db: sqlite3.Database, sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

// Helper: Promise wrapper for db.get
export function dbGet<T = any>(db: sqlite3.Database, sql: string, params: any[] = []): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row as T);
    });
  });
}

// Helper: Promise wrapper for db.all
export function dbAll<T = any>(db: sqlite3.Database, sql: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve((rows || []) as T[]);
    });
  });
}

export function getDatabase(): sqlite3.Database {
  if (dbInstance) return dbInstance;

  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error("❌ Failed to connect to SQLite3 database:", err);
    } else {
      console.log("✅ Connected to SQLite3 analytics & telemetry database at:", DB_PATH);
    }
  });

  // Enable WAL mode & foreign keys for high-performance concurrent writes
  db.serialize(() => {
    db.run("PRAGMA journal_mode = WAL;");
    db.run("PRAGMA synchronous = NORMAL;");
    db.run("PRAGMA busy_timeout = 8000;");
    db.run("PRAGMA temp_store = MEMORY;");
    db.run("PRAGMA cache_size = -64000;");
    db.run("PRAGMA foreign_keys = ON;");

    // 1. Visitors table (Rich networking, device, and screen dimensions)
    db.run(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL UNIQUE,
        ip TEXT,
        ip_type TEXT,
        country TEXT,
        country_code TEXT,
        flag_emoji TEXT,
        city TEXT,
        region TEXT,
        org TEXT,
        device_type TEXT,
        browser TEXT,
        browser_version TEXT,
        os TEXT,
        screen_width INTEGER,
        screen_height INTEGER,
        screen_resolution TEXT,
        viewport_size TEXT,
        device_pixel_ratio REAL,
        screen_orientation TEXT,
        color_depth INTEGER,
        touch_support INTEGER DEFAULT 0,
        network_type TEXT,
        effective_type TEXT,
        downlink_mbps REAL,
        rtt_ms INTEGER,
        save_data INTEGER DEFAULT 0,
        cpu_cores INTEGER,
        ram_gb TEXT,
        timezone TEXT,
        language TEXT,
        referrer TEXT,
        referrer_domain TEXT,
        landing_page TEXT,
        last_page TEXT,
        page_views_count INTEGER DEFAULT 1,
        clicks_count INTEGER DEFAULT 0,
        first_seen_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_seen_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Page views table
    db.run(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        ip TEXT,
        path TEXT NOT NULL,
        title TEXT,
        referrer TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Click events table (Every interactive CTA / Link / Button clicked)
    db.run(`
      CREATE TABLE IF NOT EXISTS click_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        ip TEXT,
        element_id TEXT,
        element_text TEXT,
        element_tag TEXT,
        target_url TEXT,
        page_path TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Audit trail events table
    db.run(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        title TEXT NOT NULL,
        details TEXT,
        page TEXT,
        ip TEXT,
        location TEXT,
        device TEXT,
        browser TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. Leads / Inquiries table
    db.run(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT,
        ip TEXT,
        city TEXT,
        country TEXT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        budget TEXT,
        subject TEXT,
        message TEXT,
        status TEXT DEFAULT 'New',
        priority TEXT DEFAULT 'High',
        admin_notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Performance Indexes
    db.run(`CREATE INDEX IF NOT EXISTS idx_visitors_session ON visitors(session_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_visitors_ip ON visitors(ip)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_visitors_device ON visitors(device_type)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_visitors_country ON visitors(country_code)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_visitors_screen ON visitors(screen_resolution)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_visitors_created ON visitors(first_seen_at)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_clicks_session ON click_events(session_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_clicks_created ON click_events(created_at)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_clicks_page ON click_events(page_path)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at)`);
  });

  dbInstance = db;
  return dbInstance;
}

// ----------------- DBA HELPER METHODS -----------------

export interface VisitorIngestData {
  sessionId: string;
  ip: string;
  ipType?: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  flagEmoji?: string;
  org?: string;
  deviceType?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  screenWidth?: number;
  screenHeight?: number;
  screenResolution?: string;
  viewportSize?: string;
  devicePixelRatio?: number;
  screenOrientation?: string;
  colorDepth?: number;
  touchSupport?: number;
  networkType?: string;
  effectiveType?: string;
  downlinkMbps?: number;
  rttMs?: number;
  saveData?: number;
  cpuCores?: number;
  ramGb?: string;
  timezone?: string;
  language?: string;
  referrer?: string;
  referrerDomain?: string;
  landingPage?: string;
  currentPath?: string;
  pageTitle?: string;
}

export async function recordVisitorIngest(data: VisitorIngestData) {
  const db = getDatabase();

  const existing = await dbGet<{ id: number; page_views_count: number; clicks_count: number }>(
    db,
    `SELECT id, page_views_count, clicks_count FROM visitors WHERE session_id = ?`,
    [data.sessionId]
  );

  if (existing) {
    // Update existing session
    await dbRun(
      db,
      `UPDATE visitors SET 
        last_page = ?,
        page_views_count = page_views_count + 1,
        last_seen_at = CURRENT_TIMESTAMP
       WHERE session_id = ?`,
      [data.currentPath || data.landingPage || "/", data.sessionId]
    );
  } else {
    // Insert new session with full networking and device telemetry
    await dbRun(
      db,
      `INSERT INTO visitors (
        session_id, ip, ip_type, country, country_code, flag_emoji, city, region, org,
        device_type, browser, browser_version, os,
        screen_width, screen_height, screen_resolution, viewport_size,
        device_pixel_ratio, screen_orientation, color_depth, touch_support,
        network_type, effective_type, downlink_mbps, rtt_ms, save_data,
        cpu_cores, ram_gb, timezone, language,
        referrer, referrer_domain, landing_page, last_page,
        page_views_count, clicks_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0)`,
      [
        data.sessionId,
        data.ip,
        data.ipType || (data.ip?.includes(":") ? "IPv6" : "IPv4"),
        data.country || "Unknown",
        data.countryCode || "UN",
        data.flagEmoji || "🌐",
        data.city || "Unknown",
        data.region || "",
        data.org || "Direct",
        data.deviceType || "Desktop",
        data.browser || "Unknown",
        data.browserVersion || "",
        data.os || "Unknown",
        data.screenWidth || 0,
        data.screenHeight || 0,
        data.screenResolution || "Unknown",
        data.viewportSize || "",
        data.devicePixelRatio || 1,
        data.screenOrientation || "landscape",
        data.colorDepth || 24,
        data.touchSupport ? 1 : 0,
        data.networkType || "Broadband",
        data.effectiveType || "4g",
        data.downlinkMbps || 0,
        data.rttMs || 0,
        data.saveData ? 1 : 0,
        data.cpuCores || 0,
        data.ramGb || "Unknown",
        data.timezone || "UTC",
        data.language || "en",
        data.referrer || "Direct",
        data.referrerDomain || "Direct",
        data.landingPage || data.currentPath || "/",
        data.currentPath || data.landingPage || "/",
      ]
    );

    // Record audit trail event
    await dbRun(
      db,
      `INSERT INTO audit_logs (event_type, title, details, page, ip, location, device, browser)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "PORTFOLIO_OPEN",
        `Portfolio Accessed from ${data.city || "Unknown"}, ${data.country || "Unknown"}`,
        `${data.deviceType || "Desktop"} • ${data.screenResolution || "Screen"} • ${data.browser} on ${data.os} • IP: ${data.ip}`,
        data.currentPath || data.landingPage || "/",
        data.ip,
        `${data.city || ""}, ${data.country || ""}`,
        data.deviceType || "Desktop",
        data.browser || "Unknown",
      ]
    );
  }

  // Record page view
  if (data.currentPath) {
    await dbRun(
      db,
      `INSERT INTO page_views (session_id, ip, path, title, referrer)
       VALUES (?, ?, ?, ?, ?)`,
      [data.sessionId, data.ip, data.currentPath, data.pageTitle || "", data.referrer || ""]
    );
  }
}

export async function recordClickIngest(data: {
  sessionId: string;
  ip?: string;
  elementId?: string;
  elementText: string;
  elementTag?: string;
  targetUrl?: string;
  pagePath: string;
}) {
  const db = getDatabase();

  await dbRun(
    db,
    `INSERT INTO click_events (session_id, ip, element_id, element_text, element_tag, target_url, page_path)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.sessionId,
      data.ip || "",
      data.elementId || "",
      (data.elementText || "").substring(0, 100),
      data.elementTag || "BUTTON",
      data.targetUrl || "",
      data.pagePath || "/",
    ]
  );

  // Increment clicks_count for visitor session
  await dbRun(
    db,
    `UPDATE visitors SET clicks_count = clicks_count + 1 WHERE session_id = ?`,
    [data.sessionId]
  );
}

export async function getAnalyticsSummary() {
  const db = getDatabase();

  // 1. Core KPIs
  const totalVisitorsRow = await dbGet<{ total: number }>(db, `SELECT COUNT(*) as total FROM visitors`);
  const totalPageViewsRow = await dbGet<{ total: number }>(db, `SELECT COUNT(*) as total FROM page_views`);
  const totalClicksRow = await dbGet<{ total: number }>(db, `SELECT COUNT(*) as total FROM click_events`);
  const uniqueIpsRow = await dbGet<{ total: number }>(db, `SELECT COUNT(DISTINCT ip) as total FROM visitors WHERE ip IS NOT NULL AND ip != ''`);

  // 2. Average Network Telemetry
  const networkMetrics = await dbGet<{ avgDownlink: number; avgRtt: number }>(
    db,
    `SELECT AVG(downlink_mbps) as avgDownlink, AVG(rtt_ms) as avgRtt 
     FROM visitors WHERE downlink_mbps > 0 OR rtt_ms > 0`
  );

  // 3. Devices Breakdown
  const devicesBreakdown = await dbAll<{ device_type: string; count: number }>(
    db,
    `SELECT COALESCE(device_type, 'Desktop') as device_type, COUNT(*) as count 
     FROM visitors GROUP BY device_type ORDER BY count DESC`
  );

  // 4. Screen Sizes Leaderboard
  const screenSizes = await dbAll<{ screen_resolution: string; count: number }>(
    db,
    `SELECT screen_resolution, COUNT(*) as count 
     FROM visitors 
     WHERE screen_resolution IS NOT NULL AND screen_resolution != 'Unknown' AND screen_resolution != ''
     GROUP BY screen_resolution 
     ORDER BY count DESC 
     LIMIT 10`
  );

  // 5. Countries Breakdown
  const countries = await dbAll<{ country: string; country_code: string; flag_emoji: string; count: number }>(
    db,
    `SELECT country, country_code, flag_emoji, COUNT(*) as count 
     FROM visitors 
     WHERE country IS NOT NULL AND country != 'Unknown'
     GROUP BY country, country_code, flag_emoji 
     ORDER BY count DESC 
     LIMIT 10`
  );

  // 6. Operating Systems Breakdown
  const osBreakdown = await dbAll<{ os: string; count: number }>(
    db,
    `SELECT os, COUNT(*) as count 
     FROM visitors 
     WHERE os IS NOT NULL AND os != 'Unknown'
     GROUP BY os 
     ORDER BY count DESC 
     LIMIT 6`
  );

  // 7. Browsers Breakdown
  const browsersBreakdown = await dbAll<{ browser: string; count: number }>(
    db,
    `SELECT browser, COUNT(*) as count 
     FROM visitors 
     WHERE browser IS NOT NULL AND browser != 'Unknown'
     GROUP BY browser 
     ORDER BY count DESC 
     LIMIT 6`
  );

  // 8. Top Clicked Elements
  const topClicks = await dbAll<{ element_text: string; target_url: string; count: number }>(
    db,
    `SELECT element_text, target_url, COUNT(*) as count 
     FROM click_events 
     GROUP BY element_text 
     ORDER BY count DESC 
     LIMIT 10`
  );

  // 9. Network Types (ECT & Telecom)
  const networkTypes = await dbAll<{ effective_type: string; count: number }>(
    db,
    `SELECT COALESCE(effective_type, 'Broadband') as effective_type, COUNT(*) as count 
     FROM visitors 
     GROUP BY effective_type 
     ORDER BY count DESC`
  );

  // 10. Top ISPs / Organizations
  const topOrgs = await dbAll<{ org: string; count: number }>(
    db,
    `SELECT org, COUNT(*) as count 
     FROM visitors 
     WHERE org IS NOT NULL AND org != '' AND org != 'Direct'
     GROUP BY org 
     ORDER BY count DESC 
     LIMIT 8`
  );

  // 11. Recent 15 Visitors
  const recentVisitors = await dbAll(
    db,
    `SELECT * FROM visitors ORDER BY last_seen_at DESC LIMIT 15`
  );

  // 12. Recent 20 Clicks
  const recentClicks = await dbAll(
    db,
    `SELECT * FROM click_events ORDER BY created_at DESC LIMIT 20`
  );

  return {
    kpis: {
      totalVisitors: totalVisitorsRow?.total || 0,
      totalPageViews: totalPageViewsRow?.total || 0,
      totalClicks: totalClicksRow?.total || 0,
      uniqueIps: uniqueIpsRow?.total || 0,
      avgDownlinkMbps: networkMetrics?.avgDownlink ? Number(networkMetrics.avgDownlink.toFixed(1)) : 0,
      avgRttMs: networkMetrics?.avgRtt ? Math.round(networkMetrics.avgRtt) : 0,
    },
    devicesBreakdown,
    screenSizes,
    countries,
    osBreakdown,
    browsersBreakdown,
    topClicks,
    networkTypes,
    topOrgs,
    recentVisitors,
    recentClicks,
    updatedAt: new Date().toISOString(),
  };
}

export async function purgeAnalytics() {
  const db = getDatabase();
  await dbRun(db, `DELETE FROM click_events`);
  await dbRun(db, `DELETE FROM page_views`);
  await dbRun(db, `DELETE FROM visitors`);
  await dbRun(
    db,
    `INSERT INTO audit_logs (event_type, title, details) VALUES (?, ?, ?)`,
    ["SYSTEM_PURGE", "Analytics Purged", "All visitor, click, and telemetry tables were wiped by operator."]
  );
  return { success: true };
}
