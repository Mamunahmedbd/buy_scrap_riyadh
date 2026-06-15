import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales } from '../../../i18n.config';
import { getDictionary, hasLocale } from '../dictionaries';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeroBanner from '../../components/PageHeroBanner';
import CtaContactBanner from '../../components/CtaContactBanner';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
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

  return {
    title: termsPage.meta.title,
    description: termsPage.meta.description,
    alternates: {
      canonical: `/${lang}/terms`,
      languages: {
        en: `/en/terms`,
        ar: `/ar/terms`,
      },
    },
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const termsPage = dict.termsPage;
  const isRtl = lang === 'ar';

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
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Intro statement */}
          <p className="text-text-muted text-base sm:text-lg leading-relaxed font-semibold">
            {termsPage.content.intro}
          </p>

          {/* Sections List */}
          <div className="flex flex-col gap-8 mt-4">
            {termsPage.content.sections.map((section: any, idx: number) => (
              <div key={idx} className="flex flex-col gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-primary-dark">
                  {section.title}
                </h2>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed font-medium">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contact Banner */}
      <CtaContactBanner dict={dict.shared} locale={lang} />
    </main>
  );
}
