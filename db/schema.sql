--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: app_internal; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_internal;


--
-- Name: app_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_public;


--
-- Name: graphile_migrate; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA graphile_migrate;


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: organisation_membership_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.organisation_membership_role AS ENUM (
    'admin',
    'member'
);


--
-- Name: tg__timestamps(); Type: FUNCTION; Schema: app_internal; Owner: -
--

CREATE FUNCTION app_internal.tg__timestamps() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then now() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= now() then OLD.updated_at + interval '1 millisecond' else now() end);
  return NEW;
end;
$$;


--
-- Name: FUNCTION tg__timestamps(); Type: COMMENT; Schema: app_internal; Owner: -
--

COMMENT ON FUNCTION app_internal.tg__timestamps() IS 'This trigger should be called on all tables with timestamps, ensures they are always up to date.';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: app_internal; Owner: -
--

CREATE TABLE app_internal.sessions (
    uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_active timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_passwords; Type: TABLE; Schema: app_internal; Owner: -
--

CREATE TABLE app_internal.user_passwords (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: organisation_details; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.organisation_details (
    organisation_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    avatar_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: organisation_memberships; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.organisation_memberships (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    organisation_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role public.organisation_membership_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: organisations; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.organisations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug public.citext NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_emails; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.user_emails (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    email public.citext NOT NULL,
    is_primary boolean DEFAULT false NOT NULL,
    verified_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_emails_email_check CHECK ((email OPERATOR(public.~) '[^@]+@[^@]+\.[^@]+'::public.citext)),
    CONSTRAINT user_emails_must_be_verified_to_be_primary CHECK (((is_primary IS FALSE) OR (verified_at IS NOT NULL)))
);


--
-- Name: user_profiles; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.user_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    display_name text NOT NULL,
    full_name text,
    about text,
    avatar_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_profiles_avatar_url_check CHECK ((avatar_url ~ '^https?://[^/]+'::text))
);


--
-- Name: users; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: current; Type: TABLE; Schema: graphile_migrate; Owner: -
--

CREATE TABLE graphile_migrate.current (
    filename text DEFAULT 'current.sql'::text NOT NULL,
    content text NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: migrations; Type: TABLE; Schema: graphile_migrate; Owner: -
--

CREATE TABLE graphile_migrate.migrations (
    hash text NOT NULL,
    previous_hash text,
    filename text NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: app_internal; Owner: -
--

ALTER TABLE ONLY app_internal.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (uuid);


--
-- Name: user_passwords user_passwords_pkey; Type: CONSTRAINT; Schema: app_internal; Owner: -
--

ALTER TABLE ONLY app_internal.user_passwords
    ADD CONSTRAINT user_passwords_pkey PRIMARY KEY (id);


--
-- Name: organisation_details organisation_details_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.organisation_details
    ADD CONSTRAINT organisation_details_pkey PRIMARY KEY (organisation_id);


--
-- Name: organisation_memberships organisation_memberships_organisation_id_user_id_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.organisation_memberships
    ADD CONSTRAINT organisation_memberships_organisation_id_user_id_key UNIQUE (organisation_id, user_id);


--
-- Name: organisation_memberships organisation_memberships_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.organisation_memberships
    ADD CONSTRAINT organisation_memberships_pkey PRIMARY KEY (id);


--
-- Name: organisations organisations_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.organisations
    ADD CONSTRAINT organisations_pkey PRIMARY KEY (id);


--
-- Name: organisations organisations_slug_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.organisations
    ADD CONSTRAINT organisations_slug_key UNIQUE (slug);


--
-- Name: user_emails user_emails_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails
    ADD CONSTRAINT user_emails_pkey PRIMARY KEY (id);


--
-- Name: user_emails user_emails_user_id_email_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails
    ADD CONSTRAINT user_emails_user_id_email_key UNIQUE (user_id, email);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: current current_pkey; Type: CONSTRAINT; Schema: graphile_migrate; Owner: -
--

ALTER TABLE ONLY graphile_migrate.current
    ADD CONSTRAINT current_pkey PRIMARY KEY (filename);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: graphile_migrate; Owner: -
--

ALTER TABLE ONLY graphile_migrate.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (hash);


--
-- Name: idx_sessions_user; Type: INDEX; Schema: app_internal; Owner: -
--

CREATE INDEX idx_sessions_user ON app_internal.sessions USING btree (user_id);


--
-- Name: idx_user_passwords_user; Type: INDEX; Schema: app_internal; Owner: -
--

CREATE INDEX idx_user_passwords_user ON app_internal.user_passwords USING btree (user_id);


--
-- Name: idx_organisation_memberships_organisation; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_organisation_memberships_organisation ON app_public.organisation_memberships USING btree (organisation_id);


--
-- Name: idx_organisation_memberships_user; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_organisation_memberships_user ON app_public.organisation_memberships USING btree (user_id);


--
-- Name: idx_user_emails_user; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_user_emails_user ON app_public.user_emails USING btree (user_id);


--
-- Name: idx_user_profiles_user; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_user_profiles_user ON app_public.user_profiles USING btree (user_id);


--
-- Name: uniq_user_emails_primary_email; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX uniq_user_emails_primary_email ON app_public.user_emails USING btree (user_id) WHERE (is_primary IS TRUE);


--
-- Name: uniq_user_emails_verified_email; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX uniq_user_emails_verified_email ON app_public.user_emails USING btree (email) WHERE (verified_at IS NOT NULL);


--
-- Name: organisation_details _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.organisation_details FOR EACH ROW EXECUTE FUNCTION app_internal.tg__timestamps();


--
-- Name: organisation_memberships _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.organisation_memberships FOR EACH ROW EXECUTE FUNCTION app_internal.tg__timestamps();


--
-- Name: organisations _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.organisations FOR EACH ROW EXECUTE FUNCTION app_internal.tg__timestamps();


--
-- Name: user_emails _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.user_emails FOR EACH ROW EXECUTE FUNCTION app_internal.tg__timestamps();


--
-- Name: user_profiles _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.user_profiles FOR EACH ROW EXECUTE FUNCTION app_internal.tg__timestamps();


--
-- Name: users _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.users FOR EACH ROW EXECUTE FUNCTION app_internal.tg__timestamps();


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: app_internal; Owner: -
--

ALTER TABLE ONLY app_internal.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: user_passwords user_passwords_user_id_fkey; Type: FK CONSTRAINT; Schema: app_internal; Owner: -
--

ALTER TABLE ONLY app_internal.user_passwords
    ADD CONSTRAINT user_passwords_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: organisation_details organisation_details_organisation_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.organisation_details
    ADD CONSTRAINT organisation_details_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES app_public.organisations(id) ON DELETE CASCADE;


--
-- Name: organisation_memberships organisation_memberships_organisation_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.organisation_memberships
    ADD CONSTRAINT organisation_memberships_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES app_public.organisations(id) ON DELETE CASCADE;


--
-- Name: organisation_memberships organisation_memberships_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.organisation_memberships
    ADD CONSTRAINT organisation_memberships_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: user_emails user_emails_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails
    ADD CONSTRAINT user_emails_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: migrations migrations_previous_hash_fkey; Type: FK CONSTRAINT; Schema: graphile_migrate; Owner: -
--

ALTER TABLE ONLY graphile_migrate.migrations
    ADD CONSTRAINT migrations_previous_hash_fkey FOREIGN KEY (previous_hash) REFERENCES graphile_migrate.migrations(hash);


--
-- PostgreSQL database dump complete
--

