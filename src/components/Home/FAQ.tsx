"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="w-full bg-primary-foreground py-20 px-5">
      <div className="2xl:max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[44px] text-base-brand font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-base-foreground text-[16px] mt-4">
            Answered all frequently asked
            questions, Still confused?
            <br />
            Feel free to contact us
          </p>
        </div>

        <Accordion
          collapsible
          type="single"
          defaultValue="item-1"
          className="w-full space-y-4 max-w-xl mx-auto"
        >
          {/* Item 1 */}
          <AccordionItem
            value="item-1"
            className="border-b border-slate-700"
          >
            <AccordionTrigger className="group flex items-center justify-between text-left text-lg hover:no-underline [&>svg]:hidden">
              <span className="text-base-brand">
                Do I get free updates?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 leading-relaxed text-lg">
              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Aenean
              luctus magna quis tellus euismod,
              eget pharetra leo mollis. Donec eget
              lacus non elit blandit pharetra
              vitae volutpat libero.
            </AccordionContent>
          </AccordionItem>

          {/* Item 2 */}
          <AccordionItem
            value="item-2"
            className="border-b border-slate-700"
          >
            <AccordionTrigger className="group flex items-center justify-between text-left text-lg hover:no-underline [&>svg]:hidden">
              <span className="text-base-brand">
                What does the number of "Projects"
                refer to?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-lg leading-relaxed">
              The number of "Projects" refers to
              the total number of separate
              workspaces you can create and manage
              within your account.
            </AccordionContent>
          </AccordionItem>

          {/* Item 3 */}
          <AccordionItem
            value="item-3"
            className="border-b border-slate-700"
          >
            <AccordionTrigger className="group flex items-center justify-between text-left text-lg hover:no-underline [&>svg]:hidden">
              <span className="text-base-brand">
                Can I upgrade to a higher plan?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-lg leading-relaxed">
              Yes, you can upgrade at any time.
              The new features become available
              immediately after upgrading.
            </AccordionContent>
          </AccordionItem>

          {/* Item 4 */}
          <AccordionItem
            value="item-4"
            className="border-b border-slate-700"
          >
            <AccordionTrigger className="group flex items-center justify-between text-left text-lg hover:no-underline [&>svg]:hidden">
              <span className="text-base-brand">
                What does "Unlimited Projects"
                mean?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-lg leading-relaxed">
              You can create as many projects as
              needed without restrictions.
            </AccordionContent>
          </AccordionItem>

          {/* Item 5 */}
          <AccordionItem
            value="item-5"
            className="border-b border-slate-700"
          >
            <AccordionTrigger className="group flex items-center justify-between text-left text-lg hover:no-underline [&>svg]:hidden">
              <span className="text-base-brand">
                How can I add Open AI Key?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-lg leading-relaxed">
              Go to account settings → API Keys →
              Add New Key → Paste your key.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
