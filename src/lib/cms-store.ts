// Enterprise CMS Data Engine - Full Dynamic CRUD Architecture
import { recordPortfolioChange, recordBlogChange, recordAuditEvent } from "./analytics-client";

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
  featured?: boolean;
  status?: "Published" | "Draft" | "Archived";
  seoTitle?: string;
  seoDescription?: string;
}

export interface PortfolioProject {
  id: string;
  slug?: string;
  title: string;
  category: "AI/ML" | "Full-Stack" | "Enterprise" | "Mobile";
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  order: number;
  status?: "Live" | "In Development" | "Archived";
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

export interface ExperienceMilestone {
  id: string;
  period: string;
  role: string;
  organization: string;
  tagline?: string;
  location: string;
  badge: string;
  badgeColor: string;
  logoUrl?: string;
  websiteUrl?: string;
  icon: string;
  summary: string;
  story: string;
  founderImpact: string[];
  technologies: string[];
  isCurrent?: boolean;
  order: number;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  score?: string;
  details?: string[];
  order: number;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  order: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: "AI/ML" | "Full-Stack" | "Edge/Systems" | "DevOps & Cloud" | "Databases & Tools";
  proficiency: number; // 0 - 100
  icon?: string;
  featured?: boolean;
  order: number;
}

export interface SocialProfile {
  id: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
  label: string;
  order: number;
  isVisible: boolean;
}

export interface ProfileInfo {
  name: string;
  headline: string;
  tagline: string;
  bio: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  resumeUrl: string;
  avatarUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  aurxonUrl: string;
}

export interface AnnouncementBanner {
  id: string;
  enabled: boolean;
  badge: string;
  text: string;
  linkText: string;
  linkUrl: string;
  type: "info" | "success" | "warning";
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: "image" | "document" | "logo";
  sizeKb: number;
  dimensions?: string;
  uploadedAt: string;
}

export interface SeoConfig {
  siteTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  googleSiteVerification: string;
  canonicalUrl: string;
}

const STORAGE_KEY_BLOGS = "ahs_cms_blogs_v2";
const STORAGE_KEY_PROJECTS = "ahs_cms_projects_v2";
const STORAGE_KEY_FEEDBACKS = "ahs_cms_feedbacks_v2";
const STORAGE_KEY_EXPERIENCES = "ahs_cms_experiences_v2";
const STORAGE_KEY_EDUCATIONS = "ahs_cms_educations_v2";
const STORAGE_KEY_CERTIFICATIONS = "ahs_cms_certifications_v2";
const STORAGE_KEY_SKILLS = "ahs_cms_skills_v2";
const STORAGE_KEY_SOCIALS = "ahs_cms_socials_v2";
const STORAGE_KEY_PROFILE = "ahs_cms_profile_v2";
const STORAGE_KEY_BANNER = "ahs_cms_banner_v2";
const STORAGE_KEY_MEDIA = "ahs_cms_media_v2";
const STORAGE_KEY_SEO = "ahs_cms_seo_v2";

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
    featured: true,
    status: "Published",
    seoTitle: "From AIMS to FCOS: Intelligent Factory Operating Systems | Karan Mishra",
    seoDescription: "How Aurxon transformed AIMS into FCOS - autonomous cyber-physical edge computing and machine control.",
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
* **The Planner Agent:** Deconstructs high-level business goals into a Directed Acyclic Graph (DAG) of executable subtasks.
* **The Execution Agent Pool:** Domain-specific workers (SQL executor, PDF OCR extractor, Web Crawler, ERP Connector) that execute individual tasks in isolated, sandboxed environments.
* **The Critic & Verification Agent:** An adversarial agent tasked exclusively with discovering bugs, hallucinated numbers, or regulatory compliance violations in the Execution Agent's output.

#### 2. Vectorized Episodic Memory (VEM)
Unlike standard stateless LLM calls, ALAMS maintains a persistent episodic vector database. When an agent discovers an edge-case in an enterprise vendor contract format, that heuristic is indexed into its long-term vector memory.

#### 3. Human-in-the-Loop Safe Execution Gateways
For high-risk operations, ALAMS pauses execution, generates an interactive diff summary, and requests cryptographic approval from an authorized human supervisor via Slack or WhatsApp.
    `,
    tags: ["ALAMS", "Autonomous Agents", "Multi-Agent Systems", "Enterprise AI", "LangChain", "Aurxon"],
    views: 2180,
    featured: true,
    status: "Published",
    seoTitle: "ALAMS: Autonomous Learning Agentic Management Systems | Karan Mishra",
    seoDescription: "Multi-agent autonomous cognitive orchestrator with episodic vector memory and adversarial verification loops.",
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

At Aurxon, we designed the **Neural ERP Architecture**, establishing a unified computational pipeline where deep learning models inform business logic without ever compromising transactional integrity.

---

### Core Tenets of the Aurxon Neural ERP Engine

1. **Dual-Layer Kernel Architecture:**
   * **The Deterministic Financial Ledger (L1):** Strict PostgreSQL/SQLite transactional database with foreign key constraints, cryptographic audit hashes, and zero probabilistic code execution.
   * **The Neural Prediction Mesh (L2):** An asynchronous predictive layer that analyzes real-time sales velocity, supplier shipping delays, seasonal weather patterns, and macroeconomic indices to generate dynamic forecasts.

2. **Predictive Inventory Auto-Replenishment:**
   Instead of static re-order points, Aurxon Neural ERP continuously computes probability distributions over customer lead times. It proactively places purchase orders weeks before a supplier experiences a localized holiday or supply constraint.

3. **Autonomous Invoice & Reconciliation Engine:**
   Scans, extracts, and reconciles incoming invoices against delivery challans and bank statements in under 3 seconds. Discrepancies of even a single cent are flagged with exact mathematical rationale.
    `,
    tags: ["Aurxon ERP", "Neural Architecture", "Enterprise Software", "Machine Learning", "System Design"],
    views: 1890,
    featured: false,
    status: "Published",
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
   Utilizing customized U-Net variants with attention gates, HemoAI segments overlapping red blood cells (RBCs), leukocytes (WBCs), and platelets with 98.4% IoU.

2. **Morphological Anomaly Classification:**
   Identifies sickle cell shapes, target cells, spherocytes, and malaria parasite inclusions within erythrocytes under variable focal lighting conditions.

3. **Sub-Second Edge Inference:**
   Quantized to INT8 precision via TensorRT, running smoothly on low-power edge SBCs without requiring cloud GPU clusters.
    `,
    tags: ["HemoAI", "Cognivex", "Healthcare AI", "Computer Vision", "Deep Learning"],
    views: 1650,
    featured: false,
    status: "Published",
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
    status: "Live",
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
    status: "Live",
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
    status: "Live",
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
    status: "Live",
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
    status: "Live",
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

export const INITIAL_EXPERIENCES: ExperienceMilestone[] = [
  {
    id: "aurxon",
    period: "August 2024 - Present",
    role: "Founder & Chief AI Architect",
    organization: "Aurxon",
    tagline: "Aurxon - Next Gen AI Solutions • Where Intelligence Meets Innovation",
    location: "AURXON Headquarters, Killa Maidan, VIP Road, Indore, MP – 452006, India",
    badge: "Active Flagship Venture",
    badgeColor: "#0284c7",
    logoUrl: "/img/logo/aurxon-logo-official.png",
    websiteUrl: "https://aurxon.com",
    icon: "fa-rocket",
    summary:
      "Founded Aurxon to engineer production-grade enterprise AI platforms, autonomous neural systems, and institutional solutions. Next Gen AI Solutions — Where Intelligence Meets Innovation.",
    story:
      "Directing overarching venture vision, neural model benchmarking, and full-stack system architecture at Aurxon (aurxon.com). Architected Aurxon ERP Lite for institutional automation and records, Cognivex for semantic AI career intelligence utilizing deep sentence transformers, FCOS for factory machine edge telemetry, and HemoAI for predictive medical blood prioritization.",
    founderImpact: [
      "Founded Aurxon (aurxon.com) and engineered autonomous enterprise AI solutions & multi-tenant platforms",
      "Designed full multi-tenant architecture for Aurxon ERP deployed in regional institutions",
      "Engineered Cognivex semantic matching engine with 98.4% accuracy on sentence transformer embeddings",
      "Leading open-source & enterprise AI innovation with 47+ public codebases on GitHub",
    ],
    technologies: ["Python", "FastAPI", "PyTorch", "Next.js", "Enterprise ERP", "Transformer Embeddings", "System Architecture", "Edge AI"],
    isCurrent: true,
    order: 1,
  },
  {
    id: "suas-indore",
    period: "Sep 2025 - Present",
    role: "Trainer – Applied AI & Systems (SCSIT, Symbiosis)",
    organization: "Symbiosis University of Applied Sciences (SUAS)",
    location: "Indore, Madhya Pradesh, India · On-site",
    badge: "Full-time · SCSIT Symbiosis",
    badgeColor: "#e11d48",
    logoUrl: "/img/logos/suas-logo.png",
    websiteUrl: "https://www.suas.ac.in",
    icon: "fa-university",
    summary:
      "Supporting academic and applied research activities at the School of Computer Science and IT (SCSIT).",
    story:
      "Supporting academic and applied research activities at the School of Computer Science and IT (SCSIT). Working closely with faculty on academic and technical projects related to software development and applied AI. Assisting students with Python, machine learning, and NLP concepts through hands-on guidance and debugging support.",
    founderImpact: [
      "Worked closely with faculty on academic and technical projects related to software development and applied AI",
      "Assisted students with Python, machine learning, and NLP concepts through hands-on guidance and debugging support",
      "Helped review, test, and refine student-built applications and early research prototypes",
      "Contributed to the development and testing of AI-based modules and data-driven solutions used in academic settings",
    ],
    technologies: ["Python Programming", "Machine Learning", "Applied AI & Systems", "Natural Language Processing (NLP)", "System Architecture"],
    isCurrent: true,
    order: 2,
  },
  {
    id: "geek-theory",
    period: "March 2024 - July 2024",
    role: "R&D Engineering Intern",
    organization: "Geek Theory Pvt. Ltd.",
    location: "Indore, MP, India",
    badge: "R&D Systems",
    badgeColor: "#8b5cf6",
    icon: "fa-cogs",
    summary:
      "Researched and built high-performance Cordova hardware plugins and fine-tuned real-time machine learning classification inference pipelines.",
    story:
      "Delivered cross-platform hardware bridge integrations enabling high-frequency mobile sensor communication. Optimized inference pipelines for resource-constrained mobile hardware, reducing prediction latency by 35%.",
    founderImpact: [
      "Authored optimized Cordova native bridges for custom hardware modules",
      "Benchmark testing of low-latency classification models on edge devices",
      "Collaborated with senior software architects on scalable client delivery",
    ],
    technologies: ["Machine Learning", "Cordova Plugins", "Python", "Mobile Edge Inference", "System Optimization"],
    order: 3,
  },
  {
    id: "independent-consultant",
    period: "2022 - 2024",
    role: "AI Consultant & Open-Source Architect",
    organization: "Independent Enterprise Consulting & GitHub",
    location: "Global / Remote",
    badge: "47+ GitHub Repos",
    badgeColor: "#10b981",
    icon: "fa-code",
    websiteUrl: "https://github.com/CodeSage4D",
    summary:
      "Created 47+ open-source GitHub repositories and built specialized ML prototypes including SentiVoice NLP and automated anomaly detection engines.",
    story:
      "Operated as an independent technical consultant for international and domestic clients. Designed SentiVoice—a voice-assisted sentiment analysis system with contextual negation resolution. Built web automation spiders, financial analytics tools, and resilient Python APIs.",
    founderImpact: [
      "Published 47+ public open-source software and ML codebases on GitHub (@CodeSage4D)",
      "Engineered automated NLP and voice analysis workflows with sentiment scoring",
      "Delivered end-to-end full-stack systems with streamlined database architectures",
    ],
    technologies: ["Python", "Streamlit", "Sentiment NLP", "Web Extractors", "RESTful APIs", "SQL", "Open Source"],
    order: 4,
  },
];

export const INITIAL_EDUCATIONS: EducationItem[] = [
  {
    id: "edu_sait",
    institution: "Sri Aurobindo Institute of Technology (SAIT)",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2020 - 2024",
    location: "Indore, MP, India",
    score: "First Class with Distinction",
    details: [
      "Specialized in Deep Learning, Natural Language Processing, and Distributed Database Systems",
      "Led college AI research group and built over 40 functional software repositories",
      "Authored academic capstone on Real-Time Medical Cell Classification with Edge Tensor Cores",
    ],
    order: 1,
  },
  {
    id: "edu_hsc",
    institution: "Higher Secondary Education Board",
    degree: "Senior Secondary (Class XII) - Mathematics & Computer Science",
    period: "2018 - 2020",
    location: "Indore, MP, India",
    score: "Distinction in Computer Science",
    details: ["Strong foundation in calculus, computational logic, and algorithmic problem solving"],
    order: 2,
  },
];

export const INITIAL_CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert_deep_learning",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    year: "2023",
    credentialId: "DL-AI-KM98214",
    credentialUrl: "https://coursera.org/verify/specialization",
    description: "Neural Networks, Hyperparameter Tuning, CNNs, Sequence Models, and Attention Transformer Architectures",
    order: 1,
  },
  {
    id: "cert_fastapi",
    title: "Enterprise Backend Architecture & Microservices",
    issuer: "FastAPI / Python Software Foundation",
    year: "2023",
    credentialId: "FAST-ENG-8402",
    description: "Asynchronous I/O, WebSockets, OAuth2/JWT security boundaries, and high-throughput SQL engines",
    order: 2,
  },
  {
    id: "cert_opcua_edge",
    title: "Industrial IoT & OPC-UA Device Protocols",
    issuer: "Industrial Automation Consortium",
    year: "2024",
    credentialId: "IIOT-OPC-5519",
    description: "Real-time edge machine telemetry, PLC register reading, and deterministic sensor ingestion",
    order: 3,
  },
];

export const INITIAL_SKILLS: SkillItem[] = [
  { id: "sk_python", name: "Python 3.x & AsyncIO", category: "AI/ML", proficiency: 96, icon: "fa-brands fa-python", featured: true, order: 1 },
  { id: "sk_pytorch", name: "PyTorch & TensorRT", category: "AI/ML", proficiency: 92, icon: "fa-solid fa-brain", featured: true, order: 2 },
  { id: "sk_llm", name: "Agentic AI & LangChain / Swarms", category: "AI/ML", proficiency: 94, icon: "fa-solid fa-robot", featured: true, order: 3 },
  { id: "sk_fastapi", name: "FastAPI & REST APIs", category: "Full-Stack", proficiency: 95, icon: "fa-solid fa-server", featured: true, order: 4 },
  { id: "sk_nextjs", name: "Next.js 14 / React & TypeScript", category: "Full-Stack", proficiency: 92, icon: "fa-brands fa-react", featured: true, order: 5 },
  { id: "sk_edge", name: "Edge Computing & OPC-UA", category: "Edge/Systems", proficiency: 88, icon: "fa-solid fa-microchip", featured: true, order: 6 },
  { id: "sk_docker", name: "Docker & Linux Architecture", category: "DevOps & Cloud", proficiency: 90, icon: "fa-brands fa-docker", featured: true, order: 7 },
  { id: "sk_sqlite", name: "PostgreSQL & SQLite3", category: "Databases & Tools", proficiency: 93, icon: "fa-solid fa-database", featured: true, order: 8 },
  { id: "sk_cv", name: "OpenCV & Medical Vision", category: "AI/ML", proficiency: 91, icon: "fa-solid fa-eye", featured: true, order: 9 },
  { id: "sk_git", name: "Git, GitHub & CI/CD", category: "Databases & Tools", proficiency: 95, icon: "fa-brands fa-git-alt", featured: true, order: 10 },
];

export const INITIAL_SOCIALS: SocialProfile[] = [
  { id: "soc_gh", platform: "GitHub", username: "CodeSage4D", url: "https://github.com/CodeSage4D", icon: "fa-brands fa-github", label: "GitHub (47+ Repos)", order: 1, isVisible: true },
  { id: "soc_li", platform: "LinkedIn", username: "itsgkaranmishra", url: "https://www.linkedin.com/in/itsgkaranmishra", icon: "fa-brands fa-linkedin", label: "LinkedIn Profile", order: 2, isVisible: true },
  { id: "soc_aurxon", platform: "Aurxon", username: "aurxon", url: "https://aurxon.com", icon: "fa-solid fa-globe", label: "Aurxon Official Portal", order: 3, isVisible: true },
  { id: "soc_portfolio", platform: "Portfolio", username: "itsgkaranmishra", url: "https://itsgkaranmishra.web.app", icon: "fa-solid fa-star", label: "Production Web App", order: 4, isVisible: true },
];

export const INITIAL_PROFILE: ProfileInfo = {
  name: "Karan Mishra",
  headline: "Founder & Chief AI Architect, Aurxon | Trainer, SCSIT Symbiosis",
  tagline: "Architecting Autonomous Realities • Synthesizing Neural Intelligence",
  bio: "Visionary founder, applied AI researcher, and software architect building autonomous industrial factory systems (FCOS), agentic swarm workflows (ALAMS), and deep learning computer vision platforms. Author of 47+ public open-source software repositories.",
  location: "AURXON Headquarters, Killa Maidan, VIP Road, Indore, MP – 452006, India",
  availability: "Available for Elite AI Architecture, Enterprise Consulting & Select Keynotes",
  email: "connect@aurxon.com",
  phone: "+91 91792 68252",
  resumeUrl: "/cv/karan_mishra_cv.pdf",
  avatarUrl: "/img/karan_mishra_profile.jpg",
  githubUrl: "https://github.com/CodeSage4D",
  linkedinUrl: "https://www.linkedin.com/in/itsgkaranmishra",
  aurxonUrl: "https://aurxon.com",
};

export const INITIAL_BANNER: AnnouncementBanner = {
  id: "ban_main",
  enabled: true,
  badge: "BREAKING ANNOUNCEMENT",
  text: "Aurxon unveils FCOS v3.2 & ALAMS Multi-Agent Swarm for Industrial Manufacturing. Live demos available.",
  linkText: "Explore Architecture",
  linkUrl: "/blog/aims-to-fcos-intelligent-factory-operating-systems",
  type: "info",
};

export const INITIAL_MEDIA: MediaItem[] = [
  { id: "med_1", title: "Aurxon Official Logo", url: "/img/logo/aurxon-logo-official.png", type: "logo", sizeKb: 142, dimensions: "800x800", uploadedAt: "2026-09-01" },
  { id: "med_2", title: "Cognivex Showcase Banner", url: "/img/portfolio/p1.jpg", type: "image", sizeKb: 450, dimensions: "1280x720", uploadedAt: "2026-09-10" },
  { id: "med_3", title: "Aurxon ERP Platform Architecture", url: "/img/portfolio/p2.jpg", type: "image", sizeKb: 512, dimensions: "1280x720", uploadedAt: "2026-09-12" },
  { id: "med_4", title: "HemoAI Blood Smear Analyzer", url: "/img/portfolio/p3.jpg", type: "image", sizeKb: 380, dimensions: "1280x720", uploadedAt: "2026-09-15" },
  { id: "med_5", title: "ALAMS Agentic Network Graph", url: "/img/portfolio/p4.jpg", type: "image", sizeKb: 490, dimensions: "1280x720", uploadedAt: "2026-09-20" },
];

export const INITIAL_SEO: SeoConfig = {
  siteTitle: "Karan Mishra | Founder & Chief AI Architect, Aurxon | Personal Portfolio & Lab",
  metaDescription: "Official portfolio of Karan Mishra: Founder & Chief AI Architect at Aurxon, Applied AI Trainer at SCSIT Symbiosis University. Explore neural architectures, FCOS, ALAMS, computer vision, and 47+ open-source repositories.",
  keywords: ["Karan Mishra", "Aurxon", "Founder", "Chief AI Architect", "FCOS", "ALAMS", "Cognivex", "HemoAI", "Machine Learning", "Symbiosis SUAS", "CodeSage4D"],
  ogImage: "/img/og-preview.jpg",
  googleSiteVerification: "FR-Ie2tWKzGnBNEMu3JDJH2I42pFzTtm5vqPLQKKGts",
  canonicalUrl: "https://itsgkaranmishra.web.app",
};

// ================= CMS METHODS & REPOSITORIES =================

function getStored<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("ahs_cms_updated"));
  } catch {}
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
    const idx = blogs.findIndex((b) => b.id === post.id);
    if (idx !== -1) {
      const updated: BlogPost = {
        ...blogs[idx],
        ...post,
        slug,
      };
      blogs[idx] = updated;
      setStored(STORAGE_KEY_BLOGS, blogs);
      recordBlogChange(updated.title, "Updated");
      recordAuditEvent("BLOG_UPDATE", `Updated article: ${updated.title}`, `/blog/${updated.slug}`);
      return updated;
    }
  }

  const newPost: BlogPost = {
    id: "blog_" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString(36),
    slug,
    title: post.title,
    category: post.category || "AI & Technology",
    author: post.author || "Karan Mishra",
    authorRole: post.authorRole || "Founder & AI Engineer, Aurxon",
    publishedDate: post.publishedDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: post.readTime || `${Math.max(Math.ceil(post.content.split(" ").length / 200), 3)} min read`,
    image: post.image || "/img/blog/main-blog/m-blog-1.jpg",
    summary: post.summary || post.content.substring(0, 160) + "...",
    content: post.content,
    tags: post.tags || ["Aurxon", "AI", "Technology"],
    views: post.views || 1,
    featured: post.featured ?? false,
    status: post.status || "Published",
    seoTitle: post.seoTitle || `${post.title} | Karan Mishra`,
    seoDescription: post.seoDescription || post.summary,
  };

  blogs.unshift(newPost);
  setStored(STORAGE_KEY_BLOGS, blogs);
  recordBlogChange(newPost.title, "Published");
  recordAuditEvent("BLOG_CREATE", `Published new article: ${newPost.title}`, `/blog/${newPost.slug}`);
  return newPost;
}

export function deleteBlogPost(id: string): void {
  let blogs = getAllBlogs();
  const target = blogs.find((b) => b.id === id);
  blogs = blogs.filter((b) => b.id !== id);
  setStored(STORAGE_KEY_BLOGS, blogs);
  if (target) {
    recordBlogChange(target.title, "Deleted");
    recordAuditEvent("BLOG_DELETE", `Deleted article: ${target.title}`);
  }
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
      recordPortfolioChange(updated.title, "Updated", `Category: ${updated.category}`);
      recordAuditEvent("PROJECT_UPDATE", `Updated showcase project: ${updated.title}`);
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
    status: proj.status || "Live",
  };

  projects.unshift(newProj);
  setStored(STORAGE_KEY_PROJECTS, projects);
  recordPortfolioChange(newProj.title, "Added New", `Category: ${newProj.category}`);
  recordAuditEvent("PROJECT_CREATE", `Created showcase project: ${newProj.title}`);
  return newProj;
}

export function deletePortfolioProject(id: string): void {
  let projects = getAllProjects();
  const target = projects.find((p) => p.id === id);
  projects = projects.filter((p) => p.id !== id);
  setStored(STORAGE_KEY_PROJECTS, projects);
  if (target) {
    recordPortfolioChange(target.title, "Deleted");
    recordAuditEvent("PROJECT_DELETE", `Deleted showcase project: ${target.title}`);
  }
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
    status: "Approved",
    featuredOnHome: true,
  };

  feedbacks.unshift(newFeed);
  setStored(STORAGE_KEY_FEEDBACKS, feedbacks);
  recordAuditEvent("REVIEW_SUBMIT", `Client review from ${newFeed.name} (${newFeed.rating}★)`);
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
    recordAuditEvent("REVIEW_STATUS", `Review ${target.name} set to ${status}`);
  }
}

export function saveFeedback(feedback: Partial<UserFeedback> & { name: string; message: string }): UserFeedback {
  const feedbacks = getAllFeedbacks();
  if (feedback.id) {
    const idx = feedbacks.findIndex((f) => f.id === feedback.id);
    if (idx !== -1) {
      feedbacks[idx] = {
        ...feedbacks[idx],
        ...feedback,
      } as UserFeedback;
      setStored(STORAGE_KEY_FEEDBACKS, feedbacks);
      recordAuditEvent("REVIEW_UPDATE", `Updated review from ${feedbacks[idx].name}`);
      return feedbacks[idx];
    }
  }

  const newFeed: UserFeedback = {
    id: "feed_" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString(36),
    name: feedback.name.trim(),
    email: feedback.email?.trim() || "client@aurxon.com",
    role: feedback.role?.trim() || "Collaborator / Client",
    company: feedback.company?.trim() || "Independent",
    rating: Math.min(Math.max(feedback.rating || 5, 1), 5),
    message: feedback.message.trim(),
    submittedAt: feedback.submittedAt || new Date().toISOString(),
    status: feedback.status || "Approved",
    featuredOnHome: feedback.featuredOnHome ?? true,
  };

  feedbacks.unshift(newFeed);
  setStored(STORAGE_KEY_FEEDBACKS, feedbacks);
  recordAuditEvent("REVIEW_CREATE", `Created testimonial from ${newFeed.name}`);
  return newFeed;
}

export function deleteFeedback(id: string): void {
  let feedbacks = getAllFeedbacks();
  feedbacks = feedbacks.filter((f) => f.id !== id);
  setStored(STORAGE_KEY_FEEDBACKS, feedbacks);
  recordAuditEvent("REVIEW_DELETE", `Deleted testimonial id: ${id}`);
}

// ---------- EXPERIENCES CRUD ----------

export function getAllExperiences(): ExperienceMilestone[] {
  return getStored<ExperienceMilestone[]>(STORAGE_KEY_EXPERIENCES, INITIAL_EXPERIENCES);
}

export function saveExperience(exp: Partial<ExperienceMilestone> & { role: string; organization: string }): ExperienceMilestone {
  const exps = getAllExperiences();
  if (exp.id) {
    const idx = exps.findIndex((e) => e.id === exp.id);
    if (idx !== -1) {
      exps[idx] = { ...exps[idx], ...exp };
      setStored(STORAGE_KEY_EXPERIENCES, exps);
      recordAuditEvent("EXPERIENCE_UPDATE", `Updated experience: ${exps[idx].role} at ${exps[idx].organization}`);
      return exps[idx];
    }
  }

  const newExp: ExperienceMilestone = {
    id: "exp_" + Math.random().toString(36).substring(2, 8),
    role: exp.role,
    organization: exp.organization,
    period: exp.period || "2024 - Present",
    tagline: exp.tagline || "",
    location: exp.location || "Indore, MP, India",
    badge: exp.badge || "Professional",
    badgeColor: exp.badgeColor || "#0284c7",
    icon: exp.icon || "fa-briefcase",
    summary: exp.summary || "",
    story: exp.story || "",
    founderImpact: exp.founderImpact || [],
    technologies: exp.technologies || ["Python", "Machine Learning"],
    isCurrent: exp.isCurrent ?? false,
    order: exp.order || exps.length + 1,
  };

  exps.unshift(newExp);
  setStored(STORAGE_KEY_EXPERIENCES, exps);
  recordAuditEvent("EXPERIENCE_CREATE", `Created experience: ${newExp.role} at ${newExp.organization}`);
  return newExp;
}

export function deleteExperience(id: string): void {
  let exps = getAllExperiences();
  exps = exps.filter((e) => e.id !== id);
  setStored(STORAGE_KEY_EXPERIENCES, exps);
  recordAuditEvent("EXPERIENCE_DELETE", `Deleted experience: ${id}`);
}

// ---------- EDUCATIONS CRUD ----------

export function getAllEducations(): EducationItem[] {
  return getStored<EducationItem[]>(STORAGE_KEY_EDUCATIONS, INITIAL_EDUCATIONS);
}

export function saveEducation(edu: Partial<EducationItem> & { institution: string; degree: string }): EducationItem {
  const edus = getAllEducations();
  if (edu.id) {
    const idx = edus.findIndex((e) => e.id === edu.id);
    if (idx !== -1) {
      edus[idx] = { ...edus[idx], ...edu };
      setStored(STORAGE_KEY_EDUCATIONS, edus);
      return edus[idx];
    }
  }

  const newEdu: EducationItem = {
    id: "edu_" + Math.random().toString(36).substring(2, 8),
    institution: edu.institution,
    degree: edu.degree,
    period: edu.period || "2020 - 2024",
    location: edu.location || "Indore, MP, India",
    score: edu.score || "First Class",
    details: edu.details || [],
    order: edu.order || edus.length + 1,
  };

  edus.push(newEdu);
  setStored(STORAGE_KEY_EDUCATIONS, edus);
  return newEdu;
}

export function deleteEducation(id: string): void {
  let edus = getAllEducations();
  edus = edus.filter((e) => e.id !== id);
  setStored(STORAGE_KEY_EDUCATIONS, edus);
}

// ---------- CERTIFICATIONS CRUD ----------

export function getAllCertifications(): CertificationItem[] {
  return getStored<CertificationItem[]>(STORAGE_KEY_CERTIFICATIONS, INITIAL_CERTIFICATIONS);
}

export function saveCertification(cert: Partial<CertificationItem> & { title: string; issuer: string }): CertificationItem {
  const certs = getAllCertifications();
  if (cert.id) {
    const idx = certs.findIndex((c) => c.id === cert.id);
    if (idx !== -1) {
      certs[idx] = { ...certs[idx], ...cert };
      setStored(STORAGE_KEY_CERTIFICATIONS, certs);
      return certs[idx];
    }
  }

  const newCert: CertificationItem = {
    id: "cert_" + Math.random().toString(36).substring(2, 8),
    title: cert.title,
    issuer: cert.issuer,
    year: cert.year || new Date().getFullYear().toString(),
    credentialId: cert.credentialId || "",
    credentialUrl: cert.credentialUrl || "",
    description: cert.description || "",
    order: cert.order || certs.length + 1,
  };

  certs.push(newCert);
  setStored(STORAGE_KEY_CERTIFICATIONS, certs);
  return newCert;
}

export function deleteCertification(id: string): void {
  let certs = getAllCertifications();
  certs = certs.filter((c) => c.id !== id);
  setStored(STORAGE_KEY_CERTIFICATIONS, certs);
}

// ---------- SKILLS CRUD ----------

export function getAllSkills(): SkillItem[] {
  return getStored<SkillItem[]>(STORAGE_KEY_SKILLS, INITIAL_SKILLS);
}

export function saveSkill(skill: Partial<SkillItem> & { name: string; category: SkillItem["category"] }): SkillItem {
  const skills = getAllSkills();
  if (skill.id) {
    const idx = skills.findIndex((s) => s.id === skill.id);
    if (idx !== -1) {
      skills[idx] = { ...skills[idx], ...skill };
      setStored(STORAGE_KEY_SKILLS, skills);
      return skills[idx];
    }
  }

  const newSkill: SkillItem = {
    id: "sk_" + Math.random().toString(36).substring(2, 8),
    name: skill.name,
    category: skill.category,
    proficiency: skill.proficiency || 90,
    icon: skill.icon || "fa-solid fa-code",
    featured: skill.featured ?? true,
    order: skill.order || skills.length + 1,
  };

  skills.push(newSkill);
  setStored(STORAGE_KEY_SKILLS, skills);
  return newSkill;
}

export function deleteSkill(id: string): void {
  let skills = getAllSkills();
  skills = skills.filter((s) => s.id !== id);
  setStored(STORAGE_KEY_SKILLS, skills);
}

// ---------- SOCIAL PROFILES CRUD ----------

export function getAllSocials(): SocialProfile[] {
  return getStored<SocialProfile[]>(STORAGE_KEY_SOCIALS, INITIAL_SOCIALS);
}

export function saveSocial(social: Partial<SocialProfile> & { platform: string; url: string }): SocialProfile {
  const socials = getAllSocials();
  if (social.id) {
    const idx = socials.findIndex((s) => s.id === social.id);
    if (idx !== -1) {
      socials[idx] = { ...socials[idx], ...social };
      setStored(STORAGE_KEY_SOCIALS, socials);
      return socials[idx];
    }
  }

  const newSocial: SocialProfile = {
    id: "soc_" + Math.random().toString(36).substring(2, 8),
    platform: social.platform,
    username: social.username || "",
    url: social.url,
    icon: social.icon || "fa-solid fa-link",
    label: social.label || social.platform,
    order: social.order || socials.length + 1,
    isVisible: social.isVisible ?? true,
  };

  socials.push(newSocial);
  setStored(STORAGE_KEY_SOCIALS, socials);
  return newSocial;
}

export function deleteSocial(id: string): void {
  let socials = getAllSocials();
  socials = socials.filter((s) => s.id !== id);
  setStored(STORAGE_KEY_SOCIALS, socials);
}

// ---------- PROFILE INFO ----------

export function getProfileInfo(): ProfileInfo {
  return getStored<ProfileInfo>(STORAGE_KEY_PROFILE, INITIAL_PROFILE);
}

export function saveProfileInfo(info: Partial<ProfileInfo>): ProfileInfo {
  const current = getProfileInfo();
  const updated = { ...current, ...info };
  setStored(STORAGE_KEY_PROFILE, updated);
  recordAuditEvent("PROFILE_UPDATE", `Updated founder profile details`);
  return updated;
}

// ---------- ANNOUNCEMENT BANNER ----------

export function getAnnouncementBanner(): AnnouncementBanner {
  return getStored<AnnouncementBanner>(STORAGE_KEY_BANNER, INITIAL_BANNER);
}

export function saveAnnouncementBanner(banner: Partial<AnnouncementBanner>): AnnouncementBanner {
  const current = getAnnouncementBanner();
  const updated = { ...current, ...banner };
  setStored(STORAGE_KEY_BANNER, updated);
  recordAuditEvent("BANNER_UPDATE", `Updated announcement banner: ${updated.text.substring(0, 40)}...`);
  return updated;
}

// ---------- MEDIA ITEMS ----------

export function getAllMedia(): MediaItem[] {
  return getStored<MediaItem[]>(STORAGE_KEY_MEDIA, INITIAL_MEDIA);
}

export function saveMedia(media: Partial<MediaItem> & { title: string; url: string }): MediaItem {
  const list = getAllMedia();
  if (media.id) {
    const idx = list.findIndex((m) => m.id === media.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...media };
      setStored(STORAGE_KEY_MEDIA, list);
      return list[idx];
    }
  }

  const newMedia: MediaItem = {
    id: "med_" + Math.random().toString(36).substring(2, 8),
    title: media.title,
    url: media.url,
    type: media.type || "image",
    sizeKb: media.sizeKb || 120,
    dimensions: media.dimensions || "1280x720",
    uploadedAt: new Date().toISOString().split("T")[0],
  };

  list.unshift(newMedia);
  setStored(STORAGE_KEY_MEDIA, list);
  recordAuditEvent("MEDIA_UPLOAD", `Uploaded media asset: ${newMedia.title}`);
  return newMedia;
}

export function deleteMedia(id: string): void {
  let list = getAllMedia();
  list = list.filter((m) => m.id !== id);
  setStored(STORAGE_KEY_MEDIA, list);
  recordAuditEvent("MEDIA_DELETE", `Deleted media asset id: ${id}`);
}

// ---------- SEO CONFIG ----------

export function getSeoConfig(): SeoConfig {
  return getStored<SeoConfig>(STORAGE_KEY_SEO, INITIAL_SEO);
}

export function saveSeoConfig(config: Partial<SeoConfig>): SeoConfig {
  const current = getSeoConfig();
  const updated = { ...current, ...config };
  setStored(STORAGE_KEY_SEO, updated);
  recordAuditEvent("SEO_UPDATE", `Updated site SEO & meta verification settings`);
  return updated;
}
