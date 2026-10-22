import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed, Montserrat } from 'next/font/google';
import { Footer, Header } from '@/components/SiteChrome';
import { getSettings } from '@/lib/data';
import './globals.css';

const display = Montserrat({ subsets: ['latin'], weight: ['800', '900'], style: ['italic', 'normal'], variable: '--font-display' });
const condensed = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-condensed' });
const body = Barlow({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });

export const metadata: Metadata = {
  metadataBase: new URL('https://futuritydelcoleo.com'),
  title: { default: 'Futurity del Coleo', template: '%s · Futurity del Coleo' },
  description:
    'Futurity del Coleo: Caballo del Futuro I, Caballo del Futuro II y la gran final. Ranking, generaciones y la ficha de cada ejemplar.',
};

export const viewport: Viewport = { themeColor: '#062a12' };

export const revalidate = 60;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const s = (k: string, fallback: string) => (typeof settings[k] === 'string' ? (settings[k] as string) : fallback);

  return (
    <html lang="es" className={`${display.variable} ${condensed.variable} ${body.variable}`}>
      <body>
        <Header liveUrl={s('live_url', 'https://tiempovaquero.com')} />
        <main>{children}</main>
        <Footer
          instagram={s('instagram_url', 'https://www.instagram.com/futuritydelcoleo_oficial/')}
          youtube={s('youtube_url', 'https://www.youtube.com/@futuritydelcoleo')}
        />
      </body>
    </html>
  );
}
