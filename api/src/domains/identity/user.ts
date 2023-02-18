import { getUserById as getUserByIdQuery } from "./queries/user.queries.js";

export interface User {
  id: string;

  createdAt: Date;
  updatedAt: Date;
}

export const getUserById = async (userId: string): Promise<User | null> => {
  const result = await getUserByIdQuery.run(
    { userId },
    {
      query: async () => {
        return { rows: [] };
      },
    }
  );

  if (result.length === 1) {
    return result[0]!;
  } else {
    return null;
  }
};
