"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  getStoredAnalyticsData,
  updateLeadDetails,
  deleteLead,
  recordLead,
  clearAnalyticsLogs,
  ClientVisitorLog,
  ClientClickLog,
  ClientLead,
} from "@/lib/analytics-client";
import {
  getAllBlogs,
  saveBlogPost,
  deleteBlogPost,
  BlogPost,
  getAllProjects,
  savePortfolioProject,
  deletePortfolioProject,
  PortfolioProject,
  getAllFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
  UserFeedback,
} from "@/lib/cms-store";

// New Secure Admin Credentials
const ADMIN_USER = "karann";
const ADMIN_PASS = "KarranAurxon$22";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "overview" | "leads" | "blogs" | "projects" | "feedbacks" | "visitors" | "clicks"
  >("overview");

  // Telemetry & Lead Data
  const [visitors, setVisitors] = useState<ClientVisitorLog[]>([]);
  const [clicks, setClicks] = useState<ClientClickLog[]>([]);
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [leadSearch, setLeadSearch] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // CMS State
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);

  // Modals & Editing State
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [editingLead, setEditingLead] = useState<ClientLead | null>(null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Check Session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = sessionStorage.getItem("ahs_admin_auth") === "true";
      if (isAuth) {
        setIsAuthenticated(true);
        refreshAllData();
      }
    }
  }, []);

  const refreshAllData = () => {
    const analytics = getStoredAnalyticsData();
    setVisitors(analytics.visitors);
    setClicks(analytics.clicks);
    setLeads(analytics.leads);

    setBlogs(getAllBlogs());
    setProjects(getAllProjects());
    setFeedbacks(getAllFeedbacks());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === ADMIN_USER && passwordInput === ADMIN_PASS) {
      setIsAuthenticated(true);
      sessionStorage.setItem("ahs_admin_auth", "true");
      setLoginError("");
      refreshAllData();
    } else {
      setLoginError("Invalid credentials. Please verify username and password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ahs_admin_auth");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // ================= METRICS & STATS =================
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

  // Traffic 7-Day Trend
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
    if (!leadSearch.trim()) return leads;
    const q = leadSearch.toLowerCase();
    return leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.subject.toLowerCase().includes(q) ||
        (l.city && l.city.toLowerCase().includes(q))
    );
  }, [leads, leadSearch]);

  // ================= CRUD HANDLERS =================

  // Blog CRUD
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title || !editingBlog?.content) return alert("Title and Content are required.");
    saveBlogPost({
      id: editingBlog.id,
      title: editingBlog.title,
      category: editingBlog.category || "AI & Technology",
      summary: editingBlog.summary || editingBlog.content.substring(0, 160) + "...",
      content: editingBlog.content,
      readTime: editingBlog.readTime || "6 min read",
      author: editingBlog.author || "Karan Mishra",
      tags: typeof editingBlog.tags === "string" ? (editingBlog.tags as string).split(",").map((s) => s.trim()) : editingBlog.tags || ["Aurxon"],
    });
    setShowBlogModal(false);
    setEditingBlog(null);
    refreshAllData();
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article: "${title}"?`)) {
      deleteBlogPost(id);
      refreshAllData();
    }
  };

  // Project CRUD
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.description) return alert("Title and Description are required.");
    savePortfolioProject({
      id: editingProject.id,
      title: editingProject.title,
      category: editingProject.category || "AI/ML",
      description: editingProject.description,
      liveUrl: editingProject.liveUrl,
      githubUrl: editingProject.githubUrl,
      featured: editingProject.featured ?? true,
      tags: typeof editingProject.tags === "string" ? (editingProject.tags as string).split(",").map((s) => s.trim()) : editingProject.tags || ["AI"],
    });
    setShowProjectModal(false);
    setEditingProject(null);
    refreshAllData();
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove project: "${title}"?`)) {
      deletePortfolioProject(id);
      refreshAllData();
    }
  };

  // Lead CRUD
  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) return alert("Name and email are required.");
    recordLead({
      name: newLeadForm.name,
      email: newLeadForm.email,
      phone: newLeadForm.phone,
      subject: newLeadForm.subject || "Manual Admin Entry",
      message: newLeadForm.message || "Recorded directly from Admin Portal.",
      source: "Admin Portal Manual Entry",
    });
    setNewLeadForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setShowNewLeadModal(false);
    refreshAllData();
  };

  const handleUpdateLeadStatus = (leadId: string, status: ClientLead["status"]) => {
    updateLeadDetails(leadId, { status });
    refreshAllData();
  };

  const handleSaveLeadNotes = (leadId: string, notes: string, priority: ClientLead["priority"]) => {
    updateLeadDetails(leadId, { adminNotes: notes, priority });
    setEditingLead(null);
    refreshAllData();
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Delete this lead permanently?")) {
      deleteLead(id);
      refreshAllData();
    }
  };

  const exportLeadsCsv = () => {
    if (leads.length === 0) return alert("No leads to export.");
    const headers = ["ID", "Name", "Email", "Phone", "Subject", "Status", "Priority", "Source", "IP", "City", "Country", "Date", "Notes", "Message"];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ""}"`,
      `"${l.subject.replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.priority || "High"}"`,
      `"${l.source}"`,
      `"${l.ip || ""}"`,
      `"${l.city || ""}"`,
      `"${l.country || ""}"`,
      `"${new Date(l.timestamp).toLocaleString()}"`,
      `"${(l.adminNotes || "").replace(/"/g, '""')}"`,
      `"${l.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Aurxon_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Feedbacks CRUD
  const handleToggleFeedbackStatus = (id: string, currentStatus: UserFeedback["status"]) => {
    const nextStatus = currentStatus === "Approved" ? "Rejected" : "Approved";
    updateFeedbackStatus(id, nextStatus);
    refreshAllData();
  };

  const handleDeleteFeedback = (id: string) => {
    if (confirm("Delete this feedback?")) {
      deleteFeedback(id);
      refreshAllData();
    }
  };

  // ==================== LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <div className="admin_login_container">
        <div className="admin_login_card">
          <div className="login_logo_badge">
            <span className="shield_icon">🛡️</span>
            <div>
              <h2 className="admin_portal_title">Aurxon Intelligence Hub</h2>
              <p className="admin_portal_sub">Enterprise Portfolio &amp; CMS Management</p>
            </div>
          </div>

          <div className="security_notice_box">
            <span className="lock_icon">🔒</span>
            <span>Security Authenticator: Enter administrative credentials to proceed.</span>
          </div>

          {loginError && <div className="login_error_alert">{loginError}</div>}

          <form onSubmit={handleLogin} className="login_form">
            <div className="form_group">
              <label className="input_label">Admin Username</label>
              <input
                type="text"
                className="login_input"
                placeholder="karann"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
            </div>

            <div className="form_group">
              <label className="input_label">Security Password</label>
              <input
                type="password"
                className="login_input"
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login_submit_btn">
              Unlock Advanced Admin Portal &rarr;
            </button>
          </form>

          <div className="login_footer">
            <p className="credentials_hint">
              Credentials: <code>admin_credentials.txt</code> (User: <code>karann</code>)
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
        `}} />
      </div>
    );
  }

  // ==================== DASHBOARD VIEW ====================
  return (
    <div className="admin_dash_wrapper">
      {/* Top Header */}
      <header className="admin_dash_header">
        <div className="header_left">
          <div className="status_indicator pulse_green"></div>
          <div>
            <h1 className="header_title">Aurxon Enterprise Intelligence &bull; Command Center</h1>
            <p className="header_sub">
              Live Monitoring for <strong>itsgkaranmishra.web.app</strong> &bull; Authenticated as <strong>{ADMIN_USER}</strong>
            </p>
          </div>
        </div>

        <div className="header_actions">
          <Link href="/" className="action_btn btn_site_link" target="_blank">
            🌐 View Public Site
          </Link>
          <button onClick={refreshAllData} className="action_btn btn_refresh" title="Refresh Live Data">
            🔄 Sync Data
          </button>
          <button onClick={handleLogout} className="action_btn btn_logout" title="Sign Out">
            🚪 Logout
          </button>
        </div>
      </header>

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
            <span className="kpi_label">Unique IP Network</span>
            <span className="kpi_value">{uniqueIps}</span>
            <span className="kpi_sub">Global Locations</span>
          </div>
        </div>

        <div className="kpi_card">
          <div className="kpi_icon icon_cyan">📄</div>
          <div className="kpi_data">
            <span className="kpi_label">Page / Profile Views</span>
            <span className="kpi_value">{totalPageViews}</span>
            <span className="kpi_sub">Total Engagement</span>
          </div>
        </div>

        <div className="kpi_card">
          <div className="kpi_icon icon_green">🎯</div>
          <div className="kpi_data">
            <span className="kpi_label">Interactive Clicks</span>
            <span className="kpi_value">{totalClicks}</span>
            <span className="kpi_sub">CTA &amp; Link Actions</span>
          </div>
        </div>

        <div className="kpi_card highlight_card">
          <div className="kpi_icon icon_gold">💼</div>
          <div className="kpi_data">
            <span className="kpi_label">Leads &amp; Inquiries</span>
            <span className="kpi_value">{totalLeadsCount}</span>
            <span className="kpi_sub">Conversion: {conversionRate}%</span>
          </div>
        </div>
      </div>

      {/* 10X Navigation Tabs */}
      <div className="dashboard_nav_tabs">
        <button
          className={`tab_btn ${activeTab === "overview" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Intelligence &amp; Analytics
        </button>
        <button
          className={`tab_btn ${activeTab === "leads" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("leads")}
        >
          💼 Leads CRM ({leads.length})
        </button>
        <button
          className={`tab_btn ${activeTab === "blogs" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("blogs")}
        >
          📝 Blog Management ({blogs.length})
        </button>
        <button
          className={`tab_btn ${activeTab === "projects" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          🚀 Projects Showcase ({projects.length})
        </button>
        <button
          className={`tab_btn ${activeTab === "feedbacks" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("feedbacks")}
        >
          ⭐ Reviews &amp; Feedback ({feedbacks.length})
        </button>
        <button
          className={`tab_btn ${activeTab === "visitors" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("visitors")}
        >
          🌍 Visitor Telemetry ({visitors.length})
        </button>
        <button
          className={`tab_btn ${activeTab === "clicks" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("clicks")}
        >
          🎯 Click Stream ({clicks.length})
        </button>
      </div>

      {/* ================= TAB 1: OVERVIEW & CHARTS ================= */}
      {activeTab === "overview" && (
        <div className="tab_content">
          <div className="analytics_charts_row">
            {/* Traffic Trend */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">Traffic &amp; Visitor Velocity (7 Days)</h3>
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
                        <div className="chart_bar_fill" style={{ height: `${heightPercent}%` }}></div>
                      </div>
                      <span className="bar_label">{d.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Referrers */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">Where Links Were Opened (Origin)</h3>
                  <p className="chart_sub">Traffic distribution across professional channels</p>
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
            {/* Conversion Funnel */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">Lead Conversion Funnel</h3>
                  <p className="chart_sub">Audience journey from visitor to qualified inquiry</p>
                </div>
              </div>
              <div className="funnel_container">
                <div className="funnel_stage">
                  <span className="funnel_label">1. Total Visitors</span>
                  <div className="funnel_bar_bg">
                    <div className="funnel_bar_fill fill_100" style={{ width: "100%" }}>
                      {totalVisitors} sessions (100%)
                    </div>
                  </div>
                </div>
                <div className="funnel_stage">
                  <span className="funnel_label">2. Page &amp; Profile Engagers</span>
                  <div className="funnel_bar_bg">
                    <div className="funnel_bar_fill fill_80" style={{ width: "78%" }}>
                      {totalPageViews} views
                    </div>
                  </div>
                </div>
                <div className="funnel_stage">
                  <span className="funnel_label">3. CTA &amp; Button Clickers</span>
                  <div className="funnel_bar_bg">
                    <div className="funnel_bar_fill fill_50" style={{ width: "45%" }}>
                      {totalClicks} actions
                    </div>
                  </div>
                </div>
                <div className="funnel_stage">
                  <span className="funnel_label">4. Direct Inquiry Leads</span>
                  <div className="funnel_bar_bg">
                    <div className="funnel_bar_fill fill_lead" style={{ width: `${Math.max(Number(conversionRate) * 3, 18)}%` }}>
                      {totalLeadsCount} Leads ({conversionRate}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Platform Breakdown */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">Device Hardware Distribution</h3>
                  <p className="chart_sub">Platform profile used to view portfolio</p>
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

      {/* ================= TAB 2: LEADS CRM (FULL CRUD) ================= */}
      {activeTab === "leads" && (
        <div className="tab_content">
          <div className="table_controls_row">
            <input
              type="text"
              placeholder="Search leads by client name, email, subject, or location..."
              className="table_search_input"
              value={leadSearch}
              onChange={(e) => setLeadSearch(e.target.value)}
            />
            <div className="d-flex gap-2">
              <button onClick={() => setShowNewLeadModal(true)} className="action_btn btn_site_link">
                ➕ New Manual Lead
              </button>
              <button onClick={exportLeadsCsv} className="action_btn btn_export">
                📥 Export Leads CSV
              </button>
            </div>
          </div>

          <div className="data_table_wrapper">
            <table className="custom_data_table">
              <thead>
                <tr>
                  <th>Client / Contact</th>
                  <th>Inquiry Details</th>
                  <th>Location &amp; Source</th>
                  <th>Priority &amp; Status</th>
                  <th>Admin Notes</th>
                  <th>Actions</th>
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
                        <div>
                          <a href={`mailto:${lead.email}`} className="table_link small">
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
                        <span className="small text-muted">{new Date(lead.timestamp).toLocaleDateString()}</span>
                      </td>
                      <td>
                        <div className="location_text">
                          📍 {lead.city ? `${lead.city}, ` : ""}{lead.country || "India"}
                        </div>
                        <span className="source_pill">{lead.source}</span>
                      </td>
                      <td>
                        <div className="mb-2">
                          <span className={`priority_pill priority_${(lead.priority || "High").toLowerCase()}`}>
                            {lead.priority || "High"} Priority
                          </span>
                        </div>
                        <select
                          className={`status_select status_${lead.status.toLowerCase().replace(/\s+/g, "-")}`}
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In-Discussion">In-Discussion</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td>
                        <div className="notes_box">
                          {lead.adminNotes ? (
                            <span className="notes_text">{lead.adminNotes}</span>
                          ) : (
                            <span className="small text-muted">No notes yet</span>
                          )}
                        </div>
                        <button
                          className="btn_note_edit mt-1"
                          onClick={() => setEditingLead(lead)}
                        >
                          ✏️ Edit Notes
                        </button>
                      </td>
                      <td>
                        <div className="action_btns_group">
                          <a
                            href={`mailto:${lead.email}?subject=${encodeURIComponent(
                              `Re: ${lead.subject} - Karan Mishra (Aurxon)`
                            )}`}
                            className="btn_quick_action"
                            title="Reply Email"
                          >
                            ✉️
                          </a>
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn_quick_action btn_whatsapp"
                              title="Chat WhatsApp"
                            >
                              💬
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="btn_quick_action btn_delete"
                            title="Delete Lead"
                          >
                            🗑️
                          </button>
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

      {/* ================= TAB 3: BLOGS CMS (FULL CRUD) ================= */}
      {activeTab === "blogs" && (
        <div className="tab_content">
          <div className="table_controls_row">
            <div>
              <h3 className="section_title mb-1">Company Insights &amp; Technical Articles</h3>
              <p className="small text_muted mb-0">
                Manage, publish, and edit high-value technical articles for Aurxon (AIMS to FCOS, ALAMS, Neural ERP, etc.)
              </p>
            </div>
            <button
              onClick={() => {
                setEditingBlog({
                  title: "",
                  category: "Industrial AI & Robotics",
                  author: "Karan Mishra",
                  authorRole: "Founder & AI Engineer, Aurxon",
                  readTime: "7 min read",
                  summary: "",
                  content: "",
                  tags: ["Aurxon", "AI"],
                });
                setShowBlogModal(true);
              }}
              className="action_btn btn_site_link"
            >
              ✍️ Write New Technical Article
            </button>
          </div>

          <div className="blogs_admin_grid mt-4">
            {blogs.map((b) => (
              <div key={b.id} className="blog_admin_card">
                <div className="blog_admin_header">
                  <span className="badge badge-primary">{b.category}</span>
                  <span className="small text-muted">{b.publishedDate} &bull; {b.views} views</span>
                </div>
                <h4 className="blog_admin_title mt-2">{b.title}</h4>
                <p className="blog_admin_summary">{b.summary}</p>
                <div className="tags_wrap mb-3">
                  {b.tags.map((t, i) => (
                    <span key={i} className="single_tag_badge">#{t}</span>
                  ))}
                </div>
                <div className="blog_admin_actions">
                  <Link
                    href={`/single-blog?slug=${b.slug}`}
                    target="_blank"
                    className="action_btn btn_refresh btn-sm"
                  >
                    👁️ View Live
                  </Link>
                  <button
                    onClick={() => {
                      setEditingBlog(b);
                      setShowBlogModal(true);
                    }}
                    className="action_btn btn_site_link btn-sm"
                  >
                    ✏️ Edit Article
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(b.id, b.title)}
                    className="action_btn btn_danger btn-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: PROJECTS CMS (FULL CRUD) ================= */}
      {activeTab === "projects" && (
        <div className="tab_content">
          <div className="table_controls_row">
            <div>
              <h3 className="section_title mb-1">Portfolio Projects Showcase</h3>
              <p className="small text_muted mb-0">
                Manage all production and open-source project showcases displayed on the public portfolio.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingProject({
                  title: "",
                  category: "AI/ML",
                  description: "",
                  tags: ["Python", "AI"],
                  featured: true,
                  liveUrl: "",
                  githubUrl: "https://github.com/CodeSage4D",
                });
                setShowProjectModal(true);
              }}
              className="action_btn btn_site_link"
            >
              ➕ Add New Project
            </button>
          </div>

          <div className="projects_admin_grid mt-4">
            {projects.map((p) => (
              <div key={p.id} className="project_admin_card">
                <div className="project_admin_header">
                  <span className="badge badge-info">{p.category}</span>
                  {p.featured && <span className="badge badge-warning">Featured</span>}
                </div>
                <h4 className="project_admin_title mt-2">{p.title}</h4>
                <p className="project_admin_desc">{p.description}</p>
                <div className="tags_wrap mb-3">
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="single_tag_badge">#{t}</span>
                  ))}
                </div>
                <div className="project_admin_actions">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn_quick_action">
                      🔗 Live Demo
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn_quick_action">
                      🐙 GitHub
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setEditingProject(p);
                      setShowProjectModal(true);
                    }}
                    className="btn_quick_action"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(p.id, p.title)}
                    className="btn_quick_action btn_delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 5: FEEDBACKS / REVIEWS (FULL CRUD) ================= */}
      {activeTab === "feedbacks" && (
        <div className="tab_content">
          <div className="table_controls_row">
            <div>
              <h3 className="section_title mb-1">Peer &amp; Client Feedback Endorsements</h3>
              <p className="small text_muted mb-0">
                Review and approve client feedback, star ratings, and testimonials to feature on the homepage.
              </p>
            </div>
          </div>

          <div className="feedbacks_admin_grid mt-4">
            {feedbacks.map((f) => (
              <div key={f.id} className="feedback_admin_card">
                <div className="feedback_admin_header d-flex justify-content-between align-items-center mb-2">
                  <div className="stars_row">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < f.rating ? "star_active" : "star_inactive"}>★</span>
                    ))}
                    <span className="small text-muted ml-2">{f.rating}.0</span>
                  </div>
                  <span className={`badge ${f.status === "Approved" ? "badge-success" : "badge-secondary"}`}>
                    {f.status}
                  </span>
                </div>
                <p className="feedback_admin_quote">&ldquo;{f.message}&rdquo;</p>
                <div className="author_meta border-top pt-2 mt-auto">
                  <strong className="text-white d-block">{f.name}</strong>
                  <span className="small text-muted">{f.role} {f.company ? `• ${f.company}` : ""}</span>
                  <div className="small text-muted">{f.email} &bull; {new Date(f.submittedAt).toLocaleDateString()}</div>
                </div>
                <div className="feedback_admin_actions mt-3 pt-2 border-top d-flex gap-2">
                  <button
                    onClick={() => handleToggleFeedbackStatus(f.id, f.status)}
                    className={`action_btn btn-sm ${f.status === "Approved" ? "btn-warning" : "btn-success"}`}
                  >
                    {f.status === "Approved" ? "Unapprove / Hide" : "Approve &amp; Feature"}
                  </button>
                  <button
                    onClick={() => handleDeleteFeedback(f.id)}
                    className="action_btn btn_danger btn-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 6: VISITOR TELEMETRY ================= */}
      {activeTab === "visitors" && (
        <div className="tab_content">
          <div className="table_controls_row">
            <span className="table_info_note">
              Capturing visitor IP address, country flags, location, referrer source, screen resolution, and visited sections.
            </span>
            <button onClick={() => { if (confirm("Clear all logs?")) { clearAnalyticsLogs(); refreshAllData(); } }} className="action_btn btn_danger">
              🗑️ Clear All Logs
            </button>
          </div>

          <div className="data_table_wrapper">
            <table className="custom_data_table">
              <thead>
                <tr>
                  <th>Visitor IP &amp; Network</th>
                  <th>Location &amp; Country</th>
                  <th>Where Link Opened</th>
                  <th>Device / Resolution</th>
                  <th>Sections Visited</th>
                  <th>Clicks</th>
                  <th>Time &amp; Timezone</th>
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
                        <span className="mr-1">{v.flagEmoji || "🌐"}</span>
                        {v.city || "Indore"}, {v.country || "India"}
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
                      {v.screenResolution && (
                        <div className="small text-muted">{v.screenResolution}</div>
                      )}
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
                      <span className="small text_muted">{v.timezone}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 7: CLICK STREAM ================= */}
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

      {/* ================= MODAL: EDIT / CREATE BLOG ================= */}
      {showBlogModal && editingBlog && (
        <div className="modal_overlay" onClick={() => setShowBlogModal(false)}>
          <div className="modal_content_card" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="text-white mb-0">{editingBlog.id ? "Edit Technical Article" : "Create Technical Article"}</h3>
              <button className="modal_close_btn" onClick={() => setShowBlogModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSaveBlog}>
              <div className="form-group mb-3">
                <label className="field_label">Article Title *</label>
                <input
                  type="text"
                  className="login_input"
                  placeholder="e.g. From AIMS to FCOS: The Architecture..."
                  value={editingBlog.title || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="field_label">Category</label>
                  <input
                    type="text"
                    className="login_input"
                    placeholder="e.g. Industrial AI & Robotics"
                    value={editingBlog.category || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="field_label">Read Time</label>
                  <input
                    type="text"
                    className="login_input"
                    placeholder="e.g. 7 min read"
                    value={editingBlog.readTime || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="field_label">Short Summary</label>
                <textarea
                  rows={2}
                  className="login_input"
                  placeholder="Brief synopsis for card preview..."
                  value={editingBlog.summary || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                ></textarea>
              </div>

              <div className="form-group mb-3">
                <label className="field_label">Full Article Markdown / Text Content *</label>
                <textarea
                  rows={8}
                  className="login_input"
                  placeholder="### Section Heading&#10;&#10;Detailed technical narrative..."
                  value={editingBlog.content || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-group mb-4">
                <label className="field_label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="login_input"
                  placeholder="AIMS, FCOS, Edge AI, Industrial"
                  value={Array.isArray(editingBlog.tags) ? editingBlog.tags.join(", ") : editingBlog.tags || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, tags: e.target.value as any })}
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="action_btn btn_refresh mr-2" onClick={() => setShowBlogModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="action_btn btn_site_link">
                  💾 Save &amp; Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / CREATE PROJECT ================= */}
      {showProjectModal && editingProject && (
        <div className="modal_overlay" onClick={() => setShowProjectModal(false)}>
          <div className="modal_content_card" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="text-white mb-0">{editingProject.id ? "Edit Portfolio Project" : "Add New Project"}</h3>
              <button className="modal_close_btn" onClick={() => setShowProjectModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSaveProject}>
              <div className="form-group mb-3">
                <label className="field_label">Project Title *</label>
                <input
                  type="text"
                  className="login_input"
                  placeholder="e.g. Cognivex AI / Aurxon ERP"
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="field_label">Category</label>
                  <select
                    className="login_input"
                    value={editingProject.category || "AI/ML"}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  >
                    <option value="AI/ML">AI / Machine Learning</option>
                    <option value="Enterprise">Enterprise SaaS &amp; ERP</option>
                    <option value="Full-Stack">Full-Stack Web</option>
                    <option value="Mobile">Mobile Application</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="field_label">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    className="login_input"
                    placeholder="Python, PyTorch, Next.js, FastAPI"
                    value={Array.isArray(editingProject.tags) ? editingProject.tags.join(", ") : editingProject.tags || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value as any })}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="field_label">Project Description *</label>
                <textarea
                  rows={3}
                  className="login_input"
                  placeholder="High level overview of architectural features and technical achievements..."
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="field_label">Live Deployment URL</label>
                  <input
                    type="url"
                    className="login_input"
                    placeholder="https://..."
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="field_label">GitHub Repository URL</label>
                  <input
                    type="url"
                    className="login_input"
                    placeholder="https://github.com/CodeSage4D/..."
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="action_btn btn_refresh mr-2" onClick={() => setShowProjectModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="action_btn btn_site_link">
                  💾 Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT LEAD NOTES ================= */}
      {editingLead && (
        <div className="modal_overlay" onClick={() => setEditingLead(null)}>
          <div className="modal_content_card" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="text-white mb-0">Lead CRM Notes &bull; {editingLead.name}</h3>
              <button className="modal_close_btn" onClick={() => setEditingLead(null)}>&times;</button>
            </div>

            <div className="mb-3">
              <label className="field_label">Priority Level</label>
              <select
                className="login_input"
                defaultValue={editingLead.priority || "High"}
                id="edit_lead_priority"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="field_label">Private Administrative Notes</label>
              <textarea
                rows={4}
                className="login_input"
                defaultValue={editingLead.adminNotes || ""}
                id="edit_lead_notes"
                placeholder="Record consultation notes, proposal timeline, budget discussion, or next steps..."
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="action_btn btn_refresh mr-2" onClick={() => setEditingLead(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="action_btn btn_site_link"
                onClick={() => {
                  const p = (document.getElementById("edit_lead_priority") as HTMLSelectElement).value as any;
                  const n = (document.getElementById("edit_lead_notes") as HTMLTextAreaElement).value;
                  handleSaveLeadNotes(editingLead.id, n, p);
                }}
              >
                💾 Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: NEW MANUAL LEAD ================= */}
      {showNewLeadModal && (
        <div className="modal_overlay" onClick={() => setShowNewLeadModal(false)}>
          <div className="modal_content_card" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="text-white mb-0">Add New Client Inquiry / Lead</h3>
              <button className="modal_close_btn" onClick={() => setShowNewLeadModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleCreateManualLead}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="field_label">Client Name *</label>
                  <input
                    type="text"
                    className="login_input"
                    placeholder="e.g. Vikram Malhotra"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="field_label">Client Email *</label>
                  <input
                    type="email"
                    className="login_input"
                    placeholder="e.g. vikram@company.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="field_label">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    className="login_input"
                    placeholder="+91..."
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="field_label">Project Inquiry Subject</label>
                  <input
                    type="text"
                    className="login_input"
                    placeholder="e.g. Enterprise AI Consulting"
                    value={newLeadForm.subject}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="field_label">Inquiry Message / Opportunity Notes</label>
                <textarea
                  rows={3}
                  className="login_input"
                  placeholder="Details of client requirements or conversation notes..."
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="action_btn btn_refresh mr-2" onClick={() => setShowNewLeadModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="action_btn btn_site_link">
                  💾 Record Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scoped CSS Styles for 10X Admin Dashboard */}
      <style dangerouslySetInnerHTML={{ __html: `
        .admin_dash_wrapper {
          min-height: 100vh;
          background: #090a15;
          color: #f1f5f9;
          padding: 28px 36px;
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
          padding: 18px 26px;
          margin-bottom: 22px;
          flex-wrap: wrap;
          gap: 16px;
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
          font-size: 1.35rem;
          font-weight: 800;
          margin: 0;
          color: #ffffff;
        }
        .header_sub {
          font-size: 0.82rem;
          color: #94a3b8;
          margin: 2px 0 0 0;
        }
        .header_actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .action_btn {
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 0.84rem;
          font-weight: 600;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none !important;
          display: inline-flex;
          align-items: center;
        }
        .btn_site_link {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: #ffffff;
        }
        .btn_site_link:hover {
          transform: translateY(-2px);
          color: #ffffff;
        }
        .btn_export {
          background: #0284c7;
          color: #ffffff;
        }
        .btn_refresh {
          background: #334155;
          color: #f8fafc;
        }
        .btn_logout {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.3);
        }
        .btn_danger {
          background: rgba(239, 68, 68, 0.25);
          color: #fca5a5;
        }
        .kpi_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 26px;
        }
        .kpi_card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
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
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
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
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
        }
        .kpi_value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
        }
        .kpi_sub {
          font-size: 0.74rem;
          color: #64748b;
        }
        .dashboard_nav_tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 22px;
          overflow-x: auto;
        }
        .tab_btn {
          padding: 10px 18px;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .tab_btn:hover {
          color: #ffffff;
        }
        .active_tab {
          color: #818cf8 !important;
          border-bottom: 2px solid #818cf8;
        }
        .analytics_charts_row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
          gap: 20px;
        }
        .chart_card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
        }
        .chart_header {
          margin-bottom: 18px;
        }
        .chart_title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .chart_sub {
          font-size: 0.78rem;
          color: #94a3b8;
          margin: 2px 0 0 0;
        }
        .bar_chart_container {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: 180px;
          padding-top: 16px;
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
          max-width: 36px;
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
          font-size: 0.7rem;
          color: #64748b;
          margin-top: 6px;
          text-align: center;
        }
        .bar_tooltip {
          font-size: 0.68rem;
          color: #cbd5e1;
          margin-bottom: 4px;
        }
        .sources_list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .source_item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .source_info {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
        }
        .source_progress_bg {
          width: 100%;
          height: 7px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }
        .source_progress_fill {
          height: 100%;
          border-radius: 4px;
        }
        .funnel_container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .funnel_stage {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .funnel_label {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 600;
        }
        .funnel_bar_bg {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          overflow: hidden;
        }
        .funnel_bar_fill {
          padding: 6px 12px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #ffffff;
          border-radius: 6px;
        }
        .fill_100 { background: #4f46e5; }
        .fill_80 { background: #3b82f6; }
        .fill_50 { background: #06b6d4; }
        .fill_lead { background: #10b981; }
        .device_split_grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .device_card {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .device_icon {
          font-size: 1.6rem;
          margin-bottom: 6px;
        }
        .device_name {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 600;
        }
        .device_count {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin: 2px 0;
        }
        .device_pct {
          font-size: 0.72rem;
          color: #38bdf8;
        }
        .table_controls_row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .table_search_input {
          flex: 1;
          max-width: 440px;
          padding: 9px 14px;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 10px;
          color: #ffffff;
          font-size: 0.88rem;
          outline: none;
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
          font-size: 0.84rem;
        }
        .custom_data_table th {
          background: rgba(30, 41, 59, 0.7);
          padding: 12px 16px;
          text-align: left;
          font-size: 0.74rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .custom_data_table td {
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
          vertical-align: middle;
        }
        .custom_data_table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }
        .lead_name {
          color: #ffffff;
          font-size: 0.92rem;
        }
        .table_link {
          color: #818cf8;
          text-decoration: none;
        }
        .subject_badge {
          display: inline-block;
          font-size: 0.74rem;
          font-weight: 600;
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          padding: 2px 7px;
          border-radius: 6px;
          margin-bottom: 4px;
        }
        .lead_message_preview {
          font-size: 0.78rem;
          color: #94a3b8;
          max-width: 280px;
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
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 7px;
          border-radius: 50px;
          margin-top: 3px;
          color: #cbd5e1;
        }
        .priority_pill {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .priority_high { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
        .priority_medium { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
        .priority_low { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
        .status_select {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          border: 1px solid transparent;
          cursor: pointer;
        }
        .status_new { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3); }
        .status_contacted { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border-color: rgba(59, 130, 246, 0.3); }
        .status_in-discussion { background: rgba(168, 85, 247, 0.15); color: #c084fc; border-color: rgba(168, 85, 247, 0.3); }
        .status_proposal-sent { background: rgba(6, 182, 212, 0.15); color: #22d3ee; border-color: rgba(6, 182, 212, 0.3); }
        .status_converted { background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.3); }
        .status_closed { background: rgba(100, 116, 139, 0.2); color: #94a3b8; }
        .notes_box {
          max-width: 220px;
          font-size: 0.78rem;
          color: #cbd5e1;
        }
        .btn_note_edit {
          background: transparent;
          border: none;
          color: #818cf8;
          font-size: 0.72rem;
          cursor: pointer;
          padding: 0;
        }
        .btn_note_edit:hover { text-decoration: underline; }
        .action_btns_group {
          display: flex;
          gap: 5px;
        }
        .btn_quick_action {
          padding: 5px 10px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          font-size: 0.74rem;
          color: #f1f5f9;
          text-decoration: none !important;
          cursor: pointer;
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
        .btn_delete {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.3);
        }
        .btn_delete:hover {
          background: #ef4444 !important;
          color: #ffffff !important;
        }
        .ip_code {
          background: #1e293b;
          padding: 3px 6px;
          border-radius: 6px;
          color: #38bdf8;
          font-family: monospace;
          cursor: pointer;
        }
        .org_text {
          font-size: 0.7rem;
          color: #64748b;
          margin-top: 2px;
        }
        .device_info_pill {
          font-size: 0.8rem;
          font-weight: 600;
        }
        .views_tags_list {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          max-width: 200px;
        }
        .view_tag {
          font-size: 0.68rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2px 5px;
          border-radius: 4px;
          color: #cbd5e1;
        }
        .click_badge {
          font-size: 0.74rem;
          background: rgba(16, 185, 129, 0.12);
          color: #34d399;
          padding: 2px 7px;
          border-radius: 50px;
          font-weight: 600;
        }
        .timestamp_text {
          font-size: 0.74rem;
          color: #94a3b8;
        }
        .empty_table_cell {
          text-align: center;
          padding: 36px;
          color: #64748b;
        }

        /* Blogs CMS Grid */
        .blogs_admin_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 18px;
        }
        .blog_admin_card {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .blog_admin_title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.35;
        }
        .blog_admin_summary {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .blog_admin_actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Projects CMS Grid */
        .projects_admin_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 18px;
        }
        .project_admin_card {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .project_admin_title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
        }
        .project_admin_desc {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 12px;
        }
        .project_admin_actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Feedbacks CMS Grid */
        .feedbacks_admin_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 18px;
        }
        .feedback_admin_card {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .feedback_admin_quote {
          font-size: 0.88rem;
          font-style: italic;
          color: #cbd5e1;
          line-height: 1.55;
          margin-bottom: 14px;
        }
        .star_active { color: #f59e0b; }
        .star_inactive { color: #475569; }

        /* Modals */
        .modal_overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }
        .modal_content_card {
          width: 100%;
          max-width: 650px;
          background: #0f172a;
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal_close_btn {
          background: transparent;
          border: none;
          font-size: 1.8rem;
          color: #94a3b8;
          cursor: pointer;
        }
      `}} />
    </div>
  );
}
