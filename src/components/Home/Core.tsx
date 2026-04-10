"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Pencil,
  Lightbulb,
  Bot,
  Smile,
  Crown,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Pencil,
    title: "Seamless Content Creation AI",
    description:
      "Let our AI-powered service simplify your content creation process. Start using AI today!",
  },
  {
    icon: Lightbulb,
    title:
      "Your Ideas, Powered by Our Technology",
    description:
      "Discover how AI can transform your ideas into captivating content with our high-quality service.",
  },
  {
    icon: Bot,
    title: "Intelligent Writing by Powerful AI",
    description:
      "Effortlessly access AI-generated content for blogs, websites, and more with our convenient service.",
  },
  {
    icon: Smile,
    title: "AI Generation Made Life Easier",
    description:
      "Experience effortless content creation with our AI service. Write less, accomplish more.",
  },
  {
    icon: Crown,
    title: "Premium AI-Generated Content",
    description:
      "Get expertly crafted content in no time with our AI service. Where quality meets speed.",
  },
  {
    icon: Zap,
    title: "Super Fast AI Writing Companion",
    description:
      "Partner with AI to create content that connects with your audience. Give it a try now.",
  },
];

export default function Core() {
  return (
    <section className="w-full bg-primary py-30 px-6">
      <div className="2xl:max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-base-brand">
            Core Features of our Tools
          </h2>
          <p className="text-base-foreground mt-4 max-w-2xl mx-auto">
            Unlock the Potential of Innovation.
            Discover the Advanced AI Tools.
            Transform Your Ideas into Reality with
            Unmatched Precision and Intelligence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="
    bg-white/5
    transition-all duration-30
    rounded-2xl
    shadow-[0px_40px_80px_-20px_rgba(107,110,148,0.12)]"
            >
              <CardContent className="p-8 space-y-10">
                {/* Icon Circle */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-linear-to-b from-tertiary to-primary border border-white">
                  <feature.icon
                    className="w-6 h-6 text-white"
                    fill="white"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base-foreground text-md leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
