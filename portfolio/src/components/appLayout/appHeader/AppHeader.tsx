"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { navData, NAV_LINKS } from "@/data/Navigation.data";
import { isNavLinkActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const CAPSULE =
  "bg-white backdrop-blur-2xl rounded-full border border-foreground/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.08)]";

const INDICATOR_SPRING = { 
  type: "spring", 
  stiffness: 300, 
  damping: 30, 
  mass: 0.6 
} as const;

export function AppHeader() {
  const pathname = usePathname();
  const isSignInPage = pathname === "/sign-in";

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 right-0 left-0 z-50 w-full bg-white/60 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/TechBinary.png"
              alt="TechBinaryz"
              width={200}
              height={200}
              priority
              className="w-28 h-7 md:w-40 md:h-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-muted-brand rounded-full border border-white/5 px-1.5 py-1.5 shadow-inner">
            {navData.map(({ navOp, link }) => {
              const isActive = pathname === link;
              return (
                <Link
                  key={navOp}
                  href={link ?? "#"}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-full border border-transparent transition-all duration-300",
                    isActive
                      ? "bg-secondary-brand text-white"
                      : "text-slate-400 hover:text-black hover:bg-white/40 hover:border-white/60"
                  )}
                >
                  {navOp}
                </Link>
              );
            })}
          </nav>

          {/* Sign In */}
          {!isSignInPage && (
            <div className="flex items-center gap-2 md:gap-4 lg:hidden">
              <Link
                href="/sign-in"
                className="px-5 py-2.5 text-xs md:text-sm bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand text-white rounded-full font-medium transition-all shadow-sm"
              >
                Sign In
              </Link>
            </div>
          )}
          <div className="hidden lg:flex items-center gap-2 md:gap-4">
            <Link
              href="/sign-in"
              className="px-5 py-2.5 text-xs md:text-sm bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand text-white rounded-full font-medium transition-all shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Bottom Mobile Navigation - Styled Capsule */}
      <nav
        aria-label="Sections"
        className="lg:hidden pointer-events-none fixed inset-x-0 bottom-0 z-40 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
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
                    "relative flex h-14 flex-col items-center justify-center gap-1 rounded-full text-[11px] font-medium transition-all duration-300 ease-out",
                    "outline-hidden focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="tab-indicator"
                      transition={INDICATOR_SPRING}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-foreground/8"
                    />
                  )}
                  <Icon 
                    className="relative size-5 transition-all duration-300 ease-out" 
                    strokeWidth={active ? 2.25 : 1.75} 
                    aria-hidden="true" 
                  />
                  <span className="relative">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default AppHeader;
