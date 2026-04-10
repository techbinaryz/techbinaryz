import {
  Mail,
  Sparkles,
  Image,
  Code,
  Video,
} from "lucide-react";
import { Badge } from "../ui/badge";

export default function Precision() {
  return (
    <main className="bg-primary-foreground">
      <section className="px-6 bg-linear-to-b from-primary-foreground via-accent-white to-tertiary">
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center 2xl:max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-base-brand">
              Precision-Engineered AI Modules.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-base-foreground leading-relaxed">
              Stop building from zero. Our modular
              components let you integrate
              world-class AI capabilities into your
              application in minutes — not months.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Badge className="px-4 py-2 bg-white border border-transparent text-card hover:bg-base-secondary cursor-pointer">
              <Sparkles className="w-4 h-4 mr-2" />
              Text Generator
            </Badge>

            <Badge className="px-4 py-2 bg-white border border-transparent text-card hover:bg-base-secondary cursor-pointer">
              <Image className="w-4 h-4 mr-2" />
              Image Generator
            </Badge>

            <Badge className="px-4 py-2 bg-white border border-transparent text-card hover:bg-base-secondary cursor-pointer">
              <Code className="w-4 h-4 mr-2" />
              Code Generator
            </Badge>

            <Badge className="px-4 py-2 bg-white border border-transparent text-card hover:bg-base-secondary cursor-pointer">
              <Video className="w-4 h-4 mr-2" />
              Video Generator
            </Badge>

            <Badge className="px-4 py-2 bg-white border border-transparent text-card hover:bg-base-secondary cursor-pointer">
              <Mail className="w-4 h-4 mr-2" />
              Email Generator
            </Badge>
          </div>
        </div>
      </section>
    </main >
  );
}
