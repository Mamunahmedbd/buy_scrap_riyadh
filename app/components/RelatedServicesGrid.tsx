import ServiceCard from './ServiceCard';

interface ScrapCardData {
  title: string;
  description: string;
}

interface RelatedServicesGridProps {
  currentSlug: string;
  dict: {
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

export default function RelatedServicesGrid({ currentSlug, dict, locale }: RelatedServicesGridProps) {
  const isRtl = locale === 'ar';
  
  // Filter out current service and pick the first 4
  const relatedItems = categoryMapping
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 4);

  const titleText = isRtl ? 'خدمات سكراب أخرى' : 'Other Scrap Services';
  const subtextText = isRtl
    ? 'نشتري أيضاً أنواعاً أخرى من الخردة والسكراب بأفضل الأسعار بالرياض'
    : 'We also buy other types of scrap metal and materials at top rates in Riyadh';

  return (
    <section className="w-full py-16 px-4 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3.5xl font-black text-primary-dark mb-3">
          {titleText}
        </h2>
        <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto mb-10">
          {subtextText}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedItems.map((item) => {
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
