import { ParentComponent, Show } from "solid-js";

import { Authentication } from "./Authentication.jsx";
import { useCurrentUser } from "./auth.js";

export const EnsureAuthenticated: ParentComponent = (props) => {
  const currentUser = useCurrentUser();

  return (
    <Show when={currentUser()} fallback={<Authentication />}>
      {props.children}
    </Show>
  );
};
