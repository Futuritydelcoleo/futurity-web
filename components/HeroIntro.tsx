'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import logo from '@/public/brand/logo-futurity.png';
import { RIG, type RigPiece } from './heroRig';

// Intro del hero: primero entra la yegua galopando y detrás el potro; frenan,
// pasan del galope al paso y se detienen exactamente en la pose del escudo; se
// forma el disco y el anillo y la escena termina en el logo oficial.
//
// Las piezas (cuerpos, muslos y cañas) están cortadas del propio logo
// (components/heroRig.ts, encuadre 602×602): con todos los ángulos en 0 la
// silueta es idéntica al logo, así el cambio final no se nota.

type Joint = { piece: string; px: number; py: number };
/** `scale`: la pata se toma de otra parte del logo y se coloca escalada con la cadera en `hip`. */
type LegDef = {
  upper: Joint;
  lower: Joint;
  kind: 'front' | 'hind';
  phase: number;
  amp: number;
  scale?: { hip: [number, number]; k: number };
  /** grados que se suman al muslo mientras galopa (se apaga al detenerse) */
  bias?: number;
};

// Ciclo de galope. Ángulo > 0 lleva el casco hacia atrás (avanzan hacia la derecha).
type Track = { t: number[]; upper: number[]; lower: number[] };
const GAIT: Record<'front' | 'hind', Track> = {
  front: { t: [0, 0.25, 0.5, 0.7, 0.85, 1], upper: [-30, -5, 25, 15, -20, -30], lower: [0, 0, 10, 100, 35, 0] },
  hind: { t: [0, 0.2, 0.45, 0.62, 0.82, 1], upper: [28, 15, -28, -22, 5, 28], lower: [0, -70, -25, 5, 0, 0] },
};

// Patas traseras de la yegua: en el logo el potro las tapa, así que mientras corre
// usa las del potro (dibujo real del logo) escaladas a su tamaño. Al detenerse se
// desvanecen y aparecen las cañas propias del logo.
const MARE_HIND_SCALE = 1.65; // tamaño yegua / potro
const FOAL_HIND = { upper: { piece: 'foal_hf_upper', px: 198, py: 352 }, lower: { piece: 'foal_hf_lower', px: 172, py: 378 } };
const MARE_HIND_LEGS: LegDef[] = [
  // la pata del potro ya viene inclinada hacia atrás: se adelanta 22° para que caiga bajo la cadera
  { ...FOAL_HIND, kind: 'hind', phase: 0, amp: 0.8, bias: -22, scale: { hip: [206, 312], k: MARE_HIND_SCALE } },
  { ...FOAL_HIND, kind: 'hind', phase: 0.1, amp: 0.8, bias: -22, scale: { hip: [230, 312], k: MARE_HIND_SCALE } },
];
const MARE_FRONT_LEGS: LegDef[] = [
  { upper: { piece: 'mare_fl_upper', px: 360, py: 322 }, lower: { piece: 'mare_fl_lower', px: 357, py: 375 }, kind: 'front', phase: 0.45, amp: 1 },
  { upper: { piece: 'mare_fr_upper', px: 383, py: 322 }, lower: { piece: 'mare_fr_lower', px: 384, py: 378 }, kind: 'front', phase: 0.55, amp: 1 },
];
const MARE_LEGS = [...MARE_HIND_LEGS, ...MARE_FRONT_LEGS];

const FOAL_LEGS: LegDef[] = [
  { upper: { piece: 'foal_hb_upper', px: 186, py: 350 }, lower: { piece: 'foal_hb_lower', px: 146, py: 386 }, kind: 'hind', phase: 0, amp: 0.75 },
  { upper: { piece: 'foal_hf_upper', px: 198, py: 352 }, lower: { piece: 'foal_hf_lower', px: 172, py: 378 }, kind: 'hind', phase: 0.1, amp: 0.85 },
  { upper: { piece: 'foal_ff1_upper', px: 276, py: 348 }, lower: { piece: 'foal_ff1_lower', px: 296, py: 380 }, kind: 'front', phase: 0.45, amp: 0.85 },
  { upper: { piece: 'foal_ff2_upper', px: 288, py: 350 }, lower: { piece: 'foal_ff2_lower', px: 313, py: 364 }, kind: 'front', phase: 0.55, amp: 0.75 },
];

