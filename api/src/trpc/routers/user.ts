import { router, userProcedure } from "@tooinconsistent/api/trpc/trpc.js";

import { unsafelyGetUserProfile } from "@tooinconsistent/api/domains/identity/user.js";

export const userRouter = router({
  getMyProfile: userProcedure.query(({ ctx }) => {
    return unsafelyGetUserProfile({ userId: ctx.userId }, ctx.pgConnection);
  }),
});
