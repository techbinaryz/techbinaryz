import { subscriptionData } from "@/data/Subscription.data";
import { Check } from "lucide-react";

export default function Subscription() {
  return (
    <section className="min-h-screen bg-pop-brand flex items-center justify-center px-6 py-20">
      <section className="w-full">
        <div className="2xl:max-w-7xl mx-ato">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl text-base-brand font-bold leading-tight">
              Start Your Content Creation Journey
              with AI
            </h1>

            <p className="text-base-foreground mt-4 max-w-xl mx-auto">
              Collaborate with AI to generate
              content that resonates with your
              audience, drives and delivers
              meaningful results across all
              platforms.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subscriptionData.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300 
              ${plan.highlighted
                    ? "bg-tertiary-brand-renew border border-indigo-500 scale-105"
                    : "bg-tertiary-brand-renew hover:border-gray-600"
                  }`}
              >
                {plan.highlighted && (
                  <span className="absolute top-4 right-4 bg-tertiary text-xs px-3 py-1 rounded-full text-white">
                    Popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-base-foreground mb-4">
                  {plan.name}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-base-foreground">
                    {plan.price}
                  </span>
                  {plan.price !== "Let's talk" && (
                    <span className="text-base-foreground text-sm ml-1">
                      Per month
                    </span>
                  )}
                </div>

                <p className="text-base-foreground text-sm mb-6">
                  {plan.description}
                </p>

                <button
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-300
                ${plan.highlighted
                      ? "bg-tertiary hover:bg-[#c0fdfb] hover:text-primary text-white shadow-md"
                      : "bg-[#1F2937] hover:bg-[#374151] text-gray-200"
                    }`}
                >
                  {plan.button}
                </button>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {plan.features.map(
                    (feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-base-foreground text-sm"
                      >
                        <Check
                          size={16}
                          className="text-indigo-500 mt-1"
                        />
                        {feature}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
