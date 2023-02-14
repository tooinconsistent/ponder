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
