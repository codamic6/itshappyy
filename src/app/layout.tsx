
import type {Metadata} from 'next';
import './globals.css';
import { EditorProvider } from '@/hooks/use-editor-store';

export const metadata: Metadata = {
  title: 'CARET | Next-Gen AI Code Editor',
  description: 'A professional, high-performance code editor powered by generative AI.',
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
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <EditorProvider>
          {children}
        </EditorProvider>
      </body>
    </html>
  );
}
