# Dedicated Gallery Page Implementation Plan

## Goal

Build a dedicated localized gallery page at:

- `/en/gallery`
- `/ar/gallery`

The page should dynamically read images from `public/gallery/`, use each folder as a filter category, keep all visible static text covered by the existing English/Arabic dictionary system, and follow the installed Next.js 16 App Router conventions already used in this project.

## Current Project Analysis

### Framework And Routing

- The project uses Next.js `16.2.9`, React `19.2.4`, TypeScript, and Tailwind CSS v4.
- Routes live in `app/` using the App Router.
- Localized routing is handled by `app/[lang]`.
- Current pages use the new async `params` shape:

```ts
interface PageProps {
  params: Promise<{ lang: string }>;
}
```

- Existing pages validate locale with `hasLocale(lang)` and call `notFound()` for unsupported locales.
- Existing localized pages implement `generateStaticParams()` with `locales` from `i18n.config.ts`.
- The installed Next docs in `node_modules/next/dist/docs/` confirm this project should continue using App Router file conventions, async route props, Server Components by default, `generateMetadata`, `next/image`, and localized route segments under `app/[lang]`.

### i18n Structure

- Supported locales are defined in `i18n.config.ts`:

```ts
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
```

- Dictionaries are loaded server-side from:

```txt
app/[lang]/dictionaries/en.json
app/[lang]/dictionaries/ar.json
app/[lang]/dictionaries.ts
```

- The new gallery page should add a dedicated `galleryPage` dictionary key in both JSON files.
- Existing Arabic content appears as mojibake in terminal output, so before adding Arabic copy, verify the file is saved as UTF-8 and avoid introducing encoding drift.

### Styling And Design System

The app uses CSS variables in `app/globals.css`:

- Primary: `#1a1f71`
- Primary dark: `#0f124c`
- Primary light: `#2c339e`
- Secondary: `#f5b731`
- Secondary dark: `#cc921a`
- Light background: `#f9f9f9`
- Card background: `#ffffff`
- Text colors via `text-text-dark`, `text-text-muted`, and `text-text-white`

Existing design language:

- Dark navy hero sections with real image backgrounds.
- Gold accent text/buttons.
- White and light-gray content sections.
- `PageHeroBanner`, `Breadcrumb`, and `CtaContactBanner` are reusable page-level building blocks.
- Existing cards use rounded corners and subtle borders/shadows, though for the new gallery page keep image cards polished and avoid nested cards.

### Existing Gallery Integration

- Home page currently uses `GallerySection` with a hardcoded six-image grid from `public/images`.
- Header, mobile menu, and footer currently link Gallery to `/${locale}#gallery`, not a dedicated page.
- Sitemap currently includes home, service pages, blog pages, about, privacy, and terms. It does not include `/gallery`.
- `public/gallery/` contains two top-level images:

```txt
public/gallery/background-2.jpg
public/gallery/feature-image-1.jpg
```

These should be treated as page hero/feature images, not category gallery items.

### Gallery Folder Inventory

Each subfolder should become a filter category. Current categories:

| Folder | Image Count |
| --- | ---: |
| `ac-scrap` | 7 |
| `aluminum-scrap` | 7 |
| `brass-scrap` | 7 |
| `cable-wire-scrap` | 7 |
| `computer-scrap` | 7 |
| `copper-scrap` | 8 |
| `demolition-scrap` | 7 |
| `electrical-scrap` | 8 |
| `machinery-scrap` | 7 |
| `old-battery-scrap` | 8 |
| `old-iron-steel-scrap` | 7 |
| `stainless-steel-scrap` | 7 |

Supported image extensions should be:

```ts
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
```

## Proposed File Changes

### New Files

```txt
app/_lib/gallery.ts
app/[lang]/gallery/page.tsx
app/[lang]/gallery/_components/GalleryExplorer.tsx
GALLERY_PAGE_IMPLEMENTATION_PLAN.md
```

Optional if the page grows:

