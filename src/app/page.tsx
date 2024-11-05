import CardsListPage from "@/spaces/cards/CardsListPage";
import { use } from "react";
import type { Metadata } from "next";
import {
  getCacheKeyForAttributes,
  type ValidParams,
} from "@/spaces/cards/cardFilterHelpers";

type Params = Promise<{ slug: string }>;

type SearchParams = Promise<ValidParams>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    // title: `Landing Page for ${name || "Guest"}`,
    // description: `A custom landing page with ${title} in ${color} for ${type}`,
    // This will be used as the cache key
    other: { cacheKey: getCacheKeyForAttributes(await searchParams) },
  };
}

export default function Home({ searchParams }: Props) {
  const { type, color } = use(searchParams);

  return <CardsListPage color={color} type={type} />;
}
