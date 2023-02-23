export interface Post {
  id: string;
  threadId: string;
  authorId: string;

  content: object;
  contentPlain: string;

  createdAt: Date;
  updatedAt: Date;
}
