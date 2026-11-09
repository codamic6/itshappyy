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
  title: 'CARET | Professional Architect',
  description: 'Global Digital Ecosystem Architect & Full-Stack Developer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${syncopate.variable} ${jetbrainsMono.variable} font-inter bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}