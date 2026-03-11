import { Metadata } from 'next';
import { SITE } from '~/config.js';

import Providers from '~/components/atoms/Providers';
import Header from '~/components/widgets/Header';
import Announcement from '~/components/widgets/Announcement';
import Footer from '~/components/widgets/Footer';
import FloatingMarathonCTA from '~/components/widgets/floatingmarathon';
// import MarathonPopup from '~/components/widgets/marathonpopup';
import SiteShell from '~/components/Siteshell';

import { Inter as CustomFont } from 'next/font/google';
import '~/assets/styles/base.css';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),

  title: {
    template: `%s — ${SITE.name}`,
    default: SITE.title,
  },
  description: SITE.description,
  
  keywords: [
    'education',
    'charity',
    'scholarships',
    'west nile',
    'trust fund',
    'uganda',
  ],

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.origin,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: '/og-image.jpg', // place this file in /public folder
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: ['/og-image.jpg'],
  },

  alternates: {
    canonical: SITE.origin,
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`motion-safe:scroll-smooth 2xl:text-[24px] ${customFont.variable} font-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="tracking-tight antialiased text-gray-900 dark:text-slate-300 dark:bg-slate-900">
        <Providers>
          <SiteShell
            navbar={
              <>
                {/* <MarathonPopup /> */}
                <Announcement />
                <Header />
                <FloatingMarathonCTA />
              </>
            }
            footer={<Footer />}
          >
            <main>{children}</main>
          </SiteShell>
        </Providers>
      </body>
    </html>
  );
}