// Vientre y anca de la yegua que en el logo quedan detrás del potro: línea del
// vientre casi plana a la altura del vientre real (y≈316 junto a las manos).
const MARE_HIDDEN =
  '176,288 176,316 179,324 186,329 198,331 222,328 246,322 272,318 305,317 335,317 346,315 346,300 330,252 282,246 240,262 200,272';

// Coreografía (segundos desde que arranca)
const MARE_RUN = { start: 0, dur: 1.8 };
const FOAL_RUN = { start: 0.35, dur: 1.75 };
const SETTLE = 0.55; // últimos segundos del recorrido: el galope se apaga hasta la pose del logo
const HIDDEN_FADE = { start: 1.75, end: 2.05 };
const START_TIMEOUT_MS = 2500;

const sample = (times: number[], values: number[], p: number) => {
  for (let i = 1; i < times.length; i++) {
    if (p <= times[i]) return values[i - 1] + ((values[i] - values[i - 1]) * (p - times[i - 1])) / (times[i] - times[i - 1]);
  }
  return values[values.length - 1];
};
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);
const smooth = (k: number) => k * k * (3 - 2 * k);

function Piece({ p }: { p: RigPiece }) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <image href={p.src} x={p.x} y={p.y} width={p.w} height={p.h} />;
}

type LegRefs = { upper: SVGGElement | null; lower: SVGGElement | null };

function Leg({ leg, refs }: { leg: LegDef; refs: LegRefs }) {
  const body = (
    <g ref={(el) => { refs.upper = el; }}>
      <Piece p={RIG[leg.upper.piece]} />
      <g ref={(el) => { refs.lower = el; }}>
        <Piece p={RIG[leg.lower.piece]} />
      </g>
    </g>
  );
  if (!leg.scale) return body;
  // pata prestada: se lleva la cadera original a `hip` y se escala alrededor de ella;
  // los giros siguen usando los pivotes originales dentro de este grupo
  const [hx, hy] = leg.scale.hip;
  return <g transform={`translate(${hx} ${hy}) scale(${leg.scale.k}) translate(${-leg.upper.px} ${-leg.upper.py})`}>{body}</g>;
}

