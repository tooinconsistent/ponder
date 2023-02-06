/** Types generated for queries found in "../api/domains/auth/queries/auth.sql" */
import { PreparedQuery } from "@/lib/db.ts";

/** 'SelectUserAndHashByEmail' parameters type */
export interface ISelectUserAndHashByEmailParams {
  userEmail: string;
}

/** 'SelectUserAndHashByEmail' return type */
export interface ISelectUserAndHashByEmailResult {
  email: string;
  passwordHash: string;
  userId: bigint;
}

/** 'SelectUserAndHashByEmail' query type */
export interface ISelectUserAndHashByEmailQuery {
  params: ISelectUserAndHashByEmailParams;
  result: ISelectUserAndHashByEmailResult;
}

const selectUserAndHashByEmailIR: any = {
  "usedParamSet": { "userEmail": true },
  "params": [{
    "name": "userEmail",
    "required": true,
    "transform": { "type": "scalar" },
    "locs": [{ "a": 222, "b": 232 }],
  }],
  "statement":
    "select user_emails.user_id,\n  user_emails.email,\n  internal.user_passwords.password_hash \nfrom user_emails\njoin internal.user_passwords \n  on user_emails.user_id = internal.user_passwords.user_id\nwhere user_emails.email = :userEmail! \n  and user_emails.verified_at is not null\norder by internal.user_passwords.created_at desc\n  limit 1",
};

/**
 * Query generated from SQL:
 * ```
 * select user_emails.user_id,
 *   user_emails.email,
 *   internal.user_passwords.password_hash
 * from user_emails
 * join internal.user_passwords
 *   on user_emails.user_id = internal.user_passwords.user_id
 * where user_emails.email = :userEmail!
 *   and user_emails.verified_at is not null
 * order by internal.user_passwords.created_at desc
 *   limit 1
 * ```
 */
export const selectUserAndHashByEmail = new PreparedQuery<
  ISelectUserAndHashByEmailParams,
  ISelectUserAndHashByEmailResult
>(selectUserAndHashByEmailIR);
