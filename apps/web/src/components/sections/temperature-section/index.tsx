import { getAvgTemp, getHighestTemp, getLowestTemp, getTempReports } from "@/api/temperatures.api";
import Container from "@/components/atoms/container";
import StatisticCard from "@/components/molecules/statistic-card";
import TemperatureChart from "@/components/molecules/temperature-chart";

export async function TemperatureSection() {
  const reports = await getTempReports();
  const max = await getHighestTemp();
  const min = await getLowestTemp();
  const avg = await getAvgTemp();

  return (
    <section className="py-20 px-10">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center mb-10">
          <StatisticCard title="Highest Temperature" description="Highest weekly temperature">
            <h2 className="text-3xl font-semibold text-red-600">{max?.value}&deg;C</h2>
            <p className="mt-2 text-sm text-slate-700">
              on {max?.location.name}, {new Date(max?.createdAt ?? "").toLocaleDateString()}
            </p>
          </StatisticCard>
          <StatisticCard title="Lowest Temperature" description="Lowest weekly temperature">
            <h2 className="text-3xl font-semibold text-blue-600">{min?.value}&deg;C</h2>
            <p className="mt-2 text-sm text-slate-700">
              on {min?.location.name}, {new Date(min?.createdAt ?? "").toLocaleDateString()}
            </p>
          </StatisticCard>
          <StatisticCard title="Average Temperature" description="Average weekly temperature">
            <h2 className="text-3xl font-semibold">{avg.avg}&deg;C</h2>
          </StatisticCard>
        </div>
        <TemperatureChart data={reports.data} />
      </Container>
    </section>
  );
}
