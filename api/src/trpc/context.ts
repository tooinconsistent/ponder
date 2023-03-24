import http from "http";

import type { inferAsyncReturnType } from "@trpc/server";

import { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";

import type { DBClient } from "@ponder/api/lib/db.ts";

import { getUserIdFromToken } from "@ponder/api/domains/auth/auth.ts";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({
  req,
  pgConnection,
  adminPgConnection,
}: NodeHTTPCreateContextFnOptions<http.IncomingMessage, http.ServerResponse> & {
  pgConnection: DBClient;
  adminPgConnection: DBClient;
}) {
  let userId: string | null = null;
  let sessionId: string | null = null;

  const authHeader = req.headers.authorization;

  if (authHeader && typeof authHeader === "string") {
    const token = /^Bearer (?<token>\S+)$/.exec(authHeader)?.groups?.token;

    if (token) {
      userId = await getUserIdFromToken(token, adminPgConnection);
      sessionId = token;
    }
  }

  if (userId) {
    await pgConnection.query(
      `select pg_catalog.set_config('jwt.claims.session_id', '${
        sessionId ?? ""
      }', false);`
    );
  }

  return {
    pgConnection,
    adminPgConnection,
    userId,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
