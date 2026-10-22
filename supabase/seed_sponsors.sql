-- Patrocinantes según la historia destacada "Sponsors" de @futuritydelcoleo_oficial (oct 2026).
-- oficial = patrocinante principal (destacado); oro = patrocinante oficial; medio = transmisión.
delete from public.sponsors;

insert into public.sponsors (name, tier, logo_url, sort_order) values
  ('Purolomo', 'oficial', '/sponsors/purolomo.png', 1),
  ('Grupo La Caridad', 'oro', '/sponsors/grupo-la-caridad.png', 10),
  ('Lavelaca', 'oro', '/sponsors/lavelaca.png', 20),
  ('G.G. Centro Alegría', 'oro', '/sponsors/gg-centro-alegria.png', 30),
  ('La Productora', 'oro', '/sponsors/la-productora.png', 40),
  ('Cielo Abierto Ranch', 'oro', '/sponsors/cielo-abierto-ranch.png', 50),
  ('Centro de Recría Curbelo', 'oro', '/sponsors/centro-de-recria-curbelo.png', 60),
  ('Grupo Tuandamio', 'oro', '/sponsors/grupo-tuandamio.png', 70),
  ('Yuko Premium Motor Oil', 'oro', '/sponsors/yuko.png', 80),
  ('Agropecuaria Sabana de Aguirre', 'oro', '/sponsors/sabana-de-aguirre.png', 90),
  ('Globovisión', 'oro', '/sponsors/globovision.png', 100),
  ('Autoyota', 'oro', '/sponsors/autoyota.png', 110),
  ('Tauro', 'oro', '/sponsors/tauro.png', 120),
  ('Gorrín', 'oro', '/sponsors/gorrin.png', 130),
  ('SS Ranch', 'oro', '/sponsors/ss-ranch.png', 140),
  ('Ferre Jumbo San Antonio 2000', 'oro', null, 150),
  ('XtremeAgro', 'medio', null, 200);
