import { Android } from "../ui/android";

export default function Facilities() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-20 border-t w-full bg-linear-to-b from-primary-foreground via-primary to-tertiary ">
      <div className="flex flex-col md:flex-row items-center gap-12 2xl:max-w-7xl mx-auto">
        <div className="flex-1 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-base-brand">
            The Problem
          </h2>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-base-foreground">
            Building an AI SaaS is 10% model logic
            and 90% repetitive setup. Auth.
            Billing. Database schemas. Rate
            limits. UI states. Deployment edge
            cases.
          </p>

          <p className="mt-6 text-base-foreground text-base md:text-lg leading-relaxed">
            We rebuilt the same infrastructure too
            many times. So we stopped rebuilding
            it.
          </p>

          <h3 className="mt-12 text-2xl font-semibold text-base-brand">
            The Mission
          </h3>

          <p className="mt-6 text-base-foreground text-base md:text-lg leading-relaxed">
            Provide a production-grade AI
            foundation so developers can focus on
            their unique intelligence — not
            boilerplate.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl rounded-3xl p-4">
          <Android
            videoSrc="/HomeImg/vid2.mov"
            className="w-full max-h-125 rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
