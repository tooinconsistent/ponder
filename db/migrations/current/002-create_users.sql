-- 
-- Users
-- 

create table app_public.users (
  id uuid not null default gen_random_uuid() primary key,
  
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger _100_timestamps
  before insert or update on app_public.users
  for each row
  execute procedure app_internal.tg__timestamps();

-- 
-- Passwords
-- 

create table app_internal.user_passwords (
  id uuid not null default gen_random_uuid() primary key,

  user_id uuid not null references app_public.users on delete cascade,
  password_hash text not null,

  created_at timestamptz not null default now()
);

-- Allow efficient retrieval of all the passwords set by a particular user.
create index idx_user_passwords_user on app_internal.user_passwords (user_id);

-- 
-- Emails
-- 

create table app_public.user_emails (
  id uuid not null default gen_random_uuid() primary key,

  user_id uuid not null references app_public.users on delete cascade,
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
create unique index uniq_user_emails_verified_email on app_public.user_emails(email) where (verified_at is not null);
-- Only one primary email per user.
create unique index uniq_user_emails_primary_email on app_public.user_emails (user_id) where (is_primary is true);

-- Allow efficient retrieval of all the emails owned by a particular user.
create index idx_user_emails_user on app_public.user_emails (user_id);

create trigger _100_timestamps
  before insert or update on app_public.user_emails
  for each row
  execute procedure app_internal.tg__timestamps();

-- 
-- Profiles
-- 

create table app_public.user_profiles (
  id uuid not null default gen_random_uuid() primary key,

  user_id uuid not null references app_public.users on delete cascade,

  display_name text not null,
  full_name text,
  about text,
  avatar_url text check(avatar_url ~ '^https?://[^/]+'),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Allow efficient retrieval of all profiles owned by a particular user.
create index idx_user_profiles_user on app_public.user_profiles (user_id);

create trigger _100_timestamps
  before insert or update on app_public.user_profiles
  for each row
  execute procedure app_internal.tg__timestamps();