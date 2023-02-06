import { getUserById as getUserByIdQuery } from "./queries/user.queries.ts";

export interface User {
  id: bigint;

  createdAt: Date;
  updatedAt: Date;
}

export const getUserById = async (userId: bigint): Promise<User | null> => {
  const result = await getUserByIdQuery.run({ userId }, {
    query: async () => {
      return { rows: [] };
    },
  });

  if (result.length === 1) {
    return result[0];
  } else {
    return null;
  }
};
