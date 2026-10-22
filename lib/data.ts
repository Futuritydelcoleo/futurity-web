import { supabase } from './supabase';

export type Stage = 'cf1' | 'cf2' | 'futurity';
export type EventStatus = 'programada' | 'reprogramada' | 'en_curso' | 'finalizada';

export type Horse = {
  id: string;
  registration_code: string | null;
  name: string;
  slug: string;
  sex: 'macho' | 'hembra' | null;
  birth_year: number;
  aqha_status: string | null;
  owner: string | null;
  stable: string | null;
  photo_url: string | null;
};

export type CompetitionEvent = {
  id: string;
  season: number;
  birth_year: number;
  stage: Stage;
  name: string;
  starts_on: string | null;
  ends_on: string | null;
  venue: string | null;
  city: string | null;
  status: EventStatus;
  live_url: string | null;
};

/** Fila del acumulado. pts_e = puntos, pts_n = nulas, pts_sp = saques de puerta;
 *  cf1_pts / cf2_pts = puntos de cada válida (null si no la corrió). */
export type Standing = {
  position: number;
  athletes: string | null;
  pts_e: number;
  pts_n: number;
  pts_sp: number;
  cf1_pts: number | null;
  cf2_pts: number | null;
  horse: Pick<Horse, 'name' | 'slug' | 'owner' | 'stable' | 'registration_code'>;
};

export type EventResult = {
  event_id: string;
  athlete: string | null;
  position: number | null;
  pts_e: number;
  pts_n: number;
  pts_sp: number;
};

export type Video = {
  youtube_id: string;
  title: string;
  kind: 'dia' | 'sorteo' | 'resumen' | 'otro';
  published_on: string | null;
};

export type EventWithVideos = CompetitionEvent & { videos: Video[] };

/** Válidas de la temporada con sus transmisiones, en orden CF1 → CF2 → Futurity. */
export async function getSeasonVideos(season: number): Promise<EventWithVideos[]> {
  const rows = check(
    await supabase
      .from('events')
      .select('*, videos(youtube_id, title, kind, published_on, sort_order)')
      .eq('season', season)
      .order('sort_order', { referencedTable: 'videos' }),
  ) as EventWithVideos[];
  const order: Stage[] = ['cf1', 'cf2', 'futurity'];
  return rows.sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage));
}

export type News = {
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  category: 'aviso' | 'resultados' | 'revision' | 'evento';
  image_url: string | null;
  published_at: string;
};

const NEWS_COLUMNS = 'slug, title, excerpt, body, category, image_url, published_at';

export async function getNews(limit?: number): Promise<News[]> {
  let q = supabase.from('news').select(NEWS_COLUMNS).order('published_at', { ascending: false });
  if (limit) q = q.limit(limit);
  return check(await q) as News[];
}

export async function getNewsItem(slug: string): Promise<News | null> {
  return check(await supabase.from('news').select(NEWS_COLUMNS).eq('slug', slug).maybeSingle()) as News | null;
}

export type Sponsor = { id: string; name: string; tier: string; logo_url: string | null; website: string | null };

export type Generation = { birth_year: number; title: string; notes: string | null; horses: number };

const HORSE_COLUMNS = 'id, registration_code, name, slug, sex, birth_year, aqha_status, owner, stable, photo_url';

function check<T>(res: { data: T | null; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message);
  return res.data as T;
}

export async function getSettings(): Promise<Record<string, unknown>> {
  const rows = check(await supabase.from('settings').select('key, value'));
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

/** Lee un ajuste de texto; vacío o ausente devuelve el valor por defecto. */
export function setting(settings: Record<string, unknown>, key: string, fallback = ''): string {
  const v = settings[key];
  return typeof v === 'string' && v.trim() ? v : fallback;
}

export async function getCurrentSeason(): Promise<number> {
  const settings = await getSettings();
  return Number(settings.current_season ?? new Date().getFullYear());
}

export async function getSeasonEvents(season: number): Promise<CompetitionEvent[]> {
  const events = check(await supabase.from('events').select('*').eq('season', season));
  const order: Stage[] = ['cf1', 'cf2', 'futurity'];
  return (events as CompetitionEvent[]).sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage));
}

