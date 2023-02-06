/** Types generated for queries found in "../api/domains/auth/queries/session.sql" */
import { PreparedQuery } from "@/lib/db.ts";

/** 'SelectSessionById' parameters type */
export interface ISelectSessionByIdParams {
  sessionId: string;
}

/** 'SelectSessionById' return type */
export interface ISelectSessionByIdResult {
  createdAt: Date;
  lastActive: Date;
  userId: bigint;
  uuid: string;
}

/** 'SelectSessionById' query type */
export interface ISelectSessionByIdQuery {
  params: ISelectSessionByIdParams;
  result: ISelectSessionByIdResult;
}

const selectSessionByIdIR: any = {
  "usedParamSet": { "sessionId": true },
  "params": [{
    "name": "sessionId",
    "required": true,
    "transform": { "type": "scalar" },
    "locs": [{ "a": 46, "b": 56 }],
  }],
  "statement": "select *\nfrom internal.sessions \nwhere uuid = :sessionId!",
};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from internal.sessions
 * where uuid = :sessionId!
 * ```
 */
export const selectSessionById = new PreparedQuery<
  ISelectSessionByIdParams,
  ISelectSessionByIdResult
>(selectSessionByIdIR);

/** 'InsertSessionForUser' parameters type */
export interface IInsertSessionForUserParams {
  userId: bigint;
}

/** 'InsertSessionForUser' return type */
export interface IInsertSessionForUserResult {
  sessionId: string;
}

/** 'InsertSessionForUser' query type */
export interface IInsertSessionForUserQuery {
  params: IInsertSessionForUserParams;
  result: IInsertSessionForUserResult;
}

const insertSessionForUserIR: any = {
  "usedParamSet": { "userId": true },
  "params": [{
    "name": "userId",
    "required": true,
    "transform": { "type": "scalar" },
    "locs": [{ "a": 49, "b": 56 }],
  }],
  "statement":
    "insert into internal.sessions (user_id) \nvalues (:userId!) \nreturning uuid as session_id",
};

/**
 * Query generated from SQL:
 * ```
 * insert into internal.sessions (user_id)
 * values (:userId!)
 * returning uuid as session_id
 * ```
 */
export const insertSessionForUser = new PreparedQuery<
  IInsertSessionForUserParams,
  IInsertSessionForUserResult
>(insertSessionForUserIR);
