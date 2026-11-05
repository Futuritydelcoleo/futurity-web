'use client';

import { useCallback, useState } from 'react';
import type { EventWithVideos, Video } from '@/lib/data';
import { eventDates, STAGE_LABEL, STATUS_LABEL } from '@/lib/format';
import { YouTubePlayer } from './YouTubePlayer';

type Selected = { id: string; title: string; live: boolean };

const KIND_LABEL: Record<Video['kind'], string> = { dia: 'Competencia', sorteo: 'Sorteo', resumen: 'Resumen', otro: 'Video' };

export function LiveCenter({ liveId, events }: { liveId: string | null; events: EventWithVideos[] }) {
  // Sin directo, arranca con el último día de competencia publicado.
  const lastDay = [...events].reverse().flatMap((e) => [...e.videos].reverse().map((v) => ({ e, v }))).find(({ v }) => v.kind === 'dia' && !v.embed_blocked);
  const initial: Selected | null = liveId
    ? { id: liveId, title: 'Transmisión en vivo', live: true }
    : lastDay
      ? { id: lastDay.v.youtube_id, title: `${STAGE_LABEL[lastDay.e.stage]} · ${lastDay.v.title}`, live: false }
      : null;
  const [selected, setSelected] = useState<Selected | null>(initial);
  // Videos que no se pueden ver aquí: marcados en la base de datos o rechazados por YouTube en este dispositivo.
  const [blocked, setBlocked] = useState<Set<string>>(
    () => new Set(events.flatMap((e) => e.videos.filter((v) => v.embed_blocked).map((v) => v.youtube_id))),
  );
  const markBlocked = useCallback((id: string) => setBlocked((prev) => new Set(prev).add(id)), []);

  const play = (e: EventWithVideos, v: Video) => {
    setSelected({ id: v.youtube_id, title: `${STAGE_LABEL[e.stage]} · ${v.title}`, live: false });
    document.getElementById('reproductor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isLiveShowing = selected?.live ?? false;

  return (
    <>
      <div id="reproductor" className={`stage ${isLiveShowing ? 'stage--live' : ''}`}>
        {isLiveShowing ? (
          <div className="onair">
            <span className="live-dot" aria-hidden /> En vivo ahora
          </div>
        ) : (
          <div className="stage__bar">
            <span className="stage__title">{selected?.title ?? 'Transmisiones'}</span>
            {liveId && (
              <button type="button" className="btn btn--live btn--sm" onClick={() => setSelected(initial)}>
                <span className="live-dot" aria-hidden /> Volver al directo
              </button>
            )}
          </div>
        )}
        <div className="player">
          {selected && blocked.has(selected.id) ? (
            <a className="player-fallback" href={`https://www.youtube.com/watch?v=${selected.id}`} target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${selected.id}/hqdefault.jpg`} alt="" />
              <span className="player-fallback__body">
                <span className="player-fallback__text">Este video solo se puede ver en YouTube</span>
                <span className="btn btn--live">▶ Ver en YouTube</span>
              </span>
            </a>
          ) : selected ? (
            <YouTubePlayer key={selected.id} id={selected.id} title={selected.title} live={selected.live} onBlocked={markBlocked} />
          ) : (
            <div className="empty">La transmisión aparecerá aquí cuando comience.</div>
          )}
        </div>
      </div>

      {events.map((e) =>
        e.videos.length === 0 ? null : (
          <section key={e.id} className="vod-group">
            <div className="vod-group__head">
              <h2 className="display">{STAGE_LABEL[e.stage]}</h2>
              <span className="muted">{eventDates(e, false)}</span>
              <span className={`badge badge--${e.status}`}>{STATUS_LABEL[e.status]}</span>
            </div>
            <div className="vod-grid">
              {e.videos.map((v) => {
                const active = selected?.id === v.youtube_id;
                return (
                  <button
                    key={v.youtube_id}
                    type="button"
                    className={`vod ${active ? 'vod--active' : ''}`}
                    onClick={() => play(e, v)}
                    aria-pressed={active}
                  >
                    <span className="vod__thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://i.ytimg.com/vi/${v.youtube_id}/hqdefault.jpg`} alt="" loading="lazy" />
                      <span className="vod__play" aria-hidden>▶</span>
                      {blocked.has(v.youtube_id) && !active && <span className="vod__now">En YouTube</span>}
                      {active && <span className="vod__now">Reproduciendo</span>}
                    </span>
                    <span className="vod__kind">{KIND_LABEL[v.kind]}</span>
                    <span className="vod__title">{v.title}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ),
      )}
    </>
  );
}
