"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface ChartProps {
  data: any;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

export function CostCurveChart({ data }: ChartProps) {
  const chartConfig = {
    steel: {
      label: "Steel",
      color: "hsl(var(--chart-1))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-2))",
    },
  };

  const formattedData = data.map((d: any) => ({
    cost: d.cost,
    steel: d.steel,
    other: d.total - d.steel,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <XAxis
            dataKey="cost"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="steel" stackId="a" fill="var(--color-steel)" />
          <Bar dataKey="other" stackId="a" fill="var(--color-other)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function CustomPieChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <PieChart>
        <Pie
          data={data}
          dataKey="percentage"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={60}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
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
