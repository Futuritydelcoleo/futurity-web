import Image from 'next/image';
import logo from '@/public/brand/logo-futurity.png';

// Intro del hero: la yegua y el potro del escudo entran galopando (patas
// articuladas con muslo y caña), se forma el disco y el anillo, y la escena
// termina en el logo oficial. Todo usa el encuadre 602×602 del logo, así la
// silueta del cuerpo cae exacta sobre el logo al final.

// Zona del cuerpo que se conserva de la silueta (sin patas ni línea de tierra).
const BODY_CLIP =
  '100,150 510,150 510,245 468,245 404,304 400,320 342,322 338,316 312,316 312,346 262,346 262,360 150,360 150,350 100,350';

// Ciclo de galope (0,4 s). Ángulo > 0 lleva el casco hacia atrás: el caballo avanza a la derecha.
const GAIT = {
  front: {
    keyTimes: '0;0.25;0.5;0.72;0.88;1',
    upper: '-38;-8;28;14;-30;-38',
    lower: '-4;0;14;118;40;-4',
  },
  hind: {
    keyTimes: '0;0.18;0.45;0.62;0.82;1',
    upper: '34;20;-34;-28;4;34',
    lower: '8;-78;-30;6;0;8',
  },
};
const STRIDE = 0.4;
const STRIDES = 4;

type LegProps = { x: number; y: number; upper: number; lower: number; w: number; kind: 'front' | 'hind'; delay: number };

function Rotate({ values, keyTimes, delay }: { values: string; keyTimes: string; delay: number }) {
  return (
    <animateTransform
      attributeName="transform"
      type="rotate"
      values={values}
      keyTimes={keyTimes}
      dur={`${STRIDE}s`}
      begin={`${delay}s`}
      repeatCount={STRIDES}
      fill="freeze"
    />
  );
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

// Pata de dos segmentos (muslo/antebrazo y caña) con casco; gira sobre la cadera o el hombro.
function Leg({ x, y, upper, lower, w, kind, delay }: LegProps) {
  const g = GAIT[kind];
  const knee = w * 0.5;
  const hoof = w * 0.42;
  return (
    <g transform={`translate(${x} ${y})`} className="leg">
      <g>
        <Rotate values={g.upper} keyTimes={g.keyTimes} delay={delay} />
        <Segment len={upper} w0={w} w1={knee} />
        <g transform={`translate(0 ${upper})`}>
          <g>
            <Rotate values={g.lower} keyTimes={g.keyTimes} delay={delay} />
            <Segment len={lower} w0={knee} w1={hoof * 0.8} />
            {/* casco: cuña inclinada hacia adelante */}
            <path d={`M${-hoof * 0.55} ${lower - 1} L${hoof * 0.7} ${lower - 1} L${hoof * 0.9} ${lower + hoof * 0.7} L${-hoof * 0.6} ${lower + hoof * 0.7} Z`} />
          </g>
        </g>
      </g>
    </g>
  );
}

export function HeroIntro() {
  return (
    <div className="intro" role="img" aria-label="Escudo Futurity del Coleo">
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
          <g className="intro__bob">
            {/* patas traseras de la yegua: detrás del potro */}
            <Leg x={200} y={312} upper={58} lower={50} w={30} kind="hind" delay={-0.05} />
            <Leg x={224} y={312} upper={58} lower={50} w={30} kind="hind" delay={-0.12} />
            <image href="/brand/horses-white.png" width="602" height="602" clipPath="url(#intro-body)" />
            {/* yegua: manos */}
            <Leg x={360} y={316} upper={54} lower={50} w={22} kind="front" delay={-0.2} />
            <Leg x={380} y={316} upper={54} lower={50} w={22} kind="front" delay={-0.27} />
            {/* potro */}
            <Leg x={160} y={348} upper={36} lower={34} w={17} kind="hind" delay={-0.1} />
            <Leg x={175} y={348} upper={36} lower={34} w={17} kind="hind" delay={-0.17} />
            <Leg x={284} y={342} upper={36} lower={36} w={13} kind="front" delay={-0.25} />
            <Leg x={298} y={342} upper={36} lower={36} w={13} kind="front" delay={-0.32} />
          </g>
        </svg>
      </div>

      <Image src={logo} alt="" priority sizes="240px" className="intro__logo" />
    </div>
  );
}
