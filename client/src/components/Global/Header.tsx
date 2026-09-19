"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Global/Navigation";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full bg-primary fixed top-0 z-50">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center shrink-0 cursor-pointer" onClick={() => router.push('/')}>
          <Image
            src="/TechBinary.png"
            alt="TechBinaryz Logo"
            width={200}
            height={200}
            className="object-contain w-28 h-7 md:w-40 md:h-10"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex bg-muted-brand py-0.5 px-1 rounded-full mx-2">
          <Navigation />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Sign In Button */}
          <button
            onClick={() => router.push("/sign-in")}
            className="hidden lg:w-26 md:w-26 lg:block bg-tertiary hover:bg-[#c0fdfb] hover:text-secondary text-white px-4 py-2 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-medium cursor-pointer"
          >
            Sign In
          </button>

          {/* Mobile Hamburger — triggers Drawer */}
          <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
            <DrawerTrigger className="lg:hidden text-base-foreground p-2" aria-label="Open menu">
              <Menu />
            </DrawerTrigger>

            <DrawerContent className="bg-primary ">
              <DrawerHeader className="px-6 py-3">
                <DrawerTitle>
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src="/TechBinary.png"
                      alt="TechBinaryz Logo"
                      width={160}
                      height={40}
                      className="object-contain w-32 h-8 my-3"
                    />
                  </Link>
                </DrawerTitle>
              </DrawerHeader>

              <div className="px-4">
                <Navigation vertical onNavigate={() => setOpen(false)} />
              </div>

              {/* Sign In inside drawer for mobile */}
              <div className="px-4 pb-8 mt-auto">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-tertiary hover:bg-[#c0fdfb] hover:text-primary text-white px-4 py-3 rounded-full text-sm font-medium cursor-pointer transition"
                >
                  Sign In
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header >
  );
}
