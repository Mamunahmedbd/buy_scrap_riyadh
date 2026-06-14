'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales } from '../../i18n.config';

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

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
    <div className="flex items-center gap-2" id="language-switcher">
      <button
        onClick={() => switchLocale('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded transition-all duration-200 border cursor-pointer ${
          locale === 'en'
            ? 'bg-secondary text-primary-dark border-secondary shadow-sm'
            : 'bg-transparent text-white border-white/30 hover:border-white/70 hover:bg-white/10'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('ar')}
        className={`px-2.5 py-1 text-xs font-bold rounded transition-all duration-200 border cursor-pointer ${
          locale === 'ar'
            ? 'bg-secondary text-primary-dark border-secondary shadow-sm'
            : 'bg-transparent text-white border-white/30 hover:border-white/70 hover:bg-white/10'
        }`}
        aria-label="التحويل إلى العربية"
      >
        العربية
      </button>
    </div>
  );
}
