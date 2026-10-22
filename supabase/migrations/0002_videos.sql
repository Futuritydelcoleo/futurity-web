-- Transmisiones y videos de YouTube de cada válida (día 1, día 2, sorteo, resumen).
create table public.videos (
  id           uuid primary key default gen_random_uuid(),
  event_id     uuid not null references public.events (id) on delete cascade,
  youtube_id   text not null unique,
  title        text not null,
  kind         text not null default 'dia' check (kind in ('dia', 'sorteo', 'resumen', 'otro')),
  sort_order   int not null default 100,
  published_on date
);
create index videos_event_idx on public.videos (event_id);

alter table public.videos enable row level security;
create policy "lectura publica" on public.videos for select to anon, authenticated using (true);
