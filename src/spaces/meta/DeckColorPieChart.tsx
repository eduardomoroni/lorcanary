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
} from "@/components/ui/chart";
import type { MatchupData } from "@/spaces/meta/types";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
];

interface WinrateMatrixProps {
  data: MatchupData[];
}

export function DeckStatisticsCharts(props: WinrateMatrixProps) {
  const [data] = useState(processData(props.data));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
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
                <Pie
                  data={data.colorCombinations}
                  dataKey="value"
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

      <Card>
        <CardHeader>
          <CardTitle>Individual Color Matches</CardTitle>
          <CardDescription>Total matches by individual color</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={Object.fromEntries(
              data.individualColors.map((entry, index) => [
                entry.name,
                { label: entry.name, color: COLORS[index % COLORS.length] },
              ]),
            )}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.individualColors}
                  dataKey="value"
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
            </ResponsiveContainer>
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

  data.forEach((item) => {
    const deckColors = item.deck.split("/");
    const combinationKey = deckColors.sort().join("/");
    const matches = parseInt(item.total_matches, 10);

    // Count color combinations
    colorCombinations[combinationKey] =
      (colorCombinations[combinationKey] || 0) + matches;

    // Count individual colors
    deckColors.forEach((color) => {
      individualColors[color] = (individualColors[color] || 0) + matches;
    });
  });

  return {
    colorCombinations: aggregateTopFive(colorCombinations),
    individualColors: Object.entries(individualColors).map(([name, value]) => ({
      name,
      value,
    })),
  };
}

function aggregateTopFive(data: Record<string, number>) {
  const entries = Object.entries(data);
  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
  const topFive = sortedEntries.slice(0, 5);
  const others = sortedEntries
    .slice(5)
    .reduce((acc, [name, value]) => acc + value, 0);

  if (others > 0) {
    topFive.push(["Others", others]);
  }

  return topFive.map(([name, value]) => ({ name, value }));
}
