/* @name unsafelySelectUserProfile */
select 
	id,
	user_id,
	display_name,
	full_name,
	about,
	avatar_url 
from app_public.user_profiles
where user_profiles.user_id = :userId;
