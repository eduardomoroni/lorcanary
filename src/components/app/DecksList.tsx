import { Eye, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DeckThumbnail } from "@/db/drizzle/types";
import Link from "next/link";
import { InkColorIcon } from "@/spaces/icons/ColorIcon";

export function DeckCard({
  name,
  ownerName,
  publicId,
  deckColors,
}: DeckThumbnail) {
  return (
    <Link href={`/decks/${publicId}`}>
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-300 ease-in-out",
          `bg-${deckColors.filter(Boolean)[0]}`,
          "hover:shadow-lg hover:-translate-y-1 hover:brightness-110",
        )}
      >
        <div className="relative z-10 p-4 text-white">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold truncate text-black dark:text-white">
              {name}
            </h3>
            <div className="flex items-center gap-3 text-sm text-black dark:text-white">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {0}
              </div>
              <div className="flex items-center gap-1 text-black dark:text-white">
                <Heart className="w-4 h-4" />
                {0}
              </div>
            </div>
          </div>

          {[].length > 0 && (
            <div className="mt-2">
              {[].map((tag) => (
                <Badge key={tag} variant="default" className="mr-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-end justify-between mt-8">
            <div className="flex gap-1">
              {deckColors.map((type) => (
                <InkColorIcon key={type} color={type} className="w-6 h-6" />
              ))}
            </div>
            {/*<div className="text-lg font-bold text-green-400">$ 0.00</div>*/}
          </div>

          <div className="flex items-center justify-between mt-2 text-sm text-black dark:text-white">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {ownerName}
            </div>
            <span>{0}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function DeckCardSkeleton() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="relative z-10 p-4">
        <div className="flex items-start justify-between gap-2">
          {/* Title and stats */}
          <Skeleton className="h-6 w-[160px]" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>

        {/* Tags */}
        <div className="mt-2 flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Archetype and price */}
        <div className="mt-8 flex items-end justify-between">
          <div className="flex gap-1">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
          </div>
          <Skeleton className="h-7 w-20" />
        </div>

        {/* User and time */}
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </Card>
  );
}

export function DeckListSkeleton({ count = 12 }) {
  return [...Array(count)].map((_, i) => <DeckCardSkeleton key={i} />);
}

export function DeckList({ decks }: { decks: DeckThumbnail[] }) {
  return decks.map((deck) => <DeckCard key={deck.id} {...deck} />);
}
