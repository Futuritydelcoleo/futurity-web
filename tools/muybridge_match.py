"""Para cada caballo del logo (yegua y potro) busca el fotograma de Muybridge y la
escala/posición que mejor calzan con su silueta (IoU), en el encuadre 602×602 del logo."""
import json
import numpy as np
from PIL import Image

T = r'C:/Users/Christian/AppData/Local/Temp/futsp'
lab = np.load(T + '/labels.npy')
strip = np.asarray(Image.open(T + '/muybridge/gallop_strip.png').convert('RGBA'))[..., 3] > 110
meta = json.load(open(T + '/muybridge/gallop_meta.json'))
FW, FH, N = meta['fw'], meta['fh'], meta['frames']
frames = [strip[:, i * FW:(i + 1) * FW] for i in range(N)]

H = 2  # trabajar a media resolución
mare = np.isin(lab, [1, 4, 5])
foal = lab == 3
# para la yegua no cuenta lo que tapa el potro (más un margen)
ignore = foal.copy()
for _ in range(4):
    g = ignore.copy(); g[1:] |= ignore[:-1]; g[:-1] |= ignore[1:]; g[:, 1:] |= ignore[:, :-1]; g[:, :-1] |= ignore[:, 1:]; ignore = g


def half(m):
    return np.asarray(Image.fromarray((m * 255).astype(np.uint8)).resize((301, 301), Image.BILINEAR)) > 127


def best_for(target, ign, k0):
    L = half(target); I = half(ign) if ign is not None else np.zeros_like(L)
    valid = ~I
    ty, tx = np.where(L)
    tcx, tcy = tx.mean(), ty.mean()
    results = []
    for fi, f in enumerate(frames):
        best = (0, None)
        for k in np.linspace(k0 * 0.85, k0 * 1.6, 14):
            kh = k / H
            w, h = max(1, int(round(FW * kh))), max(1, int(round(FH * kh)))
            S = np.asarray(Image.fromarray((f * 255).astype(np.uint8)).resize((w, h), Image.BILINEAR)) > 127
            sy, sx = np.where(S)
            if not len(sx): continue
            ox0 = int(round(tcx - sx.mean())); oy0 = int(round(tcy - sy.mean()))

            def score(ox, oy):
                C = np.zeros_like(L)
                y0, x0 = max(oy, 0), max(ox, 0)
                y1, x1 = min(oy + h, 301), min(ox + w, 301)
                if y1 <= y0 or x1 <= x0: return 0
                C[y0:y1, x0:x1] = S[y0 - oy:y1 - oy, x0 - ox:x1 - ox]
                inter = (C & L & valid).sum(); uni = ((C | L) & valid).sum()
                return inter / uni if uni else 0

            for ox in range(ox0 - 18, ox0 + 19, 3):
                for oy in range(oy0 - 12, oy0 + 13, 3):
                    s = score(ox, oy)
                    if s > best[0]: best = (s, (k, ox, oy))
            # refinar alrededor del mejor de esta escala
        k, ox, oy = best[1]
        kh = k / H; w, h = int(round(FW * kh)), int(round(FH * kh))
        results.append({'frame': fi, 'iou': round(float(best[0]), 3), 'k': round(float(k), 4),
                        'left': round(float(ox * H), 1), 'top': round(float(oy * H), 1)})
    return sorted(results, key=lambda r: -r['iou'])


mare_res = best_for(mare, ignore, 314 / (meta['nose'] - meta['rump']))
foal_res = best_for(foal, None, 175 / (meta['nose'] - meta['rump']))
print('YEGUA'); [print(r) for r in mare_res[:5]]
print('POTRO'); [print(r) for r in foal_res[:5]]
json.dump({'mare': mare_res, 'foal': foal_res, 'meta': meta}, open(T + '/muybridge/match.json', 'w'), indent=1)
