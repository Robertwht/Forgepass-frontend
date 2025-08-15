'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// --- Helpers ---
function statusBadge({ expiration_date, status }) {
  if (status === 'revoked') return 'Revoked';
  if (!expiration_date) return 'Valid';
  const now = new Date();
  const exp = new Date(expiration_date);
  const days = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
  if (days < 0) return 'Expired';
  if (days <= 30) return `Expiring in ${days} days`;
  return 'Valid';
}

export default function VerifyPage() {
  const sp = useSearchParams();
  const id = sp.get('id')?.trim() || '';

  const [data, setData] = useState(null);  // person, certifications
  const [state, setState] = useState('idle'); // idle | loading | error | done

  useEffect(() => {
    if (!id) return;

    // Demo fallback
    if (process.env.NEXT_PUBLIC_DEMO === '1' && id === 'FP-DEMO01') {
      setData({
        person: { fp_public_id: 'FP-DEMO01' },
        certifications: [
          { id: '1', name: 'EMT-B', issue_date: '2025-01-01', expiration_date: '2026-01-01', status: 'valid' },
          { id: '2', name: 'CPR/BLS Instructor', issue_date: '2024-10-01', expiration_date: '2025-10-01', status: 'valid' }
        ]
      });
      setState('done');
      return;
    }

    setState('loading');
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/verify/${encodeURIComponent(id)}`, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error('nf');
        return r.json();
      })
      .then(json => {
        setData(json);
        setState('done');
      })
      .catch(() => setState('error'));
  }, [id]);

  const badgeFor = (cert) => {
    const s = statusBadge(cert);
    if (s === 'Valid') return <span className="badge ok">Valid</span>;
    if (s.startsWith('Expiring')) return <span className="badge warn">{s}</span>;
    if (s === 'Expired') return <span className="badge bad">Expired</span>;
    if (s === 'Revoked') return <span className="badge bad">Revoked</span>;
    return <span className="badge">{s}</span>;
  };

  // ==== RENDER ====
  if (!id) {
    return (
      <main className="panel">
        <h2 className="section-title">Verification</h2>
        <p className="muted">Provide an ID in the URL like <code>?id=FP-123ABC</code>.</p>
      </main>
    );
  }
  if (state === 'loading') {
    return (
      <main className="panel">
        <h2 className="section-title">Verification</h2>
        <p className="muted">Loading…</p>
      </main>
    );
  }
  if (state === 'error' || !data) {
    return (
      <main className="panel">
        <h2 className="section-title">Verification</h2>
        <p className="muted">Record not found.</p>
      </main>
    );
  }

  return (
    <main className="panel">
      <h2 className="section-title">Verification</h2>
      <p><strong>ID:</strong> {data.person.fp_public_id}</p>

      <h3 className="section-title" style={{ marginTop: 20 }}>Certifications</h3>
      {data.certifications.length === 0 && <p className="muted">No certifications found.</p>}

      {/* Certifications list */}
<ul className="cert-list">
  {data.certifications.map((c) => (
    <li key={c.id} className="cert-item">
      <div>
        <div className="cert-name">{c.name}</div>
        <div className="cert-meta">
          Issued: {c.issue_date} &nbsp;|&nbsp;
          Expires: {c.expiration_date || '—'}
        </div>
      </div>
      <div className="badges">{badgeFor(c)}</div>
    </li>
  ))}
</ul>

{/* QR for this verification page */}
<div className="qr-wrap">
  <div className="qr-card">
    <QRCodeCanvas
      value={
        typeof window !== 'undefined'
          ? `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(data.person.fp_public_id)}`
          : ''
      }
      size={128}
      level="M"
    />
  </div>
  {typeof window !== 'undefined' && (
    <button
      onClick={() =>
        navigator.clipboard.writeText(
          `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(data.person.fp_public_id)}`
        )
      }
      className="button pill"
    >
      Copy Link
    </button>
  )}
</div>



    </main>
  );
}




