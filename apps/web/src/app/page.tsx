import { TemperatureSection } from "@/components/sections/temperature-section";
import TrafficSection from "@/components/sections/traffic-section";

export default function Home() {
  return (
    <main>
      <TemperatureSection />
      <TrafficSection />
    </main>
  );
}
