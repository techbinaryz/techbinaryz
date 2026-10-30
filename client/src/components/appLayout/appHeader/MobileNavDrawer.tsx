"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navData } from "@/data/Navigation.data";
import BrandLink from "./BrandLink";
import SignInButton from "./SignInButton";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export interface MobileNavDrawerProps {
  /** Closes the surrounding drawer, e.g. after navigating. */
  onClose: () => void;
}

/** Contents of the mobile navigation drawer: brand, links and sign-in. */
export function MobileNavDrawer({ onClose }: MobileNavDrawerProps) {
  const pathName = usePathname();

  return (
    <DrawerContent className="bg-primary text-foreground flex h-full max-w-xs flex-col border-r border-white/10 data-[swipe-axis=x]:flex-col sm:max-w-sm">
      <DrawerHeader className="flex flex-row items-center justify-between border-b border-white/10 px-6 py-4">
        <DrawerTitle className="m-0 text-left">
          <BrandLink variant="drawer" onNavigate={onClose} />
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          Mobile navigation menu for TechBinaryz website
        </DrawerDescription>
        <DrawerClose
          aria-label="Close navigation menu"
          render={
            <Button
              variant="ghost"
              size="icon"
              className="text-base-foreground hover:bg-muted-brand/60 size-8 rounded-full hover:text-white"
            />
          }
        >
          <X className="size-4" />
        </DrawerClose>
      </DrawerHeader>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <NavigationMenu className="w-full max-w-full flex-col items-start">
          <NavigationMenuList className="w-full flex-col items-start gap-1">
            {navData.map(({ navOp, link, icon: Icon }) => {
              const isActive = pathName === link;

              return (
                <NavigationMenuItem key={navOp} className="w-full">
                  <NavigationMenuLink
                    aria-current={isActive ? "page" : undefined}
                    onClick={onClose}
                    render={<Link href={link ?? "#"} />}
                    className={cn(
                      "flex w-full items-center justify-start gap-3 rounded-full px-4 py-3 text-sm font-medium transition-colors",
                      // The shadcn base sets hover/focus backgrounds; override them
                      // so the active row keeps its colour after being tapped.
                      isActive
                        ? "bg-secondary-brand text-white hover:bg-secondary-brand focus:bg-secondary-brand"
                        : "text-slate-400 hover:bg-muted-brand/50 hover:text-black focus:bg-muted-brand/50 focus:text-black",
                    )}
                  >
                    {Icon && <Icon size={18} />}
                    {navOp}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <DrawerFooter className="border-t border-white/10 px-4 pt-4 pb-8">
        <SignInButton variant="drawer" onNavigate={onClose} />
      </DrawerFooter>
    </DrawerContent>
  );
}

export default MobileNavDrawer;
