// … keep your imports, statusBadge, useEffect etc. above …

export default function VerifyPage() {
  // ... your existing useSearchParams/useEffect/state code ...

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

  const badgeFor = (c) => {
    const s = statusBadge(c);
    if (s === 'Valid') return <span className="badge ok">Valid</span>;
    if (s.startsWith('Expiring')) return <span className="badge warn">{s}</span>;
    if (s === 'Expired') return <span className="badge bad">Expired</span>;
    if (s === 'Revoked') return <span className="badge bad">Revoked</span>;
    return <span className="badge">{s}</span>;
  };

  return (
    <main className="panel">
      <h2 className="section-title">Verification</h2>
      <p><strong>ID:</strong> {data.person.fp_public_id}</p>

      <h3 className="section-title" style={{ marginTop: 20 }}>Certifications</h3>
      {data.certifications.length === 0 && <p className="muted">No certifications found.</p>}

      <ul className="cert-list">
        {data.certifications.map((c) => (
          <li key={c.id} className="cert-item">
            <div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-meta">Issued: {c.issue_date} &nbsp;|&nbsp; Expires: {c.expiration_date || '—'}</div>
            </div>
            <div className="badges">{badgeFor(c)}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
