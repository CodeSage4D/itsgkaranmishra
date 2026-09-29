import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md mx-auto text-center relative z-10 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-surface/80 border border-white/10 flex items-center justify-center mx-auto shadow-2xl">
          <Compass className="w-10 h-10 text-primary animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan">
            Error 404
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The page you are looking for doesn’t exist, has been moved, or was migrated to the new Next.js architecture.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-cyan text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-white/10 text-white text-sm font-semibold hover:border-primary/50 transition-all"
          >
            <span>Explore Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
