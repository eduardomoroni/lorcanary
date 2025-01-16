import { type ValidParams } from "@/spaces/cards/cardFilterHelpers";
import { LandingPage } from "@/spaces/landing-page/LandingPage";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

type SearchParams = Promise<ValidParams>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: "Lorcanito",
  description: "Disney Lorcana TCG Card Library",
};

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default function Home({ searchParams }: Props) {
  return <LandingPage />;
}
