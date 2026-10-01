import Build from "@/components/Home/Build";
import FAQ from "@/components/Home/FAQ";
import Tool from "@/components/Home/Tools";
import TechnologyWeBuild from "@/components/Home/TechnologyWeBuild";
import WhyUs from "@/components/Home/WhyUs";


function HomePage() {
  return (
    <>
      <TechnologyWeBuild />
      <Build />
      <Tool />
      <WhyUs />
      <FAQ />
    </>
  );
}

export default HomePage;
