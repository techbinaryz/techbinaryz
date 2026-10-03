import { productsData } from "@/data/Content-Change/Products.data";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Subscription() {
  return (
    <section className="bg-pop-brand flex items-center justify-center px-6 py-20">
      <div className="w-full 2xl:max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl text-base-brand font-bold leading-tight">
            {productsData.heading}
          </h1>
          <p className="text-base-foreground mt-4 max-w-xl mx-auto">
            {productsData.subheading}
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {productsData.products.map((product, index) => (
            <Card
              key={index}
              className="relative border-indigo-200 hover:border-indigo-400 transition-all duration-300 shadow-none bg-transparent"
            >
              {/* Type Badge */}
              <Badge className="absolute top-4 right-4 bg-tertiary text-white border-0 hover:bg-tertiary">
                {product.type}
              </Badge>

              <CardHeader className="gap-4">
                {/* Icon + Name */}
                <div className="flex items-center gap-2">
                  <product.icon className="w-5 h-5 text-slate-700 shrink-0" />
                  <CardTitle className="text-base font-semibold text-slate-700">
                    {product.name}
                  </CardTitle>
                </div>

                {/* Tagline */}
                <div className="min-h-5.5rem">
                  <span className="text-xl font-bold text-slate-800 leading-snug">
                    {product.tagline}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <CardDescription className="text-slate-500 text-sm leading-relaxed line-clamp-5">
                  {product.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="flex-col items-stretch gap-6 pt-0">
                {/* CTA Button */}
                <Button
                  asChild
                  className="w-full rounded-xl font-medium text-sm bg-tertiary text-white hover:bg-[#c0fdfb] hover:text-primary-brand transition-all duration-300"
                >
                  <Link href="/contact-us">Learn More</Link>
                </Button>

                {/* Feature Tags */}
                <ul className="space-y-3">
                  {product.tags.map((tag, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-slate-600 text-sm"
                    >
                      <Check size={15} className="text-indigo-500 shrink-0" />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
