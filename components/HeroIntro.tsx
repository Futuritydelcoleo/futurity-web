'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import logo from '@/public/brand/logo-futurity.png';

// Intro del hero: la yegua y el potro del escudo entran galopando (patas
// articuladas con muslo y caña), se forma el disco y el anillo, y la escena
// termina en el logo oficial. Todo usa el encuadre 602×602 del logo, así la
// silueta del cuerpo cae exacta sobre el logo al final.
//
// La secuencia arranca solo cuando la silueta ya cargó (o tras un tiempo
// límite), y las patas se mueven con requestAnimationFrame para que el galope
// vaya siempre sincronizado con el desplazamiento, en cualquier navegador.

const HORSES_SRC = '/brand/horses-white.png';
const START_TIMEOUT_MS = 2500;

// Zona del cuerpo que se conserva de la silueta (sin patas ni línea de tierra).
const BODY_CLIP =
  '100,150 510,150 510,245 468,245 404,304 400,320 342,322 338,316 312,316 312,346 262,346 262,360 150,360 150,350 100,350';

// Ciclo de galope. Ángulo > 0 lleva el casco hacia atrás: el caballo avanza a la derecha.
type Track = { t: number[]; upper: number[]; lower: number[] };
const GAIT: Record<'front' | 'hind', Track> = {
  front: { t: [0, 0.25, 0.5, 0.72, 0.88, 1], upper: [-38, -8, 28, 14, -30, -38], lower: [-4, 0, 14, 118, 40, -4] },
  hind: { t: [0, 0.18, 0.45, 0.62, 0.82, 1], upper: [34, 20, -34, -28, 4, 34], lower: [8, -78, -30, 6, 0, 8] },
};
const STRIDE_S = 0.4;
const RUN_S = 1.6; // igual que la animación CSS intro-run

type LegDef = { x: number; y: number; upper: number; lower: number; w: number; kind: 'front' | 'hind'; phase: number; layer: 'back' | 'front' };

const LEGS: LegDef[] = [
  // yegua: patas traseras (detrás del potro)
  { x: 200, y: 312, upper: 58, lower: 50, w: 30, kind: 'hind', phase: 0.05, layer: 'back' },
  { x: 224, y: 312, upper: 58, lower: 50, w: 30, kind: 'hind', phase: 0.12, layer: 'back' },
  // yegua: manos
  { x: 360, y: 316, upper: 54, lower: 50, w: 22, kind: 'front', phase: 0.2, layer: 'front' },
  { x: 380, y: 316, upper: 54, lower: 50, w: 22, kind: 'front', phase: 0.27, layer: 'front' },
  // potro
  { x: 160, y: 348, upper: 36, lower: 34, w: 17, kind: 'hind', phase: 0.1, layer: 'front' },
  { x: 175, y: 348, upper: 36, lower: 34, w: 17, kind: 'hind', phase: 0.17, layer: 'front' },
  { x: 284, y: 342, upper: 36, lower: 36, w: 13, kind: 'front', phase: 0.25, layer: 'front' },
  { x: 298, y: 342, upper: 36, lower: 36, w: 13, kind: 'front', phase: 0.32, layer: 'front' },
];

function sample(times: number[], values: number[], p: number): number {
  for (let i = 1; i < times.length; i++) {
    if (p <= times[i]) {
      const k = (p - times[i - 1]) / (times[i] - times[i - 1]);
      return values[i - 1] + (values[i] - values[i - 1]) * k;
    }
  }
  return values[values.length - 1];
}

/** Segmento cónico con extremos redondeados (ancho w0 arriba, w1 abajo). */
function Segment({ len, w0, w1 }: { len: number; w0: number; w1: number }) {
  return (
    <>
      <path d={`M${-w0 / 2} 0 L${w0 / 2} 0 L${w1 / 2} ${len} L${-w1 / 2} ${len} Z`} />
      <circle r={w0 / 2} />
      <circle cy={len} r={w1 / 2} />
    </>
  );
}

type LegRefs = { upper: SVGGElement | null; lower: SVGGElement | null };

function Leg({ leg, refs }: { leg: LegDef; refs: LegRefs }) {
  const knee = leg.w * 0.5;
  const hoof = leg.w * 0.42;
  // pose inicial = la del instante 0 del galope (así nunca se ven las patas rectas)
  const p0 = leg.phase % 1;
  const g = GAIT[leg.kind];
  return (
    <g transform={`translate(${leg.x} ${leg.y})`} className="leg">
      <g ref={(el) => { refs.upper = el; }} transform={`rotate(${sample(g.t, g.upper, p0)})`}>
        <Segment len={leg.upper} w0={leg.w} w1={knee} />
        <g transform={`translate(0 ${leg.upper})`}>
          <g ref={(el) => { refs.lower = el; }} transform={`rotate(${sample(g.t, g.lower, p0)})`}>
            <Segment len={leg.lower} w0={knee} w1={hoof * 0.8} />
            <path d={`M${-hoof * 0.55} ${leg.lower - 1} L${hoof * 0.7} ${leg.lower - 1} L${hoof * 0.9} ${leg.lower + hoof * 0.7} L${-hoof * 0.6} ${leg.lower + hoof * 0.7} Z`} />
          </g>
        </g>
      </g>
    </g>
  );
}

export function HeroIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bobRef = useRef<SVGGElement>(null);
  const legRefs = useRef<LegRefs[]>(LEGS.map(() => ({ upper: null, lower: null })));
  const [playing, setPlaying] = useState(false);

  // 1) Esperar a que la silueta esté lista (o al tiempo límite) y arrancar todo a la vez.
  useEffect(() => {
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      setPlaying(true);
      rootRef.current?.closest('.hero')?.classList.add('hero--play');
    };
    const img = new window.Image();
    img.src = HORSES_SRC;
    img.decode().then(start, start);
    const timer = window.setTimeout(start, START_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // 2) Galope: mover cada articulación cuadro a cuadro mientras corre.
  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / 1000, RUN_S);
      LEGS.forEach((leg, i) => {
        const g = GAIT[leg.kind];
        const p = ((t / STRIDE_S + leg.phase) % 1 + 1) % 1;
        legRefs.current[i].upper?.setAttribute('transform', `rotate(${sample(g.t, g.upper, p).toFixed(2)})`);
        legRefs.current[i].lower?.setAttribute('transform', `rotate(${sample(g.t, g.lower, p).toFixed(2)})`);
      });
      // el cuerpo sube y baja con cada tranco
      const bob = Math.sin((t / STRIDE_S) * Math.PI * 2) * -6;
      bobRef.current?.setAttribute('transform', `translate(0 ${bob.toFixed(2)})`);
      if (t < RUN_S) raf = requestAnimationFrame(tick);
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

      <div className="intro__run" aria-hidden>
        <svg className="intro__horses" viewBox="0 0 602 602">
          <defs>
            <clipPath id="intro-body">
              <polygon points={BODY_CLIP} />
            </clipPath>
          </defs>
          <g ref={bobRef}>
            {LEGS.map((leg, i) => (leg.layer === 'back' ? <Leg key={i} leg={leg} refs={legRefs.current[i]} /> : null))}
            <image href={HORSES_SRC} width="602" height="602" clipPath="url(#intro-body)" />
            {LEGS.map((leg, i) => (leg.layer === 'front' ? <Leg key={i} leg={leg} refs={legRefs.current[i]} /> : null))}
          </g>
        </svg>
      </div>

      <Image src={logo} alt="" priority sizes="240px" className="intro__logo" />
    </div>
  );
}
