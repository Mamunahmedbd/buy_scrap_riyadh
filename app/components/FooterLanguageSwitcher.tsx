'use client';

import { usePathname, useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { locales } from '../../i18n.config';
import { trackLanguageSwitch } from '../_lib/gtm';

export default function FooterLanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    // Track GTM language switch
    trackLanguageSwitch(newLocale);

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
    <div className="flex items-center gap-2 text-xs md:text-sm select-none" id="footer-language-switcher">
      <span className="text-white/40">
        {locale === 'ar' ? 'اللغة:' : 'Language:'}
      </span>
      <button
        onClick={() => switchLocale('en')}
        className={`transition-colors cursor-pointer font-bold text-xs ${
          locale === 'en'
            ? 'text-secondary underline underline-offset-4'
            : 'text-white/60 hover:text-white'
        }`}
        aria-label="Switch language to English"
      >
        English
      </button>
      <span className="text-white/20">/</span>
      <button
        onClick={() => switchLocale('ar')}
        className={`transition-colors cursor-pointer font-bold text-xs ${
          locale === 'ar'
            ? 'text-secondary underline underline-offset-4'
            : 'text-white/60 hover:text-white'
        }`}
        aria-label="تغيير اللغة إلى العربية"
      >
        العربية
      </button>
    </div>
  );
}
