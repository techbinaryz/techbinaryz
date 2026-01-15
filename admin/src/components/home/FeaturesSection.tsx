import { CheckCircle, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with performance in mind, our solutions deliver blazing-fast experiences that keep your users engaged.",
  },
  {
    icon: Users,
    title: "User-Centric Design",
    description:
      "Every interface is crafted with your users in mind, ensuring intuitive and delightful experiences.",
  },
  {
    icon: CheckCircle,
    title: "Reliable & Secure",
    description:
      "Enterprise-grade security and reliability built into every solution we deliver.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why Choose Us
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We deliver exceptional results with modern technology and proven
          expertise
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <Icon className="h-5 w-5 flex-none text-primary" />
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
