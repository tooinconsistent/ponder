import { createResource, useContext } from "solid-js";

import { trpc } from "../lib/trpc.ts";

import { AuthContext } from "../core/auth/AuthProvider.jsx";

export interface ChannelsStore {
  channels: Array<{ id: string; name: string }> | undefined;
}

const id = "channels";

const init = (): ChannelsStore => {
  const auth = useContext(AuthContext);

  const [channels] = createResource(() => {
    const organisationId =
      auth?.currentUser()?.organisations[0]?.organisationId;

    if (!organisationId) {
      return [];
    }

    return trpc.channels.listAll.query({
      organisationId,
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
