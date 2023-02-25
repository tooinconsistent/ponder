/* @name selectThreadById */
select
	threads.id,
	threads.title,
	threads.created_at
from app_public.threads
left join app_public.channels on threads.channel_id = channels.id
left join app_public.channel_memberships on channels.id = channel_memberships.channel_id
left join app_public.organisation_memberships on channels.organisation_id = organisation_memberships.organisation_id
where threads.id = :threadId!
	and organisation_memberships.user_id = :userId!
	and (channel_memberships.user_id = :userId! or channels.is_public = true)
group by threads.id;

/* @name unsafelySelectPostsForThread */
select 
	posts.id, 
	posts.content,
	posts.created_at,
	posts.author_id as "authorId",
	user_profiles.avatar_url,
	user_profiles.display_name
from app_public.posts
left join app_public.user_profiles on posts.author_id = user_profiles.user_id
where posts.thread_id = :threadId!
order by posts.created_at;

/* 
	@name unsafelyInsertNewPostForThread 
	@param newPost -> (threadId!, authorId!, content!, contentPlain!)
*/
insert into app_public.posts (thread_id, author_id, content, content_plain)
values :newPost!
returning id, thread_id, author_id, content, content_plain, created_at;