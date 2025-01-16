import { type ValidParams } from "@/spaces/cards/cardFilterHelpers";
import { readList } from "@/db/drizzle/deck-versions";
import DeckListPage from "@/spaces/lists/DeckListPage";

type Params = Promise<{ idOrPublicId: string }>;

type SearchParams = Promise<ValidParams>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

// export const dynamicParams = false;
// export const dynamic = "force-static";
// export const fetchCache = "force-cache";

export default async function Decks({ params }: Props) {
  const { idOrPublicId } = await params;

  const deckList = await readList({
    id: Number(idOrPublicId),
    publicId: idOrPublicId,
  });

  const value = { ...deckList };

  // @ts-expect-error TODO: Leo please removfe this
  return <DeckListPage data={value} idOrPublicId={idOrPublicId} />;
}
