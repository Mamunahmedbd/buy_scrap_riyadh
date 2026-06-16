import ServiceCard from './ServiceCard';

interface ScrapCardData {
  title: string;
  description: string;
}

interface WhatWeBuySectionProps {
  dict: {
    heading: string;
    headingAccent: string;
    subtext: string;
    cards: {
      ac: ScrapCardData;
      brass: ScrapCardData;
      aluminum: ScrapCardData;
      cable: ScrapCardData;
      computer: ScrapCardData;
      copper: ScrapCardData;
      electrical: ScrapCardData;
      machinery: ScrapCardData;
    };
    readMore: string;
    buyNow: string;
  };
  locale: string;
}

const categoryMapping = [
  { key: 'ac', image: '/images/AC-Scrap-Buying-1.jpg', slug: 'ac-conditioner-scrap' },
  { key: 'copper', image: '/images/Copper-Scrap-Buying-1-scaled.jpg', slug: 'copper-scrap' },
  { key: 'aluminum', image: '/images/Aluminum-Scrap-Buying-1-scaled.jpg', slug: 'aluminum-scrap' },
  { key: 'brass', image: '/images/Brass-Scrap-Buying-1-scaled.jpg', slug: 'brass-scrap' },
  { key: 'cable', image: '/images/Cable-Wire-Scrap-Buying-1-scaled.jpg', slug: 'cables-wires-scrap' },
  { key: 'computer', image: '/images/Computer-Scrap-Buying-2.jpg', slug: 'computer-electronic-scrap' },
  { key: 'electrical', image: '/images/Electrical-Scrap-Buying-1-scaled.jpg', slug: 'electrical-panels-scrap' },
  { key: 'machinery', image: '/images/Machinery-Scrap-Buying-1-scaled.jpg', slug: 'industrial-machinery-scrap' },
] as const;

export default function WhatWeBuySection({ dict, locale }: WhatWeBuySectionProps) {
  return (
    <section 
      className="relative w-full py-20 md:py-28 px-4 bg-slate-50 border-y border-slate-100 overflow-hidden" 
      id="services"
      aria-labelledby="services-heading"
    >
      {/* Subtle decorative background glows */}
      <div className="absolute top-1/4 -start-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -end-32 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        
        {/* Header Title */}
        <h2 id="services-heading" className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">
          {dict.heading} <span className="text-gradient-gold drop-shadow-sm">{dict.headingAccent}</span>
        </h2>
        
        {/* Short Subtext Description */}
        <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16 font-medium">
          {dict.subtext}
        </p>

        {/* Grid layout for 8 categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categoryMapping.map((item) => {
            const cardData = dict.cards[item.key];
            return (
              <ServiceCard
                key={item.key}
                title={cardData.title}
                description={cardData.description}
                image={item.image}
                readMoreText={dict.readMore}
                buyNowText={dict.buyNow}
                locale={locale}
                slug={item.slug}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
