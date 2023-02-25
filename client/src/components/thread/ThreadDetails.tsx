import { Component } from "solid-js";

interface ThreadDetailsProps {
  title: string;
}

export const ThreadDetails: Component<ThreadDetailsProps> = (props) => {
  return (
    <div class="px-11 py-8  flex justify-between items-end">
      <div>
        <div class="text-3xl font-bold text-[var(--textHeader-foreground)]">
          {props.title}
        </div>
        {/* <div class="leading-none mt-1">{props.description}</div> */}
      </div>
    </div>
  );
};
