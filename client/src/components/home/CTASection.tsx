import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function CTASection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Let's build something amazing together. Contact us today to discuss
          your project.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" className="gap-2">
            Start Your Project
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="lg" className="gap-2">
            <Star className="h-4 w-4" />
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
