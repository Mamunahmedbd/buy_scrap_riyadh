import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales } from '../../../i18n.config';
import { getDictionary, hasLocale } from '../dictionaries';
import { buildPageMetadata } from '../../seo';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeroBanner from '../../components/PageHeroBanner';
import CtaContactBanner from '../../components/CtaContactBanner';
import PrintButton from '../../components/PrintButton';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

interface TermsSection {
  title: string;
  text: string;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }

  const dict = await getDictionary(lang);
  const termsPage = dict.termsPage;

  return buildPageMetadata({
    lang,
    path: '/terms',
    title: termsPage.meta.title,
    description: termsPage.meta.description,
    image: '/images/Scrap-image-10-scaled.jpg',
    imageAlt: termsPage.heroTitle.replace(/[\[\]]/g, ''),
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const termsPage = dict.termsPage;
  const isRtl = lang === 'ar';

  const renderContentParagraphs = (text: string) => {
    return text.split('\n\n').map((paragraph, pIdx) => {
      const trimmed = paragraph.trim();
      if (trimmed.startsWith('•') || trimmed.includes('\n•')) {
        const items = trimmed
          .split('\n')
          .map((line) => line.replace(/^•\s*/, '').trim())
          .filter(Boolean);
        return (
          <ul key={pIdx} className="space-y-3.5 my-5 list-none ps-0">
            {items.map((item, itemIdx) => (
              <li key={itemIdx} className="flex items-start gap-3 text-text-muted text-sm sm:text-base leading-relaxed font-medium">
                <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary-dark flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={pIdx} className="text-text-muted text-sm sm:text-base leading-relaxed font-medium mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <main className="w-full">
      {/* Hero Banner */}
      <PageHeroBanner
        title={termsPage.heroTitle}
        subtitle={termsPage.heroSubtitle}
        backgroundImage="/images/Scrap-image-10-scaled.jpg"
        locale={lang}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        locale={lang}
        items={[{ label: isRtl ? 'شروط الخدمة' : 'Terms of Service' }]}
      />

      {/* Terms Content */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white text-start">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Main Content (Left Column in LTR, Right Column in RTL) */}
            <div className="lg:col-span-8 flex flex-col gap-8 order-first">
              {/* Intro statement */}
              <p className="text-text-dark text-base sm:text-lg leading-relaxed font-semibold bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                {termsPage.content.intro}
              </p>

              {/* Sections List */}
              <div className="flex flex-col gap-10 mt-4">
                {(termsPage.content.sections as TermsSection[]).map((section, idx) => (
                  <div key={idx} id={`section-${idx}`} className="flex flex-col gap-4 scroll-mt-24 border-b border-gray-100 pb-8 last:border-b-0 last:pb-0">
                    <h2 className="text-xl sm:text-2xl font-black text-primary-dark border-s-4 border-secondary ps-4 flex items-center gap-2">
                      {section.title}
                    </h2>
                    <div className="ps-5">
                      {renderContentParagraphs(section.text)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar (Right Column in LTR, Left Column in RTL) */}
            <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24 h-fit order-last lg:order-none">
              
              {/* Table of Contents */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-black text-primary-dark mb-4 pb-2 border-b border-gray-100">
                  {isRtl ? 'جدول المحتويات' : 'Table of Contents'}
                </h3>
                <nav className="flex flex-col gap-1">
                  {(termsPage.content.sections as TermsSection[]).map((section, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      className="block text-sm font-bold text-text-muted hover:text-primary transition-colors py-2 border-s-2 border-transparent hover:border-secondary ps-3"
                    >
                      {section.title.split('. ')[1] || section.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Facts Card */}
              <div className="bg-primary-dark text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.01)_50%,rgba(255,255,255,0.01)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-5 pointer-events-none" />
                <h3 className="text-base font-black text-secondary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span>{termsPage.sidebar.quickFacts}</span>
                </h3>
                <ul className="flex flex-col gap-3.5">
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 leading-relaxed font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />
                    <span>{termsPage.sidebar.fact1}</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 leading-relaxed font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />
                    <span>{termsPage.sidebar.fact2}</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 leading-relaxed font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />
                    <span>{termsPage.sidebar.fact3}</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 leading-relaxed font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />
                    <span>{termsPage.sidebar.fact4}</span>
                  </li>
                </ul>
              </div>

              {/* Document Information Card */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 flex flex-col gap-3 text-start shadow-sm">
                <h3 className="text-sm font-black text-primary-dark pb-2 border-b border-gray-200">
                  {termsPage.sidebar.title}
                </h3>
                <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-text-muted font-bold">
                  <div className="flex justify-between items-center">
                    <span>{termsPage.sidebar.status}:</span>
                    <span className="text-primary-dark font-black">{isRtl ? 'نشط' : 'Active'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{termsPage.sidebar.updated}:</span>
                    <span className="text-primary-dark font-black">{isRtl ? '١٦ يونيو ٢٠٢٦' : 'June 16, 2026'}</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-1 border-t border-gray-150 pt-2">
                    <span className="text-text-muted text-[11px] font-semibold">{termsPage.sidebar.jurisdiction}:</span>
                    <span className="text-primary-dark font-bold">{termsPage.sidebar.saudiArabia}</span>
                  </div>
                </div>
              </div>

              {/* Print Button */}
              <PrintButton label={isRtl ? 'طباعة / حفظ PDF' : 'Print / Save PDF'} />

            </aside>
            
          </div>
        </div>
      </section>

      {/* CTA Contact Banner */}
      <CtaContactBanner dict={dict.shared} locale={lang} />
    </main>
  );
}

