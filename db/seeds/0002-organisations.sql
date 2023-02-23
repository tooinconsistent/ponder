insert into app_public.organisations (id, slug) 
  values ('30000000-0000-4000-0000-000000000001', 'testonia') 
  on conflict do nothing;
insert into app_public.organisation_details (organisation_id, name, avatar_url) 
  values ('30000000-0000-4000-0000-000000000001', 'Testonia', 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg')
  on conflict do nothing;

insert into app_public.organisation_memberships (organisation_id, user_id, role)
  values ('30000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000001', 'admin')
  on conflict do nothing;
insert into app_public.organisation_memberships (organisation_id, user_id, role)
  values ('30000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000002', 'admin')
  on conflict do nothing;
insert into app_public.organisation_memberships (organisation_id, user_id, role)
  values ('30000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000003', 'member')
  on conflict do nothing;
insert into app_public.organisation_memberships (organisation_id, user_id, role)
  values ('30000000-0000-4000-0000-000000000001', '00000000-0000-4000-0000-000000000004', 'member')
  on conflict do nothing;

insert into app_public.organisations (id, slug) 
  values ('30000000-0000-4000-0000-000000000002', 'foobaria') 
  on conflict do nothing;
insert into app_public.organisation_details (organisation_id, name, avatar_url) 
  values ('30000000-0000-4000-0000-000000000002', 'Foobaria', null)
  on conflict do nothing;

insert into app_public.organisation_memberships (organisation_id, user_id, role)
  values ('30000000-0000-4000-0000-000000000002', '00000000-0000-4000-0000-000000000001', 'admin')
  on conflict do nothing;
insert into app_public.organisation_memberships (organisation_id, user_id, role)
  values ('30000000-0000-4000-0000-000000000002', '00000000-0000-4000-0000-000000000005', 'admin')
  on conflict do nothing;
