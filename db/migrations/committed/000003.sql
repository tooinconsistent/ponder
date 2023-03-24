--! Previous: sha1:0d088bebacd0cf68b7adace301b298b66fab835b
--! Hash: sha1:1c5fb852616b464fb24762b55ee371c02e7e03d9

--! split: 1-helpers.sql
-- drops
drop type if exists channel_membership_type cascade;

-- create channel membeship type enum
alter table app_public.channel_memberships drop column if exists type cascade;
create type channel_membership_type as enum ('member', 'manager');
-- add column to channel memberships table to indicate if user is channel manager
alter table app_public.channel_memberships add column type channel_membership_type not null default 'member';

-- allow ponder_user role to access the relevant schemas
grant usage on schema public, app_public to ponder_user;

-- We want the `visitor` role to be able to insert rows (`serial` data type
-- creates sequences, so we need to grant access to that).
alter default privileges in schema public, app_public
  grant usage, select on sequences to ponder_user;

-- And the `visitor` role should be able to call functions too.
alter default privileges in schema public, app_public
  grant execute on functions to ponder_user;

create or replace function app_internal.current_session_id() returns uuid as $$
  select nullif(pg_catalog.current_setting('jwt.claims.session_id', true), '')::uuid;
$$ language sql stable;

create or replace function app_public.current_user_id() returns uuid as $$
  select user_id from app_internal.sessions where uuid = app_internal.current_session_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;

create or replace function app_public.current_user_organisation_ids() returns setof uuid as $$
  select organisation_id from app_public.organisation_memberships
    where user_id = app_public.current_user_id();
$$ language sql stable security definer set search_path = pg_catalog, public, pg_temp;

create or replace function app_public.current_user_organisation_ids_with_role(i_role organisation_membership_role) returns setof uuid as $$
  select organisation_id from app_public.organisation_memberships
    where user_id = app_public.current_user_id() and organisation_memberships.role = i_role;
$$ language sql stable security definer set search_path = pg_catalog, public, pg_temp;

-- returns channels joined by the user or public channels wihin organisations the user is a member of
create or replace function app_public.current_user_channel_ids() returns setof uuid as $$
  select channels.id from app_public.channels
    left join app_public.channel_memberships on channel_memberships.channel_id = channels.id
    where channel_memberships.user_id = app_public.current_user_id() 
    or (channels.is_public = true and (channels.organisation_id in (select app_public.current_user_organisation_ids())))
    group by channels.id;
$$ language sql stable security definer set search_path = pg_catalog, public, pg_temp;

create or replace function app_public.current_user_joined_channel_ids() returns setof uuid as $$
  select channel_id from app_public.channel_memberships
    where user_id = app_public.current_user_id();
$$ language sql stable security definer set search_path = pg_catalog, public, pg_temp;

create or replace function app_public.current_user_joined_channel_ids_with_type(i_type channel_membership_type) returns setof uuid as $$
  select channel_id from app_public.channel_memberships
    where user_id = app_public.current_user_id() and channel_memberships.type = i_type;
$$ language sql stable security definer set search_path = pg_catalog, public, pg_temp;

--! split: 2-policies.sql
-- INTERNAL TABLES --
alter table app_internal.sessions enable row level security;
alter table app_internal.user_passwords enable row level security; 

-- USERS --
alter table app_public.users enable row level security;
-- users can only see other users that are in the same organisation as the current user
drop policy if exists select_known on app_public.users;
create policy select_known on app_public.users for select using (
  exists (
    select 1 from app_public.organisation_memberships
      where user_id = users.id
      and organisation_id in (select app_public.current_user_organisation_ids())
  )
);
grant select on app_public.users to ponder_user;

alter table app_public.user_profiles enable row level security;
-- users can only see profile of users they can see
drop policy if exists select_known on app_public.user_profiles;
create policy select_known on app_public.user_profiles for select using (
  exists (
    select 1 from app_public.users
      where users.id = user_profiles.user_id
  )
);
-- users can only update their own profile
drop policy if exists update_own on app_public.user_profiles;
create policy update_own on app_public.user_profiles for update using (
  user_id = app_public.current_user_id()
);
grant select on app_public.user_profiles to ponder_user;
grant update (display_name, full_name, about, avatar_url) on app_public.user_profiles to ponder_user;

