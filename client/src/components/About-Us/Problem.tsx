"use client";

import Image from "next/image";
import { problemData } from "@/data/Content-Change/About-Us.data";

export default function Problem() {
  return (
    <section className="py-32 px-6 w-full md:px-20 border-t bg-primary-brand">
      <div className="2xl:max-w-7xl mx-auto flex gap-5 justify-between">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            {problemData.problemHeading}
          </h2>

          {problemData.problemParagraphs.map((para, i) => (
            <p key={i} className="mt-6 text-base-random text-lg max-w-lg leading-relaxed">
              {para}
            </p>
          ))}

          <h3 className="mt-12 text-2xl font-semibold">
            {problemData.missionHeading}
          </h3>

          <p className="mt-6 text-base-random text-lg max-w-lg leading-relaxed">
            {problemData.missionParagraph}
          </p>
        </div>

        {/* Visible on large screens only */}
        <div className="hidden lg:flex flex-col items-end w-full gap-5">
          <div className="relative mx-auto max-w-5xl rounded-3xl p-4 backdrop-blur-xl transition-all duration-300 border border-gray-300 bg-white/50 shadow-lg">
            <Image
              src="/HomeImg/tab-image-2-dark.webp"
              alt="TechBinaryz Dashboard Preview"
              width={1200}
              height={700}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
