import Image from 'next/image';

interface VideoBannerProps {
  dict: {
    heading: string;
    subtext: string;
  };
  locale: string;
}

export default function VideoBanner({ dict, locale }: VideoBannerProps) {
  return (
    <section 
      className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center bg-primary-dark overflow-hidden border-y border-white/5"
      aria-label="Yard Operations Video Showcase"
      id="video-banner"
    >
      {/* Background Image Representation */}
      <Image
        src="/images/thumbnail-2.jpeg"
        alt={locale === 'ar' ? 'عمليات تجهيز وفرز خردة النحاس والمعادن بالرياض' : 'Copper and metal scrap sorting process in Riyadh'}
        fill
        sizes="100vw"
        className="object-cover object-center opacity-40 select-none pointer-events-none"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/65 to-primary-dark/80" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--color-secondary)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center gap-6">
        
        {/* Play Button Mockup */}
        <div 
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary text-primary-dark flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-hidden="true"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10 fill-current translate-x-0.5 rtl:-translate-x-0.5" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l8.487-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>

        {/* Text descriptions */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3.5xl font-black text-white leading-tight uppercase">
            {dict.heading}
          </h3>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {dict.subtext}
          </p>
        </div>

      </div>
    </section>
  );
}
