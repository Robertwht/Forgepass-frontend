async function getData(id) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/verify/${id}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

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

export default async function VerifyPage({ params }) {
  const { id } = params;
  let data;
  try { 
    data = await getData(id); 
  } catch (e) {
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

