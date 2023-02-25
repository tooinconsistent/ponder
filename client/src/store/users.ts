import { createResource } from "solid-js";
import { trpc } from "../lib/trpc.js";

export const [currentUserProfile, { refetch }] = createResource(() => {
  return trpc.user.getMyProfile.query();
});
