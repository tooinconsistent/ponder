/** Types generated for queries found in "src/domains/identity/queries/organisations.sql" */
import { PreparedQuery } from "@ponder/api/lib/db.ts";

export type organisation_membership_role = "admin" | "member";

/** 'SelectOrganisationIdsForUser' parameters type */
export interface SelectOrganisationIdsForUserParams {
  userId: string;
}

/** 'SelectOrganisationIdsForUser' return type */
export interface SelectOrganisationIdsForUserResult {
  organisationId: string;
  role: organisation_membership_role;
}

/** 'SelectOrganisationIdsForUser' query type */
export interface SelectOrganisationIdsForUserQuery {
  params: SelectOrganisationIdsForUserParams;
  result: SelectOrganisationIdsForUserResult;
}

const selectOrganisationIdsForUserIR: any = {
  usedParamSet: { userId: true },
  params: [
    {
      name: "userId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 114, b: 121 }],
    },
  ],
  statement:
    "select \n\torganisation_id,\n\trole\nfrom app_public.organisation_memberships\nwhere organisation_memberships.user_id = :userId!",
};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	organisation_id,
 * 	role
 * from app_public.organisation_memberships
 * where organisation_memberships.user_id = :userId!
 * ```
 */
export const selectOrganisationIdsForUser = new PreparedQuery<
  SelectOrganisationIdsForUserParams,
  SelectOrganisationIdsForUserResult
>(selectOrganisationIdsForUserIR);
