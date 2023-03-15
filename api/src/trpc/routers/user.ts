import { router, userProcedure } from "@ponder/api/trpc/trpc.js";

import { unsafelyGetUserProfile } from "@ponder/api/domains/identity/user.js";

export const userRouter = router({
  getMyProfile: userProcedure.query(({ ctx }) => {
    return unsafelyGetUserProfile({ userId: ctx.userId }, ctx.pgConnection);
  }),
});
