export type ProjectFilter = "all" | "popular" | "latest" | "following" | "upcoming";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectFilter[];
  technologies: string[];
  icon: string;
  image?: string;
  color: string;
  duration?: string;
  teamSize?: string;
  liveUrl?: string;
  githubUrl?: string;
  keyFeatures?: string[];
  highlights?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category?: string;
  features?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  skills: string[];
  icon: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  score: string;
  details?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  number?: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
