import Link from "next/link";
import { Button } from "../ui/button";
import { keyData } from "@/data/Content-Change/Home.data";

export default function Key() {
  const [cardLeft, cardRight, cardBottom] = keyData.cards;

  return (
    <section className="pt-20 pb-32 bg-primary-brand w-full overflow-hidden">
      <div className="2xl:max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:max-w-xl mx-auto text-white font-bold leading-tight">
            {keyData.heading}
          </h1>
          <p className="text-base-random mt-4 max-w-2xl mx-auto">
            {keyData.subheading}
          </p>
        </div>

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 max-w-3xl mx-auto">
          {/* Left Card */}
          <div className="bg-[#7de2d1] rounded-2xl pt-8 px-8 flex flex-col h-full">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-white">
                {cardLeft.title}
              </h2>
              <p className="text-white/80">{cardLeft.description}</p>
            </div>
            <img
              src={cardLeft.image}
              alt={cardLeft.alt}
              className="w-full max-w-md mt-auto"
            />
          </div>

          {/* Right Card */}
          <div className="bg-[linear-gradient(to_right,#00a7f4,transparent),linear-gradient(to_right,#00a7f4),linear-gradient(to_right,white,transparent)] rounded-2xl p-13 flex flex-col h-full">
            <img
              src={cardRight.image}
              alt={cardRight.alt}
              className="w-full max-w-md mt-auto"
            />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight max-w-xl text-white">
                {cardRight.title}
              </h2>
              <p className="text-white/80">{cardRight.description}</p>
            </div>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="bg-[linear-gradient(to_right,#3dccc7,transparent),url('/HomeImg/blur-shape.webp'),linear-gradient(to_right,#2D0B70,transparent)] pt-10 px-10 max-w-3xl mx-auto bg-cover bg-center rounded-2xl p-6 flex flex-col md:flex-row items-start gap-10 md:gap-40">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight max-w-xl text-white">
              {cardBottom.title}
            </h2>
            <p className="text-white/80 mb-4">{cardBottom.description}</p>
            {cardBottom.cta && cardBottom.ctaHref && (
              <Link href={cardBottom.ctaHref}>
                <Button className="bg-transparent border border-primary-brand h-12.5 w-45 text-white hover:bg-[#c0fdfb] hover:text-primary-brand px-5 py-2 rounded-full text-sm font-semibold transition">
                  {cardBottom.cta}
                </Button>
              </Link>
            )}
          </div>
          <img
            src={cardBottom.image}
            alt={cardBottom.alt}
            className="w-full max-w-xs"
          />
        </div>
      </div>
    </section>
  );
}
