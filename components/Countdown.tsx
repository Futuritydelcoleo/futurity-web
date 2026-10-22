'use client';

import { useEffect, useState } from 'react';

// Cuenta regresiva hasta el inicio de la válida (hora de Venezuela, UTC-4).
export function Countdown({ date }: { date: string }) {
  const target = new Date(`${date}T11:00:00-04:00`).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null || now >= target) return null;

  const s = Math.floor((target - now) / 1000);
  const cells = [
    { n: Math.floor(s / 86400), l: 'Días' },
    { n: Math.floor((s % 86400) / 3600), l: 'Horas' },
    { n: Math.floor((s % 3600) / 60), l: 'Min' },
    { n: s % 60, l: 'Seg' },
  ];

  return (
    <div className="countdown" aria-label="Cuenta regresiva">
      {cells.map((c) => (
        <div key={c.l} className="countdown__cell">
          <div className="countdown__num">{String(c.n).padStart(2, '0')}</div>
          <div className="countdown__lbl">{c.l}</div>
        </div>
      ))}
    </div>
  );
}
