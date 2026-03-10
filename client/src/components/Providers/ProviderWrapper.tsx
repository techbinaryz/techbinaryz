"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

export default function ProviderWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return <ThemeProvider>{children}</ThemeProvider>;
}