"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { DBCardWIthCardJson } from "@/db/drizzle/types";

interface ChartProps {
  data: Array<DBCardWIthCardJson>;
}

const initiaCostCurveChartsData = [
  {
    cost: "1",
    amber: 0,
    ruby: 0,
    sapphire: 0,
    steel: 0,
    amethyst: 0,
    emerald: 0,
  },
  {
    cost: "2",
    amber: 0,
    ruby: 0,
    sapphire: 0,
    steel: 0,
    amethyst: 0,
    emerald: 0,
  },
  {
    cost: "3",
    amber: 0,
    ruby: 0,
    sapphire: 0,
    steel: 0,
    amethyst: 0,
    emerald: 0,
  },
  {
    cost: "4",
    amber: 0,
    ruby: 0,
    sapphire: 0,
    steel: 0,
    amethyst: 0,
    emerald: 0,
  },
  {
    cost: "5",
    amber: 0,
    ruby: 0,
    sapphire: 0,
    steel: 0,
    amethyst: 0,
    emerald: 0,
  },
  {
    cost: "6",
    amber: 0,
    ruby: 0,
    sapphire: 0,
    steel: 0,
    amethyst: 0,
    emerald: 0,
  },
  {
    cost: "7",
    amber: 0,
    ruby: 0,
    sapphire: 0,
    steel: 0,
    amethyst: 0,
    emerald: 0,
  },
  {
    cost: "8",
    amber: 0,
    ruby: 0,
    sapphire: 0,
    steel: 0,
    amethyst: 0,
    emerald: 0,
  },
  {
    cost: "9+",
    amber: 0,
    ruby: 0,
    sapphire: 0,
    steel: 0,
    amethyst: 0,
    emerald: 0,
  },
];

export function CostCurveChart({ data }: ChartProps) {
  const chartConfig = {
    sapphire: {
      label: "Sapphire",
      color: "hsl(var(--sapphire))",
    },
    ruby: {
      label: "Ruby",
      color: "hsl(var(--ruby))",
    },
    steel: {
      label: "Steel",
      color: "hsl(var(--steel))",
    },
    amethyst: {
      label: "Amethyst",
      color: "hsl(var(--amethyst))",
    },
    amber: {
      label: "Amber",
      color: "hsl(var(--amber))",
    },
    emerald: {
      label: "Emerald",
      color: "hsl(var(--emerald))",
    },
  } satisfies ChartConfig;

  const chartData =
    data.reduce(
      (acc, { lorcanitoCard, qty }) => {
        const cardCost = lorcanitoCard.cost;
        const cardColor = lorcanitoCard.color;
        try {
          if (cardCost >= 9) {
            acc[8][cardColor] += qty;
          } else {
            acc[cardCost - 1][cardColor] += qty;
          }
        } catch (error) {
          console.error("Error processing card", lorcanitoCard, error);
        }

        return acc;
      },
      JSON.parse(JSON.stringify(initiaCostCurveChartsData)),
    ) || initiaCostCurveChartsData;

  return (
    <ChartContainer config={chartConfig} className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="cost"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="steel" stackId="a" fill="var(--steel)" />
          <Bar dataKey="amber" stackId="a" fill="var(--amber)" />
          <Bar dataKey="emerald" stackId="a" fill="var(--emerald)" />
          <Bar dataKey="ruby" stackId="a" fill="var(--ruby)" />
          <Bar dataKey="sapphire" stackId="a" fill="var(--sapphire)" />
          <Bar dataKey="amethyst" stackId="a" fill="var(--amethyst)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
