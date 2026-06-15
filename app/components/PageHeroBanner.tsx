import Image from 'next/image';

interface PageHeroBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  locale: string;
}

export default function PageHeroBanner({
  title,
  subtitle,
  backgroundImage = '/images/Scrap-image-10-scaled.jpg',
}: PageHeroBannerProps) {
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
    <section className="relative min-h-[30vh] md:min-h-[35vh] flex items-center justify-center bg-primary-dark text-white overflow-hidden py-12 px-4 border-b border-white/5">
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={title.replace(/[\[\]]/g, '')}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15 select-none pointer-events-none"
          />
          {/* Radial dark gradient for focus & premium feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/85 to-primary-dark" />
        </div>
      )}

      {/* Decorative Blur Spheres (similar to main hero) */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-secondary/10 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-primary-light/30 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.01)_50%,rgba(255,255,255,0.01)_75%,transparent_75%,transparent)] bg-[length:30px_30px] opacity-10 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col gap-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4.5xl md:text-5xl font-black tracking-tight leading-tight md:leading-snug">
          {renderHighlightedText(title)}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
