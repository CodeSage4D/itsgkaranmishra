// Enterprise CMS Data Engine - Full Dynamic CRUD Architecture

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  image: string;
  summary: string;
  content: string; // Markdown or formatted text
  tags: string[];
  views: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: "AI/ML" | "Full-Stack" | "Enterprise" | "Mobile";
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

export interface UserFeedback {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  rating: number; // 1 to 5
  message: string;
  submittedAt: string;
  status: "Approved" | "Pending" | "Rejected";
  featuredOnHome: boolean;
}

const STORAGE_KEY_BLOGS = "ahs_cms_blogs_v2";
const STORAGE_KEY_PROJECTS = "ahs_cms_projects_v2";
const STORAGE_KEY_FEEDBACKS = "ahs_cms_feedbacks_v2";

// ================= INITIAL SEED DATA =================

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog_aims_fcos",
    slug: "aims-to-fcos-intelligent-factory-operating-systems",
    title: "From AIMS to FCOS: The Architectural Evolution of Intelligent Factory Operating Systems",
    category: "Industrial AI & Robotics",
    author: "Karan Mishra",
    authorRole: "Founder & AI Engineer, Aurxon",
    publishedDate: "September 28, 2026",
    readTime: "7 min read",
    image: "/img/blog/main-blog/m-blog-1.jpg",
    summary:
      "How Aurxon transformed its initial Artificial Intelligence Manufacturing System (AIMS) into the comprehensive Factory Central Operating System (FCOS) — moving from edge telemetry into autonomous, self-healing factory orchestration.",
    content: `
### The Genesis: Why AIMS Needed to Evolve

In early 2024, when we began architecting **AIMS (Artificial Intelligence Manufacturing System)**, our principal objective was solving the pervasive blind spots in mid-market manufacturing lines. Legacy factories operated with siloed PLCs, rudimentary SCADA interfaces, and reactive maintenance schedules that cost manufacturing facilities tens of thousands of dollars in unscheduled downtime every quarter.

AIMS initially provided machine telemetry aggregation, computer-vision defect classification on assembly belts, and vibrational anomaly detection for heavy rotational equipment. It was fast, accurate, and achieved sub-80 millisecond inference on edge tensor units.

Yet, as deployments grew across automotive components, textile mills, and metal fabrication plants, an inescapable realization emerged: **predicting a failure is only 20% of the battle. The true enterprise bottleneck is autonomous operational execution.**

---

### Re-Architecting into FCOS (Factory Central Operating System)

To bridge this operational divide, Aurxon completely redesigned AIMS from the ground up, giving rise to **FCOS: The Factory Central Operating System**. 

FCOS isn't just an analytical dashboard or telemetry visualizer; it operates as an **autonomous cyber-physical nervous system** for manufacturing plants. Here is what defines the new FCOS architecture:

1. **Deterministic Edge Orchestration (Micro-Edge Units):**
   Instead of piping multi-gigabyte video feeds and raw sensor arrays to the cloud, FCOS deploys localized containerized neural runtimes directly beside machine controllers. Inference happens in 12ms, operating uninterrupted even if upstream internet drops.

2. **Closed-Loop Feedback Actuation:**
   When FCOS identifies heat variance or vibrational harmonic resonance in a CNC spindle, it does not merely send an email alert. It dynamically interfaces with PLC registers via OPC-UA to step down feed-rates, modulates coolant delivery, and re-routes parallel jobs to secondary cutting bays without human intervention.

3. **Dynamic Material & Energy Optimization:**
   FCOS links shop-floor motor consumption with real-time grid energy tariff APIs. Energy-intensive stamping and forging operations are autonomously scheduled during off-peak power windows, driving a direct 18-24% reduction in peak manufacturing energy bills.

4. **Natural-Language Operator Copilot:**
   Shop-floor supervisors no longer navigate cryptic G-code or 500-page operational manuals. With FCOS Voice & Multimodal Copilot, technicians point a tablet camera at an anomalous hydraulic unit and ask, *"Why is pressure oscillating on valve 4B?"* FCOS cross-references real-time pressure transducers with schematics and provides step-by-step augmented repair guidance in real-time.

---

### Key Takeaways for Industrial AI Builders

The transition from AIMS to FCOS taught us that **industrial AI must be grounded in physical reality, deterministic safety guards, and immediate operational utility**. As we deploy FCOS v3.2 across international manufacturing partners, the future of the autonomous factory floor is no longer a speculative theory—it is already running in production today.
    `,
    tags: ["AIMS", "FCOS", "Industrial AI", "Edge Computing", "Smart Manufacturing", "Aurxon"],
    views: 1420,
  },
  {
    id: "blog_alams_enterprise",
    slug: "alams-autonomous-learning-agentic-management-systems",
    title: "ALAMS: Autonomous Learning Agentic Management Systems in Modern Enterprise Workflows",
    category: "Agentic AI & LLMs",
    author: "Karan Mishra",
    authorRole: "Founder & AI Engineer, Aurxon",
    publishedDate: "September 15, 2026",
    readTime: "9 min read",
    image: "/img/blog/main-blog/m-blog-2.jpg",
    summary:
      "A deep technical breakdown of ALAMS (Autonomous Learning Agentic Management Systems): moving past fragile single-prompt chatbots into robust, self-critiquing multi-agent networks that execute mission-critical corporate operations.",
    content: `
### Beyond the Chatbot: Why Traditional LLM Workflows Break in Enterprise

The 2023–2025 generative AI wave was dominated by conversational chatbots, document Q&A wrappers, and single-turn prompt chains. While impressive in demonstrations, these architectures consistently fail in production enterprise environments due to three fatal flaws:

1. **Context Window Drift & Compounding Hallucinations:** As multi-step tasks progress, errors in step 2 compound catastrophically by step 6.
2. **Lack of State Memory & Deterministic Accountability:** Chatbots cannot maintain transactional idempotency or rollback state when an external API call fails halfway.
3. **No Closed-Loop Verification:** There is no autonomous critic ensuring that generated code, generated financial reports, or ERP database mutations actually meet business invariants.

To solve this, Aurxon engineered **ALAMS (Autonomous Learning Agentic Management Systems)**.

---

### The Three Pillars of ALAMS Architecture

ALAMS functions as an enterprise multi-agent swarm where specialized cognitive agents collaborate, critique, and audit each other before any irreversible business action is executed.

#### 1. The Tri-Agent Consensus Loop
Every complex corporate directive assigned to ALAMS is routed through three distinct cognitive roles:
* **The Planner Agent:** Deconstructs high-level business goals (e.g. *"Audit quarterly vendor contracts, reconcile against SAP invoices, and flag discrepancies"*) into a Directed Acyclic Graph (DAG) of executable subtasks.
* **The Execution Agent Pool:** Domain-specific workers (SQL executor, PDF OCR extractor, Web Crawler, ERP Connector) that execute individual tasks in isolated, sandboxed environments.
* **The Critic & Verification Agent:** An adversarial agent tasked exclusively with discovering bugs, hallucinated numbers, or regulatory compliance violations in the Execution Agent's output. If the critic rejects the output, it feeds back targeted correction vectors until consensus is achieved.

#### 2. Vectorized Episodic Memory (VEM)
Unlike standard stateless LLM calls, ALAMS maintains a persistent episodic vector database. When an agent discovers an edge-case in an enterprise vendor contract format, that heuristic is indexed into its long-term vector memory. The next time any agent in the organization encounters a similar document, it retrieves the verified parsing pattern instantly.

#### 3. Human-in-the-Loop Safe Execution Gateways
For high-risk operations (e.g., executing transactions above $10,000, mutating core production database tables, or dispatching external legal documents), ALAMS pauses execution, generates an interactive diff summary, and requests cryptographic approval from an authorized human supervisor via Slack or WhatsApp.

---

### Results from Real-World Corporate Deployments

In real-world enterprise deployments across logistics, procurement, and technical customer operations, organizations running ALAMS achieved:
* **74% reduction** in manual document reconciliation overhead
* **Near-zero hallucination rates (<0.02%)** via multi-agent adversarial cross-checking
* **100% auditable execution traces** with full JSONL provenance logs for compliance and internal security audits.

Autonomous agentic management systems represent the most decisive shift in enterprise computing since the transition to cloud infrastructure.
    `,
    tags: ["ALAMS", "Autonomous Agents", "Multi-Agent Systems", "Enterprise AI", "LangChain", "Aurxon"],
    views: 2180,
  },
  {
    id: "blog_neural_erp",
    slug: "architecting-neural-erps-bridging-deep-learning-with-acid-logic",
    title: "Architecting Neural ERPs: Bridging Deep Learning with Deterministic Transactional Logic",
    category: "System Architecture",
    author: "Karan Mishra",
    authorRole: "Founder & AI Engineer, Aurxon",
    publishedDate: "August 30, 2026",
    readTime: "8 min read",
    image: "/img/blog/main-blog/m-blog-3.jpg",
    summary:
      "Why traditional monolithic ERP systems like SAP and Oracle fall short in the era of real-time intelligence, and how Aurxon ERP unifies probabilistic deep learning models with strict ACID database integrity.",
    content: `
### The Fundamental Conflict: Probabilistic AI vs. Deterministic Accounting

Enterprise Resource Planning (ERP) is the central heartbeat of modern industry. It manages ledgers, payroll, inventory counts, supply chains, and compliance. By definition, **accounting and transactional data must be 100% deterministic and ACID-compliant** (Atomicity, Consistency, Isolation, Durability). A balance sheet cannot be "probably balanced to 94% confidence."

Conversely, **Deep Learning and Generative AI are fundamentally probabilistic**. Neural networks produce probability distributions over tokens and latent spaces.

For years, software vendors attempted to slap conversational chatbots on top of antiquated SQL databases and called it "AI ERP." This approach fails because it doesn't change the underlying transactional intelligence of the system.

At Aurxon, we designed the **Neural ERP Architecture**, establishing a unified computational pipeline where deep learning models inform business logic without ever compromising transactional integrity.

---

### Core Tenets of the Aurxon Neural ERP Engine

1. **Dual-Layer Kernel Architecture:**
   * **The Deterministic Financial Ledger (L1):** Strict PostgreSQL/SQLite transactional database with foreign key constraints, cryptographic audit hashes, and zero probabilistic code execution.
   * **The Neural Prediction Mesh (L2):** An asynchronous predictive layer that analyzes real-time sales velocity, supplier shipping delays, seasonal weather patterns, and macroeconomic indices to generate dynamic forecasts.

2. **Predictive Inventory Auto-Replenishment:**
   Instead of static re-order points (e.g. *"Reorder when stock reaches 50 units"*), Aurxon Neural ERP continuously computes probability distributions over customer lead times. It proactively places purchase orders weeks before a supplier experiences a localized holiday or supply constraint.

3. **Autonomous Invoice & Reconciliation Engine:**
   Scans, extracts, and reconciles incoming invoices against delivery challans and bank statements in under 3 seconds. Discrepancies of even a single cent are flagged with exact mathematical rationale.

4. **Zero-Latency Natural Query Engine:**
   CEOs and operations managers don't need to ask an IT team to write complex SQL JOIN queries or wait days for custom PowerBI reports. They simply ask: *"Which 5 product lines experienced margin compression in Q2 and what was the root supplier driver?"* Aurxon ERP computes the exact financial breakdown with interactive visualization in real time.
    `,
    tags: ["Aurxon ERP", "Neural Architecture", "Enterprise Software", "Machine Learning", "System Design"],
    views: 1890,
  },
  {
    id: "blog_cognivex_hemoai",
    slug: "cognivex-and-hemoai-frontiers-of-medical-machine-vision",
    title: "Cognivex & HemoAI: Pushing the Frontiers of Medical Machine Vision & Clinical Intelligence",
    category: "Healthcare & Computer Vision",
    author: "Karan Mishra",
    authorRole: "Founder & AI Engineer, Aurxon",
    publishedDate: "August 12, 2026",
    readTime: "6 min read",
    image: "/img/blog/main-blog/m-blog-4.jpg",
    summary:
      "A technical retrospective on developing Cognivex and HemoAI: deploying high-resolution convolution architectures for microscopic blood cell morphology and early disease anomaly detection.",
    content: `
### Engineering for High-Stakes Clinical Accuracy

Medical machine learning leaves no room for casual error thresholds. When analyzing peripheral blood smears or microscopic cell morphology, a single false negative can delay life-saving medical interventions.

With **HemoAI** and **Cognivex**, our engineering objective was clear: develop lightweight, high-accuracy computer vision pipelines capable of running on affordable microscope attachments in rural clinics and decentralized laboratories.

---

### Technical Highlights of HemoAI

1. **Cellular Segmentation & Contour Delineation:**
   Utilizing customized U-Net variants with attention gates, HemoAI segments overlapping red blood cells (RBCs), leukocytes (WBCs), and platelets with 98.4% IoU (Intersection over Union).

2. **Morphological Anomaly Classification:**
   Identifies sickle cell shapes, target cells, spherocytes, and malaria parasite inclusions within erythrocytes under variable focal lighting conditions.

3. **Sub-Second Edge Inference:**
   Quantized to INT8 precision via TensorRT, running smoothly on low-power edge SBCs without requiring cloud GPU clusters.
    `,
    tags: ["HemoAI", "Cognivex", "Healthcare AI", "Computer Vision", "Deep Learning"],
    views: 1650,
  },
];

