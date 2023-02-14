import { publicProcedure, router } from "@tooinconsistent/api/trpc/trpc.js";

import { authRouter } from "@tooinconsistent/api/trpc/routers/auth.js";

export const appRouter = router({
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
