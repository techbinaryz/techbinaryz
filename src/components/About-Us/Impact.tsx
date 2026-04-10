import { HoverCheck } from "./General/HoverCheck";

export default function Impact() {
  return (
    <section className="w-full bg-primary-foreground py-32 px-6">
      <div className="2xl:max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-base-brand">
            The Impact
          </h2>
          <p className="text-base-foreground mt-4 max-w-lg mx-auto">
            Powering 50+ launched startups.
            Thousands of AI generations daily.
            Built by developers. For developers.s
          </p>
        </div>

        {/* Centered Button */}
        <div className="flex justify-center">
          <HoverCheck />
        </div>
      </div>
    </section>
  );
}
