import { Client } from "postgres";

import {
  insertSessionForUser,
  selectSessionById,
} from "./queries/session.queries.ts";

export const createSession = async (
  userId: bigint,
  pgConnection: Client,
): Promise<{ sessionId: string }> => {
  const [result] = await insertSessionForUser.execute(
    { userId },
    pgConnection,
  );

  if (!result) {
    throw new Error("Couldn't insert the session.");
  }

  return { ...result };
};

export const getUserIdFromSession = async (
  sessionId: string,
  pgConnection: Client,
): Promise<bigint | null> => {
  const [result] = await selectSessionById.execute({ sessionId }, pgConnection);

  if (result) {
    return result.userId;
  }

  return null;
};
