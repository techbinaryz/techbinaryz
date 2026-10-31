// Shared interface labels used by layout components.

export const LOGO = {
  /** Always shown. */
  primary: "Tech",
  /** Shown next to `primary`. */
  secondary: "Binaryz",
  /** Small line under the name in the header lockup. */
  tagline: "Empowering Tech Solutions",
} as const;

export const UI_LABELS = {
  openMenu: "Open menu",
  closeMenu: "Close menu",
  mainNav: "Main",
  tabBar: "Sections",
  copyright: (year: number, name: string) => `© ${year} ${name}. All rights reserved.`,
} as const;
