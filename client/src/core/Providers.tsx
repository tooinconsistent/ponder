import { ParentComponent } from "solid-js";

import { AuthProvider } from "./auth/AuthProvider.jsx";
import { PreferencesProvider } from "./preferences/Preferences.jsx";
import { AppStoreProvider } from "../store/app.jsx";
import { EnsureAuthenticated } from "./auth/EnsureAuthenticated.jsx";

export const Providers: ParentComponent = (props) => {
  return (
    <PreferencesProvider>
      <AuthProvider>
        <EnsureAuthenticated>
          <AppStoreProvider>{props.children}</AppStoreProvider>
        </EnsureAuthenticated>
      </AuthProvider>
    </PreferencesProvider>
  );
};
