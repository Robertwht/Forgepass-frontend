import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>ForgePass</h1>
      <p>Enter a public ID or scan a QR to verify a certification.</p>
      <Link href="/verify?id=FP-DEMO01">Demo Verify</Link>
    </main>
  );
}

