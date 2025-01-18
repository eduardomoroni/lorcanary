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
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface ChartProps {
  data: never;
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

  const formattedData = [].map(() => ({
    cost: "cost",
    steel: "steel",
    other: "total - steel",
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[180px]">
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
    <ResponsiveContainer width="100%" height={140}>
      <PieChart>
        <Pie
          data={data}
          dataKey="percentage"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={50}
        >
          {[].map((entry: never, index: number) => (
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

export function CostCurveChartSkeleton() {
  return (
    <Card className="p-4">
      <Skeleton className="h-4 w-24 mb-4" />
      <Skeleton className="h-[180px] w-full" />
    </Card>
  );
}

export function PieChartSkeleton() {
  return (
    <Card className="p-6">
      <Skeleton className="h-4 w-20 mb-4" />
      <Skeleton className="h-[140px] w-full rounded-full" />
    </Card>
  );
}
