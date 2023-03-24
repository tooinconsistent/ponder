import { DBClient } from "@ponder/api/lib/db.ts";
import { selectUserProfile } from "./queries/user.queries.ts";

export const unsafelyGetUserProfile = async (
  {
    userId,
  }: {
    userId: string;
  },
  pgConnection: DBClient
) => {
  const [result] = await selectUserProfile.execute({ userId }, pgConnection);

  if (!result) {
    return null;
  }

  return result;
};
