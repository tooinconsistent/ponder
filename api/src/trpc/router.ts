import { router } from "@tooinconsistent/api/trpc/trpc.js";

import { authRouter } from "@tooinconsistent/api/trpc/routers/auth.js";
import { channelsRouter } from "@tooinconsistent/api/trpc/routers/channels.js";

export const appRouter = router({
  auth: authRouter,
  channels: channelsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
