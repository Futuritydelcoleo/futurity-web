import Link from 'next/link';
import { SingleHorse } from './HorseMark';
import { pad } from '@/lib/format';

type Props = {
  slug: string;
  name: string;
  owner?: string | null;
  stable?: string | null;
  registrationCode?: string | null;
  photoUrl?: string | null;
  position?: number;
  extra?: string;
};

export function HorseCard({ slug, name, owner, stable, registrationCode, photoUrl, position, extra }: Props) {
  return (
    <Link href={`/caballos/${slug}`} className="horse-card">
      <div className="horse-card__photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {photoUrl ? <img src={photoUrl} alt={name} /> : <SingleHorse />}
      </div>
      {position !== undefined && <span className="horse-card__pos">{pad(position)}</span>}
      {registrationCode && <span className="horse-card__id">ID {registrationCode}</span>}
      <div className="horse-card__body">
        <span className="horse-card__name">{name}</span>
        {owner && <span className="horse-card__meta">{owner}</span>}
        {stable && stable !== owner && <span className="horse-card__meta">{stable}</span>}
        {extra && <span className="horse-card__meta">{extra}</span>}
      </div>
    </Link>
  );
}
