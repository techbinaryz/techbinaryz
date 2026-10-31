"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, LogIn } from "lucide-react";
import { CAPSULE, ICON_BUTTON, INDICATOR_SPRING } from "@/components/layout/header-styles";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { useHeaderTuck } from "@/components/layout/use-header-tuck";
import { NAV_LINKS } from "@/data/Navigation.data";
import { SITE } from "@/data/metadata/site.data";
import { LOGO, UI_LABELS } from "@/data/ui.data";
import { isNavLinkActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Airbnb-style tab indicator: one pill, contained in the nav capsule, that slides to whichever
 * link is hovered or focused, and back to the current page's link when the pointer or focus
 * leaves the group.
 */
function useNavIndicator(pathname: string) {
  const [pointed, setPointed] = useState<string | null>(null);
  const activeHref = NAV_LINKS.find((link) => isNavLinkActive(link, pathname))?.href ?? null;

  return {
    target: pointed ?? activeHref,
    linkProps: (href: string) => ({
      onPointerEnter: () => setPointed(href),
      onFocus: () => setPointed(href),
    }),
    groupProps: {
      onPointerLeave: () => setPointed(null),
      // Only reset when focus moves outside the group, not between its links.
      onBlur: (event: React.FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPointed(null);
      },
    },
  };
}

/**
 * Header lockup: the logo beside a two-line title (name, then tagline) of the same
 * height, so the logo and text balance.
 */
function SiteLockup() {
  return (
    <>
      <Image
        src={SITE.logo}
        alt=""
        width={100}
        height={100}
        sizes="64px"
        className="h-9 sm:h-10 w-auto shrink-0"
      />
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-heading text-[15px] min-[360px]:text-base sm:text-[17px] font-semibold leading-tight tracking-wide text-foreground">
          {LOGO.primary}
          <span className="ml-[0.25em] font-light">{LOGO.secondary}</span>
        </span>
        <span className="mt-0.5 truncate font-sans text-[8.5px] min-[360px]:text-[9px] font-medium uppercase leading-tight tracking-[0.16em] text-muted-foreground">
          {LOGO.tagline}
        </span>
      </span>
    </>
  );
}

const focusRing =
  "outline-hidden focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

/**
 * Large screens (lg+): logo, nav links. The nav stays put;
 * the side capsules tuck in behind it on scroll down and come back on scroll up
 * (`useHeaderTuck`, GSAP).
 * Phones and tablets: a top bar with the site name and a menu button for the side drawer,
 * plus a bottom tab bar with the main sections. The top bar hides on scroll down.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const indicator = useNavIndicator(pathname);

  const desktopRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const signInRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useHeaderTuck({ scope: desktopRef, nav: navRef, sides: [logoRef, signInRef] });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
  });

  return (
    <>
      <header
        className="fixed top-[max(0.75rem,env(safe-area-inset-top))] lg:top-[max(1rem,env(safe-area-inset-top))] left-0 right-0 z-50 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] lg:pl-[max(1rem,env(safe-area-inset-left))] lg:pr-[max(1rem,env(safe-area-inset-right))]"
      >
        {/* Phones and tablets: full site name and the drawer button. Hides on scroll down. */}
        <motion.div
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: "-150%", opacity: 0 },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={cn(CAPSULE, "lg:hidden flex items-center justify-between gap-2 pl-3 min-[360px]:pl-4 pr-1.5 py-1.5")}
        >
          <Link
            href="/"
            aria-label={SITE.name}
            className={cn("flex min-w-0 items-center gap-2.5 rounded-full py-1", focusRing)}
          >
            <SiteLockup />
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={ICON_BUTTON}
            aria-label={UI_LABELS.openMenu}
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Large screens: two equal side columns that never grow past their share, so the nav
            sits exactly in the horizontal centre */}
        <div
          ref={desktopRef}
          className="hidden lg:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3"
        >
          <div className="flex justify-start">
            <Link
              ref={logoRef}
              href="/"
              aria-label={SITE.name}
              className={cn(
                CAPSULE,
                "inline-flex h-15.5 min-w-0 max-w-full items-center gap-3 pl-4 pr-5 xl:pr-6 whitespace-nowrap",
                focusRing,
              )}
            >
              <SiteLockup />
            </Link>
          </div>

          {/* Above the side capsules, which tuck in behind it while scrolling */}
          <nav
            ref={navRef}
            aria-label={UI_LABELS.mainNav}
            className={cn(CAPSULE, "relative z-10 flex shrink-0 items-center gap-1 px-2 py-2")}
          >
            {/* Equal-width columns: every link is as wide as the longest one */}
            <div className="grid auto-cols-fr grid-flow-col items-center gap-1" {...indicator.groupProps}>
              {NAV_LINKS.map((link) => {
                const active = isNavLinkActive(link, pathname);
                const highlighted = indicator.target === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    {...indicator.linkProps(link.href)}
                    className={cn(
                      "relative inline-flex min-h-11 items-center justify-center px-3.5 xl:px-5 text-[11px] font-semibold tracking-[0.18em] xl:tracking-[0.2em] whitespace-nowrap uppercase rounded-full transition-colors duration-200",
                      focusRing,
                      active || highlighted ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {highlighted && (
                      <motion.span
                        layoutId="nav-indicator"
                        transition={INDICATOR_SPRING}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-foreground/[0.08]"
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex justify-end">
            {/* Sign In button */}
            <Link
              ref={signInRef}
              href="/sign-in"
              className={cn(
                CAPSULE,
                "inline-flex h-15.5 items-center gap-2.5 pl-5 pr-6 whitespace-nowrap text-foreground hover:text-foreground/90 transition-colors duration-200",
                focusRing,
              )}
            >
              <LogIn className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide">Sign In</span>
            </Link>
          </div>
        </div>
      </header>

      <MobileTabBar pathname={pathname} />
      <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} pathname={pathname} />
    </>
  );
}
