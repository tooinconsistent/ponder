import { Component, createSignal } from "solid-js";

import { useAuthentication } from "./auth.js";
import { buttonClasses } from "../atoms/button.js";

export const Authentication: Component = (_props) => {
  const { login } = useAuthentication();

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  return (
    <>
      <div class="flex min-h-full">
        <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div class="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 class="mt-6 text-3xl font-bold tracking-tight text-[var(--textHeader-foreground)]">
                Sign in to your account
              </h2>
            </div>

            <div class="mt-6">
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  void login({ email: email(), password: password() });
                }}
                class="space-y-4"
              >
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-[var(--base-foreground)]"
                  >
                    Email address
                  </label>
                  <div class="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      value={email()}
                      onChange={(e) => {
                        setEmail(e.currentTarget.value);
                      }}
                      class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <label
                    for="password"
                    class="block text-sm font-medium text-[var(--base-foreground)]"
                  >
                    Password
                  </label>
                  <div class="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      value={password()}
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                      class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class={`${buttonClasses({
                      size: "lg",
                    })} mt-3 w-full justify-center`}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
          <img
            class="absolute inset-0 h-full w-full object-cover saturate-50"
            src="https://images.unsplash.com/photo-1675308221026-73719f918d78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
