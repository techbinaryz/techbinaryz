import { productsData } from "@/data/Content-Change/Products.data";
import Link from "next/link";
import { Check } from "lucide-react";

export default function ProductShowcase() {
  return (
    <section className="min-h-screen bg-pop-brand flex items-center justify-center px-6 py-20">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsData.products.map((product, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300
                  ${product.highlighted
                    ? "bg-tertiary-brand-renew border border-indigo-500 scale-105"
                    : "bg-tertiary-brand-renew hover:border-gray-600"
                  }`}
              >
                {/* Type badge */}
                {product.highlighted && (
                  <span className="absolute top-4 right-4 bg-tertiary text-xs px-3 py-1 rounded-full text-white">
                    Flagship
                  </span>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <product.icon className="w-5 h-5 text-base-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-base-foreground">
                    {product.name}
                  </h3>
                </div>

                {/* Type label */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-base-foreground">
                    {product.type}
                  </span>
                </div>

                {/* Description */}
                <p className="text-base-foreground text-sm mb-6">
                  {product.description}
                </p>

                {/* CTA button */}
                <Link
                  href="/contact-us"
                  className={`block w-full py-3 rounded-xl font-medium transition-all duration-300 text-center text-sm
                    ${product.highlighted
                      ? "bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand text-white shadow-md"
                      : "bg-[#1F2937] hover:bg-[#374151] text-gray-200"
                    }`}
                >
                  Learn More
                </Link>

                {/* Tags as feature list */}
                <ul className="mt-6 space-y-3">
                  {product.tags.map((tag, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-base-foreground text-sm"
                    >
                      <Check size={16} className="text-indigo-500 mt-1 shrink-0" />
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
