"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AppNavigation from "./AppNavigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export interface AppHeaderProps {
  className?: string;
}

export function AppHeader({ className }: AppHeaderProps) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-md border-b border-white/5"
          : "bg-primary border-b border-transparent",
        className
      )}
    >
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-transform active:scale-95"
          aria-label="TechBinaryz Home"
        >
          <Image
            src="/TechBinary.png"
            alt="TechBinaryz Logo"
            width={200}
            height={200}
            priority
            className="object-contain w-28 h-7 md:w-40 md:h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex bg-muted-brand py-0.5 px-1 rounded-full mx-2 shadow-inner border border-white/5">
          <AppNavigation />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Sign In Button */}
          <Button
            asChild
            className="hidden lg:inline-flex bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-medium cursor-pointer transition-all shadow-sm active:scale-95"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>

          {/* Mobile Hamburger Drawer */}
          <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-base-foreground hover:text-white hover:bg-muted-brand/50 rounded-full"
                aria-label="Open navigation menu"
              >
                <Menu className="size-6" />
              </Button>
            </DrawerTrigger>

            <DrawerContent className="bg-primary flex flex-col [&[data-swipe-axis=x]]:flex-col h-full border-r border-white/10 text-foreground max-w-xs sm:max-w-sm">
              <DrawerHeader className="px-6 py-4 border-b border-white/10 flex flex-row items-center justify-between">
                <DrawerTitle className="text-left m-0">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    aria-label="TechBinaryz Home"
                  >
                    <Image
                      src="/TechBinary.png"
                      alt="TechBinaryz Logo"
                      width={160}
                      height={40}
                      className="object-contain w-32 h-8 my-1"
                    />
                  </Link>
                </DrawerTitle>
                <DrawerDescription className="sr-only">
                  Mobile navigation menu for TechBinaryz website
                </DrawerDescription>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full text-base-foreground hover:text-white hover:bg-muted-brand/60"
                    aria-label="Close navigation menu"
                  >
                    <X className="size-4" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              {/* Drawer Navigation Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <AppNavigation vertical onNavigate={() => setOpen(false)} />
              </div>

              {/* Mobile Sign In inside Drawer Footer */}
              <DrawerFooter className="px-4 pb-8 pt-4 border-t border-white/10">
                <Button
                  asChild
                  className="w-full bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand text-white py-6 rounded-full text-sm font-medium transition-all shadow-sm"
                >
                  <Link href="/sign-in" onClick={() => setOpen(false)}>
                    Sign In
                  </Link>
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
export { AppHeader as Header };
