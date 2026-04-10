export default function Prompt() {
  return (
    <section className="py-25 flex flex-col w-full items-center justify-center text-center px-6 md:px-20 bg-linear-to-b from-primary via-primary to-tertiary">
      <div className="2xl:max-w-7xl">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-base-brand">
            Beyond the Prompt.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-base-foreground leading-relaxed">
            We don't just call APIs. We design the
            systems that make AI usable.
            Infrastructure. Orchestration.
            Architecture.
          </p>
        </div>
        {/* Buttons */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <button className="rounded-full bg-tertiary hover:bg-[#c0fdfb] hover:text-primary cursor-pointer px-6 py-3.5 text-sm font-medium text-white transition">
            Explore Apps
          </button>

          {/* Watch Intro Video */}
          <button className="flex items-center gap-3 cursor-pointer rounded-full  px-2 py-2 pr-4 text-sm border border-base-brand bg-white/10 backdrop-blur-sm hover:bg-white/20 transition">
            <span
              className="size-8 rounded-full inline-flex items-center justify-center"
            // style={{
            //   background:
            //     "var(--Gradient-2, linear-gradient(97deg,#725cff 0%,#b5b1ff 140.21%))",
            // }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 3.71077L3.5 12.3482C3.5 13.5211 4.78545 14.2402 5.78489 13.6265L12.8183 9.30776C13.7717 8.7223 13.7717 7.33672 12.8183 6.75125L5.7849 2.43251C4.78545 1.81882 3.5 2.53795 3.5 3.71077Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className="text-base-foreground">
              Watch Intro Video
            </span>
          </button>
        </div>
        {/* Company Logos */}
        <div className="mt-16 text-gray-400ss">
          <p className="mb-6 text-center text-base-foreground text-lg font-medium">
            Trusted by world's largest companies
            including...
          </p>
          <div className="flex flex-wrap justify-center gap-15">
            <span>
              <img
                src="/HomeImg/br-1.svg"
                width={80}
                height={32}
                className="opacity-70 hover:opacity-100 duration-300"
              />
            </span>
            <span>
              <img
                src="/HomeImg/br-2.svg"
                width={80}
                height={32}
                className="opacity-70 hover:opacity-100 duration-300"
              />
            </span>
            <span>
              <img
                src="/HomeImg/br-3.svg"
                width={80}
                height={32}
                className="opacity-70 hover:opacity-100 duration-300"
              />
            </span>
            <span>
              <img
                src="/HomeImg/br-4.svg"
                width={80}
                height={32}
                className="opacity-70 hover:opacity-100 duration-300"
              />
            </span>
            <span>
              <img
                src="/HomeImg/br-5.svg"
                width={80}
                height={32}
                className="opacity-70 hover:opacity-100 duration-300"
              />
            </span>
            <span>
              <img
                src="/HomeImg/br-6.svg"
                width={80}
                height={32}
                className="opacity-70 hover:opacity-100 duration-300"
              />
            </span>
            <span>
              <img
                src="/HomeImg/br-7.svg"
                width={80}
                height={32}
                className="opacity-70 hover:opacity-100 duration-300"
              />
            </span>
          </div>
        </div>
      </div>


    </section>
  );
}
