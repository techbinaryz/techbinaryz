"use client";

import { partners } from "@/data/Partner.data";
import { transformData } from "@/data/Home.data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { FaBusinessTime } from "react-icons/fa6";

export default function BusinessTechnology() {
  return (
    <section className="relative w-full bg-linear-to-b from-primary via-primary to-tertiary overflow-hidden">
      <div className="2xl:max-w-7xl mx-auto">

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-16 text-center">
          <div className="mb-6 max-w-fit mx-auto rounded-2xl border border-base-foreground p-px">
            <div className="flex items-center gap-2 rounded-2xl bg-transparent px-5 py-1 text-sm">
              <FaBusinessTime />
              <p className="text-base-foreground">{transformData.badge}</p>
            </div>
          </div>

          <h1 className="text-[35px] md:text-[40px] lg:text-[50px] max-w-3xl mx-auto font-bold text-base-brand leading-[1.2] md:leading-tight">
            {transformData.heading}
          </h1>

          <p className="mt-5 text-base-foreground max-w-2xl mx-auto text-md">
            {transformData.subheading}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col lg:flex-row md:flex-row justify-center items-center gap-4">
            <Button
              asChild
              className="rounded-full bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand cursor-pointer text-sm font-medium text-white transition"
            >
              <Link href={transformData.primaryAction.href}>
                {transformData.primaryAction.label}
              </Link>
            </Button>

            <Button className="flex items-center gap-3 cursor-pointer rounded-full text-sm border border-base-brand bg-white/10 backdrop-blur-sm hover:bg-transparent transition">

              <span className="size-6 rounded-full inline-flex items-center justify-center bg-tertiary shrink-0">
                <Play className="size-3 fill-white text-white" />
              </span>

              <span className="text-base-foreground">
                {transformData.secondaryAction.label}
              </span>
            </Button>
          </div>

          {/* Company Logos */}
          <div className="mt-16">
            <p className="mb-6 text-center text-base-foreground text-lg font-medium">
              {transformData.trustedLabel}
            </p>

            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto items-center">
              {partners.map((l) =>
                l.src ? (
                  <span className="relative w-24 h-10" key={l.alt}>
                    <Image
                      src={l.src}
                      alt={l.alt}
                      fill
                      className="opacity-70 hover:opacity-100 duration-300 object-contain"
                    />
                  </span>
                ) : (
                  <span
                    key={l.alt}
                    className="text-base-foreground font-semibold text-sm md:text-base opacity-70 hover:opacity-100 duration-300 tracking-wide"
                  >
                    {l.alt}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
