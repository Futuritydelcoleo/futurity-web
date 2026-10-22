import Link from 'next/link';
import { Countdown } from '@/components/Countdown';
import { Crest } from '@/components/Crest';
import { HorseCard } from '@/components/HorseCard';
import { getCurrentSeason, getGenerations, getSeasonEvents, getSponsors, getStandings } from '@/lib/data';
import { eventDates, STAGE_LABEL, STAGE_SHORT, STATUS_LABEL } from '@/lib/format';

export const revalidate = 60;

export default async function Home() {
  const season = await getCurrentSeason();
  const [events, standings, sponsors, generations] = await Promise.all([
    getSeasonEvents(season),
    getStandings(season),
    getSponsors(),
    getGenerations(),
  ]);

  const next = events.find((e) => e.status !== 'finalizada') ?? events[events.length - 1];
  const competingYear = next?.birth_year ?? season - 5;
  const competing = generations.find((g) => g.birth_year === competingYear);
  const top = standings.slice(0, 5);

  return (
    <>
      <section className="hero glow grain">
        <div className="wrap">
          <Crest size={170} className="crest" priority />
          <p className="kicker">Temporada {season} · Equinos nacidos en {competingYear}</p>
          <h1 className="display">
            Futurity
            <span>del Coleo</span>
          </h1>

          {next && (
            <>
              {next.status === 'reprogramada' && <div className="tape">Reprogramado</div>}
              <div className="hero-event">
                <span className="hero-event__name">{next.name}</span>
                <span className="hero-event__dates">{eventDates(next)}</span>
                {next.venue && (
                  <span className="hero-event__venue">
                    {next.venue}
                    {next.city ? ` · ${next.city}` : ''}
                  </span>
                )}
              </div>
              {next.starts_on && next.status !== 'finalizada' && <Countdown date={next.starts_on} />}
            </>
          )}

          <div className="hero-actions">
            <Link className="btn btn--live" href="/en-vivo">
              <span className="live-dot" aria-hidden /> Ver en vivo
            </Link>
            <Link className="btn btn--ghost" href="/ranking">
              Ranking {season}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">El camino al Futurity</p>
              <h2 className="display">Tres válidas, un campeón</h2>
            </div>
            <p className="muted" style={{ maxWidth: 420, margin: 0 }}>
              Solo compiten los ejemplares revisados y registrados por nuestro equipo de médicos veterinarios. Cada
              caballo suma en el Caballo del Futuro I y II rumbo a la gran final.
            </p>
          </div>
          <div className="road">
            {events.map((e) => (
              <div
                key={e.id}
                className={`road__step ${e.stage === 'futurity' ? 'road__step--final' : ''} ${e.status === 'finalizada' ? 'road__step--done' : ''}`}
              >
                <div className="road__dot">{STAGE_SHORT[e.stage]}</div>
                <div>
                  <div className="road__name">{STAGE_LABEL[e.stage]}</div>
                  <div className="road__meta">{eventDates(e, false)}</div>
                  <span className={`badge badge--${e.status}`}>{STATUS_LABEL[e.status]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {top.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">Acumulativo CF1 / CF2</p>
                <h2 className="display">Los que mandan</h2>
              </div>
              <Link className="btn btn--lime btn--sm" href="/ranking">
                Ver ranking completo
              </Link>
            </div>
            <div className="podium">
              {top.map((s) => (
                <HorseCard
                  key={s.horse.slug}
                  slug={s.horse.slug}
                  name={s.horse.name}
                  owner={s.horse.owner}
                  position={s.position}
                  extra={`${s.pts_e} E · ${s.pts_n} N · ${s.pts_sp} S.P.`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {competing && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="gen-band glow">
              <div className="gen-band__year">{competing.birth_year}</div>
              <div>
                <p className="kicker">Generación en competencia</p>
                <h2 className="display" style={{ fontSize: 'clamp(30px, 5vw, 46px)' }}>
                  {competing.horses} ejemplares
                </h2>
                <p className="muted" style={{ margin: '8px 0 0' }}>
                  Conoce la ficha de cada caballo: su registro, propietario, caballeriza y su recorrido hacia la final.
                </p>
              </div>
              <Link className="btn btn--lime" href={`/generaciones/${competing.birth_year}`}>
                Ver caballos
              </Link>
            </div>
          </div>
        </section>
      )}

      {sponsors.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">Nos acompañan</p>
                <h2 className="display">Patrocinantes</h2>
              </div>
            </div>
            <div className="sponsors">
              {sponsors.map((sp) => (
                <div key={sp.id} className={`sponsor sponsor--${sp.tier}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {sp.logo_url ? <img src={sp.logo_url} alt={sp.name} style={{ maxHeight: 70 }} /> : <span className="sponsor__name">{sp.name}</span>}
                  <span className="sponsor__tier">
                    {sp.tier === 'oficial' ? 'Patrocinante oficial' : sp.tier === 'medio' ? 'Transmisión oficial' : 'Aliado'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
