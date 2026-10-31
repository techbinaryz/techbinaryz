"use client";

import type { RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

/** Ignore scroll jitter smaller than this (trackpads, momentum tails). */
const DIRECTION_THRESHOLD_PX = 6;

const TUCK = { scale: 0.82, opacity: 0, duration: 0.45, ease: "power3.inOut" } as const;
// No overshoot on the way back: a springy ease would push the capsules past the screen edge.
const RETURN = { duration: 0.65, ease: "power4.out" } as const;

/** GSAP ignores reduced motion, so animations must check this themselves. */
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Large screens: scrolling down tucks the logo and the settings capsule in
 * behind the nav capsule (which stays put); only scrolling up brings them back to their
 * places. Skipped below `lg` and when the visitor prefers reduced motion.
 */
export function useHeaderTuck({
  scope,
  nav,
  sides,
}: {
  scope: RefObject<HTMLElement | null>;
  nav: RefObject<HTMLElement | null>;
  sides: RefObject<HTMLElement | null>[];
}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ isDesktop: "(min-width: 64rem)", reduceMotion: REDUCED_MOTION_QUERY }, (context) => {
        const { isDesktop, reduceMotion } = context.conditions ?? {};
        const navEl = nav.current;
        const targets = sides.map((ref) => ref.current).filter((el): el is HTMLElement => el !== null);
        if (!isDesktop || reduceMotion || !navEl || targets.length === 0) return;

        let tucked = false;
        let lastY = window.scrollY;

        // Horizontal distance from a capsule's resting centre to the nav's centre.
        // Scaling is around the centre, so only the current x offset needs removing.
        const distanceToNav = (el: HTMLElement) => {
          const box = el.getBoundingClientRect();
          const navBox = navEl.getBoundingClientRect();
          const restingCentre = box.left - Number(gsap.getProperty(el, "x")) + box.width / 2;
          return navBox.left + navBox.width / 2 - restingCentre;
        };

        // Run later from event handlers, so registered with context.add(name, fn): the returned
        // wrapper records their tweens in this context, and they're reverted with it.
        const tuck = context.add("tuck", () => {
          if (tucked) return;
          tucked = true;
          gsap.set(targets, { pointerEvents: "none" });
          gsap.to(targets, {
            ...TUCK,
            x: (_index: number, el: HTMLElement) => distanceToNav(el),
            overwrite: "auto",
          });
        }) as () => void;

        const untuck = context.add("untuck", () => {
          if (!tucked) return;
          tucked = false;
          gsap.to(targets, {
            ...RETURN,
            x: 0,
            scale: 1,
            opacity: 1,
            overwrite: "auto",
            onComplete: () => gsap.set(targets, { clearProps: "pointerEvents" }),
          });
        }) as () => void;

        const onScroll = () => {
          const y = window.scrollY;
          const delta = y - lastY;
          if (Math.abs(delta) >= DIRECTION_THRESHOLD_PX) {
            if (delta > 0) tuck();
            else untuck();
            lastY = y;
          }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        // Keyboard users tabbing into a tucked capsule get it back straight away.
        targets.forEach((el) => el.addEventListener("focusin", untuck));

        return () => {
          window.removeEventListener("scroll", onScroll);
          targets.forEach((el) => el.removeEventListener("focusin", untuck));
        };
      });
    },
    { scope },
  );
}
