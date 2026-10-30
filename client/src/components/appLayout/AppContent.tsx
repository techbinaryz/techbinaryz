import React from "react";
import { cn } from "@/lib/utils";

interface AppContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppContent({ children, className }: AppContentProps) {
  return <main className={cn("pt-16 md:pt-20", className)}>{children}</main>;
}
