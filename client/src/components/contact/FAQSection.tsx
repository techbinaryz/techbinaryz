const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Absolutely! We work with businesses of all sizes, from startups to enterprise companies. We offer flexible solutions and pricing to accommodate different budgets and requirements.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We specialize in modern web technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS and Vercel. We choose the best technology stack for each project's specific needs.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive support and maintenance packages to keep your digital solutions running smoothly. This includes updates, security patches, performance optimization, and feature enhancements.",
  },
  {
    question: "Can you help with existing projects?",
    answer:
      "Definitely! We can help improve, maintain, or completely redesign existing projects. We'll assess your current setup and recommend the best path forward to achieve your goals.",
  },
  {
    question: "What's your development process like?",
    answer:
      "We follow an agile development process with regular check-ins and updates. You'll be involved throughout the project with weekly progress reports and opportunities to provide feedback at each milestone.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get answers to common questions about our services and process
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
