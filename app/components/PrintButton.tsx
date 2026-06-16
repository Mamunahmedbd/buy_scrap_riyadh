'use client';

interface PrintButtonProps {
  label: string;
}

export default function PrintButton({ label }: PrintButtonProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-primary/20 hover:border-primary bg-primary/5 hover:bg-primary hover:text-white text-primary-dark font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
      type="button"
    >
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
