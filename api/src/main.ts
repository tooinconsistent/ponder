import http from "http";
import pg from "pg";

import { createHTTPHandler } from "@trpc/server/adapters/standalone";

import { appRouter } from "@tooinconsistent/api/trpc/router.js";
import { createContext } from "@tooinconsistent/api/trpc/context.js";

import { databaseUrl, port } from "@tooinconsistent/api/env.js";

// Create a database pool with three connections that are lazily established
const pool = new pg.Pool({ connectionString: databaseUrl });

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
    return new Response(`ok!`);
  }

  const pgConnection = await pool.connect();
  const handler = createHTTPHandler({
    router: appRouter,
    createContext: (args) => createContext({ ...args, pgConnection }),
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
    handler(req, res);
    return;
  } catch (err) {
    const res = new Response();
    console.error(err);
    return res;
  } finally {
    pgConnection.release();
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
