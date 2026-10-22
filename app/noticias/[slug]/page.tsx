import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NewsCard } from '@/components/NewsCard';
import { getNews, getNewsItem } from '@/lib/data';
import { NEWS_CATEGORY, newsDate } from '@/lib/format';

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return { title: 'Noticia no encontrada' };
  return {
    title: item.title,
    description: item.excerpt ?? undefined,
    openGraph: { title: item.title, description: item.excerpt ?? undefined, images: item.image_url ? [item.image_url] : undefined },
  };
}

export default async function NewsItemPage({ params }: Params) {
  const { slug } = await params;
  const [item, latest] = await Promise.all([getNewsItem(slug), getNews(4)]);
  if (!item) notFound();
  const more = latest.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      <article className="section" style={{ paddingTop: 40 }}>
        <div className="wrap article">
          <Link href="/noticias" className="back">← Noticias</Link>
          <span className={`news-tag news-tag--${item.category}`} style={{ position: 'static' }}>
            {NEWS_CATEGORY[item.category]}
          </span>
          <h1 className="display article__title">{item.title}</h1>
          <time className="news-card__date" dateTime={item.published_at}>{newsDate(item.published_at)}</time>
          {item.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="article__image" src={item.image_url} alt="" />
          )}
          <div className="article__body">
            {item.body.split(/\n\s*\n/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <h2 className="display">Más noticias</h2>
            </div>
            <div className="news-grid">
              {more.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
