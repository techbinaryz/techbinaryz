import { productsData } from "@/data/Content-Change/Products.data";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Subscription() {
  return (
    <section className="bg-pop-brand flex items-center justify-center px-6 py-20">
      <section className="w-full">
        <div className="2xl:max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl text-base-brand font-bold leading-tight">
              {productsData.heading}
            </h1>
            <p className="text-base-foreground mt-4 max-w-xl mx-auto">
              {productsData.subheading}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {productsData.products.map((product, index) => (
              <div
                key={index}
                className="relative rounded-2xl p-8 bg-white border border-indigo-200 hover:border-indigo-400 transition-all duration-300 flex flex-col h-full"
              >
                {/* Badge */}
                <span className="absolute top-4 right-4 bg-tertiary text-white text-xs px-3 py-1 rounded-full font-medium">
                  {product.type}
                </span>

                {/* Icon + Name */}
                <div className="flex items-center gap-2 mb-4">
                  <product.icon className="w-5 h-5 text-slate-700" />
                  <h3 className="text-base font-semibold text-slate-700">
                    {product.name}
                  </h3>
                </div>

                {/* Tagline — fixed height so descriptions start at same line */}
                <div className="mb-4 min-h-[5.5rem]">
                  <span className="text-xl font-bold text-slate-800 leading-snug">
                    {product.tagline}
                  </span>
                </div>

                {/* Description — flex-1 pushes button to bottom */}
                <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-5">
                  {product.description}
                </p>

                {/* CTA — pinned to same line across all cards via mt-auto */}
                <Link
                  href="/contact-us"
                  className="block w-full py-3 rounded-xl font-medium text-center text-sm text-white bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand transition-all duration-300 mt-6 mb-6"
                >
                  Learn More
                </Link>

                {/* Tags */}
                <ul className="space-y-3">
                  {product.tags.map((tag, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-slate-600 text-sm"
                    >
                      <Check size={15} className="text-indigo-500 shrink-0" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
