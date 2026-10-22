'use client';

import { useMemo, useState } from 'react';
import type { Horse } from '@/lib/data';
import { HorseCard } from './HorseCard';

function normalize(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function HorseGrid({ horses }: { horses: Horse[] }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = normalize(q.trim());
    if (!term) return horses;
    return horses.filter((h) =>
      normalize([h.name, h.owner, h.stable, h.registration_code].filter(Boolean).join(' ')).includes(term),
    );
  }, [q, horses]);

  return (
    <>
      <div className="table-tools">
        <input
          className="search"
          type="search"
          placeholder="Buscar por nombre, propietario, caballeriza o ID"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Buscar caballos"
        />
        <span className="muted condensed">{filtered.length} ejemplares</span>
      </div>
      {filtered.length === 0 ? (
        <div className="empty">No hay caballos que coincidan con “{q}”.</div>
      ) : (
        <div className="horse-grid">
          {filtered.map((h) => (
            <HorseCard
              key={h.id}
              slug={h.slug}
              name={h.name}
              owner={h.owner}
              stable={h.stable}
              registrationCode={h.registration_code}
              photoUrl={h.photo_url}
            />
          ))}
        </div>
      )}
    </>
  );
}
