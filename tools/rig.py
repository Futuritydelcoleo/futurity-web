"""Corta la silueta del logo en piezas articulables (cuerpos, muslos y cañas)
# Uso: python tools/components.py (genera labels.npy) y luego python tools/rig.py; ajustar ROOT/TMP.
genera components/heroRig.ts con cada pieza como PNG en data URI + su pivote.
En reposo (ángulos 0) las piezas reconstruyen exactamente la silueta del logo."""
import base64, io, json
import numpy as np
from PIL import Image

ROOT = r'C:/Users/Christian/AppData/Roaming/Claude/scratch-workspaces/c4e6fdd6-5abd-4c5f-bc95-35a730f5cc72/58a0c2fd-6598-4486-953b-6aea26b9640a/scratch-2026-10-22-1e374d/futurity-web'
TMP = r'C:/Users/Christian/AppData/Local/Temp/futsp'
src = np.asarray(Image.open(ROOT + '/public/brand/horses-white.png'))
alpha = src[..., 3].astype(np.float32)
lab = np.load(TMP + '/labels.npy')
H, W = lab.shape
yy, xx = np.mgrid[0:H, 0:W]

MARE, FOAL, MARE_HR, MARE_HL = 1, 3, 4, 5


def grow(mask, n=2):
    """Dilata la máscara n píxeles (para conservar el borde suave de la silueta)."""
    m = mask.copy()
    for _ in range(n):
        p = m.copy()
        p[1:] |= m[:-1]; p[:-1] |= m[1:]; p[:, 1:] |= m[:, :-1]; p[:, :-1] |= m[:, 1:]
        m = p
    return m


def left_of(points):
    """Máscara de los píxeles a la izquierda de una polilínea que baja (x en función de y)."""
    pts = sorted(points, key=lambda p: p[1])
    ys = np.array([p[1] for p in pts], float); xs = np.array([p[0] for p in pts], float)
    xline = np.interp(yy, ys, xs)
    return xx < xline


region = {}
mare = lab == MARE
foal = lab == FOAL

# ── Yegua: manos (separadas del pecho en y=322) ──
legzone = (yy >= 322) & (xx >= 338) & (xx <= 400)
fl = mare & legzone & (xx < 371)
fr = mare & legzone & (xx >= 371)
region['mare_body'] = mare & ~fl & ~fr
region['mare_fl_upper'] = fl & (yy < 375)
region['mare_fl_lower'] = fl & (yy >= 375)
region['mare_fr_upper'] = fr & (yy < 378)
region['mare_fr_lower'] = fr & (yy >= 378)
# Yegua: cañas traseras (visibles entre las patas del potro)
region['mare_hl_lower'] = lab == MARE_HL
region['mare_hr_lower'] = lab == MARE_HR

# ── Potro: patas ──
fbody_zone = yy < 351
hind_zone = (~fbody_zone) & (xx < 228)
front_zone = (~fbody_zone) & (xx > 255)
hb = foal & hind_zone & left_of([(191, 348), (176, 360), (160, 380), (160, 430)])
hf = foal & hind_zone & ~hb
ff1 = foal & front_zone & left_of([(282, 346), (290, 358), (305, 375), (308, 430)])
ff2 = foal & front_zone & ~ff1
region['foal_body'] = foal & ~hb & ~hf & ~ff1 & ~ff2
region['foal_hb_upper'] = hb & (yy < 386)
region['foal_hb_lower'] = hb & (yy >= 386)
region['foal_hf_upper'] = hf & (yy < 378)
region['foal_hf_lower'] = hf & (yy >= 378)
region['foal_ff1_upper'] = ff1 & (yy < 380)
region['foal_ff1_lower'] = ff1 & (yy >= 380)
region['foal_ff2_upper'] = ff2 & (yy < 364)
region['foal_ff2_lower'] = ff2 & (yy >= 364)

# Cada píxel suave del borde va a la pieza más cercana (para no perder el antialias).
owner = np.zeros((H, W), np.int16)
names = list(region)
for i, n in enumerate(names, 1):
    owner[region[n]] = i
soft = (alpha > 0) & (owner == 0) & (yy < 419)
for _ in range(3):
    o = owner.copy()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        sh = np.roll(np.roll(owner, dy, 0), dx, 1)
        fill = soft & (o == 0) & (sh > 0)
        o[fill] = sh[fill]
    owner = o

pieces = {}
recon = np.zeros((H, W), np.float32)
for i, n in enumerate(names, 1):
    # 1 px de solape con las piezas vecinas: evita líneas finas en las articulaciones
    m = grow(owner == i, 1) & (owner > 0)
    ys, xs = np.where(m)
    x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    a = np.where(m, alpha, 0)[y0:y1, x0:x1].astype(np.uint8)
    rgba = np.zeros((y1 - y0, x1 - x0, 4), np.uint8); rgba[..., :3] = 255; rgba[..., 3] = a
    buf = io.BytesIO(); Image.fromarray(rgba, 'RGBA').save(buf, 'PNG', optimize=True)
    pieces[n] = {'x': int(x0), 'y': int(y0), 'w': int(x1 - x0), 'h': int(y1 - y0),
                 'src': 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()}
    recon[y0:y1, x0:x1] = np.maximum(recon[y0:y1, x0:x1], a)

# Comprobación: las piezas en reposo == silueta original (sin la línea de tierra)
orig = alpha.copy(); orig[419:] = 0
diff = np.abs(orig - recon)
print('píxeles distintos (>40):', int((diff > 40).sum()), 'de', int((orig > 40).sum()))
print({n: (p['w'], p['h'], len(p['src']) // 1024) for n, p in pieces.items()})

ts = ['// Generado por tools/rig.py a partir de public/brand/horses-white.png. No editar a mano.',
      '// Piezas de la silueta del logo (encuadre 602×602) para animar el galope.',
      'export type RigPiece = { x: number; y: number; w: number; h: number; src: string };',
      'export const RIG: Record<string, RigPiece> = ' + json.dumps(pieces, indent=1) + ';', '']
open(ROOT + '/components/heroRig.ts', 'w', encoding='utf-8').write('\n'.join(ts))

# Vista de control: piezas en colores alternos
pal = [(230, 60, 60), (60, 120, 230), (240, 200, 40), (160, 80, 200), (40, 200, 200), (250, 130, 30), (120, 220, 90), (255, 105, 180)]
img = Image.new('RGB', (W, H), (11, 74, 31)); px = img.load()
for y in range(150, 440):
    for x in range(100, 510):
        if owner[y, x] and alpha[y, x] > 100:
            px[x, y] = pal[(owner[y, x] - 1) % len(pal)]
img.crop((100, 150, 510, 440)).resize((820, 580), Image.NEAREST).save(TMP + '/rig_pieces.png')
