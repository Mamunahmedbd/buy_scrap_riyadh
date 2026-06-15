import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale: string;
}

export default function Breadcrumb({ items, locale }: BreadcrumbProps) {
  const isRtl = locale === 'ar';
  const homeLabel = isRtl ? 'الرئيسية' : 'Home';

  // Construct JSON-LD Schema
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `https://riyadhscrapbuyer.com/${locale}`,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://riyadhscrapbuyer.com/${locale}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-white border-b border-gray-100 py-4 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-sm text-text-muted">
        {/* Home Link */}
        <Link
          href={`/${locale}`}
          className="hover:text-primary transition-colors font-medium flex items-center gap-1.5"
        >
          <span>{homeLabel}</span>
        </Link>

        {/* Dynamic Items */}
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <div key={idx} className="flex items-center gap-2">
              {/* Separator icon that flips on RTL */}
              <svg
                className={`w-3 h-3 text-gray-400 shrink-0 ${isRtl ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>

              {isLast || !item.href ? (
                <span className="text-primary-dark font-semibold select-none truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={`/${locale}${item.href}`}
                  className="hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
