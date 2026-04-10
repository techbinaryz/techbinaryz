import { Server, Settings, MonitorPlay, Zap } from "lucide-react";

export const facilitiesData = {
  title: "Product Facilities",
  subtitle: "World-class infrastructure to support your ideas.",
  facilitiesList: [
    { title: "Dedicated Nodes", description: "Isolated execution environments for maximum security.", icon: Server },
    { title: "Custom Embeddings", description: "Train your models on your own proprietary data.", icon: Settings },
    { title: "Interactive Dashboards", description: "Monitor your app's performance in real-time.", icon: MonitorPlay },
    { title: "Edge Deployment", description: "Execute logic right where your users are.", icon: Zap },
  ]
};

export const feedbackData = {
  title: "What Our Customers Say",
  reviews: [
    {
      name: "Alex Johnson",
      role: "CTO at StartupX",
      content: "This starter kit saved us literally months of development time. The abstractions are perfect.",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      role: "Freelance Developer",
      content: "I use this as the base for all my client projects now. It's incredibly robust and well documented.",
      rating: 5,
    },
    {
      name: "Sam Lee",
      role: "Product Manager",
      content: "Even as a non-engineer, the visual builder allowed me to prototype our core AI feature in an afternoon.",
      rating: 4,
    }
  ]
};

export const precisionData = {
  title: "Engineering Precision",
  description: "We don't compromise on quality. Every component is rigorously tested to ensure 99.99% uptime and low latency even under heavy loads. From type-safe APIs to optimized frontend renders, we've thought of everything.",
  stats: [
    { label: "Request Latency", value: "< 50ms" },
    { label: "Test Coverage", value: "98%" },
  ]
};

export const subscriptionData = {
  title: "Simple, Transparent Pricing",
  plans: [
    {
      name: "Hobby",
      price: "$0",
      period: "forever",
      features: ["1,000 API calls/month", "Community Support", "Basic Analytics", "1 Project"],
      buttonText: "Start for Free",
      isPopular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      features: ["100,000 API calls/month", "Priority Email Support", "Advanced Analytics", "Unlimited Projects", "Custom Domains"],
      buttonText: "Upgrade to Pro",
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "yearly",
      features: ["Unlimited API calls", "24/7 Phone Support", "Dedicated Account Manager", "Custom Integrations", "SLA Guarantee"],
      buttonText: "Contact Sales",
      isPopular: false
    }
  ]
};
