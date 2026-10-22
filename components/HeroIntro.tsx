'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import logo from '@/public/brand/logo-futurity.png';

// Intro del hero: una yegua y su potro entran galopando, frenan y la escena se
// funde en el logo mientras se forma el disco y el anillo.
//
// El galope es real: son los 11 fotogramas de "The Horse in Motion" (Eadweard
// Muybridge, 1878, dominio público), la yegua Sallie Gardner, convertidos en
// silueta blanca y sin jinete (tools/muybridge_*.py → public/brand/gallop.png).

const SPRITE = '/brand/gallop.png';
const FRAMES = 11;
// medidas del fotograma en la tira (px): ancho, alto, nariz, nalga y cascos
const FW = 289;
const FH = 168;
const NOSE = 274.7;
const RUMP = 27.4;
const FEET = 162;
const BODY = NOSE - RUMP;
const STRIDE_BODIES = 3.1; // un tranco de galope ≈ 3 cuerpos (27 pulgadas × 11 fotogramas)

// Dónde queda cada caballo al llegar, en el encuadre 602×602 del logo:
// longitud nariz–nalga y posición de la nariz y los cascos de cada uno.
type Horse = { nose: number; rump: number; feet: number; run: { start: number; dur: number }; endFrame: number };
const MARE: Horse = { nose: 490, rump: 176, feet: 418, run: { start: 0, dur: 1.8 }, endFrame: 0 };
const FOAL: Horse = { nose: 325, rump: 150, feet: 418, run: { start: 0.38, dur: 1.72 }, endFrame: 5 };

const START_TIMEOUT_MS = 2500;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// frenado suave: arranca a ~2× la velocidad media, como un caballo que llega y se detiene
const easeOut = (k: number) => 1 - (1 - k) * (1 - k);

/** Caja del sprite en % del escudo, para que al llegar calce sobre el caballo del logo. */
function placement(h: Horse) {
  const k = (h.nose - h.rump) / BODY; // unidades del logo por px del fotograma
  const left = h.nose - NOSE * k;
  const top = h.feet - FEET * k;
  return {
    left: `${(left / 602) * 100}%`,
    top: `${(top / 602) * 100}%`,
    width: `${((FW * k) / 602) * 100}%`,
    height: `${((FH * k) / 602) * 100}%`,
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
    // Recorrido: entra desde fuera de la pantalla y cubre al menos 3 trancos, así el
    // ritmo del galope (≈2,3 trancos/s) se ve natural tanto en PC como en el teléfono.
    const mareStride = ((MARE.nose - MARE.rump) / 602) * size * STRIDE_BODIES;
    const distance = Math.max(window.innerWidth * 0.65, mareStride * 3);

    const move = (t: number, h: Horse, el: HTMLDivElement | null) => {
      if (!el) return;
      const travelled = distance * easeOut(clamp01((t - h.run.start) / h.run.dur));
      el.style.transform = `translateX(${(travelled - distance).toFixed(1)}px)`;
      // los fotogramas avanzan con la distancia recorrida (sin "patinar") y el
      // último cae en `endFrame` justo al detenerse
      const bodyPx = ((h.nose - h.rump) / 602) * size;
      const strides = (travelled - distance) / (bodyPx * STRIDE_BODIES);
      const frame = ((Math.floor(strides * FRAMES + h.endFrame) % FRAMES) + FRAMES) % FRAMES;
      const sprite = el.firstElementChild as HTMLDivElement | null;
      if (sprite) sprite.style.backgroundPosition = `${(frame / (FRAMES - 1)) * 100}% 0`;
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
        <div className="intro__sprite" style={placement(MARE)} />
      </div>
      <div ref={foalRef} className="intro__horse" aria-hidden>
        <div className="intro__sprite" style={placement(FOAL)} />
      </div>

      <Image src={logo} alt="" priority sizes="280px" className="intro__logo" />
    </div>
  );
}
