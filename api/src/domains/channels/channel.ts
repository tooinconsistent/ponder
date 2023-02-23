export interface Channel {
  id: string;

  name: string;
  description: string | null;

  isPublic: boolean;
  type: "threaded" | "combined";

  organisationId: string;
  creatorId: string;

  archivedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}
