import { Component } from "solid-js";

import { Button } from "@tooinconsistent/client/components/atoms/Button.jsx";

interface ChannelDetailsProps {
  name: string;
  description: string;
}

export const ChannelDetails: Component<ChannelDetailsProps> = (props) => {
  return (
    <div class="px-12 py-8  flex justify-between items-end">
      <div>
        <div class="text-3xl font-bold text-[var(--textHeader-foreground)]">
          {props.name}
        </div>
        <div class="leading-none mt-1">{props.description}</div>
      </div>
      <div class="flex">
        <div>
          <Button>New Thread</Button>
        </div>
      </div>
    </div>
  );
};
