const stats = [
  { label: "Projects Delivered", value: "500+" },
  { label: "Happy Clients", value: "250+" },
  { label: "Years Experience", value: "8+" },
  { label: "Team Members", value: "50+" },
];

export function StatsSection() {
  return (
    <section className="bg-muted/50 py-24 sm:py-32 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by developers worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Join thousands of satisfied customers who trust us with their
              digital transformation
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-background p-8">
                <dt className="text-sm font-semibold leading-6 text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