```txt
app/[lang]/gallery/_components/GalleryImageCard.tsx
app/[lang]/gallery/_components/GalleryCategoryRail.tsx
```

### Existing Files To Update

```txt
app/[lang]/dictionaries/en.json
app/[lang]/dictionaries/ar.json
app/components/Header.tsx
app/components/MobileMenu.tsx
app/components/Footer.tsx
app/sitemap.ts
```

Optional:

```txt
app/components/GallerySection.tsx
```

Use this only if the home gallery section should link to the new dedicated gallery page.

## Data Model

Create a typed server-only gallery data layer in `app/_lib/gallery.ts`.

Recommended types:

```ts
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
```

Implementation notes:

- Use `import 'server-only';`.
- Use `fs/promises` and `path`.
- Root should be `path.join(process.cwd(), 'public', 'gallery')`.
- Read only direct subdirectories as categories.
- Ignore top-level images for the dynamic image grid.
- Sort categories alphabetically or by a configured preferred order.
- Sort images naturally by filename.
- Generate `src` as `/gallery/${categorySlug}/${filename}`.
- Generate `id` as `${categorySlug}/${filename}`.
- Do not read the filesystem from Client Components.

Preferred category order:

```ts
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
```

## i18n Dictionary Additions

Add `galleryPage` to both dictionaries.

Recommended English shape:

```json
"galleryPage": {
  "meta": {
    "title": "Scrap Gallery in Riyadh | Riyadh Scrap Buyer",
    "description": "Browse real scrap buying, collection, dismantling, and recycling photos from Riyadh. View AC, copper, aluminum, brass, cable, machinery, electrical, battery, steel, and demolition scrap."
  },
  "heroTitle": "Scrap [Gallery] in Riyadh",
  "heroSubtitle": "Explore real photos from our scrap buying, dismantling, loading, and recycling work across Riyadh.",
  "breadcrumbLabel": "Gallery",
  "eyebrow": "Real Project Photos",
  "heading": "Browse Scrap Categories",
  "subtext": "Filter by material type to view examples of the scrap we buy and collect across Riyadh.",
  "allCategory": "All",
  "imageCountLabel": "photos",
  "viewCategory": "View category",
  "viewImage": "View image",
  "close": "Close",
  "categories": {
    "ac-scrap": "AC Scrap",
    "aluminum-scrap": "Aluminum Scrap",
    "brass-scrap": "Brass Scrap",
    "cable-wire-scrap": "Cable & Wire Scrap",
    "computer-scrap": "Computer Scrap",
    "copper-scrap": "Copper Scrap",
    "demolition-scrap": "Demolition Scrap",
    "electrical-scrap": "Electrical Scrap",
    "machinery-scrap": "Machinery Scrap",
    "old-battery-scrap": "Old Battery Scrap",
    "old-iron-steel-scrap": "Old Iron & Steel Scrap",
    "stainless-steel-scrap": "Stainless Steel Scrap"
  },
  "altTemplates": {
    "categoryImage": "{category} buying and collection photo in Riyadh",
    "numberedCategoryImage": "{category} scrap buying photo {number} in Riyadh"
  },
  "seoIntro": {
    "heading": "Real Scrap Buying Photos From Riyadh",
    "paragraphs": [
      "Our gallery shows actual examples of scrap materials we buy, sort, dismantle, and collect from residential, commercial, and industrial locations in Riyadh.",
      "Use the category filters to browse AC scrap, copper, aluminum, brass, cables, computers, machinery, electrical panels, batteries, demolition material, iron, steel, and stainless steel scrap."
    ]
  }
}
```

Arabic should mirror the same key structure. Keep keys identical so TypeScript access stays simple.

## Page Route Plan

Create:

```txt
app/[lang]/gallery/page.tsx
```

Responsibilities:

- Validate locale with `hasLocale`.
- Load dictionary with `getDictionary(lang)`.
- Load gallery data server-side with `getGalleryData()`.
- Render page-level SEO metadata with `generateMetadata`.
- Render JSON-LD for the gallery.
- Render `PageHeroBanner`, `Breadcrumb`, an intro/SEO section, the filterable gallery UI, and `CtaContactBanner`.

