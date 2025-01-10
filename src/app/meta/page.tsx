import { type ValidParams } from "@/spaces/cards/cardFilterHelpers";
import { MetaPage } from "@/spaces/meta/MetaPage";
import { matchupPerformance } from "@/db/drizzle/meta";
import type { MatchupData } from "@/spaces/meta/types";

export const dynamicParams = false;
export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default async function Meta() {
  const matchups: MatchupData[] = await matchupPerformance();
  return <MetaPage data={matchups} />;
}
