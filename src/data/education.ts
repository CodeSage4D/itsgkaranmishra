import { EducationItem, CertificationItem } from "@/types";

export const educationData: EducationItem[] = [
  {
    institution: "Sri Aurobindo Institute of Technology (SAIT)",
    degree: "Bachelor of Science in Computer Science & Engineering",
    period: "2020 - 2024",
    location: "Indore, MP, India",
    score: "CGPA: 8.26 / 10.0",
    details: [
      "Specialization in Computer Science, Machine Learning, and Software Engineering",
      "Major Projects: ResNet-18 Flower Species Classifier & Financial Fraud Detection System (99.97% Accuracy)",
      "Chief Secretary of the IEEE Student Branch in the MP Section",
      "Coordinator for IEEE 3rd International Conference on Data Science and Data Analytics (IDBA-ACMWIR-2023)",
      "Coordinator for TEDxSAIT event 'Extraordinary in Ordinary'",
      "Gold Medalist in Technical Quiz Competition at College Fest (1st Place)",
    ],
  },
  {
    institution: "Rama Krishna Mission Vidyapeeth",
    degree: "Senior Secondary (Class XII) - P.C.M.",
    period: "2019 - 2020",
    location: "Indore, MP, India",
    score: "Percentage: 56.8%",
    details: ["Physics, Chemistry, Mathematics stream with core analytical foundation."],
  },
  {
    institution: "Rama Krishna Mission Vidyapeeth",
    degree: "Secondary School (Class X)",
    period: "2017 - 2018",
    location: "Indore, MP, India",
    score: "Percentage: 71.44%",
    details: ["Foundational academics with strong aptitude in mathematics and sciences."],
  },
];

export const certificationsData: CertificationItem[] = [
  {
    title: "Python Programming Certification",
    issuer: "Ministry of Micro, Small and Medium Enterprises (MSME), Govt. of India",
    year: "2021",
    description: "Rigorous government-certified training covering Python syntax, data structures, and script automation.",
  },
  {
    title: "ChatGPT Prompt Engineering for Developers",
    issuer: "OpenAI / DeepLearning.AI",
    year: "2023",
    description: "Principles of LLM orchestration, structured output conditioning, and prompt architectures for AI systems.",
  },
  {
    title: "International Math Olympiad (Zone Level)",
    issuer: "IMO Board",
    year: "Academic Honors",
    description: "Secured 2nd position at the zone level, demonstrating advanced mathematical problem-solving capabilities.",
  },
];

export const technicalSkills = {
  languages: ["Python", "JavaScript / TypeScript", "C / C++", "Java", "SQL"],
  frameworks: ["Next.js (App Router)", "React", "Flask", "Django", "Node.js", "Cordova", "Tailwind CSS"],
  machineLearning: ["PyTorch", "TensorFlow", "Scikit-Learn", "NLP & Transformers", "OpenCV", "Random Forest", "ResNet-18"],
  dataAnalytics: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "D3.js", "Streamlit"],
  toolsAndDevOps: ["Git & GitHub", "Firebase", "VS Code", "Vercel", "BeautifulSoup", "Selenium", "Postman", "Linux"],
  databases: ["MySQL", "PostgreSQL", "Firebase Realtime DB", "SQLite"],
};
