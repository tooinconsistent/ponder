import { Component } from "solid-js";

import { classes } from "@ponder/client/lib/classes";
import { getFormattedRealtiveTime } from "@ponder/client/lib/relative_time.ts";

import { Avatar } from "@ponder/client/atoms/Avatar.jsx";

interface ThreadRowProps {
  selected: boolean;
  onHover?: () => void;
  threadId: string;
  title: string;
  latestPost: {
    createdAt: Date;
    content: string;
    author: {
      avatarUrl: string | null;
      displayName: string;
    };
  };
  ref: any;
}

export const ThreadRow: Component<ThreadRowProps> = (props) => {
  return (
    <div
      class={classes(
        "cursor-pointer hover:bg-white",
        props.selected && "bg-[--channel-threadRowSelectedBackground]"
      )}
      data-id={props.dataId}
    >
      <a href={`/thread/${props.threadId}`}>
        <div class="flex items-center px-2 py-4 sm:px-4">
          <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div class="flex-1 truncate">
              <div class="flex items-baseline justify-between text-sm">
                <p class="truncate font-medium text-[var(--textHeader-foreground)]">
                  {props.title}
                </p>
                <div class="mr-2 text-xs text-[var(--textDescription-foreground)] sm:mr-0">
                  {getFormattedRealtiveTime(
                    (props.latestPost.createdAt.valueOf() - Date.now()) / 1000
                  )}
                </div>
              </div>
              <div class="mt-1.5 flex items-center">
                <Avatar
                  displayName={props.latestPost.author.displayName}
                  avatarUrl={props.latestPost.author.avatarUrl}
                  margins="mr-2"
                />
                <div class="flex items-center text-xs text-[var(--base-foreground)]">
                  <p class="line-clamp-2 whitespace-normal">
                    <span class="mr-1 font-medium">
                      {props.latestPost.author.displayName}:
                    </span>
                    {props.latestPost.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
