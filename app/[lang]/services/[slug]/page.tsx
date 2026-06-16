import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { locales } from '../../../../i18n.config';
import { getDictionary, hasLocale } from '../../dictionaries';
import {
  absoluteUrl,
  buildPageMetadata,
  cleanSeoText,
  serializeJsonLd,
  SERVICE_IMAGES,
  SERVICE_SLUGS,
  SITE_URL,
  SITE_NAME,
  SITE_LOGO,
  SITE_EMAIL,
  SITE_ENTITY_TYPE,
  SITE_LEGAL_NAME,
  SITE_LEGAL_NAME_AR,
  SITE_PHONE,
  SITE_REGISTRATION_DATE,
  SITE_REGISTRATION_NUMBER,
  SITE_STATUS,
} from '../../../seo';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeroBanner from '../../../components/PageHeroBanner';
import CtaContactBanner from '../../../components/CtaContactBanner';
import RelatedServicesGrid from '../../../components/RelatedServicesGrid';
import HowItWorksSection from '../../../components/HowItWorksSection';
import FaqSection from '../../../components/FaqSection';

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

type ServiceSlug = (typeof SERVICE_SLUGS)[number];

interface ServiceBenefit {
  title: string;
  description: string;
}

interface ServiceDictionary {
  meta: {
    title: string;
    description: string;
  };
  heroTitle: string;
  heroSubtitle: string;
  overview: {
    heading: string;
    paragraphs: string[];
  };
  benefits: ServiceBenefit[];
  gallery: string[];
  faq: {
    question: string;
    answer: string;
  }[];
}

function isServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug);
}

// Slugs mapping to hero background image
const backgroundImageMapping: Record<ServiceSlug, string> = {
  'ac-conditioner-scrap': '/images/AC-Scrap-Buying-1-scaled.png',
  'copper-scrap': '/images/Copper-Scrap-Buying-2-scaled.png',
  'aluminum-scrap': '/images/Copper-Scrap-Buying-1-scaled.png',
  'brass-scrap': '/gallery/brass-scrap/mixed-yellow-brass-scrap-fittings.png',
  'cables-wires-scrap': '/images/Cable-Wire-Scrap-Buying-1-scaled.png',
  'computer-electronic-scrap': '/gallery/computer-scrap/old-desktop-pc-electronic-scrap.png',
  'electrical-panels-scrap': '/gallery/electrical-scrap/industrial-electrical-control-panel-scrap.png',
  'industrial-machinery-scrap': '/gallery/machinery-scrap/assorted-manufacturing-machinery-scrap-heap.jpg',
};

const backgroundPositionMapping: Record<ServiceSlug, string> = {
  'ac-conditioner-scrap': 'center 52%',
  'copper-scrap': 'center 54%',
  'aluminum-scrap': 'center 54%',
  'brass-scrap': 'center 50%',
  'cables-wires-scrap': 'center 48%',
  'computer-electronic-scrap': 'center 48%',
  'electrical-panels-scrap': 'center 56%',
  'industrial-machinery-scrap': 'center 58%',
};

// Generate static routes for all locales and slugs
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const slug of SERVICE_SLUGS) {
      params.push({ lang, slug });
    }
  }
  return params;
}