export const INITIAL_PROJECTS: PortfolioProject[] = [
  {
    id: "proj_cognivex",
    title: "Cognivex AI – Intelligent Visual Analysis",
    category: "AI/ML",
    description: "Deep learning computer vision platform for real-time cellular morphology, defect detection, and automated visual telemetry.",
    image: "/img/portfolio/p1.jpg",
    tags: ["PyTorch", "OpenCV", "TensorRT", "Next.js", "FastAPI"],
    liveUrl: "https://itsgkaranmishra.web.app",
    githubUrl: "https://github.com/CodeSage4D",
    featured: true,
    order: 1,
  },
  {
    id: "proj_aurxon_erp",
    title: "Aurxon ERP Platform & FCOS Engine",
    category: "Enterprise",
    description: "Enterprise factory operating system integrating closed-loop telemetry, automated supply chains, and neural inventory forecasting.",
    image: "/img/portfolio/p2.jpg",
    tags: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "OPC-UA"],
    liveUrl: "https://itsgkaranmishra.web.app",
    githubUrl: "https://github.com/CodeSage4D",
    featured: true,
    order: 2,
  },
  {
    id: "proj_hemoai",
    title: "HemoAI – Microscopic Diagnostic Vision",
    category: "AI/ML",
    description: "Automated peripheral blood smear analyzer identifying abnormal cell morphology and parasite signatures at the edge.",
    image: "/img/portfolio/p3.jpg",
    tags: ["Deep Learning", "CNN", "U-Net", "Medical AI", "Python"],
    liveUrl: "https://itsgkaranmishra.web.app",
    githubUrl: "https://github.com/CodeSage4D",
    featured: true,
    order: 3,
  },
  {
    id: "proj_alams",
    title: "ALAMS – Autonomous Agentic Swarm",
    category: "AI/ML",
    description: "Multi-agent autonomous cognitive orchestrator with episodic vector memory and adversarial verification loops.",
    image: "/img/portfolio/p4.jpg",
    tags: ["Agentic AI", "LangChain", "Vector DB", "LLM", "TypeScript"],
    liveUrl: "https://itsgkaranmishra.web.app",
    githubUrl: "https://github.com/CodeSage4D",
    featured: true,
    order: 4,
  },
  {
    id: "proj_portfolio",
    title: "Aurxon Neural Cosmos & Analytics Suite",
    category: "Full-Stack",
    description: "Next-generation developer portfolio featuring Gravity Cosmos neural background, real-time telemetry, and enterprise CRM.",
    image: "/img/portfolio/p5.jpg",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Firebase", "SQLite3"],
    liveUrl: "https://itsgkaranmishra.web.app",
    githubUrl: "https://github.com/CodeSage4D/itsgkaranmishra",
    featured: true,
    order: 5,
  },
];

