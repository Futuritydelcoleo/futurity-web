import { youtubeVideoId } from './format';

export type LiveVideo = {
  id: string;
  title: string | null;
  kind: 'manual' | 'live' | 'latest';
};

const REVALIDATE = { next: { revalidate: 60 } };

/** Si el canal está transmitiendo, YouTube apunta /live al video del directo. */
async function currentLiveId(channelId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/channel/${channelId}/live`, {
      ...REVALIDATE,
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'es' },
    });
    const html = await res.text();
    const canonical = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/);
    return canonical ? canonical[1] : null;
  } catch {
    return null;
  }
}

/** Último video publicado en el canal (feed RSS público, sin API key). */
async function latestVideo(channelId: string): Promise<{ id: string; title: string } | null> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, REVALIDATE);
    const xml = await res.text();
    const entry = xml.split('<entry>')[1];
    const id = entry?.match(/<yt:videoId>([^<]+)/)?.[1];
    const title = entry?.match(/<title>([^<]+)/)?.[1];
    return id ? { id, title: title ?? '' } : null;
  } catch {
    return null;
  }
}

/**
 * Qué mostrar en /en-vivo, en orden de prioridad:
 * 1. el enlace que la organización cargó a mano, 2. el directo en curso del canal,
 * 3. la última transmisión publicada.
 */
export async function resolveLiveVideo(manualUrl: string, channelId: string): Promise<LiveVideo | null> {
  const manual = manualUrl ? youtubeVideoId(manualUrl) : null;
  if (manual) return { id: manual, title: null, kind: 'manual' };
  if (!channelId) return null;

  const live = await currentLiveId(channelId);
  if (live) return { id: live, title: null, kind: 'live' };

  const latest = await latestVideo(channelId);
  return latest ? { id: latest.id, title: latest.title, kind: 'latest' } : null;
}

export function embedUrl(video: LiveVideo): string {
  const autoplay = video.kind === 'latest' ? '' : '&autoplay=1&mute=1';
  return `https://www.youtube.com/embed/${video.id}?rel=0${autoplay}`;
}
