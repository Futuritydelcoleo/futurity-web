import Link from 'next/link';
import { Crest } from './Crest';

const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/ranking', label: 'Ranking' },
  { href: '/generaciones', label: 'Generaciones' },
];

export function Header({ liveUrl }: { liveUrl: string }) {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="brand" aria-label="Futurity del Coleo, inicio">
          <Crest size={44} />
          <span className="brand__name">
            Futurity <small>del Coleo</small>
          </span>
        </Link>
        <nav className="nav" aria-label="Principal">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <a className="btn btn--live btn--sm" href={liveUrl} target="_blank" rel="noreferrer">
            <span className="live-dot" aria-hidden /> En vivo
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ instagram, youtube }: { instagram: string; youtube: string }) {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div className="brand">
          <Crest size={56} />
          <span className="brand__name">
            Futurity <small>del Coleo</small>
          </span>
        </div>
        <p className="muted">
          El caballo es el protagonista. Competencia para equinos de 5 años, revisados y registrados por nuestro equipo
          técnico de médicos veterinarios.
        </p>
        <ul className="footer-links">
          <li><a href={instagram} target="_blank" rel="noreferrer">Instagram</a></li>
          <li><a href={youtube} target="_blank" rel="noreferrer">YouTube</a></li>
          <li><a href="mailto:info@futuritydelcoleo.com">info@futuritydelcoleo.com</a></li>
        </ul>
        <p className="footer-credit">
          Resultados en vivo por <a href="https://tiempovaquero.com" target="_blank" rel="noreferrer">Tiempo Vaquero</a>
        </p>
      </div>
    </footer>
  );
}
