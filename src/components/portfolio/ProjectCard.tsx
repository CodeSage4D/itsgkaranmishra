"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldAlert,
  Bot,
  TrendingUp,
  Database,
  Scan,
  Gamepad2,
  MessageSquareText,
  Mic,
  AlertTriangle,
  Coffee,
  Bluetooth,
  MapPin,
  BarChart3,
  ExternalLink,
  Info,
} from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const renderIcon = () => {
    const iconProps = { className: "w-8 h-8", style: { color: project.color } };
    switch (project.icon) {
      case "ShieldAlert":
        return <ShieldAlert {...iconProps} />;
      case "Bot":
        return <Bot {...iconProps} />;
      case "TrendingUp":
        return <TrendingUp {...iconProps} />;
      case "Database":
        return <Database {...iconProps} />;
      case "Scan":
        return <Scan {...iconProps} />;
      case "Gamepad2":
        return <Gamepad2 {...iconProps} />;
      case "MessageSquareText":
        return <MessageSquareText {...iconProps} />;
      case "Mic":
        return <Mic {...iconProps} />;
      case "AlertTriangle":
        return <AlertTriangle {...iconProps} />;
      case "Coffee":
        return <Coffee {...iconProps} />;
      case "Bluetooth":
        return <Bluetooth {...iconProps} />;
      case "MapPin":
        return <MapPin {...iconProps} />;
      case "BarChart3":
      default:
        return <BarChart3 {...iconProps} />;
    }
  };

  return (
    <div className="group relative rounded-2xl bg-surface/50 border border-white/5 hover:border-primary/40 hover:bg-surface/80 p-5 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/20 hover:shadow-glow-sm hover:-translate-y-1">
      {/* Top accent glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        }}
      />

      <div>
        {/* Media or Icon container */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/5 flex items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-90"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
              {renderIcon()}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Floating icon badge */}
          <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 shadow-lg">
            {renderIcon()}
          </div>

          {/* Category Pill */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {project.category
              .filter((c) => c !== "all")
              .slice(0, 1)
              .map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-accent-cyan border border-white/10"
                >
                  {c}
                </span>
              ))}
          </div>
        </div>

        {/* Title and Short Description */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors tracking-tight line-clamp-1 mb-1.5">
            {project.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 text-slate-300 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[11px] font-medium bg-white/5 text-slate-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Button */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        <button
          onClick={() => onOpenDetails(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent-cyan transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Case Study & Details</span>
        </button>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
            aria-label={`View ${project.title} on GitHub`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
