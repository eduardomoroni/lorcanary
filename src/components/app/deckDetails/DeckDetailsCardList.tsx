import { DeckWithCards } from "@/db/drizzle/types";
import { InkColorIcon } from "@/spaces/icons/ColorIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { InklessIcon } from "@/spaces/icons/InklessIcon";
import { InkIcon } from "@/spaces/icons/InkIcon";

interface CardListProps {
  title: string;
  cards: DeckWithCards["currentVersion"]["cards"];
  count: number;
}

export function CardList({ title, cards, count }: CardListProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          {title}
        </h2>
        <span className="rounded bg-main dark:bg-secondaryBlack px-2 py-0.5 text-sm text-black dark:text-white">
          {count}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              "flex items-center justify-between rounded border-b-4 border-border dark:border-darkNavBorder px-3 py-2",
              `bg-${card.lorcanitoCard.color}`,
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-black dark:text-white">
                {card.qty}x
              </span>
              <div className="flex items-center gap-1">
                <InkColorIcon color={card.lorcanitoCard.color} />
                <InkIcon
                  inkCost={card.lorcanitoCard.cost}
                  inktype={card.lorcanitoCard.inkwell ? "inkpot" : "inkless"}
                />
              </div>
              <span className="text-sm text-black dark:text-white">
                {card.lorcanitoCard.name}
                {card.lorcanitoCard.title && ` - ${card.lorcanitoCard.title}`}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {/*<span className="text-sm font-medium text-green-400">*/}
              {/*  ${card.price.toFixed(2)}*/}
              {/*</span>*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardListSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-8" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
