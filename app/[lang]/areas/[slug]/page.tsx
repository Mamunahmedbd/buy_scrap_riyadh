import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '../../../../i18n.config';
import { getDictionary, hasLocale } from '../../dictionaries';
import {
  absoluteUrl,
  AREA_IMAGES,
  AREA_SLUGS,
  buildPageMetadata,
  cleanSeoText,
  serializeJsonLd,
  SITE_EMAIL,
  SITE_ENTITY_TYPE,
  SITE_LEGAL_NAME,
  SITE_LEGAL_NAME_AR,
  SITE_LOGO,
  SITE_NAME,
  SITE_PHONE,
  SITE_REGISTRATION_DATE,
  SITE_REGISTRATION_NUMBER,
  SITE_STATUS,
  SITE_URL,
} from '../../../seo';
import Breadcrumb from '../../../components/Breadcrumb';
import CtaContactBanner from '../../../components/CtaContactBanner';
import FaqSection from '../../../components/FaqSection';

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

type AreaSlug = (typeof AREA_SLUGS)[number];

interface AreaTextBlock {
  title: string;
  description: string;
}

interface AreaDictionary {
  meta: {
    title: string;
    description: string;
    keywords?: string;
  };
  heroTitle: string;
  heroSubtitle: string;
  overview: {
    heading: string;
    paragraphs: string[];
  };
  highlights: AreaTextBlock[];
  services: {
    heading: string;
    items: AreaTextBlock[];
  };
  neighborhoods: {
    heading: string;
    items: string[];
  };
  process: {
    heading: string;
    steps: AreaTextBlock[];
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

interface AreaPagesDictionary {
  breadcrumbLabel: string;
  highlightsHeading: string;
  faqHeading: string;
  faqAccent: string;
  faqSubtext: string;
  pages: Record<AreaSlug, AreaDictionary>;
}

function isAreaSlug(slug: string): slug is AreaSlug {
  return (AREA_SLUGS as readonly string[]).includes(slug);
}

function renderHighlightedText(text: string) {
  const parts = text.split(/\[(.*?)\]/);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <span key={index} className="text-secondary">
          {part}
        </span>
      );
    }

    return part;
  });
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    for (const slug of AREA_SLUGS) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isAreaSlug(slug)) {
    return {};
  }

  const dict = await getDictionary(lang);
  const areaPages = dict.areaPages as AreaPagesDictionary;
  const areaDict = areaPages.pages[slug];

  if (!areaDict) {
    return {};
  }

  return buildPageMetadata({
    lang,
    path: `/areas/${slug}`,
    title: areaDict.meta.title,
    description: areaDict.meta.description,
    image: AREA_IMAGES[slug],
    imageAlt: cleanSeoText(areaDict.heroTitle),
    keywords: areaDict.meta.keywords,
  });
}

export default async function AreaDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;

  if (!hasLocale(lang) || !isAreaSlug(slug)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const areaPages = dict.areaPages as AreaPagesDictionary;
  const areaDict = areaPages.pages[slug];

  if (!areaDict) {
    notFound();
  }

  const isRtl = lang === 'ar';
  const areaName = cleanSeoText(areaDict.heroTitle);
  const pageUrl = `${SITE_URL}/${lang}/areas/${slug}`;
  const image = AREA_IMAGES[slug];

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#area-service`,
    name: areaName,
    description: areaDict.meta.description,
    url: pageUrl,
    image: absoluteUrl(image),
    serviceType: 'Scrap pickup and recycling service',
    provider: {
      '@type': ['LocalBusiness', 'RecyclingCenter'],
      name: isRtl ? 'شركة الرياض لنقل وشراء السكراب' : SITE_NAME,
      legalName: isRtl ? SITE_LEGAL_NAME_AR : SITE_LEGAL_NAME,
      url: SITE_URL,
      logo: absoluteUrl(SITE_LOGO),
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
        addressRegion: 'Riyadh Province',
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
      '@type': 'Place',
      name: areaName,
      containedInPlace: {
        '@type': 'City',
        name: 'Riyadh',
      },
    },
    inLanguage: lang,
  };

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(areaSchema) }}
      />

      <section className="relative isolate flex min-h-[430px] items-center overflow-hidden bg-primary-dark px-4 py-20 text-white sm:px-6 md:min-h-[500px] md:py-24">
        <Image
          src={image}
          alt={areaName}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-30 object-cover opacity-70"
        />
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-primary-dark via-primary-dark/78 to-primary-dark/45" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-t from-primary-dark via-primary-dark/30 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(245,158,11,0.18),transparent_34%,rgba(15,23,42,0.18)_72%,rgba(245,158,11,0.12))]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 text-start">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
            {areaPages.breadcrumbLabel}
          </span>
          <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
            {renderHighlightedText(areaDict.heroTitle)}
          </h1>
          <p className="max-w-3xl text-base font-semibold leading-relaxed text-white/88 drop-shadow-sm sm:text-lg md:text-xl">
            {areaDict.heroSubtitle}
          </p>
        </div>
      </section>

      <Breadcrumb
        locale={lang}
        items={[
          { label: areaPages.breadcrumbLabel, href: '#service-areas' },
          { label: areaName },
        ]}
      />

      <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-6 text-start lg:col-span-7">
            <span className="w-max rounded-full bg-secondary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-dark">
              {areaPages.breadcrumbLabel}
            </span>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-primary-dark md:text-4.5xl">
              {areaDict.overview.heading}
            </h2>
            <div className="flex flex-col gap-4 text-base font-medium leading-relaxed text-text-muted sm:text-lg">
              {areaDict.overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative h-72 overflow-hidden rounded-2xl border border-gray-100 shadow-lg sm:h-96 lg:col-span-5">
            <Image
              src={image}
              alt={areaDict.overview.heading}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl text-start">
            <h2 className="text-3xl font-black text-primary-dark md:text-4xl">
              {areaPages.highlightsHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {areaDict.highlights.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-200/70 bg-white p-6 text-start shadow-sm"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 text-base font-black text-primary-dark">
                  {index + 1}
                </div>
                <h3 className="mb-3 text-lg font-bold text-primary-dark">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-8 text-3xl font-black text-primary-dark md:text-4xl">
              {areaDict.services.heading}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {areaDict.services.items.map((service) => (
                <article
                  key={service.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-start"
                >
                  <h3 className="mb-3 text-lg font-bold text-primary-dark">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl bg-primary-dark p-6 text-start text-white shadow-lg lg:col-span-5">
            <h2 className="mb-5 text-2xl font-black">{areaDict.neighborhoods.heading}</h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {areaDict.neighborhoods.items.map((item) => (
                <li key={item} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-3xl font-black text-primary-dark md:text-4xl">
            {areaDict.process.heading}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {areaDict.process.steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl bg-white p-6 text-start shadow-sm">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-black text-primary-dark">
                  {index + 1}
                </span>
                <h3 className="mb-3 text-lg font-bold text-primary-dark">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        dict={{
          heading: areaPages.faqHeading,
          headingAccent: areaPages.faqAccent,
          subtext: areaPages.faqSubtext,
          items: areaDict.faq,
        }}
        locale={lang}
      />

      <CtaContactBanner dict={dict.shared} locale={lang} />

      <section className="bg-bg-light px-4 py-14 sm:px-6 md:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <Link
            href={`/${lang}/#service-areas`}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/15 bg-white px-7 py-3 text-sm font-bold text-primary-dark shadow-sm transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md"
          >
            {areaPages.breadcrumbLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
