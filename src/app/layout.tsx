import './globals.css';
import { Inter, Syncopate } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '900'],
});

const syncopate = Syncopate({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-syncopate',
});

export const metadata = {
  title: 'ARSALAN | Software Architect & Digital Creator',
  description: 'Full-Stack Developer, App Creator and Brand Ecosystem Architect.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${syncopate.variable} font-inter bg-white text-foreground antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
