import Link from 'next/link';
import type { Stage } from '@/lib/data';

const TABS: { key: Stage | 'acumulado'; label: string; href: string }[] = [
  { key: 'acumulado', label: 'Acumulado', href: '/ranking' },
  { key: 'cf1', label: 'CF1', href: '/ranking/cf1' },
  { key: 'cf2', label: 'CF2', href: '/ranking/cf2' },
  { key: 'futurity', label: 'Futurity', href: '/ranking/futurity' },
];

export function RankingTabs({ active }: { active: Stage | 'acumulado' }) {
  return (
    <nav className="tabs" aria-label="Resultados por válida">
      {TABS.map((t) => (
        <Link key={t.key} href={t.href} className={`tab ${t.key === active ? 'tab--active' : ''}`} aria-current={t.key === active ? 'page' : undefined}>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
