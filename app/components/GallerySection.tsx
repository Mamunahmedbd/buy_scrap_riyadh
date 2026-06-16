import Image from 'next/image';
import Link from 'next/link';

interface GallerySectionProps {
  dict: {
    heading: string;
    headingAccent: string;
    subtext: string;
    viewAll: string;
  };
  locale: string;
}

const galleryImages = [
  { src: '/gallery/aluminum-scrap/bulk-aluminum-profiles-scrap.png', altEn: 'Assorted scrap metal sorting', altAr: 'فرز خردة المعادن المتنوعة' },
  { src: '/gallery/copper-scrap/copper-pipes-plumbing-scrap-riyadh.png', altEn: 'Industrial copper tubes scrap', altAr: 'خردة أنابيب النحاس الصناعية' },
  { src: '/gallery/computer-scrap/computer-motherboard-e-waste-recycling.png', altEn: 'Computer scrap motherboards', altAr: 'لوحات خردة الكمبيوتر الإلكترونية' },
  { src: '/gallery/brass-scrap/brass-valves-plumbing-scrap.png', altEn: 'Brass valves scrap collection', altAr: 'تجميع خردة صمامات النحاس' },
  { src: '/gallery/machinery-scrap/dismantled-industrial-factory-machinery-scrap.png', altEn: 'Heavy machinery dismantling scrap', altAr: 'سكراب تفكيك المكائن الثقيلة' },
  { src: '/gallery/aluminum-scrap/aluminum-window-frame-scrap.png', altEn: 'Aluminum sheets scrap processing', altAr: 'معالجة سكراب صفائح الألمنيوم' },
] as const;

export default function GallerySection({ dict, locale }: GallerySectionProps) {
  return (
    <section 
      className="w-full py-16 md:py-24 px-4 bg-gray-50 border-y border-gray-100" 
      id="gallery"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Title Header */}
        <h2 id="gallery-heading" className="text-3xl md:text-4.5xl font-black text-primary-dark mb-4">
          {dict.heading} <span className="text-secondary">{dict.headingAccent}</span>
        </h2>

        {/* Subtext description */}
        <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16">
          {dict.subtext}
        </p>

        {/* Grid layout for 6 photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((img, idx) => (
            <div 
              key={idx}
              className="group relative h-64 md:h-80 rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm bg-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <Image
                src={img.src}
                alt={locale === 'ar' ? img.altAr : img.altEn}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6 text-start">
                <span className="text-white text-sm md:text-base font-bold drop-shadow">
                  {locale === 'ar' ? img.altAr : img.altEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/gallery`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-md transition-colors duration-200 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            <span>{dict.viewAll}</span>
            <svg
              className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