alter table app_public.user_emails enable row level security;
-- users can only manage their own emails
drop policy if exists select_own on app_public.user_emails;
create policy select_own on app_public.user_emails for select using (
  user_id = app_public.current_user_id()
);
drop policy if exists insert_own on app_public.user_emails;
create policy insert_own on app_public.user_emails for insert with check (
  user_id = app_public.current_user_id()
);
-- note there's no update policy, because we don't allow updating emails, only deleting and adding new ones
drop policy if exists delete_own on app_public.user_emails;
create policy delete_own on app_public.user_emails for delete using (
  user_id = app_public.current_user_id()
);
grant select on app_public.user_emails to ponder_user;
grant insert (email) on app_public.user_emails to ponder_user;
grant delete on app_public.user_emails to ponder_user;


-- ORGANISATIONS --
alter table app_public.organisations enable row level security;
-- users can only see organisations that they are a member of
drop policy if exists select_member on app_public.organisations;
create policy select_member on app_public.organisations for select using (
  id in (select app_public.current_user_organisation_ids())
);
grant select on app_public.organisations to ponder_user;

alter table app_public.organisation_details enable row level security;
-- users can only see details of organisations that they are a member of
drop policy if exists select_member on app_public.organisation_details;
create policy select_member on app_public.organisation_details for select using (
  organisation_id in (select app_public.current_user_organisation_ids())
);
drop policy if exists update_admin on app_public.organisation_details;
create policy update_admin on app_public.organisation_details for update using (
  organisation_id in (select app_public.current_user_organisation_ids_with_role('admin'))
);
grant select on app_public.organisation_details to ponder_user;
grant update (name, description, avatar_url) on app_public.organisation_details to ponder_user;

alter table app_public.organisation_memberships enable row level security;
-- users can only see memberships of organisations that they are a member of
drop policy if exists select_member on app_public.organisation_memberships;
create policy select_member on app_public.organisation_memberships for select using (
  organisation_id in (select app_public.current_user_organisation_ids())
);
grant select on app_public.organisation_memberships to ponder_user;


-- CHANNELS --
alter table app_public.channels enable row level security;
-- users can only see public channels in the organisations they are member of
-- or private channels they are a member of
drop policy if exists select_public_or_member on app_public.channels;
create policy select_public_or_member on app_public.channels for select using (
  id in (select app_public.current_user_channel_ids())
);
-- allow users to create channel in the organisations they are member of,
--   and ensure they are the creator
drop policy if exists insert_member on app_public.channels;
create policy insert_member on app_public.channels for insert with check (
  organisation_id in (select app_public.current_user_organisation_ids())
  and creator_id = app_public.current_user_id()
);
-- allow admins or channel managers to update channels
drop policy if exists update_admin on app_public.channels;
create policy update_admin on app_public.channels for update using (
  organisation_id in (select app_public.current_user_organisation_ids_with_role('admin'))
);
drop policy if exists update_manager on app_public.channels;
create policy update_manager on app_public.channels for update using (
  id in (select app_public.current_user_joined_channel_ids_with_type('manager'))
);

-- allow admins or channel managers to delete channels
drop policy if exists delete_admin on app_public.channels;
create policy delete_admin on app_public.channels for delete using (
  organisation_id in (select app_public.current_user_organisation_ids_with_role('admin'))
);
drop policy if exists delete_manager on app_public.channels;
create policy delete_manager on app_public.channels for delete using (
  id in (select app_public.current_user_joined_channel_ids_with_type('manager'))
);
grant select on app_public.channels to ponder_user;
grant insert (name, description, type, organisation_id, is_public, creator_id) on app_public.channels to ponder_user;
grant update (name, description, type, is_public, archived_at) on app_public.channels to ponder_user;
grant delete on app_public.channels to ponder_user;

