import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, getDictionary } from './dictionaries';
import {
  absoluteUrl,
  buildPageMetadata,
  localizedPath,
  serializeJsonLd,
} from '../seo';

import HeroSection from '../components/HeroSection';
import WhatWeBuySection from '../components/WhatWeBuySection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import VideoBanner from '../components/VideoBanner';
import ReviewsSection from '../components/ReviewsSection';
import CtaBannerSection from '../components/CtaBannerSection';
import AboutUsSection from '../components/AboutUsSection';
import ServiceAreasSection from '../components/ServiceAreasSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ContactFormSection from '../components/ContactFormSection';
import GallerySection from '../components/GallerySection';
import FaqSection from '../components/FaqSection';
import LatestNewsSection from '../components/LatestNewsSection';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const dict = await getDictionary(lang);

  return buildPageMetadata({
    lang,
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    image: '/images/background.jpg',
    imageAlt: 'Scrap metal recycling yard in Riyadh',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const serviceItems = [
    dict.whatWeBuy.cards.ac.title,
    dict.whatWeBuy.cards.copper.title,
    dict.whatWeBuy.cards.aluminum.title,
    dict.whatWeBuy.cards.brass.title,
    dict.whatWeBuy.cards.cable.title,
    dict.whatWeBuy.cards.computer.title,
    dict.whatWeBuy.cards.electrical.title,
    dict.whatWeBuy.cards.machinery.title,
  ];
  const homeUrl = absoluteUrl(localizedPath(lang));
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${homeUrl}#webpage`,
    url: homeUrl,
    name: dict.meta.title,
    description: dict.meta.description,
    inLanguage: lang,
    isPartOf: {
      '@id': 'https://riyadhscrappickup.com/#website',
    },
    mainEntity: {
      '@type': 'ItemList',
      name: dict.whatWeBuy.subtext,
      itemListElement: serviceItems.map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
      })),
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeSchema) }}
      />
      <HeroSection dict={dict.hero} locale={lang} />
      <WhatWeBuySection dict={dict.whatWeBuy} locale={lang} />
      <WhyChooseUsSection dict={dict.whyChooseUs} locale={lang} />
      <VideoBanner dict={dict.videoBanner} locale={lang} />
      <ReviewsSection dict={dict.reviews} locale={lang} />
      <CtaBannerSection dict={dict.ctaBanner} locale={lang} />
      <AboutUsSection dict={dict.aboutUs} locale={lang} />
      <ServiceAreasSection dict={dict.serviceAreas} locale={lang} />
      <HowItWorksSection dict={dict.howItWorks} locale={lang} />
      <ContactFormSection dict={dict.contactForm} locale={lang} />
      <GallerySection dict={dict.gallery} locale={lang} />
      <FaqSection dict={dict.faq} locale={lang} />
      <LatestNewsSection dict={dict.latestNews} locale={lang} />
    </main>
  );
}
