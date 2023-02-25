import { router } from "@tooinconsistent/api/trpc/trpc.js";

import { authRouter } from "@tooinconsistent/api/trpc/routers/auth.js";
import { channelsRouter } from "@tooinconsistent/api/trpc/routers/channels.js";
import { threadsRouter } from "@tooinconsistent/api/trpc/routers/threads.js";
import { userRouter } from "@tooinconsistent/api/trpc/routers/user.js";

export const appRouter = router({
  auth: authRouter,
  channels: channelsRouter,
  threads: threadsRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
