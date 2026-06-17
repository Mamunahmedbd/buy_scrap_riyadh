interface FloatingWhatsAppButtonProps {
  label: string;
  phone: string;
}

const WHATSAPP_ICON_PATH =
  'M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.48 1.332 5.006L2 22l5.184-1.36c1.468.8 3.12 1.228 4.82 1.228h.008c5.506 0 9.992-4.486 9.992-9.992C22.004 6.48 17.518 2 12.012 2zm0 18.294h-.006c-1.506 0-2.986-.406-4.278-1.176l-.308-.182-3.184.836.85-3.104-.2-.318c-.846-1.344-1.294-2.9-1.294-4.502 0-4.66 3.792-8.452 8.456-8.452 2.256 0 4.38.88 5.976 2.476a8.396 8.396 0 012.472 5.984c.002 4.66-3.792 8.454-8.458 8.454zm4.636-6.336c-.254-.128-1.504-.742-1.738-.826-.232-.084-.402-.128-.572.128-.17.254-.656.826-.806.996-.148.17-.298.19-.552.062-.254-.128-1.074-.396-2.046-1.264-.756-.674-1.266-1.508-1.414-1.764-.148-.254-.016-.392.112-.52.116-.114.254-.298.382-.446.128-.15.17-.254.254-.424.084-.17.042-.318-.022-.446-.064-.128-.572-1.378-.784-1.892-.206-.502-.416-.432-.572-.442-.148-.008-.318-.01-.488-.01-.17 0-.446.064-.678.318-.232.254-.886.866-.886 2.114 0 1.248.908 2.454 1.034 2.624.128.17 1.788 2.73 4.332 3.826.604.262 1.076.418 1.444.536.608.192 1.162.166 1.6.1.488-.074 1.504-.614 1.716-1.208.212-.594.212-1.104.148-1.208-.064-.106-.234-.17-.488-.298z';

export default function FloatingWhatsAppButton({
  label,
  phone,
}: FloatingWhatsAppButtonProps) {
  const formattedPhone = phone.replace(/\D/g, '');
  const message = 'Hello, I have scrap I want to sell. Please contact me.';
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-gtm-whatsapp="floating_button"

      className="floating-whatsapp group fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-whatsapp/15 shadow-[0_8px_24px_rgba(37,211,102,0.2)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary"
    >
      <span className="floating-whatsapp-pulse-1 absolute inset-0 rounded-full bg-whatsapp/25" aria-hidden="true" />
      <span className="floating-whatsapp-pulse-2 absolute inset-0 rounded-full bg-whatsapp/25" aria-hidden="true" />
      <span className="absolute inset-1.5 rounded-full border border-white/80 bg-whatsapp/5" aria-hidden="true" />
      <span className="floating-whatsapp-core relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-whatsapp text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.12),0_4px_12px_rgba(28,189,86,0.2)] transition-colors duration-300 group-hover:bg-whatsapp-dark">
        <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={WHATSAPP_ICON_PATH} />
        </svg>
      </span>
      <span className="pointer-events-none absolute bottom-full end-0 mb-3 whitespace-nowrap rounded-md bg-primary-dark px-3 py-2 text-xs font-bold text-white opacity-0 invisible shadow-lg transition-all duration-300 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:visible group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
        {label}
      </span>
    </a>
  );
}
