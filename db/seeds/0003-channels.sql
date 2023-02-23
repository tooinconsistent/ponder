insert into app_public.channels (id, name, description, type, is_public, organisation_id, creator_id)
  values ('40000000-0000-4000-0000-000000000001', 'General', 'Place for general chit-chat.','threaded', true, '30000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000001') 
  on conflict do nothing;

insert into app_public.channels (id, name, description, type, is_public, organisation_id, creator_id)
  values ('40000000-0000-4000-0000-000000000002', 'Engineering', 'Engineers make the things go brrr.','threaded', true, '30000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000002') 
  on conflict do nothing;

insert into app_public.channels (id, name, description, type, is_public, organisation_id, creator_id)
  values ('40000000-0000-4000-0000-000000000003', 'Product', 'Figuring out what to build here.','threaded', false, '30000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000001') 
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000001')
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000002')
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000003')
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000004')
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000002', '00000000-0000-4000-0000-000000000001')
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000002', '00000000-0000-4000-0000-000000000002')
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000002', '00000000-0000-4000-0000-000000000003')
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000003', '00000000-0000-4000-0000-000000000001')
  on conflict do nothing;


insert into app_public.channels (id, name, description, type, is_public, organisation_id, creator_id)
  values ('40000000-0000-4000-0000-000000000004', 'General in #2', 'Hello!.','threaded', true, '30000000-0000-4000-0000-000000000002', '00000000-0000-4000-0000-000000000001') 
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000004', '00000000-0000-4000-0000-000000000001')
  on conflict do nothing;

insert into app_public.channel_memberships (channel_id, user_id)
  values ('40000000-0000-4000-0000-000000000004', '00000000-0000-4000-0000-000000000005')
  on conflict do nothing;
