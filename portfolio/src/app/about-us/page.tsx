import AboutPage from "@/views/aboutUs/About.page";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPageJsonLd } from "@/lib/structured-data";
import { aboutUsMeta } from "@/data/metadata/about-us.data";

export const metadata = aboutUsMeta;

export default function page() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />
      <div className="bg-black text-white">
        <AboutPage />
      </div>
    </>
  );
}
