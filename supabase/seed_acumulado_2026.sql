-- Acumulado Caballo del Futuro 1 y 2 – 2026 (PDF de la organización). Generado por tools/pdf_load.py
begin;
alter table public.standings add column if not exists cf1_pts int, add column if not exists cf2_pts int;
insert into public.horses (name, slug, birth_year, owner, stable) values ('King Llanero', 'king-llanero', 2021, 'Hermanos Hernandez', 'Hermanos Hernandez') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Katana', 'katana', 2021, 'Maria Jimenez- Incoverca', 'FR') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Inocente', 'inocente', 2021, 'Ganaderia Pedro Juan', 'Ganaderia Pedro Juan 3 C.A.') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Noche de Boda', 'noche-de-boda', 2021, 'Nicolas Cañizales', 'Ganaderia Pedro Juan') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Buen Pollo', 'buen-pollo', 2021, 'Buen Pollo', 'Jimenera Ranch 27') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('La India', 'la-india', 2021, 'Grupo Gorrin', 'Grupo Gorrin') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('La Tormenta', 'la-tormenta', 2021, 'Asdrubal Marin', 'Rancho Las Morochas') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('SF Metallic Orphan', 'sf-metallic-orphan', 2021, 'Salvador Fontana', 'Nuevo Amanecer') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Yayita', 'yayita', 2021, 'Carlos Prosperi', 'Bella Vista Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Alazne', 'alazne', 2021, 'Miguel Kattar', 'Agrop. La Milagrosa') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Pepona Cat', 'pepona-cat', 2021, 'Agrop. Rancho Verde', 'Rienda Es Rienda') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Novia de Pueblo', 'novia-de-pueblo', 2021, 'Victor Zambrano', 'Agrop. Los Tres Potricos') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('MR Black', 'mr-black', 2021, 'Johnny Curbelo', 'Centro de Recria JC') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Clandestina', 'clandestina', 2021, 'Johan Badillo', 'HH') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Talisman', 'talisman', 2021, 'Sebastian Leon', 'SL Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Adonis', 'adonis', 2021, 'Los Alejandros Ranch', 'Jimenera Ranch 27') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('El Cheque', 'el-cheque', 2021, 'Juan Funez / Cesar Funez', 'JD') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Iron Cat / Hig Iron Cat', 'iron-cat-hig-iron-cat', 2021, 'Stallion Ranch', 'Stallion Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Astroboy', 'astroboy', 2021, 'Hermanos Aguirre', 'El Noble Rancho de Palma') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Rescatado Hot Cat', 'rescatado-hot-cat', 2021, 'Lino Sanchez', 'La Poderosa') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Delta Gum', 'delta-gum', 2021, 'Jose Alejandro Martinez', 'Cerro Azul') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('El Cabito', 'el-cabito', 2021, 'Maquinaria Ranch', 'Dominguera Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Don Marcial', 'don-marcial', 2021, 'La Triple L Ranch', 'Hermanos Leonardi') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('La Cuaima', 'la-cuaima', 2021, 'La Milenaria', 'La Milenaria') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Princesa Aurora', 'princesa-aurora', 2021, 'Centro de Recria Tierra Negra', 'Los Morochos Espositos') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Jhon Deere', 'jhon-deere', 2021, 'Maquinaria Ranch', 'Dominguera Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Alcayata', 'alcayata', 2021, 'Jose Ignancio Cordero', 'JIC Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('La Churrita', 'la-churrita', 2021, 'Javier Arellano', 'Transporte MTO') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('La Kuty', 'la-kuty', 2021, 'Cielo Abierto Ranch', 'Cielo Abierto Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Triple R', 'triple-r', 2021, 'Grupo EA', 'EA') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Anastacia Grey', 'anastacia-grey', 2021, 'Anastacio Rocha', 'Hacienda Santa Fe') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Antonieta', 'antonieta', 2021, 'Centro de Recria Curbelo', 'La Coromoto') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Mini Shower', 'mini-shower', 2021, 'Agrop. Don Miguel', 'Agrop. Don Miguel') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Malandro', 'malandro', 2021, 'Black Celis', 'Black Celis Cow Horse') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Reina Teresa', 'reina-teresa', 2021, 'Teresa Gorrin', 'Grupo Gorrin') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Capachurrita', 'capachurrita', 2021, 'Centro de Recria JMC', 'Centro de Recria JMC') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Carpintero', 'carpintero', 2021, 'Eduardo Celis', 'Black Celis Cow Horse') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Luna', 'luna', 2021, 'Carlos Nuñez', 'VP Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Coloner Cat', 'coloner-cat', 2021, 'Alejandro Tabares', 'La Coromoto') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Rosendo', 'rosendo', 2021, 'M.V. Victor Rangel', 'La Rangelera') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Agata', 'agata', 2021, 'Henry Peral', 'Agroindiustria Nuevo Amanecer') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Catalina', 'catalina', 2021, 'Agrop. Camaripano', 'JD') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('El Comandante', 'el-comandante', 2021, 'Juan Benitez', 'Finca El Chaparral') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Tacomita', 'tacomita', 2021, 'Dylan Betancour', 'Meduza Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Sucre', 'sucre', 2021, 'La Triple L Ranch', 'Dominguera Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('San Miguel', 'san-miguel', 2021, 'Carolina Castillo', 'Agrop. Doble C') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Camara', 'camara', 2021, 'Carlos Lorenzo', 'Padronera Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Señorita', 'senorita', 2021, 'Hierros Caracas', 'Agrop. La Milenaria') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Reina Valera', 'reina-valera', 2021, 'Jose Otero - Alberto Ortega', 'Agrop. Renacer - AO Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Picasso', 'picasso', 2021, 'Agro Inv. Ave Maria', 'Agro Inv. Ave Maria, C.A.') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('La Thermo King', 'la-thermo-king', 2021, 'Transporte MM', 'Agrop. Kreas C.A.') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Zambito', 'zambito', 2021, 'Carlos Prosperi', 'Bella Vista Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Sapoara', 'sapoara', 2021, 'Jose Alejandro Martinez', 'Cerro Azul') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Santa', 'santa', 2021, 'Enrique Arevalo', 'Gallo Fino') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Inspector Hot', 'inspector-hot', 2021, 'German Suarez', 'Sigma Equino') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('DF Bichota', 'df-bichota', 2021, 'Maria Fernanda de Filippo', 'Cavalli') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Amapola', 'amapola', 2021, 'Equinmedical', 'Equinmedical') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Bagre Rallao', 'bagre-rallao', 2021, 'Bufalera Los Palos Deagua', 'Hermanos Leonardi') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Sambo del Cielo', 'sambo-del-cielo', 2021, 'Finca Las Nieves', 'Finca Las Nieves') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Miss Rio Samart', 'miss-rio-samart', 2021, 'Antonio Aular', 'Morochos Espositos') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Heredera', 'heredera', 2021, 'Javier Perez', 'RP') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Cruela', 'cruela', 2021, 'Miguel Adrian', 'FB') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Don Paco Cat', 'don-paco-cat', 2021, 'Jesus Melian', 'Agrop. La Vega') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Galilea', 'galilea', 2021, 'Renny Vasquez', 'La Coromoto') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Danto', 'danto', 2021, 'Jaime Asuaje', 'El Saman') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Fruta de Pan', 'fruta-de-pan', 2021, 'Centro Genetico', 'FB') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Shumeiker', 'shumeiker', 2021, 'Nestor Gonzalez', 'Tierra Firme Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Concha e Piña', 'concha-e-pina', 2021, 'Leopoldo Romero', 'JD') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('El Caballo de Dios', 'el-caballo-de-dios', 2021, 'Amilcar Chacin', 'La Humildad') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Pelo Rubio', 'pelo-rubio', 2021, 'Luis Tovar', 'CLS Stable') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Princesa Bianca', 'princesa-bianca', 2021, 'Rougned Odor', 'Los Tipos Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Sombrero Negro', 'sombrero-negro-2', 2021, 'Centro Genetico', 'FB') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Tap Ichi', 'tap-ichi', 2021, 'Yoiner Navas', 'Cielo Abierto Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Candelaria', 'candelaria', 2021, 'Agrop. La Gloria de Dios', 'La Gloria de Dios') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('La Diablita', 'la-diablita', 2021, 'Agrop. La Union', 'Agrop. La Union') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Paris', 'paris', 2021, 'Danna Betancourt', 'Meduza Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('King', 'king', 2021, 'Elias Diaz', 'La Elegancia del MVP') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Maria Clara', 'maria-clara', 2021, 'Antonino Russo', 'El Encanto Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('RPG', 'rpg', 2021, 'Guillermo Stuve', 'Dominguera Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Caudillo', 'caudillo', 2021, 'Victor Alvarez', 'Toro Gallo Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Coqueta Cat', 'coqueta-cat', 2021, 'Gustavo Hernandez', 'CR Carlos Ramos') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Danto', 'danto-2', 2021, 'Jaime Asuaje', 'El Saman') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Falso Abierto', 'falso-abierto', 2021, 'Ekker Herrera', 'Dinastia Vargas') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Lady Di', 'lady-di', 2021, 'La Milenaria', 'La Milenaria') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Maria Ines', 'maria-ines', 2021, 'Yurby Falcon', 'RP') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Sheriff GG', 'sheriff-gg', 2021, 'Centro Ecuestre Alegria GG', 'Centro Ecuestre Alegria GG') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Ana Paleta', 'ana-paleta', 2021, 'Luis Melendez', 'AJR Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Guanaco Spark', 'guanaco-spark', 2021, 'Juan Carlos Gomez', 'El Porvenir Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Maxima', 'maxima', 2021, 'Miguel Adrian', 'FB') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Colorado', 'colorado', 2021, 'La Triple L Ranch', 'La Triple L Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Heredera', 'heredera-dominguera-ranch', 2021, 'Alfredo Gamez', 'Dominguera Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Rey Gasper', 'rey-gasper', 2021, 'Rosendo Lopez', 'Dominguera Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('El Pollero', 'el-pollero', 2021, 'Orencio Marente', 'FB') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Yubiry', 'yubiry', 2021, 'Jose Quevedo', 'Hg Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Rosario', 'rosario', 2021, 'Luis Dominguez', 'JD') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('SF Platinum Metallic', 'sf-platinum-metallic', 2021, 'Salvador Fontana', 'Nuevo Amanecer') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Pedro Caiman', 'pedro-caiman', 2021, 'Elfeli Vasquez', 'El Rincon de La Negra') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Rummy King', 'rummy-king', 2021, 'Elias Diaz', 'La Elegancia del MVP') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Ultima Soga', 'ultima-soga', 2021, 'Jose Luis Viera', 'Centro de Recria El Drago') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Metal K', 'metal-k', 2021, 'Jose Franco', 'Galleria Rojito') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Juez de Llano', 'juez-de-llano', 2021, 'Carlos Lorenzo', 'Padronera Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Tilin Mostrico Junior', 'tilin-mostrico-junior', 2021, 'Luis Otero', 'Aperos Monster') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Catalino High Brown', 'catalino-high-brown', 2021, 'Victor Zambrano', 'AJR Ranch') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Negociante', 'negociante', 2021, 'Alejandro Jacome', 'FB') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
insert into public.horses (name, slug, birth_year, owner, stable) values ('Mia Peppy', 'mia-peppy', 2021, 'Joan Reyes', 'Los Morochos Espositos') on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;
update public.horses set owner = coalesce(owner, 'Miguel Kattar'), stable = coalesce(stable, 'Agrop. La Milagrosa') where slug = 'monarca';
update public.horses set owner = coalesce(owner, 'Maximo Novoa'), stable = coalesce(stable, 'Dominguera Ranch') where slug = 'ludopata';
update public.horses set owner = coalesce(owner, 'Cielo Abierto Ranch'), stable = coalesce(stable, 'Cielo Abierto Ranch') where slug = 'rosa-del-desierto';
update public.horses set owner = coalesce(owner, 'Agrop. Kreas C.A.'), stable = coalesce(stable, 'Agrop. Kreas C.A.') where slug = 'gaviota';
update public.horses set owner = coalesce(owner, 'Gladys Navarro'), stable = coalesce(stable, 'Centro de Recria El Drago') where slug = 'linda-rosa';
update public.horses set owner = coalesce(owner, 'Martin Anibal Perez'), stable = coalesce(stable, 'Hermanos Perez') where slug = 'diamante-rojo';
update public.horses set owner = coalesce(owner, 'Mauricio Llovera'), stable = coalesce(stable, 'Dominguera Ranch') where slug = 'pelotero-gun';
update public.horses set owner = coalesce(owner, 'Johan Badillo'), stable = coalesce(stable, 'HH') where slug = 'buena-vibra';
update public.horses set owner = coalesce(owner, 'Luis Di Giacinto'), stable = coalesce(stable, 'Don Mario') where slug = 'dulce-pecado';
update public.horses set owner = coalesce(owner, 'Agrop. Do;a Rania'), stable = coalesce(stable, 'Dominguera Ranch') where slug = 'turbo-rosteer';
update public.horses set owner = coalesce(owner, 'Hugo Carrillo'), stable = coalesce(stable, 'Transporte y Construcciones Alianza') where slug = 'el-jocker';
update public.horses set owner = coalesce(owner, 'Rafael Maya'), stable = coalesce(stable, 'Agrop. Don Raul') where slug = 'borjas';
update public.horses set owner = coalesce(owner, 'Constantino Valero'), stable = coalesce(stable, 'La Fraternidad') where slug = 'camara-rey';
update public.horses set owner = coalesce(owner, 'Francisco del Toro'), stable = coalesce(stable, 'Nuevo Amanecer') where slug = 'rey-melao';
update public.horses set owner = coalesce(owner, 'Saul Chirivella'), stable = coalesce(stable, 'SG') where slug = 'sacramento';
update public.horses set owner = coalesce(owner, 'Rocio Garbi'), stable = coalesce(stable, 'Alimentos La Roca') where slug = 'emely-rouse';
update public.horses set owner = coalesce(owner, 'Rancho Bufalo Bill'), stable = coalesce(stable, 'Rancho Bufalo Bill') where slug = '40-rbb';
update public.horses set owner = coalesce(owner, 'Pedro Diaz'), stable = coalesce(stable, 'Royalty Ranch') where slug = 'bichota';
update public.horses set owner = coalesce(owner, 'Sergio Espinoza'), stable = coalesce(stable, 'LM') where slug = 'pleitecito';
update public.horses set owner = coalesce(owner, 'Favier Avila'), stable = coalesce(stable, 'Los Morochos Espositos') where slug = 'vicentico';
update public.horses set owner = coalesce(owner, 'Daniel Alvarez'), stable = coalesce(stable, 'Finca Araguaney') where slug = 'merlina';
update public.horses set owner = coalesce(owner, 'Carlos Silvestre'), stable = coalesce(stable, 'Rufian') where slug = 'mr-cool-cat';
update public.horses set owner = coalesce(owner, 'Francisco Aponte'), stable = coalesce(stable, 'F.A') where slug = 'pura-candela';
update public.horses set owner = coalesce(owner, 'Nico D''Alto - Kike Ramos'), stable = coalesce(stable, 'Daltonera Ranch') where slug = 'miss-suggar-bar';
update public.horses set owner = coalesce(owner, 'La Milenaria'), stable = coalesce(stable, 'La Milenaria') where slug = 'temporal';
update public.horses set owner = coalesce(owner, 'Centro Genetico'), stable = coalesce(stable, 'FB') where slug = 'sombrero-negro';
update public.horses set owner = coalesce(owner, 'Hierros Caracas'), stable = coalesce(stable, 'Agrop. La Milenaria') where slug = 'bella-de-hierro';
update public.horses set owner = coalesce(owner, 'Pedro Diaz'), stable = coalesce(stable, 'Royalty Ranch') where slug = 'helicoide';
update public.horses set owner = coalesce(owner, 'Bab. NJ'), stable = coalesce(stable, 'NJ') where slug = 'la-cobra';
update public.horses set owner = coalesce(owner, 'La Milenaria'), stable = coalesce(stable, 'La Milenaria') where slug = 'princesa-gun';
update public.horses set owner = coalesce(owner, 'Luis Esposito'), stable = coalesce(stable, 'Los Sauces Ranch') where slug = 'bf-oakley-metallic-cat';
update public.horses set owner = coalesce(owner, 'Johan Badillo'), stable = coalesce(stable, 'Caballeriza HH') where slug = 'lady-mariana';
update public.horses set owner = coalesce(owner, 'Rodolfo Molina'), stable = coalesce(stable, 'RP') where slug = 'sangre-dulce';
delete from public.standings where season = 2026;
insert into public.standings (season, horse_id, position, athletes, pts_e, pts_n, pts_sp, cf1_pts, cf2_pts)
select 2026, h.id, v.pos, v.ath, v.e, coalesce(v.nn, 0), coalesce(v.sp, 0), v.c1, v.c2
from (values
  ('monarca', 1, 'Juan Bordones', 14, 0, 2, 7, 7),
  ('ludopata', 2, 'Ryan Laya / Maximo Novoa', 13, 2, 1, 8, 5),
  ('rosa-del-desierto', 3, 'Oscar Suarez / Felipe Vargas', 11, 0, 0, 7, 4),
  ('gaviota', 4, 'Juan Delgado', 11, 1, 2, 4, 7),
  ('linda-rosa', 5, 'Gabriel Sarmiento', 11, 1, 2, 6, 5),
  ('diamante-rojo', 6, 'Luis Garcia / Martin Anibal Perez', 10, 0, 0, 6, 4),
  ('pelotero-gun', 7, 'Anthony Clavo', 10, 2, 1, 5, 5),
  ('buena-vibra', 8, 'Kenedy Cobi', 9, 0, 1, 5, 4),
  ('dulce-pecado', 9, 'Jesus Mujica / Leonardo Caudelli', 9, 0, 1, 6, 3),
  ('turbo-rosteer', 10, 'Leonardo Caudeli / Luis Rojas', 9, 0, 1, 4, 5),
  ('el-jocker', 11, 'Miguel Bolivar', 9, 0, 1, 7, 2),
  ('borjas', 12, 'Oswaldo Sanchez / Ricardo Mujica', 9, 0, 0, 5, 4),
  ('camara-rey', 13, 'Julio Perez Giron / Jesus Mujica', 9, 0, 0, 4, 5),
  ('rey-melao', 14, 'Yoandry Yelamo', 9, 0, 0, 2, 7),
  ('sacramento', 15, 'Levi Azuaje', 9, 0, 0, 2, 7),
  ('emely-rouse', 16, 'Ericson Pinzon', 9, 1, 0, 6, 3),
  ('king-llanero', 17, 'Miguel Herrera', 9, 2, 0, 6, 3),
  ('katana', 18, 'Franck Romero', 9, 3, 1, 6, 3),
  ('40-rbb', 19, 'Felix Arevalo / Jose Solorzano', 8, 0, 2, 1, 7),
  ('inocente', 20, 'Alejandro Franco', 8, 0, 2, 2, 6),
  ('noche-de-boda', 21, 'Nicolas Cañizales / Yovanni Zerpa', 8, 0, 0, 3, 5),
  ('buen-pollo', 22, 'Gabriel Marquez', 8, 1, 2, 5, 3),
  ('la-india', 23, 'Jean Carlos Aguilar', 8, 1, 0, 4, 4),
  ('la-tormenta', 24, 'Yadinson Burgos', 8, 2, 1, 3, 5),
  ('bichota', 25, 'Miguel Nuñez / Jose A. Otero', 8, 2, 0, 4, 4),
  ('sf-metallic-orphan', 26, 'Jose Gallardo', 8, 2, 0, 5, 3),
  ('yayita', 27, 'Manuel Zamora', 7, 0, 1, 4, 3),
  ('alazne', 28, 'Liscandro Tovar', 7, 0, 0, 5, 2),
  ('pepona-cat', 29, 'Jose Leonardo Marcano', 7, 0, 0, 3, 4),
  ('novia-de-pueblo', 30, 'Edgar Martinez', 7, 1, 2, null, 7),
  ('mr-black', 31, 'Jose Granadillo', 7, 1, 1, 4, 3),
  ('pleitecito', 32, 'Luis Mena', 7, 1, 1, 3, 4),
  ('clandestina', 33, 'Carlos Sanoja', 7, 1, 0, 5, 2),
  ('talisman', 34, 'Rafael Castillo', 7, 1, 0, 4, 3),
  ('adonis', 35, 'Humberto Ramos / Ricardo Jimenez', 7, 2, 1, 4, 3),
  ('el-cheque', 36, 'Carlos Ramos / Juan Funez', 7, 2, 1, 4, 3),
  ('iron-cat-hig-iron-cat', 37, 'Jose M. Laya / Carlos Ramos', 7, 2, 0, 2, 5),
  ('vicentico', 38, 'Ricardo Esposito / Gabriel Esposito', 7, 2, 0, 2, 5),
  ('astroboy', 39, 'Ibrahim Colmenarez', 7, 5, 0, 4, 3),
  ('rescatado-hot-cat', 40, 'Eufracio Menessini', 7, 6, 0, 3, 4),
  ('delta-gum', 41, 'Wilver Sandoval', 6, 0, 1, 6, null),
  ('el-cabito', 42, 'Nirson Sarmiento', 6, 0, 1, 6, null),
  ('don-marcial', 43, 'Juan Carlos Leonardis / Juan Pablo Leonardi', 6, 0, 0, 1, 5),
  ('merlina', 44, 'Alejandro Rodriguez', 6, 0, 0, null, 6),
  ('la-cuaima', 45, 'Juan Exposito', 6, 0, 0, 6, null),
  ('princesa-aurora', 46, 'Gabriel Esposito', 6, 0, 0, 6, null),
  ('jhon-deere', 47, 'Yorman Dominguez', 6, 1, 0, 7, -1),
  ('alcayata', 48, 'Jose Leones / Nirson Sarmiento', 6, 2, 1, 4, 2),
  ('la-churrita', 49, 'Nelson Escalona / Angel Guillen', 6, 2, 0, 3, 3),
  ('la-kuty', 50, 'Felipe Vargas / Oscar Suarez', 6, 2, 0, 1, 5),
  ('triple-r', 51, 'Kevin Hernandez / Cesar Romero', 6, 3, 0, 2, 4),
  ('anastacia-grey', 52, 'Jose Cardozo', 5, 0, 1, null, 5),
  ('antonieta', 53, 'Arnaldo Tabares', 5, 0, 1, 3, 2),
  ('mini-shower', 54, 'Luis O. Vasquez / Redy Campos', 5, 0, 1, 3, 2),
  ('malandro', 55, 'Jose Rosana', 5, 0, 0, null, 5),
  ('reina-teresa', 56, 'Julio Perez Giron', 5, 0, 0, null, 5),
  ('mr-cool-cat', 57, 'Jose Armario', 5, 0, 0, 5, null),
  ('capachurrita', 58, 'Reynaldo Rodriguez', 5, 1, 1, 0, 5),
  ('carpintero', 59, 'David Tereses', 5, 1, 1, null, 5),
  ('luna', 60, 'Josmar Diaz', 5, 1, 1, null, 5),
  ('coloner-cat', 61, 'Miguel Bolivar', 5, 1, 0, null, 5),
  ('rosendo', 62, 'Jose Laya', 5, 1, 0, 2, 3),
  ('agata', 63, 'Adony Perez / Edgar Garcia', 5, 2, 0, 0, 5),
  ('catalina', 64, 'Josmar Diaz / Eliezer Rincon', 5, 2, 0, 4, 1),
  ('el-comandante', 65, 'Sebastian Ceballos / Eliezer Cordova', 5, 2, 0, 3, 2),
  ('pura-candela', 66, 'Beiker Theresse', 5, 2, 0, 1, 4),
  ('tacomita', 67, 'Ezequiel Tosta', 5, 3, 3, 0, 5),
  ('sucre', 68, 'Luis Rojas / Jose Romero', 5, 3, 1, 2, 3),
  ('san-miguel', 69, 'Gustavo Guacaran / Gabriel Palacios', 5, 4, 2, 1, 4),
  ('camara', 70, 'Jose Leones', 4, 0, 0, null, 4),
  ('senorita', 71, 'Wilson Llovera', 4, 0, 0, null, 4),
  ('reina-valera', 72, 'Jose Antonio Otero', 4, 0, 0, 4, null),
  ('picasso', 73, 'Augusto Morgado', 4, 1, 2, 3, 1),
  ('la-thermo-king', 74, 'Gabriel Medina', 4, 1, 1, 0, 4),
  ('zambito', 75, 'Harold Alarcon', 4, 1, 1, 1, 3),
  ('sapoara', 76, 'Manuel Pomonti / Wilber Sandoval', 4, 1, 0, -1, 5),
  ('santa', 77, 'Edgardo Espinoza', 4, 2, 0, 4, null),
  ('inspector-hot', 78, 'Salim Roye', 4, 3, 1, 4, 0),
  ('df-bichota', 79, 'Carlos Luis Vargas', 4, 3, 0, 6, -2),
  ('miss-suggar-bar', 80, 'Giovanni D''Alto', 4, 4, 0, 4, null),
  ('temporal', 81, 'Wilson Llovera', 3, 0, 3, 3, null),
  ('amapola', 82, 'Juan Chacon', 3, 0, 0, null, 3),
  ('bagre-rallao', 83, 'Carlos Rodriguez', 3, 0, 0, null, 3),
  ('sambo-del-cielo', 84, 'Elieser Cordova', 3, 0, 0, 3, null),
  ('miss-rio-samart', 85, 'Willians Ochoa', 3, 0, 0, 3, null),
  ('heredera', 86, 'Ruben Perez', 3, 1, 1, 3, null),
  ('cruela', 87, 'Jose Hernandez / Remso Peaspan', 3, 1, 0, 3, 0),
  ('don-paco-cat', 88, 'Juan Berroteran / Marcos Castillo', 3, 1, 0, 0, 3),
  ('galilea', 89, 'Gustavo Vasquez / Keniberth Mota', 3, 1, 0, 0, 3),
  ('danto', 90, 'Jaime Asuaje', 3, 1, 0, 3, null),
  ('sombrero-negro', 91, 'Freddy Borrego', 3, 1, 0, 3, null),
  ('fruta-de-pan', 92, 'Remso Peaspan', 3, 1, 0, 3, null),
  ('bella-de-hierro', 93, 'Juan Exposito', 3, 2, 1, null, 3),
  ('shumeiker', 94, 'Juan Olivo', 3, 2, 1, 3, 0),
  ('concha-e-pina', 95, 'Maximo Novoa', 3, 2, 1, 3, null),
  ('helicoide', 96, 'Jaiime Azuaje', 3, 2, 0, 2, 1),
  ('el-caballo-de-dios', 97, 'Eduardo Gonzalez / Jose Miguel Laya', 3, 2, 0, 3, 0),
  ('la-cobra', 98, 'Nick Romero', 3, 4, 1, 3, 0),
  ('pelo-rubio', 99, 'Carlos Sequera', 2, 0, 2, null, 2),
  ('princesa-bianca', 100, 'Juan Niño', 2, 0, 0, 2, null),
  ('princesa-gun', 101, 'Alejandro Milano', 2, 0, 0, 2, null),
  ('sombrero-negro-2', 102, 'Freddy Borrego', 2, 1, 0, 2, null),
  ('tap-ichi', 103, 'Josue Mendoza', 2, 1, 0, 2, null),
  ('candelaria', 104, 'Anibal Perez / Santiago Otero', 2, 2, 1, 4, -2),
  ('la-diablita', 105, 'Rogelio Santana', 2, 2, 1, null, 2),
  ('paris', 106, 'Yovany Zerpa', 2, 2, 1, 2, null),
  ('king', 107, 'Manuel Piña', 2, 2, 0, null, 2),
  ('maria-clara', 108, 'Kevyn Hernandez', 2, 2, 0, null, 2),
  ('rpg', 109, 'Jhonathan Diaz', 2, 3, 1, 0, 2),
  ('caudillo', 110, 'Luis Rodriguez', 1, 0, 0, 1, null),
  ('coqueta-cat', 111, 'Carlos Luis Sequera', 1, 0, 0, 1, null),
  ('danto-2', 112, 'Jaime Asuaje', 1, 0, 0, 1, null),
  ('falso-abierto', 113, 'Daniel Vargas', 1, 0, 0, 1, null),
  ('lady-di', 114, 'Lucas Velazquez', 1, 0, 0, 1, null),
  ('maria-ines', 115, 'Isaac Falcon', 1, 0, 0, 1, null),
  ('sheriff-gg', 116, 'Edgar Garcia', 1, 0, 0, 1, null),
  ('ana-paleta', 117, 'Alejandro Rodriguez / Sebastian Davila', 1, 1, 1, 3, -2),
  ('guanaco-spark', 118, 'Jorge Viñalez', 1, 1, 0, 1, null),
  ('maxima', 119, 'Jose Romero / Juan Saavedra', 1, 2, 1, 5, -4),
  ('colorado', 120, 'David Theresse / Juan Ramirez', 1, 4, 0, -1, 2),
  ('heredera-dominguera-ranch', 121, 'Joansy Gonzales', 1, 4, 0, 4, -3),
  ('rey-gasper', 122, 'Luis Clavo', 0, 0, 0, null, 0),
  ('bf-oakley-metallic-cat', 125, 'Daniel Aponte', 0, 1, 0, 0, null),
  ('el-pollero', 126, 'Remso Peaspan', 0, 1, 0, 0, null),
  ('yubiry', 127, 'Edgar Martinez / Juan Carlos Leonardi - Ivan Corona', 0, 4, 0, 3, -3),
  ('rosario', 128, 'Sebastian Davila / Javier Moreno', -1, 0, 1, -3, 2),
  ('sf-platinum-metallic', 129, 'Jose Solorzano / Felix Arevalo', -1, 0, 0, 4, -5),
  ('pedro-caiman', 130, 'Miguel Vazquez / Jesus Salazar', -1, 1, 0, 0, -1),
  ('rummy-king', 131, 'Jonathan Bohorquez', -1, 1, 0, null, -1),
  ('ultima-soga', 132, 'Luis Enrique Viera', -2, 0, 1, -4, 2),
  ('lady-mariana', 133, 'Alfredo Garcia', -2, 1, 0, null, -2),
  ('metal-k', 134, 'Leonardo Gutierrez', -2, 1, 0, null, -2),
  ('juez-de-llano', 135, 'Gregorio Jimenez', -2, 2, 0, null, -2),
  ('sangre-dulce', 136, 'Ruben Perez', -3, 0, 0, null, -3),
  ('tilin-mostrico-junior', 137, 'Ezequiel Sequera', -3, 0, 0, -3, null),
  ('catalino-high-brown', 138, 'Jaiker Travieso', -3, 1, 1, null, -3),
  ('negociante', 139, 'Freddy Borrego', -5, 0, 0, null, -5),
  ('mia-peppy', 140, 'Alejandro Esposito', -9, 0, 0, -9, null)
) as v(slug, pos, ath, e, nn, sp, c1, c2)
join public.horses h on h.slug = v.slug;
insert into public.event_results (event_id, horse_id, pts_e, pts_n, pts_sp)
select ev.id, h.id, v.e, coalesce(v.nn, 0), coalesce(v.sp, 0)
from (values
  ('monarca', 7, 0, 0),
  ('ludopata', 8, 1, 0),
  ('rosa-del-desierto', 7, 0, 0),
  ('gaviota', 4, 0, 2),
  ('linda-rosa', 6, 0, 1),
  ('diamante-rojo', 6, 0, 0),
  ('pelotero-gun', 5, 1, 0),
  ('buena-vibra', 5, 0, 1),
  ('dulce-pecado', 6, 0, 1),
  ('turbo-rosteer', 4, 0, 0),
  ('el-jocker', 7, 0, 1),
  ('borjas', 5, 0, 0),
  ('camara-rey', 4, 0, 0),
  ('rey-melao', 2, 0, 0),
  ('sacramento', 2, 0, 0),
  ('emely-rouse', 6, 1, 0),
  ('king-llanero', 6, 0, 0),
  ('katana', 6, 1, 0),
  ('40-rbb', 1, 0, 1),
  ('inocente', 2, 0, 1),
  ('noche-de-boda', 3, 0, 0),
  ('buen-pollo', 5, 0, 0),
  ('la-india', 4, 1, 0),
  ('la-tormenta', 3, 2, 1),
  ('bichota', 4, 2, 0),
  ('sf-metallic-orphan', 5, 1, 0),
  ('yayita', 4, 0, 1),
  ('alazne', 5, 0, 0),
  ('pepona-cat', 3, 0, 0),
  ('mr-black', 4, 0, 1),
  ('pleitecito', 3, 1, 0),
  ('clandestina', 5, 1, 0),
  ('talisman', 4, 0, 0),
  ('adonis', 4, 1, 1),
  ('el-cheque', 4, 1, 0),
  ('iron-cat-hig-iron-cat', 2, 1, 0),
  ('vicentico', 2, 2, 0),
  ('astroboy', 4, 4, 0),
  ('rescatado-hot-cat', 3, 2, 0),
  ('delta-gum', 6, 0, 1),
  ('el-cabito', 6, 0, 1),
  ('don-marcial', 1, 0, 0),
  ('la-cuaima', 6, 0, 0),
  ('princesa-aurora', 6, 0, 0),
  ('jhon-deere', 7, 0, 0),
  ('alcayata', 4, 1, 0),
  ('la-churrita', 3, 1, 0),
  ('la-kuty', 1, 1, 0),
  ('triple-r', 2, 3, 0),
  ('antonieta', 3, 0, 0),
  ('mini-shower', 3, 0, 1),
  ('mr-cool-cat', 5, 0, 0),
  ('capachurrita', 0, 0, 0),
  ('rosendo', 2, 1, 0),
  ('agata', 0, 1, 0),
  ('catalina', 4, 0, 0),
  ('el-comandante', 3, 2, 0),
  ('pura-candela', 1, 0, 0),
  ('tacomita', 0, 0, 0),
  ('sucre', 2, 1, 0),
  ('san-miguel', 1, 4, 0),
  ('reina-valera', 4, 0, 0),
  ('picasso', 3, 0, 2),
  ('la-thermo-king', 0, 0, 0),
  ('zambito', 1, 0, 0),
  ('sapoara', -1, 0, 0),
  ('santa', 4, 2, 0),
  ('inspector-hot', 4, 1, 1),
  ('df-bichota', 6, 0, 0),
  ('miss-suggar-bar', 4, 4, 0),
  ('temporal', 3, 0, 3),
  ('sambo-del-cielo', 3, 0, 0),
  ('miss-rio-samart', 3, 0, 0),
  ('heredera', 3, 1, 1),
  ('cruela', 3, 0, 0),
  ('don-paco-cat', 0, 1, 0),
  ('galilea', 0, 1, 0),
  ('danto', 3, 1, 0),
  ('sombrero-negro', 3, 1, 0),
  ('fruta-de-pan', 3, 1, 0),
  ('shumeiker', 3, 0, 0),
  ('concha-e-pina', 3, 2, 1),
  ('helicoide', 2, 1, 0),
  ('el-caballo-de-dios', 3, 2, 0),
  ('la-cobra', 3, 1, 0),
  ('princesa-bianca', 2, 0, 0),
  ('princesa-gun', 2, 0, 0),
  ('sombrero-negro-2', 2, 1, 0),
  ('tap-ichi', 2, 1, 0),
  ('candelaria', 4, 0, 0),
  ('paris', 2, 2, 1),
  ('rpg', 0, 1, 1),
  ('caudillo', 1, 0, 0),
  ('coqueta-cat', 1, 0, 0),
  ('danto-2', 1, 0, 0),
  ('falso-abierto', 1, 0, 0),
  ('lady-di', 1, 0, 0),
  ('maria-ines', 1, 0, 0),
  ('sheriff-gg', 1, 0, 0),
  ('ana-paleta', 3, 1, 1),
  ('guanaco-spark', 1, 1, 0),
  ('maxima', 5, 1, 0),
  ('colorado', -1, 2, 0),
  ('heredera-dominguera-ranch', 4, 1, 0),
  ('bf-oakley-metallic-cat', 0, 1, 0),
  ('el-pollero', 0, 1, 0),
  ('yubiry', 3, 2, 0),
  ('rosario', -3, 0, 0),
  ('sf-platinum-metallic', 4, 0, 0),
  ('pedro-caiman', 0, 0, 0),
  ('ultima-soga', -4, 0, 1),
  ('tilin-mostrico-junior', -3, 0, 0),
  ('mia-peppy', -9, 0, 0)
) as v(slug, e, nn, sp)
join public.horses h on h.slug = v.slug
join public.events ev on ev.season = 2026 and ev.stage = 'cf1'
on conflict (event_id, horse_id) do update set pts_e = excluded.pts_e, pts_n = excluded.pts_n, pts_sp = excluded.pts_sp;
insert into public.event_results (event_id, horse_id, pts_e, pts_n, pts_sp)
select ev.id, h.id, v.e, coalesce(v.nn, 0), coalesce(v.sp, 0)
from (values
  ('monarca', 7, 0, 2),
  ('ludopata', 5, 1, 1),
  ('rosa-del-desierto', 4, 0, 0),
  ('gaviota', 7, 1, 0),
  ('linda-rosa', 5, 1, 1),
  ('diamante-rojo', 4, 0, 0),
  ('pelotero-gun', 5, 1, 1),
  ('buena-vibra', 4, 0, 0),
  ('dulce-pecado', 3, 0, 0),
  ('turbo-rosteer', 5, 0, 1),
  ('el-jocker', 2, 0, 0),
  ('borjas', 4, 0, 0),
  ('camara-rey', 5, 0, 0),
  ('rey-melao', 7, 0, 0),
  ('sacramento', 7, 0, 0),
  ('emely-rouse', 3, 0, 0),
  ('king-llanero', 3, 2, 0),
  ('katana', 3, 2, 1),
  ('40-rbb', 7, 0, 1),
  ('inocente', 6, 0, 1),
  ('noche-de-boda', 5, 0, 0),
  ('buen-pollo', 3, 1, 2),
  ('la-india', 4, 0, 0),
  ('la-tormenta', 5, 0, 0),
  ('bichota', 4, 0, 0),
  ('sf-metallic-orphan', 3, 1, 0),
  ('yayita', 3, 0, 0),
  ('alazne', 2, 0, 0),
  ('pepona-cat', 4, 0, 0),
  ('novia-de-pueblo', 7, 1, 2),
  ('mr-black', 3, 1, 0),
  ('pleitecito', 4, 0, 1),
  ('clandestina', 2, 0, 0),
  ('talisman', 3, 1, 0),
  ('adonis', 3, 1, 0),
  ('el-cheque', 3, 1, 1),
  ('iron-cat-hig-iron-cat', 5, 1, 0),
  ('vicentico', 5, 0, 0),
  ('astroboy', 3, 1, 0),
  ('rescatado-hot-cat', 4, 4, 0),
  ('don-marcial', 5, 0, 0),
  ('merlina', 6, 0, 0),
  ('jhon-deere', -1, 1, 0),
  ('alcayata', 2, 1, 1),
  ('la-churrita', 3, 1, 0),
  ('la-kuty', 5, 1, 0),
  ('triple-r', 4, 0, 0),
  ('anastacia-grey', 5, 0, 1),
  ('antonieta', 2, 0, 1),
  ('mini-shower', 2, 0, 0),
  ('malandro', 5, 0, 0),
  ('reina-teresa', 5, 0, 0),
  ('capachurrita', 5, 1, 1),
  ('carpintero', 5, 1, 1),
  ('luna', 5, 1, 1),
  ('coloner-cat', 5, 1, 0),
  ('rosendo', 3, 0, 0),
  ('agata', 5, 1, 0),
  ('catalina', 1, 2, 0),
  ('el-comandante', 2, 0, 0),
  ('pura-candela', 4, 2, 0),
  ('tacomita', 5, 3, 3),
  ('sucre', 3, 2, 1),
  ('san-miguel', 4, 0, 2),
  ('camara', 4, 0, 0),
  ('senorita', 4, 0, 0),
  ('picasso', 1, 1, 0),
  ('la-thermo-king', 4, 1, 1),
  ('zambito', 3, 1, 1),
  ('sapoara', 5, 1, 0),
  ('inspector-hot', 0, 2, 0),
  ('df-bichota', -2, 3, 0),
  ('amapola', 3, 0, 0),
  ('bagre-rallao', 3, 0, 0),
  ('cruela', 0, 1, 0),
  ('don-paco-cat', 3, 0, 0),
  ('galilea', 3, 0, 0),
  ('bella-de-hierro', 3, 2, 1),
  ('shumeiker', 0, 2, 1),
  ('helicoide', 1, 1, 0),
  ('el-caballo-de-dios', 0, 0, 0),
  ('la-cobra', 0, 3, 1),
  ('pelo-rubio', 2, 0, 2),
  ('candelaria', -2, 2, 1),
  ('la-diablita', 2, 2, 1),
  ('king', 2, 2, 0),
  ('maria-clara', 2, 2, 0),
  ('rpg', 2, 2, 0),
  ('ana-paleta', -2, 0, 0),
  ('maxima', -4, 1, 1),
  ('colorado', 2, 2, 0),
  ('heredera-dominguera-ranch', -3, 3, 0),
  ('rey-gasper', 0, 0, 0),
  ('yubiry', -3, 2, 0),
  ('rosario', 2, 0, 1),
  ('sf-platinum-metallic', -5, 0, 0),
  ('pedro-caiman', -1, 1, 0),
  ('rummy-king', -1, 1, 0),
  ('ultima-soga', 2, 0, 0),
  ('lady-mariana', -2, 1, 0),
  ('metal-k', -2, 1, 0),
  ('juez-de-llano', -2, 2, 0),
  ('sangre-dulce', -3, 0, 0),
  ('catalino-high-brown', -3, 1, 1),
  ('negociante', -5, 0, 0)
) as v(slug, e, nn, sp)
join public.horses h on h.slug = v.slug
join public.events ev on ev.season = 2026 and ev.stage = 'cf2'
on conflict (event_id, horse_id) do update set pts_e = excluded.pts_e, pts_n = excluded.pts_n, pts_sp = excluded.pts_sp;
commit;
