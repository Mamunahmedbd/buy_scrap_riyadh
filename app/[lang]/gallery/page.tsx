import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n.config';
import { getDictionary, hasLocale } from '../dictionaries';
import { getGalleryData, type GalleryImage } from '../../_lib/gallery';
import { buildPageMetadata, cleanSeoText, serializeJsonLd, SITE_URL, SITE_NAME } from '../../seo';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeroBanner from '../../components/PageHeroBanner';
import CtaContactBanner from '../../components/CtaContactBanner';
import GalleryExplorer from './_components/GalleryExplorer';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template
  );
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const dict = await getDictionary(lang);
  const galleryPage = dict.galleryPage;
  const title = cleanSeoText(galleryPage.heroTitle);

  return buildPageMetadata({
    lang,
    path: '/gallery',
    title: galleryPage.meta.title,
    description: galleryPage.meta.description,
    image: '/gallery/riyadh-scrap-pickup-service-featured.png',
    imageAlt: title,
  });
}

export default async function GalleryPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const galleryPage = dict.galleryPage;
  const galleryData = await getGalleryData();
  const pageTitle = cleanSeoText(galleryPage.heroTitle);
  const isRtl = lang === 'ar';

  const getCategoryLabel = (slug: string) =>
    galleryPage.categories[slug as keyof typeof galleryPage.categories] ?? slug;

  const getImageCaption = (image: GalleryImage) =>
    formatTemplate(galleryPage.altTemplates.numberedCategoryImage, {
      category: getCategoryLabel(image.categorySlug),
      number: image.sortOrder,
    });

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: pageTitle,
    description: galleryPage.meta.description,
    url: `${SITE_URL}/${lang}/gallery`,
    inLanguage: lang,
    image: galleryData.images.slice(0, 50).map((image) => ({
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}${image.src}`,
      name: getImageCaption(image),
      caption: getImageCaption(image),
      representativeOfPage: false,
    })),
    about: galleryData.categories.map((category) => ({
      '@type': 'Thing',
      name: getCategoryLabel(category.slug),
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: galleryPage.meta.description,
    url: `${SITE_URL}/${lang}/gallery`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(gallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionSchema) }}
      />

      <PageHeroBanner
        title={galleryPage.heroTitle}
        subtitle={galleryPage.heroSubtitle}
        backgroundImage="/gallery/riyadh-scrap-yard-background.png"
        locale={lang}
      />

      <Breadcrumb
        locale={lang}
        items={[{ label: galleryPage.breadcrumbLabel }]}
      />

      <section className="bg-bg-light px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="text-start lg:col-span-7">
            <span className="inline-flex rounded-lg bg-secondary/15 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-primary-dark">
              {galleryPage.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-primary-dark md:text-4xl">
              {galleryPage.heading}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-muted md:text-lg">
              {galleryPage.subtext}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {galleryData.categories.slice(0, 6).map((category) => (
                <div
                  key={category.slug}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-start shadow-sm"
                >
                  <div className="text-sm font-black text-primary-dark">
                    {getCategoryLabel(category.slug)}
                  </div>
                  <div className="mt-1 text-xs font-bold text-text-muted">
                    {category.imageCount} {galleryPage.imageCountLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              <Image
                src="/gallery/riyadh-scrap-pickup-service-featured.png"
                alt={pageTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
              <div
                className={`absolute bottom-0 p-5 text-white ${
                  isRtl ? 'right-0 text-right' : 'left-0 text-left'
                }`}
              >
                <p className="text-sm font-bold text-secondary">
                  {galleryData.images.length} {galleryPage.imageCountLabel}
                </p>
                <p className="mt-1 text-xl font-black">{pageTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GalleryExplorer
        locale={lang}
        categories={galleryData.categories}
        images={galleryData.images}
        dict={{
          allCategory: galleryPage.allCategory,
          imageCountLabel: galleryPage.imageCountLabel,
          viewCategory: galleryPage.viewCategory,
          viewImage: galleryPage.viewImage,
          close: galleryPage.close,
          previousImage: galleryPage.previousImage,
          nextImage: galleryPage.nextImage,
          categories: galleryPage.categories,
          altTemplates: galleryPage.altTemplates,
        }}
      />

      <section className="bg-gray-50 px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-start">
          <h2 className="text-3xl font-black tracking-tight text-primary-dark md:text-4xl">
            {galleryPage.seoIntro.heading}
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-base font-medium leading-relaxed text-text-muted md:text-lg">
            {galleryPage.seoIntro.paragraphs.map((paragraph: string) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <CtaContactBanner dict={dict.shared} locale={lang} />
    </main>
  );
}
