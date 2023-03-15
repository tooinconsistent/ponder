import { useContext } from "solid-js";
import { AuthContext } from "./AuthProvider.jsx";

export const useCurrentUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("tried to access non-existing context");
  }
  const { currentUser } = authContext;

  return currentUser;
};

export const useAuthentication = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("tried to access non-existing context");
  }
  const { login, logout } = authContext;

  return { login, logout };
};
