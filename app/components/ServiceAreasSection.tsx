import Image from 'next/image';

interface ServiceAreasSectionProps {
  dict: {
    heading: string;
    headingAccent: string;
    subtext: string;
    list: string[];
    mapAlt: string;
  };
  locale: string;
}

export default function ServiceAreasSection({ dict, locale }: ServiceAreasSectionProps) {
  return (
    <section 
      className="w-full py-16 md:py-24 px-4 bg-white" 
      id="service-areas"
      aria-labelledby="areas-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Covered areas listings */}
        <div className="lg:col-span-6 flex flex-col items-start text-start gap-6">
          
          <h2 id="areas-heading" className="text-3xl md:text-4.5xl font-black text-primary-dark leading-tight">
            {dict.heading} <br className="hidden sm:inline" />
            <span className="text-secondary">{dict.headingAccent}</span>
          </h2>

          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            {dict.subtext}
          </p>

          {/* Area Grid Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
            {dict.list.map((area, index) => (
              <div key={index} className="flex items-center gap-3 py-1">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
                <span className="text-text-dark font-bold text-sm md:text-base">{area}</span>
              </div>
            ))}
          </div>

          {/* Custom SEO Notice Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl mt-4 text-xs md:text-sm text-text-muted">
            <svg className="w-5 h-5 text-secondary shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {locale === 'ar'
                ? 'ملاحظة: نوفر النقل المجاني وتحميل السكراب من أي موقع بالرياض عند الاتفاق.'
                : 'Note: We provide free transportation and loading for scrap items from any location in Riyadh upon agreement.'
              }
            </span>
          </div>

        </div>

        {/* Right Side: Map Representation (Static map.webp) */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="relative w-full aspect-[4/3] max-w-[550px] rounded-3xl overflow-hidden border border-gray-200 shadow-lg bg-gray-50">
            <Image
              src="/images/map.webp"
              alt={dict.mapAlt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
