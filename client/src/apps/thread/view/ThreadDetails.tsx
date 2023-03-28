import { Component, Show } from "solid-js";

import { useStore } from "@ponder/client/store/app.jsx";

interface ThreadDetailsProps {
  title: string;
  channelId?: string;
}

export const ThreadDetails: Component<ThreadDetailsProps> = (props) => {
  const { store, actions } = useStore();

  const channelName = () => {
    const channel = store.channels.channels?.find(
      (c) => c.id === props.channelId
    );
    return channel?.name ?? "";
  };

  return (
    <div class="flex items-center justify-between border-b border-b-[var(--thread-metaDetailsBorder)] bg-[var(--thread-metaDetailsBackground)] p-8">
      <div class="w-40">
        <Show when={props.channelId}>
          <div
            onClick={() => {
              actions.openChannel({
                channelId: props.channelId,
              });
            }}
            class="w-40 max-w-fit cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-[var(--thread-metaDetailsActionBackground)] px-2 py-1 text-sm hover:bg-[var(--thread-metaDetailsActionHoveredBackground)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="-ml-1 -mt-0.5 inline-block h-4 w-4"
            >
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
            {channelName()}
          </div>
        </Show>
      </div>
      <div>
        <div class="text-2xl font-bold text-[var(--textHeader-foreground)]">
          {props.title}
        </div>
      </div>
      <div class="w-32" />
    </div>
  );
};
