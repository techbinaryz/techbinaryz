import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function ContactSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="order-2 lg:order-1">
            <ContactInfo />
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
