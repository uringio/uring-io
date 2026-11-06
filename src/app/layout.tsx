import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/global.css';
import { themeInitScript } from '@/theme/preference';

export const metadata: Metadata = {
  title: 'uring.io',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // the inline script sets `data-theme` on <html> before hydration, so React would otherwise flag the attribute as a server/client mismatch. suppression applies to this element only.
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed build-time string with no user input; it must run inline before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
