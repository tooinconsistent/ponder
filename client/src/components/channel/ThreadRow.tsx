import { Component } from "solid-js";

import { getFormattedRealtiveTime } from "@tooinconsistent/client/lib/relative_time.js";

import { Avatar } from "@tooinconsistent/client/components/atoms/Avatar.jsx";

interface ThreadRowProps {
  title: string;
  latestPost: {
    createdAt: Date;
    content: string;
    author: {
      avatarUrl: string | null;
      displayName: string;
    };
  };
}

export const ThreadRow: Component<ThreadRowProps> = (props) => {
  return (
    <div class="hover:bg-[var(--channel-threadRowHoverBackground)] cursor-pointer">
      <div class="px-2 py-4 flex items-center sm:px-4">
        <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div class="truncate flex-1">
            <div class="flex text-sm justify-between items-baseline">
              <p class="font-medium text-[var(--textHeader-foreground)] truncate">
                {props.title}
              </p>
              <div class="text-xs text-[var(--textDescription-foreground)] mr-2 sm:mr-0">
                {getFormattedRealtiveTime(
                  (props.latestPost.createdAt.valueOf() - Date.now()) / 1000
                )}
              </div>
            </div>
            <div class="mt-1.5 flex items-center">
              <Avatar
                displayName={props.latestPost.author.displayName}
                avatarUrl={props.latestPost.author.avatarUrl}
                margins="mr-1"
              />
              <div class="flex items-center text-xs text-[var(--base-foreground)]">
                <p class="whitespace-normal line-clamp-2">
                  <span class="font-medium mr-1">
                    {props.latestPost.author.displayName}:
                  </span>
                  {props.latestPost.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
