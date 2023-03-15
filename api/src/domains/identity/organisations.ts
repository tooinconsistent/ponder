import { DBClient } from "@ponder/api/lib/db.js";
import { selectOrganisationIdsForUser } from "./queries/organisations.queries.js";

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
