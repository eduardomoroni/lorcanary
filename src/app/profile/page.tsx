import * as React from "react";
import { ProfilePage } from "@/spaces/profile/ProfilePage";
import { currentUser } from "@clerk/nextjs/server";
import { getProfileByUserId } from "@/db/drizzle/profile";

export default async function Profile() {
  const user = await currentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const profile = await getProfileByUserId(user.id);

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="mt-16">
      <ProfilePage profile={profile} />
    </div>
  );
}
