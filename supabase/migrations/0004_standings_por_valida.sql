-- Puntos de cada válida en la tabla acumulada (null = no corrió esa válida).
alter table public.standings add column if not exists cf1_pts int, add column if not exists cf2_pts int;
