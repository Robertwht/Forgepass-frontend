import Link from 'next/link';

export default function Home() {
  return (
    <main className="panel">
      <h2 className="section-title">Quick Start</h2>
      <p className="muted">
        Enter a public ID or scan a QR to verify a certification. Try the demo:
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <Link className="button" href="/verify?id=FP-DEMO01">Open Demo Verify</Link>
        <a className="link" href="https://github.com/Robertwht/Forgepass-frontend" target="_blank" rel="noreferrer">
          View Repo
        </a>
      </div>
    </main>
  );
}

