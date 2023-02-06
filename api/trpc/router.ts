import { router } from "@/trpc/trpc.ts";

import { authRouter } from "@/trpc/routers/auth.ts";

export const appRouter = router({
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/*
import { z } from "npm:zod";

type User = {
  id: string;
  nameish: string;
  bio?: string;
};

const users: Record<string, User> = { "1": { id: "1", nameish: "hai" } };

export const appRouter = t.router({
  getUserById: t.procedure.input(z.string()).query(({ input }) => {
    return users[input]; // input type is string
  }),

  createUser: t.procedure
    // validate input with Zod
    .input(
      z.object({
        nameish: z.string().min(3),
        bio: z.string().max(142).optional(),
      }),
    )
    .mutation(({ input }) => {
      const id = Date.now().toString();
      const user: User = { id, ...input };
      users[user.id] = user;
      return user;
    }),
});

*/
