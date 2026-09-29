"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Project, ProjectFilter } from "@/types";
import { projectsData } from "@/data/portfolio";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectModal } from "@/components/portfolio/ProjectModal";

interface PortfolioSectionProps {
  initialLimit?: number;
  showFilterTabs?: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  initialLimit = 6,
  showFilterTabs = true,
}) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: { label: string; value: ProjectFilter }[] = [
    { label: "All Projects", value: "all" },
    { label: "Popular", value: "popular" },
    { label: "Latest", value: "latest" },
    { label: "Following", value: "following" },
    { label: "Upcoming & R&D", value: "upcoming" },
  ];

  const filteredProjects = projectsData.filter((project) =>
    activeFilter === "all" ? true : project.category.includes(activeFilter)
  );

  const displayedProjects = initialLimit
    ? filteredProjects.slice(0, initialLimit)
    : filteredProjects;

  return (
    <section className="py-24 bg-surface/20 border-t border-white/5 relative" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineered Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Case Studies & Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              From enterprise fraud detection models with 99.97% accuracy to real-time NLP analyzers, mobile BLE plugins, and web automations.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-cyan transition-colors"
          >
            <span>View All ({projectsData.length}) Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        {showFilterTabs && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5 overflow-x-auto">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-glow-sm"
                      : "bg-surface/60 text-slate-400 hover:text-white hover:bg-surface border border-white/5"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Empty State */}
        {displayedProjects.length === 0 && (
          <div className="text-center py-16 bg-surface/30 rounded-2xl border border-white/5">
            <p className="text-slate-400 text-sm">
              No projects found in this category. Select another filter above.
            </p>
          </div>
        )}
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
