import { db } from "@/db/drizzle/index";
import { matches, GameCategory } from "@/db/drizzle/schema";
import { sql } from "drizzle-orm";

export const countRankedMatches = async (
  category: string = "ranked",
): Promise<number> => {
  const result = await db
    .select({
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(matches)
    .where(sql`category = ${category}`);

  return result[0].count;
};

export const getServerStats = async ({
  category,
}: {
  category: GameCategory;
}) => {
  const totalMatchesQuery = await countRankedMatches(category);

  return {
    totalMatchesQuery,
  };
};
