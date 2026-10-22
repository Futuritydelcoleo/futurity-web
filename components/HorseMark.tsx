// Silueta de yegua con potro, inspirada en el escudo de la organización.
// Provisional hasta recibir el logo original en vector.
const HORSE =
  'M20,45 C25,40 35,40 45,41 L60,40 C64,36 68,28 72,22 L76,18 L78,13 L79.5,18.5 C83,22 87,27 88.5,31 ' +
  'L86.5,34 C82,33 78,30.5 75,29.5 C72,34 70,40 68,46 C68,52 67,56 66,60 L67,77 L64,77 L63,63 L61.5,63 ' +
  'L60.5,77 L57.5,77 L57,61 C50,62 40,62 33,60 L31.5,77 L28.5,77 L28,63 L26.5,63 L24.5,77 L21.5,77 ' +
  'L21,60 C19,56 18,52 18.5,48 C14.5,52 12.5,58 11,65 C10,56 13,48 20,45 Z';

type MarkProps = { className?: string; title?: string } & Pick<React.SVGProps<SVGSVGElement>, 'x' | 'y' | 'width' | 'height' | 'color'>;

export function HorseMark({ className, title, ...box }: MarkProps) {
  return (
    <svg viewBox="0 0 100 80" {...box} className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path d={HORSE} fill="currentColor" />
      <path d={HORSE} fill="currentColor" transform="translate(4 32) scale(0.58)" opacity="0.92" />
    </svg>
  );
}

export function SingleHorse({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" className={className} aria-hidden>
      <path d={HORSE} fill="currentColor" />
    </svg>
  );
}
