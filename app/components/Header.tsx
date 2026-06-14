import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  dict: {
    review: string;
    services: string;
    gallery: string;
    contact: string;
    directions: string;
    buttonCall: string;
  };
  locale: string;
}

export default function Header({ dict, locale }: HeaderProps) {
  const baseHref = `/${locale}`;

  return (
    <header className="sticky top-0 z-40 w-full bg-primary-dark/95 backdrop-blur-md border-b border-white/5 shadow-md" id="main-header">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between relative">
        
        {/* Company Logo */}
        <Link href={baseHref} className="flex items-center gap-2" aria-label="Riyadh Scrap Buyer Homepage">
          <Image
            src="/images/white_logo.png"
            alt={locale === 'ar' ? 'شعار شراء سكراب الرياض' : 'Riyadh Scrap Buyer Logo'}
            width={180}
            height={50}
            priority
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Link Items */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
          <Link
            href={`${baseHref}#services`}
            className="text-white/95 hover:text-secondary font-bold text-sm lg:text-base transition-colors duration-200"
          >
            {dict.services}
          </Link>
          <Link
            href={`${baseHref}#gallery`}
            className="text-white/95 hover:text-secondary font-bold text-sm lg:text-base transition-colors duration-200"
          >
            {dict.gallery}
          </Link>
          <Link
            href={`${baseHref}#contact`}
            className="text-white/95 hover:text-secondary font-bold text-sm lg:text-base transition-colors duration-200"
          >
            {dict.contact}
          </Link>
          <a
            href="https://maps.google.com/?q=Riyadh+Saudi+Arabia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/95 hover:text-secondary font-bold text-sm lg:text-base transition-colors duration-200"
          >
            {dict.directions}
          </a>
          <a
            href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/95 hover:text-secondary font-bold text-sm lg:text-base transition-colors duration-200"
          >
            {dict.review}
          </a>
        </nav>

        {/* Right Action Call Button & Hamburger wrapper */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+966550000000"
            className="hidden sm:flex items-center gap-2 bg-secondary hover:bg-secondary-light text-primary-dark font-extrabold px-4.5 py-2.5 rounded-lg text-sm transition-all duration-200 hover:scale-[1.02] shadow-md cursor-pointer"
            aria-label="Call +966 55 000 0000"
          >
            <svg className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{dict.buttonCall}</span>
          </a>

          {/* Mobile Hamburguer Menu toggle */}
          <MobileMenu dict={dict} locale={locale} />
        </div>

      </div>
    </header>
  );
}
