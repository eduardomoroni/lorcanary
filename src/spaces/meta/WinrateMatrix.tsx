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
import clsx from "clsx";

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

  const cellStyle =
    "rounded-base  border-2 border-border dark:border-darkBorder bg-main text-black p-4 text-center font-medium dark:bg-gray-950 dark:text-gray-400 flex items-center justify-center";

  return (
    <div className="">
      <div className="max-w-[1400px] mx-auto space-y-2">
        <h1 className="text-2xl font-semibold text-amber-300">
          Last updated: January 15, 2025
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
        <div>
          <h2 className="text-sm mb-3">Sort by:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sortTypes.map((type) => (
              <Card
                key={type.value}
                onClick={() => setSortType(type.value)}
                className={`p-4 cursor-pointer transition-colors ${
                  sortType === type.value ? "" : ""
                }`}
              >
                {type.label}
              </Card>
            ))}
          </div>
        </div>
        {/* Show Details Button */}
        <div className="flex justify-end">
          <Button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
        {/* Matrix Grid */}
        <div className="overflow-auto">
          <div
            className="grid gap-1 min-w-[800px]"
            style={{
              gridTemplateColumns: `auto auto repeat(${sortedDecks.length}, minmax(120px, 1fr))`,
            }}
          >
            {/* Empty top-left corners */}
            <div className="sticky left-0  " />
            <div className={clsx(cellStyle, "font-bold")}>OVERALL</div>

            {/* Column Headers */}
            {sortedDecks.map((deck, index) => (
              <div key={deck + index + "header"} className={cellStyle}>
                {/*{deck}*/}
                {deck.split("/").map((word, index) => (
                  <InkColorIcon
                    key={word + index}
                    color={word as COLORS}
                    className={"m-0 h-10 w-10"}
                  />
                ))}
              </div>
            ))}

            {/* Row Headers + Matrix Cells */}
            {sortedDecks.map((rowDeck, index) => (
              <>
                <div
                  key={rowDeck + index + "row"}
                  className={clsx(
                    "sticky left-0 z-10 flex-shrink-0 w-24",
                    cellStyle,
                  )}
                >
                  {rowDeck.split("/").map((word) => (
                    <InkColorIcon
                      key={word}
                      color={word as COLORS}
                      className={"m-0 h-10 w-10 flex"}
                    />
                  ))}
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
