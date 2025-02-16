import { countDecks, readDecks } from "@/db/drizzle/deck";
import { Suspense } from "react";
import { DeckListSkeleton } from "@/components/app/DecksList";
import { DecksListPage } from "@/spaces/decks/DecksListPage";
import Pagination from "@/components/app/Pagination";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ page: string }>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

export const dynamicParams = true;
export const fetchCache = "force-cache";

export default async function Decks({ searchParams }: Props) {
  const total = await countDecks(); // TODO: Implement filtering
  const serverSearchParams = await searchParams;
  const offset = parseInt(serverSearchParams.page || "0", 10);
  const decks = readDecks({ offset, limit: 20 });
  const prev =
    offset > 0
      ? { name: "Prev", path: `/decks?page=${offset - 1}` }
      : undefined;

  return (
    <main>
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Suspense fallback={<DeckListSkeleton count={20} />}>
          <DecksListPage decks={decks} />
        </Suspense>
        <div className="col-span-full">
          <Pagination
            total={Math.round(total / 20)}
            current={offset}
            next={{ name: "Next", path: `/decks?page=${offset + 1}` }}
            prev={prev}
          />
        </div>
      </div>
    </main>
  );
}
