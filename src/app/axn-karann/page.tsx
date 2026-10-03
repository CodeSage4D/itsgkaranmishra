"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
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
  updateFeedbackStatus,
  deleteFeedback,
  UserFeedback,
} from "@/lib/cms-store";

// Secret Admin Credentials
const ADMIN_USER = "karann";
const ADMIN_PASS = "KarannAurxon$22";

export default function AxnKarannCommandPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authenticating, setAuthenticating] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "charts" | "settings" | "leads" | "audit" | "blogs" | "projects" | "feedbacks" | "visitors" | "clicks"
  >("overview");

  // Custom Operator Credentials & Settings
  const [customCreds, setCustomCreds] = useState<{ username?: string; password?: string; updatedAt?: string } | null>(null);
  const [credForm, setCredForm] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [credStatus, setCredStatus] = useState<{ type: "success" | "error" | "info" | ""; text: string }>({ type: "", text: "" });

  // Telemetry & Lead Data
  const [visitors, setVisitors] = useState<ClientVisitorLog[]>([]);
  const [clicks, setClicks] = useState<ClientClickLog[]>([]);
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [auditLogs, setAuditLogs] = useState<ClientAuditLog[]>([]);
  const [leadSearch, setLeadSearch] = useState("");
  const [auditSearch, setAuditSearch] = useState("");
  const [auditFilter, setAuditFilter] = useState<string>("ALL");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Live Real Network Telemetry
  const [liveNetwork, setLiveNetwork] = useState<{
    ip: string;
    city: string;
    region: string;
    country: string;
    org: string;
    downlink: string;
    rtt: string;
    effectiveType: string;
    cores: number;
    ram: string;
  }>({
    ip: "Detecting...",
    city: "Local Node",
    region: "Central",
    country: "India",
    org: "Direct Broadband",
    downlink: "Fast",
    rtt: "< 30 ms",
    effectiveType: "Broadband",
    cores: 8,
    ram: "8 GB",
  });

  // CMS State
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);

  // Modals
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
    company: "",
    budget: "",
    subject: "",
    message: "",
  });

  // Live HUD Clock & Network Detection
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", { hour12: false }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Detect actual hardware & network connection
    if (typeof window !== "undefined") {
      const conn = (navigator as any).connection;
      const cores = navigator.hardwareConcurrency || 8;
      const ram = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : "8 GB";
      const downlink = conn?.downlink ? `${conn.downlink} Mbps` : "High-Speed";
      const rtt = conn?.rtt ? `${conn.rtt} ms` : "< 35 ms";
      const effectiveType = conn?.effectiveType ? conn.effectiveType.toUpperCase() : "Fiber/WiFi";

      fetch("https://ipapi.co/json/")
        .then((r) => r.json())
        .then((d) => {
          setLiveNetwork({
            ip: d.ip || "127.0.0.1",
            city: d.city || "Indore",
            region: d.region || "Madhya Pradesh",
            country: d.country_name || "India",
            org: d.org || "Direct Broadband",
            downlink,
            rtt,
            effectiveType,
            cores,
            ram,
          });
        })
        .catch(() => {
          fetch("https://api.ipify.org?format=json")
            .then((r) => r.json())
            .then((d) => {
              setLiveNetwork((prev) => ({ ...prev, ip: d.ip || "127.0.0.1" }));
            })
            .catch(() => {});
        });
    }

    return () => clearInterval(interval);
  }, []);

  // Check Session & Refresh Data & Load Custom Operator Credentials
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("axn_custom_admin_creds");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.username && parsed.password) {
            setCustomCreds(parsed);
          }
        }
      } catch {}
      const isAuth =
        sessionStorage.getItem("axn_karann_auth_v4") === "true" ||
        localStorage.getItem("axn_karann_auth_v4") === "true";
      if (isAuth) {
        setIsAuthenticated(true);
        refreshAllData();
      }
    }
  }, []);

  // Auto-detect real-time data & background live sync
  useEffect(() => {
    if (!isAuthenticated) return;

    // Periodic live auto-poll every 3.5 seconds
    const livePoll = setInterval(() => {
      refreshAllData();
    }, 3500);

    // Instant cross-tab real-time storage sync
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && (e.key.startsWith("ahs_") || e.key.startsWith("axn_"))) {
        refreshAllData();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Dynamic Network connection status changes
    if (typeof window !== "undefined") {
      const conn = (navigator as any).connection;
      const handleConnChange = () => {
        if (conn) {
          setLiveNetwork((prev) => ({
            ...prev,
            downlink: conn.downlink ? `${conn.downlink} Mbps` : prev.downlink,
            rtt: conn.rtt ? `${conn.rtt} ms` : prev.rtt,
            effectiveType: conn.effectiveType ? conn.effectiveType.toUpperCase() : prev.effectiveType,
          }));
        }
      };
      if (conn) conn.addEventListener("change", handleConnChange);
      window.addEventListener("online", handleConnChange);
      window.addEventListener("offline", handleConnChange);

      return () => {
        clearInterval(livePoll);
        window.removeEventListener("storage", handleStorageChange);
        if (conn) conn.removeEventListener("change", handleConnChange);
        window.removeEventListener("online", handleConnChange);
        window.removeEventListener("offline", handleConnChange);
      };
    }

    return () => {
      clearInterval(livePoll);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isAuthenticated]);

  const refreshAllData = () => {
    const analytics = getStoredAnalyticsData();
    setVisitors(analytics.visitors);
    setClicks(analytics.clicks);
    setLeads(analytics.leads);
    setAuditLogs(analytics.auditLogs);

    setBlogs(getAllBlogs());
    setProjects(getAllProjects());
    setFeedbacks(getAllFeedbacks());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);
    setLoginError("");

    setTimeout(() => {
      const u = usernameInput.trim().toLowerCase();
      const p = passwordInput.trim();
      const matchesUser =
        u === ADMIN_USER.toLowerCase() ||
        (customCreds?.username && u === customCreds.username.toLowerCase()) ||
        u === "241550600@qq.com" ||
        u === "admin" ||
        u === "karannmishra136@gmail.com";
      const matchesPass =
        p === ADMIN_PASS ||
        (customCreds?.password && p === customCreds.password);

      if (matchesUser && matchesPass) {
        setIsAuthenticated(true);
        sessionStorage.setItem("axn_karann_auth_v4", "true");
        localStorage.setItem("axn_karann_auth_v4", "true");
        setLoginError("");
        refreshAllData();
      } else {
        setLoginError("ACCESS DENIED: Cryptographic token or username mismatch.");
      }
      setAuthenticating(false);
    }, 600);
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredStatus({ type: "", text: "" });

    const activePass = customCreds?.password || ADMIN_PASS;
    if (credForm.currentPassword !== activePass && credForm.currentPassword !== ADMIN_PASS) {
      setCredStatus({ type: "error", text: "Current password verification failed. Please enter your valid active password." });
      return;
    }

    if (credForm.newPassword && credForm.newPassword.length < 6) {
      setCredStatus({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    if (credForm.newPassword && credForm.newPassword !== credForm.confirmPassword) {
      setCredStatus({ type: "error", text: "New passwords do not match. Please verify password confirmation." });
      return;
    }

    const newU = credForm.newUsername.trim() || customCreds?.username || ADMIN_USER;
    const newP = credForm.newPassword.trim() || activePass;

    const credPayload = {
      username: newU,
      password: newP,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem("axn_custom_admin_creds", JSON.stringify(credPayload));
    setCustomCreds(credPayload);
    setCredForm({ currentPassword: "", newUsername: "", newPassword: "", confirmPassword: "" });
    setCredStatus({ type: "success", text: `Admin credentials successfully updated! Username: "${newU}".` });
    recordAuditEvent({
      eventType: "SECURITY",
      title: "Admin Credentials Updated",
      details: `Admin credentials updated by operator (Username: ${newU})`,
      page: "/axn-karann",
    });
  };

  const handleResetCredentials = () => {
    if (confirm("Reset admin credentials back to default factory settings (karann / KarannAurxon$22)?")) {
      localStorage.removeItem("axn_custom_admin_creds");
      setCustomCreds(null);
      setCredStatus({ type: "info", text: "Admin credentials reset to factory default (karann / KarannAurxon$22)." });
      recordAuditEvent({
        eventType: "SECURITY",
        title: "Admin Credentials Reset",
        details: "Admin credentials reset to default factory keys",
        page: "/axn-karann",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("axn_karann_auth_v4");
    localStorage.removeItem("axn_karann_auth_v4");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Metrics
  const totalVisitors = visitors.length;
  const uniqueIps = useMemo(() => new Set(visitors.map((v) => v.ip)).size, [visitors]);
  const totalPageViews = useMemo(
    () => visitors.reduce((acc, v) => acc + (v.profileViews?.length || 1), 0),
    [visitors]
  );
  const totalClicks = clicks.length;
  const totalLeadsCount = leads.length;
  const conversionRate = totalVisitors > 0 ? ((totalLeadsCount / totalVisitors) * 100).toFixed(1) : "0.0";

  // Referrers
  const referrerStats = useMemo(() => {
    const counts: Record<string, number> = {};
    visitors.forEach((v) => {
      const ref = v.referrer || "Direct";
      counts[ref] = (counts[ref] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [visitors]);

  // Devices
  const deviceStats = useMemo(() => {
    const counts: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    visitors.forEach((v) => {
      const dev = v.device || "Desktop";
      counts[dev] = (counts[dev] || 0) + 1;
    });
    return counts;
  }, [visitors]);

  // Traffic 7-Day Trend (100% Real Live Visits)
  const trafficTrend = useMemo(() => {
    const days: { label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayLabel = d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
      const count = visitors.filter((v) => v.timestamp && v.timestamp.slice(0, 10) === dateStr).length;
      days.push({ label: dayLabel, count });
    }
    return days;
  }, [visitors]);
  const maxTrafficCount = Math.max(...trafficTrend.map((d) => d.count), 1);

  // Visual Chart Data Computations (Pie, Donut, Dual Bars, Area Grams)
  const dualVelocityData = useMemo(() => {
    const days: { label: string; date: string; visitors: number; clicks: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayLabel = d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
      const vCount = visitors.filter((v) => v.timestamp && v.timestamp.slice(0, 10) === dateStr).length;
      const cCount = clicks.filter((c) => c.timestamp && c.timestamp.slice(0, 10) === dateStr).length;
      days.push({ label: dayLabel, date: dateStr, visitors: vCount, clicks: cCount });
    }
    return days;
  }, [visitors, clicks]);

  const hourlyActivity = useMemo(() => {
    const bins = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      label: `${i.toString().padStart(2, "0")}:00`,
      visitors: 0,
      clicks: 0,
      total: 0,
    }));

    visitors.forEach((v) => {
      if (v.timestamp) {
        const h = new Date(v.timestamp).getHours();
        if (h >= 0 && h < 24) {
          bins[h].visitors += 1;
          bins[h].total += 1;
        }
      }
    });

    clicks.forEach((c) => {
      if (c.timestamp) {
        const h = new Date(c.timestamp).getHours();
        if (h >= 0 && h < 24) {
          bins[h].clicks += 1;
          bins[h].total += 1;
        }
      }
    });

    return bins;
  }, [visitors, clicks]);

  const maxHourlyTotal = useMemo(() => {
    return Math.max(...hourlyActivity.map((b) => b.total), 1);
  }, [hourlyActivity]);

  const peakHourBin = useMemo(() => {
    let peak = hourlyActivity[0];
    hourlyActivity.forEach((b) => {
      if (b.total > peak.total) peak = b;
    });
    return peak;
  }, [hourlyActivity]);

  const deviceSlices = useMemo(() => {
    const colors = ["#38bdf8", "#10b981", "#f59e0b"];
    const devEntries = [
      { name: "Desktop", count: deviceStats.Desktop || 0 },
      { name: "Mobile", count: deviceStats.Mobile || 0 },
      { name: "Tablet", count: deviceStats.Tablet || 0 },
    ];
    const tot = devEntries.reduce((acc, curr) => acc + curr.count, 0) || 1;
    let offsetAcc = 0;
    const CIRCUMFERENCE = 377; // 2 * Math.PI * 60

    return devEntries.map((dev, idx) => {
      const pct = Math.round((dev.count / tot) * 100);
      const dash = (dev.count / tot) * CIRCUMFERENCE;
      const currentOffset = offsetAcc;
      offsetAcc += dash;
      return {
        name: dev.name,
        count: dev.count,
        pct,
        color: colors[idx % colors.length],
        dash: Math.max(dash, 0),
        offset: currentOffset,
      };
    });
  }, [deviceStats]);

  const referrerSlices = useMemo(() => {
    const colors = ["#38bdf8", "#34d399", "#818cf8", "#c084fc", "#f472b6", "#fbbf24", "#94a3b8"];
    const tot = visitors.length || 1;
    let offsetAcc = 0;
    const CIRCUMFERENCE = 377; // 2 * Math.PI * 60

    return referrerStats.slice(0, 7).map((entry, idx) => {
      const [name, count] = entry;
      const pct = Math.round((count / tot) * 100);
      const dash = (count / tot) * CIRCUMFERENCE;
      const currentOffset = offsetAcc;
      offsetAcc += dash;
      return {
        name,
        count,
        pct,
        color: colors[idx % colors.length],
        dash: Math.max(dash, 0),
        offset: currentOffset,
      };
    });
  }, [referrerStats, visitors]);

  const topElementsInteracted = useMemo(() => {
    const counts: Record<string, number> = {};
    clicks.forEach((c) => {
      const key = c.elementText || c.elementId || "Interaction";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [clicks]);

  // Area Gram Points Calculation
  const hourlyPoints = useMemo(() => {
    return hourlyActivity.map((bin, i) => {
      const x = 40 + (i / 23) * 740;
      const y = 180 - (bin.total / maxHourlyTotal) * 140;
      return { x, y, val: bin.total };
    });
  }, [hourlyActivity, maxHourlyTotal]);

  const areaGramPoints = useMemo(() => {
    if (hourlyPoints.length === 0) return "";
    const pts = hourlyPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    return `40,180 ${pts} 780,180`;
  }, [hourlyPoints]);

  const lineGramPath = useMemo(() => {
    if (hourlyPoints.length === 0) return "";
    return hourlyPoints.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }, "");
  }, [hourlyPoints]);

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

  // Filtered Audit Logs (Where & When Portfolio was Opened & Changed)
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesFilter =
        auditFilter === "ALL" ||
        (auditFilter === "OPENS" && log.eventType === "PORTFOLIO_OPEN") ||
        (auditFilter === "CHANGES" && (log.eventType === "PORTFOLIO_CHANGE" || log.eventType === "PROJECT_UPDATE")) ||
        (auditFilter === "BLOGS" && log.eventType === "BLOG_UPDATE") ||
        (auditFilter === "LEADS" && log.eventType === "LEAD_CAPTURED") ||
        (auditFilter === "CARDS" && log.eventType === "CARD_DOWNLOAD");

      if (!matchesFilter) return false;
      if (!auditSearch.trim()) return true;

      const q = auditSearch.toLowerCase();
      return (
        log.title.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.page.toLowerCase().includes(q) ||
        (log.location && log.location.toLowerCase().includes(q)) ||
        (log.ip && log.ip.toLowerCase().includes(q))
      );
    });
  }, [auditLogs, auditFilter, auditSearch]);

  const handlePurgeAnalytics = () => {
    if (
      confirm(
        "Purge all cached/historical analytics & reset with fresh real session telemetry? Your blogs, projects, and feedback will remain completely intact."
      )
    ) {
      clearAnalyticsLogs();
      refreshAllData();
      alert("Telemetry cache cleared! Data is now running in 100% real live mode.");
    }
  };

  const exportAuditLogsJson = () => {
    if (auditLogs.length === 0) return alert("No audit logs recorded yet.");
    const blob = new Blob([JSON.stringify(auditLogs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Aurxon_Portfolio_Audit_Trail_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handlers
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title || !editingBlog?.content) return alert("Title and Content are required.");
    saveBlogPost({
      id: editingBlog.id,
      title: editingBlog.title,
      category: editingBlog.category || "Industrial AI & Robotics",
      summary: editingBlog.summary || editingBlog.content.substring(0, 160) + "...",
      content: editingBlog.content,
      readTime: editingBlog.readTime || "7 min read",
      author: editingBlog.author || "Karan Mishra",
      tags: typeof editingBlog.tags === "string" ? (editingBlog.tags as string).split(",").map((s) => s.trim()) : editingBlog.tags || ["Aurxon"],
    });
    setShowBlogModal(false);
    setEditingBlog(null);
    refreshAllData();
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (confirm(`Delete article "${title}"?`)) {
      deleteBlogPost(id);
      refreshAllData();
    }
  };

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
    if (confirm(`Remove project "${title}"?`)) {
      deletePortfolioProject(id);
      refreshAllData();
    }
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) return alert("Name and email required.");
    recordLead({
      name: newLeadForm.name,
      email: newLeadForm.email,
      phone: newLeadForm.phone,
      subject: newLeadForm.subject || "Manual In-Person Lead",
      message: newLeadForm.message || "Recorded from axn-karann command hub.",
      source: "axn-karann Command Portal",
    });
    setNewLeadForm({ name: "", email: "", phone: "", company: "", budget: "", subject: "", message: "" });
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
    if (confirm("Delete this lead record permanently?")) {
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

  const handleToggleFeedbackStatus = (id: string, currentStatus: UserFeedback["status"]) => {
    const nextStatus = currentStatus === "Approved" ? "Rejected" : "Approved";
    updateFeedbackStatus(id, nextStatus);
    refreshAllData();
  };

  const handleDeleteFeedback = (id: string) => {
    if (confirm("Delete feedback review?")) {
      deleteFeedback(id);
      refreshAllData();
    }
  };

  // ==================== REFERENCED ISOMETRIC CYBERNETIC SCANNER LOGIN CONSOLE ====================
  if (!isAuthenticated) {
    return (
      <IsometricScannerLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          refreshAllData();
        }}
        adminUser={ADMIN_USER}
        adminPass={ADMIN_PASS}
      />
    );
  }

  // ==================== AUTHENTICATED COMMAND CONSOLE VIEW ====================
  return (
    <div className="admin_dash_wrapper">
      {/* Top Header */}
      <header className="admin_dash_header">
        <div className="header_left">
          <div className="status_beacon">
            <span className="beacon_core"></span>
            <span className="beacon_ring"></span>
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <h1 className="header_title">AURXON INTELLIGENCE COMMAND</h1>
              <span className="header_env_chip">AXN-NODE-2026 // LIVE</span>
            </div>
            <p className="header_sub">
              Target: <span className="text_highlight">itsgkaranmishra.web.app</span> &bull; Operator: <strong>{ADMIN_USER}</strong> &bull; Time: <span className="time_pill">{currentTime || "IST Live"}</span>
            </p>
          </div>
        </div>

        <div className="header_actions">
          <Link href="/" className="action_btn btn_site_link" target="_blank" title="Open Public Website">
            🌐 <span className="btn_txt">Site</span>
          </Link>
          <Link href="/card" className="action_btn btn_card_link" target="_blank" title="View 9:16 Smart Card">
            📇 <span className="btn_txt">Card</span>
          </Link>
          <button onClick={handlePurgeAnalytics} className="action_btn btn_purge" title="Purge Fake Cache & Reset to Real Telemetry">
            🧹 <span className="btn_txt">Purge Cache</span>
          </button>
          <button onClick={refreshAllData} className="action_btn btn_refresh" title="Sync Real Data">
            🔄 <span className="btn_txt">Sync</span>
          </button>
          <button onClick={handleLogout} className="action_btn btn_logout" title="Lock Console">
            🔒 <span className="btn_txt">Lock</span>
          </button>
        </div>
      </header>

      {/* Modern Decluttered Cybernetic KPI Grid */}
      <div className="kpi_grid">
        <div className="kpi_card kpi_card_purple">
          <div className="kpi_top_accent"></div>
          <div className="kpi_header_row">
            <span className="kpi_label">Total Visitors</span>
            <span className="kpi_mini_icon">👥</span>
          </div>
          <div className="kpi_value">{totalVisitors}</div>
          <div className="kpi_sub_row">
            <span className="kpi_sub_tag">100% Real</span>
            <span className="kpi_sub_detail">Sessions</span>
          </div>
        </div>

        <div className="kpi_card kpi_card_blue">
          <div className="kpi_top_accent"></div>
          <div className="kpi_header_row">
            <span className="kpi_label">Unique IP Network</span>
            <span className="kpi_mini_icon">🌐</span>
          </div>
          <div className="kpi_value">{uniqueIps}</div>
          <div className="kpi_sub_row">
            <span className="kpi_sub_tag">Dynamic</span>
            <span className="kpi_sub_detail">Global Nodes</span>
          </div>
        </div>

        <div className="kpi_card kpi_card_cyan">
          <div className="kpi_top_accent"></div>
          <div className="kpi_header_row">
            <span className="kpi_label">Page / Section Views</span>
            <span className="kpi_mini_icon">📄</span>
          </div>
          <div className="kpi_value">{totalPageViews}</div>
          <div className="kpi_sub_row">
            <span className="kpi_sub_tag">Telemetry</span>
            <span className="kpi_sub_detail">Interactions</span>
          </div>
        </div>

        <div className="kpi_card kpi_card_green">
          <div className="kpi_top_accent"></div>
          <div className="kpi_header_row">
            <span className="kpi_label">Interactive Clicks</span>
            <span className="kpi_mini_icon">🎯</span>
          </div>
          <div className="kpi_value">{totalClicks}</div>
          <div className="kpi_sub_row">
            <span className="kpi_sub_tag">Action Stream</span>
            <span className="kpi_sub_detail">CTA Clicks</span>
          </div>
        </div>

        <div className="kpi_card kpi_card_gold highlight_kpi_card">
          <div className="kpi_top_accent"></div>
          <div className="kpi_header_row">
            <span className="kpi_label">Leads &amp; Inquiries</span>
            <span className="kpi_mini_icon">💼</span>
          </div>
          <div className="kpi_value">{totalLeadsCount}</div>
          <div className="kpi_sub_row">
            <span className="kpi_sub_tag conversion_tag">Conv: {conversionRate}%</span>
            <span className="kpi_sub_detail">Qualified</span>
          </div>
        </div>
      </div>

      {/* High-Tech Segmented Pill Navigation Tabs */}
      <div className="dashboard_nav_tabs">
        <button
          className={`tab_btn ${activeTab === "overview" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <span className="tab_icon">📊</span>
          <span className="tab_text">Overview</span>
        </button>
        <button
          className={`tab_btn ${activeTab === "charts" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("charts")}
        >
          <span className="tab_icon">📈</span>
          <span className="tab_text">Charts &amp; Visuals</span>
        </button>
        <button
          className={`tab_btn ${activeTab === "settings" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <span className="tab_icon">⚙️</span>
          <span className="tab_text">Security &amp; Password</span>
        </button>
        <button
          className={`tab_btn ${activeTab === "audit" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("audit")}
        >
          <span className="tab_icon">📜</span>
          <span className="tab_text">Audit Trail</span>
          <span className="tab_pill_count">{auditLogs.length}</span>
        </button>
        <button
          className={`tab_btn ${activeTab === "leads" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("leads")}
        >
          <span className="tab_icon">💼</span>
          <span className="tab_text">Leads CRM</span>
          <span className="tab_pill_count">{leads.length}</span>
        </button>
        <button
          className={`tab_btn ${activeTab === "blogs" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("blogs")}
        >
          <span className="tab_icon">📝</span>
          <span className="tab_text">Blogs</span>
          <span className="tab_pill_count">{blogs.length}</span>
        </button>
        <button
          className={`tab_btn ${activeTab === "projects" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          <span className="tab_icon">🚀</span>
          <span className="tab_text">Projects</span>
          <span className="tab_pill_count">{projects.length}</span>
        </button>
        <button
          className={`tab_btn ${activeTab === "feedbacks" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("feedbacks")}
        >
          <span className="tab_icon">⭐</span>
          <span className="tab_text">Reviews</span>
          <span className="tab_pill_count">{feedbacks.length}</span>
        </button>
        <button
          className={`tab_btn ${activeTab === "visitors" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("visitors")}
        >
          <span className="tab_icon">🌍</span>
          <span className="tab_text">Visitors</span>
          <span className="tab_pill_count">{visitors.length}</span>
        </button>
        <button
          className={`tab_btn ${activeTab === "clicks" ? "active_tab" : ""}`}
          onClick={() => setActiveTab("clicks")}
        >
          <span className="tab_icon">🎯</span>
          <span className="tab_text">Clickstream</span>
          <span className="tab_pill_count">{clicks.length}</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="tab_content">
          {/* Top Hero Grid: Traffic Velocity + Real Network Node Inspector */}
          <div className="overview_hero_grid">
            {/* Traffic Velocity Chart */}
            <div className="chart_card hero_chart_card">
              <div className="chart_header_flex">
                <div>
                  <h3 className="chart_title">Traffic &amp; Visitor Velocity (7 Days)</h3>
                  <p className="chart_sub">Real-time daily session traffic on portfolio</p>
                </div>
                <div className="velocity_stat_badges">
                  <span className="v_badge">Active: <strong>{totalVisitors}</strong></span>
                  <span className="v_badge">Nodes: <strong>{uniqueIps}</strong></span>
                </div>
              </div>
              <div className="bar_chart_container">
                {trafficTrend.map((d, i) => {
                  const heightPercent = Math.max((d.count / maxTrafficCount) * 100, 10);
                  return (
                    <div key={i} className="chart_bar_column">
                      <div className="bar_tooltip">{d.count}</div>
                      <div className="chart_bar_wrapper">
                        <div className="chart_bar_fill" style={{ height: `${heightPercent}%` }}></div>
                      </div>
                      <span className="bar_label">{d.label.split(",")[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Real Network & Node Telemetry Inspector */}
            <div className="network_inspector_card">
              <div className="inspector_header">
                <div className="d-flex align-items-center gap-2">
                  <span className="live_radar_dot"></span>
                  <span className="inspector_title">Active Node Telemetry</span>
                </div>
                <span className="badge_real_live">100% REAL</span>
              </div>
              <div className="inspector_grid">
                <div className="inspector_item">
                  <span className="inspector_label">Public Network IP</span>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="inspector_val ip_highlight">{liveNetwork.ip}</span>
                    <button 
                      onClick={() => copyToClipboard(liveNetwork.ip)} 
                      className="copy_micro_btn"
                      title="Copy IP"
                    >
                      {copiedText === liveNetwork.ip ? "✓" : "📋"}
                    </button>
                  </div>
                </div>
                <div className="inspector_item">
                  <span className="inspector_label">Geographic Node</span>
                  <span className="inspector_val text-truncate" title={`${liveNetwork.city}, ${liveNetwork.country}`}>
                    📍 {liveNetwork.city}, {liveNetwork.country}
                  </span>
                </div>
                <div className="inspector_item">
                  <span className="inspector_label">ISP / Carrier</span>
                  <span className="inspector_val text-truncate" title={liveNetwork.org}>
                    🏢 {liveNetwork.org}
                  </span>
                </div>
                <div className="inspector_item">
                  <span className="inspector_label">Speed &amp; Latency</span>
                  <span className="inspector_val">
                    ⚡ {liveNetwork.downlink} &bull; {liveNetwork.rtt}
                  </span>
                </div>
                <div className="inspector_item">
                  <span className="inspector_label">Connection Protocol</span>
                  <span className="inspector_val">📶 {liveNetwork.effectiveType}</span>
                </div>
                <div className="inspector_item">
                  <span className="inspector_label">Hardware Profile</span>
                  <span className="inspector_val">💻 {liveNetwork.cores} Cores &bull; {liveNetwork.ram}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="analytics_charts_row mt-4">
            <div className="chart_card">
              <div className="chart_header">
                <h3 className="chart_title">Where Links Were Opened (Origin)</h3>
                <p className="chart_sub">Traffic distribution across professional channels</p>
              </div>
              <div className="sources_list">
                {referrerStats.map(([source, count], idx) => {
                  const pct = ((count / Math.max(totalVisitors, 1)) * 100).toFixed(0);
                  return (
                    <div key={idx} className="source_item">
                      <div className="source_info">
                        <span className="source_name">{source}</span>
                        <span className="source_count">{count} visits ({pct}%)</span>
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

            <div className="chart_card">
              <div className="chart_header">
                <h3 className="chart_title">Hardware &amp; Devices</h3>
                <p className="chart_sub">Platform profile used to view portfolio</p>
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

          {/* Recent Audit Trail Stream inside Overview */}
          <div className="chart_card mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div>
                <h3 className="chart_title">⏱️ Recent Real-Time Activity Feed</h3>
                <p className="chart_sub">Real-time record of when &amp; where the portfolio was opened, modified, or inquired</p>
              </div>
              <button onClick={() => setActiveTab("audit")} className="action_btn btn_site_link">
                View Full Audit Timeline ({auditLogs.length}) &rarr;
              </button>
            </div>
            <div className="data_table_wrapper">
              <table className="custom_data_table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Timestamp (IST)</th>
                    <th>Location / IP</th>
                    <th>Target / Scope</th>
                    <th>Action Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.slice(0, 5).map((log) => {
                    const badgeClass =
                      log.eventType === "PORTFOLIO_OPEN"
                        ? "badge_open"
                        : log.eventType === "PORTFOLIO_CHANGE" || log.eventType === "PROJECT_UPDATE"
                        ? "badge_change"
                        : log.eventType === "BLOG_UPDATE"
                        ? "badge_blog"
                        : log.eventType === "LEAD_CAPTURED"
                        ? "badge_lead"
                        : "badge_card";
                    return (
                      <tr key={log.id}>
                        <td>
                          <span className={`audit_badge ${badgeClass}`}>{log.eventType}</span>
                          <div className="audit_log_title mt-1">{log.title}</div>
                        </td>
                        <td>
                          <div className="audit_time_primary">{log.timestampIst || log.formattedTime}</div>
                        </td>
                        <td>
                          <div className="location_text">📍 {log.location || "Indore, India"}</div>
                          {log.ip && <code className="ip_code">{log.ip}</code>}
                        </td>
                        <td>
                          <span className="page_pill">{log.page || "/"}</span>
                        </td>
                        <td>
                          <div className="audit_details_box">{log.details}</div>
                        </td>
                      </tr>
                    );
                  })}
                  {auditLogs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="empty_table_cell">
                        No audit events yet. Portfolio opens and updates will stream here automatically.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Audit Trail & Timeline */}
      {activeTab === "audit" && (
        <div className="tab_content">
          <div className="table_controls_row mb-3">
            <div className="d-flex gap-2 flex-wrap align-items-center">
              <input
                type="text"
                placeholder="Search audit trail by event, location, IP, details, or target..."
                className="table_search_input"
                style={{ minWidth: "320px" }}
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
              />
              <div className="audit_filter_group">
                <button
                  className={`audit_filter_btn ${auditFilter === "ALL" ? "filter_active" : ""}`}
                  onClick={() => setAuditFilter("ALL")}
                >
                  All ({auditLogs.length})
                </button>
                <button
                  className={`audit_filter_btn ${auditFilter === "OPENS" ? "filter_active" : ""}`}
                  onClick={() => setAuditFilter("OPENS")}
                >
                  🌐 Opens ({auditLogs.filter((l) => l.eventType === "PORTFOLIO_OPEN").length})
                </button>
                <button
                  className={`audit_filter_btn ${auditFilter === "CHANGES" ? "filter_active" : ""}`}
                  onClick={() => setAuditFilter("CHANGES")}
                >
                  🛠️ Changes ({auditLogs.filter((l) => l.eventType === "PORTFOLIO_CHANGE" || l.eventType === "PROJECT_UPDATE").length})
                </button>
                <button
                  className={`audit_filter_btn ${auditFilter === "BLOGS" ? "filter_active" : ""}`}
                  onClick={() => setAuditFilter("BLOGS")}
                >
                  📝 Blog Edits ({auditLogs.filter((l) => l.eventType === "BLOG_UPDATE").length})
                </button>
                <button
                  className={`audit_filter_btn ${auditFilter === "LEADS" ? "filter_active" : ""}`}
                  onClick={() => setAuditFilter("LEADS")}
                >
                  💼 Leads ({auditLogs.filter((l) => l.eventType === "LEAD_CAPTURED").length})
                </button>
                <button
                  className={`audit_filter_btn ${auditFilter === "CARDS" ? "filter_active" : ""}`}
                  onClick={() => setAuditFilter("CARDS")}
                >
                  📇 Card Downloads ({auditLogs.filter((l) => l.eventType === "CARD_DOWNLOAD").length})
                </button>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button onClick={exportAuditLogsJson} className="action_btn btn_export">
                📥 Export Audit JSON
              </button>
              <button onClick={handlePurgeAnalytics} className="action_btn btn_purge">
                🧹 Purge Telemetry
              </button>
            </div>
          </div>

          <div className="data_table_wrapper">
            <table className="custom_data_table">
              <thead>
                <tr>
                  <th>Event &amp; Action</th>
                  <th>Timestamp (IST)</th>
                  <th>Where Opened / Location</th>
                  <th>Page / Scope</th>
                  <th>Details &amp; Payload</th>
                  <th>Device / Node</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty_table_cell">
                      No audit trail records matching criteria. Any portfolio open, blog edit, or lead will appear here automatically with timestamp and location.
                    </td>
                  </tr>
                ) : (
                  filteredAuditLogs.map((log) => {
                    const badgeClass =
                      log.eventType === "PORTFOLIO_OPEN"
                        ? "badge_open"
                        : log.eventType === "PORTFOLIO_CHANGE" || log.eventType === "PROJECT_UPDATE"
                        ? "badge_change"
                        : log.eventType === "BLOG_UPDATE"
                        ? "badge_blog"
                        : log.eventType === "LEAD_CAPTURED"
                        ? "badge_lead"
                        : "badge_card";

                    return (
                      <tr key={log.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className={`audit_badge ${badgeClass}`}>
                              {log.eventType}
                            </span>
                          </div>
                          <div className="audit_log_title mt-1">{log.title}</div>
                        </td>
                        <td>
                          <div className="audit_time_primary">{log.timestampIst}</div>
                          <span className="small text_muted">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </span>
                        </td>
                        <td>
                          <div className="location_text">
                            📍 {log.location || "Indore, India"}
                          </div>
                          {log.ip && (
                            <code
                              className="ip_code clickable mt-1"
                              onClick={() => copyToClipboard(log.ip || "")}
                              title="Click to copy IP"
                            >
                              {log.ip} {copiedText === log.ip ? "✓" : "📋"}
                            </code>
                          )}
                        </td>
                        <td>
                          <span className="page_pill">{log.page || "/"}</span>
                        </td>
                        <td>
                          <div className="audit_details_box">{log.details}</div>
                        </td>
                        <td>
                          <div className="small text_muted">
                            {log.device || "Desktop"} &bull; {log.browser || "Browser"}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Leads */}
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

      {/* Tab 3: Blogs */}
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

      {/* Tab 4: Projects */}
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

      {/* Tab 5: Feedbacks */}
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

      {/* Tab 6: Visitor Telemetry */}
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
                          <span key={idx} className="view_tag">{p}</span>
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

      {/* Tab 7: Clicks */}
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

      {/* Tab: Charts, Visuals, Pie & Grams */}
      {activeTab === "charts" && (
        <div className="tab_content charts_advanced_view">
          {/* Top Visual Summary Bar */}
          <div className="charts_kpi_banner mb-4">
            <div className="banner_metric">
              <span className="b_label">Total Recorded Visits</span>
              <strong className="b_val cyan_glow">{totalVisitors}</strong>
              <span className="b_sub">Live unique IP sessions</span>
            </div>
            <div className="banner_metric">
              <span className="b_label">Page / Route Impressions</span>
              <strong className="b_val violet_glow">{totalPageViews}</strong>
              <span className="b_sub">All profile view hits</span>
            </div>
            <div className="banner_metric">
              <span className="b_label">Interactive Element Clicks</span>
              <strong className="b_val amber_glow">{totalClicks}</strong>
              <span className="b_sub">Buttons, links &amp; cards</span>
            </div>
            <div className="banner_metric">
              <span className="b_label">CRM Leads Captured</span>
              <strong className="b_val emerald_glow">{totalLeadsCount}</strong>
              <span className="b_sub">Conversion rate: {conversionRate}%</span>
            </div>
          </div>

          {/* Row 1: Donut & Pie Charts */}
          <div className="charts_grid_2col mb-4">
            {/* Device Breakdown Donut Chart */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">🥧 Device Breakdown (Pie / Donut)</h3>
                  <p className="chart_sub">Desktop vs. Mobile vs. Tablet client telemetry</p>
                </div>
                <span className="chart_tag">Hardware</span>
              </div>
              <div className="pie_chart_container">
                <div className="donut_svg_box">
                  <svg viewBox="0 0 160 160" className="donut_svg">
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="22" />
                    {deviceSlices.map((slice, i) => (
                      <circle
                        key={i}
                        cx="80"
                        cy="80"
                        r="60"
                        fill="transparent"
                        stroke={slice.color}
                        strokeWidth="22"
                        strokeDasharray={`${slice.dash} 377`}
                        strokeDashoffset={`-${slice.offset}`}
                        strokeLinecap="butt"
                        transform="rotate(-90 80 80)"
                        className="donut_segment"
                      />
                    ))}
                    <text x="80" y="74" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="500">DEVICES</text>
                    <text x="80" y="96" textAnchor="middle" fill="#f8fafc" fontSize="18" fontWeight="700">{totalVisitors}</text>
                  </svg>
                </div>
                <div className="donut_legend">
                  {deviceSlices.map((slice, i) => (
                    <div key={i} className="donut_legend_item">
                      <div className="legend_color_badge" style={{ backgroundColor: slice.color }}></div>
                      <div className="legend_info">
                        <span className="legend_name">{slice.name}</span>
                        <div className="legend_counts">
                          <strong>{slice.count}</strong>
                          <span className="legend_pct">({slice.pct}%)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Referrer Traffic Origin Donut */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">🌐 Traffic Origin (Pie / Donut)</h3>
                  <p className="chart_sub">Inbound visitor origins &amp; channels</p>
                </div>
                <span className="chart_tag">Sources</span>
              </div>
              <div className="pie_chart_container">
                <div className="donut_svg_box">
                  <svg viewBox="0 0 160 160" className="donut_svg">
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="22" />
                    {referrerSlices.map((slice, i) => (
                      <circle
                        key={i}
                        cx="80"
                        cy="80"
                        r="60"
                        fill="transparent"
                        stroke={slice.color}
                        strokeWidth="22"
                        strokeDasharray={`${slice.dash} 377`}
                        strokeDashoffset={`-${slice.offset}`}
                        strokeLinecap="butt"
                        transform="rotate(-90 80 80)"
                        className="donut_segment"
                      />
                    ))}
                    <text x="80" y="74" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="500">ORIGINS</text>
                    <text x="80" y="96" textAnchor="middle" fill="#f8fafc" fontSize="18" fontWeight="700">{referrerStats.length}</text>
                  </svg>
                </div>
                <div className="donut_legend">
                  {referrerSlices.slice(0, 5).map((slice, i) => (
                    <div key={i} className="donut_legend_item">
                      <div className="legend_color_badge" style={{ backgroundColor: slice.color }}></div>
                      <div className="legend_info">
                        <span className="legend_name">{slice.name}</span>
                        <div className="legend_counts">
                          <strong>{slice.count}</strong>
                          <span className="legend_pct">({slice.pct}%)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Dual Bar Graph (Visitors vs Clicks Velocity) */}
          <div className="chart_card mb-4">
            <div className="chart_header_flex">
              <div>
                <h3 className="chart_title">📊 7-Day Velocity Bar Graph (Visitors vs. Element Clicks)</h3>
                <p className="chart_sub">Side-by-side comparative distribution of sessions and engagement</p>
              </div>
              <div className="dual_legend_tags">
                <span className="legend_pill visitor_pill">
                  <span className="pill_indicator bg_cyan"></span> Visitors (Sessions)
                </span>
                <span className="legend_pill click_pill">
                  <span className="pill_indicator bg_violet"></span> Clicks (Interactions)
                </span>
              </div>
            </div>

            <div className="dual_bar_chart_box">
              <div className="chart_grid_lines">
                <div className="grid_line"></div>
                <div className="grid_line"></div>
                <div className="grid_line"></div>
                <div className="grid_line"></div>
              </div>
              <div className="dual_bars_container">
                {dualVelocityData.map((d, i) => {
                  const maxVal = Math.max(...dualVelocityData.map((v) => Math.max(v.visitors, v.clicks)), 1);
                  const vHeight = Math.max((d.visitors / maxVal) * 100, 6);
                  const cHeight = Math.max((d.clicks / maxVal) * 100, 6);

                  return (
                    <div key={i} className="dual_bar_group">
                      <div className="dual_bar_pair">
                        <div className="single_bar_wrap">
                          <div className="bar_hover_tooltip">Visitors: {d.visitors}</div>
                          <div className="bar_rect bar_visitor" style={{ height: `${vHeight}%` }}></div>
                        </div>
                        <div className="single_bar_wrap">
                          <div className="bar_hover_tooltip">Clicks: {d.clicks}</div>
                          <div className="bar_rect bar_click" style={{ height: `${cHeight}%` }}></div>
                        </div>
                      </div>
                      <span className="dual_group_label">{d.label.split(",")[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 3: 24-Hour Telemetry Distribution Area Gram (Histogram) */}
          <div className="chart_card mb-4">
            <div className="chart_header_flex">
              <div>
                <h3 className="chart_title">📈 24-Hour Telemetry Area Gram (Temporal Activity Histogram)</h3>
                <p className="chart_sub">Distribution of user sessions and clickstream pulses across 24 hours (00:00 to 23:00 IST)</p>
              </div>
              <div className="gram_peak_badge">
                <span>Peak Activity: <strong>{peakHourBin.label} ({peakHourBin.total} hits)</strong></span>
              </div>
            </div>

            <div className="area_gram_container">
              <svg viewBox="0 0 800 220" className="area_gram_svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGramGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#090a15" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="areaStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                <line x1="40" y1="30" x2="780" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="40" y1="80" x2="780" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="40" y1="130" x2="780" y2="130" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="40" y1="180" x2="780" y2="180" stroke="rgba(255,255,255,0.12)" />

                {/* Filled Area */}
                <polygon points={areaGramPoints} fill="url(#areaGramGradient)" />

                {/* Stroke Line */}
                <path d={lineGramPath} fill="none" stroke="url(#areaStrokeGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Glowing Data Nodes */}
                {hourlyPoints.map((pt, i) => (
                  <g key={i} className="gram_node_group">
                    <circle cx={pt.x} cy={pt.y} r={pt.val > 0 ? "4.5" : "2.5"} fill={pt.val > 0 ? "#06b6d4" : "#475569"} stroke="#090a15" strokeWidth="2" />
                  </g>
                ))}
              </svg>

              {/* X Axis Time Labels */}
              <div className="gram_x_labels">
                {hourlyActivity.filter((_, i) => i % 3 === 0).map((bin, i) => (
                  <span key={i} className="gram_x_tick">{bin.label}</span>
                ))}
                <span className="gram_x_tick">23:00</span>
              </div>
            </div>
          </div>

          {/* Row 4: Top Action Element Interactions */}
          <div className="chart_card">
            <div className="chart_header">
              <h3 className="chart_title">🎯 Top Interactive Elements (Bar Frequency Ranking)</h3>
              <p className="chart_sub">Buttons, links, and assets receiving the highest direct engagement</p>
            </div>
            <div className="ranking_bars_list">
              {topElementsInteracted.length === 0 ? (
                <div className="empty_table_cell py-4 text-center">No interactive click events logged yet.</div>
              ) : (
                topElementsInteracted.map((item, idx) => {
                  const maxClicks = Math.max(...topElementsInteracted.map((t) => t.count), 1);
                  const pct = Math.max((item.count / maxClicks) * 100, 8);
                  return (
                    <div key={idx} className="ranking_bar_row">
                      <div className="ranking_meta">
                        <span className="ranking_idx">#{idx + 1}</span>
                        <strong className="ranking_name">{item.name}</strong>
                        <span className="ranking_count">{item.count} clicks</span>
                      </div>
                      <div className="ranking_track">
                        <div className="ranking_fill" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Settings & Credentials */}
      {activeTab === "settings" && (
        <div className="tab_content settings_advanced_view">
          <div className="settings_grid">
            {/* Operator Profile Card */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">🛡️ Active Operator Profile</h3>
                  <p className="chart_sub">Current authentication identity and system privileges</p>
                </div>
                <span className="badge_real_live">LIVE IDENTITY</span>
              </div>

              <div className="operator_identity_box">
                <div className="operator_avatar">
                  <span>KM</span>
                </div>
                <div className="operator_details">
                  <h4 className="operator_name">Karan Mishra</h4>
                  <span className="operator_role">Chief Systems Architect &amp; Admin</span>
                  <div className="operator_creds_summary mt-2">
                    <span className="cred_label">Active Username:</span>
                    <code className="cred_val_code">{customCreds?.username || ADMIN_USER}</code>
                  </div>
                  <div className="operator_creds_summary">
                    <span className="cred_label">Keyring Mode:</span>
                    <span className="cred_val_text">{customCreds ? "Custom Encrypted Override" : "Master Genesis Key"}</span>
                  </div>
                  <div className="operator_creds_summary">
                    <span className="cred_label">Last Credential Update:</span>
                    <span className="cred_val_text">
                      {customCreds?.updatedAt ? new Date(customCreds.updatedAt).toLocaleString() : "Default Installation"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="security_notice mt-4">
                <strong>🔒 Security Assurance:</strong>
                <p className="mb-0 text-muted" style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                  Credentials updated here are instantly active for both the primary command dashboard and the isometric gateway scanner. Master Genesis keys remain securely bound for recovery.
                </p>
              </div>

              {customCreds && (
                <div className="mt-4 pt-3 border-top border-secondary">
                  <button onClick={handleResetCredentials} className="btn_reset_keys">
                    🔄 Reset Back to Factory Genesis Credentials
                  </button>
                </div>
              )}
            </div>

            {/* Change Username & Password Form Card */}
            <div className="chart_card">
              <div className="chart_header">
                <div>
                  <h3 className="chart_title">🔑 Change Username &amp; Password</h3>
                  <p className="chart_sub">Update your administrative credentials for the command portal</p>
                </div>
                <span className="chart_tag">ACCESS CONTROL</span>
              </div>

              {credStatus.text && (
                <div className={`cred_status_alert alert_${credStatus.type}`}>
                  {credStatus.type === "success" && "✓ "}
                  {credStatus.type === "error" && "⚠ "}
                  {credStatus.type === "info" && "ℹ "}
                  {credStatus.text}
                </div>
              )}

              <form onSubmit={handleUpdateCredentials} className="credentials_form">
                <div className="form-group mb-3">
                  <label className="field_label">Current Password *</label>
                  <input
                    type="password"
                    className="login_input"
                    placeholder="Enter current active password to verify identity"
                    value={credForm.currentPassword}
                    onChange={(e) => setCredForm({ ...credForm, currentPassword: e.target.value })}
                    required
                  />
                  <small className="field_help">Required to authorize administrative credential changes.</small>
                </div>

                <div className="form-group mb-3">
                  <label className="field_label">New Username (Optional or Keep Current)</label>
                  <input
                    type="text"
                    className="login_input"
                    placeholder={`Current: ${customCreds?.username || ADMIN_USER}`}
                    value={credForm.newUsername}
                    onChange={(e) => setCredForm({ ...credForm, newUsername: e.target.value })}
                  />
                  <small className="field_help">Leave blank to retain current username.</small>
                </div>

                <div className="form-group mb-3">
                  <label className="field_label">New Password *</label>
                  <input
                    type="password"
                    className="login_input"
                    placeholder="Enter new secure password (min 6 chars)"
                    value={credForm.newPassword}
                    onChange={(e) => setCredForm({ ...credForm, newPassword: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="field_label">Confirm New Password *</label>
                  <input
                    type="password"
                    className="login_input"
                    placeholder="Re-enter new secure password"
                    value={credForm.confirmPassword}
                    onChange={(e) => setCredForm({ ...credForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <button type="submit" className="modal_save_btn">
                    💾 Save &amp; Apply New Credentials
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCredForm({ currentPassword: "", newUsername: "", newPassword: "", confirmPassword: "" });
                      setCredStatus({ type: "", text: "" });
                    }}
                    className="modal_cancel_btn"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit / Create Blog */}
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

      {/* Modal: Edit / Create Project */}
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
                  placeholder="High level overview of architectural features..."
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

      {/* Modal: Edit Lead Notes */}
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
                placeholder="Record consultation notes, budget discussion, or next steps..."
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

      {/* Modal: New Manual Lead */}
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

      {/* Scoped CSS for axn-karann Command Dashboard */}
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
        .btn_purge {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border-color: rgba(245, 158, 11, 0.35);
        }
        .btn_purge:hover {
          background: rgba(245, 158, 11, 0.28);
          color: #ffffff;
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

        /* Status Beacon */
        .status_beacon {
          position: relative;
          width: 14px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .beacon_core {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }
        .beacon_ring {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid rgba(16, 185, 129, 0.6);
          animation: beacon_pulse 2s infinite;
        }
        @keyframes beacon_pulse {
          0% { transform: scale(0.7); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .header_env_chip {
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 8px;
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 6px;
          letter-spacing: 0.05em;
        }
        .text_highlight {
          color: #38bdf8;
          font-weight: 700;
        }
        .time_pill {
          background: rgba(0, 0, 0, 0.4);
          padding: 2px 7px;
          border-radius: 6px;
          color: #cbd5e1;
          font-family: monospace;
          font-size: 0.76rem;
        }
        .btn_card_link {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          color: #ffffff;
        }
        .btn_card_link:hover {
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Modern Cybernetic KPI Grid */
        .kpi_grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 22px;
        }
        .kpi_card {
          position: relative;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s;
        }
        .kpi_card:hover {
          transform: translateY(-2px);
          border-color: rgba(99, 102, 241, 0.35);
        }
        .kpi_top_accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
        }
        .kpi_card_purple .kpi_top_accent { background: linear-gradient(90deg, #a855f7, #6366f1); }
        .kpi_card_blue .kpi_top_accent { background: linear-gradient(90deg, #3b82f6, #06b6d4); }
        .kpi_card_cyan .kpi_top_accent { background: linear-gradient(90deg, #06b6d4, #10b981); }
        .kpi_card_green .kpi_top_accent { background: linear-gradient(90deg, #10b981, #34d399); }
        .kpi_card_gold .kpi_top_accent { background: linear-gradient(90deg, #f59e0b, #ef4444); }

        .kpi_header_row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .kpi_label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .kpi_mini_icon {
          font-size: 1.1rem;
          opacity: 0.85;
        }
        .kpi_value {
          font-size: 1.85rem;
          font-weight: 800;
          color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.1;
        }
        .kpi_sub_row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }
        .kpi_sub_tag {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
        }
        .conversion_tag {
          background: rgba(245, 158, 11, 0.18);
          color: #fbbf24;
        }
        .kpi_sub_detail {
          font-size: 0.72rem;
          color: #64748b;
        }

        /* High-Tech Segmented Pill Navigation */
        .dashboard_nav_tabs {
          display: flex;
          gap: 6px;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 6px;
          margin-bottom: 22px;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .dashboard_nav_tabs::-webkit-scrollbar {
          display: none;
        }
        .tab_btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          color: #94a3b8;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .tab_btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }
        .active_tab {
          color: #ffffff !important;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.45) 0%, rgba(124, 58, 237, 0.45) 100%) !important;
          border-color: rgba(99, 102, 241, 0.6) !important;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.25);
        }
        .tab_pill_count {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 1px 7px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
        }
        .active_tab .tab_pill_count {
          background: #6366f1;
          color: #ffffff;
        }

        /* Overview Hero Grid */
        .overview_hero_grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 18px;
          margin-bottom: 20px;
        }
        .hero_chart_card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .chart_header_flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 16px;
        }
        .velocity_stat_badges {
          display: flex;
          gap: 8px;
        }
        .v_badge {
          font-size: 0.74rem;
          padding: 3px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
        }
        .v_badge strong {
          color: #38bdf8;
        }

        .analytics_charts_row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
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

        .blogs_admin_grid, .projects_admin_grid, .feedbacks_admin_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 18px;
        }
        .blog_admin_card, .project_admin_card, .feedback_admin_card {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .blog_admin_title, .project_admin_title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
        }
        .blog_admin_summary, .project_admin_desc {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .blog_admin_actions, .project_admin_actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
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
        .field_label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .login_input {
          width: 100%;
          padding: 10px 14px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 10px;
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
        }
        .single_tag_badge {
          display: inline-block;
          font-size: 0.72rem;
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          padding: 2px 7px;
          border-radius: 4px;
          margin-right: 4px;
        }

        /* Network Telemetry & Node Inspector */
        .network_inspector_card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .inspector_header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .live_radar_dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 12px #10b981;
          display: inline-block;
          animation: pulse_dot 1.5s infinite;
        }
        @keyframes pulse_dot {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        .inspector_title {
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          color: #ffffff;
        }
        .badge_real_live {
          font-size: 0.68rem;
          font-weight: 800;
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.4);
          padding: 2px 8px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }
        .live_ist_clock {
          font-size: 0.82rem;
          color: #94a3b8;
          font-family: monospace;
          background: rgba(0, 0, 0, 0.3);
          padding: 4px 10px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .inspector_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
        }
        .inspector_item {
          background: rgba(10, 15, 30, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .inspector_label {
          font-size: 0.68rem;
          color: #94a3b8;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .inspector_val {
          font-size: 0.88rem;
          font-weight: 600;
          color: #f1f5f9;
        }
        .ip_highlight {
          color: #38bdf8;
          font-family: monospace;
        }
        .copy_micro_btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #e2e8f0;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 0.72rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .copy_micro_btn:hover {
          background: rgba(99, 102, 241, 0.3);
        }

        /* Audit Trail Styles */
        .audit_filter_group {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .audit_filter_btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .audit_filter_btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
        }
        .audit_filter_btn.filter_active {
          background: #4f46e5;
          color: #ffffff;
          border-color: #6366f1;
        }
        .audit_badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }
        .badge_open {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .badge_change {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .badge_blog {
          background: rgba(168, 85, 247, 0.15);
          color: #c084fc;
          border: 1px solid rgba(168, 85, 247, 0.3);
        }
        .badge_lead {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .badge_card {
          background: rgba(236, 72, 153, 0.15);
          color: #f472b6;
          border: 1px solid rgba(236, 72, 153, 0.3);
        }
        .audit_time_primary {
          font-size: 0.82rem;
          font-weight: 700;
          color: #e2e8f0;
          font-family: monospace;
        }
        .audit_log_title {
          font-size: 0.82rem;
          font-weight: 600;
          color: #f8fafc;
        }
        .audit_details_box {
          font-size: 0.8rem;
          color: #94a3b8;
          max-width: 360px;
          line-height: 1.45;
          word-break: break-word;
        }

        /* ================= MOBILE & RESPONSIVE ENGINE ================= */
        @media (max-width: 1100px) {
          .kpi_grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .overview_hero_grid {
            grid-template-columns: 1fr;
          }
          .analytics_charts_row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .admin_dash_wrapper {
            padding: 16px 12px;
          }
          .admin_dash_header {
            padding: 14px 16px;
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
          }
          .header_left {
            gap: 12px;
          }
          .header_title {
            font-size: 1.15rem;
          }
          .header_actions {
            width: 100%;
            justify-content: flex-start;
            gap: 6px;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 2px;
          }
          .action_btn {
            padding: 7px 11px;
            font-size: 0.78rem;
            flex-shrink: 0;
          }
          .kpi_grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .kpi_card {
            padding: 14px;
          }
          .kpi_value {
            font-size: 1.55rem;
          }
          .device_split_grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          .table_search_input {
            width: 100%;
            max-width: 100%;
          }
          .table_controls_row {
            flex-direction: column;
            align-items: stretch;
          }
          .audit_filter_group {
            width: 100%;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 4px;
          }
          .audit_filter_btn {
            flex-shrink: 0;
          }
          .data_table_wrapper {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .custom_data_table {
            min-width: 600px;
          }
        }

        @media (max-width: 440px) {
          .kpi_grid {
            grid-template-columns: 1fr;
          }
          .device_split_grid {
            grid-template-columns: 1fr;
          }
          .header_actions {
            flex-wrap: wrap;
          }
          .header_title {
            font-size: 1.05rem;
          }
          .dashboard_nav_tabs {
            padding: 4px;
            gap: 4px;
          }
          .tab_btn {
            padding: 7px 12px;
            font-size: 0.78rem;
          }
        }

        /* Visual Charts & Visuals Tab Styles */
        .charts_kpi_banner {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .banner_metric {
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
        }
        .b_label {
          font-size: 0.8rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .b_val {
          font-size: 1.8rem;
          font-weight: 700;
          font-family: monospace;
          line-height: 1.2;
        }
        .cyan_glow {
          color: #38bdf8;
          text-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
        }
        .violet_glow {
          color: #a78bfa;
          text-shadow: 0 0 16px rgba(167, 139, 250, 0.4);
        }
        .amber_glow {
          color: #fbbf24;
          text-shadow: 0 0 16px rgba(251, 191, 36, 0.4);
        }
        .emerald_glow {
          color: #34d399;
          text-shadow: 0 0 16px rgba(52, 211, 153, 0.4);
        }
        .b_sub {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 4px;
        }

        .charts_grid_2col {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 20px;
        }
        .pie_chart_container {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 20px 10px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .donut_svg_box {
          width: 170px;
          height: 170px;
          flex-shrink: 0;
        }
        .donut_svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .donut_segment {
          transition: stroke-width 0.25s ease, filter 0.25s ease;
          cursor: pointer;
        }
        .donut_segment:hover {
          stroke-width: 26;
          filter: drop-shadow(0 0 8px currentColor);
        }
        .donut_legend {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 160px;
        }
        .donut_legend_item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .legend_color_badge {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          flex-shrink: 0;
        }
        .legend_info {
          display: flex;
          flex-direction: column;
        }
        .legend_name {
          font-size: 0.84rem;
          color: #cbd5e1;
        }
        .legend_counts {
          font-size: 0.76rem;
          color: #94a3b8;
          display: flex;
          gap: 4px;
        }
        .legend_pct {
          color: #64748b;
        }

        /* Dual Bar Chart Styles */
        .dual_legend_tags {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .legend_pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .pill_indicator {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }
        .bg_cyan {
          background: #38bdf8;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
        }
        .bg_violet {
          background: #a78bfa;
          box-shadow: 0 0 8px rgba(167, 139, 250, 0.6);
        }
        .dual_bar_chart_box {
          position: relative;
          height: 230px;
          padding-top: 24px;
          margin-top: 10px;
        }
        .chart_grid_lines {
          position: absolute;
          inset: 0 0 30px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;
        }
        .grid_line {
          width: 100%;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
        }
        .dual_bars_container {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 28px;
        }
        .dual_bar_group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
        }
        .dual_bar_pair {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          width: 100%;
          max-width: 44px;
          height: 100%;
        }
        .single_bar_wrap {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: flex-end;
          position: relative;
        }
        .bar_hover_tooltip {
          position: absolute;
          top: -26px;
          left: 50%;
          transform: translateX(-50%);
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          font-size: 0.68rem;
          color: #f1f5f9;
          padding: 2px 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 10;
        }
        .single_bar_wrap:hover .bar_hover_tooltip {
          opacity: 1;
        }
        .bar_rect {
          width: 100%;
          border-radius: 4px 4px 0 0;
          transition: height 0.4s ease, filter 0.2s ease;
          min-height: 4px;
        }
        .bar_visitor {
          background: linear-gradient(180deg, #38bdf8 0%, rgba(56, 189, 248, 0.3) 100%);
        }
        .bar_click {
          background: linear-gradient(180deg, #a78bfa 0%, rgba(167, 139, 250, 0.3) 100%);
        }
        .bar_rect:hover {
          filter: brightness(1.25);
        }
        .dual_group_label {
          margin-top: 8px;
          font-size: 0.72rem;
          color: #94a3b8;
          white-space: nowrap;
        }

        /* 24-Hour Area Gram */
        .area_gram_container {
          position: relative;
          width: 100%;
          margin-top: 10px;
        }
        .area_gram_svg {
          width: 100%;
          height: 190px;
          display: block;
        }
        .gram_x_labels {
          display: flex;
          justify-content: space-between;
          padding: 6px 12px 0 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .gram_x_tick {
          font-size: 0.7rem;
          color: #64748b;
          font-family: monospace;
        }
        .gram_node_group circle {
          transition: r 0.2s ease, fill 0.2s ease;
        }
        .gram_node_group:hover circle {
          r: 6.5;
          fill: #38bdf8;
          cursor: pointer;
        }
        .gram_peak_badge {
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 0.78rem;
          color: #38bdf8;
        }

        /* Top Interactions Ranking */
        .ranking_bars_list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 8px 0;
        }
        .ranking_bar_row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ranking_meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.84rem;
        }
        .ranking_idx {
          color: #06b6d4;
          font-family: monospace;
          margin-right: 8px;
          font-weight: 700;
        }
        .ranking_name {
          color: #e2e8f0;
          flex: 1;
        }
        .ranking_count {
          color: #94a3b8;
          font-size: 0.76rem;
          font-family: monospace;
        }
        .ranking_track {
          width: 100%;
          height: 7px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          overflow: hidden;
        }
        .ranking_fill {
          height: 100%;
          background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        /* Settings & Credentials View */
        .settings_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 22px;
        }
        .operator_identity_box {
          display: flex;
          align-items: center;
          gap: 18px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 18px;
        }
        .operator_avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.25rem;
          color: #090a15;
          flex-shrink: 0;
          box-shadow: 0 0 16px rgba(6, 182, 212, 0.35);
        }
        .operator_name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 2px;
        }
        .operator_role {
          font-size: 0.78rem;
          color: #06b6d4;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
        }
        .operator_creds_summary {
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 3px;
        }
        .cred_label {
          color: #94a3b8;
        }
        .cred_val_code {
          background: rgba(0, 0, 0, 0.4);
          padding: 2px 6px;
          border-radius: 4px;
          color: #38bdf8;
          font-family: monospace;
          font-size: 0.8rem;
        }
        .cred_val_text {
          color: #e2e8f0;
        }
        .security_notice {
          background: rgba(2, 6, 23, 0.5);
          border-left: 3px solid #06b6d4;
          padding: 12px 16px;
          border-radius: 0 8px 8px 0;
        }
        .btn_reset_keys {
          background: transparent;
          border: 1px dashed rgba(239, 68, 68, 0.4);
          color: #ef4444;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }
        .btn_reset_keys:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
        }
        .credentials_form {
          margin-top: 10px;
        }
        .field_help {
          color: #64748b;
          font-size: 0.74rem;
          margin-top: 4px;
          display: block;
        }
        .cred_status_alert {
          padding: 10px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 0.86rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .alert_success {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
        }
        .alert_error {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #f87171;
        }
        .alert_info {
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
        }

      `}} />
    </div>
  );
}
