import BrandLink from "./BrandLink";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SignInButton from "./SignInButton";
import { cn } from "@/lib/utils";

export function AppHeader() {
  return (
    <div
      className={cn(
        "fixed top-0 right-0 left-0 z-50 w-full",
        "bg-primary/95 border-b border-white/5 shadow-md backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 md:h-20">
        <BrandLink />

        <DesktopNav />

        <div className="flex items-center gap-2 md:gap-4">
          <SignInButton />
          <MobileNav />
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
