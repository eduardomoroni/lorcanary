import { type ValidParams } from "@/spaces/cards/cardFilterHelpers";
import { readList } from "@/db/deck-versions";

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

  const decks = await readList({
    id: Number(idOrPublicId),
    publicId: idOrPublicId,
  });
  console.log(decks);

  return <span>{JSON.stringify(decks, null, 2)}</span>;
}
