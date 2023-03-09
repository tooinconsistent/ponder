/* @name selectOrganisationIdsForUser */
select organisation_id, role
	from app_public.organisation_memberships
	where organisation_memberships.user_id = :userId!;