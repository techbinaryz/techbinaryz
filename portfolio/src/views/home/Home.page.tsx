import WhatWeBuild from "@/components/home/WhatWeBuild";
import FAQ from "@/components/home/FAQ";
import ServiceStack from "@/components/home/ServiceStack";
import BusinessTechnology from "@/components/home/BusinessTechnology";
import WhyUs from "@/components/home/WhyUs";


function HomePage() {
  return (
    <>
      <BusinessTechnology />
      <WhatWeBuild />
      <ServiceStack />
      <WhyUs />
      <FAQ />
    </>
  );
}

export default HomePage;
