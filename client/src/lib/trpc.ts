import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

import superjson from "superjson";

import type { AppRouter } from "@ponder/api/trpc/router.ts";

import { getToken } from "./auth.ts";

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    loggerLink({ console: { log: console.debug, error: console.error } }),
    httpBatchLink({
      url: `${import.meta.env.VITE_API_URL}/trpc`,
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
