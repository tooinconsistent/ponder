import { createResource } from "solid-js";

import { trpc } from "../lib/trpc.js";

export interface UsersStore {
  currentUserProfile:
    | {
        about: string | null;
        avatarUrl: string | null;
        displayName: string;
        fullName: string | null;
        id: string;
        userId: string;
      }
    | null
    | undefined;
}

const id = "users";

const init = (): UsersStore => {
  const [currentUserProfile] = createResource(() => {
    return trpc.user.getMyProfile.query();
  });

  const store: UsersStore = {
    get currentUserProfile() {
      return currentUserProfile.latest;
    },
  };

  return store;
};

const actions = [] as const;

const effects = [] as const;

export const users = {
  id,
  init,
  actions,
  effects,
};
