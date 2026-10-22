-- Generaciones que ya corrieron el Futurity (la primera edición fue en 2022, con la generación 2017).
insert into public.generations (birth_year, title, notes) values
  (2017, 'Generación 2017', 'Corrió el Futurity 2022, la primera edición.'),
  (2018, 'Generación 2018', 'Corrió el Futurity 2023.'),
  (2019, 'Generación 2019', 'Corrió el Futurity 2024.'),
  (2020, 'Generación 2020', 'Corrió el Futurity 2025.')
on conflict (birth_year) do update set title = excluded.title, notes = excluded.notes;
