-- Datos iniciales tomados de las publicaciones de @futuritydelcoleo_oficial y
-- @caballodelfuturo_oficial (octubre 2026). La organización debe revisarlos desde el admin.

insert into public.generations (birth_year, title, notes) values
  (2021, 'Generación 2021', 'Compite en la temporada 2026: CF1, CF2 y Futurity.'),
  (2022, 'Generación 2022', 'En revisión y registro. Compite en la temporada 2027.');

insert into public.settings (key, value) values
  ('live_url', '"https://tiempovaquero.com/#/en-vivo"'),
  ('youtube_url', '"https://www.youtube.com/@futuritydelcoleo"'),
  ('youtube_channel_id', '"UCRYSh_OQJcmN2hIZmN0CfkQ"'),
  ('youtube_live_video', '""'),  -- enlace de un video/directo puntual; vacío = directo actual del canal
  ('instagram_url', '"https://www.instagram.com/futuritydelcoleo_oficial/"'),
  ('caballodelfuturo_instagram_url', '"https://www.instagram.com/caballodelfuturo_oficial/"'),
  ('contact_email', '"info@futuritydelcoleo.com"'),
  ('contact_location', '"Maracay, estado Aragua · Venezuela"'),
  ('current_season', '2026');

insert into public.events (season, birth_year, stage, name, starts_on, ends_on, venue, city, status) values
  (2026, 2021, 'cf1', 'Caballo del Futuro I', '2026-05-01', null,
   'Manga de Coleo Veteranos de Aragua', 'Maracay, Aragua', 'finalizada'),
  (2026, 2021, 'cf2', 'Caballo del Futuro II', '2026-09-25', '2026-09-26',
   'Manga de Coleo del Parque Carlos Raúl Villanueva', 'Maracay, Aragua', 'finalizada'),
  (2026, 2021, 'futurity', 'Futurity del Coleo 2026', '2026-12-10', '2026-12-12',
   'Manga de Coleo del Parque Carlos Raúl Villanueva', 'Maracay, Aragua', 'reprogramada');

