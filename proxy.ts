import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n.config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Determine locale: check accept-language header, default to 'en'
  const acceptLanguage = request.headers.get('accept-language');
  let locale = defaultLocale;
  if (acceptLanguage) {
    const primaryLanguage = acceptLanguage.split(',')[0].toLowerCase();
    if (primaryLanguage.startsWith('ar')) {
      locale = 'ar';
    }
  }

  // Redirect to localized path (e.g. / -> /en or / -> /ar)
  const redirectUrl = new URL(
    `/${locale}${pathname}${request.nextUrl.search}`,
    request.url
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    // Match all paths except:
    // - api routes
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - images/ (public images folder)
    // - specific static files in root (favicon, sitemap, robots)
    // - image/media extensions
    '/((?!api|_next/static|_next/image|images/|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.webp$).*)',
  ],
};
