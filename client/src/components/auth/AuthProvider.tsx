import {
  ParentComponent,
  Resource,
  createContext,
  createResource,
} from "solid-js";
import { trpc } from "~/lib/trpc";

import { login as doLogin, logout as doLogout } from "~/lib/auth";

export const AuthContext = createContext<{
  currentUserId: Resource<bigint | null>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}>();

export const AuthProvider: ParentComponent = (props) => {
  const [currentUserId, { refetch: refetchUserId }] = createResource(
    async () => {
      const { userId } = await trpc.auth.whoami.query();
      return userId;
    }
  );

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
    <AuthContext.Provider value={{ currentUserId, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
