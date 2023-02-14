/* @name selectSessionById */
select *
from app_internal.sessions 
where uuid = :sessionId!;

/* @name insertSessionForUser */
insert into app_internal.sessions (user_id) 
values (:userId!) 
returning uuid as session_id;
