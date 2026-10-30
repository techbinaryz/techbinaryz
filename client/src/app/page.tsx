import HomePage from "@/views/home/Home.page";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { homeMeta } from "@/data/home.data";

export const metadata = homeMeta;

export default function page() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <div>
        <HomePage />
      </div>
    </>
  );
}
