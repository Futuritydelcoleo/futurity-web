import Link from 'next/link';
import type { Sponsor } from '@/lib/data';
import { Crest } from './Crest';

// Patrocinantes con el estilo de las historias "Sponsors": fondo verde,
// escudo de marca de agua y la franja blanca "Patrocinante oficial".
function SponsorLogo({ sponsor, large }: { sponsor: Sponsor; large?: boolean }) {
  const body = sponsor.logo_url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={sponsor.logo_url} alt={sponsor.name} title={sponsor.name} loading="lazy" className={large ? 'sponsor-logo sponsor-logo--lg' : 'sponsor-logo'} />
  ) : (
    <span className="sponsor-wordmark">{sponsor.name}</span>
  );
  return sponsor.website ? (
    <a href={sponsor.website} target="_blank" rel="noreferrer" aria-label={sponsor.name}>
      {body}
    </a>
  ) : (
    body
  );
}

/** `limit` muestra solo los primeros (portada) con enlace a la página completa. */
export function Sponsors({ sponsors, limit }: { sponsors: Sponsor[]; limit?: number }) {
  const main = sponsors.filter((s) => s.tier === 'oficial');
  const rest = sponsors.filter((s) => s.tier !== 'oficial');
  const shown = limit ? rest.slice(0, limit) : rest;

  return (
    <div className="sponsors-wrap">
      {main.map((s) => (
        <div key={s.id} className="sponsor-hero glow">
          <Crest size={300} className="sponsor-hero__watermark" />
          <SponsorLogo sponsor={s} large />
          <span className="brush">Patrocinante principal</span>
        </div>
      ))}

      <div className="sponsor-grid">
        {shown.map((s) => (
          <div key={s.id} className={`sponsor-tile ${s.tier === 'medio' ? 'sponsor-tile--media' : ''}`}>
            <SponsorLogo sponsor={s} />
            {s.tier === 'medio' && <span className="sponsor-tile__label">Transmisión oficial</span>}
          </div>
        ))}
      </div>

      {limit && rest.length > limit && (
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <Link href="/patrocinantes" className="btn btn--lime">
            Ver los {sponsors.length} patrocinantes
          </Link>
        </div>
      )}
    </div>
  );
}
