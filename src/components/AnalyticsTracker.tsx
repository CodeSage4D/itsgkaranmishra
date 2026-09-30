"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackVisitor, trackClick } from "@/lib/analytics-client";

export function AnalyticsTracker() {
  const pathname = usePathname();

  // Track page / profile views
  useEffect(() => {
    if (!pathname) return;
    trackVisitor(pathname);
  }, [pathname]);

  // Global click event listener for CTAs, links, buttons
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button'], input[type='submit']");
      if (clickable) {
        const text =
          clickable.textContent?.trim() ||
          clickable.getAttribute("aria-label") ||
          clickable.getAttribute("title") ||
          clickable.getAttribute("id") ||
          "Interactive Element";
        const href = clickable.getAttribute("href") || undefined;
        const id = clickable.getAttribute("id") || undefined;

        trackClick(text, href, id);
      }
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
