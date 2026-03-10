import { AvatarCheck } from "./General/AvatarCheck";

export default function () {
  return (
    <section className="relative w-full bg-primary-foreground py-28 px-6">
      <div className="2xl:max-w-7xl mx-auto text-center">
        <h2 className="text-[44px] font-bold leading-tight text-base-brand">
          The Builder
        </h2>

        <p className="text-base-foreground font-bold mt-3 max-w-2xl mx-auto">
          I build systems. Not demos. I've shipped
          AI tools, scaled them, broken them, and
          rebuilt them better.
        </p>

        <blockquote className="mt-10 text-2xl font-medium leading-relaxed max-w-2Xl mx-auto text-base-brand">
          “AI won't replace developers. Developers
          who use AI will replace those who
          don't.”
        </blockquote>

        <div className="mt-5 text-white text-sm">
          <AvatarCheck />
        </div>
      </div>
    </section>
  );
}
