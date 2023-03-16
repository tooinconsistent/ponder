import { router, userProcedure } from "@ponder/api/trpc/trpc.ts";

import { unsafelyGetUserProfile } from "@ponder/api/domains/identity/user.ts";

export const userRouter = router({
  getMyProfile: userProcedure.query(({ ctx }) => {
    return unsafelyGetUserProfile({ userId: ctx.userId }, ctx.pgConnection);
  }),
});
