/** Types generated for queries found in "../api/src/domains/channels/queries/threads.sql" */
import { PreparedQuery } from "@tooinconsistent/api/lib/db.js";

export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };

/** 'SelectThreadById' parameters type */
export interface SelectThreadByIdParams {
  threadId: string;
  userId: string;
}

/** 'SelectThreadById' return type */
export interface SelectThreadByIdResult {
  channelId: string;
  createdAt: Date;
  id: string;
  title: string;
}

/** 'SelectThreadById' query type */
export interface SelectThreadByIdQuery {
  params: SelectThreadByIdParams;
  result: SelectThreadByIdResult;
}

const selectThreadByIdIR: any = {
  usedParamSet: { threadId: true, userId: true },
  params: [
    {
      name: "threadId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 392, b: 401 }],
    },
    {
      name: "userId",
      required: true,
      transform: { type: "scalar" },
      locs: [
        { a: 443, b: 450 },
        { a: 488, b: 495 },
      ],
    },
  ],
  statement:
    "select\n\tthreads.id,\n\tthreads.title,\n\tthreads.created_at,\n\tthreads.channel_id\nfrom app_public.threads\nleft join app_public.channels on threads.channel_id = channels.id\nleft join app_public.channel_memberships on channels.id = channel_memberships.channel_id\nleft join app_public.organisation_memberships on channels.organisation_id = organisation_memberships.organisation_id\nwhere threads.id = :threadId!\n\tand organisation_memberships.user_id = :userId!\n\tand (channel_memberships.user_id = :userId! or channels.is_public = true)\ngroup by threads.id",
};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	threads.id,
 * 	threads.title,
 * 	threads.created_at,
 * 	threads.channel_id
 * from app_public.threads
 * left join app_public.channels on threads.channel_id = channels.id
 * left join app_public.channel_memberships on channels.id = channel_memberships.channel_id
 * left join app_public.organisation_memberships on channels.organisation_id = organisation_memberships.organisation_id
 * where threads.id = :threadId!
 * 	and organisation_memberships.user_id = :userId!
 * 	and (channel_memberships.user_id = :userId! or channels.is_public = true)
 * group by threads.id
 * ```
 */
export const selectThreadById = new PreparedQuery<
  SelectThreadByIdParams,
  SelectThreadByIdResult
>(selectThreadByIdIR);

/** 'UnsafelySelectPostsForThread' parameters type */
export interface UnsafelySelectPostsForThreadParams {
  threadId: string;
}

/** 'UnsafelySelectPostsForThread' return type */
export interface UnsafelySelectPostsForThreadResult {
  authorId: string;
  avatarUrl: string | null;
  content: Json;
  createdAt: Date;
  displayName: string;
  id: string;
}

/** 'UnsafelySelectPostsForThread' query type */
export interface UnsafelySelectPostsForThreadQuery {
  params: UnsafelySelectPostsForThreadParams;
  result: UnsafelySelectPostsForThreadResult;
}

const unsafelySelectPostsForThreadIR: any = {
  usedParamSet: { threadId: true },
  params: [
    {
      name: "threadId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 266, b: 275 }],
    },
  ],
  statement:
    'select \n\tposts.id, \n\tposts.content,\n\tposts.created_at,\n\tposts.author_id as "authorId",\n\tuser_profiles.avatar_url,\n\tuser_profiles.display_name\nfrom app_public.posts\nleft join app_public.user_profiles on posts.author_id = user_profiles.user_id\nwhere posts.thread_id = :threadId!\norder by posts.created_at',
};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	posts.id,
 * 	posts.content,
 * 	posts.created_at,
 * 	posts.author_id as "authorId",
 * 	user_profiles.avatar_url,
 * 	user_profiles.display_name
 * from app_public.posts
 * left join app_public.user_profiles on posts.author_id = user_profiles.user_id
 * where posts.thread_id = :threadId!
 * order by posts.created_at
 * ```
 */
export const unsafelySelectPostsForThread = new PreparedQuery<
  UnsafelySelectPostsForThreadParams,
  UnsafelySelectPostsForThreadResult
>(unsafelySelectPostsForThreadIR);

/** 'UnsafelyInsertNewPostForThread' parameters type */
export interface UnsafelyInsertNewPostForThreadParams {
  newPost: {
    threadId: string;
    authorId: string;
    content: Json;
    contentPlain: string;
  };
}

/** 'UnsafelyInsertNewPostForThread' return type */
export interface UnsafelyInsertNewPostForThreadResult {
  authorId: string;
  content: Json;
  contentPlain: string;
  createdAt: Date;
  id: string;
  threadId: string;
}

/** 'UnsafelyInsertNewPostForThread' query type */
export interface UnsafelyInsertNewPostForThreadQuery {
  params: UnsafelyInsertNewPostForThreadParams;
  result: UnsafelyInsertNewPostForThreadResult;
}

