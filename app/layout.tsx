import './globals.css';
import 'leaflet/dist/leaflet.css';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Entre Nós',
  description: 'Um cantinho nosso, mesmo quando existe distância.',
};

export const viewport: Viewport = {
  themeColor: '#fbf3ee',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
