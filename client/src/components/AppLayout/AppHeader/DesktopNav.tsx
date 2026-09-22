"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navData } from "@/data/Navigation.data";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="bg-muted-brand mx-2 hidden rounded-full border border-white/5 px-1 py-0.5 shadow-inner lg:flex"
    >
      <NavigationMenu className="max-w-full">
        <NavigationMenuList className="w-full">
          {navData.map(({ navOp, link }) => {
            const href = link ?? "#";
            const isActive = pathname === link;

            return (
              <NavigationMenuItem key={navOp}>
                <NavigationMenuLink
                  aria-current={isActive ? "page" : undefined}
                  render={<Link href={href} />}
                  className={cn(
                    "my-0.5 flex w-26 items-center justify-center rounded-full border border-transparent px-3.5 py-2 text-sm font-medium",
                    "transition-all duration-300 ease-out",
                    isActive
                      ? "bg-secondary-brand hover:bg-secondary-brand focus:bg-secondary-brand text-white"
                      : [
                          "text-slate-400 hover:text-black focus:text-black",
                          "hover:border-white/60 hover:bg-white/40 hover:shadow-sm hover:shadow-black/5 hover:backdrop-blur-md hover:backdrop-saturate-150",
                          "focus:border-white/60 focus:bg-white/40 focus:shadow-sm focus:shadow-black/5 focus:backdrop-blur-md focus:backdrop-saturate-150",
                        ],
                  )}
                >
                  {navOp}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

export default DesktopNav;
