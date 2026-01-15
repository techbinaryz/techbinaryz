import { Heart, Lightbulb, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly explore new technologies and methodologies to deliver cutting-edge solutions that give our clients a competitive advantage.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of teamwork, both within our organization and with our clients, to achieve extraordinary results.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description:
      "Our clients trust us to deliver on our promises. We take this responsibility seriously and always strive for excellence.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "We love what we do, and it shows in every project we undertake. Our passion drives us to go above and beyond expectations.",
  },
];

export function ValuesSection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-background rounded-xl p-8 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-7">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
