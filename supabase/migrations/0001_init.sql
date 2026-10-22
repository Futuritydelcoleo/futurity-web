-- Futurity del Coleo: esquema inicial (sitio público + base para el panel admin)

-- Una generación = caballos nacidos el mismo año. Compiten a los 5 años.
create table public.generations (
  birth_year       int primary key,
  title            text not null,
  registered_count int,
  notes            text
);

create table public.horses (
  id                uuid primary key default gen_random_uuid(),
  registration_code text unique,               -- p. ej. 2021-218 (planilla de revisión y registro)
  name              text not null,
  slug              text not null unique,
  sex               text check (sex in ('macho', 'hembra')),
  birth_year        int not null references public.generations (birth_year),
  aqha_status       text,
  owner             text,
  owner_instagram   text,
  stable            text,
  stable_instagram  text,
  photo_url         text,
  created_at        timestamptz not null default now()
);
create index horses_birth_year_idx on public.horses (birth_year);

-- Las tres válidas de cada temporada: CF1, CF2 y la final (Futurity).
create table public.events (
  id         uuid primary key default gen_random_uuid(),
  season     int not null,
  birth_year int not null references public.generations (birth_year),
  stage      text not null check (stage in ('cf1', 'cf2', 'futurity')),
  name       text not null,
  starts_on  date,
  ends_on    date,
  venue      text,
  city       text,
  status     text not null default 'programada'
             check (status in ('programada', 'reprogramada', 'en_curso', 'finalizada')),
  live_url   text,
  unique (season, stage)
);

-- Resultado de un caballo en una válida.
create table public.event_results (
  event_id uuid not null references public.events (id) on delete cascade,
  horse_id uuid not null references public.horses (id) on delete cascade,
  athlete  text,
  position int,
  pts_e    int not null default 0,
  pts_n    int not null default 0,
  pts_sp   int not null default 0,
  primary key (event_id, horse_id)
);

-- Tabla acumulada (CF1 + CF2) tal como la publica la organización.
create table public.standings (
  season     int not null,
  horse_id   uuid not null references public.horses (id) on delete cascade,
  position   int not null,
  athletes   text,
  pts_e      int not null default 0,
  pts_n      int not null default 0,
  pts_sp     int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (season, horse_id)
);

create table public.sponsors (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  tier       text not null default 'aliado' check (tier in ('oficial', 'oro', 'aliado', 'medio')),
  logo_url   text,
  website    text,
  sort_order int not null default 100,
  active     boolean not null default true
);

-- Configuración general editable desde el admin (próxima válida, enlace en vivo, redes...).
create table public.settings (
  key   text primary key,
  value jsonb not null
);

-- Lectura pública; la escritura queda para el panel admin (se habilita más adelante).
do $$
declare t text;
begin
  foreach t in array array['generations','horses','events','event_results','standings','sponsors','settings'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "lectura publica" on public.%I for select to anon, authenticated using (true)', t);
  end loop;
end $$;
