"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { DBCardWIthCardJson } from "@/db/drizzle/types";

interface ChartProps {
  data: Array<DBCardWIthCardJson>;
}

const initialColorDistributionChartData = [
  { color: "amber", colors: 0, fill: "var(--amber)" },
  { color: "ruby", colors: 0, fill: "var(--ruby)" },
  { color: "sapphire", colors: 0, fill: "var(--sapphire)" },
  { color: "steel", colors: 0, fill: "var(--steel)" },
  { color: "amethyst", colors: 0, fill: "var(--amethyst)" },
  { color: "emerald", colors: 0, fill: "var(--emerald)" },
];

export function ColorsPieChart({ data }: ChartProps) {
  const chartData =
    data.reduce(
      (acc, { lorcanitoCard, qty }) => {
        const cardColor = lorcanitoCard.color;

        try {
          acc = acc.map((data: { color: string; colors: number }) => {
            if (data.color === cardColor) {
              data.colors += qty;
            }

            return data;
          });
        } catch (error) {
          console.error("Error processing card", lorcanitoCard, error);
        }

        return acc;
      },
      JSON.parse(JSON.stringify(initialColorDistributionChartData)),
    ) || initialColorDistributionChartData;
  return (
    <ResponsiveContainer width="100%" height={90}>
      <PieChart>
        <Pie data={chartData} dataKey="colors" nameKey="color" />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1">
                      <div
                        className="h-2 w-2 rounded"
                        style={{ backgroundColor: payload[0].payload.fill }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {payload[0].name}
                      </span>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {payload[0].value}%
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
