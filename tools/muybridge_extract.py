"""Extrae los 11 fotogramas de galope de The Horse in Motion (Muybridge, 1878, dominio público)
como siluetas: separa el caballo del fondo y la cuadrícula, y quita al jinete."""
import json, sys
from collections import deque
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

D = r'C:/Users/Christian/AppData/Local/Temp/futsp/muybridge'
sheet = np.asarray(Image.open(D + '/horse_in_motion.jpg').convert('L')).astype(np.int16)

# Celdas (x0, y0, x1, y1) en la lámina de 1536×952: 4 columnas × 3 filas; la 12 es de pie.
XS = [(28, 383), (402, 756), (774, 1130), (1148, 1504)]
YS = [(32, 260), (277, 501), (519, 746)]
cells = [(x0, y0, x1, y1) for (y0, y1) in YS for (x0, x1) in XS][:11]

# Recorte manual del jinete por fotograma: (x_anca, x_cruz) en coordenadas de la celda.
# Se borra todo lo que sobresale por encima de la recta del lomo entre esos dos puntos.
RIDER = json.load(open(D + '/rider_cuts.json')) if len(sys.argv) > 1 else {}


def largest_component(mask):
    H, W = mask.shape
    lab = np.zeros((H, W), np.int32); best = (0, 0); n = 0
    for y in range(H):
        for x in range(W):
            if mask[y, x] and not lab[y, x]:
                n += 1; q = deque([(y, x)]); lab[y, x] = n; c = 0
                while q:
                    cy, cx = q.popleft(); c += 1
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < H and 0 <= nx < W and mask[ny, nx] and not lab[ny, nx]:
                            lab[ny, nx] = n; q.append((ny, nx))
                if c > best[1]: best = (n, c)
    return lab == best[0]


frames = []
for i, (x0, y0, x1, y1) in enumerate(cells, 1):
    g = sheet[y0:y1, x0:x1]
    dark = g < 70  # el caballo es casi negro; la cuadrícula y el suelo son grises
    m = Image.fromarray((dark * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    m = largest_component(np.asarray(m) > 128)
    frames.append(m)
    np.save(f'{D}/f{i:02d}_raw.npy', m)

# Hoja de control: silueta blanca sobre verde + perfil superior
cw, ch = 356, 228
out = Image.new('RGB', (cw * 4, ch * 3), (16, 99, 42))
for i, m in enumerate(frames):
    im = Image.fromarray((m * 255).astype(np.uint8)).convert('RGB')
    cell = Image.new('RGB', (cw, ch), (16, 99, 42)); cell.paste((255, 255, 255), mask=Image.fromarray((m * 255).astype(np.uint8)))
    d = ImageDraw.Draw(cell)
    for x in range(0, cw, 25):
        d.line([(x, 0), (x, 8)], fill=(255, 255, 0)); d.text((x + 1, 8), str(x), fill=(255, 255, 0))
    for y in range(0, ch, 25):
        d.line([(0, y), (8, y)], fill=(255, 255, 0)); d.text((9, y - 5), str(y), fill=(255, 255, 0))
    d.text((cw - 30, ch - 14), f'#{i+1}', fill='yellow')
    out.paste(cell, ((i % 4) * cw, (i // 4) * ch))
out.save(D + '/raw_sheet.png')
print('ok')
