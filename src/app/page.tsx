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
    other: { cacheKey: getCacheKeyForAttributes(await searchParams) },
  };
}

export const dynamicParams = false;
export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default function Home({ searchParams }: Props) {
  const { type, color } = use(searchParams);

  return <CardsListPage color={color} type={type} />;
}
