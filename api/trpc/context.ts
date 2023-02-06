import type { Client } from "postgres";

import type { inferAsyncReturnType } from "npm:@trpc/server";
import type { FetchCreateContextFnOptions } from "npm:@trpc/server/adapters/fetch";

import { getUserIdFromToken } from "@/domains/auth/auth.ts";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({
  req,
  resHeaders,
  pgConnection,
}: FetchCreateContextFnOptions & { pgConnection: Client }) {
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
