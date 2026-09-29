"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Github, CheckCircle2, Clock, Users, Tag } from "lucide-react";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#0c1322] border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Header Image / Pattern */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-surface to-background flex items-center justify-center">
              <span className="text-6xl font-bold text-white/10">{project.title.slice(0, 2)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-[#0c1322]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:bg-black flex items-center justify-center transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and tags in header bottom */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-accent-cyan border border-primary/30 backdrop-blur-md"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 bg-surface/50 border border-white/5 rounded-xl p-3.5">
            {project.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent-cyan" />
                <span>Duration: <strong>{project.duration}</strong></span>
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-accent-emerald" />
                <span>Team: <strong>{project.teamSize}</strong></span>
              </div>
            )}
            {project.highlights && project.highlights.length > 0 && (
              <div className="flex items-center gap-1.5 text-accent-amber">
                <Tag className="w-4 h-4" />
                <span>{project.highlights.join(" • ")}</span>
              </div>
            )}
          </div>

          {/* Full description */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Project Overview
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">
                Key Features & Capabilities
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-300">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-surface border border-white/10 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-surface/80 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-white/15 text-sm font-semibold text-white hover:bg-white/10 hover:border-primary/50 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-sm font-semibold text-white hover:opacity-90 shadow-glow-sm transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
