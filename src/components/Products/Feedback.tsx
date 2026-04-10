import { FeedbackData } from "@/data/Feedback.data";
import Image from "next/image";
import { Marquee } from "../ui/marquee";

export default function Feedback() {
  return (
    <section className="pt-20 pb-32 bg-primary-brand text-white w-full">
      <div className="2xl:max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight">
            What our users say
          </h1>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Unlock the Potential of Innovation.
            Discover the Advanced AI Tools
            Transforming Your Ideas into Reality
            with Unmatched Precision and
            Intelligence.
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee
            pauseOnHover
            className="[--duration:25s]"
          >
            {FeedbackData.map((item, index) => (
              <div
                key={index}
                className="mx-4 w-80 bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-12 w-12">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {item.designation} |{" "}
                      {item.company}
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.testimonial}
                </p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
