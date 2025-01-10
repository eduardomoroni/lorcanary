import { Card } from "@/components/ui/card";
import { MatchupData } from "./types";
import { getCellColor } from "./utils";

interface MatrixCellProps {
  data: MatchupData | undefined;
  showDetails?: boolean;
  isOverall?: boolean;
}

export function MatrixCell({
  data,
  showDetails = false,
  isOverall = false,
}: MatrixCellProps) {
  if (!data) {
    return (
      <Card className="p-4 bg-gray-900 text-center">
        <div className="text-2xl">-</div>
        <div className="text-xs text-gray-400">No data</div>
      </Card>
    );
  }

  const winrate = parseFloat(data.overall_winrate);

  if (winrate === 100) {
    return <Card className="p-4 bg-gray-900 text-center"></Card>;
  }

  const backgroundColor = getCellColor(winrate);

  return (
    <Card
      className={`p-4 ${backgroundColor} border-gray-800 ${isOverall ? "border-l-2 border-l-amber-300" : ""} relative min-h-[80px]`}
    >
      {showDetails && (
        <div className="absolute top-0 left-0">
          <div className="text-xs text-gray-400 opacity-75">
            OTP:{Math.round(data.play_winrate)}% OTD:
            {Math.round(data.draw_winrate)}%
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl font-bold text-gray-400">
          {Math.round(winrate)}%
        </div>
      </div>
      {showDetails && (
        <div className="absolute bottom-0 right-0 text-xs text-gray-400 text-end opacity-75">
          {data.wins} / {data.total_matches}
        </div>
      )}
    </Card>
  );
}
