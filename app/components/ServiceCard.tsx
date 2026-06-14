import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  readMoreText: string;
  locale: string;
  slug: string;
}

export default function ServiceCard({ title, description, image, readMoreText, locale, slug }: ServiceCardProps) {
  const isRtl = locale === 'ar';

  return (
    <article className="group flex flex-col bg-bg-card rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover-lift transition-all duration-300">
      
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

        {/* Read More link anchor */}
        <div className="mt-auto pt-2">
          <Link
            href={`/${locale}/services/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-secondary-dark hover:text-secondary hover:underline transition-colors duration-200"
            aria-label={`${readMoreText} - ${title}`}
          >
            <span>{readMoreText}</span>
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
}
