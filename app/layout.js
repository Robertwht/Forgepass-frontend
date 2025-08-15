import './globals.css';
import Image from 'next/image';

export const metadata = {
  title: 'ForgePass',
  description: 'Credential verification'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="header">
            <div className="brand logo" aria-label="ForgePass logo">
              <Image
                src="/logo.png"   // served from /public
                alt="ForgePass logo"
                width={28}
                height={28}
                priority
              />
            </div>
            <div className="title">ForgePass</div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}


