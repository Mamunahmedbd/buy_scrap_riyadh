import Script from 'next/script';

export const getGaId = (): string => {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-T2E7F5RB4M';
};

export default function GoogleAnalytics() {
  const gaId = getGaId();

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
}