export const INITIAL_FEEDBACKS: UserFeedback[] = [
  {
    id: "feed_1",
    name: "Dr. Rajesh K. Sharma",
    email: "rajesh.sharma@medtechindia.org",
    role: "Director of Clinical Diagnostics",
    company: "Apex Diagnostics Lab",
    rating: 5,
    message:
      "Working with Karan Mishra on our computer vision cell classification pipeline was outstanding. His deep comprehension of neural architectures combined with pragmatic engineering delivered results beyond our benchmarks. Highly recommended!",
    submittedAt: "2026-09-24T14:30:00Z",
    status: "Approved",
    featuredOnHome: true,
  },
  {
    id: "feed_2",
    name: "Anand Verma",
    email: "anand@precisionauto.co.in",
    role: "VP of Manufacturing Operations",
    company: "Precision Engineering Components",
    rating: 5,
    message:
      "The FCOS (formerly AIMS) system designed by Karan reduced unexpected CNC downtime by nearly 22% in our assembly wing. Karan brings an exceptional blend of deep learning expertise and reliable real-time software design.",
    submittedAt: "2026-09-20T11:15:00Z",
    status: "Approved",
    featuredOnHome: true,
  },
  {
    id: "feed_3",
    name: "Elena Rostova",
    email: "elena@synapseglobal.tech",
    role: "Senior AI Product Lead",
    company: "Synapse Global",
    rating: 5,
    message:
      "Karan's work on agentic workflows and the ALAMS engine represents cutting-edge software architecture. Fast turnaround, pristine code quality, and great communication throughout our collaboration.",
    submittedAt: "2026-09-12T09:40:00Z",
    status: "Approved",
    featuredOnHome: true,
  },
];

