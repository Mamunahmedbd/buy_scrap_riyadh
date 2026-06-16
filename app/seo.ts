import type { Metadata } from 'next';
import type { Locale } from '../i18n.config';

export const SITE_URL = 'https://riyadhscrappickup.com';
export const SITE_NAME = 'Riyadh Scrap Pickup';
export const SITE_PHONE = '+966 55 000 0000';
export const SITE_PHONE_TEL = '+966550000000';
export const SITE_LOGO = '/images/main-logo.png';
export const DEFAULT_OG_IMAGE = '/images/feature-image-1.png';

export const SERVICE_SLUGS = [
  'ac-conditioner-scrap',
  'copper-scrap',
  'aluminum-scrap',
  'brass-scrap',
  'cables-wires-scrap',
  'computer-electronic-scrap',
  'electrical-panels-scrap',
  'industrial-machinery-scrap',
] as const;

export const AREA_SLUGS = [
  'al-batha',
  'al-olaya',
  'al-malaz',
  'al-naseem',
  'al-aziziyah',
  'al-diriyah',
  'al-sullay',
  'al-kharj',
] as const;

export const BLOG_SLUGS = [
  'understanding-scrap-copper-prices-in-riyadh-2026',
  'how-to-safely-sell-old-air-conditioners-for-cash',
  'the-benefits-of-metal-recycling-for-riyadhs-environment',
] as const;

export const SERVICE_IMAGES: Record<(typeof SERVICE_SLUGS)[number], string> = {
  'ac-conditioner-scrap': '/gallery/ac-scrap/ac-scrap-dismantling-riyadh.png',
  'copper-scrap': '/gallery/copper-scrap/copper-pipes-plumbing-scrap-riyadh.png',
  'aluminum-scrap': '/gallery/aluminum-scrap/aluminum-window-frame-scrap.png',
  'brass-scrap': '/gallery/brass-scrap/brass-valves-plumbing-scrap.png',
  'cables-wires-scrap': '/gallery/cable-wire-scrap/copper-cable-wire-scrap-collection.png',
  'computer-electronic-scrap': '/gallery/computer-scrap/computer-motherboard-e-waste-recycling.png',
  'electrical-panels-scrap': '/gallery/electrical-scrap/electrical-panel-switchboard-scrap-riyadh.png',
  'industrial-machinery-scrap': '/gallery/machinery-scrap/dismantled-industrial-factory-machinery-scrap.png',
};

export const AREA_IMAGES: Record<(typeof AREA_SLUGS)[number], string> = {
  'al-batha': '/gallery/demolition-scrap/building-demolition-scrap-metal-riyadh.png',
  'al-olaya': '/gallery/computer-scrap/computer-motherboard-e-waste-recycling.png',
  'al-malaz': '/gallery/ac-scrap/ac-scrap-dismantling-riyadh.png',
  'al-naseem': '/gallery/aluminum-scrap/aluminum-window-frame-scrap.png',
  'al-aziziyah': '/gallery/cable-wire-scrap/copper-cable-wire-scrap-collection.png',
  'al-diriyah': '/gallery/copper-scrap/copper-pipes-plumbing-scrap-riyadh.png',
  'al-sullay': '/gallery/machinery-scrap/dismantled-industrial-factory-machinery-scrap.png',
  'al-kharj': '/gallery/old-iron-steel-scrap/aged-iron-rebar-stockpile.jpg',
};

export const BLOG_PUBLISHED_DATES: Record<
  (typeof BLOG_SLUGS)[number],
  { published: string; modified: string }
> = {
  'understanding-scrap-copper-prices-in-riyadh-2026': {
    published: '2026-06-12T08:00:00+03:00',
    modified: '2026-06-15T08:00:00+03:00',
  },
  'how-to-safely-sell-old-air-conditioners-for-cash': {
    published: '2026-06-08T08:00:00+03:00',
    modified: '2026-06-15T08:00:00+03:00',
  },
  'the-benefits-of-metal-recycling-for-riyadhs-environment': {
    published: '2026-05-30T08:00:00+03:00',
    modified: '2026-06-15T08:00:00+03:00',
  },
};

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function localizedPath(lang: Locale | string, path = '') {
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${normalizedPath}`;
}

export function localeAlternates(lang: Locale | string, path = '') {
  return {
    canonical: localizedPath(lang, path),
    languages: {
      en: localizedPath('en', path),
      ar: localizedPath('ar', path),
      'x-default': localizedPath('en', path),
    },
  };
}

export function sitemapAlternates(path = '') {
  return {
    languages: {
      en: absoluteUrl(localizedPath('en', path)),
      ar: absoluteUrl(localizedPath('ar', path)),
      'x-default': absoluteUrl(localizedPath('en', path)),
    },
  };
}

export function ogLocale(lang: Locale | string) {
  return lang === 'ar' ? 'ar_SA' : 'en_US';
}

export function buildPageMetadata({
  lang,
  path = '',
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt = title,
  type = 'website',
  keywords,
  publishedTime,
  modifiedTime,
  authors,
}: {
  lang: Locale | string;
  path?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  keywords?: string | string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}): Metadata {
  const canonicalPath = localizedPath(lang, path);
  const fullUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'scrap metal recycling',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: localeAlternates(lang, path),
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: ogLocale(lang),
      alternateLocale: lang === 'ar' ? ['en_US'] : ['ar_SA'],
      type,
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime,
            authors,
          }
        : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
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
    icons: {
      icon: [
        { url: '/favicon.ico' },
        {
          url: '/images/cropped-favicon-32x32.jpeg',
          type: 'image/jpeg',
          sizes: '32x32',
        },
      ],
      shortcut: '/favicon.ico',
    },
  };
}

export function serializeJsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

export function cleanSeoText(text: string) {
  return text.replace(/[\[\]]/g, '');
}

export function buildLocalBusinessSchema(lang: Locale | string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: lang,
        publisher: {
          '@id': `${SITE_URL}/#local-business`,
        },
      },
      {
        '@type': ['LocalBusiness', 'RecyclingCenter'],
        '@id': `${SITE_URL}/#local-business`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl(SITE_LOGO),
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        description,
        telephone: SITE_PHONE,
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
          latitude: 24.6333,
          longitude: 46.7167,
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
        sameAs: [SITE_URL],
      },
    ],
  };
}
