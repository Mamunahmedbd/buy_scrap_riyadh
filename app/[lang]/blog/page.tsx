import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { locales } from '../../../i18n.config';
import { getDictionary, hasLocale } from '../dictionaries';
import { buildPageMetadata } from '../../seo';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeroBanner from '../../components/PageHeroBanner';
import CtaContactBanner from '../../components/CtaContactBanner';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

const BLOG_SLUGS = [
  'understanding-scrap-copper-prices-in-riyadh-2026',
  'how-to-safely-sell-old-air-conditioners-for-cash',
  'the-benefits-of-metal-recycling-for-riyadhs-environment',
] as const;

const newsImages = [
  '/gallery/copper-scrap/copper-pipes-plumbing-scrap-riyadh.png',
  '/gallery/ac-scrap/used-split-ac-scrap-units.png',
  '/gallery/aluminum-scrap/aluminum-window-frame-scrap.png',
] as const;

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }

  const dict = await getDictionary(lang);
  const blogIndex = dict.blogIndex;

  return buildPageMetadata({
    lang,
    path: '/blog',
    title: blogIndex.title,
    description: blogIndex.description,
    image: '/gallery/copper-scrap/copper-pipes-plumbing-scrap-riyadh.png',
    imageAlt: blogIndex.heroTitle.replace(/[\[\]]/g, ''),
  });
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const blogIndex = dict.blogIndex;
  const isRtl = lang === 'ar';

  return (
    <main className="w-full">
      {/* Hero Banner */}
      <PageHeroBanner
        title={blogIndex.heroTitle}
        subtitle={blogIndex.heroSubtitle}
        backgroundImage="/background.png"
        locale={lang}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        locale={lang}
        items={[{ label: dict.shared.breadcrumbBlog }]}
      />

      {/* Articles Grid Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Headers */}
          <div className="text-center md:text-start mb-12 flex flex-col gap-3">
            <span className="text-xs font-bold text-secondary-dark tracking-wider uppercase bg-secondary/15 text-primary-dark px-3 py-1 rounded-full w-max mx-auto md:mx-0">
              {isRtl ? 'آخر مقالاتنا' : 'Latest Articles'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary-dark tracking-tight">
              {blogIndex.subheading}
            </h2>
            <p className="text-text-muted text-base md:text-lg max-w-xl">
              {blogIndex.subtext}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.latestNews.cards.map((card, idx) => {
              const slug = BLOG_SLUGS[idx] || '';
              const image = newsImages[idx] || '/background-2.png';

              return (
                <article
                  key={idx}
                  className="group flex flex-col bg-bg-card rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover-lift transition-all duration-300 text-start"
                >
                  {/* Card Thumbnail */}
                  <div className="relative h-48 sm:h-56 w-full bg-gray-100 overflow-hidden shrink-0">
                    <Image
                      src={image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-50" />
                  </div>

                  {/* Card Details */}
                  <div className="flex flex-col flex-grow p-6">
                    {/* Meta info row */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="text-xs font-semibold text-secondary-dark tracking-wider uppercase font-mono">
                        {card.date}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-lg md:text-xl font-bold text-primary-dark group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug mb-3">
                      <Link href={`/${lang}/blog/${slug}`}>{card.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-text-muted text-sm leading-relaxed flex-grow line-clamp-3 mb-6">
                      {card.excerpt}
                    </p>

                    {/* Read More link */}
                    <div className="mt-auto pt-2 border-t border-gray-100">
                      <Link
                        href={`/${lang}/blog/${slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-extrabold text-primary hover:text-primary-light transition-colors duration-200"
                        aria-label={`${dict.shared.readMore} - ${card.title}`}
                      >
                        <span>{dict.shared.readMore}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${
                            isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Contact Banner */}
      <CtaContactBanner dict={dict.shared} locale={lang} />
    </main>
  );
}
