"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { DBCardWIthCardJson } from "@/db/drizzle/types";

interface ChartProps {
  data: Array<DBCardWIthCardJson>;
}

const initialColorDistributionChartData = [
  { type: "inkless", types: 0, fill: "var(--amber)" },
  { type: "inkpot", types: 0, fill: "var(--ruby)" },
];

export function CardInkPieChart({ data }: ChartProps) {
  const chartData =
    data.reduce(
      (acc, { lorcanitoCard, qty }) => {
        const cardType = lorcanitoCard.inkwell ? "inkpot" : "inkless";

        try {
          acc = acc.map((data: { type: string; types: number }) => {
            if (data.type === cardType) {
              data.types += qty;
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
        <Pie data={chartData} dataKey="types" nameKey="type" />
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
