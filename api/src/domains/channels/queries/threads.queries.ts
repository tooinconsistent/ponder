/** Types generated for queries found in "src/domains/channels/queries/threads.sql" */
import { PreparedQuery } from "@ponder/api/lib/db.ts";

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
  usedParamSet: { threadId: true },
  params: [
    {
      name: "threadId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 120, b: 129 }],
    },
  ],
  statement:
    "select\n\tthreads.id,\n\tthreads.title,\n\tthreads.created_at,\n\tthreads.channel_id\nfrom app_public.threads\nwhere threads.id = :threadId!",
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
 * where threads.id = :threadId!
 * ```
 */
export const selectThreadById = new PreparedQuery<
  SelectThreadByIdParams,
  SelectThreadByIdResult
>(selectThreadByIdIR);

/** 'SelectPostsForThread' parameters type */
export interface SelectPostsForThreadParams {
  threadId: string;
}

/** 'SelectPostsForThread' return type */
export interface SelectPostsForThreadResult {
  authorId: string;
  avatarUrl: string | null;
  content: Json;
  createdAt: Date;
  displayName: string;
  id: string;
}

/** 'SelectPostsForThread' query type */
export interface SelectPostsForThreadQuery {
  params: SelectPostsForThreadParams;
  result: SelectPostsForThreadResult;
}

const selectPostsForThreadIR: any = {
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
export const selectPostsForThread = new PreparedQuery<
  SelectPostsForThreadParams,
  SelectPostsForThreadResult
>(selectPostsForThreadIR);

/** 'InsertNewPostForThread' parameters type */
export interface InsertNewPostForThreadParams {
  newPost: {
    threadId: string;
    authorId: string;
    content: Json;
    contentPlain: string;
  };
}

/** 'InsertNewPostForThread' return type */
export interface InsertNewPostForThreadResult {
  authorId: string;
  content: Json;
  contentPlain: string;
  createdAt: Date;
  id: string;
  threadId: string;
}

/** 'InsertNewPostForThread' query type */
export interface InsertNewPostForThreadQuery {
  params: InsertNewPostForThreadParams;
  result: InsertNewPostForThreadResult;
}

const insertNewPostForThreadIR: any = {
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
export const insertNewPostForThread = new PreparedQuery<
  InsertNewPostForThreadParams,
  InsertNewPostForThreadResult
>(insertNewPostForThreadIR);

/** 'InsertNewThreadInChannel' parameters type */
export interface InsertNewThreadInChannelParams {
  newThread: {
    channelId: string;
    authorId: string;
    title: string;
  };
}

/** 'InsertNewThreadInChannel' return type */
export interface InsertNewThreadInChannelResult {
  authorId: string;
  channelId: string;
  closedAt: Date | null;
  createdAt: Date;
  id: string;
  title: string;
}

/** 'InsertNewThreadInChannel' query type */
export interface InsertNewThreadInChannelQuery {
  params: InsertNewThreadInChannelParams;
  result: InsertNewThreadInChannelResult;
}

const insertNewThreadInChannelIR: any = {
  usedParamSet: { newThread: true },
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
      locs: [{ a: 69, b: 79 }],
    },
  ],
  statement:
    "insert into app_public.threads (channel_id, author_id, title)\nvalues :newThread!\nreturning id, channel_id, title, created_at, author_id, closed_at",
};

/**
 * Query generated from SQL:
 * ```
 * insert into app_public.threads (channel_id, author_id, title)
 * values :newThread!
 * returning id, channel_id, title, created_at, author_id, closed_at
 * ```
 */
export const insertNewThreadInChannel = new PreparedQuery<
  InsertNewThreadInChannelParams,
  InsertNewThreadInChannelResult
>(insertNewThreadInChannelIR);
