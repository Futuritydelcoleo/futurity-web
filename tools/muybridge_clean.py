"""Limpia las siluetas de Muybridge: quita al jinete y las líneas del suelo, alinea los
fotogramas por el torso y genera una tira PNG (fotogramas en horizontal, blanco con alfa)."""
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

D = r'C:/Users/Christian/AppData/Local/Temp/futsp/muybridge'
# (x_anca, x_cruz) por fotograma: se borra lo que sobresale sobre la recta del lomo entre ambos
CUTS = {1: (172, 240), 2: (180, 245), 3: (185, 250), 4: (178, 248), 5: (175, 248), 6: (178, 250),
        7: (183, 255), 8: (178, 245), 9: (175, 245), 10: (180, 250), 11: (180, 250)}


def top_y(m, x):
    ys = np.where(m[:, x])[0]
    return int(ys[0]) if len(ys) else None


cleaned = []
for i in range(1, 12):
    m = np.load(f'{D}/f{i:02d}_raw.npy').copy()
    H, W = m.shape
    xa, xb = CUTS[i]
    # nivel del lomo justo detrás y delante del jinete (usar la mediana de unas columnas)
    ya = int(np.median([top_y(m, x) for x in range(xa - 6, xa + 1) if top_y(m, x) is not None]))
    yb = int(np.median([top_y(m, x) for x in range(xb, xb + 7) if top_y(m, x) is not None]))
    for x in range(xa, xb + 1):
        yl = ya + (yb - ya) * (x - xa) / (xb - xa)
        m[: int(round(yl)), x] = False
    # restos de las piernas del jinete y la montura: "apertura" solo en la franja del lomo
    xs0, xs1 = xa - 10, xb + 18
    ys0, ys1 = max(0, min(ya, yb) - 12), max(ya, yb) + 22
    zone = Image.fromarray((m[ys0:ys1, xs0:xs1] * 255).astype(np.uint8))
    zone = zone.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7))
    m[ys0:ys1, xs0:xs1] = np.asarray(zone) > 128
    # suelo: una franja fina horizontal pegada a los cascos -> se quita si no tiene "pata" encima
    low = H - 30
    keep = m.copy()
    for y in range(low, H):
        above = m[max(0, y - 6), :]
        support = above | np.roll(above, 2) | np.roll(above, -2)
        keep[y] &= support
    m = keep
    # suavizar bordes y quitar restos sueltos
    im = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(3))
    big = np.zeros((300, 420), bool)  # lienzo común con margen para el corrimiento
    sm = np.asarray(im) > 128
    big[20:20 + sm.shape[0], 30:30 + sm.shape[1]] = sm
    cleaned.append(big)

# Alinear: centroide del torso (filas centrales del cuerpo, sin patas ni cabeza)
cents = []
for m in cleaned:
    ys, xs = np.where(m)
    y_mid = np.percentile(ys, 35)
    band = m[int(y_mid) - 12: int(y_mid) + 12]
    bys, bxs = np.where(band)
    cents.append((bxs.mean(), int(y_mid) - 12 + bys.mean()))
cx0 = np.mean([c[0] for c in cents]); cy0 = np.mean([c[1] for c in cents])

# lienzo común
PAD = 6
shifted = []
for m, (cx, cy) in zip(cleaned, cents):
    dx, dy = int(round(cx0 - cx)), int(round(cy0 - cy))
    s = np.zeros_like(m)
    H, W = m.shape
    ys, xs = np.where(m)
    ys2, xs2 = ys + dy, xs + dx
    ok = (ys2 >= 0) & (ys2 < H) & (xs2 >= 0) & (xs2 < W)
    s[ys2[ok], xs2[ok]] = True
    shifted.append(s)
union = np.any(shifted, axis=0)
ys, xs = np.where(union)
X0, X1, Y0, Y1 = xs.min() - PAD, xs.max() + PAD, ys.min() - PAD, ys.max() + PAD
fw, fh = X1 - X0, Y1 - Y0
strip = Image.new('RGBA', (fw * 11, fh), (0, 0, 0, 0))
for i, s in enumerate(shifted):
    a = Image.fromarray((s[Y0:Y1, X0:X1] * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    fr = Image.new('RGBA', (fw, fh), (255, 255, 255, 0)); fr.putalpha(a)
    strip.alpha_composite(fr, (i * fw, 0))
strip.save(D + '/gallop_strip.png', optimize=True)

# métricas útiles para colocar el sprite: nariz, nalga, cascos (en coords del fotograma)
meta = {'frames': 11, 'fw': int(fw), 'fh': int(fh)}
noses, rumps, feet = [], [], []
for s in shifted:
    c = s[Y0:Y1, X0:X1]
    ys, xs = np.where(c)
    noses.append(int(xs.max())); feet.append(int(ys.max()))
    torso = c[int(np.percentile(ys, 30)): int(np.percentile(ys, 45))]
    rumps.append(int(np.where(torso)[1].min()))
meta.update(nose=float(np.mean(noses)), feet=float(np.max(feet)), rump=float(np.mean(rumps)))
json.dump(meta, open(D + '/gallop_meta.json', 'w'))
print(meta)

# hoja de control
sheet = Image.new('RGB', (fw * 4, fh * 3), (16, 99, 42))
for i in range(11):
    fr = strip.crop((i * fw, 0, (i + 1) * fw, fh))
    cell = Image.new('RGB', (fw, fh), (16, 99, 42)); cell.paste(fr, (0, 0), fr)
    ImageDraw.Draw(cell).text((4, 4), f'#{i+1}', fill='yellow')
    sheet.paste(cell, ((i % 4) * fw, (i // 4) * fh))
sheet.save(D + '/clean_sheet.png')
