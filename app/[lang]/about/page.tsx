import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { locales } from '../../../i18n.config';
import { getDictionary, hasLocale } from '../dictionaries';
import { buildPageMetadata } from '../../seo';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeroBanner from '../../components/PageHeroBanner';
import CtaContactBanner from '../../components/CtaContactBanner';
import WhyChooseUsSection from '../../components/WhyChooseUsSection';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

interface AboutStat {
  number: string;
  label: string;
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
  const aboutPage = dict.aboutPage;

  return buildPageMetadata({
    lang,
    path: '/about',
    title: aboutPage.meta.title,
    description: aboutPage.meta.description,
    image: '/images/Scrap-image-10-scaled.jpg',
    imageAlt: aboutPage.heroTitle.replace(/[\[\]]/g, ''),
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const aboutPage = dict.aboutPage;
  const isRtl = lang === 'ar';

  return (
    <main className="w-full">
      {/* Hero Banner */}
      <PageHeroBanner
        title={aboutPage.heroTitle}
        subtitle={aboutPage.heroSubtitle}
        backgroundImage="/images/Scrap-image-10-scaled.jpg"
        locale={lang}
      />

      {/* Breadcrumbs */}
      <Breadcrumb
        locale={lang}
        items={[{ label: isRtl ? 'من نحن' : 'About Us' }]}
      />

      {/* Story Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-start">
            <span className="text-xs font-bold text-secondary-dark tracking-wider uppercase bg-secondary/10 text-primary-dark px-3.5 py-1.5 rounded-full w-max">
              {isRtl ? 'ريادتنا في السوق' : 'Our Industry Leadership'}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-black text-primary-dark tracking-tight">
              {aboutPage.storyHeading}
            </h2>
            <div className="flex flex-col gap-4 text-text-muted text-base sm:text-lg leading-relaxed font-medium">
              <p>{aboutPage.storyText1}</p>
              <p>{aboutPage.storyText2}</p>
            </div>
          </div>

          {/* Image Grid/Blob Column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-secondary/5 rounded-3xl filter blur-2xl -z-10" />
            <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src="/images/Scrap-image-4-scaled.jpg"
                alt={isRtl ? 'شركة شراء سكراب بالرياض' : 'Riyadh Scrap Buyer Company'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200/50 shadow-sm text-start flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-dark">{aboutPage.missionTitle}</h3>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed font-medium">
              {aboutPage.missionText}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200/50 shadow-sm text-start flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/15 text-primary-dark flex items-center justify-center font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-dark">{aboutPage.visionTitle}</h3>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed font-medium">
              {aboutPage.visionText}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="py-12 px-6 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.01)_50%,rgba(255,255,255,0.01)_75%,transparent_75%,transparent)] bg-[length:30px_30px] opacity-10" />
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {(aboutPage.stats as AboutStat[]).map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <span className="text-3xl sm:text-4.5xl font-black text-secondary tracking-tight">
                {stat.number}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wide text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection dict={dict.whyChooseUs} locale={lang} />

      {/* CTA Contact Banner */}
      <CtaContactBanner dict={dict.shared} locale={lang} />
    </main>
  );
}
