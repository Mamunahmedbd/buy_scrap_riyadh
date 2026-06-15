import { MetadataRoute } from 'next';

const serviceSlugs = [
  'ac-conditioner-scrap',
  'copper-scrap',
  'aluminum-scrap',
  'brass-scrap',
  'cables-wires-scrap',
  'computer-electronic-scrap',
  'electrical-panels-scrap',
  'industrial-machinery-scrap',
];

const blogSlugs = [
  'understanding-scrap-copper-prices-in-riyadh-2026',
  'how-to-safely-sell-old-air-conditioners-for-cash',
  'the-benefits-of-metal-recycling-for-riyadhs-environment',
];

const staticPaths = [
  { path: 'about', priority: 0.6 },
  { path: 'privacy', priority: 0.3 },
  { path: 'terms', priority: 0.3 },
  { path: 'blog', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://riyadhscrapbuyer.com';
  const locales = ['en', 'ar'];
  
  const entries: MetadataRoute.Sitemap = [];

  // Homepages
  entries.push({
    url: `${domain}/en`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });
  entries.push({
    url: `${domain}/ar`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  // Dynamic service paths
  for (const lang of locales) {
    for (const slug of serviceSlugs) {
      entries.push({
        url: `${domain}/${lang}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // Dynamic blog posts
  for (const lang of locales) {
    for (const slug of blogSlugs) {
      entries.push({
        url: `${domain}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  // Static paths
  for (const lang of locales) {
    for (const item of staticPaths) {
      entries.push({
        url: `${domain}/${lang}/${item.path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: item.priority,
      });
    }
  }

  return entries;
}
