import Image from 'next/image';
import Link from 'next/link';

interface ReviewCard {
  name: string;
  review: string;
  rating: number;
}

interface ReviewsSectionProps {
  dict: {
    heading: string;
    buttonQuote: string;
    ratingText: string;
    cards: ReviewCard[];
  };
  locale: string;
}

export default function ReviewsSection({ dict, locale }: ReviewsSectionProps) {
  return (
    <section 
      className="w-full py-16 md:py-24 px-4 bg-white" 
      id="reviews"
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-10">
        
        {/* Rating Header */}
        <div className="flex flex-col items-center gap-3">
          <h2 id="reviews-heading" className="text-2xl md:text-3.5xl font-black text-primary-dark max-w-2xl leading-tight">
            {dict.heading}
          </h2>

          {/* Stars & Text */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-2">
            <div className="flex text-star">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5.5 h-5.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-text-muted">{dict.ratingText}</span>
          </div>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mt-4">
          {dict.cards.map((card, idx) => {
            // Generate initials for avatar
            const initials = card.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <div 
                key={idx}
                className="flex flex-col bg-bg-light border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative text-start"
              >
                {/* Google verified checkmark badge absolute positioned */}
                <div className="absolute top-6 end-6">
                  <Image 
                    src="/images/ti-verified.svg" 
                    alt="Verified Google Review" 
                    width={22} 
                    height={22}
                    className="w-5.5 h-5.5 select-none"
                  />
                </div>

                {/* Stars */}
                <div className="flex text-star mb-4">
                  {[...Array(card.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Message Text */}
                <blockquote className="text-text-muted text-sm md:text-base leading-relaxed italic flex-grow mb-6">
                  &ldquo;{card.review}&rdquo;
                </blockquote>

                {/* Reviewer Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200/50 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary text-secondary font-bold text-xs flex items-center justify-center shrink-0 shadow-inner">
                    {initials}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-primary-dark text-sm md:text-base">{card.name}</cite>
                    <span className="block text-xs text-text-muted">Google Reviewer</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Free quote action button */}
        <div className="mt-4">
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center justify-center bg-secondary hover:bg-secondary-light text-primary-dark font-black px-8 py-4 rounded-xl text-base md:text-lg transition-all duration-200 shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <span>{dict.buttonQuote}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
