import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';

export const metadata = {
  title: 'Beluga Tracker',
  description: '',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beluga-delta.vercel.app/" />
        <meta property="og:title" content="Beluga Tracker" />
        <meta property="og:description" content="Trouvez les prochains attérisages d'un Airbus Beluga à votre aéroport !" />
        <meta property="og:image" content="/og-image.png" />


        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://beluga-delta.vercel.app/" />
        <meta property="twitter:title" content="Beluga Tracker" />
        <meta property="twitter:description" content="Trouvez les prochains attérisages d'un Airbus Beluga à votre aéroport !" />
        <meta property="twitter:image" content="/og-image.png" />
      </head>
        <body>
          <MantineProvider theme={theme} defaultColorScheme="light">{children}</MantineProvider>
        </body>
    </html>
  );
}
