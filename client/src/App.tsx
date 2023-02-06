import { Component, Suspense } from "solid-js";

import { Providers } from "./components/Providers";
import { Root } from "./components/Root";

const App: Component = () => {
  return (
    <Suspense fallback={<div>🦄</div>}>
      <Providers>
        <Root />
      </Providers>
    </Suspense>
  );
};

export default App;
