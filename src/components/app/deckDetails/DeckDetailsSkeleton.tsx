import { Skeleton } from "@/components/ui/skeleton";
import { CardListSkeleton } from "@/components/app/deckDetails/DeckDetailsCardList";
import { Card } from "@/components/ui/card";
import {
  CostCurveChartSkeleton,
  PieChartSkeleton,
} from "@/components/app/deckDetails/DeckDetailsCharts";

export function DeckDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-8 w-64" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-6 w-20" />
              ))}
            </div>
          </div>
          <StatsSkeleton />
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            <CardListSkeleton count={8} />
            <CardListSkeleton count={6} />
            <CardListSkeleton count={4} />
            <CardListSkeleton count={4} />
          </div>

          <div className="space-y-6 max-w-md w-full mx-auto">
            <Card className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <Skeleton className="h-4 w-12 mb-2" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </Card>

            <CostCurveChartSkeleton />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <PieChartSkeleton />
              <PieChartSkeleton />
              <PieChartSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="flex items-center gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  );
}