// ================= CMS METHODS & REPOSITORIES =================

// Helper: safe storage retrieval
function getStored<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultValue;
  }
}

// Helper: safe storage persist
function setStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Trigger storage event for other components
    window.dispatchEvent(new Event("ahs_cms_updated"));
  } catch (e) {}
}

// ---------- BLOG CRUD ----------

export function getAllBlogs(): BlogPost[] {
  return getStored<BlogPost[]>(STORAGE_KEY_BLOGS, INITIAL_BLOGS);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getAllBlogs();
  return blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase() || b.id.toLowerCase() === slug.toLowerCase());
}

export function saveBlogPost(post: Partial<BlogPost> & { title: string; content: string }): BlogPost {
  const blogs = getAllBlogs();
  const slug =
    post.slug ||
    post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  if (post.id) {
    // Update existing
    const idx = blogs.findIndex((b) => b.id === post.id);
    if (idx !== -1) {
      const updated: BlogPost = {
        ...blogs[idx],
        ...post,
        slug,
      };
      blogs[idx] = updated;
      setStored(STORAGE_KEY_BLOGS, blogs);
      return updated;
    }
  }

  // Create new
  const newPost: BlogPost = {
    id: "blog_" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString(36),
    slug,
    title: post.title,
    category: post.category || "AI & Technology",
    author: post.author || "Karan Mishra",
    authorRole: post.authorRole || "Founder, Aurxon",
    publishedDate: post.publishedDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: post.readTime || `${Math.max(Math.ceil(post.content.split(" ").length / 200), 3)} min read`,
    image: post.image || "/img/blog/main-blog/m-blog-1.jpg",
    summary: post.summary || post.content.substring(0, 160) + "...",
    content: post.content,
    tags: post.tags || ["Aurxon", "AI", "Technology"],
    views: post.views || 1,
  };

  blogs.unshift(newPost);
  setStored(STORAGE_KEY_BLOGS, blogs);
  return newPost;
}

