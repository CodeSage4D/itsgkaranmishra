"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  getStoredAnalyticsData,
  updateLeadStatus,
  clearAnalyticsLogs,
  ClientVisitorLog,
  ClientClickLog,
  ClientLead,
} from "@/lib/analytics-client";

// Admin Credentials
const ADMIN_USER = "admin@aurxon.ai";
const ADMIN_PASS = "Aurxon@Admin2026!";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "visitors" | "clicks">("overview");

  // Analytics data state
  const [visitors, setVisitors] = useState<ClientVisitorLog[]>([]);
  const [clicks, setClicks] = useState<ClientClickLog[]>([]);
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Check existing session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = sessionStorage.getItem("ahs_admin_auth") === "true";
      if (isAuth) {
        setIsAuthenticated(true);
        refreshData();
      }
    }
  }, []);

  const refreshData = () => {
    const data = getStoredAnalyticsData();
    setVisitors(data.visitors);
    setClicks(data.clicks);
    setLeads(data.leads);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (usernameInput.trim().toLowerCase() === ADMIN_USER.toLowerCase() ||
        usernameInput.trim().toLowerCase() === "karanmishra") &&
      passwordInput === ADMIN_PASS
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem("ahs_admin_auth", "true");
      setLoginError("");
      refreshData();
    } else {
      setLoginError("Invalid username or password. Check credentials in admin_credentials.txt");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ahs_admin_auth");
  };

  const handleStatusChange = (leadId: string, newStatus: ClientLead["status"]) => {
    updateLeadStatus(leadId, newStatus);
    refreshData();
  };

  const handleClearLogs = () => {
    if (confirm("Are you sure you want to reset and clear all visitor logs and click events?")) {
      clearAnalyticsLogs();
      refreshData();
    }
  };

  const exportLeadsCsv = () => {
    if (leads.length === 0) return alert("No leads to export.");
    const headers = ["ID", "Name", "Email", "Phone", "Subject", "Status", "Source", "IP", "City", "Country", "Date", "Message"];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ""}"`,
      `"${l.subject.replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.source}"`,
      `"${l.ip || ""}"`,
      `"${l.city || ""}"`,
      `"${l.country || ""}"`,
      `"${new Date(l.timestamp).toLocaleString()}"`,
      `"${l.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Aurxon_Portfolio_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Analytics Computed Metrics
  const totalVisitors = visitors.length;
  const uniqueIps = useMemo(() => new Set(visitors.map((v) => v.ip)).size, [visitors]);
  const totalPageViews = useMemo(
    () => visitors.reduce((acc, v) => acc + (v.profileViews?.length || 1), 0),
    [visitors]
  );
  const totalClicks = clicks.length;
  const totalLeadsCount = leads.length;
  const conversionRate = totalVisitors > 0 ? ((totalLeadsCount / totalVisitors) * 100).toFixed(1) : "0.0";

  // Referrer Breakdown
  const referrerStats = useMemo(() => {
    const counts: Record<string, number> = {};
    visitors.forEach((v) => {
      const ref = v.referrer || "Direct";
      counts[ref] = (counts[ref] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [visitors]);

  // Device Breakdown
  const deviceStats = useMemo(() => {
    const counts: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    visitors.forEach((v) => {
      const dev = v.device || "Desktop";
      counts[dev] = (counts[dev] || 0) + 1;
    });
    return counts;
  }, [visitors]);

  // Page popularity
  const pageStats = useMemo(() => {
    const counts: Record<string, number> = {};
    visitors.forEach((v) => {
      v.profileViews?.forEach((p) => {
        counts[p] = (counts[p] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [visitors]);

  // 7-day traffic trend data
  const trafficTrend = useMemo(() => {
    const days: { label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayLabel = d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
      const count = visitors.filter((v) => v.timestamp && v.timestamp.slice(0, 10) === dateStr).length;
      days.push({ label: dayLabel, count: Math.max(count, i === 0 ? visitors.length : 1) });
    }
    return days;
  }, [visitors]);

  const maxTrafficCount = Math.max(...trafficTrend.map((d) => d.count), 1);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return leads;
    const q = searchTerm.toLowerCase();
    return leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.subject.toLowerCase().includes(q) ||
        (l.city && l.city.toLowerCase().includes(q))
    );
  }, [leads, searchTerm]);

  // ==================== LOGIN VIEW ====================
  if (!isAuthenticated) {
    return (
      <div className="admin_login_container">
        <div className="admin_login_card">
          <div className="login_logo_badge">
            <span className="shield_icon">🛡️</span>
            <div>
              <h2 className="admin_portal_title">Aurxon Intelligence Hub</h2>
              <p className="admin_portal_sub">Enterprise Portfolio Admin &amp; Analytics Portal</p>
            </div>
          </div>

          <div className="security_notice_box">
            <span className="lock_icon">🔒</span>
            <span>Restricted Access: Authorized credentials required for Karan Mishra.</span>
          </div>

          {loginError && <div className="login_error_alert">{loginError}</div>}

          <form onSubmit={handleLogin} className="login_form">
            <div className="form_group">
              <label className="input_label">Admin Username / Email</label>
              <input
                type="text"
                className="login_input"
                placeholder="admin@aurxon.ai or karanmishra"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
            </div>

            <div className="form_group">
              <label className="input_label">Security Passcode</label>
              <input
                type="password"
                className="login_input"
                placeholder="••••••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login_submit_btn">
              Unlock Analytics Dashboard &rarr;
            </button>
          </form>

          <div className="login_footer">
            <p className="credentials_hint">
              Credentials saved locally in: <code>admin_credentials.txt</code>
            </p>
            <Link href="/" className="back_to_site_link">
              &larr; Return to Public Portfolio
            </Link>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .admin_login_container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at 50% 20%, #1e1b4b 0%, #090a15 100%);
            padding: 24px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .admin_login_card {
            width: 100%;
            max-width: 460px;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(99, 102, 241, 0.25);
            border-radius: 20px;
            padding: 36px 32px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            color: #ffffff;
          }
          .login_logo_badge {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
          }
          .shield_icon {
            font-size: 2.2rem;
            background: rgba(99, 102, 241, 0.15);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 14px;
            padding: 10px;
          }
          .admin_portal_title {
            font-size: 1.35rem;
            font-weight: 800;
            margin: 0;
            color: #f8fafc;
          }
          .admin_portal_sub {
            font-size: 0.8rem;
            color: #94a3b8;
            margin: 2px 0 0 0;
          }
          .security_notice_box {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(245, 158, 11, 0.12);
            border: 1px solid rgba(245, 158, 11, 0.25);
            border-radius: 10px;
            padding: 10px 14px;
            font-size: 0.8rem;
            color: #fbbf24;
            margin-bottom: 22px;
          }
          .login_error_alert {
            background: rgba(239, 68, 68, 0.18);
            border: 1px solid rgba(239, 68, 68, 0.35);
            color: #fca5a5;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 0.84rem;
            margin-bottom: 18px;
          }
          .form_group {
            margin-bottom: 18px;
          }
          .input_label {
            display: block;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #cbd5e1;
            margin-bottom: 6px;
          }
          .login_input {
            width: 100%;
            padding: 12px 16px;
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #334155;
            border-radius: 10px;
            color: #ffffff;
            font-size: 0.95rem;
            outline: none;
            transition: all 0.2s;
          }
          .login_input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
          }
          .login_submit_btn {
            width: 100%;
            padding: 13px;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #ffffff;
            border: none;
            border-radius: 10px;
            font-size: 0.96rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(79, 70, 229, 0.35);
            transition: all 0.2s;
            margin-top: 8px;
          }
          .login_submit_btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 28px rgba(79, 70, 229, 0.5);
          }
          .login_footer {
            margin-top: 24px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 18px;
          }
          .credentials_hint {
            font-size: 0.76rem;
            color: #64748b;
            margin-bottom: 12px;
          }
          .credentials_hint code {
            background: #1e293b;
            padding: 2px 6px;
            border-radius: 4px;
            color: #a5b4fc;
          }
          .back_to_site_link {
            color: #818cf8;
            text-decoration: none;
            font-size: 0.84rem;
            font-weight: 600;
          }
          .back_to_site_link:hover {
            text-decoration: underline;
          }
        `}} />
      </div>
    );
  }

  // ==================== DASHBOARD VIEW ====================
  return (
    <div className="admin_dash_wrapper">
      {/* Top Navigation Bar */}
      <header className="admin_dash_header">
        <div className="header_left">
          <div className="status_indicator pulse_green"></div>
          <div>
            <h1 className="header_title">Aurxon Business Intelligence &amp; Analytics</h1>
            <p className="header_sub">
              Live Monitoring for <strong>itsgkaranmishra.web.app</strong> &bull; Karan Mishra
            </p>
          </div>
        </div>

        <div className="header_actions">
          <button onClick={exportLeadsCsv} className="action_btn btn_export" title="Export Leads to CSV">
            📥 Export Leads CSV
          </button>
          <button onClick={refreshData} className="action_btn btn_refresh" title="Refresh Live Data">
            🔄 Refresh Data
          </button>
          <button onClick={handleLogout} className="action_btn btn_logout" title="Sign Out">
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Security Info Banner */}
      <div className="network_policy_banner">
        <div className="policy_icon">ℹ️</div>
        <div className="policy_text">
          <strong>Network Intelligence Capture Active:</strong> Client Public IP, Geolocation (City, State, Country), Referrer Source (LinkedIn, Instagram, Google, Direct), Device/Browser profile, Page Views, and Button Click responses are logged in real-time.
          <span className="policy_mac_note">
            {" "}(*Note: Browser W3C security sandboxes strictly restrict MAC address access for all web clients on the internet; hardware MAC addresses are kept on Layer 2 and never transmitted via HTTP).
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="kpi_grid">
        <div className="kpi_card">
          <div className="kpi_icon icon_purple">👥</div>
          <div className="kpi_data">
            <span className="kpi_label">Total Visitors</span>
            <span className="kpi_value">{totalVisitors}</span>
            <span className="kpi_sub">Unique Sessions</span>
          </div>
        </div>

        <div className="kpi_card">
          <div className="kpi_icon icon_blue">🌐</div>
          <div className="kpi_data">
            <span className="kpi_label">Unique IP Addresses</span>
            <span className="kpi_value">{uniqueIps}</span>
            <span className="kpi_sub">Worldwide Network</span>
          </div>
        </div>

        <div className="kpi_card">
          <div className="kpi_icon icon_cyan">📄</div>
          <div className="kpi_data">
            <span className="kpi_label">Page &amp; Profile Views</span>
            <span className="kpi_value">{totalPageViews}</span>
            <span className="kpi_sub">Total Engagement</span>
          </div>
        </div>

        <div className="kpi_card">
          <div className="kpi_icon icon_green">🎯</div>
          <div className="kpi_data">
            <span className="kpi_label">Interactive Clicks</span>
            <span className="kpi_value">{totalClicks}</span>
            <span className="kpi_sub">CTA &amp; Button Actions</span>
          </div>
        </div>

        <div className="kpi_card highlight_card">
          <div className="kpi_icon icon_gold">💼</div>
          <div className="kpi_data">
            <span className="kpi_label">Inquiry Leads</span>
            <span className="kpi_value">{totalLeadsCount}</span>
            <span className="kpi_sub">Conversion: {conversionRate}%</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard_nav_tabs">
        <button
          className={`tab_btn ${activeTab === "overview" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Analytics &amp; Visual Graphs
        </button>
        <button
          className={`tab_btn ${activeTab === "leads" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("leads")}
        >
          💼 Leads &amp; Consultations ({leads.length})
        </button>
        <button
          className={`tab_btn ${activeTab === "visitors" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("visitors")}
        >
          🌍 Visitor &amp; IP Tracking Log ({visitors.length})
        </button>
        <button
          className={`tab_btn ${activeTab === "clicks" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("clicks")}
        >
          🖱️ Click Responses ({clicks.length})
        </button>
      </div>

      {/* ================= TAB 1: OVERVIEW & GRAPHS ================= */}
      {activeTab === "overview" && (
        <div className="tab_content">
          <div className="analytics_charts_row">
            {/* 7-Day Traffic Trend Chart */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">Traffic &amp; Visitor Trend (Last 7 Days)</h3>
                  <p className="chart_sub">Daily visitors landing on your portfolio</p>
                </div>
              </div>

              <div className="bar_chart_container">
                {trafficTrend.map((d, i) => {
                  const heightPercent = Math.max((d.count / maxTrafficCount) * 100, 12);
                  return (
                    <div key={i} className="chart_bar_column">
                      <div className="bar_tooltip">{d.count} visits</div>
                      <div className="chart_bar_wrapper">
                        <div
                          className="chart_bar_fill"
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                      </div>
                      <span className="bar_label">{d.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Referrer & Traffic Sources */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">Where Links Were Opened (Referrers)</h3>
                  <p className="chart_sub">Direct origins of your audience</p>
                </div>
              </div>

              <div className="sources_list">
                {referrerStats.map(([source, count], idx) => {
                  const pct = ((count / Math.max(totalVisitors, 1)) * 100).toFixed(0);
                  return (
                    <div key={idx} className="source_item">
                      <div className="source_info">
                        <span className="source_name">{source}</span>
                        <span className="source_count">
                          {count} visits ({pct}%)
                        </span>
                      </div>
                      <div className="source_progress_bg">
                        <div
                          className="source_progress_fill"
                          style={{
                            width: `${pct}%`,
                            background:
                              source === "LinkedIn"
                                ? "#0077b5"
                                : source === "GitHub"
                                ? "#24292e"
                                : source === "Google Search"
                                ? "#ea4335"
                                : source === "Instagram"
                                ? "#e1306c"
                                : "#6366f1",
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="analytics_charts_row mt-4">
            {/* Top Visited Pages & Profiles */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">Most Viewed Pages &amp; Profiles</h3>
                  <p className="chart_sub">Sections attracting the highest recruiter &amp; client interest</p>
                </div>
              </div>

              <div className="sources_list">
                {pageStats.map(([page, count], idx) => {
                  const pct = ((count / Math.max(totalPageViews, 1)) * 100).toFixed(0);
                  const pageTitle =
                    page === "/"
                      ? "Home (Hero, Timeline, Experience)"
                      : page === "/about"
                      ? "About Karan Mishra &amp; Aurxon"
                      : page === "/portfolio"
                      ? "Projects Showcase &amp; Demos"
                      : page === "/services"
                      ? "AI &amp; Enterprise Solutions"
                      : page === "/contact"
                      ? "Direct Contact &amp; Inquiry"
                      : page;
                  return (
                    <div key={idx} className="source_item">
                      <div className="source_info">
                        <span className="source_name" dangerouslySetInnerHTML={{ __html: pageTitle }} />
                        <span className="source_count">
                          {count} views ({pct}%)
                        </span>
                      </div>
                      <div className="source_progress_bg">
                        <div className="source_progress_fill fill_blue" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Device & Hardware Platform Split */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">Device Distribution</h3>
                  <p className="chart_sub">Hardware categories used to browse your portfolio</p>
                </div>
              </div>

              <div className="device_split_grid">
                <div className="device_card">
                  <span className="device_icon">💻</span>
                  <span className="device_name">Desktop</span>
                  <span className="device_count">{deviceStats.Desktop}</span>
                  <span className="device_pct">
                    {((deviceStats.Desktop / Math.max(totalVisitors, 1)) * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="device_card">
                  <span className="device_icon">📱</span>
                  <span className="device_name">Mobile</span>
                  <span className="device_count">{deviceStats.Mobile}</span>
                  <span className="device_pct">
                    {((deviceStats.Mobile / Math.max(totalVisitors, 1)) * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="device_card">
                  <span className="device_icon">📟</span>
                  <span className="device_name">Tablet</span>
                  <span className="device_count">{deviceStats.Tablet}</span>
                  <span className="device_pct">
                    {((deviceStats.Tablet / Math.max(totalVisitors, 1)) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: LEADS MANAGEMENT ================= */}
      {activeTab === "leads" && (
        <div className="tab_content">
          <div className="table_controls_row">
            <input
              type="text"
              placeholder="Search leads by name, email, subject, or city..."
              className="table_search_input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={exportLeadsCsv} className="action_btn btn_export">
              📥 Download CSV
            </button>
          </div>

          <div className="data_table_wrapper">
            <table className="custom_data_table">
              <thead>
                <tr>
                  <th>Client / Sender</th>
                  <th>Contact Info</th>
                  <th>Inquiry / Subject</th>
                  <th>Location &amp; Source</th>
                  <th>Date &amp; Status</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty_table_cell">
                      No matching leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <strong className="lead_name">{lead.name}</strong>
                      </td>
                      <td>
                        <div>
                          <a href={`mailto:${lead.email}`} className="table_link">
                            {lead.email}
                          </a>
                        </div>
                        {lead.phone && (
                          <div className="small text_muted">
                            <a href={`tel:${lead.phone}`} className="table_link">
                              {lead.phone}
                            </a>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="subject_badge">{lead.subject}</div>
                        <div className="lead_message_preview">{lead.message}</div>
                      </td>
                      <td>
                        <div className="location_text">
                          📍 {lead.city ? `${lead.city}, ` : ""}{lead.country || "India"}
                        </div>
                        <span className="source_pill">{lead.source}</span>
                      </td>
                      <td>
                        <div className="timestamp_text">{new Date(lead.timestamp).toLocaleDateString()}</div>
                        <select
                          className={`status_select status_${lead.status.toLowerCase()}`}
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In-Discussion">In Discussion</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td>
                        <div className="action_btns_group">
                          <a
                            href={`mailto:${lead.email}?subject=${encodeURIComponent(
                              `Re: ${lead.subject} - Karan Mishra (Aurxon)`
                            )}`}
                            className="btn_quick_action"
                            title="Reply via Email"
                          >
                            ✉️ Email
                          </a>
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn_quick_action btn_whatsapp"
                              title="Chat on WhatsApp"
                            >
                              💬 WhatsApp
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: VISITOR & IP TRACKING LOG ================= */}
      {activeTab === "visitors" && (
        <div className="tab_content">
          <div className="table_controls_row">
            <span className="table_info_note">
              Capturing visitor IP address, approximate geolocation, referrer source, and visited sections.
            </span>
            <button onClick={handleClearLogs} className="action_btn btn_danger">
              🗑️ Clear All Logs
            </button>
          </div>

          <div className="data_table_wrapper">
            <table className="custom_data_table">
              <thead>
                <tr>
                  <th>Public IP Address</th>
                  <th>Location (City, Country)</th>
                  <th>Where Link Opened (Referrer)</th>
                  <th>Device / Browser</th>
                  <th>Sections Visited</th>
                  <th>Actions / Clicks</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <code
                        className="ip_code clickable"
                        onClick={() => copyToClipboard(v.ip)}
                        title="Click to copy IP"
                      >
                        {v.ip} {copiedText === v.ip ? "✓ Copied" : "📋"}
                      </code>
                      {v.org && <div className="org_text">{v.org}</div>}
                    </td>
                    <td>
                      <div className="location_text">
                        📍 {v.city || "Unknown"}, {v.country || "Unknown"}
                      </div>
                      {v.region && <span className="small text_muted">{v.region}</span>}
                    </td>
                    <td>
                      <span className="source_pill">{v.referrer || "Direct"}</span>
                    </td>
                    <td>
                      <div className="device_info_pill">
                        {v.device === "Mobile" ? "📱" : "💻"} {v.device} &bull; {v.browser}
                      </div>
                      <div className="small text_muted">{v.os}</div>
                    </td>
                    <td>
                      <div className="views_tags_list">
                        {v.profileViews?.map((p, idx) => (
                          <span key={idx} className="view_tag">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className="click_badge">{v.clicksCount || 0} clicks</span>
                    </td>
                    <td>
                      <div className="timestamp_text">{new Date(v.timestamp).toLocaleString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: CLICK RESPONSES ================= */}
      {activeTab === "clicks" && (
        <div className="tab_content">
          <div className="data_table_wrapper">
            <table className="custom_data_table">
              <thead>
                <tr>
                  <th>Element / Button Clicked</th>
                  <th>Page</th>
                  <th>Target Destination / Action</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {clicks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="empty_table_cell">
                      No click responses logged yet.
                    </td>
                  </tr>
                ) : (
                  clicks.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <strong className="click_name">🎯 {c.elementText}</strong>
                        {c.elementId && <code className="id_code">#{c.elementId}</code>}
                      </td>
                      <td>
                        <span className="page_pill">{c.page}</span>
                      </td>
                      <td>
                        <span className="target_url">{c.targetUrl || "In-Page Interaction"}</span>
                      </td>
                      <td>
                        <span className="timestamp_text">{new Date(c.timestamp).toLocaleString()}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Scoped CSS Styles for Admin Dashboard */}
      <style dangerouslySetInnerHTML={{ __html: `
        .admin_dash_wrapper {
          min-height: 100vh;
          background: #090a15;
          color: #f1f5f9;
          padding: 30px 40px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .admin_dash_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px 28px;
          margin-bottom: 24px;
        }
        .header_left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .status_indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 12px #10b981;
        }
        .header_title {
          font-size: 1.45rem;
          font-weight: 800;
          margin: 0;
          color: #ffffff;
        }
        .header_sub {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 2px 0 0 0;
        }
        .header_actions {
          display: flex;
          gap: 12px;
        }
        .action_btn {
          padding: 9px 18px;
          border-radius: 10px;
          font-size: 0.86rem;
          font-weight: 600;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn_export {
          background: #0284c7;
          color: #ffffff;
        }
        .btn_export:hover {
          background: #0369a1;
        }
        .btn_refresh {
          background: #334155;
          color: #f8fafc;
        }
        .btn_refresh:hover {
          background: #475569;
        }
        .btn_logout {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.3);
        }
        .btn_logout:hover {
          background: rgba(239, 68, 68, 0.25);
        }
        .btn_danger {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }
        .network_policy_banner {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 12px;
          padding: 14px 18px;
          font-size: 0.85rem;
          color: #cbd5e1;
          margin-bottom: 26px;
        }
        .policy_mac_note {
          color: #94a3b8;
          font-style: italic;
        }
        .kpi_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 18px;
          margin-bottom: 30px;
        }
        .kpi_card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 18px;
          transition: transform 0.2s;
        }
        .kpi_card:hover {
          transform: translateY(-2px);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .highlight_card {
          background: linear-gradient(145deg, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%);
          border-color: rgba(99, 102, 241, 0.4);
        }
        .kpi_icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
        }
        .icon_purple { background: rgba(168, 85, 247, 0.15); }
        .icon_blue { background: rgba(59, 130, 246, 0.15); }
        .icon_cyan { background: rgba(6, 182, 212, 0.15); }
        .icon_green { background: rgba(16, 185, 129, 0.15); }
        .icon_gold { background: rgba(245, 158, 11, 0.15); }
        .kpi_data {
          display: flex;
          flex-direction: column;
        }
        .kpi_label {
          font-size: 0.76rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
        }
        .kpi_value {
          font-size: 1.7rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
        }
        .kpi_sub {
          font-size: 0.76rem;
          color: #64748b;
        }
        .dashboard_nav_tabs {
          display: flex;
          gap: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 24px;
          overflow-x: auto;
        }
        .tab_btn {
          padding: 12px 20px;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .tab_btn:hover {
          color: #f1f5f9;
        }
        .active_tab {
          color: #818cf8 !important;
          border-bottom: 2px solid #818cf8;
        }
        .analytics_charts_row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
          gap: 24px;
        }
        .chart_card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 26px;
        }
        .chart_header {
          margin-bottom: 22px;
        }
        .chart_title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .chart_sub {
          font-size: 0.8rem;
          color: #94a3b8;
          margin: 2px 0 0 0;
        }
        .bar_chart_container {
          display: flex;
          align-items: flex-end;
          gap: 14px;
          height: 190px;
          padding-top: 20px;
        }
        .chart_bar_column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          position: relative;
        }
        .chart_bar_wrapper {
          width: 100%;
          max-width: 38px;
          height: 100%;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .chart_bar_fill {
          width: 100%;
          background: linear-gradient(180deg, #818cf8 0%, #4f46e5 100%);
          border-radius: 8px 8px 0 0;
          transition: height 0.6s ease;
        }
        .bar_label {
          font-size: 0.72rem;
          color: #64748b;
          margin-top: 8px;
          text-align: center;
        }
        .bar_tooltip {
          font-size: 0.7rem;
          color: #cbd5e1;
          margin-bottom: 4px;
        }
        .sources_list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .source_item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .source_info {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
        }
        .source_name {
          color: #f1f5f9;
          font-weight: 500;
        }
        .source_count {
          color: #94a3b8;
        }
        .source_progress_bg {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }
        .source_progress_fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        .fill_blue {
          background: linear-gradient(90deg, #38bdf8 0%, #0284c7 100%);
        }
        .device_split_grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .device_card {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .device_icon {
          font-size: 1.8rem;
          margin-bottom: 8px;
        }
        .device_name {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 600;
        }
        .device_count {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          margin: 4px 0;
        }
        .device_pct {
          font-size: 0.74rem;
          color: #38bdf8;
        }
        .table_controls_row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .table_search_input {
          flex: 1;
          max-width: 440px;
          padding: 10px 16px;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 10px;
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
        }
        .table_search_input:focus {
          border-color: #6366f1;
        }
        .table_info_note {
          font-size: 0.82rem;
          color: #94a3b8;
        }
        .data_table_wrapper {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow-x: auto;
        }
        .custom_data_table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.86rem;
        }
        .custom_data_table th {
          background: rgba(30, 41, 59, 0.7);
          padding: 14px 18px;
          text-align: left;
          font-size: 0.76rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .custom_data_table td {
          padding: 14px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
          vertical-align: middle;
        }
        .custom_data_table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }
        .lead_name {
          color: #ffffff;
          font-size: 0.94rem;
        }
        .table_link {
          color: #818cf8;
          text-decoration: none;
        }
        .table_link:hover {
          text-decoration: underline;
        }
        .subject_badge {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 600;
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          padding: 2px 8px;
          border-radius: 6px;
          margin-bottom: 4px;
        }
        .lead_message_preview {
          font-size: 0.8rem;
          color: #94a3b8;
          max-width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .location_text {
          font-weight: 600;
          color: #f1f5f9;
        }
        .source_pill {
          display: inline-block;
          font-size: 0.72rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 8px;
          border-radius: 50px;
          margin-top: 4px;
          color: #cbd5e1;
        }
        .status_select {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid transparent;
          margin-top: 4px;
          cursor: pointer;
        }
        .status_new {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border-color: rgba(245, 158, 11, 0.3);
        }
        .status_contacted {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.3);
        }
        .status_in-discussion {
          background: rgba(168, 85, 247, 0.15);
          color: #c084fc;
          border-color: rgba(168, 85, 247, 0.3);
        }
        .status_closed {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.3);
        }
        .action_btns_group {
          display: flex;
          gap: 6px;
        }
        .btn_quick_action {
          padding: 6px 12px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #f1f5f9;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn_quick_action:hover {
          background: #4458dc;
          color: #ffffff;
        }
        .btn_whatsapp {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.3);
        }
        .btn_whatsapp:hover {
          background: #10b981;
          color: #ffffff;
        }
        .ip_code {
          background: #1e293b;
          padding: 4px 8px;
          border-radius: 6px;
          color: #38bdf8;
          font-family: monospace;
          cursor: pointer;
        }
        .org_text {
          font-size: 0.72rem;
          color: #64748b;
          margin-top: 4px;
        }
        .device_info_pill {
          font-size: 0.82rem;
          font-weight: 600;
        }
        .views_tags_list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          max-width: 220px;
        }
        .view_tag {
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2px 6px;
          border-radius: 4px;
          color: #cbd5e1;
        }
        .click_badge {
          font-size: 0.78rem;
          background: rgba(16, 185, 129, 0.12);
          color: #34d399;
          padding: 3px 8px;
          border-radius: 50px;
          font-weight: 600;
        }
        .timestamp_text {
          font-size: 0.76rem;
          color: #94a3b8;
        }
        .click_name {
          color: #ffffff;
          font-size: 0.88rem;
          display: block;
        }
        .id_code {
          font-size: 0.72rem;
          color: #818cf8;
        }
        .page_pill {
          background: rgba(255, 255, 255, 0.06);
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.76rem;
        }
        .target_url {
          font-size: 0.78rem;
          color: #94a3b8;
          word-break: break-all;
        }
        .empty_table_cell {
          text-align: center;
          padding: 40px;
          color: #64748b;
        }
      `}} />
    </div>
  );
}
