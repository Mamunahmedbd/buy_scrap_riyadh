'use client';

interface CopyButtonProps {
  shareUrl: string;
  successMessage: string;
}

export default function CopyButton({ shareUrl, successMessage }: CopyButtonProps) {
  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      alert(successMessage);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-9 h-9 rounded-full bg-primary/10 text-primary-dark hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
      aria-label="Copy article link"
      type="button"
    >
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    </button>
  );
}
