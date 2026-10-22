import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SingleHorse } from '@/components/HorseMark';
import { getHorse, type CompetitionEvent, type EventResult } from '@/lib/data';
import { eventDates, ordinal, pad, STAGE_LABEL, STATUS_LABEL } from '@/lib/format';

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await getHorse(slug);
  return { title: data ? data.horse.name : 'Caballo no encontrado' };
}

const plural = (n: number, one: string, many: string) => `${n} ${Math.abs(n) === 1 ? one : many}`;

function stepResult(event: CompetitionEvent, result: EventResult | undefined) {
  const detail = result
    ? `${plural(result.pts_n, 'nula', 'nulas')} · ${plural(result.pts_sp, 'saque de puerta', 'saques de puerta')}`
    : null;
  if (result?.position) {
    return { text: `${ordinal(result.position)} lugar · ${plural(result.pts_e, 'punto', 'puntos')}`, tone: result.position <= 3 ? 'gold' : '', detail };
  }
  if (result) return { text: plural(result.pts_e, 'punto', 'puntos'), tone: '', detail };
  if (event.status === 'finalizada') return { text: 'No corrió esta válida', tone: 'pending', detail };
  if (event.status === 'en_curso') return { text: 'En competencia', tone: 'gold' };
  return { text: 'Por correr', tone: 'pending' };
}

export default async function HorsePage({ params }: Params) {
  const { slug } = await params;
  const data = await getHorse(slug);
  if (!data) notFound();
  const { horse, events, results, standing } = data;

  return (
    <>
      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap">
          <Link href={`/generaciones/${horse.birth_year}`} className="back">
            ← Generación {horse.birth_year}
          </Link>

          <article className="ficha">
            <div className="ficha__photo glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {horse.photo_url ? <img src={horse.photo_url} alt={horse.name} /> : <SingleHorse />}
              <span className="ficha__year">{horse.birth_year}</span>
            </div>

            <div className="ficha__data">
              <span className="ficha__planilla">Planilla de revisión y registro</span>
              <h1 className="display ficha__title">{horse.name}</h1>
              {horse.registration_code && <span className="id-pill">ID Nº {horse.registration_code}</span>}

              <dl className="datalist">
                {horse.sex && (<><dt>Sexo</dt><dd style={{ textTransform: 'capitalize' }}>{horse.sex}</dd></>)}
                {horse.aqha_status && (<><dt>Registro AQHA</dt><dd>{horse.aqha_status}</dd></>)}
                <dt>Nacimiento</dt>
                <dd>{horse.birth_year}</dd>
                {horse.owner && (<><dt>Propietario</dt><dd>{horse.owner}</dd></>)}
                {horse.stable && (<><dt>Caballeriza</dt><dd>{horse.stable}</dd></>)}
                {standing?.athletes && (<><dt>Atleta</dt><dd>{standing.athletes}</dd></>)}
              </dl>

              {standing && (
                <div>
                  <span className="ficha__planilla">Acumulativo CF1 / CF2 · {standing.season}</span>
                  <div className="acumulado" style={{ marginTop: 10 }}>
                    <div><b>{pad(standing.position)}</b><span>Posición</span></div>
                    <div><b>{standing.pts_e}</b><span>Puntos</span></div>
                    <div><b>{standing.pts_n}</b><span>Nulas</span></div>
                    <div><b>{standing.pts_sp}</b><span>S. puerta</span></div>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Temporada {horse.birth_year + 5}</p>
              <h2 className="display">Camino al Futurity</h2>
            </div>
          </div>
          {events.length ? (
            <div className="camino">
              {events.map((e) => {
                const result = results.find((r) => r.event_id === e.id);
                const r = stepResult(e, result);
                return (
                  <div key={e.id} className={`camino__step ${e.stage === 'futurity' ? 'camino__step--final' : ''}`}>
                    <span className="camino__stage">{STAGE_LABEL[e.stage]}</span>
                    <span className="muted">{eventDates(e, false)}</span>
                    <span className={`camino__result ${r.tone ? `camino__result--${r.tone}` : ''}`}>{r.text}</span>
                    {r.detail && <span className="muted">{r.detail}</span>}
                    {result?.athlete && <span className="muted">Atleta: {result.athlete}</span>}
                    <span className={`badge badge--${e.status}`} style={{ width: 'fit-content' }}>
                      {STATUS_LABEL[e.status]}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty">Las válidas de esta generación aún no han sido programadas.</div>
          )}
        </div>
      </section>
    </>
  );
}
