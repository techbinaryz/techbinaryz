import { Lightbulb, Target, Heart, Shield, Users } from "lucide-react";

export const createrData = {
  name: "Jane Doe",
  role: "Lead Creator & Visionary",
  bio: "Jane has been at the forefront of AI development for over 10 years, building systems that scale and matter. She started this project to democratize high-level developer tooling.",
  image: "/placeholder-creator.jpg"
};

export const impactData = {
  title: "Our Global Impact",
  description: "Since our launch, we have helped thousands of developers iterate faster and build better software.",
  metrics: [
    { value: "50,000+", label: "Projects Created" },
    { value: "10M+", label: "API Requests Daily" },
    { value: "4.9/5", label: "Average Rating" },
  ]
};

export const pillarsData = {
  title: "Our Core Pillars",
  subtitle: "The values that guide every line of code we write.",
  pillarsList: [
    { title: "Innovation", description: "Constantly pushing the boundaries of what is possible with AI.", icon: Lightbulb },
    { title: "Accessibility", description: "Making complex technologies easy to use for developers of all levels.", icon: Heart },
    { title: "Integrity", description: "Building ethically and keeping user data safe and secure.", icon: Shield },
    { title: "Community", description: "Thriving on open-source collaboration and tight-knit developer networks.", icon: Users },
    { title: "Precision", description: "Delivering accurate and predictable results consistently.", icon: Target },
  ]
};

export const problemData = {
  title: "The Problem We Solve",
  description: "Developers spend too much time stringing together diverse AI APIs, managing context windows, and dealing with complex toolchains. We handle the boilerplate so you can just build.",
  image: "/placeholder-problem.png"
};

export const promptData = {
  title: "Why Start Now?",
  message: "The AI wave is not slowing down. Integrating these tools into your workflow today will determine where you stand tomorrow. Join us and take the leap.",
  callToAction: "Join the Developer Preview"
};
