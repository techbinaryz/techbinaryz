import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Build Amazing
          <span className="text-primary"> Digital Experiences</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Transform your ideas into powerful digital solutions with our
          cutting-edge technology stack and expert development team.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" className="gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
