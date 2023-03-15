import { Component } from "solid-js";

import { buttonClasses } from "@ponder/client/atoms/button.js";

import { Private } from "./icons/Private.jsx";

import { useStore } from "@ponder/client/store/app.jsx";

interface ChannelDetailsProps {
  name: string;
  description: string;
  channelId: string | null;
  isPrivate?: boolean;
}

export const ChannelDetails: Component<ChannelDetailsProps> = (props) => {
  const { actions } = useStore();

  return (
    <div class="flex items-end justify-between border-b border-b-[var(--channel-metaDetailsBorder)] bg-[var(--channel-metaDetailsBackground)] px-10 py-8">
      <div>
        <div class="text-3xl font-bold text-[var(--textHeader-foreground)]">
          {props.name}
        </div>
        <div class="mt-1 flex flex-row items-center">
          {props.isPrivate && (
            <div class="mr-1">
              <Private />
            </div>
          )}
          <div class="leading-none">
            {props.isPrivate ? "Private" : "Public"}
          </div>
          {props.description && (
            <>
              <div class="mx-1 leading-none">·</div>
              <div class="font-light leading-none">{props.description}</div>
            </>
          )}
        </div>
      </div>
      <div class="flex">
        <div>
          <button
            class={buttonClasses({ size: "xs" })}
            onClick={() => {
              actions.openNewThread({ channelId: props.channelId });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="mr-2 h-4 w-4"
            >
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
            New Thread
          </button>
        </div>
      </div>
    </div>
  );
};
