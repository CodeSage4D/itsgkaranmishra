import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.resolve(process.cwd(), "portfolio_analytics.sqlite3");

// Ensure database file directory exists
let dbInstance: sqlite3.Database | null = null;

export function getDatabase(): sqlite3.Database {
  if (dbInstance) return dbInstance;

  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error("Failed to connect to SQLite3 database:", err);
    } else {
      console.log("Connected to SQLite3 analytics database at", DB_PATH);
    }
  });

  // Initialize tables
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        ip TEXT,
        country TEXT,
        city TEXT,
        region TEXT,
        user_agent TEXT,
        device_type TEXT,
        browser TEXT,
        referrer TEXT,
        landing_page TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

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

    db.run(`
      CREATE TABLE IF NOT EXISTS click_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        ip TEXT,
        element_id TEXT,
        element_text TEXT,
        target_url TEXT,
        page_path TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT,
        ip TEXT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT,
        message TEXT,
        status TEXT DEFAULT 'New',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });

  dbInstance = db;
  return dbInstance;
}

export interface VisitorRecord {
  id?: number;
  session_id: string;
  ip?: string;
  country?: string;
  city?: string;
  region?: string;
  user_agent?: string;
  device_type?: string;
  browser?: string;
  referrer?: string;
  landing_page?: string;
  created_at?: string;
}

export interface LeadRecord {
  id?: number;
  session_id?: string;
  ip?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  status?: string;
  created_at?: string;
}

export interface ClickRecord {
  id?: number;
  session_id: string;
  ip?: string;
  element_id?: string;
  element_text?: string;
  target_url?: string;
  page_path?: string;
  created_at?: string;
}

export interface PageViewRecord {
  id?: number;
  session_id: string;
  ip?: string;
  path: string;
  title?: string;
  referrer?: string;
  created_at?: string;
}

export function logVisitorDb(v: VisitorRecord): Promise<number> {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.run(
      `INSERT INTO visitors (session_id, ip, country, city, region, user_agent, device_type, browser, referrer, landing_page)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        v.session_id,
        v.ip || "127.0.0.1",
        v.country || "Unknown",
        v.city || "Unknown",
        v.region || "Unknown",
        v.user_agent || "",
        v.device_type || "Desktop",
        v.browser || "Unknown",
        v.referrer || "Direct",
        v.landing_page || "/",
      ],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

export function logLeadDb(l: LeadRecord): Promise<number> {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.run(
      `INSERT INTO leads (session_id, ip, name, email, phone, subject, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        l.session_id || "direct",
        l.ip || "Unknown",
        l.name,
        l.email,
        l.phone || "",
        l.subject || "General",
        l.message || "",
        l.status || "New",
      ],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}
