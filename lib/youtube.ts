import { youtubeVideoId } from './format';

/** Si el canal está transmitiendo, YouTube apunta /live al video del directo. */
async function currentLiveId(channelId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/channel/${channelId}/live`, {
      next: { revalidate: 60 },
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'es' },
    });
    const html = await res.text();
    const canonical = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/);
    return canonical ? canonical[1] : null;
  } catch {
    return null;
  }
}

/**
 * Video del directo actual: primero el enlace que la organización cargó a mano
 * (por si transmiten desde otro canal), si no, el directo en curso del canal.
 */
export async function getLiveVideoId(manualUrl: string, channelId: string): Promise<string | null> {
  const manual = manualUrl ? youtubeVideoId(manualUrl) : null;
  if (manual) return manual;
  return channelId ? currentLiveId(channelId) : null;
}
