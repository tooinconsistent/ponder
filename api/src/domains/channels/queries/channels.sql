/* @name selectChannelInOrg */
select
	channels.id,
	channels.name
from app_public.channels
where channels.organisation_id = :organisationId!;

/* @name selectChannelById */
select
	channels.id,
	channels.name,
	channels.description,
	channels.is_public
from app_public.channels
where channels.id = :channelId!;

/* @name selectThreadsForChannelWithLatestPost */
select 
	threads.id, 
	threads.channel_id, 
	threads.title, 
	latest_post.id as "latestPost_id", 
	latest_post.content_plain as "latestPost_contentPlain", 
	latest_post.created_at as "latestPost_createdAt",
	latest_post.author_id as "latestPost_authorId",
	latest_post.display_name as "latestPost_authorDisplayName",
	latest_post.avatar_url as "latestPost_authorAvatarUrl"
from app_public.threads,
lateral (
	select 
		posts.id, 
		posts.content_plain, 
		posts.created_at,
		posts.author_id,
		user_profiles.display_name,
		user_profiles.avatar_url
	from app_public.posts
	left join app_public.user_profiles on user_profiles.user_id = posts.author_id
	where posts.thread_id = threads.id 
	order by posts.created_at desc 
	limit 1
) as latest_post
where threads.channel_id = :channelId!
order by latest_post.created_at desc;