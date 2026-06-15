import 'server-only';

import { readdir } from 'fs/promises';
import path from 'path';

export interface GalleryCategory {
  slug: string;
  labelKey: string;
  imageCount: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  categorySlug: string;
  filename: string;
  baseName: string;
  sortOrder: number;
}

export interface GalleryData {
  categories: GalleryCategory[];
  images: GalleryImage[];
}

const GALLERY_ROOT = path.join(process.cwd(), 'public', 'gallery');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const CATEGORY_ORDER = [
  'ac-scrap',
  'copper-scrap',
  'aluminum-scrap',
  'brass-scrap',
  'cable-wire-scrap',
  'computer-scrap',
  'electrical-scrap',
  'machinery-scrap',
  'demolition-scrap',
  'old-battery-scrap',
  'old-iron-steel-scrap',
  'stainless-steel-scrap',
] as const;

const orderLookup = new Map<string, number>(
  CATEGORY_ORDER.map((slug, index) => [slug, index])
);

const naturalCollator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
});

function isSupportedImage(filename: string) {
  return IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function sortCategories(a: string, b: string) {
  const aOrder = orderLookup.get(a);
  const bOrder = orderLookup.get(b);

  if (aOrder !== undefined && bOrder !== undefined) {
    return aOrder - bOrder;
  }

  if (aOrder !== undefined) return -1;
  if (bOrder !== undefined) return 1;

  return naturalCollator.compare(a, b);
}

export async function getGalleryData(): Promise<GalleryData> {
  const entries = await readdir(GALLERY_ROOT, { withFileTypes: true });
  const categorySlugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(sortCategories);

  const categories: GalleryCategory[] = [];
  const images: GalleryImage[] = [];

  for (const slug of categorySlugs) {
    const files = await readdir(path.join(GALLERY_ROOT, slug), {
      withFileTypes: true,
    });

    const imageFiles = files
      .filter((file) => file.isFile() && isSupportedImage(file.name))
      .map((file) => file.name)
      .sort(naturalCollator.compare);

    categories.push({
      slug,
      labelKey: slug,
      imageCount: imageFiles.length,
    });

    imageFiles.forEach((filename, index) => {
      images.push({
        id: `${slug}/${filename}`,
        src: `/gallery/${slug}/${filename}`,
        categorySlug: slug,
        filename,
        baseName: path.basename(filename, path.extname(filename)),
        sortOrder: index + 1,
      });
    });
  }

  return { categories, images };
}
