"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { servicesData } from "@/data/Content-Change/Home.data";

export default function Tool() {
  return (
    <section className="relative w-full bg-primary-foreground py-28 px-6 overflow-hidden">
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
              className="px-4 py-2 bg-base-brand border border-transparent cursor-pointer"
            >
              <badge.icon className="w-4 h-4 mr-2" />
              {badge.label}
            </Badge>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold">{servicesData.bottomHeading}</h3>

          <p className="text-base-foreground mt-3 max-w-xl mx-auto">
            {servicesData.bottomSubheading}
          </p>

            <Link href={servicesData.ctaHref}>
              <Button
                size="lg"
                className="mt-6 bg-linear-to-r from-tertiary to-indigo-600 hover:from-[#c0fdfb] hover:to-[#c0fdfb] hover:text-primary-brand text-white rounded-full px-8 transition"
              >
                {servicesData.cta}
              </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}
