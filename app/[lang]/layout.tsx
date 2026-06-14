import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, getDictionary } from './dictionaries';
import { locales } from '../../i18n.config';
import '../globals.css';

// Import shell components
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Load Inter (for English) and Cairo (for Arabic)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    metadataBase: new URL('https://riyadhscrapbuyer.com'),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        ar: '/ar',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://riyadhscrapbuyer.com/${lang}`,
      siteName: 'Riyadh Scrap Buyer',
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/main-logo.png',
          width: 800,
          height: 600,
          alt: 'Riyadh Scrap Buyer Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/images/main-logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  // Set font family and alignment direction based on locale
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const fontStyle = isRtl ? cairo.style.fontFamily : inter.style.fontFamily;

  // JSON-LD LocalBusiness Schema for structured SEO data
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://riyadhscrapbuyer.com/#local-business',
    name: lang === 'ar' ? 'شراء سكراب الرياض' : 'Riyadh Scrap Buyer',
    url: `https://riyadhscrapbuyer.com/${lang}`,
    logo: 'https://riyadhscrapbuyer.com/images/main-logo.png',
    image: 'https://riyadhscrapbuyer.com/images/feature-image-1.jpg',
    description: dict.meta.description,
    telephone: '+966 55 000 0000',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Al Batha',
      addressLocality: 'Riyadh',
      addressRegion: 'Riyadh Province',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '24.6333',
      longitude: '46.7167',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Riyadh',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '06:00',
      closes: '22:00',
    },
    sameAs: [
      'https://riyadhscrapbuyer.com',
    ],
  };

  return (
    <html lang={lang} dir={dir} className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/cropped-favicon-32x32.jpeg" type="image/jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className="font-sans antialiased text-text-dark bg-bg-light"
        style={{ '--font-sans': fontStyle } as React.CSSProperties}
      >
        <div className="flex flex-col min-h-screen">
          <TopBar dict={dict.topBar} locale={lang} />
          <Header dict={dict.nav} locale={lang} />
          <div className="flex-grow">{children}</div>
          <Footer dict={dict.footer} locale={lang} />
        </div>
      </body>
    </html>
  );
}
