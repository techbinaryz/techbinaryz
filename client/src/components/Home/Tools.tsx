"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Image,
  Code,
  Video,
  Mail,
} from "lucide-react";

export default function Tool() {
  return (
    <section className="relative w-full bg-primary-foreground  py-28 px-6 overflow-hidden">
      <div className="2xl:max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-[44px] font-bold leading-tight text-base-brand">
          All the AI tools you need, at <br />
          your Fingertips.
        </h2>

        <p className="text-base-foreground mt-3 max-w-2xl mx-auto">
          Unlock the Potential of Innovation.
          Discover the Advanced AI Tools
          Transforming Your Ideas into Reality
          with Unmatched Precision and
          Intelligence.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <Badge className="px-4 py-2 bg-base-brand border border-transparent cursor-pointer">
            <Sparkles className="w-4 h-4 mr-2" />
            Text Generator
          </Badge>

          <Badge className="px-4 py-2 bg-base-brand border border-transparent cursor-pointer">
            <Image className="w-4 h-4 mr-2" />
            Image Generator
          </Badge>

          <Badge className="px-4 py-2 bg-base-brand border border-transparent cursor-pointer">
            <Code className="w-4 h-4 mr-2" />
            Code Generator
          </Badge>

          <Badge className="px-4 py-2 bg-base-brand border border-transparent cursor-pointer">
            <Video className="w-4 h-4 mr-2" />
            Video Generator
          </Badge>

          <Badge className="px-4 py-2 bg-base-brand border border-transparent cursor-pointer">
            <Mail className="w-4 h-4 mr-2" />
            Email Generator
          </Badge>
        </div>

        {/* Bottom  */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold">
            Easiest way to generate text
          </h3>

          <p className="text-base-foreground mt-3 max-w-xl mx-auto">
            Unlock the Potential of Innovation.
            Discover the Advanced AI Tools
            Transforming Your Ideas into Reality
            with Unmatched Precision and
            Intelligence.
          </p>

          <Button
            size="lg"
            className="mt-6 bg-linear-to-r from-tertiary to-indigo-600 hover:opacity-90 text-white rounded-full px-8"
          >
            Try it now for free
          </Button>
        </div>
      </div>
    </section>
  );
}
