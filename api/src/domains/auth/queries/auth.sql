/* @name selectUserAndHashByEmail */
select user_emails.user_id,
  user_emails.email,
  user_passwords.password_hash 
from app_public.user_emails
join app_internal.user_passwords 
  on user_emails.user_id = user_passwords.user_id
where user_emails.email = :userEmail! 
  and user_emails.verified_at is not null
order by user_passwords.created_at desc
  limit 1;