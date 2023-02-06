-- 
-- Users
-- 

create table public.users (
  id bigint generated always as identity primary key,
  
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger _100_timestamps
  before insert or update on public.users
  for each row
  execute procedure internal.tg__timestamps();

-- 
-- Passwords
-- 

create table internal.user_passwords (
  id bigint generated always as identity primary key,
  user_id bigint not null references public.users on delete cascade,
  password_hash not null text,

  created_at timestamptz not null default now()
);

-- Allow efficient retrieval of all the passwords set by a particular user.
create index idx_user_passwords_user on internal.user_passwords (user_id);

-- 
-- Emails
-- 

create table public.user_emails (
  id bigint generated always as identity primary key,
  user_id bigint not null references public.users on delete cascade,
  email citext not null check (email ~ '[^@]+@[^@]+\.[^@]+'),
  is_primary boolean not null default false,
  verified_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Each user can only have an email once.
  constraint user_emails_user_id_email_key unique(user_id, email),
  -- An unverified email cannot be set as the primary email.
  constraint user_emails_must_be_verified_to_be_primary check(is_primary is false or verified_at is not null)
);

-- Once an email is verified, it may only be used by one user. (We can't
-- enforce this before an email is verified otherwise it could be used to
-- prevent a legitimate user from signing up.)
create unique index uniq_user_emails_verified_email on public.user_emails(email) where (verified_at is not null);
-- Only one primary email per user.
create unique index uniq_user_emails_primary_email on public.user_emails (user_id) where (is_primary is true);

-- Allow efficient retrieval of all the emails owned by a particular user.
create index idx_user_emails_user on public.user_emails (user_id);

create trigger _100_timestamps
  before insert or update on public.user_emails
  for each row
  execute procedure internal.tg__timestamps();

-- 
-- Profiles
-- 

create table public.user_profiles (
  user_id bigint not null primary key references public.users on delete cascade,

  display_name text not null,
  full_name text,
  about text,
  avatar_url text check(avatar_url ~ '^https?://[^/]+'),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger _100_timestamps
  before insert or update on public.user_profiles
  for each row
  execute procedure internal.tg__timestamps();