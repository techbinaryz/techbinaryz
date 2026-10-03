"use client";

import {
  Globe,
  Smartphone,
  Code2,
  Layers,
  Wrench,
  Settings2,
} from "lucide-react";
import { Badge } from "../ui/badge";

const badges = [
  { icon: Globe, label: "Web Platforms" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Code2, label: "Custom Software" },
  { icon: Layers, label: "Our Products" },
  { icon: Wrench, label: "Maintenance" },
  { icon: Settings2, label: "IT Consulting" },
];

export default function Precision() {
  return (
    <main className="bg-primary-foreground">
      <section className="px-6 bg-linear-to-b from-primary-foreground via-accent-white to-tertiary">
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center 2xl:max-w-7xl mx-auto pt-18 pb-24">

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <p className="text-sm font-semibold uppercase tracking-widest text-tertiary mb-4">
              Built different. Delivered right.
            </p>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-base-brand leading-tight">
              We ship Solutions
            </h1>

            <p className="mt-6 text-lg md:text-xl text-base-foreground leading-relaxed max-w-2xl mx-auto">
              Every line of code we write exists for a reason.
              No bloat. No copy-paste architecture. Just
              precise, production-ready technology built around
              what your business actually needs in setrbices
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {badges.map((badge) => (
              <Badge
                key={badge.label}
                className="px-4 py-2 bg-base-brand border border-transparent hover:bg-tertiary transition-colors duration-500 cursor-pointer gap-2 justify-center w-[calc(50%-6px)] sm:w-auto"
              >
                <badge.icon className="w-4 h-4 shrink-0" />
                {badge.label}
              </Badge>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
