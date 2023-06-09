/** Types generated for queries found in "src/domains/channels/queries/channels.sql" */
import { PreparedQuery } from "@ponder/api/lib/db.ts";

/** 'SelectAllChannelslInOrg' parameters type */
export interface SelectAllChannelslInOrgParams {
  organisationId: string;
}

/** 'SelectAllChannelslInOrg' return type */
export interface SelectAllChannelslInOrgResult {
  id: string;
  name: string;
}

/** 'SelectAllChannelslInOrg' query type */
export interface SelectAllChannelslInOrgQuery {
  params: SelectAllChannelslInOrgParams;
  result: SelectAllChannelslInOrgResult;
}

const selectAllChannelslInOrgIR: any = {
  usedParamSet: { organisationId: true },
  params: [
    {
      name: "organisationId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 94, b: 109 }],
    },
  ],
  statement:
    "select\n\tchannels.id,\n\tchannels.name\nfrom app_public.channels\nwhere channels.organisation_id = :organisationId!",
};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	channels.id,
 * 	channels.name
 * from app_public.channels
 * where channels.organisation_id = :organisationId!
 * ```
 */
export const selectAllChannelslInOrg = new PreparedQuery<
  SelectAllChannelslInOrgParams,
  SelectAllChannelslInOrgResult
>(selectAllChannelslInOrgIR);

/** 'SelectAllChannelsJoinedByUser' parameters type */
export interface SelectAllChannelsJoinedByUserParams {
  organisationId: string;
  userId: string;
}

/** 'SelectAllChannelsJoinedByUser' return type */
export interface SelectAllChannelsJoinedByUserResult {
  id: string;
  name: string;
}

/** 'SelectAllChannelsJoinedByUser' query type */
export interface SelectAllChannelsJoinedByUserQuery {
  params: SelectAllChannelsJoinedByUserParams;
  result: SelectAllChannelsJoinedByUserResult;
}

const selectAllChannelsJoinedByUserIR: any = {
  usedParamSet: { organisationId: true, userId: true },
  params: [
    {
      name: "organisationId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 183, b: 198 }],
    },
    {
      name: "userId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 234, b: 241 }],
    },
  ],
  statement:
    "select\n\tchannels.id,\n\tchannels.name\nfrom app_public.channels\nleft join app_public.channel_memberships on channel_memberships.channel_id = channels.id\nwhere channels.organisation_id = :organisationId! and channel_memberships.user_id = :userId!",
};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	channels.id,
 * 	channels.name
 * from app_public.channels
 * left join app_public.channel_memberships on channel_memberships.channel_id = channels.id
 * where channels.organisation_id = :organisationId! and channel_memberships.user_id = :userId!
 * ```
 */
export const selectAllChannelsJoinedByUser = new PreparedQuery<
  SelectAllChannelsJoinedByUserParams,
  SelectAllChannelsJoinedByUserResult
>(selectAllChannelsJoinedByUserIR);

/** 'SelectChannelById' parameters type */
export interface SelectChannelByIdParams {
  channelId: string;
}

/** 'SelectChannelById' return type */
export interface SelectChannelByIdResult {
  description: string | null;
  id: string;
  isPublic: boolean;
  name: string;
}

/** 'SelectChannelById' query type */
export interface SelectChannelByIdQuery {
  params: SelectChannelByIdParams;
  result: SelectChannelByIdResult;
}

const selectChannelByIdIR: any = {
  usedParamSet: { channelId: true },
  params: [
    {
      name: "channelId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 125, b: 135 }],
    },
  ],
  statement:
    "select\n\tchannels.id,\n\tchannels.name,\n\tchannels.description,\n\tchannels.is_public\nfrom app_public.channels\nwhere channels.id = :channelId!",
};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	channels.id,
 * 	channels.name,
 * 	channels.description,
 * 	channels.is_public
 * from app_public.channels
 * where channels.id = :channelId!
 * ```
 */
export const selectChannelById = new PreparedQuery<
  SelectChannelByIdParams,
  SelectChannelByIdResult
>(selectChannelByIdIR);

/** 'SelectThreadsForChannelWithLatestPost' parameters type */
export interface SelectThreadsForChannelWithLatestPostParams {
  channelId: string;
}

/** 'SelectThreadsForChannelWithLatestPost' return type */
export interface SelectThreadsForChannelWithLatestPostResult {
  channelId: string;
  id: string;
  latestPostAuthorAvatarUrl: string | null;
  latestPostAuthorDisplayName: string;
  latestPostAuthorId: string;
  latestPostContentPlain: string;
  latestPostCreatedAt: Date;
  latestPostId: string;
  title: string;
}

/** 'SelectThreadsForChannelWithLatestPost' query type */
export interface SelectThreadsForChannelWithLatestPostQuery {
  params: SelectThreadsForChannelWithLatestPostParams;
  result: SelectThreadsForChannelWithLatestPostResult;
}

const selectThreadsForChannelWithLatestPostIR: any = {
  usedParamSet: { channelId: true },
  params: [
    {
      name: "channelId",
      required: true,
      transform: { type: "scalar" },
      locs: [{ a: 775, b: 785 }],
    },
  ],
  statement:
    'select \n\tthreads.id, \n\tthreads.channel_id, \n\tthreads.title, \n\tlatest_post.id as "latestPost_id", \n\tlatest_post.content_plain as "latestPost_contentPlain", \n\tlatest_post.created_at as "latestPost_createdAt",\n\tlatest_post.author_id as "latestPost_authorId",\n\tlatest_post.display_name as "latestPost_authorDisplayName",\n\tlatest_post.avatar_url as "latestPost_authorAvatarUrl"\nfrom app_public.threads,\nlateral (\n\tselect \n\t\tposts.id, \n\t\tposts.content_plain, \n\t\tposts.created_at,\n\t\tposts.author_id,\n\t\tuser_profiles.display_name,\n\t\tuser_profiles.avatar_url\n\tfrom app_public.posts\n\tleft join app_public.user_profiles on user_profiles.user_id = posts.author_id\n\twhere posts.thread_id = threads.id \n\torder by posts.created_at desc \n\tlimit 1\n) as latest_post\nwhere threads.channel_id = :channelId!\norder by latest_post.created_at desc',
};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	threads.id,
 * 	threads.channel_id,
 * 	threads.title,
 * 	latest_post.id as "latestPost_id",
 * 	latest_post.content_plain as "latestPost_contentPlain",
 * 	latest_post.created_at as "latestPost_createdAt",
 * 	latest_post.author_id as "latestPost_authorId",
 * 	latest_post.display_name as "latestPost_authorDisplayName",
 * 	latest_post.avatar_url as "latestPost_authorAvatarUrl"
 * from app_public.threads,
 * lateral (
 * 	select
 * 		posts.id,
 * 		posts.content_plain,
 * 		posts.created_at,
 * 		posts.author_id,
 * 		user_profiles.display_name,
 * 		user_profiles.avatar_url
 * 	from app_public.posts
 * 	left join app_public.user_profiles on user_profiles.user_id = posts.author_id
 * 	where posts.thread_id = threads.id
 * 	order by posts.created_at desc
 * 	limit 1
 * ) as latest_post
 * where threads.channel_id = :channelId!
 * order by latest_post.created_at desc
 * ```
 */
export const selectThreadsForChannelWithLatestPost = new PreparedQuery<
  SelectThreadsForChannelWithLatestPostParams,
  SelectThreadsForChannelWithLatestPostResult
>(selectThreadsForChannelWithLatestPostIR);
