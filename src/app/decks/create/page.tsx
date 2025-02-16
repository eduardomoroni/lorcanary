import {
  getCacheKeyForAttributes,
  ValidParams,
} from "@/spaces/cards/cardFilterHelpers";
import type { Metadata } from "next";
import { use } from "react";
import CreateDeckPage from "@/spaces/decks/CreateDeckPage";

type Params = Promise<{ slug: string }>;

type SearchParams = Promise<ValidParams>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const colorType = await searchParams;
  return {
    other: { cacheKey: getCacheKeyForAttributes(colorType) },
  };
}

export const dynamicParams = false;
export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default function Home({ searchParams }: Props) {
  const { type, color } = use(searchParams);

  return <CreateDeckPage color={color} type={type} />;
}
