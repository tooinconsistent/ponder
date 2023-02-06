import { ParentComponent } from "solid-js";

import { AuthProvider } from "./auth/AuthProvider";

export const Providers: ParentComponent = (props) => {
  return <AuthProvider>{props.children}</AuthProvider>;
};
