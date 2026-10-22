import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HorseGrid } from '@/components/HorseGrid';
import { getGeneration } from '@/lib/data';

export const revalidate = 60;

type Params = { params: Promise<{ year: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { year } = await params;
  return { title: `Generación ${year}` };
}

export default async function GenerationPage({ params }: Params) {
  const { year } = await params;
  const data = Number.isInteger(Number(year)) ? await getGeneration(Number(year)) : null;
  if (!data) notFound();
  const { generation, horses } = data;

  return (
    <>
      <section className="page-hero glow grain">
        <div className="wrap">
          <Link href="/generaciones" className="back">← Generaciones</Link>
          <p className="kicker">Equinos nacidos en el año</p>
          <h1 className="display">{generation.birth_year}</h1>
          <p className="muted">
            {generation.notes ?? ''} Compiten en la temporada {generation.birth_year + 5}.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap">
          {horses.length ? <HorseGrid horses={horses} /> : <div className="empty">Aún no hay ejemplares registrados.</div>}
        </div>
      </section>
    </>
  );
}
