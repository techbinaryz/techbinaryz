import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to Work Together?
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Let's discuss how we can help transform your ideas into powerful
          digital solutions. We'd love to hear about your project and explore
          how we can work together.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/contact">
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link href="mailto:hello@Tech Binaryz.com">
              <Mail className="h-4 w-4" />
              Email Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
