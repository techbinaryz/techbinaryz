import { partners } from "@/data/Partner.data";
import { promptData } from "@/data/Content-Change/About-Us.data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function Prompt() {
  return (
    <section className="py-25 flex flex-col w-full items-center justify-center text-center px-6 md:px-20 bg-linear-to-b from-primary via-primary to-tertiary">
      <div className="2xl:max-w-7xl">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-base-brand">
            {promptData.heading}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-base-foreground leading-relaxed">
            {promptData.subheading}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col lg:flex-row md:flex-row justify-center items-center gap-4">
          <Button
            asChild
            className="rounded-full bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand cursor-pointer text-sm font-medium text-white transition"
          >
            <Link href={promptData.primaryAction.href}>
              {promptData.primaryAction.label}
            </Link>
          </Button>

          <Button className="flex items-center gap-3 cursor-pointer rounded-full text-sm border border-base-brand bg-white/10 backdrop-blur-sm hover:bg-transparent transition">

            <span className="size-6 rounded-full inline-flex items-center justify-center bg-tertiary shrink-0">
              <Play className="size-3 fill-white text-white" />
            </span>

            <span className="text-base-foreground">
              {promptData.secondaryAction.label}
            </span>
          </Button>
        </div>

        {/* Company Logos */}
        <div className="mt-16">
          <p className="mb-6 text-center text-base-foreground text-lg font-medium">
            {promptData.trustedLabel}
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
    </section>
  );
}
