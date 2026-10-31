import ProductsPage from "@/views/products/Products.page";
import { productsMeta } from "@/data/metadata/products.data";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionPageJsonLd } from "@/lib/structured-data";

export const metadata = productsMeta;

export default function page() {
  return (
    <>
      <JsonLd data={collectionPageJsonLd()} />
      <div>
        <ProductsPage />
      </div>
    </>
  );
}
