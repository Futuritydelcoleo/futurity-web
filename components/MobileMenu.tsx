'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Menú desplegable para teléfonos: se cierra solo al cambiar de página.
export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="mobile-menu__toggle"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden className={`burger ${open ? 'burger--open' : ''}`}>
          <i />
          <i />
          <i />
        </span>
      </button>
      {open && (
        <nav id="mobile-menu-panel" className="mobile-menu__panel" aria-label="Menú">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
