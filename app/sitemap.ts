import { MetadataRoute } from 'next';
import { locales } from '../i18n.config';
import { getGalleryData } from './_lib/gallery';
import {
  absoluteUrl,
  AREA_IMAGES,
  AREA_SLUGS,
  BLOG_SLUGS,
  DEFAULT_OG_IMAGE,
  SERVICE_IMAGES,
  SERVICE_SLUGS,
  localizedPath,
  sitemapAlternates,
} from './seo';

const lastModified = new Date('2026-06-15T00:00:00+03:00');

const staticPaths = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/gallery', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
] as const;

function sitemapEntry({
  lang,
  path,
  priority,
  changeFrequency,
  images,
}: {
  lang: string;
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  images?: string[];
}): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizedPath(lang, path)),
    lastModified,
    changeFrequency,
    priority,
    alternates: sitemapAlternates(path),
    ...(images ? { images: images.map((image) => absoluteUrl(image)) } : {}),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const galleryData = await getGalleryData();
  const galleryImages = galleryData.images.slice(0, 50).map((image) => image.src);
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const item of staticPaths) {
      entries.push(
        sitemapEntry({
          lang,
          path: item.path,
          priority: lang === 'ar' && item.path === '' ? 0.95 : item.priority,
          changeFrequency: item.changeFrequency,
          images:
            item.path === '/gallery'
              ? ['/gallery/riyadh-scrap-pickup-service-featured.png', ...galleryImages]
              : item.path === ''
                ? [DEFAULT_OG_IMAGE, '/background.png']
                : undefined,
        })
      );
    }

    for (const slug of SERVICE_SLUGS) {
      entries.push(
        sitemapEntry({
          lang,
          path: `/services/${slug}`,
          priority: 0.85,
          changeFrequency: 'weekly',
          images: [SERVICE_IMAGES[slug]],
        })
      );
    }

    for (const slug of AREA_SLUGS) {
      entries.push(
        sitemapEntry({
          lang,
          path: `/areas/${slug}`,
          priority: 0.75,
          changeFrequency: 'weekly',
          images: [AREA_IMAGES[slug]],
        })
      );
    }

    for (const slug of BLOG_SLUGS) {
      entries.push(
        sitemapEntry({
          lang,
          path: `/blog/${slug}`,
          priority: 0.7,
          changeFrequency: 'monthly',
        })
      );
    }
  }

  return entries;
}
