import Link from 'next/link';
import { Crest } from './Crest';

const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/ranking', label: 'Ranking' },
  { href: '/generaciones', label: 'Generaciones' },
];

export function Header() {
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
          <Link className="btn btn--live btn--sm" href="/en-vivo">
            <span className="live-dot" aria-hidden /> En vivo
          </Link>
        </nav>
      </div>
    </header>
  );
}

type FooterProps = {
  instagram: string;
  caballoDelFuturo: string;
  youtube: string;
  liveUrl: string;
  email: string;
  location: string;
  venue: string | null;
};

export function Footer({ instagram, caballoDelFuturo, youtube, liveUrl, email, location, venue }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <Crest size={56} />
              <span className="brand__name">
                Futurity <small>del Coleo</small>
              </span>
            </Link>
            <p className="muted">
              El caballo es el protagonista. Competencia para equinos de 5 años, revisados y registrados por nuestro
              equipo técnico de médicos veterinarios.
            </p>
          </div>

          <div>
            <h3 className="footer-title">El Futurity</h3>
            <ul className="footer-list">
              <li><Link href="/en-vivo">Transmisión en vivo</Link></li>
              <li><Link href="/ranking">Ranking acumulado</Link></li>
              <li><Link href="/generaciones">Generaciones</Link></li>
              <li><a href={liveUrl} target="_blank" rel="noreferrer">Resultados en Tiempo Vaquero</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Síguenos</h3>
            <ul className="footer-list">
              <li><a href={instagram} target="_blank" rel="noreferrer">Instagram @futuritydelcoleo_oficial</a></li>
              <li><a href={caballoDelFuturo} target="_blank" rel="noreferrer">Instagram @caballodelfuturo_oficial</a></li>
              <li><a href={youtube} target="_blank" rel="noreferrer">YouTube @futuritydelcoleo</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Contacto oficial</h3>
            <ul className="footer-list">
              {venue && <li className="muted">{venue}</li>}
              <li className="muted">{location}</li>
              <li><a className="footer-email" href={`mailto:${email}`}>{email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Futurity del Coleo. Todos los derechos reservados.</span>
          <a href={liveUrl} target="_blank" rel="noreferrer" className="footer-tv">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/tiempo-vaquero.png" alt="" width={22} height={25} />
            Resultados en vivo por Tiempo Vaquero
          </a>
        </div>
      </div>
    </footer>
  );
}
