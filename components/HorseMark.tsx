// Imagen para caballos sin foto: la yegua y el potro del escudo (solo los caballos,
// recortados del logo con su línea de tierra).
export function LogoHorses({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/logo-horses.png" alt="" aria-hidden className={`logo-horses ${className ?? ''}`} width={378} height={283} />;
}
