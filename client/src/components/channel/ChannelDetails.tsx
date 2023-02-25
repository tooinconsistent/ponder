import { Component } from "solid-js";

import { buttonClasses } from "@tooinconsistent/client/components/atoms/button.js";

interface ChannelDetailsProps {
  name: string;
  description: string;
}

export const ChannelDetails: Component<ChannelDetailsProps> = (props) => {
  return (
    <div class="px-11 py-8  flex justify-between items-end">
      <div>
        <div class="text-3xl font-bold text-[var(--textHeader-foreground)]">
          {props.name}
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
