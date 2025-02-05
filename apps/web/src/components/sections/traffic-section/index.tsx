import { getTraffics } from "@/api/traffics.api";
import Container from "@/components/atoms/container";
import TrafficLight from "@/components/molecules/traffic-light";
import { Card } from "@/components/ui/card";
import { Location } from "@/interface/location";
import { FC } from "react";

const TrafficSection: FC = async () => {
  const locations = await getTraffics();

  return (
    <section className="py-20 px-10">
      <Container>
        <Card className="p-7 flex flex-col gap-5">
          <h2 className="text-3xl font-semibold">Traffic Lights</h2>
          {locations?.map((location: Location, i: number) => <TrafficLight key={i} location={location} />)}
        </Card>
      </Container>
    </section>
  );
};

export default TrafficSection;
