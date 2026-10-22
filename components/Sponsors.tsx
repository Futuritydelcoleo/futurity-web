import type { Sponsor } from '@/lib/data';
import { Crest } from './Crest';

// Patrocinantes con el estilo de las historias "Sponsors": fondo verde,
// escudo de marca de agua y la franja blanca "Patrocinante oficial".
function SponsorLogo({ sponsor, large }: { sponsor: Sponsor; large?: boolean }) {
  const body = sponsor.logo_url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={sponsor.logo_url} alt={sponsor.name} loading="lazy" className={large ? 'sponsor-logo sponsor-logo--lg' : 'sponsor-logo'} />
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

export function Sponsors({ sponsors }: { sponsors: Sponsor[] }) {
  const main = sponsors.filter((s) => s.tier === 'oficial');
  const rest = sponsors.filter((s) => s.tier !== 'oficial');

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
        {rest.map((s) => (
          <div key={s.id} className="sponsor-tile">
            <div className="sponsor-tile__logo">
              <SponsorLogo sponsor={s} />
            </div>
            <span className="sponsor-tile__label">{s.tier === 'medio' ? 'Transmisión oficial' : 'Patrocinante oficial'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
