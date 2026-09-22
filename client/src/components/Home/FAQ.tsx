"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/Content-Change/Home.data";

export default function FAQ() {
  return (
    <section className="w-full bg-primary-foreground py-20 px-5">
      <div className="2xl:max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[44px] text-base-brand font-bold">
            {faqData.heading}
          </h2>
          <p className="text-base-foreground text-[16px] mt-4">
            {faqData.subheading}
            <br />
            {faqData.subheadingCta}
          </p>
        </div>

        <Accordion
          collapsible
          type="single"
          defaultValue={faqData.questions[0].id}
          className="w-full space-y-4 max-w-xl mx-auto"
        >
          {faqData.questions.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-slate-700"
            >
              <AccordionTrigger className="group flex items-center justify-between text-left text-lg hover:no-underline [&>svg]:hidden">
                <span className="text-base-brand">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-relaxed text-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
