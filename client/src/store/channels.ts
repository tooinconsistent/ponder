import { createResource } from "solid-js";
import { trpc } from "../lib/trpc.js";

export const [channels, { refetch }] = createResource(() => {
  return trpc.channels.listAll.query({
    organisationId: "30000000-0000-4000-0000-000000000001",
  });
});
