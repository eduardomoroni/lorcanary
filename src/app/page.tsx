import CardsListPage from "@/spaces/cards/CardsListPage";
import { Metadata } from "next";
import { use } from "react";
import { LorcanitoCard } from "@/shared/types/lorcanito";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{
  color?: LorcanitoCard["color"];
  type?: LorcanitoCard["type"];
}>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

// export async function generateMetadata({
//   searchParams,
// }: Props): Promise<Metadata> {
//   // Extract the parameters we want to use for caching
//   const { color, type } = await searchParams;
//
//   // Use these parameters to generate a unique key for caching
//   const cacheKey = `${name}-${title}-${color}-${type}`;
//
//   return {
//     title: `Landing Page for ${name || "Guest"}`,
//     description: `A custom landing page with ${title} in ${color} for ${type}`,
//     // This will be used as the cache key
//     other: { cacheKey },
//   };
// }

export default function Home({ searchParams }: Props) {
  const { type, color } = use(searchParams);

  return <CardsListPage color={color} type={type} />;
}
