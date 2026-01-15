export function StorySection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Founded in 2016, Tech Binaryz began as a small team of passionate
              developers with a vision to bridge the gap between innovative
              technology and practical business solutions.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Over the years, we've grown into a full-service digital agency,
              helping hundreds of companies transform their digital presence and
              achieve their business goals through cutting-edge technology
              solutions.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Today, we continue to push the boundaries of what's possible,
              staying at the forefront of technology trends while maintaining
              our commitment to delivering exceptional results for our clients.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src="https://placehold.co/400x400/e2e8f0/64748b?text=Our+Journey"
                alt="Our journey timeline"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
