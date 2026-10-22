import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RankingTable } from '@/components/RankingTable';
import { RankingTabs } from '@/components/RankingTabs';
import { getCurrentSeason, getStageResults, type Stage } from '@/lib/data';
import { eventDates, STAGE_LABEL, STATUS_LABEL } from '@/lib/format';

export const revalidate = 60;

const STAGES: Stage[] = ['cf1', 'cf2', 'futurity'];

type Props = { params: Promise<{ stage: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stage } = await params;
  return STAGES.includes(stage as Stage) ? { title: `Resultados ${STAGE_LABEL[stage as Stage]}` } : {};
}

export default async function StageResultsPage({ params }: Props) {
  const { stage } = await params;
  if (!STAGES.includes(stage as Stage)) notFound();
  const season = await getCurrentSeason();
  const data = await getStageResults(season, stage as Stage);
  if (!data) notFound();
  const { event, rows } = data;

  return (
    <>
      <section className="page-hero glow grain">
        <div className="wrap">
          <p className="kicker">
            Resultados {season} · {eventDates(event)}
          </p>
          <h1 className="display">{STAGE_LABEL[event.stage]}</h1>
          <p className="muted">
            {event.venue ? `${event.venue}${event.city ? ` · ${event.city}` : ''} · ` : ''}
            {STATUS_LABEL[event.status]}
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap">
          <RankingTabs active={event.stage} />
          {rows.length ? (
            <RankingTable rows={rows} stages={false} />
          ) : (
            <div className="empty">
              {event.status === 'finalizada'
                ? 'Los resultados de esta válida se publicarán pronto.'
                : `Esta válida aún no se ha corrido (${eventDates(event)}). Los resultados aparecerán aquí.`}
            </div>
          )}
          <p className="legend">
            <b>Pts:</b> puntos en esta válida · <b>Nul.:</b> nulas · <b>S.P.:</b> saques de puerta. El podio es el oficial:
            los desempates se deciden por penalizaciones que no figuran en la planilla, por eso fuera del podio los
            empates en puntos comparten puesto. Datos según la planilla oficial de la organización.
          </p>
        </div>
      </section>
    </>
  );
}
