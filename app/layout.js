import './globals.css';

export const metadata = {
  title: 'Campus POS Kiosk',
  description: 'Touchscreen Point-of-Sale (POS) Kiosk Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
