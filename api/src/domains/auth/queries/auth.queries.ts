/** Types generated for queries found in "src/domains/auth/queries/auth.sql" */
import { PreparedQuery } from "@ponder/api/lib/db.js";

/** 'SelectUserAndHashByEmail' parameters type */
export interface SelectUserAndHashByEmailParams {
  userEmail: string;
}

/** 'SelectUserAndHashByEmail' return type */
export interface SelectUserAndHashByEmailResult {
  email: string;
  passwordHash: string;
  userId: string;
}

/** 'SelectUserAndHashByEmail' query type */
export interface SelectUserAndHashByEmailQuery {
  params: SelectUserAndHashByEmailParams;
  result: SelectUserAndHashByEmailResult;
}

const selectUserAndHashByEmailIR: any = {
  usedParamSet: { userEmail: true },
  params: [
    {
      name: "userEmail",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 219, b: 229 }],
    },
  ],
  statement:
    "select user_emails.user_id,\n  user_emails.email,\n  user_passwords.password_hash \nfrom app_public.user_emails\njoin app_internal.user_passwords \n  on user_emails.user_id = user_passwords.user_id\nwhere user_emails.email = :userEmail! \n  and user_emails.verified_at is not null\norder by user_passwords.created_at desc\n  limit 1",
};

/**
 * Query generated from SQL:
 * ```
 * select user_emails.user_id,
 *   user_emails.email,
 *   user_passwords.password_hash
 * from app_public.user_emails
 * join app_internal.user_passwords
 *   on user_emails.user_id = user_passwords.user_id
 * where user_emails.email = :userEmail!
 *   and user_emails.verified_at is not null
 * order by user_passwords.created_at desc
 *   limit 1
 * ```
 */
export const selectUserAndHashByEmail = new PreparedQuery<
  SelectUserAndHashByEmailParams,
  SelectUserAndHashByEmailResult
>(selectUserAndHashByEmailIR);
