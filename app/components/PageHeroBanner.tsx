import Image from 'next/image';

interface PageHeroBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  variant?: 'default' | 'service' | 'blog' | 'policy' | 'about';
  locale: string;
}

export default function PageHeroBanner({
  title,
  subtitle,
  backgroundImage = '/background.png',
  backgroundPosition = 'center',
  variant = 'default',
  locale,
}: PageHeroBannerProps) {
  const isServiceHero = variant === 'service';
  const isBlogHero = variant === 'blog';
  const isPolicyHero = variant === 'policy';
  const isAboutHero = variant === 'about';
  const showVisualDetails = isBlogHero || isPolicyHero || isAboutHero;
  const isRtl = locale === 'ar';
  const cleanTitle = title.replace(/[\[\]]/g, '');

  // Helper function to render text with highlighted sections inside brackets [like this]
  const renderHighlightedText = (text: string) => {
    const parts = text.split(/\[(.*?)\]/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="text-secondary drop-shadow-sm font-black">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section
      className={`relative isolate flex items-center justify-center overflow-hidden bg-primary-dark px-4 text-white border-b border-white/10 ${
        isServiceHero
          ? 'min-h-[390px] py-20 sm:px-6 md:min-h-[470px] md:py-24'
          : showVisualDetails
          ? 'min-h-[35vh] py-16 sm:px-6 md:min-h-[42vh] md:py-20'
          : 'min-h-[30vh] py-12 md:min-h-[35vh]'
      }`}
    >
      {backgroundImage && (
        <div className="absolute inset-0 -z-30">
          <Image
            src={backgroundImage}
            alt={isServiceHero ? '' : cleanTitle}
            fill
            priority
            sizes="100vw"
            className={`object-cover select-none pointer-events-none ${
              isServiceHero
                ? 'opacity-[0.72] saturate-[1.1] contrast-[1.05]'
                : showVisualDetails
                ? 'opacity-[0.45] saturate-[1.15] contrast-[1.05]'
                : 'opacity-20'
            }`}
            style={{ objectPosition: backgroundPosition }}
          />
        </div>
      )}

      <div
        className={`absolute inset-0 -z-20 ${
          isServiceHero
            ? 'bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.72)_38%,rgba(2,6,23,0.56)_100%)]'
            : showVisualDetails
            ? 'bg-[linear-gradient(180deg,rgba(2,6,23,0.85)_0%,rgba(2,6,23,0.65)_50%,rgba(2,6,23,0.92)_100%)]'
            : 'bg-gradient-to-b from-primary-dark/95 via-primary-dark/86 to-primary-dark'
        }`}
      />
      {isServiceHero && (
        <>
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(2,6,23,0.78)_0%,rgba(2,6,23,0.18)_45%,rgba(2,6,23,0.88)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(245,158,11,0.22),transparent_28%,rgba(15,23,42,0.14)_70%,rgba(16,185,129,0.16))]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-primary-dark to-transparent" />
        </>
      )}
      {showVisualDetails && (
        <>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),transparent_35%,rgba(245,158,11,0.1))]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-primary-dark to-transparent" />
        </>
      )}
      {!isServiceHero && !showVisualDetails && (
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.01)_50%,rgba(255,255,255,0.01)_75%,transparent_75%,transparent)] bg-[length:30px_30px] opacity-10 pointer-events-none" />
      )}

      <div
        className={`relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center ${
          isServiceHero ? 'gap-5' : 'gap-4'
        }`}
      >
        {isServiceHero && (
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
            {isRtl ? 'خدمة شراء السكراب' : 'Scrap Buying Service'}
          </span>
        )}
        {isBlogHero && (
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
            {isRtl ? 'مدونة السكراب والأخبار' : 'Scrap Blog & News'}
          </span>
        )}
        {isPolicyHero && (
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
            {isRtl ? 'الشروط والسياسات' : 'Terms & Policies'}
          </span>
        )}
        {isAboutHero && (
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
            {isRtl ? 'من نحن' : 'About Us'}
          </span>
        )}

        <h1
          className={`font-black tracking-tight text-white drop-shadow-sm ${
            isServiceHero
              ? 'max-w-5xl text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl'
              : 'text-3xl leading-tight sm:text-4.5xl md:text-5xl md:leading-snug'
          }`}
        >
          {renderHighlightedText(title)}
        </h1>

        {subtitle && (
          <p
            className={`mx-auto leading-relaxed drop-shadow-sm ${
              isServiceHero
                ? 'max-w-3xl text-base font-semibold text-white/90 sm:text-lg md:text-xl'
                : 'max-w-2xl text-sm font-medium text-white/80 sm:text-base md:text-lg'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
