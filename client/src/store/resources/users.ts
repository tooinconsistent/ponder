import { createResource } from "solid-js";

import { trpc } from "../../lib/trpc.ts";

import { App } from "../app.tsx";

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

export const init = (app: App) => {
  const [currentUserProfile] = createResource(() => {
    return trpc.user.getMyProfile.query();
  });

  const store: UsersStore = {
    get currentUserProfile() {
      return currentUserProfile.latest;
    },
  };

  app.setStore("users", store);
};
