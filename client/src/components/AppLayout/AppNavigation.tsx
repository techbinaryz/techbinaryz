"use client";
import { useState } from "react";
import { navData } from "@/data/Navigation.data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface AppNavigationProps {
  vertical?: boolean;
  onNavigate?: () => void;
}

export default function AppNavigation({ vertical = false, onNavigate }: AppNavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathName = usePathname();

  return (
    <NavigationMenu className={cn("max-w-full", vertical ? "w-full flex-col items-start" : "")}>
      <NavigationMenuList className={cn("w-full", vertical ? "flex-col gap-1 items-start" : "")}>
        {navData.map((item, index) => (
          <NavigationMenuItem 
            key={index} 
            className={cn(vertical ? "w-full" : "")}
            onMouseEnter={() => setOpenMenu(item.navOp)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link href={item.link || "#"} legacyBehavior passHref>
              <NavigationMenuLink
                onClick={() => onNavigate?.()}
                className={cn(
                  "flex items-center cursor-pointer rounded-full text-sm font-medium hover:text-[#725cff] transition-colors",
                  vertical
                    ? "w-full px-4 py-3 justify-start gap-3"
                    : "w-26 justify-center px-3.5 my-0.5 py-2",
                  pathName === item.link
                    ? "bg-muted-sub text-muted-rev"
                    : "text-slate-400 hover:bg-muted-brand/50"
                )}
              >
                {vertical && item.icon && <item.icon size={18} />}
                {item.navOp}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
