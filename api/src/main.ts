import pg from "pg";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@tooinconsistent/api/trpc/router.js";
import { createContext } from "@tooinconsistent/api/trpc/context.js";

import { databaseUrl } from "@tooinconsistent/api/env.js";

// Create a database pool with three connections that are lazily established
const pool = new pg.Pool({ connectionString: databaseUrl });

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    const res = new Response();

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Request-Method", "*");
    res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.headers.set("Access-Control-Allow-Headers", "*");

    return res;
  }

  if (req.method === "GET" && new URL(req.url).pathname === "/health") {
    return new Response(`ok!`);
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
    const res = new Response();
    console.log(err);
    return res;
  } finally {
    pgConnection.release();
  }
};

const port = 3000;
export default { fetch: handler, port };
