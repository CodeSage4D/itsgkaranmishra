import { Service } from "@/types";

export const servicesData: Service[] = [
  {
    id: "machine-learning",
    title: "Machine Learning Development",
    description:
      "Building intelligent systems with tailored machine learning algorithms (Supervised, Unsupervised, Deep Learning) to solve complex problems and automate high-value decisions.",
    icon: "Brain",
    color: "#007FFF",
    category: "AI & ML",
    features: [
      "Custom Model Training & Evaluation",
      "Predictive Analytics & Forecasting",
      "Hyperparameter Tuning & Cross-Validation",
      "Model Deployment via REST APIs",
    ],
  },
  {
    id: "web-development",
    title: "Web Application Development",
    description:
      "Crafting high-performance, responsive web applications that are aesthetically stunning and architecturally sound, using Next.js, React, TypeScript, and modern backend architectures.",
    icon: "LaptopCode",
    color: "#FF5733",
    category: "Full Stack",
    features: [
      "Next.js App Router & Server Components",
      "Modern TypeScript Architectures",
      "Interactive Dashboards & Portals",
      "Optimized SEO & Performance Core Web Vitals",
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Visualization",
    description:
      "Transforming raw, unstructured business data into clear, actionable intelligence with automated ETL pipelines, statistical modeling, and interactive dashboards.",
    icon: "LineChart",
    color: "#28A745",
    category: "Data Science",
    features: [
      "Exploratory Data Analysis (EDA)",
      "Automated Business Metrics & KPIs",
      "Interactive Dashboards (Plotly, D3, Streamlit)",
      "Database Modeling & Query Optimization",
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation Solutions",
    description:
      "Implementing AI-driven automated workflows, headless web scraping bots, and intelligent assistants that slash operational bottlenecks and skyrocket productivity.",
    icon: "Bot",
    color: "#FFC107",
    category: "Automation",
    features: [
      "Web Crawling & Data Extraction Bots",
      "NLP Classification & Parsing",
      "Telegram & Messaging Integrations",
      "Automated Lead Generation Pipelines",
    ],
  },
  {
    id: "research-development",
    title: "Research & Development",
    description:
      "Pioneering experimental technology architectures in machine learning, hybrid mobile plugins (Cordova BLE/GPS), and algorithmic problem solving at i AIM LABS.",
    icon: "FlaskConical",
    color: "#FF6347",
    category: "R&D",
    features: [
      "Novel Algorithm Exploration",
      "Hybrid Mobile Plugin R&D (BLE, Geolocation)",
      "Proof-of-Concept Prototyping",
      "Academic & Industrial Paper Implementation",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX & Product Design",
    description:
      "Designing clean, human-centered digital experiences with meticulous visual hierarchies, dark/light aesthetics, glassmorphic interfaces, and delightful micro-interactions.",
    icon: "Palette",
    color: "#8B5CF6",
    category: "Design",
    features: [
      "User Journey Mapping & Wireframing",
      "Modern Dark-Mode Design Systems",
      "Interactive Component Prototyping",
      "Accessibility & Responsive Layouts",
    ],
  },
  {
    id: "cybersecurity-consulting",
    title: "Cybersecurity & Code Audit",
    description:
      "Hardening web services and application infrastructure against common vulnerabilities, data leaks, and insecure API exposures through rigorous code reviews.",
    icon: "ShieldCheck",
    color: "#10B981",
    category: "Security",
    features: [
      "OWASP Top 10 Vulnerability Auditing",
      "Secure API Route Design & Rate Limiting",
      "Environment Secret Isolation",
      "Input Sanitization & Data Validation",
    ],
  },
  {
    id: "cloud-integration",
    title: "Cloud Solutions & Integration",
    description:
      "Deploying scalable, resilient web applications and ML services with modern cloud infrastructures like Firebase, Vercel, AWS, and serverless compute.",
    icon: "Cloud",
    color: "#00B4D8",
    category: "Cloud",
    features: [
      "Vercel & Firebase Hosting Setup",
      "CI/CD GitHub Actions Automation",
      "Serverless Functions & Route Handlers",
      "Scalable Storage & Asset CDN Optimization",
    ],
  },
];
