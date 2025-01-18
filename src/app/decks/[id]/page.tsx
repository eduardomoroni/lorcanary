import { readDeck } from "@/db/drizzle/deck";
import { DeckDetail } from "@/components/app/deckDetails/DeckDetails";
import { Suspense } from "react";
import { DeckDetailSkeleton } from "@/components/app/deckDetails/DeckDetailsSkeleton";

type Params = Promise<{ id: string }>;

type Props = {
  params: Params;
};

export const dynamicParams = true;
export const fetchCache = "force-cache";
export const dynamic = "force-static";

export default async function DeckDetails({ params }: Props) {
  const { id } = await params;
  const deckPromise = readDeck(id);
  return (
    <main>
      <Suspense fallback={<DeckDetailSkeleton />}>
        <DeckDetail deckPromise={deckPromise} />
      </Suspense>
    </main>
  );
}
