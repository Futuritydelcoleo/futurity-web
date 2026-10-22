import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-hero glow grain" style={{ textAlign: 'center', padding: '96px 0' }}>
      <div className="wrap">
        <p className="kicker">Error 404</p>
        <h1 className="display">Se salió de la manga</h1>
        <p className="muted" style={{ margin: '16px auto 28px' }}>No encontramos la página que buscas.</p>
        <Link href="/" className="btn btn--lime">Volver al inicio</Link>
      </div>
    </section>
  );
}