alter table app_public.channel_memberships enable row level security;
-- users can only see memberships of public channels they can see
drop policy if exists select_public_or_member on app_public.channel_memberships;
create policy select_public_or_member on app_public.channel_memberships for select using (
  channel_id in (select app_public.current_user_channel_ids())
);
-- users can join public channels within the organisations they are member of
drop policy if exists insert_public on app_public.channel_memberships;
create policy insert_public on app_public.channel_memberships for insert with check (
  channel_id in (select app_public.current_user_channel_ids())
  and user_id = app_public.current_user_id()
  and type = 'member'
);
-- members can invite other users to join channels
drop policy if exists insert_member on app_public.channel_memberships;
create policy insert_member on app_public.channel_memberships for insert with check (
  channel_id in (select app_public.current_user_joined_channel_ids())
  and type = 'member'
);
-- managers can invite other users to join channels as managers
drop policy if exists insert_manager on app_public.channel_memberships;
create policy insert_manager on app_public.channel_memberships for insert with check (
  channel_id in (select app_public.current_user_joined_channel_ids_with_type('manager'))
);
-- admins can invite other users to join channels as managers
drop policy if exists insert_admin on app_public.channel_memberships;
create policy insert_admin on app_public.channel_memberships for insert with check (
  exists (
    select 1 from app_public.organisation_memberships
      where organisation_id = (select organisation_id from app_public.channels where id = channel_id)
      and organisation_id in (select app_public.current_user_organisation_ids_with_role('admin'))
  )
);
-- channel managers can update membership type
drop policy if exists update_manager on app_public.channel_memberships;
create policy update_manager on app_public.channel_memberships for update using (
  channel_id in (select app_public.current_user_joined_channel_ids_with_type('manager'))
);
-- admins can update membership type
drop policy if exists update_admin on app_public.channel_memberships;
create policy update_admin on app_public.channel_memberships for update using (
  exists (
    select 1 from app_public.organisation_memberships
      where organisation_id = (select organisation_id from app_public.channels where id = channel_id)
      and organisation_id in (select app_public.current_user_organisation_ids_with_role('admin'))
  )
);
-- allow users to leave channels they are a member of
drop policy if exists delete_member on app_public.channel_memberships;
create policy delete_member on app_public.channel_memberships for delete using (
  user_id = app_public.current_user_id()
);
-- allow channel managers to remove users from channels
drop policy if exists delete_manager on app_public.channel_memberships;
create policy delete_manager on app_public.channel_memberships for delete using (
  channel_id in (select app_public.current_user_joined_channel_ids_with_type('manager'))
);
-- allow admins to remove users from channels
drop policy if exists delete_admin on app_public.channel_memberships;
create policy delete_admin on app_public.channel_memberships for delete using (
  exists (
    select 1 from app_public.organisation_memberships
      where organisation_id = (select organisation_id from app_public.channels where id = channel_id)
      and organisation_id in (select app_public.current_user_organisation_ids_with_role('admin'))
  )
);

grant select on app_public.channel_memberships to ponder_user;
grant update (type) on app_public.channel_memberships to ponder_user;
grant insert (channel_id, user_id, type) on app_public.channel_memberships to ponder_user;
grant delete on app_public.channel_memberships to ponder_user;

-- Add trigger after insert to channel,to insert memebership for creator
create or replace function app_public.tg_channels__insert_with_membership() returns trigger as $$
begin
  insert into app_public.channel_memberships(channel_id, user_id, type) values(NEW.id, NEW.creator_id, 'manager');
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
drop trigger if exists _500_insert_membership on app_public.channels;
create trigger _500_insert_membership
  after insert on app_public.channels
  for each row
  execute procedure app_public.tg_channels__insert_with_membership();



