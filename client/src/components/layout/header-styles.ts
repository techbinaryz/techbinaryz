// Shared by the header, the phone top bar, the bottom tab bar and the side drawer.

/** Frosted capsule: the site's header surface. */
export const CAPSULE =
  "bg-white backdrop-blur-2xl rounded-full border border-foreground/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]";

/** Round 44px icon button used inside capsules. */
export const ICON_BUTTON =
  "relative inline-flex size-11 items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06] transition-all duration-300 cursor-pointer outline-hidden focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground aria-[current=page]:text-foreground aria-[current=page]:bg-foreground/[0.06]";

/** Spring for sliding indicators: quick, with a small settle and no bounce. */
export const INDICATOR_SPRING = { type: "spring", stiffness: 420, damping: 36, mass: 0.8 } as const;
