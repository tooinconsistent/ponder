import type { DBClient } from "@tooinconsistent/api/lib/db.js";

import {
  insertSessionForUser,
  selectSessionById,
} from "./queries/session.queries.js";

export const createSession = async (
  userId: string,
  pgConnection: DBClient
): Promise<{ sessionId: string }> => {
  const [result] = await insertSessionForUser.execute({ userId }, pgConnection);

  if (!result) {
    throw new Error("Couldn't insert the session.");
  }

  return { ...result };
};

export const getUserIdFromSession = async (
  sessionId: string,
  pgConnection: DBClient
): Promise<string | null> => {
  const [result] = await selectSessionById.execute({ sessionId }, pgConnection);

  if (result) {
    return result.userId;
  }

  return null;
};