-- Planillas de revisión y registro publicadas (generación 2021)
insert into public.horses (registration_code, name, slug, sex, birth_year, owner, stable) values
  ('2021-218', 'Rey David', 'rey-david', 'macho', 2021, 'Oscar Galindo', 'La Coromoto'),
  ('2021-217', 'Tesorero', 'tesorero', null, 2021, 'Eliser Córdova', 'Cordoagro Ranch'),
  ('2021-215', 'El Búa', 'el-bua', null, 2021, 'Miguel Ángel Curbelo', 'Centro de Recría JC'),
  ('2021-214', 'Pleitecito', 'pleitecito', null, 2021, 'Sergio Espinoza', 'L.M'),
  ('2021-213', 'Miss Suggar Bar', 'miss-suggar-bar', null, 2021, 'Kike Ramos / Nico D''Alto', 'Daltonera Ranch'),
  ('2021-212', 'Catalana', 'catalana', null, 2021, 'Cielo Abierto Ranch', 'Cielo Abierto Ranch'),
  ('2021-211', 'Turbo Reina', 'turbo-reina', null, 2021, 'Hierros de Caracas', 'Hierros de Caracas'),
  ('2021-210', 'Chiguirota', 'chiguirota', null, 2021, 'Hierros de Caracas', 'Hierros de Caracas'),
  ('2021-209', 'Bella de Hierro', 'bella-de-hierro', null, 2021, 'Hierros de Caracas', 'Hierros de Caracas'),
  ('2021-208', 'Tora de Hierro', 'tora-de-hierro', null, 2021, 'Hierros de Caracas', 'Hierros de Caracas'),
  ('2021-207', 'La Tocuyana', 'la-tocuyana', null, 2021, 'Pablo Colmenárez', 'Agropecuaria La Patrona'),
  ('2021-206', 'Naborí', 'nabori', null, 2021, 'Ricardo Mata', 'Agropecuaria Capadocia'),
  ('2021-205', 'Pura Candela', 'pura-candela', null, 2021, 'Francisco Aponte', 'F.A'),
  ('2021-204', 'La Cobra', 'la-cobra', null, 2021, 'Caballeriza N.J', 'N.J'),
  ('2021-203', 'Vicentico', 'vicentico', null, 2021, 'Favier Ávila', 'Los Morochos Espósito'),
  ('2021-202', 'Merlina', 'merlina', null, 2021, 'Finca Araguaney', 'Finca Araguaney'),
  ('2021-201', 'Mr Cool Cat', 'mr-cool-cat', null, 2021, 'Humberto Calderón / Carlos Silvestri', 'El Rufián'),
  ('2021-200', 'Sangre Dulce', 'sangre-dulce', null, 2021, 'Rodolfo Molina', 'R.P'),
  ('2021-199', 'Helicoide', 'helicoide', null, 2021, 'Pedro Díaz', 'Royalty Ranch'),
  ('2021-198', 'Bichota', 'bichota', null, 2021, 'Pedro Díaz', 'Royalty Ranch'),
  ('2021-197', 'BF Oakley Metallic Cat', 'bf-oakley-metallic-cat', null, 2021, 'Luis Espósito', 'Los Sauces Ranch'),
  ('2021-196', 'El Cámara', 'el-camara', null, 2021, 'Johnny Curbelo', 'Centro de Recría JC'),
  ('2021-195', 'Caribe Rojo', 'caribe-rojo', null, 2021, 'Centro Genético Andalucía', 'F.B'),
  ('2021-194', 'Pólvora', 'polvora', null, 2021, 'Centro Genético Andalucía', 'F.B'),
  ('2021-193', 'Sombrero Negro', 'sombrero-negro', null, 2021, 'Centro Genético Andalucía', 'F.B'),
  ('2021-192', 'Lady Mariana', 'lady-mariana', null, 2021, 'Johan Badillo', 'La Milenaria'),
  ('2021-191', 'Rosa de Hierro', 'rosa-de-hierro', null, 2021, 'Agropecuaria La Milenaria', 'La Milenaria'),
  ('2021-190', 'Marota Cat', 'marota-cat', null, 2021, 'Leonardo Espinoza', 'Hacienda La Calambrera'),
  ('2021-189', 'Temporal', 'temporal', null, 2021, 'Agropecuaria La Milenaria', 'La Milenaria'),
  ('2021-188', 'Princesa Gun', 'princesa-gun', null, 2021, 'Alejandro Milano', 'La Milenaria');

update public.horses set aqha_status = 'En trámite' where registration_code = '2021-218';

-- Caballos de la tabla acumulada (su número de planilla aún no está cargado)
insert into public.horses (name, slug, birth_year, owner, stable) values
  ('Monarca', 'monarca', 2021, 'Miguel Kattar', 'Agrop. La Milagrosa'),
  ('Ludópata', 'ludopata', 2021, 'Máximo Novoa', 'Dominguera Ranch'),
  ('Rosa del Desierto', 'rosa-del-desierto', 2021, 'Cielo Abierto Ranch', 'Cielo Abierto Ranch'),
  ('Gaviota', 'gaviota', 2021, 'Agrop. Kreas C.A.', 'Agrop. Kreas C.A.'),
  ('Linda Rosa', 'linda-rosa', 2021, 'Gladys Navarro', 'Centro de Recría El Drago'),
  ('Diamante Rojo', 'diamante-rojo', 2021, 'Martín Aníbal Pérez', 'Hermanos Pérez'),
  ('Pelotero Gun', 'pelotero-gun', 2021, 'Mauricio Llovera', 'Dominguera Ranch'),
  ('Buena Vibra', 'buena-vibra', 2021, 'Johan Badillo', 'HH'),
  ('Dulce Pecado', 'dulce-pecado', 2021, 'Luis Di Giacinto', 'Don Mario'),
  ('Turbo Rosteer', 'turbo-rosteer', 2021, 'Agrop. Doña Rania', 'Dominguera Ranch'),
  ('El Jocker', 'el-jocker', 2021, 'Hugo Carrillo', 'Transp. y Const. Alianza'),
  ('Borjas', 'borjas', 2021, 'Rafael Maya', 'Agrop. Don Raúl'),
  ('Cámara Rey', 'camara-rey', 2021, 'Constantino Valero', 'La Fraternidad'),
  ('Rey Melao', 'rey-melao', 2021, 'Francisco Del Toro', 'Nuevo Amanecer'),
  ('Sacramento', 'sacramento', 2021, 'Saúl Chirivella', 'SG'),
  ('Emely Rouse', 'emely-rouse', 2021, 'Rocío Garbi', 'Alimentos La Roca'),
  ('40 RBB', '40-rbb', 2021, 'Rancho Búfalo Bill', 'Rancho Búfalo Bill');

