import type { Metadata } from 'next';
import Link from 'next/link';
import { getGenerations } from '@/lib/data';

export const revalidate = 60;
export const metadata: Metadata = { title: 'Generaciones' };

export default async function GenerationsPage() {
  const generations = await getGenerations();

  return (
    <>
      <section className="page-hero glow grain">
        <div className="wrap">
          <p className="kicker">Una generación por año</p>
          <h1 className="display">Generaciones</h1>
          <p className="muted">
            Cada año se revisan y registran los ejemplares nacidos en una misma cosecha. A los 5 años compiten en el
            Caballo del Futuro I, el Caballo del Futuro II y el Futurity del Coleo.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap gen-list">
          {generations.map((g) => (
            <Link key={g.birth_year} href={`/generaciones/${g.birth_year}`} className="gen-row">
              <span className="gen-row__year">{g.birth_year}</span>
              <span>
                <span className="condensed" style={{ fontWeight: 700, fontSize: 20 }}>{g.title}</span>
                {g.notes && <span className="muted" style={{ display: 'block' }}>{g.notes}</span>}
              </span>
              <span className="gen-row__count">
                {g.horses}
                <small>Ejemplares</small>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
