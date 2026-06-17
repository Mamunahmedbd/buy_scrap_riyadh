'use client';

import { usePathname, useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { locales } from '../../i18n.config';

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    setCookie('preferred-lang', newLocale, { maxAge: 60 * 60 * 24 * 365, path: '/' });

    const segments = pathname.split('/');
    // segments[0] is empty, segments[1] is the locale
    if ((locales as readonly string[]).includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <div 
      className="inline-flex items-center bg-white/5 border border-white/10 p-1 rounded-full shadow-inner select-none relative" 
      id="language-switcher"
    >
      {/* Globe Icon */}
      <div className="ps-2 pe-1.5 text-white/60 flex items-center justify-center">
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </div>

      {/* English Toggle Button */}
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 text-[11px] sm:text-xs font-black rounded-full transition-all duration-300 cursor-pointer ${
          locale === 'en'
            ? 'bg-secondary text-primary-dark shadow-md font-black transform scale-102'
            : 'bg-transparent text-white/75 hover:text-white hover:bg-white/5'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>

      {/* Arabic Toggle Button */}
      <button
        onClick={() => switchLocale('ar')}
        className={`px-3 py-1 text-[11px] sm:text-xs font-black rounded-full transition-all duration-300 cursor-pointer ${
          locale === 'ar'
            ? 'bg-secondary text-primary-dark shadow-md font-black transform scale-102'
            : 'bg-transparent text-white/75 hover:text-white hover:bg-white/5'
        }`}
        aria-label="التحويل إلى العربية"
      >
        العربية
      </button>
    </div>
  );
}
