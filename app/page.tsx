import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Stats from "@/components/sections/Stats";
import Tracks from "@/components/sections/Tracks";
import Schedule from "@/components/sections/Schedule";
import Staff from "@/components/sections/Staff";
import Partners from "@/components/sections/Partners";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden text-white bg-black">
      <Hero />
      <Manifesto />
      <Stats />
      <Tracks />
      <Schedule />
      <Staff />
      <Partners />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
