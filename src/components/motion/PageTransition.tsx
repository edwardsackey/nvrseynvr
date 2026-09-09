"use client";

import { usePathname } from "next/navigation";

/**
 * Re-keys its subtree on every route change so the CSS enter animation replays,
 * giving each page a short settle-in instead of a hard cut.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
