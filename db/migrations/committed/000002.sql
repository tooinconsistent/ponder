--! Previous: sha1:43e82790192553e5e0b655689e5f25603c442641
--! Hash: sha1:0d088bebacd0cf68b7adace301b298b66fab835b

--! split: 1-channels.sql
drop table if exists app_public.posts;
drop table if exists app_public.threads;

drop table if exists app_public.channel_memberships;
drop table if exists app_public.channels;
drop type if exists channel_type;

-- Channels

create type channel_type as enum ('threaded', 'combined');

create table app_public.channels (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  description text,

  is_public boolean not null default true,
  type channel_type not null,
  
  organisation_id uuid not null references app_public.organisations(id) on delete cascade,
  creator_id uuid not null references app_public.users(id) on delete no action,

  archived_at timestamptz,

  created_at timestamptz not null,
  updated_at timestamptz not null,

  constraint channels_name_organisation_id_key unique(name, organisation_id)
);

create index idx_channels_organisation on app_public.channels (organisation_id);

create trigger _100_timestamps
  before insert or update on app_public.channels
  for each row
  execute procedure app_internal.tg__timestamps();

-- Channel Memberships

create table app_public.channel_memberships (
  id uuid primary key default gen_random_uuid(),

  channel_id uuid not null references app_public.channels(id) on delete cascade,
  user_id uuid not null references app_public.users(id) on delete cascade,

  created_at timestamptz not null default now(),

  constraint channel_memberships_channel_id_user_id_key unique(channel_id, user_id)
);

create index idx_channel_memberships_channel on app_public.channel_memberships (channel_id);
create index idx_channel_memberships_user on app_public.channel_memberships (user_id);

--! split: 2-threads.sql
-- Threads

create table app_public.threads(
  id uuid primary key default gen_random_uuid(),

  channel_id uuid not null references app_public.channels(id) on delete cascade,
  
  title text not null,
  author_id uuid not null references app_public.users(id) on delete no action,

  closed_at timestamptz,

  created_at timestamptz not null,
  updated_at timestamptz not null
);

create index idx_threads_channel on app_public.threads(channel_id);
create index idx_threads_author on app_public.threads(author_id);

create trigger _100_timestamps
  before insert or update on app_public.threads
  for each row
  execute procedure app_internal.tg__timestamps();

-- Posts

create table app_public.posts(
  id uuid primary key default gen_random_uuid(),

  thread_id uuid not null references threads(id) on delete cascade,
  author_id uuid not null references users(id) on delete no action,

  content jsonb not null,
  content_plain text not null,

  created_at timestamptz not null,
  updated_at timestamptz not null
);

create index idx_posts_thread on app_public.posts(thread_id);
create index idx_posts_author on app_public.posts(author_id);

create trigger _100_timestamps
  before insert or update on app_public.posts
  for each row
  execute procedure app_internal.tg__timestamps();
