export default function Key() {
  return (
    <section className="pt-20 pb-32 bg-primary-brand w-full overflow-hidden">
      <div className="2xl:max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight">
            The key benefits of <br /> Using Our
            tools.
          </h1>

          <p className="text-base-random mt-4 max-w-2xl mx-auto">
            Unlock the Potential of Innovation.
            Discover the Advanced AI Tools
            Transforming Your Ideas into Reality
            with Precision and Intelligence.
          </p>
        </div>

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Left Card */}
          <div className="bg-[#7de2d1] rounded-2xl pt-13 px-13 flex flex-col h-full">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-white">
                Craft Professional-Grade Content
                with AI
              </h2>

              <p className="text-white/80">
                Transform your ideas into
                groundbreaking realities with
                advanced AI tools.
              </p>
            </div>

            <img
              src="/HomeImg/bn-1.svg"
              alt="AI Content"
              className="w-full max-w-md mt-auto pt-5"
            />
          </div>

          {/* Right Card */}
          <div className="bg-[linear-gradient(to_right,#00a7f4,transparent),linear-gradient(to_right,#00a7f4),linear-gradient(to_right,white,transparent)] rounded-2xl p-13 flex flex-col h-full">
            <img
              src="/HomeImg/bn-2.svg"
              alt="AI Productivity"
              className="w-full max-w-md mt-auto pt-5"
            />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight max-w-xl text-white">
                Boost your Productivity 10X with
                our AI agent tools.
              </h2>

              <p className="text-white/80">
                Discover powerful AI agents that
                automate tasks and improve
                efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="bg-[linear-gradient(to_right,#3dccc7,transparent),url('/HomeImg/blur-shape.webp'),linear-gradient(to_right,#2D0B70,transparent)] pt-13 bg-cover bg-center rounded-2xl p-6 flex flex-col md:flex-row items-start gap-10 md:gap-40">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight max-w-xl text-white">
              Overcome Writers Block Today
            </h2>

            <p className="text-white/80 mb-4">
              Discover AI tools that help bring
              your ideas to life with exceptional
              accuracy.
            </p>

            <button className="bg-transparent border border-primary-brand h-12.5 w-45 text-white px-5 py-2 rounded-full text-sm font-semibold">
              Try now for Free
            </button>
          </div>

          <img
            src="/HomeImg/bn-3.svg"
            alt="Writers Block"
            className="w-full max-w-xs"
          />
        </div>
      </div>
    </section>
  );
}
