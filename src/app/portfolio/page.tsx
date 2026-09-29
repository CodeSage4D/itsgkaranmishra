"use client";

import React, { useState, useMemo } from "react";
import { Search, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Project, ProjectFilter } from "@/types";
import { projectsData } from "@/data/portfolio";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectModal } from "@/components/portfolio/ProjectModal";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: { label: string; value: ProjectFilter }[] = [
    { label: "All Projects", value: "all" },
    { label: "Popular", value: "popular" },
    { label: "Latest", value: "latest" },
    { label: "Following", value: "following" },
    { label: "Upcoming & R&D", value: "upcoming" },
  ];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesFilter =
        activeFilter === "all" ? true : project.category.includes(activeFilter);

      const matchesSearch =
        searchQuery.trim() === ""
          ? true
          : project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.technologies.some((tech) =>
              tech.toLowerCase().includes(searchQuery.toLowerCase())
            );

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="relative">
      <PageHeader
        badge="Engineered Work"
        title="Portfolio & Case Studies"
        subtitle="Explore my work spanning production machine learning, natural language processing, automated bots, hybrid mobile plugins, and interactive web tools."
        breadcrumb={[{ label: "Portfolio" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Controls Toolbar: Categories and Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
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

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech, keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredProjects.length} of {projectsData.length} projects
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 rounded-2xl bg-surface/30 border border-white/5 space-y-3">
            <Sparkles className="w-8 h-8 text-primary mx-auto opacity-50" />
            <p className="text-white font-medium text-base">No matching projects found</p>
            <p className="text-slate-400 text-xs">
              Try adjusting your search query or switching to another category tab.
            </p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="mt-2 text-xs font-semibold text-primary hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Modal View */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
