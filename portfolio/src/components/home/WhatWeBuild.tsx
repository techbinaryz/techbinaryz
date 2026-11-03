"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { coreFeaturesData } from "@/data/Home.data";

export default function WhatWeBuild() {
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {coreFeaturesData.features.map((feature, index) => (
            <Card key={index} className="w-full p-0 bg-white/5 border-0 rounded-2xl">
              <CardContent className="flex flex-col gap-5 p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={`https://picsum.photos/1000/800?grayscale&random=${50 + index}`}
                    alt={feature.title}
                    width={1000}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4 p-6 pt-0">
                  <div className="bg-secondary-brand rounded-lg w-fit ">
                    <feature.icon className="w-4 h-4 m-2 text-white" />
                  </div>
                  {feature.title}

                  <p className="text-base-foreground text-sm leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>
                  <a href="/products">
                    <Button className="w-full bg-secondary-brand hover:bg-tertiary/90 text-white cursor-pointer">
                      Learn More
                      <ChevronRight />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
