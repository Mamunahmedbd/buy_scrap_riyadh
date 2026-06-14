import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  dict: {
    desc: string;
    cols: {
      scrapTypes: string;
      areas: string;
      blogs: string;
    };
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  locale: string;
}

export default function Footer({ dict, locale }: FooterProps) {
  const baseHref = `/${locale}`;

  // Hardcoded Lists matching Dictionary definitions
  const scrapTypes = [
    { name: locale === 'ar' ? 'سكراب مكيفات' : 'AC Scrap Buying', slug: 'ac-conditioner-scrap' },
    { name: locale === 'ar' ? 'سكراب نحاس أحمر' : 'Copper Scrap Buying', slug: 'copper-scrap' },
    { name: locale === 'ar' ? 'سكراب ألمنيوم' : 'Aluminum Scrap Buying', slug: 'aluminum-scrap' },
    { name: locale === 'ar' ? 'سكراب نحاس أصفر' : 'Brass Scrap Buying', slug: 'brass-scrap' },
    { name: locale === 'ar' ? 'سكراب كابلات كهرباء' : 'Cable & Wire Scrap', slug: 'cables-wires-scrap' },
    { name: locale === 'ar' ? 'سكراب كمبيوتر وأجهزة' : 'Computer Scrap Buying', slug: 'computer-electronic-scrap' },
    { name: locale === 'ar' ? 'سكراب لوحات كهربائية' : 'Electrical Scrap Buying', slug: 'electrical-panels-scrap' },
    { name: locale === 'ar' ? 'سكراب مكائن ومعدات' : 'Machinery Scrap Buying', slug: 'industrial-machinery-scrap' },
  ];

  const serviceAreas = [
    { name: locale === 'ar' ? 'البطحاء ووسط الرياض' : 'Al Batha & Downtown', slug: 'al-batha' },
    { name: locale === 'ar' ? 'العليا والسليمانية' : 'Al Olaya & Sulaimaniyah', slug: 'al-olaya' },
    { name: locale === 'ar' ? 'الملز والروضة' : 'Al Malaz & Rawdah', slug: 'al-malaz' },
    { name: locale === 'ar' ? 'النسيم والشفا' : 'Al Naseem & Al Shifa', slug: 'al-naseem' },
    { name: locale === 'ar' ? 'العزيزية والخليج' : 'Al Aziziyah & Al Khaleej', slug: 'al-aziziyah' },
    { name: locale === 'ar' ? 'الدرعية وشمال الرياض' : 'Al Diriyah & North Riyadh', slug: 'al-diriyah' },
    { name: locale === 'ar' ? 'السلي والمنطقة الصناعية' : 'Al Sullay & Industrial', slug: 'al-sullay' },
    { name: locale === 'ar' ? 'الخرج والمناطق المجاورة' : 'Al Kharj & Surrounding', slug: 'al-kharj' },
  ];

  const blogPosts = [
    {
      title: locale === 'ar' ? 'فهم أسعار سكراب النحاس في الرياض' : 'Understanding Copper Scrap Prices',
      slug: 'understanding-scrap-copper-prices-in-riyadh-2026',
    },
    {
      title: locale === 'ar' ? 'كيف تبيع مكيفات الهواء القديمة والتالفة؟' : 'How to Safely Sell Old AC Units',
      slug: 'how-to-safely-sell-old-air-conditioners-for-cash',
    },
    {
      title: locale === 'ar' ? 'فوائد إعادة تدوير المعادن بالرياض' : 'Benefits of Metal Recycling in Riyadh',
      slug: 'the-benefits-of-metal-recycling-for-riyadhs-environment',
    },
  ];

  return (
    <footer className="bg-primary-dark text-white border-t border-white/5 pt-16 pb-8 px-4" id="main-footer" aria-label="Footer Navigation">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 text-start">
        
        {/* Top Section 4-Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column 1: Company Logo & Direct Contact links */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link href={baseHref} aria-label="Riyadh Scrap Buyer Home Page">
              <Image
                src="/images/white_logo.png"
                alt="Riyadh Scrap Buyer Logo"
                width={180}
                height={50}
                className="h-10 md:h-12 w-auto object-contain mb-2"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              {dict.desc}
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <a href="tel:+966550000000" className="flex items-center gap-2 text-sm hover:text-secondary font-mono">
                <svg className="w-4.5 h-4.5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+966 55 000 0000</span>
              </a>
              <a href="https://wa.me/966550000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-whatsapp">
                <svg className="w-4.5 h-4.5 text-whatsapp" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.48 1.332 5.006L2 22l5.184-1.36c1.468.8 3.12 1.228 4.82 1.228h.008c5.506 0 9.992-4.486 9.992-9.992C22.004 6.48 17.518 2 12.012 2zm0 18.294h-.006c-1.506 0-2.986-.406-4.278-1.176l-.308-.182-3.184.836.85-3.104-.2-.318c-.846-1.344-1.294-2.9-1.294-4.502 0-4.66 3.792-8.452 8.456-8.452 2.256 0 4.38.88 5.976 2.476a8.396 8.396 0 012.472 5.984c.002 4.66-3.792 8.454-8.458 8.454z"/>
                </svg>
                <span>WhatsApp chat</span>
              </a>
            </div>
          </div>

          {/* Column 2: Scrap types categories links */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <h3 className="text-base font-bold text-secondary tracking-wider uppercase border-b border-secondary/20 pb-1.5 w-full">
              {dict.cols.scrapTypes}
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm" aria-label="Scrap Categories Footer Links">
              {scrapTypes.map((item, index) => (
                <Link key={index} href={`${baseHref}/services/${item.slug}`} className="text-white/80 hover:text-secondary transition-colors duration-150">
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Regional areas served links */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <h3 className="text-base font-bold text-secondary tracking-wider uppercase border-b border-secondary/20 pb-1.5 w-full">
              {dict.cols.areas}
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm" aria-label="Service Areas Footer Links">
              {serviceAreas.map((item, index) => (
                <Link key={index} href={`${baseHref}/areas/${item.slug}`} className="text-white/80 hover:text-secondary transition-colors duration-150">
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Latest News blog posts links */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <h3 className="text-base font-bold text-secondary tracking-wider uppercase border-b border-secondary/20 pb-1.5 w-full">
              {dict.cols.blogs}
            </h3>
            <nav className="flex flex-col gap-3 text-sm" aria-label="Blog Footer Links">
              {blogPosts.map((post, index) => (
                <Link key={index} href={`${baseHref}/blog/${post.slug}`} className="text-white/80 hover:text-secondary hover:underline transition-colors duration-150 line-clamp-2 leading-relaxed">
                  {post.title}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Separator Line */}
        <hr className="border-white/10 w-full" />

        {/* Bottom copyright & Policy bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-white/60">
          <p>{dict.copyright}</p>
          <div className="flex items-center gap-6">
            <Link href={`${baseHref}/privacy`} className="hover:text-secondary transition-colors">
              {dict.privacyPolicy}
            </Link>
            <Link href={`${baseHref}/terms`} className="hover:text-secondary transition-colors">
              {dict.termsOfService}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
