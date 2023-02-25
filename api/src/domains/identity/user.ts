import { DBClient } from "@tooinconsistent/api/lib/db.js";
import { unsafelySelectUserProfile } from "./queries/user.queries.js";

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
