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
      locs: [{ a: 371, b: 380 }],
    },
    {
      name: "userId",
      required: true,
      transform: { type: "scalar" },
      locs: [
        { a: 422, b: 429 },
        { a: 467, b: 474 },
      ],
    },
  ],
  statement:
    "select\n\tthreads.id,\n\tthreads.title,\n\tthreads.created_at\nfrom app_public.threads\nleft join app_public.channels on threads.channel_id = channels.id\nleft join app_public.channel_memberships on channels.id = channel_memberships.channel_id\nleft join app_public.organisation_memberships on channels.organisation_id = organisation_memberships.organisation_id\nwhere threads.id = :threadId!\n\tand organisation_memberships.user_id = :userId!\n\tand (channel_memberships.user_id = :userId! or channels.is_public = true)\ngroup by threads.id",
};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	threads.id,
 * 	threads.title,
 * 	threads.created_at
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
