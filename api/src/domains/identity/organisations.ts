import { DBClient } from "@ponder/api/lib/db.ts";
import { selectOrganisationIdsForUser } from "./queries/organisations.queries.ts";

export const getOrganisationsForUser = async (
  userId: string,
  pgConnection: DBClient
) => {
  const result = await selectOrganisationIdsForUser.execute(
    { userId },
    pgConnection
  );

  return result;
};
