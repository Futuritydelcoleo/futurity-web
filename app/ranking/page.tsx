import type { Metadata } from 'next';
import { RankingTable } from '@/components/RankingTable';
import { RankingTabs } from '@/components/RankingTabs';
import { getCurrentSeason, getStandings } from '@/lib/data';

export const revalidate = 60;
export const metadata: Metadata = { title: 'Ranking acumulado' };

export default async function RankingPage() {
  const season = await getCurrentSeason();
  const standings = await getStandings(season);

  return (
    <>
      <section className="page-hero glow grain">
        <div className="wrap">
          <p className="kicker">Caballo del Futuro {season}</p>
          <h1 className="display">Acumulativo CF1 / CF2</h1>
          <p className="muted">
            Tabla de posiciones de la generación que compite esta temporada, rumbo al Futurity del Coleo. Toca un
            caballo para ver su ficha.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap">
          <RankingTabs active="acumulado" />
          {standings.length ? (
            <RankingTable rows={standings} />
          ) : (
            <div className="empty">El ranking de esta temporada se publicará al finalizar el Caballo del Futuro I.</div>
          )}
          <p className="legend">
            <b>CF1 / CF2:</b> puntos en cada válida (— = no la corrió) · <b>Pts:</b> puntos acumulados ·{' '}
            <b>Nul.:</b> nulas · <b>S.P.:</b> saques de puerta. Datos según la planilla oficial de la organización.
          </p>
        </div>
      </section>
    </>
  );
}