-- threads --
alter table app_public.threads enable row level security;
-- users can only see threads of channels they can see
drop policy if exists select_public_or_member on app_public.threads;
create policy select_public_or_member on app_public.threads for select using (
  channel_id in (select app_public.current_user_channel_ids())
);
-- users can create their own threads in channels they can see
drop policy if exists insert_public_or_member on app_public.threads;
create policy insert_public_or_member on app_public.threads for insert with check (
  channel_id in (select app_public.current_user_channel_ids())
  and author_id = app_public.current_user_id()
);
-- users can update threads in channels they can see
drop policy if exists update_public_or_member on app_public.threads;
create policy update_public_or_member on app_public.threads for update using (
  channel_id in (select app_public.current_user_channel_ids())
);
-- users can delete their own threads
drop policy if exists delete_own on app_public.threads;
create policy delete_own on app_public.threads for delete using (
  author_id = app_public.current_user_id()
);
-- channel managers can delete threads
drop policy if exists delete_manager on app_public.threads;
create policy delete_manager on app_public.threads for delete using (
  channel_id in (select app_public.current_user_joined_channel_ids_with_type('manager'))
);
-- admins can delete threads
drop policy if exists delete_admin on app_public.threads;
create policy delete_admin on app_public.threads for delete using (
  exists (
    select 1 from app_public.organisation_memberships
      where organisation_id = (select organisation_id from app_public.channels where id = channel_id)
      and organisation_id in (select app_public.current_user_organisation_ids_with_role('admin'))
  )
);

-- grants
grant select on app_public.threads to ponder_user;
grant insert (channel_id, title, author_id) on app_public.threads to ponder_user;
grant update (title, closed_at) on app_public.threads to ponder_user;
grant delete on app_public.threads to ponder_user;


-- posts --
alter table app_public.posts enable row level security;
-- users can only see posts of in threads in channels they can see
drop policy if exists select_public_or_member on app_public.posts;
create policy select_public_or_member on app_public.posts for select using (
  thread_id in (select id from app_public.threads where channel_id in (select app_public.current_user_channel_ids()))
);
-- users can create their own posts in threads in channels they can see
drop policy if exists insert_public_or_member on app_public.posts;
create policy insert_public_or_member on app_public.posts for insert with check (
  thread_id in (select id from app_public.threads where channel_id in (select app_public.current_user_channel_ids()))
  and author_id = app_public.current_user_id()
);
-- users can update their own posts
drop policy if exists update_own on app_public.posts;
create policy update_own on app_public.posts for update using (
  author_id = app_public.current_user_id()
);
-- channel managers can update posts
drop policy if exists update_manager on app_public.posts;
create policy update_manager on app_public.posts for update using (
  thread_id in (select id from app_public.threads where channel_id in (select app_public.current_user_joined_channel_ids_with_type('manager')))
);
-- admins can update posts
drop policy if exists update_admin on app_public.posts;
create policy update_admin on app_public.posts for update using (
  exists (
    select 1 from app_public.organisation_memberships
      where organisation_id = (select organisation_id from app_public.channels where id = (select channel_id from app_public.threads where id = thread_id))
      and organisation_id in (select app_public.current_user_organisation_ids_with_role('admin'))
  )
);
-- users can delete their own posts
drop policy if exists delete_own on app_public.posts;
create policy delete_own on app_public.posts for delete using (
  author_id = app_public.current_user_id()
);
-- channel managers can delete posts
drop policy if exists delete_manager on app_public.posts;
create policy delete_manager on app_public.posts for delete using (
  thread_id in (select id from app_public.threads where channel_id in (select app_public.current_user_joined_channel_ids_with_type('manager')))
);
-- admins can delete posts
drop policy if exists delete_admin on app_public.posts;
create policy delete_admin on app_public.posts for delete using (
  exists (
    select 1 from app_public.organisation_memberships
      where organisation_id = (select organisation_id from app_public.channels where id = (select channel_id from app_public.threads where id = thread_id))
      and organisation_id in (select app_public.current_user_organisation_ids_with_role('admin'))
  )
);

-- grants
grant select on app_public.posts to ponder_user;
grant insert (thread_id, author_id, content, content_plain) on app_public.posts to ponder_user;
grant update (content, content_plain) on app_public.posts to ponder_user;
grant delete on app_public.posts to ponder_user;
