import { Client } from "postgres";

import { compare, hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

import { getUserIdFromSession } from "@/domains/auth/session.ts";

import { selectUserAndHashByEmail } from "@/domains/auth/queries/auth.queries.ts";

export const getUserIdFromEmailAndPassword = async (
  { email, password }: { email: string; password: string },
  pgConnection: Client,
): Promise<bigint | null> => {
  const [userDetails] = await selectUserAndHashByEmail.execute(
    { userEmail: email },
    pgConnection,
  );

  // TODO: Currenntly this is leaking existence of user email through timing attack
  //       Might want to consider fixing this.
  if (userDetails && await compare(password, userDetails.passwordHash)) {
    return userDetails.userId;
  }

  return null;
};

export const getUserIdFromToken = (
  token: string,
  pgConnection: Client,
): Promise<bigint | null> => {
  return getUserIdFromSession(token, pgConnection);
};
