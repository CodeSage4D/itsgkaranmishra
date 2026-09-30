import sqlite3 from "sqlite3";
import path from "path";

const DB_PATH = path.resolve(process.cwd(), "portfolio_analytics.sqlite3");

let dbInstance: sqlite3.Database | null = null;

export function getDatabase(): sqlite3.Database {
  if (dbInstance) return dbInstance;

  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error("Failed to connect to SQLite3 database:", err);
    } else {
      console.log("Connected to SQLite3 analytics & CMS database at", DB_PATH);
    }
  });

  // Initialize relational tables
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        ip TEXT,
        country TEXT,
        country_code TEXT,
        city TEXT,
        region TEXT,
        org TEXT,
        device_type TEXT,
        browser TEXT,
        os TEXT,
        screen_resolution TEXT,
        timezone TEXT,
        network_type TEXT,
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
        city TEXT,
        country TEXT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT,
        message TEXT,
        status TEXT DEFAULT 'New',
        priority TEXT DEFAULT 'High',
        admin_notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS blogs (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        category TEXT,
        author TEXT,
        author_role TEXT,
        read_time TEXT,
        summary TEXT,
        content TEXT NOT NULL,
        tags TEXT,
        views INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT,
        description TEXT,
        image TEXT,
        tags TEXT,
        live_url TEXT,
        github_url TEXT,
        featured INTEGER DEFAULT 1,
        sort_order INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS feedbacks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT,
        company TEXT,
        rating INTEGER DEFAULT 5,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'Approved',
        featured_on_home INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });

  dbInstance = db;
  return dbInstance;
}
