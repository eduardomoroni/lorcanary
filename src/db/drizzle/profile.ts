import { db } from "@/db/drizzle/index";
import { profiles } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";

// Function to get a profile by userId
export const getProfileByUserId = async (userId: string) => {
  const profile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);

  return profile[0];
};

// Function to update a profile by userId
export const updateProfileByUserId = async (
  userId: string,
  updatedData: Partial<typeof profiles>,
) => {
  const result = await db
    .update(profiles)
    .set(updatedData)
    .where(eq(profiles.userId, userId))
    .returning();

  return result[0];
};
