/* @name selectSessionById */
select *
from internal.sessions 
where uuid = :sessionId!;

/* @name insertSessionForUser */
insert into internal.sessions (user_id) 
values (:userId!) 
returning uuid as session_id;
