/* @name selectUserAndHashByEmail */
select user_emails.user_id,
  user_emails.email,
  internal.user_passwords.password_hash 
from user_emails
join internal.user_passwords 
  on user_emails.user_id = internal.user_passwords.user_id
where user_emails.email = :userEmail! 
  and user_emails.verified_at is not null
order by internal.user_passwords.created_at desc
  limit 1;