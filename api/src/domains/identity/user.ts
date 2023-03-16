import { DBClient } from "@ponder/api/lib/db.ts";
import { unsafelySelectUserProfile } from "./queries/user.queries.ts";

export const unsafelyGetUserProfile = async (
  {
    userId,
  }: {
    userId: string;
  },
  pgConnection: DBClient
) => {
  const [result] = await unsafelySelectUserProfile.execute(
    { userId },
    pgConnection
  );

  if (!result) {
    return null;
  }

  return result;
};
