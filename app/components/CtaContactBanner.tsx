import { SITE_PHONE_TEL } from '../seo';

interface CtaContactBannerProps {
  dict: {
    ctaHeading: string;
    ctaSubtext: string;
    ctaButtonCall: string;
    ctaButtonWhatsapp: string;
  };
  locale: string;
}

export default function CtaContactBanner({ dict, locale }: CtaContactBannerProps) {
  const isRtl = locale === 'ar';
  
  const whatsappUrl = `https://wa.me/${SITE_PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(
    isRtl 
      ? 'مرحباً، لدي سكراب أرغب في بيعه. يرجى التواصل معي.' 
      : 'Hello, I have scrap I want to sell. Please contact me.'
  )}`;

  return (
    <section className="w-full bg-secondary text-primary-dark py-12 px-6 border-y border-secondary-dark/20 relative overflow-hidden">
      {/* Decorative backdrop mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,31,113,0.03),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.01)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.01)_50%,rgba(0,0,0,0.01)_75%,transparent_75%,transparent)] bg-[length:25px_25px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10 text-center lg:text-start">
        {/* Left Column: Heading & Paragraph */}
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-3.5xl font-black tracking-tight leading-tight">
            {dict.ctaHeading}
          </h2>
          <p className="text-primary-dark/85 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            {dict.ctaSubtext}
          </p>
        </div>

        {/* Right Column: CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
          {/* Call button */}
          <a
            href={`tel:${SITE_PHONE_TEL}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-extrabold px-7 py-3.5 rounded-xl text-base shadow-lg transition-all duration-200 hover:scale-[1.03] cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{dict.ctaButtonCall}</span>
          </a>

          {/* WhatsApp button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-extrabold px-7 py-3.5 rounded-xl text-base shadow-lg transition-all duration-200 hover:scale-[1.03] cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.48 1.332 5.006L2 22l5.184-1.36c1.468.8 3.12 1.228 4.82 1.228h.008c5.506 0 9.992-4.486 9.992-9.992C22.004 6.48 17.518 2 12.012 2zm0 18.294h-.006c-1.506 0-2.986-.406-4.278-1.176l-.308-.182-3.184.836.85-3.104-.2-.318c-.846-1.344-1.294-2.9-1.294-4.502 0-4.66 3.792-8.452 8.456-8.452 2.256 0 4.38.88 5.976 2.476a8.396 8.396 0 012.472 5.984c.002 4.66-3.792 8.454-8.458 8.454z"/>
            </svg>
            <span>{dict.ctaButtonWhatsapp}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
