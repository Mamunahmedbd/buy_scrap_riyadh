import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { locales } from '../../../../i18n.config';
import { getDictionary, hasLocale } from '../../dictionaries';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeroBanner from '../../../components/PageHeroBanner';
import CtaContactBanner from '../../../components/CtaContactBanner';
import CopyButton from '../../../components/CopyButton';

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

const BLOG_SLUGS = [
  'understanding-scrap-copper-prices-in-riyadh-2026',
  'how-to-safely-sell-old-air-conditioners-for-cash',
  'the-benefits-of-metal-recycling-for-riyadhs-environment',
] as const;

const newsImages = [
  '/images/Copper-Scrap-Buying-1-scaled.jpg',
  '/images/AC-Scrap-Buying-2-scaled.jpg',
  '/images/Scrap-image-4-scaled.jpg',
] as const;

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const slug of BLOG_SLUGS) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !BLOG_SLUGS.includes(slug as any)) {
    return {};
  }

  const dict = await getDictionary(lang);
  const post = (dict.blogPosts as any)[slug];

  if (!post) {
    return {};
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: `https://riyadhscrapbuyer.com/${lang}/blog/${slug}`,
      type: 'article',
      publishedTime: slug.endsWith('2026') ? '2026-06-12T00:00:00Z' : '2026-06-08T00:00:00Z',
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: 800,
          height: 600,
          alt: post.meta.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;

  if (!hasLocale(lang) || !BLOG_SLUGS.includes(slug as any)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const post = (dict.blogPosts as any)[slug];

  if (!post) {
    notFound();
  }

  const isRtl = lang === 'ar';
  const postIndex = BLOG_SLUGS.indexOf(slug as any);

  // Find related articles (excluding the current one)
  const relatedIndices = [0, 1, 2].filter((idx) => idx !== postIndex).slice(0, 2);

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.meta.title,
    image: [
      `https://riyadhscrapbuyer.com${post.featuredImage}`
    ],
    datePublished: slug.endsWith('2026') ? '2026-06-12T08:00:00+03:00' : '2026-06-08T08:00:00+03:00',
    dateModified: '2026-06-15T08:00:00+03:00',
    author: {
      '@type': 'Organization',
      name: post.author,
      url: `https://riyadhscrapbuyer.com/${lang}`,
    },
    publisher: {
      '@type': 'Organization',
      name: isRtl ? 'شراء سكراب الرياض' : 'Riyadh Scrap Buyer',
      logo: {
        '@type': 'ImageObject',
        url: 'https://riyadhscrapbuyer.com/images/main-logo.png',
      },
    },
    description: post.meta.description,
  };

  const shareUrl = `https://riyadhscrapbuyer.com/${lang}/blog/${slug}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${post.meta.title} - ${shareUrl}`)}`;

  // Function to render content blocks cleanly with bracket parsing support
  const renderTextWithLinks = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-primary-dark">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero Banner */}
      <PageHeroBanner
        title={post.heroTitle}
        subtitle={`${post.date} | ${post.author}`}
        backgroundImage={post.featuredImage}
        locale={lang}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        locale={lang}
        items={[
          { label: dict.shared.breadcrumbBlog, href: '/blog' },
          { label: post.meta.title },
        ]}
      />

      {/* Main Content Layout */}
      <section className="py-16 px-4 sm:px-6 bg-white text-start">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          
          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src={post.featuredImage}
              alt={post.meta.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
            />
          </div>

          {/* Article Sections Parser */}
          <div className="flex flex-col gap-6 text-text-dark text-base sm:text-lg leading-relaxed font-medium">
            {post.sections.map((section: any, idx: number) => {
              switch (section.type) {
                case 'paragraph':
                  return <p key={idx} className="text-text-muted">{renderTextWithLinks(section.content)}</p>;
                
                case 'heading':
                  return (
                    <h2 key={idx} className="text-2xl sm:text-3xl font-black text-primary-dark tracking-tight mt-6 mb-2">
                      {section.content}
                    </h2>
                  );
                
                case 'list':
                  return (
                    <ul key={idx} className="list-disc ps-6 flex flex-col gap-2.5 my-2">
                      {section.items.map((item: string, itemIdx: number) => (
                        <li key={itemIdx} className="text-text-muted">
                          {renderTextWithLinks(item)}
                        </li>
                      ))}
                    </ul>
                  );
                
                case 'highlight':
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-secondary/10 border-s-4 border-secondary text-primary-dark font-semibold my-4"
                    >
                      {section.content}
                    </div>
                  );
                
                default:
                  return null;
              }
            })}
          </div>

          {/* Author & Share Panel */}
          <div className="border-t border-b border-gray-100 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary-dark flex items-center justify-center font-bold">
                R
              </div>
              <div className="text-start">
                <p className="text-sm font-bold text-primary-dark">{post.author}</p>
                <p className="text-xs text-text-muted">{post.date}</p>
              </div>
            </div>

            {/* Share Strip */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-primary-dark">{dict.shared.shareArticle}:</span>
              
              {/* WhatsApp Share */}
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-whatsapp/15 text-whatsapp hover:bg-whatsapp hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.48 1.332 5.006L2 22l5.184-1.36c1.468.8 3.12 1.228 4.82 1.228h.008c5.506 0 9.992-4.486 9.992-9.992C22.004 6.48 17.518 2 12.012 2zm0 18.294h-.006c-1.506 0-2.986-.406-4.278-1.176l-.308-.182-3.184.836.85-3.104-.2-.318c-.846-1.344-1.294-2.9-1.294-4.502 0-4.66 3.792-8.452 8.456-8.452 2.256 0 4.38.88 5.976 2.476a8.396 8.396 0 012.472 5.984c.002 4.66-3.792 8.454-8.458 8.454z"/>
                </svg>
              </a>

              {/* Copy URL Link */}
              <CopyButton
                shareUrl={shareUrl}
                successMessage={isRtl ? 'تم نسخ الرابط بنجاح!' : 'Link copied successfully!'}
              />
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-black text-primary-dark mb-6">
              {dict.shared.relatedArticles}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedIndices.map((idx) => {
                const card = dict.latestNews.cards[idx];
                const slug = BLOG_SLUGS[idx] || '';
                const image = newsImages[idx] || '/images/Scrap-image-10-scaled.jpg';

                return (
                  <article
                    key={idx}
                    className="group flex flex-col bg-bg-card rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover-lift transition-all duration-300 text-start"
                  >
                    {/* Card Image */}
                    <div className="relative h-44 w-full bg-gray-100 overflow-hidden shrink-0">
                      <Image
                        src={image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col flex-grow p-5">
                      <span className="text-xs font-semibold text-secondary-dark font-mono mb-1.5 block">
                        {card.date}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-primary-dark group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        <Link href={`/${lang}/blog/${slug}`}>{card.title}</Link>
                      </h4>
                      <p className="text-text-muted text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {card.excerpt}
                      </p>
                      <Link
                        href={`/${lang}/blog/${slug}`}
                        className="mt-auto text-xs font-extrabold text-primary hover:text-primary-light inline-flex items-center gap-1"
                      >
                        <span>{dict.shared.readMore}</span>
                        <svg className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Contact Banner */}
      <CtaContactBanner dict={dict.shared} locale={lang} />
    </main>
  );
}
