"""Lee el PDF 'ACUMULADO FUTURO 1 Y 2' por posición de cada palabra: cada palabra se asigna
a la fila (N°) más cercana y a su columna por la x, así se respetan las celdas vacías
(caballos que corrieron una sola válida) y los nombres partidos en dos renglones."""
import json, re
import pymupdf

D = r'C:/Users/Christian/AppData/Local/Temp/futsp/pdf'
doc = pymupdf.open(D + '/acumulado.pdf')

TEXT_COLS = [('equino', 45, 142), ('propietario', 142, 255), ('atleta', 255, 405), ('caballeriza', 405, 515)]
NUM_COLS = {  # centro x de cada columna numérica
    'cf1_pts': 525, 'cf1_nul': 547.5, 'cf1_sp': 570.5,
    'cf2_pts': 593, 'cf2_nul': 616, 'cf2_sp': 639,
    'tot_pts': 666, 'tot_nul': 698, 'tot_sp': 730,
}

rows = []
for page in doc:
    words = page.get_text('words')
    anchors = [w for w in words if w[0] < 40 and re.fullmatch(r'\d+', w[4])]
    if not anchors:
        continue
    ay = [((a[1] + a[3]) / 2, int(a[4])) for a in anchors]
    top = min(y for y, _ in ay) - 9
    data = {n: {'n': n, **{c: [] for c, *_ in TEXT_COLS}, **{k: None for k in NUM_COLS}} for _, n in ay}
    # números: palabra por palabra (cada uno cae en su columna por la x)
    for w in words:
        if w in anchors or not re.fullmatch(r'-?\d+', w[4]):
            continue
        xc = (w[0] + w[2]) / 2; yc = (w[1] + w[3]) / 2
        if xc <= 515 or yc < top:
            continue
        y, n = min(ay, key=lambda a: abs(a[0] - yc))
        if abs(y - yc) <= 9:
            data[n][min(NUM_COLS, key=lambda k: abs(NUM_COLS[k] - xc))] = int(w[4])
    # textos: cada celda es un renglón propio; va a la columna cuyo centro está más cerca
    CENTERS = {'equino': 76, 'propietario': 172, 'atleta': 300, 'caballeriza': 443}
    for block in page.get_text('dict')['blocks']:
        for line in block.get('lines', []):
            txt = ''.join(sp['text'] for sp in line['spans']).strip()
            x0, y0, x1, y1 = line['bbox']
            xc, yc = (x0 + x1) / 2, (y0 + y1) / 2
            if not txt or xc > 515 or x0 < 40 or yc < top:
                continue
            y, n = min(ay, key=lambda a: abs(a[0] - yc))
            if abs(y - yc) > 9:
                continue
            data[n][min(CENTERS, key=lambda c: abs(CENTERS[c] - xc))].append(txt)
    for r in data.values():
        for c, *_ in TEXT_COLS:
            r[c] = ' '.join(r[c]).strip()
        rows.append(r)

rows.sort(key=lambda r: r['n'])
json.dump(rows, open(D + '/rows.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# Controles
bad = []
for r in rows:
    if not r['equino']:
        continue
    parts = [r[f'cf{i}_pts'] for i in (1, 2) if r[f'cf{i}_pts'] is not None]
    if r['tot_pts'] is None or sum(parts) != r['tot_pts']:
        bad.append((r['n'], r['equino'], r['cf1_pts'], r['cf2_pts'], r['tot_pts']))
print('filas', len(rows), '| sin nombre', [r['n'] for r in rows if not r['equino']])
print('total != CF1+CF2:', bad)
print('solo CF1:', sum(1 for r in rows if r['equino'] and r['cf1_pts'] is not None and r['cf2_pts'] is None),
      '| solo CF2:', sum(1 for r in rows if r['equino'] and r['cf2_pts'] is not None and r['cf1_pts'] is None),
      '| ambas:', sum(1 for r in rows if r['equino'] and r['cf1_pts'] is not None and r['cf2_pts'] is not None))
for n in (29, 30, 41, 91, 102, 90, 112, 127):
    r = rows[n - 1]; print(n, r['equino'], '|', r['propietario'], '|', r['atleta'], '|', r['caballeriza'], '|', r['cf1_pts'], r['cf2_pts'], r['tot_pts'])
