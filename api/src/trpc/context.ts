import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import type { DBClient } from "@tooinconsistent/api/lib/db.js";

import { getUserIdFromToken } from "@tooinconsistent/api/domains/auth/auth.js";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({
  req,
  resHeaders: _resHeaders,
  pgConnection,
}: FetchCreateContextFnOptions & { pgConnection: DBClient }) {
  let userId: bigint | null = null;

  const authHeader = req.headers.get("Authorization");

  if (authHeader) {
    const token = /^Bearer (?<token>\S+)$/.exec(authHeader)?.groups?.token;

    if (token) {
      userId = await getUserIdFromToken(token, pgConnection);
    }
  }

  return {
    pgConnection,
    userId,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
