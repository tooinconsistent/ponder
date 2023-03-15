import {
  ParentComponent,
  Resource,
  createContext,
  createResource,
} from "solid-js";

import { trpc } from "@ponder/client/lib/trpc.js";

import {
  login as doLogin,
  logout as doLogout,
} from "@ponder/client/lib/auth.js";

export const AuthContext = createContext<{
  currentUser: Resource<{
    userId: string;
    organisations: Array<{ organisationId: string; role: string }>;
  } | null>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}>();

export const AuthProvider: ParentComponent = (props) => {
  const [currentUser, { refetch: refetchUserId }] = createResource(async () => {
    const { userId } = await trpc.auth.whoami.query();
    const organisations = await trpc.auth.myOrganisations.query();
    if (userId === null) {
      return null;
    }

    return { userId, organisations };
  });

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await doLogin({ email, password });
    await refetchUserId();
  };

  const logout = async () => {
    await doLogout();
    await refetchUserId();
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
