'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Standing } from '@/lib/data';
import { pad } from '@/lib/format';

function normalize(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function RankingTable({ rows }: { rows: Standing[] }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = normalize(q.trim());
    if (!term) return rows;
    return rows.filter((r) =>
      normalize([r.horse.name, r.horse.owner, r.horse.stable, r.athletes].filter(Boolean).join(' ')).includes(term),
    );
  }, [q, rows]);

  return (
    <>
      <div className="table-tools">
        <input
          className="search"
          type="search"
          placeholder="Buscar caballo, propietario, atleta o caballeriza"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Buscar en el ranking"
        />
        <span className="muted condensed">
          {filtered.length} de {rows.length} ejemplares
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">No hay resultados para “{q}”.</div>
      ) : (
        <>
          <table className="ranking">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Equino</th>
                <th>Propietario</th>
                <th>Atleta</th>
                <th>Caballeriza</th>
                <th className="num" title="Puntos en el Caballo del Futuro I">CF1</th>
                <th className="num" title="Puntos en el Caballo del Futuro II">CF2</th>
                <th className="num" title="Puntos acumulados">Pts</th>
                <th className="num" title="Nulas">Nul.</th>
                <th className="num" title="Saques de puerta">S.P.</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.horse.slug} className={r.position === 1 ? 'top-1' : undefined}>
                  <td className="pos">{pad(r.position)}</td>
                  <td className="equino">
                    <Link href={`/caballos/${r.horse.slug}`}>{r.horse.name}</Link>
                  </td>
                  <td>{r.horse.owner}</td>
                  <td>{r.athletes}</td>
                  <td>{r.horse.stable}</td>
                  <td className="num pts pts--stage">{r.cf1_pts ?? '—'}</td>
                  <td className="num pts pts--stage">{r.cf2_pts ?? '—'}</td>
                  <td className="num pts pts--main">{r.pts_e}</td>
                  <td className="num pts">{r.pts_n}</td>
                  <td className="num pts">{r.pts_sp}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ranking-cards">
            {filtered.map((r) => (
              <Link key={r.horse.slug} href={`/caballos/${r.horse.slug}`} className="rank-card">
                <span className="pos">{pad(r.position)}</span>
                <span>
                  <span className="name">{r.horse.name}</span>
                  <span className="sub" style={{ display: 'block' }}>{r.horse.owner}</span>
                  <span className="sub" style={{ display: 'block' }}>{r.athletes}</span>
                </span>
                <span className="pts">
                  <b>{r.pts_e}</b>
                  <span className="pts-split">
                    CF1 {r.cf1_pts ?? '—'} · CF2 {r.cf2_pts ?? '—'}
                  </span>
                  <span className="pts-split">
                    {r.pts_n} Nul. · {r.pts_sp} S.P.
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