// SEO Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isServiceSlug(slug)) {
    return {};
  }

  const dict = await getDictionary(lang);
  const serviceDict = (dict.services as Record<ServiceSlug, ServiceDictionary>)[slug];

  if (!serviceDict) {
    return {};
  }

  const image = SERVICE_IMAGES[slug] || '/images/main-logo.png';

  return buildPageMetadata({
    lang,
    path: `/services/${slug}`,
    title: serviceDict.meta.title,
    description: serviceDict.meta.description,
    image,
    imageAlt: cleanSeoText(serviceDict.heroTitle),
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;

  // Validation
  if (!hasLocale(lang) || !isServiceSlug(slug)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const serviceDict = (dict.services as Record<ServiceSlug, ServiceDictionary>)[slug];

  if (!serviceDict) {
    notFound();
  }

  const isRtl = lang === 'ar';
  const bgImage = backgroundImageMapping[slug] || '/background.png';
  const bgPosition = backgroundPositionMapping[slug] || 'center';
  const serviceName = cleanSeoText(serviceDict.heroTitle);
  const pageUrl = `${SITE_URL}/${lang}/services/${slug}`;

  // Construct JSON-LD Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: serviceName,
    description: serviceDict.meta.description,
    url: pageUrl,
    image: absoluteUrl(bgImage),
    serviceType: serviceName,
    provider: {
      '@type': 'LocalBusiness',
      name: isRtl ? 'الرياض لنقل وشراء السكراب' : SITE_NAME,
      legalName: isRtl ? SITE_LEGAL_NAME_AR : SITE_LEGAL_NAME,
      image: absoluteUrl(SITE_LOGO),
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      identifier: {
        '@type': 'PropertyValue',
        name: 'Saudi Unified National Number',
        value: SITE_REGISTRATION_NUMBER,
      },
      foundingDate: SITE_REGISTRATION_DATE,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Riyadh',
        addressCountry: 'SA',
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Commercial record status',
          value: SITE_STATUS,
        },
        {
          '@type': 'PropertyValue',
          name: 'Entity type',
          value: SITE_ENTITY_TYPE,
        },
      ],
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Riyadh',
    },
    inLanguage: lang,
  };

  return (
    <main className="w-full">
      {/* Dynamic Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />

      {/* Hero Banner Section */}
      <PageHeroBanner
        title={serviceDict.heroTitle}
        subtitle={serviceDict.heroSubtitle}
        backgroundImage={bgImage}
        backgroundPosition={bgPosition}
        variant="service"
        locale={lang}
      />

      {/* Breadcrumbs */}
      <Breadcrumb
        locale={lang}
        items={[
          { label: dict.shared.breadcrumbServices, href: '#services' },
          { label: serviceName },
        ]}
      />

      {/* Section 1: Overview (2-Columns Layout) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-start">
            <span className="text-xs font-bold text-secondary-dark tracking-wider uppercase bg-secondary/10 text-primary-dark px-3.5 py-1.5 rounded-full w-max">
              {isRtl ? 'تفاصيل الخدمة' : 'Service Details'}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-black text-primary-dark tracking-tight leading-tight">
              {serviceDict.overview.heading}
            </h2>
            <div className="flex flex-col gap-4 text-text-muted text-base sm:text-lg leading-relaxed font-medium">
              {serviceDict.overview.paragraphs.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Image Grid Column */}
          <div className="lg:col-span-5 grid grid-cols-12 gap-4 relative">
            {/* Ambient Background Glow Spot */}
            <div className="absolute inset-0 bg-primary/5 rounded-3xl filter blur-2xl -z-10" />

            <div className="col-span-12 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src={bgImage}
                alt={serviceDict.overview.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
            
            {serviceDict.gallery[1] && (
              <div className="col-span-6 relative h-40 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <Image
                  src={serviceDict.gallery[1]}
                  alt={`${serviceDict.overview.heading} secondary image`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
            )}

            {serviceDict.gallery[2] && (
              <div className="col-span-6 relative h-40 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <Image
                  src={serviceDict.gallery[2]}
                  alt={`${serviceDict.overview.heading} gallery image`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Section 2: Features/Benefits Grid (Glassmorphic look) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4.5xl font-black text-primary-dark mb-4">
            {isRtl ? 'لماذا تختار خدماتنا؟' : 'Why Choose Our Service?'}
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto mb-12 md:mb-16">
            {isRtl ? 'نحن نضمن لك أفضل تجربة بيع سكراب بالرياض بأعلى مستويات المهنية' : 'We guarantee the best scrap selling experience in Riyadh with top professional standards'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {serviceDict.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group flex flex-col p-6 rounded-2xl bg-white border border-gray-200/50 shadow-sm hover-lift transition-all duration-300 text-start"
              >
                {/* Visual Accent Badge */}
                <div className="w-12 h-12 rounded-xl bg-secondary/15 text-primary-dark flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-secondary group-hover:text-primary-dark transition-colors duration-300">
                  {idx + 1}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary-dark mb-3">
                  {benefit.title}
                </h3>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <HowItWorksSection dict={dict.howItWorks} locale={lang} />

      {/* Section 4: Service-Specific FAQ */}
      <FaqSection
        dict={{
          heading: isRtl ? 'الأسئلة الشائعة حول' : 'FAQs About',
          headingAccent: isRtl ? 'الخدمة' : 'Service',
          subtext: isRtl
            ? 'إجابات على أكثر الأسئلة شيوعاً حول أسعار وتفكيك ونقل هذا السكراب'
            : 'Answers to the most common questions about pricing, dismantling, and transport of this scrap',
          items: serviceDict.faq,
        }}
        locale={lang}
      />

      {/* Section 5: CTA Contact Banner */}
      <CtaContactBanner dict={dict.shared} locale={lang} />

      {/* Section 6: Related Services Grid */}
      <RelatedServicesGrid currentSlug={slug} dict={dict.whatWeBuy} locale={lang} />
    </main>
  );
}
