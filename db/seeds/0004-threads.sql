insert into app_public.threads (id, title, channel_id, author_id)
  values ('50000000-0000-4000-0000-000000000001', 'Hello mellow!', '40000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000001' ) 
  on conflict do nothing;

insert into app_public.threads (id, title, channel_id, author_id)
  values ('50000000-0000-4000-0000-000000000002', 'Hello yellow!', '40000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000002' ) 
  on conflict do nothing;

insert into app_public.threads (id, title, channel_id, author_id)
  values ('50000000-0000-4000-0000-000000000003', 'Hello fellow!', '40000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000001' ) 
  on conflict do nothing;

insert into app_public.threads (id, title, channel_id, author_id)
  values ('50000000-0000-4000-0000-000000000004', 'Hello something?', '40000000-0000-4000-0000-000000000002', '00000000-0000-4000-0000-000000000001' ) 
  on conflict do nothing;
