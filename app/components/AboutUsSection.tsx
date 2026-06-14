import Image from 'next/image';

interface AboutUsSectionProps {
  dict: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    buttonCall: string;
    buttonScrapNumber: string;
  };
  locale: string;
}

export default function AboutUsSection({ dict, locale }: AboutUsSectionProps) {
  // Clean phone links
  const callPhone = '+966550000000';

  return (
    <section 
      className="w-full py-16 md:py-24 px-4 bg-primary text-white overflow-hidden" 
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-start gap-6">
          
          {/* Section Heading */}
          <h2 id="about-heading" className="text-3xl md:text-4.5xl font-black text-white relative">
            {dict.heading}
            <span className="block w-16 h-1.5 bg-secondary mt-3 rounded-full" />
          </h2>

          {/* Description Paragraphs */}
          <div className="flex flex-col gap-4 text-white/90 text-sm md:text-base leading-relaxed">
            <p>{dict.paragraph1}</p>
            <p>{dict.paragraph2}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <a
              href={`tel:${callPhone}`}
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-light text-primary-dark font-black px-6 py-3.5 rounded-xl text-base transition-all duration-200 shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{dict.buttonCall}</span>
            </a>
            
            <a
              href={`tel:${callPhone}`}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold px-6 py-3.5 rounded-xl text-base transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{dict.buttonScrapNumber}</span>
            </a>
          </div>

        </div>

        {/* Right Side: Image Showcase */}
        <div className="lg:col-span-5 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src="/images/Scrap-image-2-scaled.jpg"
            alt={locale === 'ar' ? 'فريق شراء سكراب الرياض في الموقع' : 'Riyadh Scrap Buyer team working on site'}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent" />
        </div>

      </div>
    </section>
  );
}
