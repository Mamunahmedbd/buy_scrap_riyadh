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
  { key: 'ac', image: '/gallery/ac-scrap/ac-scrap-dismantling-riyadh.png', slug: 'ac-conditioner-scrap' },
  { key: 'copper', image: '/gallery/copper-scrap/copper-pipes-plumbing-scrap-riyadh.png', slug: 'copper-scrap' },
  { key: 'aluminum', image: '/gallery/aluminum-scrap/aluminum-window-frame-scrap.png', slug: 'aluminum-scrap' },
  { key: 'brass', image: '/gallery/brass-scrap/brass-valves-plumbing-scrap.png', slug: 'brass-scrap' },
  { key: 'cable', image: '/gallery/cable-wire-scrap/copper-cable-wire-scrap-collection.png', slug: 'cables-wires-scrap' },
  { key: 'computer', image: '/gallery/computer-scrap/computer-motherboard-e-waste-recycling.png', slug: 'computer-electronic-scrap' },
  { key: 'electrical', image: '/gallery/electrical-scrap/electrical-panel-switchboard-scrap-riyadh.png', slug: 'electrical-panels-scrap' },
  { key: 'machinery', image: '/gallery/machinery-scrap/dismantled-industrial-factory-machinery-scrap.png', slug: 'industrial-machinery-scrap' },
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
