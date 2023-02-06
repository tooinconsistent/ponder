import { Handler, serve } from "$std/http/server.ts";
import * as postgres from "postgres";

import { fetchRequestHandler } from "npm:@trpc/server/adapters/fetch";

import { appRouter } from "@/trpc/router.ts";
import { createContext } from "@/trpc/context.ts";

import { databaseUrl } from "@/env.ts";

// Create a database pool with three connections that are lazily established
const pool = new postgres.Pool(databaseUrl, 3, true);

const handler: Handler = async (req: Request) => {
  if (req.method === "OPTIONS") {
    const res = new Response();

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Request-Method", "*");
    res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.headers.set("Access-Control-Allow-Headers", "*");

    return res;
  }

  const pgConnection = await pool.connect();

  try {
    const res = await fetchRequestHandler({
      endpoint: "/trpc",
      req,
      router: appRouter,
      createContext: (args) => createContext({ ...args, pgConnection }),
    });

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Request-Method", "*");
    res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.headers.set("Access-Control-Allow-Headers", "*");

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    pgConnection.release();
  }
};

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await serve(handler, { hostname: "::1", port: 3000 });
}