export function deleteBlogPost(id: string): void {
  let blogs = getAllBlogs();
  blogs = blogs.filter((b) => b.id !== id);
  setStored(STORAGE_KEY_BLOGS, blogs);
}

// ---------- PROJECTS CRUD ----------

export function getAllProjects(): PortfolioProject[] {
  return getStored<PortfolioProject[]>(STORAGE_KEY_PROJECTS, INITIAL_PROJECTS);
}

export function savePortfolioProject(proj: Partial<PortfolioProject> & { title: string; description: string }): PortfolioProject {
  const projects = getAllProjects();

  if (proj.id) {
    const idx = projects.findIndex((p) => p.id === proj.id);
    if (idx !== -1) {
      const updated: PortfolioProject = {
        ...projects[idx],
        ...proj,
      };
      projects[idx] = updated;
      setStored(STORAGE_KEY_PROJECTS, projects);
      return updated;
    }
  }

  const newProj: PortfolioProject = {
    id: "proj_" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString(36),
    title: proj.title,
    category: proj.category || "AI/ML",
    description: proj.description,
    image: proj.image || "/img/portfolio/p1.jpg",
    tags: proj.tags || ["Python", "AI", "Next.js"],
    liveUrl: proj.liveUrl || "https://itsgkaranmishra.web.app",
    githubUrl: proj.githubUrl || "https://github.com/CodeSage4D",
    featured: proj.featured ?? true,
    order: proj.order || projects.length + 1,
  };

  projects.unshift(newProj);
  setStored(STORAGE_KEY_PROJECTS, projects);
  return newProj;
}

