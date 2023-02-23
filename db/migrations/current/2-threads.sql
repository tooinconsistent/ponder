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
