import { Component } from "solid-js";
import { EnsureAuthenticated } from "./auth/EnsureAuthenticated";

export const Root: Component = () => {
  return (
    <EnsureAuthenticated>
      <div>HAHAZ</div>
    </EnsureAuthenticated>
  );
};
