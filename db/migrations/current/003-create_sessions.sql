create table app_internal.sessions (
  uuid uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references app_public.users on delete cascade,

  created_at timestamptz not null default now(),
  last_active timestamptz not null default now()
);

-- To allow us to efficiently see what sessions are open for a particular user.
create index on app_internal.sessions (user_id);
