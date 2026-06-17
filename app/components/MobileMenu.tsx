'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { locales } from '../../i18n.config';
import { SITE_PHONE_TEL, SITE_REVIEW_URL } from '../seo';

interface MobileMenuProps {
  dict: {
    review: string;
    services: string;
    gallery: string;
    contact: string;
    directions: string;
    buttonCall: string;
    about: string;
    blog: string;
  };
  locale: string;
}

export default function MobileMenu({ dict, locale }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    setCookie('preferred-lang', newLocale, { maxAge: 60 * 60 * 24 * 365, path: '/' });

    const segments = pathname.split('/');
    if ((locales as readonly string[]).includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/') || '/';
    router.push(newPath);
    closeMenu();
  };

  const baseHref = `/${locale}`;

  return (
    <div className="md:hidden" id="mobile-menu-wrapper">
      <button
        onClick={toggleMenu}
        className="p-2 text-white hover:text-secondary focus:outline-none cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute top-16 left-0 right-0 bg-primary border-t border-white/10 shadow-xl py-5 px-6 z-50 flex flex-col gap-4"
          id="mobile-navigation-dropdown"
        >
          <Link 
            href={`${baseHref}#services`} 
            onClick={closeMenu} 
            className="text-white hover:text-secondary font-semibold text-sm transition-colors py-1 text-start"
          >
            {dict.services}
          </Link>
          <Link 
            href={`${baseHref}/about`} 
            onClick={closeMenu} 
            className="text-white hover:text-secondary font-semibold text-sm transition-colors py-1 text-start"
          >
            {dict.about}
          </Link>
          <Link 
            href={`${baseHref}/blog`} 
            onClick={closeMenu} 
            className="text-white hover:text-secondary font-semibold text-sm transition-colors py-1 text-start"
          >
            {dict.blog}
          </Link>
          <Link 
            href={`${baseHref}/gallery`} 
            onClick={closeMenu} 
            className="text-white hover:text-secondary font-semibold text-sm transition-colors py-1 text-start"
          >
            {dict.gallery}
          </Link>
          <Link 
            href={`${baseHref}#contact`} 
            onClick={closeMenu} 
            className="text-white hover:text-secondary font-semibold text-sm transition-colors py-1 text-start"
          >
            {dict.contact}
          </Link>
          <a
            href="https://maps.google.com/?q=Riyadh+Saudi+Arabia"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="text-white hover:text-secondary font-semibold text-sm transition-colors py-1 text-start"
          >
            {dict.directions}
          </a>
          <a
            href={SITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="text-white hover:text-secondary font-semibold text-sm transition-colors py-1 text-start"
          >
            {dict.review}
          </a>
          
          {/* Language Selection in Mobile Menu */}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4 mt-2">
            <span className="text-white/50 text-[11px] font-bold px-1 select-none uppercase tracking-wider text-start">
              {locale === 'ar' ? 'اللغة' : 'Language'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => switchLocale('en')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  locale === 'en'
                    ? 'bg-secondary text-primary-dark border-secondary font-black shadow-md'
                    : 'bg-transparent text-white border-white/15 hover:border-white/40 hover:bg-white/5'
                }`}
              >
                English
              </button>
              <button
                onClick={() => switchLocale('ar')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  locale === 'ar'
                    ? 'bg-secondary text-primary-dark border-secondary font-black shadow-md'
                    : 'bg-transparent text-white border-white/15 hover:border-white/40 hover:bg-white/5'
                }`}
              >
                العربية
              </button>
            </div>
          </div>

          <a
            href={`tel:${SITE_PHONE_TEL}`}
            className="w-full text-center bg-secondary text-primary-dark font-bold py-3 rounded-lg hover:bg-secondary-light transition-colors text-sm shadow-md"
            onClick={closeMenu}
          >
            {dict.buttonCall}
          </a>
        </div>
      )}
    </div>
  );
}
