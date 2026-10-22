"""Genera el SQL para cargar el acumulado CF1/CF2 2026 del PDF en Supabase:
caballos nuevos, tabla acumulada (con puntos por válida) y resultados por válida."""
import json, re, unicodedata

T = r'C:/Users/Christian/AppData/Local/Temp/futsp/pdf'
rows = [r for r in json.load(open(T + '/rows.json', encoding='utf-8')) if r['equino']]
db = json.load(open(T + '/horses_db.json', encoding='utf-8'))


def norm(s):
    s = unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '', s)


def slugify(s):
    s = unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


ACR = {'HH', 'FB', 'JD', 'LM', 'SG', 'RP', 'NJ', 'EA', 'FR', 'JC', 'JMC', 'JIC', 'CLS', 'VP', 'SL', 'AJR', 'MVP', 'RBB',
       'GG', 'SF', 'DF', 'MR', 'MTO', 'MM', 'AO', 'CR', 'RPG', 'II', 'III'}
LOWER = {'de', 'del', 'y', 'e'}


def title(s):
    s = re.sub(r'\s*/\s*', ' / ', s)  # "FUNEZ/CESAR" -> "FUNEZ / CESAR"
    out = []
    for i, w in enumerate(s.split()):
        core = re.sub(r'[^A-ZÑ]', '', w.upper())
        if core in ACR or re.match(r'^[A-ZÑ]\.[A-ZÑ]', w.upper()):  # siglas: HH, C.A., F.A, M.V.
            out.append(w.upper())
        elif i > 0 and w.lower() in LOWER:
            out.append(w.lower())
        else:
            out.append('-'.join(p[:1].upper() + p[1:].lower() for p in w.split('-')))
    s = ' '.join(out)
    return re.sub(r'\s*/\s*', ' / ', s).replace("D'alto", "D'Alto")


# Coincidencias con caballos ya cargados (nombres escritos distinto en el PDF)
ALIASES = {'playtecito': 'pleitecito', 'misssugarbar': 'miss-suggar-bar', 'princesagum': 'princesa-gun',
           'metalloakley': 'bf-oakley-metallic-cat', '4orbb': '40-rbb'}
by_norm = {norm(h['name']): h for h in db}
by_slug = {h['slug']: h for h in db}

seen = {}
matched, created, dupes = [], [], []
entries = []
for r in rows:
    key = norm(r['equino'])
    owner, stable = title(r['propietario']), title(r['caballeriza'])
    h = by_slug.get(ALIASES[key]) if key in ALIASES else by_norm.get(key)
    if h:
        slug = h['slug']
    else:
        slug = slugify(title(r['equino']))
        if slug in seen and seen[slug]['owner_n'] != norm(owner):
            slug = f"{slug}-{slugify(stable)}"  # mismo nombre, otro caballo
    if slug in seen:
        if seen[slug]['owner_n'] == norm(owner):
            dupes.append((r['n'], r['equino'], seen[slug]['n']))
            continue
    seen[slug] = {'n': r['n'], 'owner_n': norm(owner)}
    if h:
        matched.append((r['n'], r['equino'], h['name']))
    else:
        created.append((slug, title(r['equino']), owner, stable))
    entries.append({**r, 'slug': slug, 'owner': owner, 'stable': stable, 'athletes': title(r['atleta']), 'existing': bool(h)})

q = lambda s: "'" + s.replace("'", "''") + "'"
n = lambda v: 'null' if v is None else str(v)
sql = ['-- Acumulado Caballo del Futuro 1 y 2 – 2026 (PDF de la organización). Generado por tools/pdf_load.py', 'begin;']
sql.append('alter table public.standings add column if not exists cf1_pts int, add column if not exists cf2_pts int;')
for slug, name, owner, stable in created:
    sql.append(f"insert into public.horses (name, slug, birth_year, owner, stable) values ({q(name)}, {q(slug)}, 2021, {q(owner)}, {q(stable)}) "
               f"on conflict (slug) do update set name = excluded.name, owner = excluded.owner, stable = excluded.stable;")
for e in entries:
    if e['existing']:
        sql.append(f"update public.horses set owner = coalesce(owner, {q(e['owner'])}), stable = coalesce(stable, {q(e['stable'])}) where slug = {q(e['slug'])};")
sql.append('delete from public.standings where season = 2026;')
vals = ',\n  '.join(
    f"({q(e['slug'])}, {e['n']}, {q(e['athletes'])}, {e['tot_pts']}, {n(e['tot_nul'])}, {n(e['tot_sp'])}, {n(e['cf1_pts'])}, {n(e['cf2_pts'])})"
    for e in entries)
sql.append(f"""insert into public.standings (season, horse_id, position, athletes, pts_e, pts_n, pts_sp, cf1_pts, cf2_pts)
select 2026, h.id, v.pos, v.ath, v.e, coalesce(v.nn, 0), coalesce(v.sp, 0), v.c1, v.c2
from (values
  {vals}
) as v(slug, pos, ath, e, nn, sp, c1, c2)
join public.horses h on h.slug = v.slug;""")
# Resultados por válida: se conservan los puestos oficiales publicados (podio CF2)
for stage, pre in (('cf1', 'cf1'), ('cf2', 'cf2')):
    ev = [e for e in entries if e[f'{pre}_pts'] is not None]
    vals = ',\n  '.join(f"({q(e['slug'])}, {e[f'{pre}_pts']}, {n(e[f'{pre}_nul'])}, {n(e[f'{pre}_sp'])})" for e in ev)
    sql.append(f"""insert into public.event_results (event_id, horse_id, pts_e, pts_n, pts_sp)
select ev.id, h.id, v.e, coalesce(v.nn, 0), coalesce(v.sp, 0)
from (values
  {vals}
) as v(slug, e, nn, sp)
join public.horses h on h.slug = v.slug
join public.events ev on ev.season = 2026 and ev.stage = '{stage}'
on conflict (event_id, horse_id) do update set pts_e = excluded.pts_e, pts_n = excluded.pts_n, pts_sp = excluded.pts_sp;""")
sql.append('commit;')
open(T + '/load.sql', 'w', encoding='utf-8').write('\n'.join(sql) + '\n')

print('filas válidas', len(rows), '| en ranking', len(entries))
print('coinciden con caballos existentes:', len(matched))
for m in matched: print('   ', m)
print('caballos nuevos:', len(created))
print('duplicados en el PDF (mismo nombre y propietario, se deja el primero):', dupes)
print('mismo nombre, otro caballo:', [c for c in created if c[0].count('-') and any(c[0].startswith(x + '-') for x in ('heredera',))])
