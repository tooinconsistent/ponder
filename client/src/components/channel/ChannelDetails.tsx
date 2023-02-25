import { Component } from "solid-js";

import { buttonClasses } from "@tooinconsistent/client/components/atoms/button.js";

import { Private } from "./icons/Private.jsx";

interface ChannelDetailsProps {
  name: string;
  description: string;
  isPrivate?: boolean;
}

export const ChannelDetails: Component<ChannelDetailsProps> = (props) => {
  return (
    <div class="flex items-end  justify-between px-11 py-8">
      <div>
        <div class="flex flex-row items-center space-x-2">
          <div class="text-3xl font-bold text-[var(--textHeader-foreground)]">
            {props.name}
          </div>
          {props.isPrivate && <Private />}
        </div>
        <div class="mt-1 leading-none">{props.description}</div>
      </div>
      <div class="flex">
        <div>
          <button class={buttonClasses()}>New Thread</button>
        </div>
      </div>
    </div>
  );
};
