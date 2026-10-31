"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CAPSULE, INDICATOR_SPRING } from "@/components/layout/header-styles";
import { NAV_LINKS } from "@/data/Navigation.data";
import { UI_LABELS } from "@/data/ui.data";
import { isNavLinkActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * App-style bottom tab bar with the main sections, on phones and tablets. Body padding
 * (`pb-tabbar`) keeps page content clear of it.
 */
export function MobileTabBar({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label={UI_LABELS.tabBar}
      className="lg:hidden pointer-events-none fixed inset-x-0 bottom-0 z-50 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <ul className={cn(CAPSULE, "pointer-events-auto mx-auto flex max-w-md p-1.5")}>
        {NAV_LINKS.map((link) => {
          const active = isNavLinkActive(link, pathname);
          const Icon = link.icon;
          return (
            <li key={link.href} className="flex-1">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-14 flex-col items-center justify-center gap-1 rounded-full text-[11px] font-medium transition-colors",
                  "outline-hidden focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="tab-indicator"
                    transition={INDICATOR_SPRING}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-foreground/[0.08]"
                  />
                )}
                <Icon className="relative size-5" strokeWidth={active ? 2.25 : 1.75} aria-hidden="true" />
                <span className="relative">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
