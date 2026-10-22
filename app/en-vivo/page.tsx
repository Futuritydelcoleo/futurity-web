import type { Metadata } from 'next';
import Link from 'next/link';
import { getCurrentSeason, getSeasonEvents, getSettings, setting } from '@/lib/data';
import { eventDates, STATUS_LABEL } from '@/lib/format';
import { embedUrl, resolveLiveVideo } from '@/lib/youtube';

export const revalidate = 60;
export const metadata: Metadata = {
  title: 'En vivo',
  description: 'Transmisión en vivo del Futurity del Coleo y resultados en tiempo real con Tiempo Vaquero.',
};

export default async function LivePage() {
  const season = await getCurrentSeason();
  const [settings, events] = await Promise.all([getSettings(), getSeasonEvents(season)]);

  const youtube = setting(settings, 'youtube_url', 'https://www.youtube.com/@futuritydelcoleo');
  const liveUrl = setting(settings, 'live_url', 'https://tiempovaquero.com/#/en-vivo');
  const video = await resolveLiveVideo(setting(settings, 'youtube_live_video'), setting(settings, 'youtube_channel_id'));
  const current = events.find((e) => e.status === 'en_curso') ?? events.find((e) => e.status !== 'finalizada');

  return (
    <>
      <section className="page-hero glow grain" style={{ paddingBottom: 28 }}>
        <div className="wrap">
          <p className="kicker live-kicker">
            <span className="live-dot live-dot--red" aria-hidden /> Transmisión oficial
          </p>
          <h1 className="display">En vivo</h1>
          {current && (
            <p className="muted" style={{ marginTop: 12 }}>
              {current.name} · {eventDates(current)}
              {current.venue ? ` · ${current.venue}` : ''}{' '}
              <span className={`badge badge--${current.status}`}>{STATUS_LABEL[current.status]}</span>
            </p>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap live-layout">
          <div>
            {video && (
              <p className={`player-label ${video.kind === 'latest' ? '' : 'player-label--live'}`}>
                {video.kind === 'latest' ? (
                  <>Sin transmisión en este momento · Última transmisión: <b>{video.title}</b></>
                ) : (
                  <><span className="live-dot live-dot--red" aria-hidden /> En directo ahora</>
                )}
              </p>
            )}
            <div className="player">
              {video ? (
                <iframe
                  src={embedUrl(video)}
                  title="Transmisión en vivo del Futurity del Coleo en YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="empty">La transmisión aparecerá aquí cuando comience.</div>
              )}
            </div>
            <p className="muted player-note">
              Cuando comience una transmisión aparecerá aquí automáticamente. Revive todas las válidas en{' '}
              <a href={youtube} target="_blank" rel="noreferrer">nuestro canal de YouTube</a>.
            </p>
          </div>

          <aside className="live-aside">
            <a className="tv-card" href={liveUrl} target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/tiempo-vaquero.png" alt="Tiempo Vaquero" width={84} height={94} />
              <span className="tv-card__kicker">Resultados oficiales</span>
              <span className="tv-card__title">Tiempos y resultados en vivo</span>
              <span className="muted">Sigue cada turno, puntaje y posición en tiempo real.</span>
              <span className="btn btn--live" style={{ marginTop: 6 }}>
                <span className="live-dot" aria-hidden /> Ir a Tiempo Vaquero
              </span>
            </a>

            <a className="yt-card" href={youtube} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 28 20" width="40" height="28" aria-hidden>
                <rect width="28" height="20" rx="5" fill="#ff0000" />
                <path d="M11 5.5v9l7.5-4.5z" fill="#fff" />
              </svg>
              <span>
                <span className="yt-card__title">@futuritydelcoleo</span>
                <span className="muted" style={{ display: 'block', fontSize: 14 }}>Suscríbete al canal oficial</span>
              </span>
            </a>

            <Link href="/ranking" className="btn btn--ghost" style={{ justifyContent: 'center' }}>
              Ranking acumulado {season}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
