import type { CompetitionEvent, EventStatus, Stage } from './data';

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MONTHS_LONG = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m: m - 1, d };
}

/** "10 – 12 de diciembre 2026" / "1 de mayo 2026" */
export function eventDates(e: Pick<CompetitionEvent, 'starts_on' | 'ends_on'>, long = true): string {
  if (!e.starts_on) return 'Fecha por anunciar';
  const s = parts(e.starts_on);
  const names = long ? MONTHS_LONG : MONTHS;
  if (!e.ends_on || e.ends_on === e.starts_on) return `${s.d} ${long ? 'de ' : ''}${names[s.m]} ${s.y}`;
  const f = parts(e.ends_on);
  if (f.m === s.m) return `${s.d} – ${f.d} ${long ? 'de ' : ''}${names[s.m]} ${s.y}`;
  return `${s.d} ${names[s.m]} – ${f.d} ${names[f.m]} ${f.y}`;
}

export const STAGE_LABEL: Record<Stage, string> = {
  cf1: 'Caballo del Futuro I',
  cf2: 'Caballo del Futuro II',
  futurity: 'Futurity',
};

export const STAGE_SHORT: Record<Stage, string> = { cf1: 'CF1', cf2: 'CF2', futurity: 'Final' };

export const STATUS_LABEL: Record<EventStatus, string> = {
  programada: 'Programada',
  reprogramada: 'Reprogramada',
  en_curso: 'En vivo',
  finalizada: 'Finalizada',
};

export function ordinal(n: number): string {
  return `${n}.º`;
}

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}