insert into public.standings (season, horse_id, position, athletes, pts_e, pts_n, pts_sp)
select 2026, h.id, s.position, s.athletes, s.e, s.n, s.sp
from (values
  ('monarca', 1, 'Juan Bordones', 14, 0, 2),
  ('ludopata', 2, 'Ryan Laya / Máximo Novoa', 13, 2, 1),
  ('rosa-del-desierto', 3, 'Oscar Suárez / Felipe Vargas', 11, 0, 0),
  ('gaviota', 4, 'Juan Delgado', 11, 1, 2),
  ('linda-rosa', 5, 'Gabriel Sarmiento', 11, 1, 2),
  ('diamante-rojo', 6, 'Luis García / Martín Aníbal Pérez', 10, 0, 0),
  ('pelotero-gun', 7, 'Anthony Clavo', 10, 2, 1),
  ('buena-vibra', 8, 'Kenedy Cobi', 9, 0, 1),
  ('dulce-pecado', 9, 'Jesús Mujica / Leonardo Caudelli', 9, 0, 1),
  ('turbo-rosteer', 10, 'Leonardo Caudelli / Luis Rojas', 9, 0, 1),
  ('el-jocker', 11, 'Miguel Bolívar', 9, 0, 1),
  ('borjas', 12, 'Oswaldo Sánchez / Ricardo Mujica', 9, 0, 0),
  ('camara-rey', 13, 'Julio Pérez Girón / Jesús Mujica', 9, 0, 0),
  ('rey-melao', 14, 'Yoandry Yelamo', 9, 0, 0),
  ('sacramento', 15, 'Levi Azuaje', 9, 0, 0),
  ('emely-rouse', 16, 'Ericson Pinzón', 9, 1, 0)
) as s(slug, position, athletes, e, n, sp)
join public.horses h on h.slug = s.slug;

-- Podio publicado del CF2-2026
insert into public.event_results (event_id, horse_id, athlete, position)
select e.id, h.id, r.athlete, r.position
from (values
  ('monarca', 'Juan Bordones', 1),
  ('40-rbb', 'José Solórzano', 2),
  ('rey-melao', 'Ryan Laya', 3),
  ('sacramento', 'Levi Azuaje', 3)
) as r(slug, athlete, position)
join public.horses h on h.slug = r.slug
join public.events e on e.season = 2026 and e.stage = 'cf2';

insert into public.sponsors (name, tier, sort_order) values
  ('Ganadería Purolomo', 'oficial', 1),
  ('XtremeAgro', 'medio', 10),
  ('Cielo Abierto Ranch', 'aliado', 20),
  ('Sonalika', 'aliado', 30),
  ('Capria', 'aliado', 40),
  ('Tauro', 'aliado', 50),
  ('Rhino', 'aliado', 60);
