"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import MobileNavDrawer from "./MobileNavDrawer";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

/**
 * Hamburger trigger and its slide-in navigation drawer.
 * Hidden from the `lg` breakpoint up, where DesktopNav takes over.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => setOpen(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
      <DrawerTrigger
        aria-label="Open navigation menu"
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-base-foreground hover:bg-muted-brand/50 rounded-full hover:text-white lg:hidden"
          />
        }
      >
        <Menu className="size-6" />
      </DrawerTrigger>

      <MobileNavDrawer onClose={closeDrawer} />
    </Drawer>
  );
}

export default MobileNav;
