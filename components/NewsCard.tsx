import Link from 'next/link';
import type { News } from '@/lib/data';
import { NEWS_CATEGORY, newsDate } from '@/lib/format';
import { Crest } from './Crest';

export function NewsCard({ item, featured }: { item: News; featured?: boolean }) {
  return (
    <Link href={`/noticias/${item.slug}`} className={`news-card ${featured ? 'news-card--featured' : ''}`}>
      <div className="news-card__media">
        {item.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image_url} alt="" loading="lazy" />
        ) : (
          <div className="news-card__art glow">
            <Crest size={featured ? 120 : 84} />
          </div>
        )}
        <span className={`news-tag news-tag--${item.category}`}>{NEWS_CATEGORY[item.category]}</span>
      </div>
      <div className="news-card__body">
        <time className="news-card__date" dateTime={item.published_at}>{newsDate(item.published_at)}</time>
        <h3 className="news-card__title">{item.title}</h3>
        {item.excerpt && <p className="news-card__excerpt">{item.excerpt}</p>}
        <span className="news-card__more">Leer más →</span>
      </div>
    </Link>
  );
}
