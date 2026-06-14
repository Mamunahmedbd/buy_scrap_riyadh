import Link from 'next/link';

export default function NotFound() {
  return (
    <section 
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-gray-50 border-t border-gray-100"
      aria-label="404 Page Not Found"
    >
      <div className="max-w-md flex flex-col items-center gap-6">
        {/* Large 404 Visual */}
        <span className="text-secondary font-black text-7xl md:text-9xl drop-shadow-sm select-none">404</span>
        
        {/* Bilingual Messages */}
        <div className="flex flex-col gap-2">
          <h2 className="text-primary-dark font-black text-2xl md:text-3xl leading-tight">
            Page Not Found <br className="sm:hidden" />
            <span className="text-gray-300 mx-2 hidden sm:inline">|</span>
            الصفحة غير موجودة
          </h2>
          <p className="text-text-muted text-sm md:text-base leading-relaxed mt-2">
            Sorry, the page you are looking for does not exist or has been moved. <br />
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها لمكان آخر.
          </p>
        </div>

        {/* Home redirection links */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Link 
            href="/en" 
            className="bg-primary hover:bg-primary-light text-white font-extrabold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-md"
          >
            Go to English Home
          </Link>
          <Link 
            href="/ar" 
            className="bg-secondary hover:bg-secondary-light text-primary-dark font-black px-6 py-3.5 rounded-xl transition-colors text-sm shadow-md"
          >
            الذهاب للرئيسية بالعربية
          </Link>
        </div>
      </div>
    </section>
  );
}
