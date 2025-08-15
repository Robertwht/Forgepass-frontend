import './globals.css';

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
            <div className="brand">FP</div>
            <div className="title">ForgePass</div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}

