/** Types generated for queries found in "../api/src/domains/identity/queries/user.sql" */
import { PreparedQuery } from "@tooinconsistent/api/lib/db.js";

/** 'GetUserById' parameters type */
export interface GetUserByIdParams {
  userId?: string | null | void;
}

/** 'GetUserById' return type */
export interface GetUserByIdResult {
  createdAt: Date;
  id: string;
  updatedAt: Date;
}

/** 'GetUserById' query type */
export interface GetUserByIdQuery {
  params: GetUserByIdParams;
  result: GetUserByIdResult;
}

const getUserByIdIR: any = {
  usedParamSet: { userId: true },
  params: [
    {
      name: "userId",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 42, b: 48 }],
    },
  ],
  statement: "SELECT * FROM app_public.users WHERE id = :userId",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM app_public.users WHERE id = :userId
 * ```
 */
export const getUserById = new PreparedQuery<
  GetUserByIdParams,
  GetUserByIdResult
>(getUserByIdIR);
