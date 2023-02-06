import { ParentComponent, Show, useContext } from "solid-js";

import { AuthContext } from "./AuthProvider";
import { Authentication } from "./Authentication";

interface EnsureAuthenticatedProps {}

export const EnsureAuthenticated: ParentComponent<EnsureAuthenticatedProps> = (
  props
) => {
  const { currentUserId } = useContext(AuthContext)!;

  return (
    <Show when={currentUserId() !== null} fallback={<Authentication />}>
      {props.children}
    </Show>
  );
};