export function deletePortfolioProject(id: string): void {
  let projects = getAllProjects();
  projects = projects.filter((p) => p.id !== id);
  setStored(STORAGE_KEY_PROJECTS, projects);
}

// ---------- USER FEEDBACK / REVIEWS CRUD ----------

export function getAllFeedbacks(): UserFeedback[] {
  return getStored<UserFeedback[]>(STORAGE_KEY_FEEDBACKS, INITIAL_FEEDBACKS);
}

export function getApprovedFeedbacks(): UserFeedback[] {
  return getAllFeedbacks().filter((f) => f.status === "Approved");
}

export function submitUserFeedback(feedback: {
  name: string;
  email: string;
  role?: string;
  company?: string;
  rating: number;
  message: string;
}): UserFeedback {
  const feedbacks = getAllFeedbacks();
  const newFeed: UserFeedback = {
    id: "feed_" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString(36),
    name: feedback.name.trim(),
    email: feedback.email.trim(),
    role: feedback.role?.trim() || "Professional Reviewer",
    company: feedback.company?.trim() || "Independent",
    rating: Math.min(Math.max(feedback.rating, 1), 5),
    message: feedback.message.trim(),
    submittedAt: new Date().toISOString(),
    status: "Approved", // Auto-approved or customizable
    featuredOnHome: true,
  };

  feedbacks.unshift(newFeed);
  setStored(STORAGE_KEY_FEEDBACKS, feedbacks);
  return newFeed;
}

export function updateFeedbackStatus(id: string, status: UserFeedback["status"], featuredOnHome?: boolean): void {
  const feedbacks = getAllFeedbacks();
  const target = feedbacks.find((f) => f.id === id);
  if (target) {
    target.status = status;
    if (typeof featuredOnHome === "boolean") {
      target.featuredOnHome = featuredOnHome;
    }
    setStored(STORAGE_KEY_FEEDBACKS, feedbacks);
  }
}

export function deleteFeedback(id: string): void {
  let feedbacks = getAllFeedbacks();
  feedbacks = feedbacks.filter((f) => f.id !== id);
  setStored(STORAGE_KEY_FEEDBACKS, feedbacks);
}
