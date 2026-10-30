import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Where the brand link is rendered; each context has its own sizing. */
type BrandLinkVariant = "header" | "drawer";

const VARIANT_STYLES: Record<
  BrandLinkVariant,
  { root: string; image: string }
> = {
  header: {
    root: "active:scale-95",
    image: "w-28 h-7 md:w-40 md:h-10",
  },
  drawer: {
    root: "rounded",
    image: "w-32 h-8 my-1",
  },
};

export interface BrandLinkProps {
  /** Called after the link is activated, e.g. to close an open drawer. */
  onNavigate?: () => void;
  variant?: BrandLinkVariant;
}

/** Brand logo linking home. Shared by the header bar and the drawer. */
export function BrandLink({ onNavigate, variant = "header" }: BrandLinkProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="TechBinaryz Home"
      className={cn(
        "inline-flex items-center shrink-0 rounded-lg transition-transform",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        styles.root,
      )}
    >
      <Image
        src="/TechBinary.png"
        alt="TechBinaryz Logo"
        width={200}
        height={200}
        priority
        className={cn("object-contain", styles.image)}
      />
    </Link>
  );
}

export default BrandLink;
