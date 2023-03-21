import { Component, Suspense } from "solid-js";

import { Providers } from "./core/Providers.jsx";
import { Root } from "./core/Root.jsx";

const Appplication: Component = () => {
  return (
    <Suspense fallback={<div>🦄</div>}>
      <Providers>
        <Root />
      </Providers>
    </Suspense>
  );
};

export default Appplication;