export function HeroIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mareRef = useRef<HTMLDivElement>(null);
  const foalRef = useRef<HTMLDivElement>(null);
  const mareBob = useRef<SVGGElement>(null);
  const foalBob = useRef<SVGGElement>(null);
  const hiddenRef = useRef<SVGGElement>(null);
  const cannonsRef = useRef<SVGGElement>(null);
  const mareLegs = useRef<LegRefs[]>(MARE_LEGS.map(() => ({ upper: null, lower: null })));
  const foalLegs = useRef<LegRefs[]>(FOAL_LEGS.map(() => ({ upper: null, lower: null })));
  const [playing, setPlaying] = useState(false);

  // Arrancar cuando las piezas (data URI) y el logo estén listos, con tiempo límite.
  useEffect(() => {
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      setPlaying(true);
      rootRef.current?.closest('.hero')?.classList.add('hero--play');
    };
    const imgs = rootRef.current ? [...rootRef.current.querySelectorAll('image')] : [];
    Promise.all(
      imgs.map((el) => {
        const i = new window.Image();
        i.src = el.getAttribute('href') ?? '';
        return i.decode().catch(() => undefined);
      }),
    ).then(start);
    const timer = window.setTimeout(start, START_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const size = rootRef.current?.getBoundingClientRect().width ?? 230;
    const distance = window.innerWidth * 0.8; // recorrido de entrada en px

    const animateHorse = (
      t: number,
      run: { start: number; dur: number },
      layer: HTMLDivElement | null,
      bob: SVGGElement | null,
      legs: LegDef[],
      refs: LegRefs[],
      stride: number,
    ) => {
      const k = clamp01((t - run.start) / run.dur);
      const travelled = distance * easeOut(k);
      if (layer) layer.style.transform = `translateX(${(travelled - distance).toFixed(1)}px)`;
      // el galope se apaga en el tramo final hasta quedar en la pose del logo
      const remaining = run.start + run.dur - t;
      const amp = t < run.start ? 1 : smooth(clamp01(remaining / SETTLE));
      const cycles = travelled / stride; // las patas avanzan con la distancia: sin "patinar"
      legs.forEach((leg, i) => {
        const g = GAIT[leg.kind];
        const p = (((cycles + leg.phase) % 1) + 1) % 1;
        const a = (sample(g.t, g.upper, p) * leg.amp + (leg.bias ?? 0)) * amp;
        const b = sample(g.t, g.lower, p) * amp * leg.amp;
        refs[i].upper?.setAttribute('transform', `rotate(${a.toFixed(2)} ${leg.upper.px} ${leg.upper.py})`);
        refs[i].lower?.setAttribute('transform', `rotate(${b.toFixed(2)} ${leg.lower.px} ${leg.lower.py})`);
      });
      const lift = Math.sin(cycles * Math.PI * 2) * -7 * amp;
      bob?.setAttribute('transform', `translate(0 ${lift.toFixed(2)})`);
    };

    let raf = 0;
    const t0 = performance.now();
    const end = Math.max(MARE_RUN.start + MARE_RUN.dur, FOAL_RUN.start + FOAL_RUN.dur, HIDDEN_FADE.end);
    // ?introFrame=1.2 congela la escena en ese segundo (para revisar cuadro a cuadro)
    const frozen = Number(new URLSearchParams(window.location.search).get('introFrame'));
    const tick = (now: number) => {
      const t = frozen > 0 ? frozen : Math.min((now - t0) / 1000, end);
      // tranco: la yegua cubre más terreno por ciclo; el potro da pasos más cortos y rápidos
      animateHorse(t, MARE_RUN, mareRef.current, mareBob.current, MARE_LEGS, mareLegs.current, size * 0.95);
      animateHorse(t, FOAL_RUN, foalRef.current, foalBob.current, FOAL_LEGS, foalLegs.current, size * 0.62);
      // lo reconstruido de la yegua desaparece justo cuando el potro lo tapa
      const hide = clamp01((t - HIDDEN_FADE.start) / (HIDDEN_FADE.end - HIDDEN_FADE.start));
      hiddenRef.current?.setAttribute('opacity', (1 - hide).toFixed(3));
      cannonsRef.current?.setAttribute('opacity', hide.toFixed(3));
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

      {/* Yegua (detrás) */}
      <div ref={mareRef} className="intro__horse" aria-hidden>
        <svg className="intro__horses" viewBox="0 0 602 602">
          <g ref={mareBob}>
            {/* reconstruido mientras corre: vientre + patas traseras del potro escaladas */}
            <g ref={hiddenRef}>
              <polygon className="rig-rebuilt" points={MARE_HIDDEN} />
              {MARE_HIND_LEGS.map((leg, i) => (
                <Leg key={i} leg={leg} refs={mareLegs.current[i]} />
              ))}
            </g>
            {/* cañas traseras propias del logo: aparecen al detenerse */}
            <g ref={cannonsRef} opacity={0}>
              <Piece p={RIG.mare_hl_lower} />
              <Piece p={RIG.mare_hr_lower} />
            </g>
            {MARE_FRONT_LEGS.map((leg, i) => (
              <Leg key={i} leg={leg} refs={mareLegs.current[MARE_HIND_LEGS.length + i]} />
            ))}
            <Piece p={RIG.mare_body} />
          </g>
        </svg>
      </div>

      {/* Potro (delante) */}
      <div ref={foalRef} className="intro__horse" aria-hidden>
        <svg className="intro__horses" viewBox="0 0 602 602">
          <g ref={foalBob}>
            {FOAL_LEGS.map((leg, i) => (
              <Leg key={i} leg={leg} refs={foalLegs.current[i]} />
            ))}
            <Piece p={RIG.foal_body} />
          </g>
        </svg>
      </div>

      <Image src={logo} alt="" priority sizes="280px" className="intro__logo" />
    </div>
  );
}
