"use client";

import WinrateMatrix from "@/spaces/meta/WinrateMatrix";
import type { MatchupData } from "@/spaces/meta/types";

interface WinrateMatrixProps {
  data: MatchupData[];
}

export function MetaPage({ data }: WinrateMatrixProps) {
  return <WinrateMatrix data={data} />;
}
