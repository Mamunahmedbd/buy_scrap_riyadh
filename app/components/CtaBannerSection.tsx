import Image from 'next/image';

interface CtaBannerSectionProps {
  dict: {
    heading: string;
    subtext: string;
    buttonCall: string;
  };
  locale: string;
}

export default function CtaBannerSection({ dict }: CtaBannerSectionProps) {
  // Clean phone number format for tel anchor
  const formattedPhone = dict.buttonCall.replace(/[^\d+]/g, '');

  return (
    <section 
      className="relative w-full py-20 px-4 bg-primary-dark text-white text-center border-y border-white/5 overflow-hidden" 
      aria-label="Direct Phone Banner"
      id="cta-banner"
    >
      {/* Background image overlay */}
      <Image
        src="/background-2.jpg"
        alt="Scrap metal recycling yard in Riyadh"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-15 select-none pointer-events-none"
      />

      {/* Dark overlay with tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 via-primary-dark/85 to-primary-dark/95 pointer-events-none" />

      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-sphere-primary opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6">
        
        {/* Title Heading */}
        <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-wide uppercase drop-shadow-md text-gradient-gold">
          {dict.heading}
        </h2>

        {/* Supporting description */}
        <p className="text-white/80 text-base md:text-xl max-w-2xl leading-relaxed font-semibold">
          {dict.subtext}
        </p>

        {/* CTA Phone Button */}
        <div className="mt-4 w-full sm:w-auto">
          <a
            href={`tel:${formattedPhone}`}
            className="inline-flex items-center justify-center gap-2.5 bg-secondary hover:bg-secondary-light text-primary-dark font-black px-8 py-4.5 rounded-xl text-lg md:text-xl transition-all duration-300 shadow-2xl hover:scale-[1.04] cursor-pointer hover:shadow-secondary/20"
          >
            <svg className="w-6 h-6 shrink-0 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-mono">{dict.buttonCall}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
