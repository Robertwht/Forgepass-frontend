'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function statusBadge({ issue_date, expiration_date, status }) {
  if (status === 'revoked') return 'Revoked';
  if (!expiration_date) return 'Valid';
  const now = new Date();
  const exp = new Date(expiration_date);
  const days = Math.ceil((+exp - +now) / (1000 * 60 * 60 * 24));
  if (days < 0) return 'Expired';
  if (days <= 30) return `Expiring in ${days} days`;
  return 'Valid';
}

export default function VerifyPage() {
  const sp = useSearchParams();
  const id = sp.get('id');

  const [data, setData] = useState(null);
  const [state, setState] = useState('idle'); // idle | loading | error | done

  useEffect(() => {
    if (!id) return;
    setState('loading');
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/verify/${encodeURIComponent(id)}`, { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error('not-found');
        return r.json();
      })
      .then((json) => {
        setData(json);
        setState('done');
      })
      .catch(() => setState('error'));
  }, [id]);

  if (!id) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Verification</h1>
        <p>Provide an ID in the URL like <code>?id=FP-123ABC</code>.</p>
      </main>
    );
  }

  if (state === 'loading') {
    return (
      <main style={{ padding: 24 }}>
        <h1>Verification</h1>
        <p>Loading…</p>
      </main>
    );
  }

  if (state === 'error' || !data) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Verification</h1>
        <p>Record not found.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Verification</h1>
      <p><strong>ID:</strong> {data.person.fp_public_id}</p>
      <h2>Certifications</h2>
      {data.certifications.length === 0 && <p>No certifications found.</p>}
      <ul>
        {data.certifications.map((c) => (
          <li key={c.id} style={{ margin: '8px 0' }}>
            <div><strong>{c.name}</strong></div>
            <div>Issued: {c.issue_date} &nbsp;|&nbsp; Expires: {c.expiration_date || '—'}</div>
            <div>Status: {statusBadge(c)}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
