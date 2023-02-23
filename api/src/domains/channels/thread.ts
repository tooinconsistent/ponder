export interface Thread {
  id: string;
  channelId: string;

  title: string;

  closedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}
