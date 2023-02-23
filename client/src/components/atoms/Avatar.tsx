import { Component, Show } from "solid-js";

interface AvatarProps {
  displayName: string;
  avatarUrl: string | null;
  margins?: string;
}

export const Avatar: Component<AvatarProps> = (props) => {
  return (
    <Show
      when={props.avatarUrl}
      fallback={
        <div
          class={`inline-block h-6 w-6 p-1 min-w-[1.5rem] rounded-full text-[var(--base-foreground)] border-2 border-[var(--base-foreground)] ${
            props.margins ?? ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
      }
    >
      <img
        class={`inline-block h-6 w-6 min-w-[1.5rem] rounded-full border-2 border-[var(--base-foreground)] saturate-50 ${
          props.margins ?? ""
        }`}
        // Must be non null, since we are in <Show> component
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        src={props.avatarUrl!}
        alt={`${props.displayName}'s avatar`}
      />
    </Show>
  );
};
