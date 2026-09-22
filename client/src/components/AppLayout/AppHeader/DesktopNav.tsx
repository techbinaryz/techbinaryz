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

/** Inline navigation pill shown in the header bar from the `lg` breakpoint up. */
export function DesktopNav() {
  const pathName = usePathname();

  return (
    <div className="bg-muted-brand mx-2 hidden rounded-full border border-white/5 px-1 py-0.5 shadow-inner lg:flex">
      <NavigationMenu className="max-w-full">
        <NavigationMenuList className="w-full">
          {navData.map((item) => (
            <NavigationMenuItem key={item.navOp}>
              <Link href={item.link || "#"} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "my-0.5 flex w-26 cursor-pointer items-center justify-center rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-[#725cff]",
                    pathName === item.link
                      ? "bg-muted-sub text-muted-rev"
                      : "hover:bg-muted-brand/50 text-slate-400",
                  )}
                >
                  {item.navOp}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default DesktopNav;
