import { notFound } from 'next/navigation';
import { hasLocale, getDictionary } from './dictionaries';

// Import all sections
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

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <main>
      <h1 className="sr-only">
        {lang === 'ar' 
          ? 'أفضل شركة شراء سكراب بالرياض ونقل مجاني بأعلى الأسعار' 
          : 'Best Scrap Buyer Company in Riyadh - Free Pickup and Top Cash Prices'
        }
      </h1>
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
