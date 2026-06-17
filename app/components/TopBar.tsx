import LanguageSwitcher from './LanguageSwitcher';

interface TopBarProps {
  dict: {
    servingText: string;
    phone: string;
    whatsapp: string;
  };
  locale: string;
}

export default function TopBar({ dict, locale }: TopBarProps) {
  // Clean phone number format for standard tel links
  const formattedPhone = dict.phone.replace(/\s+/g, '');

  return (
    <div className="w-full bg-primary text-white text-xs md:text-sm py-2 px-4 border-b border-white/10" id="top-bar">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Side: Serving Info (Desktop Only) */}
        <div className="hidden md:flex items-center gap-1.5 text-white/90">
          <svg className="w-4 h-4 text-secondary shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium">{dict.servingText}</span>
        </div>

        {/* Right Side: Contact Numbers & Language Switcher */}
        <div className="flex items-center justify-center sm:justify-end gap-2.5 sm:gap-6 flex-nowrap w-full sm:w-auto">
          {/* Phone Link */}
          <a
            href={`tel:${formattedPhone}`}
            className="flex items-center gap-1.5 hover:text-secondary transition-colors duration-200 shrink-0"
            aria-label={`Call us at ${dict.phone}`}
          >
            <svg className="w-4 h-4 text-secondary shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-semibold text-xs md:text-sm font-mono select-all">{dict.phone}</span>
          </a>

          {/* WhatsApp Link */}
          <a
            href={`https://wa.me/${formattedPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-whatsapp transition-colors duration-200 shrink-0"
            aria-label="Chat with us on WhatsApp"
          >
            <svg className="w-4 h-4 text-whatsapp shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.48 1.332 5.006L2 22l5.184-1.36c1.468.8 3.12 1.228 4.82 1.228h.008c5.506 0 9.992-4.486 9.992-9.992C22.004 6.48 17.518 2 12.012 2zm0 18.294h-.006c-1.506 0-2.986-.406-4.278-1.176l-.308-.182-3.184.836.85-3.104-.2-.318c-.846-1.344-1.294-2.9-1.294-4.502 0-4.66 3.792-8.452 8.456-8.452 2.256 0 4.38.88 5.976 2.476a8.396 8.396 0 012.472 5.984c.002 4.66-3.792 8.454-8.458 8.454zm4.636-6.336c-.254-.128-1.504-.742-1.738-.826-.232-.084-.402-.128-.572.128-.17.254-.656.826-.806.996-.148.17-.298.19-.552.062-.254-.128-1.074-.396-2.046-1.264-.756-.674-1.266-1.508-1.414-1.764-.148-.254-.016-.392.112-.52.116-.114.254-.298.382-.446.128-.15.17-.254.254-.424.084-.17.042-.318-.022-.446-.064-.128-.572-1.378-.784-1.892-.206-.502-.416-.432-.572-.442-.148-.008-.318-.01-.488-.01-.17 0-.446.064-.678.318-.232.254-.886.866-.886 2.114 0 1.248.908 2.454 1.034 2.624.128.17 1.788 2.73 4.332 3.826.604.262 1.076.418 1.444.536.608.192 1.162.166 1.6.1.488-.074 1.504-.614 1.716-1.208.212-.594.212-1.104.148-1.208-.064-.106-.234-.17-.488-.298z"/>
            </svg>
            <span className="font-semibold text-xs md:text-sm hidden sm:inline">WhatsApp</span>
          </a>

          {/* Language Switcher (Mobile Only) */}
          <div className="md:hidden shrink-0">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
