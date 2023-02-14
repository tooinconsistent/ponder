import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "@tooinconsistent/api/trpc/router.js";

import { getToken } from "./auth.js";

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    loggerLink(),
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      headers: () => {
        const token = getToken();
        if (token) {
          return {
            Authorization: `Bearer ${token}`,
          };
        }

        return {};
      },
    }),
  ],
});
