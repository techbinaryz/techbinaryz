"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** Ignore scroll jitter smaller than this (trackpads, momentum tails). */
const DIRECTION_THRESHOLD_PX = 6;

const TUCK = { scale: 0.82, opacity: 0, duration: 0.45, ease: "power3.inOut" } as const;
const RETURN = { duration: 0.65, ease: "power4.out" } as const;

/**
 * Large screens: scrolling down tucks the logo and the actions behind the nav capsule;
 * only scrolling up brings them back. Skipped below `lg`.
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

      mm.add({ isDesktop: "(min-width: 1024px)" }, (context) => {
        const { isDesktop } = context.conditions ?? {};
        const navEl = nav.current;
        const targets = sides.map((ref) => ref.current).filter((el): el is HTMLElement => el !== null);
        if (!isDesktop || !navEl || targets.length === 0) return;

        let tucked = false;
        let lastY = window.scrollY;

        const distanceToNav = (el: HTMLElement) => {
          const box = el.getBoundingClientRect();
          const navBox = navEl.getBoundingClientRect();
          const restingCentre = box.left - Number(gsap.getProperty(el, "x")) + box.width / 2;
          return navBox.left + navBox.width / 2 - restingCentre;
        };

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
