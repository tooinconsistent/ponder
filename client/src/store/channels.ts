import { createResource } from "solid-js";

import { trpc } from "../lib/trpc.js";

export interface ChannelsStore {
  channels: Array<{ id: string; name: string }> | undefined;
}

const id = "channels";

const init = (): ChannelsStore => {
  const [channels] = createResource(() => {
    return trpc.channels.listAll.query({
      organisationId: "30000000-0000-4000-0000-000000000001",
    });
  });

  const store: ChannelsStore = {
    get channels() {
      return channels.latest;
    },
  };

  return store;
};

const actions = [] as const;

const effects = [] as const;

export const channels = {
  id,
  init,
  actions,
  effects,
};
