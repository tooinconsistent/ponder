import { trpc } from "@ponder/client/lib/trpc.js";

const AUTH_TOKEN_KEY = "_auth";

export const getToken = () => {
  return globalThis.localStorage.getItem(AUTH_TOKEN_KEY);
};

const setToken = (token: string) => {
  return globalThis.localStorage.setItem(AUTH_TOKEN_KEY, token);
};

const removeToken = () => {
  globalThis.localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { token } = await trpc.auth.login.mutate({ email, password });
  if (token) {
    setToken(token);
  }
};

export const logout = async () => {
  await trpc.auth.logout.mutate();
  removeToken();
};
