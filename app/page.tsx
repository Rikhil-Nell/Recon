import Hero from "@/components/sections/Hero";
import MissionBrief from "@/components/sections/MissionBrief";
import Operations from "@/components/sections/Operations";
import Timeline from "@/components/sections/Timeline";
import Deploy from "@/components/sections/Deploy";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <Hero />
      <MissionBrief />
      <Operations />
      <Timeline />
      <Deploy />
    </main>
  );
}
