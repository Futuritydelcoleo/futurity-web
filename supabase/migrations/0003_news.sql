-- Noticias del Futurity (avisos, resultados, revisiones). Se editan desde el panel admin.
create table public.news (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text,
  body         text not null default '',   -- párrafos separados por una línea en blanco
  category     text not null default 'aviso' check (category in ('aviso', 'resultados', 'revision', 'evento')),
  image_url    text,
  published_at timestamptz not null default now(),
  published    boolean not null default true
);
create index news_published_idx on public.news (published_at desc);

alter table public.news enable row level security;
create policy "lectura publica" on public.news for select to anon, authenticated using (published);
