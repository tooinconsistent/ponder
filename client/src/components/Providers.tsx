import { ParentComponent } from "solid-js";
import { Router } from "@solidjs/router";

import { AuthProvider } from "./auth/AuthProvider.jsx";
import { PreferencesProvider } from "./preferences/Preferences.jsx";
import { AppStoreProvider } from "../store/app.jsx";

export const Providers: ParentComponent = (props) => {
  return (
    <PreferencesProvider>
      <AuthProvider>
        <Router>
          <AppStoreProvider>{props.children}</AppStoreProvider>
        </Router>
      </AuthProvider>
    </PreferencesProvider>
  );
};
