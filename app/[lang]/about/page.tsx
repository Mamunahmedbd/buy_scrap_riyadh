import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { locales } from '../../../i18n.config';
import { getDictionary, hasLocale } from '../dictionaries';
import {
  buildPageMetadata,
  SITE_ENTITY_TYPE,
  SITE_LEGAL_NAME,
  SITE_LEGAL_NAME_AR,
  SITE_NAME,
  SITE_REGISTRATION_DATE_DISPLAY,
  SITE_REGISTRATION_NUMBER,
  SITE_STATUS,
} from '../../seo';
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
    image: '/background.png',
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
  const registrationFacts = [
    {
      label: isRtl ? 'الاسم النظامي' : 'Legal registered name',
      value: isRtl ? SITE_LEGAL_NAME_AR : SITE_LEGAL_NAME,
    },
    {
      label: isRtl ? 'الرقم الوطني الموحد' : 'Unified national number',
      value: SITE_REGISTRATION_NUMBER,
    },
    {
      label: isRtl ? 'تاريخ إصدار السجل' : 'Registration issue date',
      value: SITE_REGISTRATION_DATE_DISPLAY,
    },
    {
      label: isRtl ? 'نوع الكيان' : 'Entity type',
      value: isRtl ? 'مؤسسة' : SITE_ENTITY_TYPE,
    },
    {
      label: isRtl ? 'حالة السجل' : 'Record status',
      value: isRtl ? 'نشط' : SITE_STATUS,
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Banner */}
      <PageHeroBanner
        title={aboutPage.heroTitle}
        subtitle={aboutPage.heroSubtitle}
        backgroundImage="/background.png"
        variant="about"
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
                src="/gallery/aluminum-scrap/aluminum-window-frame-scrap.png"
                alt={isRtl ? 'شركة الرياض لنقل وشراء السكراب' : `${SITE_NAME} Company`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registration Facts Section */}
      <section className="py-14 px-4 sm:px-6 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="max-w-3xl text-start">
            <span className="text-xs font-black text-secondary uppercase tracking-wider">
              {isRtl ? 'بيانات السجل التجاري' : 'Commercial Registration Details'}
            </span>
            <h2 className="mt-3 text-2xl md:text-4xl font-black tracking-tight">
              {isRtl ? 'معلومات موثقة من السجل التجاري' : 'Verified Company Information'}
            </h2>
            <p className="mt-3 text-white/75 text-sm md:text-base leading-relaxed font-medium">
              {isRtl
                ? 'تعمل خدمات شراء ونقل السكراب لدينا تحت مظلة مؤسسة مسجلة ونشطة في المملكة العربية السعودية، مما يمنح العملاء وضوحاً أكبر عند التعامل معنا في خدمات التقييم والنقل والدفع.'
                : 'Our scrap buying and pickup services operate under an active registered Saudi establishment, giving customers clearer assurance when arranging evaluations, collection, and payment.'}
            </p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {registrationFacts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <dt className="text-[11px] font-black uppercase tracking-wider text-secondary">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-base font-extrabold leading-snug">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
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
