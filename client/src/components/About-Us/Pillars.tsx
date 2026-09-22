"use client";

import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { pillarsData } from "@/data/Content-Change/About-Us.data";

export default function Pillars() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-16 w-full bg-fine-check">
      <div className="2xl:max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-base-brand font-bold leading-tight mb-3">
          {pillarsData.heading}
        </h1>

        <p className="text-base-foreground text-sm sm:text-base max-w-2xl mx-auto mb-10">
          {pillarsData.subheading}
        </p>

        <BentoGrid className="text-left w-full mx-auto max-w-5xl lg:grid-rows-3">
          {pillarsData.features.map((feature, id) => (
            <BentoCard
              key={id}
              name={feature.title}
              description={feature.description}
              Icon={feature.icon}
              className={feature.className}
              cta={feature.cta}
              href="#"
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
