-- Videos del canal @futuritydelcoleo para la temporada 2026
insert into public.videos (event_id, youtube_id, title, kind, sort_order, published_on)
select e.id, v.youtube_id, v.title, v.kind, v.sort_order, v.published_on::date
from (values
  ('cf1', '_3LIPXivFbI', 'Sorteo', 'sorteo', 10, '2026-05-01'),
  ('cf1', 'AZRf8nL62kU', 'Día 1 de competencia', 'dia', 20, '2026-05-02'),
  ('cf1', 'eD31wqhNNIA', 'Día 2 de competencia', 'dia', 30, '2026-05-03'),
  ('cf1', 'KrL8L2uTgn4', 'Resumen del día 1', 'resumen', 40, '2026-05-02'),
  ('cf2', 'MJvDBH6DqWg', 'Sorteo', 'sorteo', 10, '2026-09-25'),
  ('cf2', 'G5vqq6MvIP4', 'Día 1 de competencia', 'dia', 20, '2026-09-26'),
  ('cf2', 'LSHm-oEqZ3Y', 'Día 2 de competencia', 'dia', 30, '2026-09-27')
) as v(stage, youtube_id, title, kind, sort_order, published_on)
join public.events e on e.season = 2026 and e.stage = v.stage;
