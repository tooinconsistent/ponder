export const applicationSettings = {
  "channel.compactThreads": {
    defaultValue: false,
    description: "Makes thread rows in the channel compact.",
  },
} satisfies Record<
  string,
  {
    defaultValue: unknown;
    description: string;
  }
>;
