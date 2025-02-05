"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FC } from "react";

const chartConfig = {
  Jakarta: {
    label: "Jakarta",
    color: "hsl(var(--chart-1))",
  },
  Bandung: {
    label: "Bandung",
    color: "hsl(var(--chart-2))",
  },
  Surabaya: {
    label: "Surabaya",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface TemperatureChartProps {
  data: unknown;
}

const TemperatureChart: FC<TemperatureChartProps> = ({ data }) => {
  return (
    <Card className="flex-1 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Temperature Chart</CardTitle>
        <CardDescription>Showing total temperatures for the last week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value: Date) => new Date(value).toLocaleDateString()} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="Jakarta" type="natural" fill="var(--color-Jakarta)" fillOpacity={0.4} stroke="var(--color-Jakarta)" stackId="a" />
            <Area dataKey="Bandung" type="natural" fill="var(--color-Bandung)" fillOpacity={0.4} stroke="var(--color-Bandung)" stackId="a" />
            <Area dataKey="Surabaya" type="natural" fill="var(--color-Surabaya)" fillOpacity={0.4} stroke="var(--color-Surabaya)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;
