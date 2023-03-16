import http from "http";
import pg from "pg";

import { createHTTPHandler } from "@trpc/server/adapters/standalone";

import { appRouter } from "@ponder/api/trpc/router.ts";
import { createContext } from "@ponder/api/trpc/context.ts";

import { databaseUrl, port } from "@ponder/api/env.ts";

// Create a database pool with three connections that are lazily established
const pool = new pg.Pool({ connectionString: databaseUrl });

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = http.createServer(async (req, res) => {
  const since = performance.now();
  console.debug(`Handling new request :: at ${since}`);
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");

    console.debug(
      `Sending options response :: at ${performance.now()} :: took ${
        performance.now() - since
      }ms`
    );
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.write("ok!");
    res.end();
    return;
  }

  const pgConnection = await pool.connect();
  const handler = createHTTPHandler({
    router: appRouter,
    createContext: (args) => createContext({ ...args, pgConnection }),
    batching: {
      enabled: true,
    },
  });
  try {
    console.debug(`Delegating to handler :: at ${performance.now()}`);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");

    console.debug(
      `Sending response :: at ${performance.now()} :: took ${
        performance.now() - since
      }ms`
    );

    req.url = req.url?.replace("/trpc", "");
    await handler(req, res);
    return;
  } catch (err) {
    console.error(err);
    return;
  } finally {
    pgConnection.release();
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
