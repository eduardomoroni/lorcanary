"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { MatchupData } from "@/spaces/meta/types";

const COLORS = [
  "#FF5733", // Red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#FF33A1", // Pink
  "#33FFF5", // Cyan
  "#FF8C33", // Orange
  "#8C33FF", // Purple
];

interface WinrateMatrixProps {
  data: MatchupData[];
}

export function DeckStatisticsCharts(props: WinrateMatrixProps) {
  const [data] = useState(processData(props.data));

  const chartConfig = Object.fromEntries(
    data.individualColors.map((entry, index) => [
      entry.name,
      { label: entry.name, color: COLORS[index % COLORS.length] },
    ]),
  ) satisfies ChartConfig;

  console.log(chartConfig);
  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4 max-w-[1400px] mx-auto">
      <Card className="bg-main50">
        <CardHeader>
          <CardTitle>Color Combination Matches</CardTitle>
          <CardDescription>Total matches per color combination</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={Object.fromEntries(
              data.colorCombinations.map((entry, index) => [
                entry.name,
                { label: entry.name, color: COLORS[index % COLORS.length] },
              ]),
            )}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="name" />}
                />
                <Pie
                  data={data.colorCombinations}
                  dataKey="percentual"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.colorCombinations.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-main50">
        <CardHeader>
          <CardTitle>Individual Color Matches</CardTitle>
          <CardDescription>Total matches by individual color</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie
                data={data.individualColors}
                dataKey="percentual"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.individualColors.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

type DeckData = {
  deck: string;
  versus: string;
  total_matches: string;
};
function processData(data: DeckData[]) {
  const colorCombinations: Record<string, number> = {};
  const individualColors: Record<string, number> = {};
  let totalMatches = 0;

  data.forEach((item) => {
    const deckColors = item.deck.split("/");
    const combinationKey = deckColors.sort().join("/");

    if (deckColors.length < 2) {
      return;
    }

    const matches = parseInt(item.total_matches, 10);
    totalMatches += matches;

    // Count color combinations
    colorCombinations[combinationKey] =
      (colorCombinations[combinationKey] || 0) + matches;

    // Count individual colors
    deckColors.forEach((color) => {
      individualColors[color] = (individualColors[color] || 0) + matches;
    });
  });

  return {
    colorCombinations: aggregateTopFive(colorCombinations, totalMatches),
    individualColors: Object.entries(individualColors).map(([name, value]) => ({
      name,
      value,
      percentual: Math.round((value / 2 / totalMatches) * 1000) / 10,
    })),
  };
}

function aggregateTopFive(data: Record<string, number>, totalMatches: number) {
  const entries = Object.entries(data);
  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
  const topFive = sortedEntries.slice(0, 5);
  const others = sortedEntries
    .slice(5)
    .reduce((acc, [name, value]) => acc + value, 0);

  if (others > 0) {
    topFive.push(["Others", others]);
  }

  return topFive.map(([name, value]) => ({
    name,
    value,
    percentual: Math.round((value / totalMatches) * 1000) / 10,
  }));
}
