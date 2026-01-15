const stats = [
  { label: "Years in Business", value: "8+" },
  { label: "Projects Completed", value: "500+" },
  { label: "Happy Clients", value: "250+" },
  { label: "Team Members", value: "50+" },
  { label: "Countries Served", value: "15+" },
  { label: "Technologies Mastered", value: "30+" },
];

export function StatsSection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Impact
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
