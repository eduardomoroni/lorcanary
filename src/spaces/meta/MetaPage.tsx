"use client";

import WinrateMatrix from "@/spaces/meta/WinrateMatrix";
import type { MatchupData } from "@/spaces/meta/types";
import { DeckStatisticsCharts } from "@/spaces/meta/DeckColorPieChart";

interface WinrateMatrixProps {
  data: MatchupData[];
  lastUpdated: string;
}

export function MetaPage({ data, lastUpdated }: WinrateMatrixProps) {
  return (
    <div className="min-h-screen mt-16">
      <WinrateMatrix data={data} lastUpdated={lastUpdated} />
      <DeckStatisticsCharts data={data} />
    </div>
  );
}
