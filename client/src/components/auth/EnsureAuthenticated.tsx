import { ParentComponent, Show, useContext } from "solid-js";

import { AuthContext } from "./AuthProvider.jsx";
import { Authentication } from "./Authentication.jsx";

export const EnsureAuthenticated: ParentComponent = (props) => {
  const { currentUser } = useContext(AuthContext)!;

  return (
    <Show when={currentUser()} fallback={<Authentication />}>
      {props.children}
    </Show>
  );
};
