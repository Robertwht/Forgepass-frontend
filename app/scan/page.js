'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [id, setId] = useState('');
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!id.trim()) return;
    router.push(`/verify?id=${encodeURIComponent(id.trim())}`);
  };

  return (
    <main className="panel">
      <h2 className="section-title">Quick Verify</h2>
      <p className="muted">Enter a ForgePass ID or scan a QR code.</p>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="e.g., FP-DEMO01"
          aria-label="ForgePass ID"
          style={{
            flex: 1, padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)',
            background: 'var(--panel-2)', color: 'var(--text)'
          }}
        />
        <button className="button" type="submit">Verify</button>
        <Link className="link" href="/scan">Scan QR</Link>
      </form>

      <div style={{ marginTop: 16 }}>
        <Link className="link" href="/verify?id=FP-DEMO01">Try Demo ID</Link>
      </div>
    </main>
  );
}

