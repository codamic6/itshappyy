import './globals.css';
import { Inter, Syncopate, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const syncopate = Syncopate({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-syncopate',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'ARSALAN | Software Architect',
  description: 'Full-Stack Developer & Digital Ecosystem Architect.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${syncopate.variable} ${jetbrainsMono.variable} font-inter bg-black text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
