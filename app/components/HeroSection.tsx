import Image from 'next/image';
import { SITE_PHONE_TEL } from '../seo';

interface HeroSectionProps {
  dict: {
    breadcrumb: string;
    heading: string;
    headingAccent: string;
    subtext: string;
    checklist: string[];
    buttonCall: string;
    buttonWhatsapp: string;
    ratingText: string;
  };
  locale: string;
}

export default function HeroSection({ dict, locale }: HeroSectionProps) {
  const isArabic = locale === 'ar';
  const heroSlides = [
    {
      src: '/images/feature-image-1.png',
      alt: isArabic ? 'عمليات شراء وتجميع السكراب في الرياض' : 'Scrap buying and collection operations in Riyadh',
      caption: isArabic ? 'شراء السكراب والمعادن المستعملة داخل الرياض' : 'Scrap metal buying and collection in Riyadh',
      position: 'object-center',
    },
    {
      src: '/gallery/copper-scrap/copper-pipes-plumbing-scrap-riyadh.png',
      alt: isArabic ? 'شراء سكراب النحاس في الرياض' : 'Copper scrap buying service in Riyadh',
      caption: isArabic ? 'نشتري النحاس والسكراب المعدني بأسعار مناسبة' : 'Copper and metal scrap purchased at competitive rates',
      position: 'object-center',
    },
    {
      src: '/gallery/aluminum-scrap/aluminum-window-frame-scrap.png',
      alt: isArabic ? 'تجميع سكراب الألمنيوم والمعادن في الرياض' : 'Aluminum and metal scrap collection in Riyadh',
      caption: isArabic ? 'استلام سريع لسكراب الألمنيوم والمعادن من موقعك' : 'Fast pickup for aluminum and mixed metal scrap',
      position: 'object-center',
    },
  ];

  return (
    <section 
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center py-20 px-4 bg-primary-dark overflow-hidden" 
      aria-label="Welcome Banner"
      id="hero-section"
    >
      {/* Background Image with optimization */}
      <Image
        src="/background.png"
        alt={isArabic ? 'ساحة خردة وسكراب في الرياض' : 'Scrap metal recycling yard in Riyadh'}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-25 md:opacity-20 select-none pointer-events-none"
      />

      {/* Modern gradient overlay for seamless dark integration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/40 to-primary-dark pointer-events-none" />

      {/* Decorative colored glow spheres */}
      <div className="absolute top-12 -start-32 w-96 h-96 rounded-full glow-sphere-primary pointer-events-none" />
      <div className="absolute bottom-12 -end-32 w-96 h-96 rounded-full glow-sphere-secondary pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side (Text content) */}
        <div className="lg:col-span-7 flex flex-col items-start text-start gap-6">
          
          {/* Breadcrumb Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary text-xs md:text-sm font-extrabold tracking-wide backdrop-blur-md shadow-inner animate-pulse">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <span>{dict.breadcrumb}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
            {dict.heading} <br className="hidden md:inline" />
            <span className="text-gradient-gold drop-shadow-lg">{dict.headingAccent}</span>
          </h1>

          {/* Subtext description */}
          <p className="text-white/80 text-base md:text-[18px] max-w-xl leading-relaxed font-medium">
            {dict.subtext}
          </p>

          {/* Checklist Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2" aria-label="Key Benefits">
            {dict.checklist.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-white/90 text-sm md:text-base font-semibold">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/15 border border-accent/30 text-accent shrink-0 shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTAs Wrapper */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="flex items-center justify-center gap-2.5 bg-secondary hover:bg-secondary-light text-primary-dark font-black px-8 py-4 rounded-xl text-base md:text-lg transition-all duration-300 shadow-lg hover:scale-[1.04] cursor-pointer hover:shadow-secondary/20"
            >
              <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{dict.buttonCall}</span>
            </a>
            
            <a
              href={`https://wa.me/${SITE_PHONE_TEL.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-whatsapp hover:bg-whatsapp-dark text-white font-black px-8 py-4 rounded-xl text-base md:text-lg transition-all duration-300 shadow-lg hover:scale-[1.04] cursor-pointer hover:shadow-whatsapp/20"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.48 1.332 5.006L2 22l5.184-1.36c1.468.8 3.12 1.228 4.82 1.228h.008c5.506 0 9.992-4.486 9.992-9.992C22.004 6.48 17.518 2 12.012 2zm0 18.294h-.006c-1.506 0-2.986-.406-4.278-1.176l-.308-.182-3.184.836.85-3.104-.2-.318c-.846-1.344-1.294-2.9-1.294-4.502 0-4.66 3.792-8.452 8.456-8.452 2.256 0 4.38.88 5.976 2.476a8.396 8.396 0 012.472 5.984c.002 4.66-3.792 8.454-8.458 8.454zm4.636-6.336c-.254-.128-1.504-.742-1.738-.826-.232-.084-.402-.128-.572.128-.17.254-.656.826-.806.996-.148.17-.298.19-.552.062-.254-.128-1.074-.396-2.046-1.264-.756-.674-1.266-1.508-1.414-1.764-.148-.254-.016-.392.112-.52.116-.114.254-.298.382-.446.128-.15.17-.254.254-.424.084-.17.042-.318-.022-.446-.064-.128-.572-1.378-.784-1.892-.206-.502-.416-.432-.572-.442-.148-.008-.318-.01-.488-.01-.17 0-.446.064-.678.318-.232.254-.886.866-.886 2.114 0 1.248.908 2.454 1.034 2.624.128.17 1.788 2.73 4.332 3.826.604.262 1.076.418 1.444.536.608.192 1.162.166 1.6.1.488-.074 1.504-.614 1.716-1.208.212-.594.212-1.104.148-1.208-.064-.106-.234-.17-.488-.298z"/>
              </svg>
              <span>{dict.buttonWhatsapp}</span>
            </a>
          </div>

          {/* Social Proof Rating display */}
          <div className="flex items-center gap-3 mt-4 text-white/95">
            <div className="flex text-secondary-light">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5.5 h-5.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-white/70">{dict.ratingText}</span>
          </div>

        </div>

        {/* Right Side (SEO-friendly image slider) */}
        <div
          className="hero-image-slider lg:col-span-5 relative h-[280px] sm:h-[360px] lg:h-[480px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-primary-light/30 backdrop-blur-md"
          aria-label={isArabic ? 'صور خدمات شراء السكراب في الرياض' : 'Riyadh scrap buying service photos'}
          role="list"
        >
          {heroSlides.map((slide, index) => (
            <figure
              key={slide.src}
              className="hero-slide absolute inset-0"
              itemScope
              itemType="https://schema.org/ImageObject"
              role="listitem"
            >
              <meta itemProp="contentUrl" content={slide.src} />
              <Image
                src={slide.src}
                alt={slide.alt}
                title={slide.caption}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className={`object-cover ${slide.position}`}
              />
              <figcaption
                itemProp="caption"
                className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-primary-dark via-primary-dark/65 to-transparent px-6 pb-6 pt-20 text-sm font-bold text-white leading-relaxed"
              >
                {slide.caption}
              </figcaption>
            </figure>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-5 end-5 z-20 flex gap-2.5" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <span key={slide.src} className={`hero-slide-dot ${index === 0 ? 'hero-slide-dot-active' : ''}`} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
