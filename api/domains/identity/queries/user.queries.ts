/** Types generated for queries found in "../api/domains/identity/queries/user.sql" */
import { PreparedQuery } from "@/lib/db.ts";

/** 'GetUserById' parameters type */
export interface IGetUserByIdParams {
  userId?: bigint | null | void;
}

/** 'GetUserById' return type */
export interface IGetUserByIdResult {
  createdAt: Date;
  id: bigint;
  updatedAt: Date;
}

/** 'GetUserById' query type */
export interface IGetUserByIdQuery {
  params: IGetUserByIdParams;
  result: IGetUserByIdResult;
}

const getUserByIdIR: any = {
  "usedParamSet": { "userId": true },
  "params": [{
    "name": "userId",
    "required": false,
    "transform": { "type": "scalar" },
    "locs": [{ "a": 31, "b": 37 }],
  }],
  "statement": "SELECT * FROM users WHERE id = :userId",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users WHERE id = :userId
 * ```
 */
export const getUserById = new PreparedQuery<
  IGetUserByIdParams,
  IGetUserByIdResult
>(getUserByIdIR);
