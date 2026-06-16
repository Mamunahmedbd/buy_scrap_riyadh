interface WhyChooseUsSectionProps {
  dict: {
    heading: string;
    headingAccent: string;
    subtext: string;
    list: string[];
    buttonCall: string;
  };
  locale: string;
}

export default function WhyChooseUsSection({ dict, locale }: WhyChooseUsSectionProps) {
  return (
    <section 
      className="w-full py-20 md:py-28 px-4 bg-white" 
      id="why-choose-us"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Illustration / Visual decoration */}
        <div className="lg:col-span-5 hidden lg:block relative">
          <div className="w-full aspect-square max-w-[420px] mx-auto rounded-3xl bg-primary-dark border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full pointer-events-none" />
            
            <div className="flex justify-between items-center">
              <span className="text-gradient-gold font-extrabold text-6xl leading-none">10+</span>
              <span className="text-xs font-black bg-secondary text-primary-dark px-4 py-1.5 rounded-full uppercase tracking-wider">
                {locale === 'ar' ? 'أعوام الخبرة' : 'Years Experience'}
              </span>
            </div>

            <div className="my-6">
              <p className="text-white font-extrabold text-2.5xl leading-snug">
                {locale === 'ar' 
                  ? 'أمانة في الوزن وسرعة في العمل' 
                  : 'Honest Weights, Quick On-Site Collections'
                }
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-6 border-t border-white/10">
              <span className="w-12 h-12 rounded-full bg-whatsapp/15 border border-whatsapp/30 text-whatsapp flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.48 1.332 5.006L2 22l5.184-1.36c1.468.8 3.12 1.228 4.82 1.228h.008c5.506 0 9.992-4.486 9.992-9.992C22.004 6.48 17.518 2 12.012 2zm0 18.294h-.006c-1.506 0-2.986-.406-4.278-1.176l-.308-.182-3.184.836.85-3.104-.2-.318c-.846-1.344-1.294-2.9-1.294-4.502 0-4.66 3.792-8.452 8.456-8.452 2.256 0 4.38.88 5.976 2.476a8.396 8.396 0 012.472 5.984c.002 4.66-3.792 8.454-8.458 8.454z"/>
                </svg>
              </span>
              <div>
                <p className="text-sm font-extrabold text-white">
                  {locale === 'ar' ? 'متاح بالواتساب ٢٤/٧' : 'WhatsApp Support 24/7'}
                </p>
                <p className="text-xs text-white/70 font-mono">
                  +966 55 000 0000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: List of benefits */}
        <div className="lg:col-span-7 flex flex-col items-start text-start gap-6">
          <h2 id="why-heading" className="text-4xl md:text-5xl font-black text-primary leading-tight tracking-tight">
            {dict.heading} <br className="hidden md:inline" />
            <span className="text-gradient-gold drop-shadow-sm">{dict.headingAccent}</span>
          </h2>

          <p className="text-text-muted text-base md:text-lg leading-relaxed font-medium">
            {dict.subtext}
          </p>

          {/* List of items */}
          <ul className="flex flex-col gap-4 w-full" aria-label="Our Advantages">
            {dict.list.map((item, index) => (
              <li key={index} className="flex items-start gap-3.5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/15 border border-accent/30 text-accent shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-text-dark font-semibold text-sm md:text-base leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 w-full sm:w-auto">
            <a
              href="tel:+966550000000"
              className="inline-flex items-center justify-center gap-2.5 bg-secondary hover:bg-secondary-light text-primary-dark font-black px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-lg hover:scale-[1.04] cursor-pointer hover:shadow-secondary/20"
            >
              <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{dict.buttonCall}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
