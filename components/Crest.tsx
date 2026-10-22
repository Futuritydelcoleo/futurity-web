import Image from 'next/image';
import logo from '@/public/brand/logo-futurity.png';

// Escudo oficial "Caballo del Futuro · Futurity · Est. 2022".
export function Crest({ size = 160, className, priority }: { size?: number; className?: string; priority?: boolean }) {
  return (
    <Image
      src={logo}
      alt="Escudo Futurity del Coleo"
      width={size}
      height={size}
      className={className}
      priority={priority}
      sizes={`${size}px`}
    />
  );
}
