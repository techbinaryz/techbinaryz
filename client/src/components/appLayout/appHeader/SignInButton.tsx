import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Where the button is rendered; each context has its own sizing. */
type SignInButtonVariant = "header" | "drawer";

const BASE_CLASSES =
  "bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand text-white rounded-full font-medium transition-all shadow-sm";

const VARIANT_CLASSES: Record<SignInButtonVariant, string> = {
  header:
    "hidden cursor-pointer px-5 py-2.5 text-xs active:scale-95 md:text-sm lg:inline-flex",
  drawer: "w-full py-6 text-sm",
};

export interface SignInButtonProps {
  /** Called after the link is activated, e.g. to close an open drawer. */
  onNavigate?: () => void;
  variant?: SignInButtonVariant;
}

/** Links to the sign-in page. Shared by the header bar and the mobile drawer. */
export function SignInButton({
  onNavigate,
  variant = "header",
}: SignInButtonProps) {
  return (
    <Button asChild className={cn(BASE_CLASSES, VARIANT_CLASSES[variant])}>
      <Link href="/sign-in" onClick={onNavigate}>
        Sign In
      </Link>
    </Button>
  );
}

export default SignInButton;
