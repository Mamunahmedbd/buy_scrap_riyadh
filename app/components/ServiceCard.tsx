import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  readMoreText: string;
  buyNowText: string;
  locale: string;
  slug: string;
}

export default function ServiceCard({ title, description, image, readMoreText, buyNowText, locale, slug }: ServiceCardProps) {
  const isRtl = locale === 'ar';

  return (
    <article className="group flex flex-col bg-bg-card rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:border-secondary/30 hover:shadow-md transition-all duration-300">
      
      {/* Category Thumbnail Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content details */}
      <div className="flex flex-col flex-grow p-5 md:p-6 text-start">
        <h3 className="text-lg md:text-xl font-bold text-primary-dark group-hover:text-primary transition-colors duration-200 mb-2">
          {title}
        </h3>
        <p className="text-text-muted text-sm md:text-base leading-relaxed flex-grow mb-5">
          {description}
        </p>

        {/* Action buttons row */}
        <div className="mt-auto flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch gap-2.5 pt-2">
          {/* Primary Buy Now CTA */}
          <Link
            href={`tel:+966550000000`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary-light text-primary-dark text-[13px] sm:text-sm font-extrabold px-3 sm:px-4 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-sm whitespace-nowrap"
            aria-label={`${buyNowText} - ${title}`}
          >
            <svg className="w-3.5 h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="truncate">{buyNowText}</span>
          </Link>

          {/* Secondary Read More link */}
          <Link
            href={`/${locale}/services/${slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-primary/20 hover:border-primary/40 text-primary text-[13px] sm:text-sm font-bold px-3 sm:px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-primary/5 whitespace-nowrap"
            aria-label={`${readMoreText} - ${title}`}
          >
            <span className="truncate">{readMoreText}</span>
            <svg 
              className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${isRtl ? 'rotate-180' : ''}`}
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
}
