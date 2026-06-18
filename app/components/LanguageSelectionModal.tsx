'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCookie, setCookie } from 'cookies-next';
import { locales } from '../../i18n.config';
import { trackLanguageSwitch } from '../_lib/gtm';

export default function LanguageSelectionModal() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [detectedLang, setDetectedLang] = useState<'en' | 'ar' | null>(null);

  useEffect(() => {
    // Check cookie preference
    const stored = getCookie('preferred-lang');
    if (!stored) {
      setIsOpen(true);
      
      // Auto-detect browser language
      const browserLang = navigator.language || (navigator as any).userLanguage;
      if (browserLang && browserLang.toLowerCase().startsWith('ar')) {
        setDetectedLang('ar');
      } else {
        setDetectedLang('en');
      }
    }
  }, []);

  if (!isOpen) return null;

  const selectLanguage = (newLocale: 'en' | 'ar') => {
    // Track GTM language switch
    trackLanguageSwitch(newLocale);

    setCookie('preferred-lang', newLocale, { maxAge: 60 * 60 * 24 * 365, path: '/' });
    setIsOpen(false);

    const segments = pathname.split('/');
    // segments[0] is empty, segments[1] is the locale
    if ((locales as readonly string[]).includes(segments[1])) {
      if (segments[1] === newLocale) {
        return; // Already on the chosen language
      }
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/85 backdrop-blur-md animate-fade-in p-4" id="language-selection-modal">
      <div className="relative glass-panel max-w-lg w-full p-8 md:p-10 rounded-2xl flex flex-col items-center gap-6 shadow-2xl border border-white/10 animate-scale-up text-center">
        {/* Glow Spheres Inside Modal for Premium Visuals */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        {/* Company Logo */}
        <div className="relative w-[240px] h-[100px] -my-6 mb-2 animate-bounce-subtle">
          <Image
            src="/Logo White.svg"
            alt="Riyadh Scrap Pickup Logo"
            fill
            sizes="240px"
            priority
            className="object-contain"
          />
        </div>

        {/* Modal Titles (Bilingual) */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            Select Your Language <span className="text-secondary">/</span> اختر لغتك
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xs mx-auto">
            Choose your preferred language to search scrap buying rates and request pickup in Riyadh
          </p>
        </div>

        {/* Language Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
          
          {/* English Card */}
          <button
            onClick={() => selectLanguage('en')}
            className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col items-center gap-3 group text-center select-none ${
              detectedLang === 'en'
                ? 'border-secondary bg-white/10 shadow-lg shadow-secondary/5'
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
            }`}
          >
            {detectedLang === 'en' && (
              <span className="absolute -top-2.5 px-2.5 py-0.5 rounded-full bg-secondary text-primary-dark text-[10px] font-black uppercase tracking-wider shadow animate-pulse">
                Recommended
              </span>
            )}
            
            <div className="relative w-16 h-11 rounded-lg overflow-hidden shadow-lg shadow-black/30 border border-white/15 group-hover:scale-110 transition-transform">
              <Image
                src="/flags/gb.svg"
                alt="English"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                English
              </span>
              <span className="text-xs text-white/50">
                Continue in English
              </span>
            </div>
          </button>

          {/* Arabic Card */}
          <button
            onClick={() => selectLanguage('ar')}
            className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col items-center gap-3 group text-center select-none ${
              detectedLang === 'ar'
                ? 'border-secondary bg-white/10 shadow-lg shadow-secondary/5'
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
            }`}
          >
            {detectedLang === 'ar' && (
              <span className="absolute -top-2.5 px-2.5 py-0.5 rounded-full bg-secondary text-primary-dark text-[10px] font-black uppercase tracking-wider shadow animate-pulse">
                موصى به
              </span>
            )}
            
            <div className="relative w-16 h-11 rounded-lg overflow-hidden shadow-lg shadow-black/30 border border-white/15 group-hover:scale-110 transition-transform">
              <Image
                src="/flags/sa.svg"
                alt="العربية"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                العربية
              </span>
              <span className="text-xs text-white/50">
                التصفح باللغة العربية
              </span>
            </div>
          </button>

        </div>

        {/* Bottom bilingual disclaimer */}
        <span className="text-[10px] text-white/40 mt-2 block">
          You can change your language anytime from the menu. / يمكنك تغيير اللغة في أي وقت من القائمة.
        </span>
      </div>
    </div>
  );
}
