"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { MatchupData, TimeRange, SortType } from "./types";
import {
  processMatchupData,
  getUniqueDecks,
  sortDecks,
  calculateOverallStats,
} from "./utils";
import { MatrixCell } from "@/spaces/meta/MatrixCell";
import { InkColorIcon } from "@/spaces/icons/ColorIcon";
import { COLORS } from "@/spaces/meta/constants";

interface WinrateMatrixProps {
  data: MatchupData[];
}

export default function WinrateMatrix({ data }: WinrateMatrixProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("all");
  const [sortType, setSortType] = useState<SortType>("matches");
  const [showDetails, setShowDetails] = useState(false);

  const processedData = processMatchupData(data);
  const decks = getUniqueDecks(data);
  const sortedDecks = sortDecks(decks, processedData, sortType);

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: "all", label: "All time" },
    { value: "week", label: "Last week" },
    { value: "two-weeks", label: "Last two weeks" },
    { value: "month", label: "Last month" },
    { value: "three-months", label: "Last three months" },
    { value: "six-months", label: "Last six months" },
    { value: "year", label: "Last year" },
    { value: "two-years", label: "Last two years" },
    { value: "custom", label: "Custom" },
  ];

  const sortTypes: { value: SortType; label: string }[] = [
    { value: "matches", label: "Number of matches" },
    { value: "winrate", label: "Winrate" },
    { value: "alphabetical", label: "Alphabetical" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-amber-300">
          Winrate Matrix
        </h1>

        {/* Date Range Filter */}
        {/*<div>*/}
        {/*  <h2 className="text-sm uppercase text-gray-400 mb-3">DATE RANGE</h2>*/}
        {/*  <div className="flex flex-wrap gap-2">*/}
        {/*    {timeRanges.map((range) => (*/}
        {/*      <Button*/}
        {/*        key={range.value}*/}
        {/*        variant={timeRange === range.value ? "secondary" : "outline"}*/}
        {/*        onClick={() => setTimeRange(range.value)}*/}
        {/*        className="text-sm"*/}
        {/*      >*/}
        {/*        {range.label}*/}
        {/*      </Button>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Sort Controls */}
        {/*<div>*/}
        {/*  <h2 className="text-sm mb-3">Sort archetypes by:</h2>*/}
        {/*  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">*/}
        {/*    {sortTypes.map((type) => (*/}
        {/*      <Card*/}
        {/*        key={type.value}*/}
        {/*        className={`p-4 cursor-pointer transition-colors ${*/}
        {/*          sortType === type.value*/}
        {/*            ? "bg-gray-800 border-amber-300"*/}
        {/*            : "bg-gray-900 hover:bg-gray-800"*/}
        {/*        }`}*/}
        {/*        onClick={() => setSortType(type.value)}*/}
        {/*      >*/}
        {/*        {type.label}*/}
        {/*      </Card>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Toggle Details */}
        {/*<div className="flex justify-end">*/}
        {/*  <Button*/}
        {/*    variant="outline"*/}
        {/*    onClick={() => setShowDetails(!showDetails)}*/}
        {/*  >*/}
        {/*    {showDetails ? "Hide Details" : "Show Details"}*/}
        {/*  </Button>*/}
        {/*</div>*/}

        {/* Matrix Grid */}
        <div className="overflow-auto">
          <div
            className="grid gap-1 min-w-[800px]"
            style={{
              gridTemplateColumns: `auto auto repeat(${sortedDecks.length}, minmax(120px, 1fr))`,
            }}
          >
            {/* Empty top-left corners */}
            <div className="sticky left-0 bg-gray-950" />
            <div className="p-4 flex items-center text-center font-medium bg-gray-900">
              OVERALL
            </div>

            {/* Column Headers */}
            {sortedDecks.map((deck) => (
              <div key={deck} className="p-4 text-center font-medium">
                {deck}
                {deck.split("/").map((word) => (
                  <InkColorIcon key={word} color={word as COLORS} />
                ))}
              </div>
            ))}

            {/* Row Headers + Matrix Cells */}
            {sortedDecks.map((rowDeck) => (
              <>
                <div
                  key={rowDeck}
                  className="sticky left-0 bg-gray-950 p-4 font-medium flex flex-col"
                >
                  {rowDeck}
                  <div key={rowDeck} className="flex flex-row">
                    {rowDeck.split("/").map((word) => (
                      <InkColorIcon key={word} color={word as COLORS} />
                    ))}
                  </div>
                </div>

                <MatrixCell
                  data={calculateOverallStats(processedData[rowDeck] || {})}
                  showDetails={showDetails}
                  isOverall={true}
                />
                {sortedDecks.map((colDeck) => (
                  <MatrixCell
                    key={`${rowDeck}-${colDeck}`}
                    data={processedData[rowDeck]?.[colDeck]}
                    showDetails={showDetails}
                  />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
