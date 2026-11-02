import type { NavLink } from "@/data/Navigation.data";

const matches = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

/** True when `pathname` is inside the section this nav link points to. */
export function isNavLinkActive(link: NavLink, pathname: string): boolean {
  if (link.notActiveFor?.some((prefix) => matches(pathname, prefix))) return false;
  return (link.activeFor ?? [link.href]).some((prefix) => matches(pathname, prefix));
}
