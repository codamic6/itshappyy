import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio | Product & Tech Design',
  description: 'Zabardast aur modern portfolio showcasing tech-focused projects.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0F1115] text-[#EDEFF2] antialiased`}>
        {children}
      </body>
    </html>
  );
}