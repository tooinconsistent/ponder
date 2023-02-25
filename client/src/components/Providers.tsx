import { ParentComponent } from "solid-js";

import { AuthProvider } from "./auth/AuthProvider.jsx";
import { PreferencesProvider } from "./preferences/Preferences.jsx";
import { AppStoreProvider } from "../store/app.jsx";

export const Providers: ParentComponent = (props) => {
  return (
    <PreferencesProvider>
      <AuthProvider>
        <AppStoreProvider>{props.children}</AppStoreProvider>
      </AuthProvider>
    </PreferencesProvider>
  );
};
