import Image from 'next/image';
import horses from '@/public/brand/horses-white.png';
import logo from '@/public/brand/logo-futurity.png';

// Intro del hero: la yegua y el potro del escudo entran galopando, se forma el
// disco verde y el anillo blanco, y la escena termina en el logo oficial.
// La silueta está recortada del mismo logo (mismo encuadre), así encaja exacto.
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
        <div className="intro__gallop">
          <Image src={horses} alt="" priority sizes="240px" className="intro__img" />
        </div>
      </div>
      <Image src={logo} alt="" priority sizes="240px" className="intro__img intro__logo" />
    </div>
  );
}
