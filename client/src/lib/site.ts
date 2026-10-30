import { SITE } from "@/data/site.data";

/**
 * Convert relative path to absolute URL
 */
export function absoluteUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${cleanPath}`;
}

/**
 * Get canonical URL for a page
 */
export function getCanonicalUrl(path: string): string {
  return absoluteUrl(path);
}
