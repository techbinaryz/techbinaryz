import Build from "@/components/home/Build";
import FAQ from "@/components/home/FAQ";
import Tool from "@/components/home/Tools";
import TechnologyWeBuild from "@/components/home/TechnologyWeBuild";
import WhyUs from "@/components/home/WhyUs";


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
