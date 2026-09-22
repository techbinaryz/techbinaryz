import { impactData } from "@/data/Content-Change/About-Us.data";

export default function Impact() {
  return (
    <section className="w-full bg-primary-foreground py-32 px-6">
      <div className="2xl:max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-base-brand">
            {impactData.heading}
          </h2>
          <p className="text-base-foreground mt-4 max-w-lg mx-auto">
            {impactData.subheading}
          </p>
        </div>

        {/* Stats grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {impactData.stats.map((stat) => (
            <div
              key={stat.label}
              className="
                flex flex-col items-center justify-center
                bg-primary-brand border border-white/10
                rounded-2xl px-10 py-8 min-w-[160px]
                transition-all duration-200 hover:border-white/30
              "
            >
              <span className="text-3xl font-bold text-base-brand">
                {stat.value}
              </span>
              <span className="text-sm text-base-foreground mt-2 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
