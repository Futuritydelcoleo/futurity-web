import type { Metadata } from 'next';
import { NewsCard } from '@/components/NewsCard';
import { getNews } from '@/lib/data';

export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Avisos oficiales, resultados y revisiones del Futurity del Coleo y el Caballo del Futuro.',
};

export default async function NewsPage() {
  const news = await getNews();
  const [first, ...rest] = news;

  return (
    <>
      <section className="page-hero glow grain">
        <div className="wrap">
          <p className="kicker">Futurity del Coleo</p>
          <h1 className="display">Noticias</h1>
          <p className="muted">Avisos oficiales, resultados de cada válida y novedades de las revisiones.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap news-list">
          {first ? <NewsCard item={first} featured /> : <div className="empty">Pronto publicaremos novedades.</div>}
          {rest.length > 0 && (
            <div className="news-grid">
              {rest.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
