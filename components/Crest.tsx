import { HorseMark } from './HorseMark';

// Escudo circular "Caballo del Futuro · Futurity · Est. 2022" recreado en SVG.
export function Crest({ size = 160, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} role="img" aria-label="Escudo Futurity del Coleo">
      <defs>
        <path id="crest-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="#fff" />
      <circle cx="100" cy="100" r="94" fill="var(--green-800)" />
      <circle cx="100" cy="100" r="64" fill="none" stroke="#fff" strokeWidth="2" />
      <text fill="#fff" fontSize="15" fontWeight="800" letterSpacing="2.4" fontFamily="var(--font-display)">
        <textPath href="#crest-ring" startOffset="0">
          CABALLO DEL FUTURO ★ CABALLO DEL FUTURO ★
        </textPath>
      </text>
      <text x="100" y="66" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800" letterSpacing="1.5" fontFamily="var(--font-display)">
        FUTURITY
      </text>
      <HorseMark x={52} y={70} width={96} height={77} color="#fff" />
      <text x="100" y="152" textAnchor="middle" fill="#fff" fontSize="7" letterSpacing="1.5" fontFamily="var(--font-display)">
        EST. 2022
      </text>
    </svg>
  );
}
