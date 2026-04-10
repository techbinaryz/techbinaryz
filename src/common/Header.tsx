"use client";

import { useState } from "react";
import Image from "next/image";
import Navigation from "@/common/Navigation";
import {
  Computer,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "@/components/Providers/ThemeProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);
  const { theme, setDark, setLight, setSystem } =
    useTheme();


  return (
    <header className="w-full bg-primary sticky top-0 z-50 border-b border-gray-800 overflow-hidden">
      <div className="2xl:max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center shrink-0">
          <Image
            src="/Tech Binary.png"
            alt="TechBinaryz Logo"
            width={200}
            height={200}
            className="object-cover w-36 h-9 md:w-52 md:h-14"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex bg-muted-brand py-0.5 px-1 rounded-full mx-2">
          <Navigation />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">

          <div className="flex bg-muted-brand py-0.5 px-1 rounded-full mx-2">
            <div
              className={`flex items-center justify-center px-3.5 cursor-pointer rounded-full text-sm font-medium hover:text-[#725cff]"
              ${theme == "system" ? "bg-muted-sub my-0.5 py-2 text-muted-rev" : ""}`}
            >
              <Computer onClick={setSystem} />
            </div>

            <div
              className={`flex items-center justify-center px-3.5 cursor-pointer rounded-full text-sm font-medium hover:text-[#725cff]
              ${theme == "light" ? "bg-muted-sub my-0.5 py-2 text-muted-rev" : ""}`}
            >
              <Sun onClick={setLight} />
            </div>
            <div
              className={`flex items-center justify-center px-3.5 cursor-pointer rounded-full text-sm font-medium hover:text-[#725cff]
              ${theme == "dark" ? "bg-muted-sub my-0.5 py-2 text-muted-rev" : ""}`}>
              <Moon onClick={setDark} />
            </div>
          </div>

          {/* Action Buttons */}
          <button className="hidden lg:w-26 md:w-26 lg:block bg-tertiary hover:bg-[#c0fdfb] hover:text-primary text-white px-4 py-2 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-medium cursor-pointer">
            Sign In
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-base-foreground p-2"
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {
        isMenuOpen && (
          <div className="lg:hidden bg-primary border-b border-gray-800 px-6 py-4 flex flex-col gap-4">
            <Navigation />

            <button className="w-full md:block sm:block bg-tertiary text-base-brand p-4 rounded-3xl text-sm">
              Sign In
            </button>
          </div>
        )
      }
    </header>
  );
}
