/* @name selectThreadById */
select
	threads.id,
	threads.title,
	threads.created_at,
	threads.channel_id
from app_public.threads
where threads.id = :threadId!;

/* @name selectPostsForThread */
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
	@name insertNewPostForThread 
	@param newPost -> (threadId!, authorId!, content!, contentPlain!)
*/
insert into app_public.posts (thread_id, author_id, content, content_plain)
values :newPost!
returning id, thread_id, author_id, content, content_plain, created_at;

/* 
	@name insertNewThreadInChannel 
	@param newThread -> (channelId!, authorId!, title!)
*/
insert into app_public.threads (channel_id, author_id, title)
values :newThread!
returning id, channel_id, title, created_at, author_id, closed_at;