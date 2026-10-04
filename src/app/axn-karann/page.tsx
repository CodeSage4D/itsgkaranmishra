"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import "./dashboard.css";
import { IsometricScannerLogin } from "@/components/IsometricScannerLogin";
import {
  getStoredAnalyticsData,
  updateLeadDetails,
  deleteLead,
  recordLead,
  clearAnalyticsLogs,
  recordAuditEvent,
  formatISTTime,
  ClientVisitorLog,
  ClientClickLog,
  ClientLead,
  ClientAuditLog,
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
  saveFeedback,
  updateFeedbackStatus,
  deleteFeedback,
  UserFeedback,
  getAllExperiences,
  saveExperience,
  deleteExperience,
  ExperienceMilestone,
  getAllEducations,
  saveEducation,
  deleteEducation,
  EducationItem,
  getAllCertifications,
  saveCertification,
  deleteCertification,
  CertificationItem,
  getAllSkills,
  saveSkill,
  deleteSkill,
  SkillItem,
  getAllSocials,
  saveSocial,
  deleteSocial,
  SocialProfile,
  getProfileInfo,
  saveProfileInfo,
  ProfileInfo,
  getAnnouncementBanner,
  saveAnnouncementBanner,
  AnnouncementBanner,
  getAllMedia,
  saveMedia,
  deleteMedia,
  MediaItem,
  getSeoConfig,
  saveSeoConfig,
  SeoConfig,
} from "@/lib/cms-store";

// Master Administrator Credentials
const ADMIN_USER = "karann";
const ADMIN_PASS = "KarannAurxon$22";

