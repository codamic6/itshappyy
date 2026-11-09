import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio | Professional Developer',
  description: 'Zabardast aur modern portfolio showcasing skills and projects.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#050505] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}