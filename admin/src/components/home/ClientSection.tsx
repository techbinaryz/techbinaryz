import Image from "next/image";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";

const clients = [
  { name: "TechCorp", logo: "TC", id: 1 },
  { name: "InnovateLab", logo: "IL", id: 2 },
  { name: "DigitalFlow", logo: "DF", id: 3 },
  { name: "CloudSync", logo: "CS", id: 4 },
  { name: "DataVision", logo: "DV", id: 5 },
  { name: "WebForge", logo: "WF", id: 6 },
  { name: "AppCraft", logo: "AC", id: 7 },
  { name: "CodeStream", logo: "CS", id: 8 },
  { name: "PixelPerfect", logo: "PP", id: 9 },
  { name: "DevSolutions", logo: "DS", id: 10 },
  { name: "TechNova", logo: "TN", id: 11 },
  { name: "ByteWorks", logo: "BW", id: 12 },
];

export function ClientSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Trusted by Popular Companies
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join hundreds of companies that trust us with their digital
          transformation
        </p>
      </div>

      <Marquee className="py-8">
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent speed={40} className="">
          {clients.map((client) => (
            <MarqueeItem
              key={client.id}
              className="flex items-center flex-col gap-2"
            >
              <div className="relative overflow-hidden rounded-full size-30">
                <Image
                  src={"https://placehold.co/400x400.png"}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="text-md text-muted-foreground text-center truncate">
                {client.name}
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </section>
  );
}
