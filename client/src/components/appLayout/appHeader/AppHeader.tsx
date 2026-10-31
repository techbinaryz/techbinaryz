"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import BrandLink from "./BrandLink";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SignInButton from "./SignInButton";
import { useHeaderTuck } from "./use-header-tuck";
import { CAPSULE, CAPSULE_TRANSPARENT } from "./header-styles";

export function AppHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Desktop refs for tuck effect
  const desktopRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useHeaderTuck({ scope: desktopRef, nav: navRef, sides: [logoRef, actionsRef] });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
  });

  return (
    <div className="fixed top-0 right-0 left-0 z-50 w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-4">
        {/* Mobile: Single capsule bar */}
        <motion.div
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: "-150%", opacity: 0 },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={cn(CAPSULE, "lg:hidden flex items-center justify-between gap-2 px-4 py-2.5")}
        >
          <BrandLink />
          <div className="flex items-center gap-2">
            <SignInButton />
            <MobileNav />
          </div>
        </motion.div>

        {/* Desktop: Three-column layout with separate capsules */}
        <div
          ref={desktopRef}
          className="hidden lg:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3"
        >
          {/* Left: Logo capsule - transparent, no border */}
          <div className="flex justify-start">
            <div
              ref={logoRef}
              className={cn(CAPSULE_TRANSPARENT, "inline-flex h-15.5 items-center px-5")}
            >
              <BrandLink />
            </div>
          </div>

          {/* Center: Nav capsule - white with border */}
          <nav
            ref={navRef}
            className={cn(CAPSULE, "flex items-center px-2 py-1.5")}
          >
            <DesktopNav />
          </nav>

          {/* Right: Actions capsule - transparent, no border */}
          <div className="flex justify-end">
            <div
              ref={actionsRef}
              className={cn(CAPSULE_TRANSPARENT, "inline-flex h-15.5 items-center px-3 gap-2")}
            >
              <SignInButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
