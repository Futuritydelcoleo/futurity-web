'use client';

import { useEffect, useRef } from 'react';

type YTPlayer = { destroy: () => void };
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      playerVars: Record<string, number>;
      events: { onError: (e: { data: number }) => void };
    },
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let api: Promise<YTNamespace> | null = null;

function loadApi() {
  api ??= new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    window.onYouTubeIframeAPIReady = () => resolve(window.YT as YTNamespace);
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
  });
  return api;
}

// 101 y 150: el dueño del contenido no deja ver el video incrustado (152/153 son variantes recientes).
const BLOCKED_ERRORS = [100, 101, 150, 152, 153];

/** Reproductor de YouTube que avisa si el video no se puede ver incrustado en este dispositivo. */
export function YouTubePlayer({ id, title, live, onBlocked }: { id: string; title: string; live: boolean; onBlocked: (id: string) => void }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: YTPlayer | undefined;
    let cancelled = false;
    loadApi().then((YT) => {
      if (cancelled || !host.current) return;
      const el = document.createElement('div');
      host.current.replaceChildren(el);
      player = new YT.Player(el, {
        videoId: id,
        playerVars: { rel: 0, playsinline: 1, ...(live ? { autoplay: 1, mute: 1 } : {}) },
        events: {
          onError: (e) => {
            if (BLOCKED_ERRORS.includes(e.data)) onBlocked(id);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [id, live, onBlocked]);

  return <div ref={host} className="player__host" title={title} />;
}
