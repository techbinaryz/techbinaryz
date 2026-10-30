import ContactPage from "@/views/contactUs/Contact.page";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactPageJsonLd } from "@/lib/structured-data";
import { contactUsMeta } from "@/data/contact-us.data";

export const metadata = contactUsMeta;

export default function page() {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <div>
        <ContactPage />
      </div>
    </>
  );
}
