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
      className="relative w-full py-16 px-4 bg-primary text-white text-center border-y border-white/5 overflow-hidden" 
      aria-label="Direct Phone Banner"
      id="cta-banner"
    >
      {/* Decorative BG pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%,transparent)] bg-[length:40px_40px] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6">
        
        {/* Title Heading */}
        <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-wide uppercase drop-shadow-md">
          {dict.heading}
        </h2>

        {/* Supporting description */}
        <p className="text-white/90 text-base md:text-xl max-w-2xl leading-relaxed">
          {dict.subtext}
        </p>

        {/* CTA Phone Button */}
        <div className="mt-4 w-full sm:w-auto">
          <a
            href={`tel:${formattedPhone}`}
            className="inline-flex items-center justify-center gap-2.5 bg-secondary hover:bg-secondary-light text-primary-dark font-black px-8 py-4 rounded-xl text-lg md:text-xl transition-all duration-200 shadow-xl hover:scale-[1.02] cursor-pointer"
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