Skeleton:

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n.config';
import { getDictionary, hasLocale } from '../dictionaries';
import { getGalleryData } from '../../_lib/gallery';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeroBanner from '../../components/PageHeroBanner';
import CtaContactBanner from '../../components/CtaContactBanner';
import GalleryExplorer from './_components/GalleryExplorer';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const page = dict.galleryPage;

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: {
      canonical: `/${lang}/gallery`,
      languages: {
        en: '/en/gallery',
        ar: '/ar/gallery',
      },
    },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: `https://riyadhscrapbuyer.com/${lang}/gallery`,
      siteName: 'Riyadh Scrap Buyer',
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/gallery/feature-image-1.jpg',
          width: 1200,
          height: 630,
          alt: page.heroTitle.replace(/[\[\]]/g, ''),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.meta.title,
      description: page.meta.description,
      images: ['/gallery/feature-image-1.jpg'],
    },
  };
}
```

## Gallery UI Plan

### Server/Client Split

Use a Server Component page for data loading and metadata.

Use a Client Component only for interactive filtering and optional lightbox:

```txt
app/[lang]/gallery/_components/GalleryExplorer.tsx
```

Client component props:

```ts
interface GalleryExplorerProps {
  locale: string;
  categories: GalleryCategory[];
  images: GalleryImage[];
  dict: GalleryPageDictionary;
}
```

Why this split:

- SEO-critical HTML for images can still be rendered on initial page load.
- Filters feel instant without using `searchParams`, avoiding dynamic page rendering.
- Filesystem access remains server-only.

### Filter UX

Recommended filter design:

- Top horizontal category rail with `All` plus folder categories.
- On mobile, use horizontally scrollable pill buttons with `aria-pressed`.
- On desktop, use a compact segmented/wrap layout.
- Show counts beside each category.
- Keep current category state client-side.
- Do not require query params for the first implementation.

Optional enhancement:

- Add URL hash support like `/en/gallery#copper-scrap` without making the route dynamic.

### Image Grid UX

Recommended layout:

- Responsive masonry-inspired CSS grid:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Wide desktop: 4 columns if it still feels balanced
- Use stable card dimensions:
  - `aspect-[4/3]`, `aspect-[3/4]`, or a deterministic pattern by index.
  - Avoid layout shift by using fixed aspect-ratio containers with `Image fill`.
- Wrap each image in `<figure>`.
- Use `<figcaption>` with localized category/caption text.
- Use `next/image` with `fill`, `sizes`, meaningful `alt`, and lazy loading by default.
- Mark only one hero image as `priority`; grid images should not use `priority`.

Example card structure:

```tsx
<figure className="group overflow-hidden rounded-xl border border-gray-200/60 bg-white shadow-sm">
  <div className="relative aspect-[4/3] bg-gray-100">
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>
  <figcaption className="px-4 py-3 text-sm font-semibold text-primary-dark">
    {caption}
  </figcaption>
</figure>
```

### Optional Lightbox

If included, keep it lightweight:

- Use local React state in `GalleryExplorer`.
- Open image in a fixed overlay with `role="dialog"` and `aria-modal="true"`.
- Support close button and `Escape`.
- Keep the close button icon-like, with screen-reader label from dictionary.
- Avoid adding a dependency unless absolutely needed.

## SEO Plan

### Page Metadata

Use page-level `generateMetadata`:

- Localized title and description from dictionaries.
- Canonical:
  - `/en/gallery`
  - `/ar/gallery`
- Alternates:
  - `en: /en/gallery`
  - `ar: /ar/gallery`
- Open Graph and Twitter image using `/gallery/feature-image-1.jpg`.

### Structured Data

Add JSON-LD in the page component using a native `<script type="application/ld+json">`, following the installed Next JSON-LD docs.

Sanitize serialized JSON-LD:

```ts
JSON.stringify(schema).replace(/</g, '\\u003c')
```

Recommended schemas:

