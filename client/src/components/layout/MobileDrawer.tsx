"use client";

import Link from "next/link";
import { ChevronRight, X, type LucideIcon } from "lucide-react";
import { DRAWER } from "@/data/Navigation.data";
import { UI_LABELS } from "@/data/ui.data";

const rowClass =
  "flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm text-foreground transition-colors hover:bg-foreground/[0.05] aria-[current=page]:bg-foreground/[0.06] aria-[current=page]:font-medium";

function DrawerLink({
  href,
  label,
  icon: Icon,
  pathname,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={pathname === href ? "page" : undefined}
        className={rowClass}
      >
        <Icon className="size-[18px] text-muted-foreground" aria-hidden="true" />
        {label}
        <span className="ml-auto flex items-center gap-2 text-muted-foreground tabular-nums">
          <ChevronRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </li>
  );
}

/** Side drawer on phones and tablets: navigation links. */
export function MobileDrawer({
  open,
  onOpenChange,
  pathname,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
}) {
  const close = () => onOpenChange(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 lg:hidden"
      onClick={close}
    >
      <div
        className="fixed right-0 top-0 bottom-0 w-[min(22rem,100%)] bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-row flex items-center justify-between gap-4 px-5 py-3">
          <div>
            <h2 className="text-lg font-semibold">{DRAWER.title}</h2>
          </div>
          <button
            onClick={close}
            aria-label={UI_LABELS.closeMenu}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-3 pb-6">
          <ul className="space-y-0.5">
            {DRAWER.more.map((link) => (
              <DrawerLink key={link.href} {...link} pathname={pathname} onNavigate={close} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
