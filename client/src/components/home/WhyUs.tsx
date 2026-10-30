import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { keyData } from "@/data/Content-Change/Home.data";

export default function WhyUs() {
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

        {/* Top row */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 max-w-3xl mx-auto">

          {/* Left Card */}
          <Card className="bg-[#7de2d1] border-0 rounded-2xl pt-8 px-8 gap-0">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl md:text-3xl text-white">
                {cardLeft.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 text-white/80 text-sm">
              {cardLeft.description}
            </CardContent>
            <CardFooter className="px-0 mt-auto pt-4">
              <Image
                src={cardLeft.image}
                alt={cardLeft.alt}
                width={448}
                height={300}
                className="w-full max-w-md"
                unoptimized
              />
            </CardFooter>
          </Card>

          {/* Right Card */}
          <Card className="bg-[linear-gradient(to_right,#00a7f4,transparent),linear-gradient(to_right,#00a7f4),linear-gradient(to_right,white,transparent)] border-0 shadow-none rounded-2xl pt-8 px-8 gap-0">
            <CardFooter className="px-0 pb-4">
              <Image
                src={cardRight.image}
                alt={cardRight.alt}
                width={448}
                height={300}
                className="w-full max-w-md"
                unoptimized
              />
            </CardFooter>
            <CardHeader className="px-0">
              <CardTitle className="text-2xl md:text-3xl text-white">
                {cardRight.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 text-white/80 text-sm">
              {cardRight.description}
            </CardContent>
          </Card>

        </div>

        {/* Bottom Card */}
        <Card className="bg-[linear-gradient(to_right,#3dccc7,transparent),url('/HomeImg/blur-shape.webp'),linear-gradient(to_right,#2D0B70,transparent)] bg-cover bg-center border-0 shadow-none rounded-2xl pt-10 px-10 max-w-3xl mx-auto gap-0 flex-col md:flex-row items-start">
          <div className="max-w-sm mx-auto py-6">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl md:text-3xl text-white">
                {cardBottom.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 text-white/80 text-sm mb-4">
              {cardBottom.description}
            </CardContent>
            {cardBottom.cta && cardBottom.ctaHref && (
              <CardFooter className="px-0">
                <Button
                  asChild
                  className="bg-transparent border border-white text-white hover:bg-[#c0fdfb] hover:text-primary-brand px-5 py-2 rounded-full text-sm font-semibold transition"
                >
                  <Link href={cardBottom.ctaHref}>
                    {cardBottom.cta}
                  </Link>
                </Button>
              </CardFooter>
            )}
          </div>
          <Image
            src={cardBottom.image}
            alt={cardBottom.alt}
            width={320}
            height={240}
            className="w-full max-w-xs md:ml-auto"
            unoptimized
          />
        </Card>

      </div>
    </section>
  );
}
