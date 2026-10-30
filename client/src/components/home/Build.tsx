"use client";

import { Card, CardContent } from "@/components/ui/card";
import { coreFeaturesData } from "@/data/Content-Change/Home.data";

export default function Build() {
  return (
    <section className="w-full bg-primary pt-30 pb-5 px-6">
      <div className="2xl:max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-base-brand">
            {coreFeaturesData.heading}
          </h2>
          <p className="text-base-foreground mt-4 max-w-2xl mx-auto">
            {coreFeaturesData.subheading}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {coreFeaturesData.features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/5 border-0 rounded-2xl"
            >
              <CardContent className="p-7 space-y-5">
                {/* Icon Circle */}
                <div className="w-14 h-14 flex items-center justify-center  rounded-full bg-linear-to-b from-tertiary to-primary border border-white">
                  <feature.icon
                    className="w-6 h-6 text-white"
                    fill="white"
                  />
                </div>

                {/* Title */}
                <p className="text-sm font-semibold uppercase tracking-widest text-tertiary mb-4 ">
                  {feature.title}
                </p>

                {/* Description */}
                <p className="text-base-foreground text-[12px]  leading-relaxed line-clamp-3">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
