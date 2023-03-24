import http from "http";
import pg from "pg";

import { createHTTPHandler } from "@trpc/server/adapters/standalone";

import { appRouter } from "@ponder/api/trpc/router.ts";
import { createContext } from "@ponder/api/trpc/context.ts";

import { databaseUrl, port } from "@ponder/api/env.ts";

// Create a user scoped database pool with twenty connections that are lazily established
const pool = new pg.Pool({ connectionString: databaseUrl, max: 20 });
const adminPool = new pg.Pool({ connectionString: databaseUrl, max: 20 });

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = http.createServer(async (req, res) => {
  const since = performance.now();
  console.debug(`Handling new request :: at ${since}`);
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("X-Performance", `${performance.now() - since}`);

    console.debug(
      `Sending options response :: at ${performance.now()} :: took ${
        res.getHeader("X-Performance")?.toString() ?? ""
      }ms`
    );
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.setHeader("X-Performance", `${performance.now() - since}`);

    console.debug(
      `Sending health response :: at ${performance.now()} :: took ${
        res.getHeader("X-Performance")?.toString() ?? ""
      }ms`
    );
    res.write("ok!");
    res.end();
    return;
  }

  // Get a connection from the pool and set the role to the user
  const pgConnection = await pool.connect();
  await pgConnection.query("set role ponder_user;");
  // Get an admin connection from the pool
  const adminPgConnection = await adminPool.connect();

  const handler = createHTTPHandler({
    router: appRouter,
    createContext: (args) =>
      createContext({ ...args, pgConnection, adminPgConnection }),
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

    req.url = req.url?.replace("/trpc", "");

    await handler(req, res);

    console.debug(
      `Sending response :: at ${performance.now()} :: took ${
        performance.now() - since
      }ms`
    );
    return;
  } catch (err) {
    console.error(err);
    return;
  } finally {
    pgConnection.release();
    adminPgConnection.release();
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
