import { router } from "@ponder/api/trpc/trpc.js";

import { authRouter } from "@ponder/api/trpc/routers/auth.js";
import { channelsRouter } from "@ponder/api/trpc/routers/channels.js";
import { threadsRouter } from "@ponder/api/trpc/routers/threads.js";
import { userRouter } from "@ponder/api/trpc/routers/user.js";

export const appRouter = router({
  auth: authRouter,
  channels: channelsRouter,
  threads: threadsRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
