import { router } from "@ponder/api/trpc/trpc.ts";

import { authRouter } from "@ponder/api/trpc/routers/auth.ts";
import { channelsRouter } from "@ponder/api/trpc/routers/channels.ts";
import { threadsRouter } from "@ponder/api/trpc/routers/threads.ts";
import { userRouter } from "@ponder/api/trpc/routers/user.ts";

export const appRouter = router({
  auth: authRouter,
  channels: channelsRouter,
  threads: threadsRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
