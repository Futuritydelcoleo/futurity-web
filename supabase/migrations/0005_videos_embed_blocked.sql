-- Videos que YouTube no deja ver incrustados en parte de la audiencia (derechos de música).
-- La página muestra su portada con enlace a YouTube y no los usa como video inicial.
alter table public.videos add column if not exists embed_blocked boolean not null default false;
update public.videos set embed_blocked = true where youtube_id = 'LSHm-oEqZ3Y';
