import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, getDictionary } from './dictionaries';
import { locales } from '../../i18n.config';
import {
  buildLocalBusinessSchema,
  buildPageMetadata,
  serializeJsonLd,
  SITE_NAME,
} from '../seo';
import '../globals.css';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import LanguageSelectionModal from '../components/LanguageSelectionModal';

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

  return buildPageMetadata({
    lang,
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    image: '/images/feature-image-1.png',
    imageAlt: `${SITE_NAME} scrap collection service`,
  });
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const fontStyle = isRtl ? cairo.style.fontFamily : inter.style.fontFamily;
  const localBusinessSchema = buildLocalBusinessSchema(lang, dict.meta.description);

  return (
    <html lang={lang} dir={dir} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(localBusinessSchema),
          }}
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
        <FloatingWhatsAppButton
          label={dict.shared.ctaButtonWhatsapp}
          phone={dict.topBar.whatsapp}
        />
        <LanguageSelectionModal />
      </body>
    </html>
  );
}
