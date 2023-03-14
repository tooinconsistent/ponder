/** Types generated for queries found in "src/domains/identity/queries/user.sql" */
import { PreparedQuery } from "@tooinconsistent/api/lib/db.js";

/** 'UnsafelySelectUserProfile' parameters type */
export interface UnsafelySelectUserProfileParams {
  userId: string;
}

/** 'UnsafelySelectUserProfile' return type */
export interface UnsafelySelectUserProfileResult {
  about: string | null;
  avatarUrl: string | null;
  displayName: string;
  fullName: string | null;
  id: string;
  userId: string;
}

/** 'UnsafelySelectUserProfile' query type */
export interface UnsafelySelectUserProfileQuery {
  params: UnsafelySelectUserProfileParams;
  result: UnsafelySelectUserProfileResult;
}

const unsafelySelectUserProfileIR: any = {
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
export const unsafelySelectUserProfile = new PreparedQuery<
  UnsafelySelectUserProfileParams,
  UnsafelySelectUserProfileResult
>(unsafelySelectUserProfileIR);
