--! Previous: -
--! Hash: sha1:49de267e21f0829f0bdd4e73286bb6bdf47bc1fc

--! split: 001-setup.sql
drop schema if exists app_internal cascade;
drop schema if exists app_public cascade;

create schema app_internal;
create schema app_public;

create function app_internal.tg__timestamps() returns trigger as $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then now() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= now() then OLD.updated_at + interval '1 millisecond' else now() end);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
comment on function app_internal.tg__timestamps() is
  E'This trigger should be called on all tables with timestamps, ensures they are always up to date.';

--! split: 002-create_users.sql
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

-- Allow efficient retrieval of the password set by a particular user.
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

--! split: 003-create_sessions.sql
create table app_internal.sessions (
  uuid uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references app_public.users on delete cascade,

  created_at timestamptz not null default now(),
  last_active timestamptz not null default now()
);

-- To allow us to efficiently see what sessions are open for a particular user.
create index on app_internal.sessions (user_id);

--! split: 004-create_organisations.sql
drop type if exists organisation_membership_role;

create table app_public.organisations (
  id uuid primary key default gen_random_uuid(),
  slug citext not null unique,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger _100_timestamps
  before insert or update on app_public.organisations
  for each row
  execute procedure app_internal.tg__timestamps();

create table app_public.organisation_details (
  organisation_id uuid primary key references app_public.organisations on delete cascade,
  
  name text not null,
  description text,
  avatar_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger _100_timestamps
  before insert or update on app_public.organisation_details
  for each row
  execute procedure app_internal.tg__timestamps();

create type organisation_membership_role as enum ('admin', 'member');

create table app_public.organisation_memberships (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references app_public.organisations on delete cascade,
  user_id uuid not null references app_public.users on delete cascade,

  role organisation_membership_role not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (organisation_id, user_id)
);

create index idx_organisation_memberships_user on app_public.organisation_memberships (user_id);
create index idx_organisation_memberships_organisation on app_public.organisation_memberships (organisation_id);

create trigger _100_timestamps
  before insert or update on app_public.organisation_memberships
  for each row
  execute procedure app_internal.tg__timestamps();
