import Image from 'next/image';
import Link from 'next/link';

interface BlogCard {
  title: string;
  excerpt: string;
  date: string;
}

interface LatestNewsSectionProps {
  dict: {
    heading: string;
    headingAccent: string;
    subtext: string;
    readMore: string;
    cards: BlogCard[];
  };
  locale: string;
}

const newsImages = [
  '/gallery/copper-scrap/copper-pipes-plumbing-scrap-riyadh.png',
  '/gallery/ac-scrap/used-split-ac-scrap-units.png',
  '/gallery/aluminum-scrap/aluminum-window-frame-scrap.png',
] as const;

const BLOG_SLUGS = [
  'understanding-scrap-copper-prices-in-riyadh-2026',
  'how-to-safely-sell-old-air-conditioners-for-cash',
  'the-benefits-of-metal-recycling-for-riyadhs-environment',
] as const;

export default function LatestNewsSection({ dict, locale }: LatestNewsSectionProps) {
  const isRtl = locale === 'ar';

  return (
    <section 
      className="w-full py-16 md:py-24 px-4 bg-gray-50 border-t border-gray-100" 
      id="blog"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Section Heading */}
        <h2 id="blog-heading" className="text-3xl md:text-4.5xl font-black text-primary-dark mb-4">
          {dict.heading} <span className="text-secondary">{dict.headingAccent}</span>
        </h2>
        
        {/* Supporting subtext description */}
        <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16">
          {dict.subtext}
        </p>

        {/* 3 Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          {dict.cards.map((card, idx) => {
            const slug = BLOG_SLUGS[idx] || '';

            return (
              <article 
                key={idx}
                className="group flex flex-col bg-bg-card rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover-lift transition-all duration-300"
              >
                {/* Thumbnail Image */}
                <div className="relative h-48 md:h-56 w-full bg-gray-100 overflow-hidden shrink-0">
                  <Image
                    src={newsImages[idx]}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
                </div>

                {/* Content Details */}
                <div className="flex flex-col flex-grow p-6">
                  {/* Publish Date */}
                  <span className="text-xs font-semibold text-secondary-dark tracking-wider uppercase mb-2 block font-mono">
                    {card.date}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-primary-dark group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug mb-3">
                    {card.title}
                  </h3>

                  {/* Excerpt Summary */}
                  <p className="text-text-muted text-sm md:text-base leading-relaxed flex-grow line-clamp-3 mb-6">
                    {card.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/${locale}/blog/${slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-primary hover:text-primary-light transition-colors duration-200"
                      aria-label={`${dict.readMore} - ${card.title}`}
                    >
                      <span>{dict.readMore}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
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
  );
}
