/* @name selectThreadById */
select
	threads.id,
	threads.title,
	threads.created_at,
	threads.channel_id
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

/* 
	@name unsafelyInsertNewThreadInChannel 
	@param newThread -> (channelId!, authorId!, title!)
*/
with new_thread as (
	insert into app_public.threads (channel_id, author_id, title)
	values :newThread!
	returning id, channel_id, title
), new_post as (
	insert into app_public.posts (thread_id, author_id, content, content_plain)
	select new_thread.id, :initialPostAuthorId!, :initalPostContent!, :initalPostContentPlain!
	from new_thread
	returning id, thread_id, author_id, content, content_plain, created_at
) 
select 
	new_thread.id as "thread_id",
	new_thread.channel_id,
	new_thread.title,
	new_post.id as "post_id",
	new_post.author_id,
	new_post.content,
	new_post.content_plain,
	new_post.created_at
from new_thread, new_post;