- `CollectionPage`
- `ImageGallery`
- `ImageObject` entries for images
- Existing `Breadcrumb` already outputs `BreadcrumbList`

Example structure:

```ts
const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: galleryPage.heroTitle.replace(/[\[\]]/g, ''),
  description: galleryPage.meta.description,
  url: `https://riyadhscrapbuyer.com/${lang}/gallery`,
  image: images.map((image) => ({
    '@type': 'ImageObject',
    contentUrl: `https://riyadhscrapbuyer.com${image.src}`,
    name: getImageCaption(image),
    caption: getImageCaption(image),
  })),
};
```

Keep the schema concise if the image list becomes large. For the current 87 images, it is acceptable, but a cap of the first 30 to 50 images can be used if HTML size becomes a concern.

### Image SEO

For each image:

- Use a unique, descriptive `alt`.
- Use a visible `figcaption`.
- Include category name and Riyadh context.
- Derive captions from dictionary category labels and image index, not raw filenames only.
- Keep filenames as-is for now because they already include descriptive scrap keywords.

Alt text pattern:

```txt
{Category Label} scrap buying photo {number} in Riyadh
```

Examples:

- `Copper Scrap scrap buying photo 3 in Riyadh`
- `AC Scrap buying and collection photo in Riyadh`

Refine grammar in helper logic to avoid duplicated words where possible.

### Sitemap

Update `app/sitemap.ts`:

```ts
const staticPaths = [
  { path: 'about', priority: 0.6 },
  { path: 'gallery', priority: 0.7 },
  { path: 'privacy', priority: 0.3 },
  { path: 'terms', priority: 0.3 },
  { path: 'blog', priority: 0.7 },
];
```

Recommended gallery sitemap values:

- `changeFrequency: 'monthly'`
- `priority: 0.7`

### Robots And Proxy

No required robots change.

The current `proxy.ts` matcher excludes image file extensions globally, so image URLs under `/gallery/...jpg` should be served without locale redirects. It also excludes `/images/`; it does not explicitly exclude `/gallery/`, but the extension exclusion covers current gallery assets.

If future non-image gallery assets are added under `/public/gallery`, consider excluding `gallery/` explicitly.

## Navigation Plan

Update gallery navigation links from home anchor to dedicated route.

### Header

In `app/components/Header.tsx`, change:

```tsx
href={`${baseHref}#gallery`}
```

to:

```tsx
href={`${baseHref}/gallery`}
```

### Mobile Menu

In `app/components/MobileMenu.tsx`, change the same gallery href to:

```tsx
href={`${baseHref}/gallery`}
```

### Footer

The dictionary quick link currently has:

```json
{ "label": "Gallery", "href": "/#gallery" }
```

Change this in both dictionaries to:

```json
{ "label": "Gallery", "href": "/gallery" }
```

Confirm the footer path builder produces:

```txt
/en/gallery
/ar/gallery
```

### Home Gallery Section

Optional but recommended:

- Keep the home `GallerySection` as a preview.
- Add a localized CTA link to `/gallery`.
- Add dictionary keys under existing `gallery`, for example:

```json
"viewAll": "View Full Gallery"
```

## Accessibility Plan

- Use a real `<h1>` through `PageHeroBanner`.
- Use `Breadcrumb` after hero.
- Use `<button type="button">` for filter controls.
- Add `aria-pressed` to category filter buttons.
- Add accessible labels for any icon-only buttons.
- Keep focus states visible.
- Use `figure` and `figcaption` for image semantics.
- If lightbox is implemented:
  - `role="dialog"`
  - `aria-modal="true"`
  - close on `Escape`
  - restore focus to triggering image button when closed

## Performance Plan

- Use `next/image` for all gallery images.
- Use `fill` inside stable aspect-ratio wrappers.
- Use accurate `sizes`.
- Avoid `priority` on grid images.
- Use Server Component data loading to avoid shipping filesystem/data logic to the client.
- Keep client-side state limited to active category and optional lightbox index.
- Avoid adding image dependencies unless dimensions or blur placeholders become required.

Optional future optimization:

- Generate a static manifest from `public/gallery` during build if the image count grows substantially.
- Use route-level caching or React `cache()` around `getGalleryData()` if repeated calls appear.

## Quality And Code Organization

Recommended organization:

- `app/[lang]/gallery/page.tsx`: route, metadata, layout, schema.
- `app/[lang]/gallery/_components/GalleryExplorer.tsx`: filtering/lightbox UI.
- `app/_lib/gallery.ts`: server-only filesystem data loader.

This follows Next project organization guidance:

- Route folder exposes only `page.tsx`.
- `_components` keeps route-specific UI private and non-routable.
- `_lib` keeps server utilities private and non-routable.

Avoid:

- Hardcoding all gallery images in the page component.
- Reading `public/gallery` from a Client Component.
- Using `searchParams` for purely client-side filtering, because that opts the route into dynamic rendering.
- Adding new packages for simple filtering/lightbox behavior.
- Building category labels from folder slugs only for user-facing Arabic/English text.

## Implementation Steps

1. Create `app/_lib/gallery.ts`.
   - Add server-only imports.
   - Read category folders from `public/gallery`.
   - Filter image files by extension.
   - Return sorted typed data.

2. Add `galleryPage` dictionary content.
   - Add all page copy to `en.json`.
   - Add matching keys to `ar.json`.
   - Update footer quick link Gallery href to `/gallery`.

3. Create `app/[lang]/gallery/_components/GalleryExplorer.tsx`.
   - Mark with `'use client'`.
   - Receive data and dictionary text as props.
   - Implement category filter state.
   - Render filter rail and image grid.
   - Add optional lightweight lightbox if desired.

4. Create `app/[lang]/gallery/page.tsx`.
   - Add `generateStaticParams`.
   - Add `generateMetadata`.
   - Validate locale.
   - Load dictionary and gallery data.
   - Render hero, breadcrumb, intro section, gallery explorer, CTA.
   - Add sanitized JSON-LD.

5. Update navigation.
   - `Header.tsx`: Gallery link to `/${locale}/gallery`.
   - `MobileMenu.tsx`: Gallery link to `/${locale}/gallery`.
   - Footer dictionary quick link: `/gallery`.

6. Update sitemap.
   - Add `gallery` to `staticPaths`.

7. Optional home preview improvement.
   - Keep `GallerySection` as a homepage preview.
   - Add a "View Full Gallery" link to the dedicated route.

8. Verify.
   - Run lint.
   - Run build.
   - Start dev server.
   - Test `/en/gallery` and `/ar/gallery`.
   - Confirm category filters work.
   - Confirm images load from all 12 folders.
   - Confirm no layout shifts or overlapping text on mobile and desktop.
   - Inspect metadata, canonical, OG tags, and JSON-LD.
   - Confirm sitemap includes both `/en/gallery` and `/ar/gallery`.

## Suggested Acceptance Criteria

- `/en/gallery` and `/ar/gallery` render successfully.
- Unsupported locale still returns 404 via existing locale guard.
- Gallery images are loaded dynamically from subfolders in `public/gallery`.
- Each folder appears as a filter category.
- Top-level files in `public/gallery` are not accidentally shown as categories.
- Every visible static string exists in both dictionaries.
- Each image has localized, meaningful `alt` text and visible caption.
- Page has localized metadata, canonical URL, alternate language URLs, OG image, and Twitter image.
- Page emits sanitized JSON-LD.
- Header, mobile menu, footer, and sitemap all include the dedicated gallery route.
- `pnpm lint` passes.
- `pnpm build` passes.

## Future Enhancements

- Add category-specific URLs such as `/en/gallery/copper-scrap` only if SEO strategy requires indexable category landing pages.
- Add image captions manually in dictionary if generic caption templates are not specific enough.
- Add static blur placeholders or generated image dimensions if visual polish becomes a priority.
- Add image search/filter by material keywords if gallery volume grows.
- Add an admin/build-time manifest workflow if gallery assets will be edited frequently by non-developers.
