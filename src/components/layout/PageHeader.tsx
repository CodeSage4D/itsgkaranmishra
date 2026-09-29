import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  breadcrumb,
}) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-[#0e1628] to-[#080c14] border-b border-white/5">
      {/* Decorative background grid and light spot */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/70 border border-white/10 text-xs text-slate-400 mb-6 backdrop-blur-md">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {badge && (
          <div className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20">
            {badge}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};
