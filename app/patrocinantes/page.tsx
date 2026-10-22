import type { Metadata } from 'next';
import { Sponsors } from '@/components/Sponsors';
import { getSponsors } from '@/lib/data';

export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Patrocinantes',
  description: 'Las empresas y aliados que hacen posible el Futurity del Coleo y el Caballo del Futuro.',
};

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <>
      <section className="page-hero glow grain">
        <div className="wrap">
          <p className="kicker">Nos acompañan</p>
          <h1 className="display">Patrocinantes</h1>
          <p className="muted">
            {sponsors.length} empresas y aliados hacen posible el Futurity del Coleo. Gracias por apostar por el
            caballo del futuro.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap">
          <Sponsors sponsors={sponsors} />
        </div>
      </section>
    </>
  );
}
