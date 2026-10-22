"""Etiqueta las partes blancas conectadas de la silueta del logo (yegua, potro, fragmentos)."""
from collections import deque
import numpy as np
from PIL import Image, ImageDraw

SRC = r'C:/Users/Christian/AppData/Roaming/Claude/scratch-workspaces/c4e6fdd6-5abd-4c5f-bc95-35a730f5cc72/58a0c2fd-6598-4486-953b-6aea26b9640a/scratch-2026-10-22-1e374d/futurity-web/public/brand/horses-white.png'
OUT = r'C:/Users/Christian/AppData/Local/Temp/futsp'

al = np.asarray(Image.open(SRC))[..., 3]
a = al > 235
a[419:, :] = False  # sin la línea de tierra
H, W = a.shape
lab = np.zeros((H, W), np.int32)
n = 0
sizes = []
for y in range(H):
    for x in range(W):
        if a[y, x] and not lab[y, x]:
            n += 1
            q = deque([(y, x)]); lab[y, x] = n; cnt = 0; xs = [x, x]; ys = [y, y]
            while q:
                cy, cx = q.popleft(); cnt += 1
                xs[0] = min(xs[0], cx); xs[1] = max(xs[1], cx); ys[0] = min(ys[0], cy); ys[1] = max(ys[1], cy)
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < H and 0 <= nx < W and a[ny, nx] and not lab[ny, nx]:
                        lab[ny, nx] = n; q.append((ny, nx))
            sizes.append((n, cnt, xs, ys))

sizes.sort(key=lambda s: -s[1])
for s in sizes[:15]:
    print(s)
np.save(OUT + '/labels.npy', lab)

colors = [(230, 60, 60), (60, 120, 230), (240, 200, 40), (160, 80, 200), (40, 200, 200), (250, 130, 30), (120, 220, 90), (255, 105, 180)]
img = Image.new('RGB', (W, H), (11, 74, 31))
px = img.load()
rank = {s[0]: i for i, s in enumerate(sizes)}
for y in range(H):
    for x in range(W):
        if lab[y, x]:
            i = rank[lab[y, x]]
            px[x, y] = colors[i] if i < len(colors) else (255, 255, 255)
img = img.crop((100, 150, 510, 450)).resize((820, 600), Image.NEAREST)
d = ImageDraw.Draw(img)
for i, s in enumerate(sizes[:8]):
    d.text(((s[2][0] - 100) * 2, (s[3][0] - 150) * 2 - 10), str(i), fill='white')
img.save(OUT + '/components.png')