export async function getStandings(season: number): Promise<Standing[]> {
  const rows = check(
    await supabase
      .from('standings')
      .select('position, athletes, pts_e, pts_n, pts_sp, cf1_pts, cf2_pts, horse:horses(name, slug, owner, stable, registration_code)')
      .eq('season', season)
      .order('position'),
  );
  return rows as unknown as Standing[];
}

/** Resultados de una válida con forma de fila de ranking: primero los puestos oficiales publicados,
 *  luego por puntos (empates comparten puesto). */
export async function getStageResults(season: number, stage: Stage) {
  const event = check(
    await supabase.from('events').select('*').eq('season', season).eq('stage', stage).maybeSingle(),
  ) as CompetitionEvent | null;
  if (!event) return null;

  const [results, standings] = await Promise.all([
    supabase
      .from('event_results')
      .select('athlete, position, pts_e, pts_n, pts_sp, horse:horses(id, name, slug, owner, stable, registration_code)')
      .eq('event_id', event.id),
    supabase.from('standings').select('horse_id, athletes').eq('season', season),
  ]);
  const athletes = new Map((check(standings) as { horse_id: string; athletes: string | null }[]).map((s) => [s.horse_id, s.athletes]));

  type Row = Omit<EventResult, 'event_id'> & { horse: Horse };
  const sorted = (check(results) as unknown as Row[]).sort(
    (a, b) => (a.position ?? 1e9) - (b.position ?? 1e9) || b.pts_e - a.pts_e || a.pts_n - b.pts_n,
  );

  const rows: Standing[] = [];
  sorted.forEach((r, i) => {
    const prev = sorted[i - 1];
    const tied = prev && prev.position == null && r.position == null && prev.pts_e === r.pts_e;
    rows.push({
      position: r.position ?? (tied ? rows[i - 1].position : i + 1),
      athletes: r.athlete ?? athletes.get(r.horse.id) ?? null,
      pts_e: r.pts_e,
      pts_n: r.pts_n,
      pts_sp: r.pts_sp,
      cf1_pts: null,
      cf2_pts: null,
      horse: r.horse,
    });
  });
  return { event, rows };
}

export async function getSponsors(): Promise<Sponsor[]> {
  return check(
    await supabase.from('sponsors').select('id, name, tier, logo_url, website').eq('active', true).order('sort_order'),
  );
}

export async function getGenerations(): Promise<Generation[]> {
  const rows = check(
    await supabase.from('generations').select('birth_year, title, notes, horses(count)').order('birth_year', { ascending: false }),
  );
  return rows.map((g) => ({
    birth_year: g.birth_year,
    title: g.title,
    notes: g.notes,
    horses: (g.horses as unknown as { count: number }[])[0]?.count ?? 0,
  }));
}

export async function getGeneration(year: number) {
  const generation = check(
    await supabase.from('generations').select('birth_year, title, notes').eq('birth_year', year).maybeSingle(),
  ) as Omit<Generation, 'horses'> | null;
  if (!generation) return null;
  const horses = check(
    await supabase.from('horses').select(HORSE_COLUMNS).eq('birth_year', year).order('registration_code', { nullsFirst: false }).order('name'),
  ) as Horse[];
  return { generation, horses };
}

export async function getHorse(slug: string) {
  const horse = check(await supabase.from('horses').select(HORSE_COLUMNS).eq('slug', slug).maybeSingle()) as Horse | null;
  if (!horse) return null;

  const [events, results, standing] = await Promise.all([
    supabase.from('events').select('*').eq('birth_year', horse.birth_year),
    supabase.from('event_results').select('event_id, athlete, position, pts_e, pts_n, pts_sp').eq('horse_id', horse.id),
    supabase.from('standings').select('season, position, athletes, pts_e, pts_n, pts_sp').eq('horse_id', horse.id).maybeSingle(),
  ]);

  const order: Stage[] = ['cf1', 'cf2', 'futurity'];
  return {
    horse,
    events: (check(events) as CompetitionEvent[]).sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage)),
    results: check(results) as EventResult[],
    standing: check(standing) as (Omit<Standing, 'horse'> & { season: number }) | null,
  };
}
