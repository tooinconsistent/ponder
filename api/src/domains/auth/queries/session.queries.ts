/** Types generated for queries found in "../api/src/domains/auth/queries/session.sql" */
import { PreparedQuery } from "@tooinconsistent/api/lib/db.js";

/** 'SelectSessionById' parameters type */
export interface SelectSessionByIdParams {
  sessionId: string;
}

/** 'SelectSessionById' return type */
export interface SelectSessionByIdResult {
  createdAt: Date;
  lastActive: Date;
  userId: string;
  uuid: string;
}

/** 'SelectSessionById' query type */
export interface SelectSessionByIdQuery {
  params: SelectSessionByIdParams;
  result: SelectSessionByIdResult;
}

const selectSessionByIdIR: any = {
  usedParamSet: { sessionId: true },
  params: [
    {
      name: "sessionId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 50, b: 60 }],
    },
  ],
  statement: "select *\nfrom app_internal.sessions \nwhere uuid = :sessionId!",
};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from app_internal.sessions
 * where uuid = :sessionId!
 * ```
 */
export const selectSessionById = new PreparedQuery<
  SelectSessionByIdParams,
  SelectSessionByIdResult
>(selectSessionByIdIR);

/** 'InsertSessionForUser' parameters type */
export interface InsertSessionForUserParams {
  userId: string;
}

/** 'InsertSessionForUser' return type */
export interface InsertSessionForUserResult {
  sessionId: string;
}

/** 'InsertSessionForUser' query type */
export interface InsertSessionForUserQuery {
  params: InsertSessionForUserParams;
  result: InsertSessionForUserResult;
}

const insertSessionForUserIR: any = {
  usedParamSet: { userId: true },
  params: [
    {
      name: "userId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 53, b: 60 }],
    },
  ],
  statement:
    "insert into app_internal.sessions (user_id) \nvalues (:userId!) \nreturning uuid as session_id",
};

/**
 * Query generated from SQL:
 * ```
 * insert into app_internal.sessions (user_id)
 * values (:userId!)
 * returning uuid as session_id
 * ```
 */
export const insertSessionForUser = new PreparedQuery<
  InsertSessionForUserParams,
  InsertSessionForUserResult
>(insertSessionForUserIR);
