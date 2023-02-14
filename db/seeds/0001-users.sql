insert into app_public.users (id) 
  values ('00000000-0000-0000-0000-000000000001') 
  on conflict do nothing;
insert into app_public.user_emails (id, user_id, email, is_primary, verified_at) 
  values ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'foo@example.com', true, now())
  on conflict do nothing;
insert into app_public.user_profiles (id, user_id, display_name, full_name, avatar_url, about)
  values ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'foo', 'Foo Bartonie', 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Violin_VL100.png', 'Just foo-ing around.')
  on conflict do nothing;
insert into app_internal.user_passwords (id, user_id, password_hash)
  values ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '$argon2id$v=19$m=65536,t=8,p=2$gjO1rb4Peow1rDFGOtK6Dw$Xxw306pabrtM8KusZDLPzHDNQ7e7tLNVc58j9Lfw1KU')
  on conflict do nothing;

insert into app_public.users (id) 
  values ('00000000-0000-0000-0000-000000000002') 
  on conflict do nothing;
insert into app_public.user_emails (id, user_id, email, is_primary, verified_at) 
  values ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'ada@example.com', true, now())
  on conflict do nothing;
insert into app_public.user_profiles (id, user_id, display_name, full_name, avatar_url, about)
  values ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'ada', 'Ada', 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Miniature_of_Ada_Byron.jpg', 'Trying this programming thing.')
  on conflict do nothing;
insert into app_internal.user_passwords (id, user_id, password_hash)
  values ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '$argon2id$v=19$m=65536,t=8,p=2$fqJEE92XSGPcYNRDYxmsBw$7ShYhYwN9U2jGSCfcdTpMVxFuCGN5zUyCMRV7tdlI7o')
  on conflict do nothing;

insert into app_public.users (id) 
  values ('00000000-0000-0000-0000-000000000003') 
  on conflict do nothing;
insert into app_public.user_emails (id, user_id, email, is_primary, verified_at) 
  values ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'babbage@example.com', true, now())
  on conflict do nothing;
insert into app_public.user_profiles (id, user_id, display_name, full_name, avatar_url, about)
  values ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'babbage', 'Babbage', 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Advanced_Test_Reactor.jpg', 'Making computations easier.')
  on conflict do nothing;
insert into app_internal.user_passwords (id, user_id, password_hash)
  values ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', '$argon2id$v=19$m=65536,t=8,p=2$AE0wbO43y8TrDDUFEtWm6w$3UeS+V3nfoV1fcoz1ZRH6Wl6Ses8sqc5YmVjooOIgi0')
  on conflict do nothing;

insert into app_public.users (id) 
  values ('00000000-0000-0000-0000-000000000004') 
  on conflict do nothing;
insert into app_public.user_emails (id, user_id, email, is_primary, verified_at) 
  values ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'alan@example.com', true, now())
  on conflict do nothing;
insert into app_public.user_profiles (id, user_id, display_name, full_name, avatar_url, about)
  values ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'turing', 'Alan Turing', 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Bucephala-albeola-010.jpg', 'Is this complete or not?')
  on conflict do nothing;
insert into app_internal.user_passwords (id, user_id, password_hash)
  values ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', '$argon2id$v=19$m=65536,t=8,p=2$5VyY1Jv1e3zCkVGr2RP6tg$Z1fM+6rXlbpFpLjJoXRMaLdLAP7VyG+hseqUx+LEzw4')
  on conflict do nothing;

insert into app_public.users (id) 
  values ('00000000-0000-0000-0000-000000000005') 
  on conflict do nothing;
insert into app_public.user_emails (id, user_id, email, is_primary, verified_at) 
  values ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'grace@example.com', true, now())
  on conflict do nothing;
insert into app_public.user_profiles (id, user_id, display_name, full_name, avatar_url, about)
  values ('20000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'grace', 'Grace Hopper', 'https://upload.wikimedia.org/wikipedia/commons/4/41/Left_side_of_Flying_Pigeon.jpg', 'Check out the COBOL!')
  on conflict do nothing;
insert into app_internal.user_passwords (id, user_id, password_hash)
  values ('20000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', '$argon2id$v=19$m=65536,t=8,p=2$vDrpNQX1rkAH/DUuJW1fIA$9rwPCHbuGf2pohk/FNPMxgvQ+G5O5Wd27j5dUQyPj1g')
  on conflict do nothing;