const unsafelyInsertNewPostForThreadIR: any = {
  usedParamSet: { newPost: true },
  params: [
    {
      name: "newPost",
      required: true,
      transform: {
        type: "pick_tuple",
        keys: [
          { name: "threadId", required: true },
          { name: "authorId", required: true },
          { name: "content", required: true },
          { name: "contentPlain", required: true },
        ],
      },
      locs: [{ a: 83, b: 91 }],
    },
  ],
  statement:
    "insert into app_public.posts (thread_id, author_id, content, content_plain)\nvalues :newPost!\nreturning id, thread_id, author_id, content, content_plain, created_at",
};

/**
 * Query generated from SQL:
 * ```
 * insert into app_public.posts (thread_id, author_id, content, content_plain)
 * values :newPost!
 * returning id, thread_id, author_id, content, content_plain, created_at
 * ```
 */
export const unsafelyInsertNewPostForThread = new PreparedQuery<
  UnsafelyInsertNewPostForThreadParams,
  UnsafelyInsertNewPostForThreadResult
>(unsafelyInsertNewPostForThreadIR);

/** 'UnsafelyInsertNewThreadInChannel' parameters type */
export interface UnsafelyInsertNewThreadInChannelParams {
  initalPostContent: Json;
  initalPostContentPlain: string;
  initialPostAuthorId: string;
  newThread: {
    channelId: string;
    authorId: string;
    title: string;
  };
}

/** 'UnsafelyInsertNewThreadInChannel' return type */
export interface UnsafelyInsertNewThreadInChannelResult {
  authorId: string;
  channelId: string;
  content: Json;
  contentPlain: string;
  createdAt: Date;
  postId: string;
  threadId: string;
  title: string;
}

/** 'UnsafelyInsertNewThreadInChannel' query type */
export interface UnsafelyInsertNewThreadInChannelQuery {
  params: UnsafelyInsertNewThreadInChannelParams;
  result: UnsafelyInsertNewThreadInChannelResult;
}

const unsafelyInsertNewThreadInChannelIR: any = {
  usedParamSet: {
    newThread: true,
    initialPostAuthorId: true,
    initalPostContent: true,
    initalPostContentPlain: true,
  },
  params: [
    {
      name: "newThread",
      required: true,
      transform: {
        type: "pick_tuple",
        keys: [
          { name: "channelId", required: true },
          { name: "authorId", required: true },
          { name: "title", required: true },
        ],
      },
      locs: [{ a: 92, b: 102 }],
    },
    {
      name: "initialPostAuthorId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 254, b: 274 }],
    },
    {
      name: "initalPostContent",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 277, b: 295 }],
    },
    {
      name: "initalPostContentPlain",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 298, b: 321 }],
    },
  ],
  statement:
    'with new_thread as (\n\tinsert into app_public.threads (channel_id, author_id, title)\n\tvalues :newThread!\n\treturning id, channel_id, title\n), new_post as (\n\tinsert into app_public.posts (thread_id, author_id, content, content_plain)\n\tselect new_thread.id, :initialPostAuthorId!, :initalPostContent!, :initalPostContentPlain!\n\tfrom new_thread\n\treturning id, thread_id, author_id, content, content_plain, created_at\n) \nselect \n\tnew_thread.id as "thread_id",\n\tnew_thread.channel_id,\n\tnew_thread.title,\n\tnew_post.id as "post_id",\n\tnew_post.author_id,\n\tnew_post.content,\n\tnew_post.content_plain,\n\tnew_post.created_at\nfrom new_thread, new_post',
};

/**
 * Query generated from SQL:
 * ```
 * with new_thread as (
 * 	insert into app_public.threads (channel_id, author_id, title)
 * 	values :newThread!
 * 	returning id, channel_id, title
 * ), new_post as (
 * 	insert into app_public.posts (thread_id, author_id, content, content_plain)
 * 	select new_thread.id, :initialPostAuthorId!, :initalPostContent!, :initalPostContentPlain!
 * 	from new_thread
 * 	returning id, thread_id, author_id, content, content_plain, created_at
 * )
 * select
 * 	new_thread.id as "thread_id",
 * 	new_thread.channel_id,
 * 	new_thread.title,
 * 	new_post.id as "post_id",
 * 	new_post.author_id,
 * 	new_post.content,
 * 	new_post.content_plain,
 * 	new_post.created_at
 * from new_thread, new_post
 * ```
 */
export const unsafelyInsertNewThreadInChannel = new PreparedQuery<
  UnsafelyInsertNewThreadInChannelParams,
  UnsafelyInsertNewThreadInChannelResult
>(unsafelyInsertNewThreadInChannelIR);
