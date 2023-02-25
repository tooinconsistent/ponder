import { Component } from "solid-js";
import { Private } from "./icons/Private.jsx";

import { buttonClasses } from "@tooinconsistent/client/components/atoms/button.js";

interface ChannelDetailsProps {
  name: string;
  description: string;
  isPrivate?: boolean;
}

export const ChannelDetails: Component<ChannelDetailsProps> = (props) => {
  return (
    <div class="px-11 py-8  flex justify-between items-end">
      <div>
        <div class="flex flex-row space-x-2 items-center">
          <div class="text-3xl font-bold text-[var(--textHeader-foreground)]">
            {props.name}
          </div>
          {props.isPrivate && <Private />}
        </div>
        <div class="leading-none mt-1">{props.description}</div>
      </div>
      <div class="flex">
        <div>
          <button class={buttonClasses()}>New Thread</button>
        </div>
      </div>
    </div>
  );
};
