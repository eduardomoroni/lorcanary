import { type ValidParams } from "@/spaces/cards/cardFilterHelpers";
import { readList } from "@/db/drizzle/deck-versions";
import { getGamesByDeckListId } from "@/db/instant/instant.server";
import DeckListPage from "@/spaces/lists/DeckListPage";

type Params = Promise<{ idOrPublicId: string }>;

type SearchParams = Promise<ValidParams>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

export const dynamicParams = false;
export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default async function Decks({ searchParams, params }: Props) {
  const { idOrPublicId } = await params;

  const deckList = await readList({
    id: Number(idOrPublicId),
    publicId: idOrPublicId,
  });
  const liveGames = await getGamesByDeckListId(Number(idOrPublicId));

  const value = { decks: deckList, liveGames };

  console.log(JSON.stringify(value));

  return <DeckListPage data={value} />;
}
