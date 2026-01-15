import Image from "next/image";

export function HeroSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            About <span className="text-primary">Tech Binaryz</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            We are a passionate team of developers, designers, and innovators
            dedicated to transforming ideas into powerful digital solutions that
            drive business growth.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src="https://placehold.co/800x450/png"
              alt="Tech Binaryz team working together"
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