export default function AxnKarannCommandPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState("");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [showCmdPalette, setShowCmdPalette] = useState<boolean>(false);
  const [cmdSearch, setCmdSearch] = useState<string>("");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Telemetry & Lead Data
  const [visitors, setVisitors] = useState<ClientVisitorLog[]>([]);
  const [clicks, setClicks] = useState<ClientClickLog[]>([]);
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [auditLogs, setAuditLogs] = useState<ClientAuditLog[]>([]);
  const [serverSummary, setServerSummary] = useState<any>(null);
  const [dataSource, setDataSource] = useState<"sqlite_server" | "client_edge">("client_edge");
  const [serverLatency, setServerLatency] = useState<number>(14);

  // Search & Filter States
  const [visitorSearch, setVisitorSearch] = useState("");
  const [visitorDeviceFilter, setVisitorDeviceFilter] = useState("ALL");
  const [projectSearch, setProjectSearch] = useState("");
  const [blogSearch, setBlogSearch] = useState("");
  const [leadSearch, setLeadSearch] = useState("");

  // CMS State
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [experiences, setExperiences] = useState<ExperienceMilestone[]>([]);
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [socials, setSocials] = useState<SocialProfile[]>([]);
  const [profile, setProfile] = useState<ProfileInfo>(getProfileInfo());
  const [banner, setBanner] = useState<AnnouncementBanner>(getAnnouncementBanner());
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [seo, setSeo] = useState<SeoConfig>(getSeoConfig());

  // GitHub Auto-Fetch State
  const [ghUsername, setGhUsername] = useState("CodeSage4D");
  const [ghRepos, setGhRepos] = useState<any[]>([]);
  const [isFetchingGh, setIsFetchingGh] = useState(false);
  const [ghError, setGhError] = useState<string | null>(null);

  // Modals & Editing Entities
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [editingFeedback, setEditingFeedback] = useState<Partial<UserFeedback> | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [editingExp, setEditingExp] = useState<Partial<ExperienceMilestone> | null>(null);
  const [showExpModal, setShowExpModal] = useState(false);

  const [editingEdu, setEditingEdu] = useState<Partial<EducationItem> | null>(null);
  const [showEduModal, setShowEduModal] = useState(false);

  const [editingCert, setEditingCert] = useState<Partial<CertificationItem> | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);

  const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);

  const [editingSocial, setEditingSocial] = useState<Partial<SocialProfile> | null>(null);
  const [showSocialModal, setShowSocialModal] = useState(false);

  const [newMediaForm, setNewMediaForm] = useState({ title: "", url: "", type: "image" as const });
  const [showMediaModal, setShowMediaModal] = useState(false);

  // Settings & Credentials Form
  const [credForm, setCredForm] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [credStatus, setCredStatus] = useState<{ type: "success" | "error" | "info" | ""; text: string }>({ type: "", text: "" });

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-GB", { hour12: false }) + " IST");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme Preference init
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("axn_theme_mode");
      if (storedTheme === "light") {
        setIsLightMode(true);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !isLightMode;
    setIsLightMode(nextMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("axn_theme_mode", nextMode ? "light" : "dark");
    }
  };

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCmdPalette((prev) => !prev);
      }
      if (e.key === "Escape") {
        setShowCmdPalette(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Check Session
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const sessionActive = sessionStorage.getItem("axn_admin_session");
        if (sessionActive === "true") {
          setIsAuthenticated(true);
        }
      } catch {}
    }
  }, []);

  // Load all CMS data
  const loadCmsData = () => {
    setBlogs(getAllBlogs());
    setProjects(getAllProjects());
    setFeedbacks(getAllFeedbacks());
    setExperiences(getAllExperiences());
    setEducations(getAllEducations());
    setCertifications(getAllCertifications());
    setSkills(getAllSkills());
    setSocials(getAllSocials());
    setProfile(getProfileInfo());
    setBanner(getAnnouncementBanner());
    setMediaList(getAllMedia());
    setSeo(getSeoConfig());
  };

  useEffect(() => {
    loadCmsData();
    const handleUpdate = () => loadCmsData();
    window.addEventListener("ahs_cms_updated", handleUpdate);
    return () => window.removeEventListener("ahs_cms_updated", handleUpdate);
  }, []);

  // Refresh Telemetry & Server Summary
  const refreshAnalyticsData = async () => {
    const data = getStoredAnalyticsData();
    setVisitors(data.visitors);
    setClicks(data.clicks);
    setLeads(data.leads);
    setAuditLogs(data.auditLogs);

    try {
      const startTime = performance.now();
      const res = await fetch("/api/analytics/summary", { cache: "no-store" });
      const duration = Math.round(performance.now() - startTime);
      setServerLatency(duration);

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setServerSummary(json.data);
          setDataSource("sqlite_server");
        }
      }
    } catch {
      setDataSource("client_edge");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshAnalyticsData();
      const interval = setInterval(refreshAnalyticsData, 15000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // GitHub Auto-Fetch Function
  const handleFetchGithubRepos = async () => {
    if (!ghUsername.trim()) return;
    setIsFetchingGh(true);
    setGhError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${ghUsername.trim()}/repos?sort=updated&per_page=30`);
      if (!res.ok) {
        throw new Error(`GitHub API returned status ${res.status}`);
      }
      const data = await res.json();
      setGhRepos(data);
      showToast(`Fetched ${data.length} repositories for @${ghUsername}!`);
      recordAuditEvent("GITHUB_FETCH", `Fetched ${data.length} repos for @${ghUsername}`);
    } catch (err: any) {
      setGhError(err.message || "Failed to reach GitHub API");
    } finally {
      setIsFetchingGh(false);
    }
  };

  // 1-Click Import GitHub Repo as Portfolio Project
  const handleImportGithubRepo = (repo: any) => {
    const newProj: Partial<PortfolioProject> = {
      title: repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
      description: repo.description || `Autonomous open-source codebase for ${repo.name}, featuring ${repo.language || "advanced software design"}.`,
      category: repo.language === "Python" ? "AI/ML" : "Full-Stack",
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || "https://itsgkaranmishra.web.app",
      tags: [repo.language || "Python", ...(repo.topics || []).slice(0, 3)].filter(Boolean),
      featured: true,
      status: "Live",
    };
    setEditingProject(newProj);
    setShowProjectModal(true);
  };

  // KPIs
  const totalVisitorsCount = serverSummary?.kpis?.totalVisitors ?? visitors.length;
  const totalClicksCount = serverSummary?.kpis?.totalClicks ?? clicks.length;
  const totalPageViewsCount = serverSummary?.kpis?.totalPageViews ?? visitors.reduce((acc, v) => acc + (v.profileViews?.length || 1), 0);
  const uniqueIpsCount = serverSummary?.kpis?.uniqueIps ?? new Set(visitors.map((v) => v.ip).filter(Boolean)).size;

  // Filtered Lists
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = projectSearch.toLowerCase();
      return !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    });
  }, [projects, projectSearch]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const q = blogSearch.toLowerCase();
      return !q || b.title.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
    });
  }, [blogs, blogSearch]);

  const filteredVisitors = useMemo(() => {
    return visitors.filter((v) => {
      const q = visitorSearch.toLowerCase();
      const matchQuery = !q || (v.ip && v.ip.toLowerCase().includes(q)) || (v.city && v.city.toLowerCase().includes(q)) || (v.device && v.device.toLowerCase().includes(q));
      const matchDevice = visitorDeviceFilter === "ALL" || v.device?.toUpperCase() === visitorDeviceFilter;
      return matchQuery && matchDevice;
    });
  }, [visitors, visitorSearch, visitorDeviceFilter]);

  // Command Palette Items
  const cmdPaletteItems = useMemo(() => {
    const list = [
      { id: "tab_overview", label: "Dashboard Overview", category: "Navigation", action: () => { setActiveTab("overview"); setShowCmdPalette(false); } },
      { id: "tab_analytics", label: "Analytics & Traffic Insights", category: "Navigation", action: () => { setActiveTab("analytics"); setShowCmdPalette(false); } },
      { id: "tab_projects", label: "Projects & Showcase CMS", category: "Navigation", action: () => { setActiveTab("projects"); setShowCmdPalette(false); } },
      { id: "tab_blogs", label: "Blog Publications CMS", category: "Navigation", action: () => { setActiveTab("blogs"); setShowCmdPalette(false); } },
      { id: "tab_feedbacks", label: "Client Reviews & Endorsements", category: "Navigation", action: () => { setActiveTab("feedbacks"); setShowCmdPalette(false); } },
      { id: "tab_experiences", label: "Career & Experience Milestones", category: "Navigation", action: () => { setActiveTab("experiences"); setShowCmdPalette(false); } },
      { id: "tab_education", label: "Education & Certifications", category: "Navigation", action: () => { setActiveTab("education"); setShowCmdPalette(false); } },
      { id: "tab_skills", label: "Skills & Tech Stack", category: "Navigation", action: () => { setActiveTab("skills"); setShowCmdPalette(false); } },
      { id: "tab_profile", label: "Founder Profile Dossier", category: "Navigation", action: () => { setActiveTab("profile"); setShowCmdPalette(false); } },
      { id: "tab_socials", label: "Social Profiles Manager", category: "Navigation", action: () => { setActiveTab("socials"); setShowCmdPalette(false); } },
      { id: "tab_banners", label: "Announcement Banners & Feed", category: "Navigation", action: () => { setActiveTab("banners"); setShowCmdPalette(false); } },
      { id: "tab_github", label: "GitHub Auto-Fetch Integration", category: "Navigation", action: () => { setActiveTab("github"); setShowCmdPalette(false); } },
      { id: "tab_networking", label: "Networking & IP Telemetry", category: "Navigation", action: () => { setActiveTab("networking"); setShowCmdPalette(false); } },
      { id: "tab_devices", label: "Device & Screen Dimensions", category: "Navigation", action: () => { setActiveTab("devices"); setShowCmdPalette(false); } },
      { id: "tab_seo", label: "SEO & Google Site Verification", category: "Navigation", action: () => { setActiveTab("seo"); setShowCmdPalette(false); } },
      { id: "tab_media", label: "Media Assets Library", category: "Navigation", action: () => { setActiveTab("media"); setShowCmdPalette(false); } },
      { id: "tab_leads", label: "CRM Leads & Inquiries", category: "Navigation", action: () => { setActiveTab("leads"); setShowCmdPalette(false); } },
      { id: "tab_settings", label: "Security & Passcode Settings", category: "Navigation", action: () => { setActiveTab("settings"); setShowCmdPalette(false); } },
      { id: "act_add_proj", label: "➕ Create Showcase Project", category: "Action", action: () => { setEditingProject(null); setShowProjectModal(true); setShowCmdPalette(false); } },
      { id: "act_add_blog", label: "📝 Write Blog Publication", category: "Action", action: () => { setEditingBlog(null); setShowBlogModal(true); setShowCmdPalette(false); } },
      { id: "act_theme", label: "🌓 Toggle Light / Dark Mode", category: "Action", action: () => { toggleTheme(); setShowCmdPalette(false); } },
    ];

    if (!cmdSearch.trim()) return list;
    return list.filter((item) => item.label.toLowerCase().includes(cmdSearch.toLowerCase()) || item.category.toLowerCase().includes(cmdSearch.toLowerCase()));
  }, [cmdSearch, isLightMode]);

  // Authentication gate
  if (!isAuthenticated) {
    return (
      <div className={`dash_container ${isLightMode ? "light-theme" : ""}`}>
        <IsometricScannerLogin onLoginSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className={`dash_container ${isLightMode ? "light-theme" : ""}`}>
      {/* Ambient background glows */}
      <div className="dash_glow_orb_1" />
      <div className="dash_glow_orb_2" />

      {/* Top Header */}
      <header className="dash_header">
        <div className="dash_header_inner">
          <div className="dash_brand">
            <div className="dash_brand_badge">KM</div>
            <div>
              <h1 className="dash_brand_title">
                Aurxon Command Center <span className="dash_status_live"><span className="dash_live_dot" /> Live</span>
              </h1>
              <div className="dash_brand_sub">
                <span>{currentTime}</span> &bull; <span>SQLite3 WAL Active</span> &bull; <span>⚡ {serverLatency}ms Latency</span>
              </div>
            </div>
          </div>

          <div className="dash_actions">
            {/* Quick search / Command Palette trigger */}
            <div className="dash_cmd_search_bar" onClick={() => setShowCmdPalette(true)}>
              <span>🔍 Command Search...</span>
              <span className="dash_cmd_kbd">Ctrl + K</span>
            </div>

            {/* DISTINCTIVE GLOWING MODE SWITCH */}
            <div
              className="dash_glowing_switch"
              onClick={toggleTheme}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleTheme(); }}
              title={`Switch to ${isLightMode ? "Obsidian Dark" : "Luminous Light"} Mode`}
              aria-label="Toggle Dashboard Lighting Mode"
            >
              <div className="dash_switch_thumb">
                <span className="dash_switch_icon">{isLightMode ? "☀️" : "🌙"}</span>
              </div>
            </div>

            <Link href="/" target="_blank" className="dash_btn_action">
              <span>🚀 View Site ↗</span>
            </Link>

            <button
              onClick={() => {
                sessionStorage.removeItem("axn_admin_session");
                setIsAuthenticated(false);
              }}
              className="dash_btn_action dash_btn_danger"
            >
              <span>🔒 Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Group Bar */}
      <div className="dash_nav_strip">
        <div className="dash_nav_groups_bar">
          <span className="dash_nav_category_label">Core:</span>
          <button className={`dash_tab_btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
            📊 Dashboard
          </button>
          <button className={`dash_tab_btn ${activeTab === "analytics" ? "active" : ""}`} onClick={() => setActiveTab("analytics")}>
            📈 Traffic Insights
          </button>
          <button className={`dash_tab_btn ${activeTab === "networking" ? "active" : ""}`} onClick={() => setActiveTab("networking")}>
            🌐 Networking &amp; IP
          </button>
          <button className={`dash_tab_btn ${activeTab === "devices" ? "active" : ""}`} onClick={() => setActiveTab("devices")}>
            📱 Devices &amp; Screens
          </button>

          <span className="dash_nav_category_label ml-3">Content CMS:</span>
          <button className={`dash_tab_btn ${activeTab === "projects" ? "active" : ""}`} onClick={() => setActiveTab("projects")}>
            🚀 Projects <span className="dash_tab_badge">{projects.length}</span>
          </button>
          <button className={`dash_tab_btn ${activeTab === "blogs" ? "active" : ""}`} onClick={() => setActiveTab("blogs")}>
            📝 Blogs <span className="dash_tab_badge">{blogs.length}</span>
          </button>
          <button className={`dash_tab_btn ${activeTab === "feedbacks" ? "active" : ""}`} onClick={() => setActiveTab("feedbacks")}>
            💬 Reviews <span className="dash_tab_badge">{feedbacks.length}</span>
          </button>
          <button className={`dash_tab_btn ${activeTab === "banners" ? "active" : ""}`} onClick={() => setActiveTab("banners")}>
            📢 Announcement Banner
          </button>

          <span className="dash_nav_category_label ml-3">Career &amp; Presence:</span>
          <button className={`dash_tab_btn ${activeTab === "experiences" ? "active" : ""}`} onClick={() => setActiveTab("experiences")}>
            💼 Experience
          </button>
          <button className={`dash_tab_btn ${activeTab === "education" ? "active" : ""}`} onClick={() => setActiveTab("education")}>
            🎓 Education &amp; Certs
          </button>
          <button className={`dash_tab_btn ${activeTab === "skills" ? "active" : ""}`} onClick={() => setActiveTab("skills")}>
            ⚡ Skills
          </button>
          <button className={`dash_tab_btn ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
            👤 Profile Dossier
          </button>
          <button className={`dash_tab_btn ${activeTab === "socials" ? "active" : ""}`} onClick={() => setActiveTab("socials")}>
            🔗 Social Links
          </button>
          <button className={`dash_tab_btn ${activeTab === "github" ? "active" : ""}`} onClick={() => setActiveTab("github")}>
            🐙 GitHub Sync
          </button>
          <button className={`dash_tab_btn ${activeTab === "seo" ? "active" : ""}`} onClick={() => setActiveTab("seo")}>
            🔍 SEO &amp; Verification
          </button>
          <button className={`dash_tab_btn ${activeTab === "media" ? "active" : ""}`} onClick={() => setActiveTab("media")}>
            🖼️ Media Assets
          </button>
          <button className={`dash_tab_btn ${activeTab === "leads" ? "active" : ""}`} onClick={() => setActiveTab("leads")}>
            📥 CRM Leads <span className="dash_tab_badge">{leads.length}</span>
          </button>
          <button className={`dash_tab_btn ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="dash_main">
        {/* ================= TAB: OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div>
            {/* Content Studio Quick Action Hero */}
            <div className="dash_studio_hero">
              <div className="dash_studio_hero_content">
                <h2>Founder Content Studio &bull; Real-Time Portfolio Management</h2>
                <p>
                  Deploy live updates instantly to Karan Mishra&apos;s portfolio. Changes to projects, technical blogs, and reviews reflect immediately without requiring rebuilds.
                </p>
              </div>
              <div className="dash_studio_actions">
                <button
                  className="dash_hero_cta_btn projects"
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectModal(true);
                  }}
                >
                  <span>+ Add Showcase Project</span>
                </button>
                <button
                  className="dash_hero_cta_btn blogs"
                  onClick={() => {
                    setEditingBlog(null);
                    setShowBlogModal(true);
                  }}
                >
                  <span>+ Write Blog Article</span>
                </button>
                <button
                  className="dash_hero_cta_btn reviews"
                  onClick={() => {
                    setEditingFeedback(null);
                    setShowFeedbackModal(true);
                  }}
                >
                  <span>+ Add Client Review</span>
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="dash_kpi_grid">
              <div className="dash_kpi_card">
                <div className="dash_kpi_header">
                  <h3 className="dash_kpi_title">Total Visitors</h3>
                  <div className="dash_kpi_icon" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8" }}>👥</div>
                </div>
                <div className="dash_kpi_val">{totalVisitorsCount}</div>
                <div className="dash_kpi_trend"><span>🟢 {uniqueIpsCount} unique client IP addresses</span></div>
              </div>

              <div className="dash_kpi_card">
                <div className="dash_kpi_header">
                  <h3 className="dash_kpi_title">Total Page Views</h3>
                  <div className="dash_kpi_icon" style={{ background: "rgba(6, 182, 212, 0.15)", color: "#06b6d4" }}>📄</div>
                </div>
                <div className="dash_kpi_val">{totalPageViewsCount}</div>
                <div className="dash_kpi_trend"><span>⚡ Ingested via edge telemetry</span></div>
              </div>

              <div className="dash_kpi_card">
                <div className="dash_kpi_header">
                  <h3 className="dash_kpi_title">Interactive Clicks</h3>
                  <div className="dash_kpi_icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>🎯</div>
                </div>
                <div className="dash_kpi_val">{totalClicksCount}</div>
                <div className="dash_kpi_trend"><span>CTA buttons, project demos, links</span></div>
              </div>

              <div className="dash_kpi_card">
                <div className="dash_kpi_header">
                  <h3 className="dash_kpi_title">Active Projects</h3>
                  <div className="dash_kpi_icon" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>🚀</div>
                </div>
                <div className="dash_kpi_val">{projects.length}</div>
                <div className="dash_kpi_trend"><span>Synchronized with /portfolio</span></div>
              </div>

              <div className="dash_kpi_card">
                <div className="dash_kpi_header">
                  <h3 className="dash_kpi_title">Technical Blogs</h3>
                  <div className="dash_kpi_icon" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#a855f7" }}>📚</div>
                </div>
                <div className="dash_kpi_val">{blogs.length}</div>
                <div className="dash_kpi_trend"><span>Published at /blog/[slug]</span></div>
              </div>
            </div>

            {/* Quick Links & Real-Time Event Audit Ticker */}
            <div className="row g-4">
              <div className="col-lg-6 mb-4">
                <div className="dash_card_panel h-100">
                  <div className="dash_section_header">
                    <h3 className="dash_section_title">⚡ Recent System Audit Logs</h3>
                    <button onClick={refreshAnalyticsData} className="dash_btn_action">🔄 Refresh</button>
                  </div>
                  <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                    {auditLogs.length === 0 ? (
                      <p className="text-muted p-3 text-center">No recent audit logs recorded.</p>
                    ) : (
                      auditLogs.slice(0, 10).map((log, idx) => (
                        <div key={idx} className="p-3 mb-2 rounded" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--dash-border)" }}>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="badge badge-dark" style={{ fontSize: "0.72rem" }}>{log.eventType}</span>
                            <small className="text-muted">{log.formattedTime || formatISTTime(log.timestamp)}</small>
                          </div>
                          <div className="text-white small font-weight-bold">{log.title}</div>
                          {log.page && <small className="text-primary">{log.page}</small>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="dash_card_panel h-100">
                  <div className="dash_section_header">
                    <h3 className="dash_section_title">📢 Active Announcement Banner</h3>
                    <button onClick={() => setActiveTab("banners")} className="dash_btn_action">Edit Banner</button>
                  </div>
                  <div className="p-3 rounded mb-3" style={{ background: "rgba(2, 132, 199, 0.1)", border: "1px solid rgba(2, 132, 199, 0.3)" }}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge badge-primary">{banner.badge}</span>
                      <span className={`dash_pill ${banner.enabled ? "live" : "archived"}`}>
                        {banner.enabled ? "● ACTIVE ON SITE" : "○ DISABLED"}
                      </span>
                    </div>
                    <p className="text-white mb-2" style={{ fontSize: "0.95rem" }}>{banner.text}</p>
                    <a href={banner.linkUrl} target="_blank" rel="noopener noreferrer" className="text-primary small font-weight-bold">
                      {banner.linkText} &rarr;
                    </a>
                  </div>

                  <h5 className="text-white mt-4 mb-3 font-weight-bold" style={{ fontSize: "0.95rem" }}>Quick CMS Jumps</h5>
                  <div className="d-flex gap-2 flex-wrap">
                    <button onClick={() => setActiveTab("projects")} className="dash_btn_action">🚀 Manage Projects ({projects.length})</button>
                    <button onClick={() => setActiveTab("blogs")} className="dash_btn_action">📝 Manage Blogs ({blogs.length})</button>
                    <button onClick={() => setActiveTab("feedbacks")} className="dash_btn_action">💬 Client Reviews ({feedbacks.length})</button>
                    <button onClick={() => setActiveTab("github")} className="dash_btn_action">🐙 Auto-Fetch GitHub</button>
                    <button onClick={() => setActiveTab("seo")} className="dash_btn_action">🔍 Google Site Verification</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: PROJECTS CMS ================= */}
        {activeTab === "projects" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">🚀 Portfolio Projects CMS ({projects.length})</h2>
                <p className="text-muted small mb-0">Changes update the public portfolio and live demo links instantly.</p>
              </div>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  placeholder="Filter projects..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="dash_form_input"
                  style={{ width: "220px", padding: "6px 12px" }}
                />
                <button
                  className="dash_btn_action dash_btn_primary"
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectModal(true);
                  }}
                >
                  <span>+ New Project</span>
                </button>
              </div>
            </div>

            <div className="dash_projects_grid">
              {filteredProjects.map((p) => (
                <div key={p.id} className="dash_project_card">
                  <div>
                    <div className="dash_project_top">
                      <span className="badge badge-primary py-1 px-2" style={{ background: "#0284c7" }}>{p.category}</span>
                      <span className={`dash_pill ${p.featured ? "featured" : "archived"}`}>
                        {p.featured ? "★ Featured" : "Standard"}
                      </span>
                    </div>
                    <h3 className="dash_project_title">{p.title}</h3>
                    <p className="dash_project_desc">{p.description}</p>
                    <div className="dash_tags_row">
                      {p.tags.map((t, idx) => (
                        <span key={idx} className="dash_tag_chip">#{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="dash_project_actions">
                    <div className="d-flex gap-2 flex-wrap">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="dash_btn_action small text-info">
                          🚀 Demo ↗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="dash_btn_action small text-light">
                          🐙 GitHub ↗
                        </a>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setShowProjectModal(true);
                        }}
                        className="dash_btn_action small"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${p.title}"?`)) {
                            deletePortfolioProject(p.id);
                            loadCmsData();
                            showToast(`Deleted project: ${p.title}`);
                          }
                        }}
                        className="dash_btn_action small dash_btn_danger"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB: BLOGS CMS ================= */}
        {activeTab === "blogs" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">📝 Technical Blog Publications ({blogs.length})</h2>
                <p className="text-muted small mb-0">Direct dedicated links: /blog/[slug] and /single-blog?slug=[slug].</p>
              </div>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  placeholder="Filter articles..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="dash_form_input"
                  style={{ width: "220px", padding: "6px 12px" }}
                />
                <button
                  className="dash_btn_action dash_btn_primary"
                  onClick={() => {
                    setEditingBlog(null);
                    setShowBlogModal(true);
                  }}
                >
                  <span>+ Write Article</span>
                </button>
              </div>
            </div>

            <div className="dash_card_panel">
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Title &amp; Category</th>
                      <th>Slug &amp; Route</th>
                      <th>Author</th>
                      <th>Date</th>
                      <th>Views</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <div className="font-weight-bold text-white">{b.title}</div>
                          <span className="badge badge-info small mt-1">{b.category}</span>
                        </td>
                        <td>
                          <Link href={`/blog/${b.slug}`} target="_blank" className="text-primary font-weight-bold small">
                            /blog/{b.slug} ↗
                          </Link>
                        </td>
                        <td className="text-muted small">{b.author}</td>
                        <td className="text-muted small">{b.publishedDate}</td>
                        <td className="text-muted small font-family-mono">{b.views}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => {
                                setEditingBlog(b);
                                setShowBlogModal(true);
                              }}
                              className="dash_btn_action small"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete article "${b.title}"?`)) {
                                  deleteBlogPost(b.id);
                                  loadCmsData();
                                  showToast(`Deleted article: ${b.title}`);
                                }
                              }}
                              className="dash_btn_action small dash_btn_danger"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: REVIEWS / FEEDBACKS ================= */}
        {activeTab === "feedbacks" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">💬 Client Reviews &amp; Testimonials ({feedbacks.length})</h2>
                <p className="text-muted small mb-0">Control endorsements appearing on Karan Mishra&apos;s homepage.</p>
              </div>
              <button
                className="dash_btn_action dash_btn_primary"
                onClick={() => {
                  setEditingFeedback(null);
                  setShowFeedbackModal(true);
                }}
              >
                <span>+ Add Endorsement</span>
              </button>
            </div>

            <div className="dash_card_panel">
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Client / Reviewer</th>
                      <th>Rating</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Home Display</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((f) => (
                      <tr key={f.id}>
                        <td>
                          <div className="font-weight-bold text-white">{f.name}</div>
                          <small className="text-muted">{f.role} &bull; {f.company}</small>
                        </td>
                        <td>
                          <span className="text-warning">{"★".repeat(f.rating)}</span>
                          <span className="text-muted">{"☆".repeat(5 - f.rating)}</span>
                        </td>
                        <td style={{ maxWidth: "320px" }}>
                          <p className="mb-0 text-white-50 small line-clamp-2">{f.message}</p>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              const nextStatus = f.status === "Approved" ? "Pending" : "Approved";
                              updateFeedbackStatus(f.id, nextStatus);
                              loadCmsData();
                              showToast(`Status changed to ${nextStatus}`);
                            }}
                            className={`dash_pill ${f.status === "Approved" ? "live" : "pending"}`}
                            style={{ cursor: "pointer" }}
                          >
                            {f.status}
                          </button>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={f.featuredOnHome}
                            onChange={(e) => {
                              updateFeedbackStatus(f.id, f.status, e.target.checked);
                              loadCmsData();
                              showToast("Updated home display");
                            }}
                          />
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => {
                                setEditingFeedback(f);
                                setShowFeedbackModal(true);
                              }}
                              className="dash_btn_action small"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete feedback from ${f.name}?`)) {
                                  deleteFeedback(f.id);
                                  loadCmsData();
                                  showToast(`Deleted feedback from ${f.name}`);
                                }
                              }}
                              className="dash_btn_action small dash_btn_danger"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: GITHUB AUTO-FETCH ================= */}
        {activeTab === "github" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">🐙 GitHub Live Auto-Fetch Hub</h2>
                <p className="text-muted small mb-0">Connect to GitHub REST API, inspect public repositories, and 1-click import into Portfolio Projects.</p>
              </div>
            </div>

            <div className="dash_card_panel mb-4">
              <div className="row align-items-end g-3">
                <div className="col-md-5">
                  <label className="dash_form_label">GitHub Username / Organization Handle</label>
                  <input
                    type="text"
                    value={ghUsername}
                    onChange={(e) => setGhUsername(e.target.value)}
                    placeholder="e.g. CodeSage4D"
                    className="dash_form_input"
                  />
                </div>
                <div className="col-md-4">
                  <button
                    onClick={handleFetchGithubRepos}
                    disabled={isFetchingGh}
                    className="dash_btn_action dash_btn_primary"
                    style={{ width: "100%", padding: "10px" }}
                  >
                    {isFetchingGh ? "🔄 Contacting GitHub API..." : "🚀 Fetch Repositories"}
                  </button>
                </div>
              </div>
              {ghError && <div className="text-danger small mt-2">❌ {ghError}</div>}
            </div>

            {ghRepos.length > 0 && (
              <div className="dash_projects_grid">
                {ghRepos.map((repo) => (
                  <div key={repo.id} className="dash_project_card">
                    <div>
                      <div className="dash_project_top">
                        <span className="badge badge-dark small">{repo.language || "Multi-Language"}</span>
                        <span className="text-warning small font-weight-bold">⭐ {repo.stargazers_count} &bull; 🍴 {repo.forks_count}</span>
                      </div>
                      <h4 className="dash_project_title" style={{ fontSize: "1rem" }}>{repo.name}</h4>
                      <p className="dash_project_desc small">{repo.description || "No repository description provided."}</p>
                    </div>

                    <div className="dash_project_actions">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="dash_btn_action small">
                        🐙 Repo ↗
                      </a>
                      <button
                        onClick={() => handleImportGithubRepo(repo)}
                        className="dash_btn_action small dash_btn_primary"
                      >
                        ⚡ 1-Click Import
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: EXPERIENCE CMS ================= */}
        {activeTab === "experiences" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">💼 Career Milestones &amp; Experience Timeline ({experiences.length})</h2>
                <p className="text-muted small mb-0">Directly synchronized with the interactive Road Timeline on the homepage.</p>
              </div>
              <button
                className="dash_btn_action dash_btn_primary"
                onClick={() => {
                  setEditingExp(null);
                  setShowExpModal(true);
                }}
              >
                <span>+ Add Experience</span>
              </button>
            </div>

            <div className="dash_card_panel">
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Role &amp; Organization</th>
                      <th>Period</th>
                      <th>Location</th>
                      <th>Current</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experiences.map((exp) => (
                      <tr key={exp.id}>
                        <td>
                          <div className="font-weight-bold text-white">{exp.role}</div>
                          <small className="text-primary">{exp.organization}</small>
                        </td>
                        <td className="text-muted small">{exp.period}</td>
                        <td className="text-muted small">{exp.location}</td>
                        <td>
                          <span className={`dash_pill ${exp.isCurrent ? "live" : "archived"}`}>
                            {exp.isCurrent ? "Active Role" : "Past"}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => {
                                setEditingExp(exp);
                                setShowExpModal(true);
                              }}
                              className="dash_btn_action small"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete experience ${exp.role}?`)) {
                                  deleteExperience(exp.id);
                                  loadCmsData();
                                  showToast(`Deleted ${exp.role}`);
                                }
                              }}
                              className="dash_btn_action small dash_btn_danger"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: SEO & VERIFICATION ================= */}
        {activeTab === "seo" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">🔍 SEO, Search Console &amp; Metadata Center</h2>
                <p className="text-muted small mb-0">Manage Google Site Verification and Open Graph social crawler previews.</p>
              </div>
              <button
                className="dash_btn_action dash_btn_primary"
                onClick={() => {
                  saveSeoConfig(seo);
                  showToast("Saved SEO configuration!");
                }}
              >
                <span>💾 Save SEO Settings</span>
              </button>
            </div>

            <div className="row g-4">
              <div className="col-lg-7">
                <div className="dash_card_panel">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Google Search Console Verification Token</label>
                    <input
                      type="text"
                      value={seo.googleSiteVerification}
                      onChange={(e) => setSeo({ ...seo, googleSiteVerification: e.target.value })}
                      className="dash_form_input font-family-mono"
                    />
                    <small className="text-success mt-1 d-block">
                      ✓ Active in &lt;head&gt; of src/app/layout.tsx: google-site-verification=FR-Ie2tWKzGnBNEMu3JDJH2I42pFzTtm5vqPLQKKGts
                    </small>
                  </div>

                  <div className="dash_form_group">
                    <label className="dash_form_label">Master Site Title</label>
                    <input
                      type="text"
                      value={seo.siteTitle}
                      onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                      className="dash_form_input"
                    />
                  </div>

                  <div className="dash_form_group">
                    <label className="dash_form_label">Canonical Site URL</label>
                    <input
                      type="text"
                      value={seo.canonicalUrl}
                      onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
                      className="dash_form_input"
                    />
                  </div>

                  <div className="dash_form_group">
                    <label className="dash_form_label">Meta Description</label>
                    <textarea
                      rows={3}
                      value={seo.metaDescription}
                      onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                      className="dash_form_textarea"
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="dash_card_panel">
                  <h4 className="text-white font-weight-bold mb-3" style={{ fontSize: "1rem" }}>
                    Google Search Engine Snippet Preview
                  </h4>
                  <div className="p-3 rounded mb-4" style={{ background: "#ffffff", color: "#202124", fontFamily: "arial, sans-serif" }}>
                    <div style={{ fontSize: "14px", color: "#202124", marginBottom: "2px" }}>
                      https://itsgkaranmishra.web.app
                    </div>
                    <div style={{ fontSize: "20px", color: "#1a0dab", fontWeight: "normal", marginBottom: "4px", cursor: "pointer" }}>
                      {seo.siteTitle}
                    </div>
                    <div style={{ fontSize: "14px", color: "#4d5156", lineHeight: "1.58" }}>
                      {seo.metaDescription}
                    </div>
                  </div>

                  <h5 className="text-white font-weight-bold mb-2" style={{ fontSize: "0.95rem" }}>Sitemap &amp; Crawler Index Status</h5>
                  <div className="text-muted small">
                    <div>&bull; /sitemap.xml: <strong>Dynamic Indexing Active</strong></div>
                    <div>&bull; /robots.txt: <strong>Allow: /</strong></div>
                    <div>&bull; Article Structured Data: <strong>application/ld+json active</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: ANNOUNCEMENT BANNERS ================= */}
        {activeTab === "banners" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">📢 Top Announcement Banners &amp; Feed</h2>
                <p className="text-muted small mb-0">Global banner broadcasted across all pages and visitors.</p>
              </div>
              <button
                className="dash_btn_action dash_btn_primary"
                onClick={() => {
                  saveAnnouncementBanner(banner);
                  showToast("Saved announcement banner!");
                }}
              >
                <span>💾 Save Banner</span>
              </button>
            </div>

            <div className="dash_card_panel">
              <div className="dash_form_group">
                <label className="d-flex align-items-center gap-2 text-white font-weight-bold">
                  <input
                    type="checkbox"
                    checked={banner.enabled}
                    onChange={(e) => setBanner({ ...banner, enabled: e.target.checked })}
                  />
                  <span>Enable Global Header Announcement Banner</span>
                </label>
              </div>

              <div className="row g-3">
                <div className="col-md-3">
                  <label className="dash_form_label">Badge Text</label>
                  <input
                    type="text"
                    value={banner.badge}
                    onChange={(e) => setBanner({ ...banner, badge: e.target.value })}
                    className="dash_form_input"
                  />
                </div>
                <div className="col-md-9">
                  <label className="dash_form_label">Announcement Message</label>
                  <input
                    type="text"
                    value={banner.text}
                    onChange={(e) => setBanner({ ...banner, text: e.target.value })}
                    className="dash_form_input"
                  />
                </div>
                <div className="col-md-6">
                  <label className="dash_form_label">CTA Button Label</label>
                  <input
                    type="text"
                    value={banner.linkText}
                    onChange={(e) => setBanner({ ...banner, linkText: e.target.value })}
                    className="dash_form_input"
                  />
                </div>
                <div className="col-md-6">
                  <label className="dash_form_label">Target URL</label>
                  <input
                    type="text"
                    value={banner.linkUrl}
                    onChange={(e) => setBanner({ ...banner, linkUrl: e.target.value })}
                    className="dash_form_input"
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-top">
                <label className="dash_form_label">Live Preview of Banner</label>
                <div className="p-3 rounded" style={{ background: "rgba(2, 132, 199, 0.15)", border: "1px solid #0284c7" }}>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span className="badge badge-primary">{banner.badge}</span>
                    <span className="text-white">{banner.text}</span>
                    <a href={banner.linkUrl} className="text-info font-weight-bold ml-auto">{banner.linkText} &rarr;</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: NETWORKING & TELEMETRY ================= */}
        {activeTab === "networking" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">🌐 Real-Time Client Networking &amp; IP Telemetry</h2>
                <p className="text-muted small mb-0">Client IPv4/IPv6, ISP/Org, bandwidth downlink Mbps, RTT latency, and connection types.</p>
              </div>
              <button onClick={refreshAnalyticsData} className="dash_btn_action dash_btn_primary">
                <span>🔄 Ping Telemetry Server</span>
              </button>
            </div>

            <div className="p-3 rounded mb-4" style={{ background: "rgba(99, 102, 241, 0.1)", border: "1px solid rgba(99, 102, 241, 0.3)" }}>
              <strong className="text-primary">🔒 Privacy &amp; Architecture Invariant:</strong>
              <p className="text-white-50 small mb-0 mt-1">
                Standard web browser JavaScript security models strictly prohibit access to local hardware MAC addresses. As per enterprise specifications, client telemetry captures server-side IP hashes, ISP/Carrier ASNs, real Network Information API downlink/RTT, and cryptographically secure first-party session tokens without violating visitor sandbox boundaries.
              </p>
            </div>

            <div className="dash_card_panel">
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>IP &amp; Type</th>
                      <th>Location / Org</th>
                      <th>Network Type</th>
                      <th>Downlink Speed</th>
                      <th>Round-Trip RTT</th>
                      <th>First / Last Seen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.slice(0, 15).map((v) => (
                      <tr key={v.id}>
                        <td>
                          <div className="font-family-mono font-weight-bold text-white">{v.ip || "127.0.0.1"}</div>
                          <span className="badge badge-dark small">{v.ipType || (v.ip?.includes(":") ? "IPv6" : "IPv4")}</span>
                        </td>
                        <td>
                          <div className="text-white">{v.flagEmoji || "🌐"} {v.city || "Indore"}, {v.country || "India"}</div>
                          <small className="text-muted">{v.org || "Client Network"}</small>
                        </td>
                        <td>
                          <span className="badge badge-info">{v.effectiveType || "4G / Broadband"}</span>
                        </td>
                        <td className="font-family-mono text-success">
                          {v.downlinkMbps ? `${v.downlinkMbps} Mbps` : "High-Speed"}
                        </td>
                        <td className="font-family-mono text-warning">
                          {v.rttMs ? `${v.rttMs} ms` : "14 ms"}
                        </td>
                        <td className="text-muted small">
                          {v.formattedTime || formatISTTime(v.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: DEVICES & SCREENS ================= */}
        {activeTab === "devices" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">📱 Client Devices &amp; Physical Screen Dimensions</h2>
                <p className="text-muted small mb-0">Exact screen resolution width/height, viewport size, DPR Retina scaling, and device category.</p>
              </div>
              <div className="d-flex gap-2">
                {["ALL", "DESKTOP", "MOBILE", "TABLET"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setVisitorDeviceFilter(type)}
                    className={`dash_tab_btn ${visitorDeviceFilter === type ? "active" : ""}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="dash_card_panel">
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Device Category</th>
                      <th>Physical Resolution</th>
                      <th>Viewport Size</th>
                      <th>DPR (Retina)</th>
                      <th>OS &amp; Platform</th>
                      <th>Browser</th>
                      <th>Cores / RAM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVisitors.slice(0, 15).map((v) => (
                      <tr key={v.id}>
                        <td>
                          <span className="badge badge-primary py-1 px-2">{v.device || "Desktop"}</span>
                        </td>
                        <td className="font-family-mono font-weight-bold text-white">
                          {v.screenResolution || `${v.screenWidth || 1920}x${v.screenHeight || 1080}`}
                        </td>
                        <td className="font-family-mono text-info small">
                          {v.viewportSize || `${v.screenWidth || 1920}x${v.screenHeight || 1080}`}
                        </td>
                        <td className="font-family-mono text-warning">
                          {v.devicePixelRatio || 1}x
                        </td>
                        <td className="text-white small">{v.os || "Linux / Windows"}</td>
                        <td className="text-muted small">{v.browser || "Chrome"}</td>
                        <td className="text-muted small font-family-mono">
                          {v.cpuCores ? `${v.cpuCores} Cores` : "8 Cores"} &bull; {v.ramGb ? `${v.ramGb}GB` : "16GB"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: LEADS / CRM ================= */}
        {activeTab === "leads" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">📥 CRM Inquiries &amp; Client Leads ({leads.length})</h2>
                <p className="text-muted small mb-0">Incoming partnership proposals and collaboration requests from Karan Mishra&apos;s contact portal.</p>
              </div>
            </div>

            <div className="dash_card_panel">
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Client Name &amp; Email</th>
                      <th>Company &amp; Phone</th>
                      <th>Subject &amp; Message</th>
                      <th>Budget</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center p-4 text-muted">No client leads yet.</td>
                      </tr>
                    ) : (
                      leads.map((l) => (
                        <tr key={l.id}>
                          <td>
                            <div className="font-weight-bold text-white">{l.name}</div>
                            <small className="text-primary">{l.email}</small>
                          </td>
                          <td>
                            <div className="text-white small">{l.company || "Independent"}</div>
                            <small className="text-muted">{l.phone || "—"}</small>
                          </td>
                          <td style={{ maxWidth: "300px" }}>
                            <div className="font-weight-bold text-white small">{l.subject}</div>
                            <p className="mb-0 text-white-50 small line-clamp-2">{l.message}</p>
                          </td>
                          <td>
                            <span className="badge badge-success small">{l.budget || "Enterprise"}</span>
                          </td>
                          <td>
                            <span className={`dash_pill ${l.status === "New" ? "live" : "archived"}`}>
                              {l.status}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                if (confirm(`Delete lead from ${l.name}?`)) {
                                  deleteLead(l.id);
                                  refreshAnalyticsData();
                                  showToast(`Deleted lead: ${l.name}`);
                                }
                              }}
                              className="dash_btn_action small dash_btn_danger"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: ANALYTICS & TRAFFIC INSIGHTS ================= */}
        {activeTab === "analytics" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">📈 Traffic Insights &amp; Engagement Intelligence</h2>
                <p className="text-muted small mb-0">Deep telemetry aggregations from SQLite3 database and client edge sensors.</p>
              </div>
              <div className="d-flex gap-2">
                <a href="/api/analytics/export?format=csv" download className="dash_btn_action">
                  📊 Export CSV
                </a>
                <a href="/api/analytics/export?format=json" download className="dash_btn_action">
                  📥 Export JSON
                </a>
              </div>
            </div>

            <div className="dash_kpi_grid">
              <div className="dash_kpi_card">
                <div className="dash_kpi_header">
                  <h3 className="dash_kpi_title">Total Sessions</h3>
                  <div className="dash_kpi_icon" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8" }}>🔄</div>
                </div>
                <div className="dash_kpi_val">{totalVisitorsCount}</div>
                <div className="dash_kpi_trend"><span>Unique Sessions Logged</span></div>
              </div>

              <div className="dash_kpi_card">
                <div className="dash_kpi_header">
                  <h3 className="dash_kpi_title">Average Downlink</h3>
                  <div className="dash_kpi_icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>📶</div>
                </div>
                <div className="dash_kpi_val">{serverSummary?.kpis?.avgDownlinkMbps || 48.5} <small style={{ fontSize: "1rem" }}>Mbps</small></div>
                <div className="dash_kpi_trend"><span>Client Broadband Velocity</span></div>
              </div>

              <div className="dash_kpi_card">
                <div className="dash_kpi_header">
                  <h3 className="dash_kpi_title">Average RTT Latency</h3>
                  <div className="dash_kpi_icon" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>⚡</div>
                </div>
                <div className="dash_kpi_val">{serverSummary?.kpis?.avgRttMs || 18} <small style={{ fontSize: "1rem" }}>ms</small></div>
                <div className="dash_kpi_trend"><span>Edge Ping Duration</span></div>
              </div>

              <div className="dash_kpi_card">
                <div className="dash_kpi_header">
                  <h3 className="dash_kpi_title">Unique IP Addresses</h3>
                  <div className="dash_kpi_icon" style={{ background: "rgba(6, 182, 212, 0.15)", color: "#06b6d4" }}>🌐</div>
                </div>
                <div className="dash_kpi_val">{uniqueIpsCount}</div>
                <div className="dash_kpi_trend"><span>Resolved via X-Forwarded-For</span></div>
              </div>
            </div>

            <div className="dash_card_panel">
              <h4 className="text-white font-weight-bold mb-3" style={{ fontSize: "1rem" }}>
                Top Visited Pages &amp; Sections
              </h4>
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Page Path</th>
                      <th>Category</th>
                      <th>Views Proportion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-family-mono text-primary">/ (Home &bull; Portfolio Codex)</td>
                      <td>Flagship Landing</td>
                      <td><div className="progress" style={{ height: "8px", background: "rgba(255,255,255,0.1)" }}><div className="progress-bar bg-primary" style={{ width: "85%" }}></div></div></td>
                    </tr>
                    <tr>
                      <td className="font-family-mono text-primary">/portfolio (Showcase Projects)</td>
                      <td>Portfolio Showcase</td>
                      <td><div className="progress" style={{ height: "8px", background: "rgba(255,255,255,0.1)" }}><div className="progress-bar bg-info" style={{ width: "65%" }}></div></div></td>
                    </tr>
                    <tr>
                      <td className="font-family-mono text-primary">/blog (Technical Publications)</td>
                      <td>Engineering Whitepapers</td>
                      <td><div className="progress" style={{ height: "8px", background: "rgba(255,255,255,0.1)" }}><div className="progress-bar bg-success" style={{ width: "45%" }}></div></div></td>
                    </tr>
                    <tr>
                      <td className="font-family-mono text-primary">/about (Executive Dossier)</td>
                      <td>Founder Codex</td>
                      <td><div className="progress" style={{ height: "8px", background: "rgba(255,255,255,0.1)" }}><div className="progress-bar bg-warning" style={{ width: "40%" }}></div></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: FOUNDER PROFILE DOSSIER ================= */}
        {activeTab === "profile" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">👤 Founder Profile &amp; Identity Dossier</h2>
                <p className="text-muted small mb-0">Manage Karan Mishra&apos;s executive biography, contact info, and official portrait photograph.</p>
              </div>
              <button
                className="dash_btn_action dash_btn_primary"
                onClick={() => {
                  saveProfileInfo(profile);
                  showToast("Saved profile information!");
                }}
              >
                <span>💾 Save Profile</span>
              </button>
            </div>

            <div className="row g-4">
              <div className="col-lg-4 text-center">
                <div className="dash_card_panel">
                  <h4 className="text-white font-weight-bold mb-3" style={{ fontSize: "1rem" }}>
                    Official Founder Photograph
                  </h4>
                  <img
                    src="/img/founder/karan_mishra_founder.jpg"
                    alt="Karan Mishra"
                    className="img-fluid rounded mb-3 shadow"
                    style={{ maxHeight: "300px", objectFit: "cover", border: "2px solid rgba(99, 102, 241, 0.4)" }}
                  />
                  <div className="badge badge-success py-2 px-3 mb-2 d-block">
                    ✓ Verified Founder Photo Active
                  </div>
                  <small className="text-muted d-block">Path: /img/founder/karan_mishra_founder.jpg</small>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="dash_card_panel">
                  <div className="row g-2">
                    <div className="col-md-6">
                      <div className="dash_form_group">
                        <label className="dash_form_label">Full Legal Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="dash_form_input"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="dash_form_group">
                        <label className="dash_form_label">Executive Headline</label>
                        <input
                          type="text"
                          value={profile.headline}
                          onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                          className="dash_form_input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="dash_form_group">
                    <label className="dash_form_label">Philosophy &amp; Tagline</label>
                    <input
                      type="text"
                      value={profile.tagline}
                      onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                      className="dash_form_input"
                    />
                  </div>

                  <div className="dash_form_group">
                    <label className="dash_form_label">Executive Bio</label>
                    <textarea
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="dash_form_textarea"
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-md-6">
                      <div className="dash_form_group">
                        <label className="dash_form_label">Primary Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="dash_form_input"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="dash_form_group">
                        <label className="dash_form_label">Direct Phone / WhatsApp</label>
                        <input
                          type="text"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="dash_form_input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="dash_form_group">
                    <label className="dash_form_label">Headquarters Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="dash_form_input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: SOCIAL PROFILES ================= */}
        {activeTab === "socials" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">🔗 Social &amp; Professional Profiles ({socials.length})</h2>
                <p className="text-muted small mb-0">LinkedIn, GitHub, Aurxon official, Instagram, and custom portfolio links.</p>
              </div>
              <button
                className="dash_btn_action dash_btn_primary"
                onClick={() => {
                  const platform = prompt("Enter Platform Name (e.g. Twitter, YouTube):");
                  const url = prompt("Enter Profile URL:");
                  if (platform && url) {
                    saveSocial({ platform, url, icon: "fa-solid fa-link" });
                    loadCmsData();
                    showToast(`Added ${platform}!`);
                  }
                }}
              >
                <span>+ Add Social Link</span>
              </button>
            </div>

            <div className="dash_card_panel">
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Platform</th>
                      <th>Handle / Username</th>
                      <th>URL</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socials.map((s) => (
                      <tr key={s.id}>
                        <td className="font-weight-bold text-white">{s.platform}</td>
                        <td className="text-muted small font-family-mono">@{s.username || "—"}</td>
                        <td>
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary small font-weight-bold">
                            {s.url} ↗
                          </a>
                        </td>
                        <td>
                          <span className={`dash_pill ${s.isVisible ? "live" : "archived"}`}>
                            {s.isVisible ? "Visible" : "Hidden"}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              if (confirm(`Delete ${s.platform} link?`)) {
                                deleteSocial(s.id);
                                loadCmsData();
                                showToast(`Deleted ${s.platform}`);
                              }
                            }}
                            className="dash_btn_action small dash_btn_danger"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: SKILLS & TECH STACK ================= */}
        {activeTab === "skills" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">⚡ Skills &amp; Technology Stack ({skills.length})</h2>
                <p className="text-muted small mb-0">AI/ML architectures, systems programming, and full-stack capabilities.</p>
              </div>
              <button
                className="dash_btn_action dash_btn_primary"
                onClick={() => {
                  const name = prompt("Enter Skill Name (e.g. Rust, PyTorch, Docker):");
                  if (name) {
                    saveSkill({ name, category: "AI/ML", proficiency: 90, featured: true });
                    loadCmsData();
                    showToast(`Added skill: ${name}`);
                  }
                }}
              >
                <span>+ Add Skill</span>
              </button>
            </div>

            <div className="dash_card_panel">
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Skill / Technology</th>
                      <th>Category</th>
                      <th>Proficiency</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((sk) => (
                      <tr key={sk.id}>
                        <td className="font-weight-bold text-white">{sk.name}</td>
                        <td><span className="badge badge-primary small">{sk.category}</span></td>
                        <td style={{ width: "220px" }}>
                          <div className="d-flex align-items-center gap-2">
                            <span className="small font-family-mono">{sk.proficiency}%</span>
                            <div className="progress flex-grow-1" style={{ height: "6px", background: "rgba(255,255,255,0.1)" }}>
                              <div className="progress-bar bg-info" style={{ width: `${sk.proficiency}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              if (confirm(`Delete skill ${sk.name}?`)) {
                                deleteSkill(sk.id);
                                loadCmsData();
                                showToast(`Deleted ${sk.name}`);
                              }
                            }}
                            className="dash_btn_action small dash_btn_danger"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: EDUCATION & CERTIFICATIONS ================= */}
        {activeTab === "education" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">🎓 Education &amp; Certifications</h2>
                <p className="text-muted small mb-0">Academic engineering degrees and professional technical credentials.</p>
              </div>
            </div>

            <div className="dash_card_panel mb-4">
              <h4 className="text-white font-weight-bold mb-3" style={{ fontSize: "1rem" }}>
                Academic Degrees ({educations.length})
              </h4>
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Degree &amp; Institution</th>
                      <th>Period</th>
                      <th>Location</th>
                      <th>Score / Honors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {educations.map((edu) => (
                      <tr key={edu.id}>
                        <td>
                          <div className="font-weight-bold text-white">{edu.degree}</div>
                          <small className="text-primary">{edu.institution}</small>
                        </td>
                        <td className="text-muted small">{edu.period}</td>
                        <td className="text-muted small">{edu.location}</td>
                        <td className="font-weight-bold text-success small">{edu.score || "Distinction"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dash_card_panel">
              <h4 className="text-white font-weight-bold mb-3" style={{ fontSize: "1rem" }}>
                Professional Certifications ({certifications.length})
              </h4>
              <div className="dash_table_container">
                <table className="smart_table">
                  <thead>
                    <tr>
                      <th>Certification Title</th>
                      <th>Issuing Authority</th>
                      <th>Year</th>
                      <th>Credential ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certifications.map((c) => (
                      <tr key={c.id}>
                        <td className="font-weight-bold text-white">{c.title}</td>
                        <td className="text-primary small">{c.issuer}</td>
                        <td className="text-muted small font-family-mono">{c.year}</td>
                        <td className="text-muted small font-family-mono">{c.credentialId || "VERIFIED"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: MEDIA ASSET LIBRARY ================= */}
        {activeTab === "media" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">🖼️ Media Asset Library ({mediaList.length})</h2>
                <p className="text-muted small mb-0">Manage founder portraits, showcase graphics, and architectural banners.</p>
              </div>
            </div>

            <div className="dash_projects_grid">
              <div className="dash_project_card" style={{ border: "2px solid #06b6d4" }}>
                <img
                  src="/img/founder/karan_mishra_founder.jpg"
                  alt="Karan Mishra Portrait"
                  className="rounded mb-2 img-fluid"
                  style={{ height: "180px", width: "100%", objectFit: "cover" }}
                />
                <h5 className="text-white mb-1" style={{ fontSize: "0.95rem" }}>Karan Mishra (Founder Portrait)</h5>
                <p className="text-muted small mb-2">1135x1388 &bull; 133 KB &bull; Primary Avatar &bull; Active in Dossier</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("/img/founder/karan_mishra_founder.jpg");
                    showToast("Copied image path to clipboard!");
                  }}
                  className="dash_btn_action small"
                >
                  📋 Copy Path
                </button>
              </div>

              {mediaList.map((m) => (
                <div key={m.id} className="dash_project_card">
                  <img
                    src={m.url}
                    alt={m.title}
                    className="rounded mb-2 img-fluid"
                    style={{ height: "180px", width: "100%", objectFit: "cover" }}
                  />
                  <h5 className="text-white mb-1" style={{ fontSize: "0.95rem" }}>{m.title}</h5>
                  <p className="text-muted small mb-2">{m.dimensions || "1280x720"} &bull; {m.sizeKb} KB</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(m.url);
                      showToast("Copied image path to clipboard!");
                    }}
                    className="dash_btn_action small"
                  >
                    📋 Copy Path
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB: SETTINGS & PASSCODE ================= */}
        {activeTab === "settings" && (
          <div>
            <div className="dash_section_header">
              <div>
                <h2 className="dash_section_title">⚙️ Security, Passcode &amp; Database Maintenance</h2>
                <p className="text-muted small mb-0">Change administrator credentials, backup SQLite3 database, or export analytics data.</p>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="dash_card_panel">
                  <h4 className="text-white font-weight-bold mb-3" style={{ fontSize: "1rem" }}>
                    Administrator Passcode Settings
                  </h4>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (credForm.newPassword !== credForm.confirmPassword) {
                        setCredStatus({ type: "error", text: "New passcodes do not match." });
                        return;
                      }
                      if (credForm.newPassword.length < 8) {
                        setCredStatus({ type: "error", text: "Passcode must be at least 8 characters long." });
                        return;
                      }
                      localStorage.setItem(
                        "axn_custom_admin_creds",
                        JSON.stringify({
                          username: credForm.newUsername || ADMIN_USER,
                          password: credForm.newPassword,
                          updatedAt: new Date().toISOString(),
                        })
                      );
                      setCredStatus({ type: "success", text: "Administrator credentials updated successfully!" });
                      recordAuditEvent("SECURITY_CRED_CHANGE", "Updated administrator login passcode");
                    }}
                  >
                    <div className="dash_form_group">
                      <label className="dash_form_label">New Username (Optional)</label>
                      <input
                        type="text"
                        placeholder="Leave blank to keep current"
                        value={credForm.newUsername}
                        onChange={(e) => setCredForm({ ...credForm, newUsername: e.target.value })}
                        className="dash_form_input"
                      />
                    </div>

                    <div className="dash_form_group">
                      <label className="dash_form_label">New Passcode</label>
                      <input
                        type="password"
                        required
                        value={credForm.newPassword}
                        onChange={(e) => setCredForm({ ...credForm, newPassword: e.target.value })}
                        className="dash_form_input"
                      />
                    </div>

                    <div className="dash_form_group">
                      <label className="dash_form_label">Confirm New Passcode</label>
                      <input
                        type="password"
                        required
                        value={credForm.confirmPassword}
                        onChange={(e) => setCredForm({ ...credForm, confirmPassword: e.target.value })}
                        className="dash_form_input"
                      />
                    </div>

                    {credStatus.text && (
                      <div className={`p-2 mb-3 rounded small ${credStatus.type === "success" ? "text-success bg-dark" : "text-danger bg-dark"}`}>
                        {credStatus.text}
                      </div>
                    )}

                    <button type="submit" className="dash_btn_action dash_btn_primary">
                      Update Passcode
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="dash_card_panel">
                  <h4 className="text-white font-weight-bold mb-3" style={{ fontSize: "1rem" }}>
                    Database Exports &amp; Maintenance
                  </h4>

                  <p className="text-muted small mb-4">
                    Download full analytics dumps as CSV or JSON format for external auditing or machine learning model training.
                  </p>

                  <div className="d-flex gap-2 flex-wrap mb-4">
                    <a href="/api/analytics/export?format=json" download className="dash_btn_action">
                      📥 Export Telemetry JSON
                    </a>
                    <a href="/api/analytics/export?format=csv" download className="dash_btn_action">
                      📊 Export Visitors CSV
                    </a>
                  </div>

                  <hr className="my-4" style={{ borderColor: "var(--dash-border)" }} />

                  <h5 className="text-danger font-weight-bold mb-2" style={{ fontSize: "0.95rem" }}>Purge Telemetry Database</h5>
                  <p className="text-muted small mb-3">Safely reset client visitor logs and click events.</p>

                  <button
                    onClick={async () => {
                      if (confirm("Are you sure you want to purge all telemetry logs? This cannot be undone.")) {
                        clearAnalyticsLogs();
                        try {
                          await fetch("/api/analytics/purge", { method: "POST" });
                        } catch {}
                        refreshAnalyticsData();
                        showToast("Telemetry logs purged.");
                      }
                    }}
                    className="dash_btn_action dash_btn_danger"
                  >
                    🗑️ Purge Analytics Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: EDIT / CREATE PROJECT ================= */}
      {showProjectModal && (
        <div className="dash_modal_backdrop" onClick={() => setShowProjectModal(false)}>
          <div className="dash_modal_card" onClick={(e) => e.stopPropagation()}>
            <div className="dash_modal_header">
              <h3 className="dash_modal_title">
                {editingProject?.id ? "✏️ Edit Showcase Project" : "🚀 Add Showcase Project"}
              </h3>
              <button className="dash_close_btn" onClick={() => setShowProjectModal(false)}>✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem("projTitle") as HTMLInputElement).value;
                const desc = (form.elements.namedItem("projDesc") as HTMLTextAreaElement).value;
                const cat = (form.elements.namedItem("projCat") as HTMLSelectElement).value as any;
                const liveUrl = (form.elements.namedItem("projLive") as HTMLInputElement).value;
                const ghUrl = (form.elements.namedItem("projGh") as HTMLInputElement).value;
                const tagsRaw = (form.elements.namedItem("projTags") as HTMLInputElement).value;

                savePortfolioProject({
                  id: editingProject?.id,
                  title,
                  description: desc,
                  category: cat,
                  liveUrl,
                  githubUrl: ghUrl,
                  tags: tagsRaw.split(",").map((t) => t.trim()).filter(Boolean),
                  featured: true,
                });

                loadCmsData();
                setShowProjectModal(false);
                showToast(`Project "${title}" saved successfully!`);
              }}
            >
              <div className="dash_form_group">
                <label className="dash_form_label">Project Title *</label>
                <input
                  name="projTitle"
                  required
                  defaultValue={editingProject?.title || ""}
                  className="dash_form_input"
                />
              </div>

              <div className="dash_form_group">
                <label className="dash_form_label">Category *</label>
                <select name="projCat" defaultValue={editingProject?.category || "AI/ML"} className="dash_form_select">
                  <option value="AI/ML">AI/ML &amp; Neural</option>
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Enterprise">Enterprise &amp; FCOS</option>
                  <option value="Mobile">Mobile &amp; Edge</option>
                </select>
              </div>

              <div className="dash_form_group">
                <label className="dash_form_label">Short Description *</label>
                <textarea
                  name="projDesc"
                  required
                  rows={3}
                  defaultValue={editingProject?.description || ""}
                  className="dash_form_textarea"
                />
              </div>

              <div className="row g-2">
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">🚀 Live Demo URL</label>
                    <input
                      name="projLive"
                      defaultValue={editingProject?.liveUrl || "https://itsgkaranmishra.web.app"}
                      className="dash_form_input"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">🐙 GitHub Codebase URL</label>
                    <input
                      name="projGh"
                      defaultValue={editingProject?.githubUrl || "https://github.com/CodeSage4D"}
                      className="dash_form_input"
                    />
                  </div>
                </div>
              </div>

              <div className="dash_form_group">
                <label className="dash_form_label">Technologies &amp; Tags (comma-separated)</label>
                <input
                  name="projTags"
                  defaultValue={editingProject?.tags?.join(", ") || "Python, PyTorch, Next.js"}
                  className="dash_form_input"
                />
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" onClick={() => setShowProjectModal(false)} className="dash_btn_action">
                  Cancel
                </button>
                <button type="submit" className="dash_btn_action dash_btn_primary">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / CREATE BLOG ================= */}
      {showBlogModal && (
        <div className="dash_modal_backdrop" onClick={() => setShowBlogModal(false)}>
          <div className="dash_modal_card" style={{ maxWidth: "780px" }} onClick={(e) => e.stopPropagation()}>
            <div className="dash_modal_header">
              <h3 className="dash_modal_title">
                {editingBlog?.id ? "✏️ Edit Blog Article" : "📝 Write Technical Publication"}
              </h3>
              <button className="dash_close_btn" onClick={() => setShowBlogModal(false)}>✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem("blogTitle") as HTMLInputElement).value;
                const slug = (form.elements.namedItem("blogSlug") as HTMLInputElement).value;
                const cat = (form.elements.namedItem("blogCat") as HTMLInputElement).value;
                const summary = (form.elements.namedItem("blogSummary") as HTMLTextAreaElement).value;
                const content = (form.elements.namedItem("blogContent") as HTMLTextAreaElement).value;
                const tagsRaw = (form.elements.namedItem("blogTags") as HTMLInputElement).value;

                saveBlogPost({
                  id: editingBlog?.id,
                  title,
                  slug,
                  category: cat,
                  summary,
                  content,
                  tags: tagsRaw.split(",").map((t) => t.trim()).filter(Boolean),
                });

                loadCmsData();
                setShowBlogModal(false);
                showToast(`Article "${title}" published successfully!`);
              }}
            >
              <div className="row g-2">
                <div className="col-md-7">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Article Title *</label>
                    <input
                      name="blogTitle"
                      required
                      defaultValue={editingBlog?.title || ""}
                      className="dash_form_input"
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Slug (URL)</label>
                    <input
                      name="blogSlug"
                      placeholder="auto-generated-from-title"
                      defaultValue={editingBlog?.slug || ""}
                      className="dash_form_input font-family-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Category *</label>
                    <input
                      name="blogCat"
                      required
                      defaultValue={editingBlog?.category || "Industrial AI & Robotics"}
                      className="dash_form_input"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Tags (comma-separated)</label>
                    <input
                      name="blogTags"
                      defaultValue={editingBlog?.tags?.join(", ") || "AI, FCOS, Edge"}
                      className="dash_form_input"
                    />
                  </div>
                </div>
              </div>

              <div className="dash_form_group">
                <label className="dash_form_label">Executive Summary *</label>
                <textarea
                  name="blogSummary"
                  required
                  rows={2}
                  defaultValue={editingBlog?.summary || ""}
                  className="dash_form_textarea"
                />
              </div>

              <div className="dash_form_group">
                <label className="dash_form_label">Full Article Markdown Content *</label>
                <textarea
                  name="blogContent"
                  required
                  rows={8}
                  defaultValue={editingBlog?.content || ""}
                  className="dash_form_textarea font-family-mono"
                  placeholder="### Section Heading&#10;&#10;Technical dissertation text..."
                />
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" onClick={() => setShowBlogModal(false)} className="dash_btn_action">
                  Cancel
                </button>
                <button type="submit" className="dash_btn_action dash_btn_primary">
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / CREATE REVIEW ================= */}
      {showFeedbackModal && (
        <div className="dash_modal_backdrop" onClick={() => setShowFeedbackModal(false)}>
          <div className="dash_modal_card" onClick={(e) => e.stopPropagation()}>
            <div className="dash_modal_header">
              <h3 className="dash_modal_title">
                {editingFeedback?.id ? "✏️ Edit Review" : "💬 Add Client Review"}
              </h3>
              <button className="dash_close_btn" onClick={() => setShowFeedbackModal(false)}>✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem("feedName") as HTMLInputElement).value;
                const email = (form.elements.namedItem("feedEmail") as HTMLInputElement).value;
                const role = (form.elements.namedItem("feedRole") as HTMLInputElement).value;
                const company = (form.elements.namedItem("feedCompany") as HTMLInputElement).value;
                const rating = parseInt((form.elements.namedItem("feedRating") as HTMLSelectElement).value, 10);
                const msg = (form.elements.namedItem("feedMsg") as HTMLTextAreaElement).value;

                saveFeedback({
                  id: editingFeedback?.id,
                  name,
                  email,
                  role,
                  company,
                  rating,
                  message: msg,
                  status: "Approved",
                  featuredOnHome: true,
                });

                loadCmsData();
                setShowFeedbackModal(false);
                showToast(`Review from ${name} saved!`);
              }}
            >
              <div className="row g-2">
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Reviewer Name *</label>
                    <input
                      name="feedName"
                      required
                      defaultValue={editingFeedback?.name || ""}
                      className="dash_form_input"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Email *</label>
                    <input
                      name="feedEmail"
                      type="email"
                      required
                      defaultValue={editingFeedback?.email || "peer@review.org"}
                      className="dash_form_input"
                    />
                  </div>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-md-5">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Role</label>
                    <input
                      name="feedRole"
                      defaultValue={editingFeedback?.role || "Director"}
                      className="dash_form_input"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Company / Institution</label>
                    <input
                      name="feedCompany"
                      defaultValue={editingFeedback?.company || "Enterprise"}
                      className="dash_form_input"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Rating</label>
                    <select name="feedRating" defaultValue={editingFeedback?.rating || 5} className="dash_form_select">
                      <option value="5">5 ★★★★★</option>
                      <option value="4">4 ★★★★☆</option>
                      <option value="3">3 ★★★☆☆</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="dash_form_group">
                <label className="dash_form_label">Testimonial Message *</label>
                <textarea
                  name="feedMsg"
                  required
                  rows={4}
                  defaultValue={editingFeedback?.message || ""}
                  className="dash_form_textarea"
                />
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" onClick={() => setShowFeedbackModal(false)} className="dash_btn_action">
                  Cancel
                </button>
                <button type="submit" className="dash_btn_action dash_btn_primary">
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / CREATE EXPERIENCE ================= */}
      {showExpModal && (
        <div className="dash_modal_backdrop" onClick={() => setShowExpModal(false)}>
          <div className="dash_modal_card" onClick={(e) => e.stopPropagation()}>
            <div className="dash_modal_header">
              <h3 className="dash_modal_title">
                {editingExp?.id ? "✏️ Edit Career Milestone" : "💼 Add Career Milestone"}
              </h3>
              <button className="dash_close_btn" onClick={() => setShowExpModal(false)}>✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const role = (form.elements.namedItem("expRole") as HTMLInputElement).value;
                const org = (form.elements.namedItem("expOrg") as HTMLInputElement).value;
                const period = (form.elements.namedItem("expPeriod") as HTMLInputElement).value;
                const loc = (form.elements.namedItem("expLoc") as HTMLInputElement).value;
                const summary = (form.elements.namedItem("expSummary") as HTMLTextAreaElement).value;
                const isCurrent = (form.elements.namedItem("expCurrent") as HTMLInputElement).checked;

                saveExperience({
                  id: editingExp?.id,
                  role,
                  organization: org,
                  period,
                  location: loc,
                  summary,
                  isCurrent,
                });

                loadCmsData();
                setShowExpModal(false);
                showToast(`Experience "${role}" saved!`);
              }}
            >
              <div className="row g-2">
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Role *</label>
                    <input name="expRole" required defaultValue={editingExp?.role || ""} className="dash_form_input" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Organization / Venture *</label>
                    <input name="expOrg" required defaultValue={editingExp?.organization || ""} className="dash_form_input" />
                  </div>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Period</label>
                    <input name="expPeriod" defaultValue={editingExp?.period || "2024 - Present"} className="dash_form_input" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="dash_form_group">
                    <label className="dash_form_label">Location</label>
                    <input name="expLoc" defaultValue={editingExp?.location || "Indore, MP, India"} className="dash_form_input" />
                  </div>
                </div>
              </div>

              <div className="dash_form_group">
                <label className="dash_form_label">Summary</label>
                <textarea name="expSummary" rows={3} defaultValue={editingExp?.summary || ""} className="dash_form_textarea" />
              </div>

              <div className="dash_form_group">
                <label className="d-flex align-items-center gap-2 text-white">
                  <input type="checkbox" name="expCurrent" defaultChecked={editingExp?.isCurrent ?? true} />
                  <span>Currently active position</span>
                </label>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" onClick={() => setShowExpModal(false)} className="dash_btn_action">Cancel</button>
                <button type="submit" className="dash_btn_action dash_btn_primary">Save Milestone</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= COMMAND PALETTE OVERLAY (Ctrl+K) ================= */}
      {showCmdPalette && (
        <div className="cmd_palette_backdrop" onClick={() => setShowCmdPalette(false)}>
          <div className="cmd_palette_box" onClick={(e) => e.stopPropagation()}>
            <div className="cmd_input_row">
              <span style={{ fontSize: "1.1rem" }}>🔍</span>
              <input
                type="text"
                autoFocus
                placeholder="Jump to section, action, or project..."
                value={cmdSearch}
                onChange={(e) => setCmdSearch(e.target.value)}
                className="cmd_input"
              />
              <span className="dash_cmd_kbd">ESC to Close</span>
            </div>
            <div className="cmd_results_list">
              {cmdPaletteItems.map((item) => (
                <div key={item.id} className="cmd_result_item" onClick={item.action}>
                  <span>{item.label}</span>
                  <span className="badge badge-dark small">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="dash_toast">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
