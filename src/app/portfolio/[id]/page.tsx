import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Clock,
  Users,
  Tag,
  Share2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { projectsData } from "@/data/portfolio";

interface ProjectDetailsPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export function generateMetadata({ params }: ProjectDetailsPageProps) {
  const project = projectsData.find(
    (p) => p.id === params.id || p.slug === params.id
  );
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} - Project Case Study`,
    description: project.shortDescription,
  };
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const project = projectsData.find(
    (p) => p.id === params.id || p.slug === params.id
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="relative">
      <PageHeader
        badge="Case Study"
        title={project.title}
        subtitle={project.shortDescription}
        breadcrumb={[
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Hero Visual Card */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-surface flex items-center justify-center">
              <span className="text-8xl font-black text-white/10">{project.title.slice(0, 2)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/40 to-transparent" />
        </div>

        {/* Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-surface/60 border border-white/5 text-sm">
          <div>
            <div className="text-xs text-slate-400 font-mono">Category</div>
            <div className="text-white font-semibold capitalize mt-0.5">
              {project.category.filter((c) => c !== "all").join(", ")}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Duration</div>
            <div className="text-white font-semibold mt-0.5">
              {project.duration || "N/A"}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Team Scale</div>
            <div className="text-white font-semibold mt-0.5">
              {project.teamSize || "Individual"}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Primary Focus</div>
            <div className="text-white font-semibold mt-0.5">
              {project.technologies[0] || "AI/ML"}
            </div>
          </div>
        </div>

        {/* Detailed Narrative */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Project Overview & Architecture</h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Key Features */}
        {project.keyFeatures && (
          <div className="p-8 rounded-3xl bg-surface/40 border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight">Key Capabilities & Engineering Deliverables</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight">Technologies & Tooling</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-surface border border-white/10 text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-white/10 text-white font-semibold text-sm hover:border-primary/50 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <Link
            href="/contact"
            className="text-xs font-semibold text-accent-cyan hover:underline"
          >
            Inquire about this project →
          </Link>
        </div>
      </div>
    </div>
  );
}
