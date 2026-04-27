
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { EditorProvider } from '@/hooks/use-editor-store';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'CARET | Next-Gen AI Code Editor',
  description: 'A professional, high-performance code editor powered by generative AI.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CARET IDE',
  },
  applicationName: 'CARET IDE',
};

export const viewport: Viewport = {
  themeColor: '#0A0D12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-hidden">
        <FirebaseClientProvider>
          <EditorProvider>
            {children}
          </EditorProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
