import { verify } from "@ponder/api/lib/argon2.js";

import type { DBClient } from "@ponder/api/lib/db.js";

import { getUserIdFromSession } from "@ponder/api/domains/auth/session.js";

import { selectUserAndHashByEmail } from "@ponder/api/domains/auth/queries/auth.queries.js";

export const getUserIdFromEmailAndPassword = async (
  { email, password }: { email: string; password: string },
  pgConnection: DBClient
): Promise<string | null> => {
  const [userDetails] = await selectUserAndHashByEmail.execute(
    { userEmail: email },
    pgConnection
  );

  // TODO: Currenntly this is leaking existence of
  //       user email through timing attack.
  //       Might want to consider fixing this.
  if (userDetails && verify(userDetails.passwordHash, password)) {
    return userDetails.userId;
  }

  return null;
};

export const getUserIdFromToken = (
  token: string,
  pgConnection: DBClient
): Promise<string | null> => {
  return getUserIdFromSession(token, pgConnection);
};
