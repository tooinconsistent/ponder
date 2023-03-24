/** Types generated for queries found in "src/domains/identity/queries/user.sql" */
import { PreparedQuery } from "@ponder/api/lib/db.ts";

/** 'SelectUserProfile' parameters type */
export interface SelectUserProfileParams {
  userId: string;
}

/** 'SelectUserProfile' return type */
export interface SelectUserProfileResult {
  about: string | null;
  avatarUrl: string | null;
  displayName: string;
  fullName: string | null;
  id: string;
  userId: string;
}

/** 'SelectUserProfile' query type */
export interface SelectUserProfileQuery {
  params: SelectUserProfileParams;
  result: SelectUserProfileResult;
}

const selectUserProfileIR: any = {
  usedParamSet: { userId: true },
  params: [
    {
      name: "userId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 131, b: 138 }],
    },
  ],
  statement:
    "select \n\tid,\n\tuser_id,\n\tdisplay_name,\n\tfull_name,\n\tabout,\n\tavatar_url \nfrom app_public.user_profiles\nwhere user_profiles.user_id = :userId!",
};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	id,
 * 	user_id,
 * 	display_name,
 * 	full_name,
 * 	about,
 * 	avatar_url
 * from app_public.user_profiles
 * where user_profiles.user_id = :userId!
 * ```
 */
export const selectUserProfile = new PreparedQuery<
  SelectUserProfileParams,
  SelectUserProfileResult
>(selectUserProfileIR);
