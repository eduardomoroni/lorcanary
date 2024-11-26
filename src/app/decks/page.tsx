import { type ValidParams } from "@/spaces/cards/cardFilterHelpers";
import { readDecks } from "@/db/deck";
import { DecksPage } from "@/spaces/decks/DecksPage";

type Params = Promise<{ slug: string }>;

type SearchParams = Promise<ValidParams>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

export const dynamicParams = false;
export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default async function Decks({ searchParams }: Props) {
  const decks = await readDecks({ offset: 0, limit: 20 });
  console.log(decks);
  return <DecksPage decks={decks} />;
}
