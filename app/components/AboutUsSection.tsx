import Image from 'next/image';
import { SITE_NAME } from '../seo';

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
      className="relative w-full py-20 md:py-28 px-4 bg-primary text-white overflow-hidden" 
      id="about"
      aria-labelledby="about-heading"
    >
      {/* Background visual decorations */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary-light to-primary-dark opacity-95 pointer-events-none" />
      <div className="absolute bottom-0 start-0 w-80 h-80 rounded-full glow-sphere-primary opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-start gap-6">
          
          {/* Section Heading */}
          <h2 id="about-heading" className="text-4xl md:text-5xl font-black text-white relative tracking-tight">
            {dict.heading}
            <span className="block w-16 h-1 bg-secondary mt-4 rounded-full" />
          </h2>

          {/* Description Paragraphs */}
          <div className="flex flex-col gap-4 text-white/80 text-base leading-relaxed font-medium">
            <p>{dict.paragraph1}</p>
            <p>{dict.paragraph2}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <a
              href={`tel:${callPhone}`}
              className="flex items-center justify-center gap-2.5 bg-secondary hover:bg-secondary-light text-primary-dark font-black px-7 py-4 rounded-xl text-base transition-all duration-300 shadow-lg hover:scale-[1.04] cursor-pointer hover:shadow-secondary/20"
            >
              <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{dict.buttonCall}</span>
            </a>
            
            <a
              href={`tel:${callPhone}`}
              className="flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-extrabold px-7 py-4 rounded-xl text-base transition-all duration-300 shadow-md hover:scale-[1.04] cursor-pointer backdrop-blur-md"
            >
              <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{dict.buttonScrapNumber}</span>
            </a>
          </div>

        </div>

        {/* Right Side: Image Showcase */}
        <div className="lg:col-span-5 relative h-[300px] md:h-[420px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          <Image
            src="/gallery/cable-wire-scrap/electrical-wiring-scrap-bulk-riyadh.png"
            alt={locale === 'ar' ? 'فريق الرياض لنقل وشراء السكراب في الموقع' : `${SITE_NAME} team working on site`}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
