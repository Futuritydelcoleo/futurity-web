-- Primeras noticias, redactadas a partir de las publicaciones de @futuritydelcoleo_oficial
-- y @caballodelfuturo_oficial. La organización puede editarlas desde el admin.
insert into public.news (slug, title, excerpt, body, category, image_url, published_at) values
(
  'nueva-fecha-futurity-del-coleo-2026',
  'Nueva fecha para el Futurity del Coleo 2026',
  'La gran final para los equinos nacidos en 2021 se correrá el 10, 11 y 12 de diciembre en Maracay.',
  E'La organización del Futurity del Coleo informa que la gran final de la temporada 2026 se realizará los días 10, 11 y 12 de diciembre en la Manga de Coleo del Parque Carlos Raúl Villanueva, en Maracay, estado Aragua.\n\nCompiten los equinos nacidos en el año 2021, previamente revisados y registrados por nuestro equipo técnico de médicos veterinarios.\n\nLa transmisión será en vivo por nuestro canal de YouTube y los tiempos y resultados podrán seguirse en tiempo real con Tiempo Vaquero. ¡Te esperamos!',
  'aviso', null, '2026-10-08 12:00-04'
),
(
  'ultima-revision-equinos-2022',
  'Última revisión para los equinos nacidos en 2022',
  'El viernes 30 de octubre, desde las 9:00 a. m., en la Asociación de Ganaderos del estado Carabobo.',
  E'Te esperamos el viernes 30 de octubre a partir de las 9:00 a. m. en la ciudad de Valencia, en la Asociación de Ganaderos del estado Carabobo, para la última revisión de los equinos nacidos en el año 2022.\n\nSolo los ejemplares revisados y registrados por nuestro equipo técnico podrán competir en la temporada 2027: Caballo del Futuro I, Caballo del Futuro II y el Futurity del Coleo.',
  'revision', null, '2026-10-06 12:00-04'
),
(
  'monarca-campeon-caballo-del-futuro-2-2026',
  'Monarca, campeón del Caballo del Futuro II 2026',
  'Monarca, de Miguel Kattar, se quedó con el primer lugar y lidera el acumulado rumbo al Futurity.',
  E'Culminó el Caballo del Futuro II 2026 en la Manga de Coleo del Parque Carlos Raúl Villanueva de Maracay, con los equinos nacidos en 2021.\n\n🥇 1.er lugar: Monarca — propietario Miguel Kattar, caballeriza Agropecuaria La Milagrosa, atleta Juan Bordones.\n\n🥈 2.º lugar: 40 RBB — propietario Rancho Búfalo Bill, atleta José Solórzano.\n\n🥉 3.er lugar (empate): Rey Melao — propietario Francisco Del Toro, atleta Ryan Laya; y Sacramento — propietario Saúl Chirivella, atleta Levi Azuaje.\n\nCon este resultado, Monarca encabeza el acumulado CF1/CF2 rumbo a la gran final del Futurity del Coleo.',
  'resultados', 'https://i.ytimg.com/vi/LSHm-oEqZ3Y/hqdefault.jpg', '2026-09-27 12:00-04'
),
(
  'tercera-revision-mas-de-200-ejemplares',
  'Más de 200 ejemplares evaluados en la 3.ª revisión',
  'Por segundo año consecutivo superamos los 200 equinos revisados y calificados para competir.',
  E'Se realizó con éxito la 3.ª revisión de equinos nacidos en 2022. Por segundo año consecutivo superamos los 200 ejemplares evaluados y calificados para entrar en competencia.\n\nGracias a propietarios, caballerizas y a nuestro equipo de médicos veterinarios por hacerlo posible.',
  'revision', null, '2026-07-25 12:00-04'
);

-- La reprogramación vive como noticia; el evento queda simplemente programado.
update public.events set status = 'programada' where status = 'reprogramada';
