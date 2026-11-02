import { Home, LayoutGrid, Users, Mail, type LucideIcon } from "lucide-react";

type subOpTypes = {
  subImgUrl?: string;
  subText: string;
  link?: string;
};

type navDataTypes = {
  navOp: string;
  icon: LucideIcon;
  subOp?: subOpTypes[];
  link?: string;
};

export const navData: navDataTypes[] = [
  {
    navOp: "Home",
    icon: Home,
    link: "/",
  },
  {
    navOp: "Products",
    icon: LayoutGrid,
    link: "/products",
    subOp: [
      {
        subImgUrl: "/HomeImg/text.svg",
        subText: "Text Generator",
      },
      {
        subImgUrl: "/HomeImg/image.svg",
        subText: "Image Generator",
      },
      {
        subImgUrl: "/HomeImg/code.svg",
        subText: "Code Generator",
      },
      {
        subImgUrl: "/HomeImg/video.svg",
        subText: "Video Generator",
      },
      {
        subImgUrl: "/HomeImg/email.svg",
        subText: "Email Generator",
      },
    ],
  },
  {
    navOp: "About Us",
    icon: Users,
    link: "/about-us",
  },
  {
    navOp: "Contact Us",
    icon: Mail,
    link: "/contact-us",
  },
];

// Navigation structure compatible with header component
export interface NavLink {
  href: string;
  label: string;
  /** Shown in the bottom tab bar on phones and tablets. */
  icon: LucideIcon;
  /** Path prefixes that mark this link as the current section. Defaults to `href`. */
  activeFor?: readonly string[];
  /** Path prefixes that never mark this link as current, even if they match `activeFor`. */
  notActiveFor?: readonly string[];
}

export const NAV_LINKS: readonly NavLink[] = [
  // Matches "/" exactly, so it's only the current tab on the home page.
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: LayoutGrid },
  { href: "/about-us", label: "About Us", icon: Users },
  { href: "/contact-us", label: "Contact Us", icon: Mail },
];

/** Side drawer on phones and tablets (opened from the top bar's menu button). */
export const DRAWER = {
  title: "Menu",
  description: "Navigation menu",
  more: [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: LayoutGrid },
    { href: "/about-us", label: "About Us", icon: Users },
    { href: "/contact-us", label: "Contact Us", icon: Mail },
  ],
} as const;
