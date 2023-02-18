import { hash, verify } from "@node-rs/argon2";

import type { DBClient } from "@tooinconsistent/api/lib/db.js";

import { getUserIdFromSession } from "@tooinconsistent/api/domains/auth/session.js";

import { selectUserAndHashByEmail } from "@tooinconsistent/api/domains/auth/queries/auth.queries.js";

export const getUserIdFromEmailAndPassword = async (
  { email, password }: { email: string; password: string },
  pgConnection: DBClient
): Promise<string | null> => {
  const [userDetails] = await selectUserAndHashByEmail.execute(
    { userEmail: email },
    pgConnection
  );

  // TODO: Currenntly this is leaking existence of user email through timing attack
  //       Might want to consider fixing this.
  if (userDetails && (await verify(userDetails.passwordHash, password))) {
    return userDetails?.userId ?? null;
  }

  return null;
};

// hash("", { memoryCost: 65536, timeCost: 8, parallelism: 2 });

export const getUserIdFromToken = (
  token: string,
  pgConnection: DBClient
): Promise<string | null> => {
  return getUserIdFromSession(token, pgConnection);
};
