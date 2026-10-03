"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { servicesData } from "@/data/Content-Change/Home.data";
import { ArrowRight } from "lucide-react";

export default function Tool() {
  return (
    <section className="relative w-full bg-primary-foreground py-30 px-6 overflow-hidden">
      <div className="2xl:max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-[44px] font-bold leading-tight text-base-brand">
          {servicesData.heading}
        </h2>

        <p className="text-base-foreground mt-3 max-w-2xl mx-auto">
          {servicesData.subheading}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {servicesData.badges.map((badge, index) => (
            <Badge
              key={index}
              className="px-4 py-2 bg-base-brand border border-transparent cursor-pointer hover:bg-tertiary transition-colors duration-500 justify-center w-[calc(50%-6px)] sm:w-auto"
            >
              <badge.icon className="w-4 h-4 mr-2 shrink-0" />
              {badge.label}
            </Badge>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-tertiary flex items-center gap-1">
            {servicesData.bottomHeading}
            <ArrowRight className="size-10 md:size-4" />
          </p>

          <Button
            asChild
            size="sm"
            className="bg-linear-to-r from-tertiary to-indigo-600 hover:from-[#c0fdfb] hover:to-[#c0fdfb] hover:text-primary-brand text-white rounded-full transition text-xs"
          >
            <Link href={servicesData.ctaHref}>
              {servicesData.cta}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
