'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import logo from '@/public/brand/logo-futurity.png';

// Intro del hero: una yegua y su potro entran galopando, frenan y la escena se
// funde en el logo mientras se forma el disco y el anillo.
//
// El galope es real: los fotogramas de "The Horse in Motion" (Eadweard Muybridge,
// 1878, dominio público), la yegua Sallie Gardner, en silueta blanca y sin jinete
// (tools/muybridge_*.py → public/brand/gallop.png). Fotogramas 0–10: galope;
// 11: de pie. Cada caballo termina en el fotograma que más se parece a su pose en
// el logo y en la posición/escala calculadas para calzar sobre él
// (tools/muybridge_match.py): la yegua ya parada y el potro con el tranco abierto.

const SPRITE = '/brand/gallop.png';
const STRIP_FRAMES = 12;
const GALLOP_FRAMES = 11;
const STAND_FRAME = 11;
// medidas del fotograma en la tira (px)
const FW = 289;
const FH = 184;
const BODY = 242; // nariz–nalga
const STRIDE_BODIES = 3.1; // un tranco de galope ≈ 3 cuerpos (27 pulgadas × 11 fotogramas)

type Horse = {
  // caja final en el encuadre 602×602 del logo
  left: number;
  top: number;
  kx: number;
  ky: number;
  run: { start: number; dur: number };
  endFrame: number; // fotograma de galope en el que se detiene
  stand?: number; // segundos finales en los que se funde con el fotograma de pie
};
const MARE: Horse = { left: 84, top: 148, kx: 1.552, ky: 1.552, run: { start: 0, dur: 1.85 }, endFrame: 9, stand: 0.3 };
// el potro un poco más alto que largo: patas largas de potro, como en el logo
const FOAL: Horse = { left: 89, top: 245, kx: 0.84, ky: 1.05, run: { start: 0.4, dur: 1.7 }, endFrame: 4 };

const START_TIMEOUT_MS = 2500;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// frenado suave: arranca a ~2× la velocidad media, como un caballo que llega y se detiene
const easeOut = (k: number) => 1 - (1 - k) * (1 - k);
const frameX = (f: number) => `${(f / (STRIP_FRAMES - 1)) * 100}% 0`;

function box(h: Horse) {
  return {
    left: `${(h.left / 602) * 100}%`,
    top: `${(h.top / 602) * 100}%`,
    width: `${((FW * h.kx) / 602) * 100}%`,
    height: `${((FH * h.ky) / 602) * 100}%`,
  };
}

export function HeroIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mareRef = useRef<HTMLDivElement>(null);
  const foalRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  // Arrancar cuando el galope esté cargado (o tras un tiempo límite).
  useEffect(() => {
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      setPlaying(true);
      rootRef.current?.closest('.hero')?.classList.add('hero--play');
    };
    const img = new window.Image();
    img.src = SPRITE;
    img.decode().then(start, start);
    const timer = window.setTimeout(start, START_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const size = rootRef.current?.getBoundingClientRect().width ?? 230;
    // Recorrido: entra desde fuera de la pantalla y cubre al menos 2,4 trancos, así el
    // ritmo del galope se ve natural en PC sin que en el teléfono tarde en aparecer.
    const mareStride = ((BODY * MARE.kx) / 602) * size * STRIDE_BODIES;
    const distance = Math.max(window.innerWidth * 0.65, mareStride * 2.4);

    const move = (t: number, h: Horse, el: HTMLDivElement | null) => {
      if (!el) return;
      const travelled = distance * easeOut(clamp01((t - h.run.start) / h.run.dur));
      el.style.transform = `translateX(${(travelled - distance).toFixed(1)}px)`;
      // los fotogramas avanzan con la distancia recorrida (sin "patinar") y el
      // último cae en `endFrame` justo al detenerse
      const stride = ((BODY * h.kx) / 602) * size * STRIDE_BODIES;
      const strides = (travelled - distance) / stride;
      const frame = ((Math.floor(strides * GALLOP_FRAMES + h.endFrame) % GALLOP_FRAMES) + GALLOP_FRAMES) % GALLOP_FRAMES;
      const [gallop, stand] = el.children as unknown as HTMLDivElement[];
      gallop.style.backgroundPosition = frameX(frame);
      if (h.stand && stand) {
        // al final la yegua pasa de galope a quedarse parada
        const k = clamp01((t - (h.run.start + h.run.dur - h.stand)) / h.stand);
        stand.style.opacity = k.toFixed(3);
        gallop.style.opacity = (1 - k).toFixed(3);
      }
    };

    let raf = 0;
    const t0 = performance.now();
    const end = Math.max(MARE.run.start + MARE.run.dur, FOAL.run.start + FOAL.run.dur);
    // ?introFrame=1.2 congela la escena en ese segundo (para revisar cuadro a cuadro)
    const frozen = Number(new URLSearchParams(window.location.search).get('introFrame'));
    const tick = (now: number) => {
      const t = frozen > 0 ? frozen : Math.min((now - t0) / 1000, end);
      move(t, MARE, mareRef.current);
      move(t, FOAL, foalRef.current);
      if (!frozen && t < end) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <div ref={rootRef} className={`intro ${playing ? 'intro--play' : ''}`} role="img" aria-label="Escudo Futurity del Coleo">
      <div className="intro__trail" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <svg className="intro__ring" viewBox="0 0 100 100" aria-hidden>
        <circle className="intro__disc" cx="50" cy="50" r="47" />
        <circle className="intro__stroke" cx="50" cy="50" r="48.5" pathLength="100" />
      </svg>

      <div ref={mareRef} className="intro__horse" aria-hidden>
        <div className="intro__sprite" style={box(MARE)} />
        <div className="intro__sprite" style={{ ...box(MARE), backgroundPosition: frameX(STAND_FRAME), opacity: 0 }} />
      </div>
      <div ref={foalRef} className="intro__horse" aria-hidden>
        <div className="intro__sprite" style={box(FOAL)} />
      </div>

      <Image src={logo} alt="" priority sizes="280px" className="intro__logo" />
    </div>
  );
}
