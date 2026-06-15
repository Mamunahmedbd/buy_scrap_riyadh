'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GalleryCategory, GalleryImage } from '../../../_lib/gallery';

interface GalleryExplorerDictionary {
  allCategory: string;
  imageCountLabel: string;
  viewCategory: string;
  viewImage: string;
  close: string;
  previousImage: string;
  nextImage: string;
  categories: Record<string, string>;
  altTemplates: {
    categoryImage: string;
    numberedCategoryImage: string;
  };
}

interface GalleryExplorerProps {
  locale: string;
  categories: GalleryCategory[];
  images: GalleryImage[];
  dict: GalleryExplorerDictionary;
}

const aspectPatterns = [
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[5/4]',
];

function formatTemplate(
  template: string,
  values: Record<string, string | number>
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template
  );
}

export default function GalleryExplorer({
  locale,
  categories,
  images,
  dict,
}: GalleryExplorerProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const isRtl = locale === 'ar';

  const visibleImages = useMemo(() => {
    if (activeCategory === 'all') return images;
    return images.filter((image) => image.categorySlug === activeCategory);
  }, [activeCategory, images]);

  const selectedImage =
    selectedImageIndex === null ? null : visibleImages[selectedImageIndex];

  const goToPreviousImage = useCallback(() => {
    setSelectedImageIndex((currentIndex) => {
      if (currentIndex === null || visibleImages.length === 0) return null;
      return currentIndex === 0 ? visibleImages.length - 1 : currentIndex - 1;
    });
  }, [visibleImages.length]);

  const goToNextImage = useCallback(() => {
    setSelectedImageIndex((currentIndex) => {
      if (currentIndex === null || visibleImages.length === 0) return null;
      return currentIndex === visibleImages.length - 1 ? 0 : currentIndex + 1;
    });
  }, [visibleImages.length]);

  useEffect(() => {
    if (!selectedImage) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedImageIndex(null);
      }

      if (event.key === 'ArrowLeft') {
        if (isRtl) {
          goToNextImage();
        } else {
          goToPreviousImage();
        }
      }

      if (event.key === 'ArrowRight') {
        if (isRtl) {
          goToPreviousImage();
        } else {
          goToNextImage();
        }
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextImage, goToPreviousImage, isRtl, selectedImage]);

  const getCategoryLabel = (slug: string) => dict.categories[slug] ?? slug;

  const getImageCaption = (image: GalleryImage) =>
    formatTemplate(dict.altTemplates.numberedCategoryImage, {
      category: getCategoryLabel(image.categorySlug),
      number: image.sortOrder,
    });

  const totalCount = images.length;

  return (
    <section
      className="bg-white px-4 py-14 sm:px-6 md:py-20"
      aria-labelledby="gallery-grid-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div
          className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible"
          role="list"
          aria-label={dict.viewCategory}
        >
          <button
            type="button"
            aria-pressed={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
              activeCategory === 'all'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 bg-white text-primary-dark hover:border-secondary hover:bg-secondary/10'
            }`}
          >
            <span>{dict.allCategory}</span>
            <span className="ms-2 rounded bg-white/15 px-1.5 py-0.5 text-xs">
              {totalCount}
            </span>
          </button>

          {categories.map((category) => {
            const isActive = activeCategory === category.slug;

            return (
              <button
                key={category.slug}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category.slug)}
                className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
                  isActive
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 bg-white text-primary-dark hover:border-secondary hover:bg-secondary/10'
                }`}
              >
                <span>{getCategoryLabel(category.slug)}</span>
                <span className="ms-2 rounded bg-black/5 px-1.5 py-0.5 text-xs">
                  {category.imageCount}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 border-y border-gray-100 py-5 md:flex-row md:items-end md:justify-between">
          <div className="text-start">
            <h2
              id="gallery-grid-heading"
              className="text-2xl font-black tracking-tight text-primary-dark md:text-3xl"
            >
              {activeCategory === 'all'
                ? dict.allCategory
                : getCategoryLabel(activeCategory)}
            </h2>
            <p className="mt-1 text-sm font-semibold text-text-muted">
              {visibleImages.length} {dict.imageCountLabel}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleImages.map((image, index) => {
            const caption = getImageCaption(image);
            const aspectClass = aspectPatterns[index % aspectPatterns.length];

            return (
              <figure
                key={image.id}
                className="group overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <button
                  type="button"
                  className={`relative block w-full ${aspectClass} overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2`}
                  aria-label={`${dict.viewImage}: ${caption}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image.src}
                    alt={caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary-dark/75 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
                <figcaption className="flex min-h-16 items-center justify-between gap-3 px-4 py-3 text-start">
                  <span className="text-sm font-bold leading-snug text-primary-dark">
                    {caption}
                  </span>
                  <span className="shrink-0 rounded bg-secondary/15 px-2 py-1 text-xs font-black text-primary-dark">
                    {getCategoryLabel(image.categorySlug)}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/95 px-3 py-4 sm:px-5 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={getImageCaption(selectedImage)}
          onClick={() => setSelectedImageIndex(null)}
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.025)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.025)_50%,rgba(255,255,255,0.025)_75%,transparent_75%,transparent)] bg-[length:34px_34px] opacity-20" />

          <button
            type="button"
            onClick={() => setSelectedImageIndex(null)}
            className={`absolute top-4 z-20 rounded-lg bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-secondary ${
              isRtl ? 'left-4' : 'right-4'
            }`}
            aria-label={dict.close}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <figure
            className="relative z-10 flex max-h-full w-full max-w-7xl flex-col gap-3 overflow-hidden rounded-lg border border-white/10 bg-[#090b2f]/90 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-white sm:px-5">
              <div className="min-w-0 text-start">
                <p className="text-xs font-black uppercase tracking-wide text-secondary">
                  {getCategoryLabel(selectedImage.categorySlug)}
                </p>
                <h3 className="mt-1 truncate text-sm font-black sm:text-base">
                  {getImageCaption(selectedImage)}
                </h3>
              </div>
              <div className="shrink-0 rounded-lg border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-sm font-black text-secondary">
                {(selectedImageIndex ?? 0) + 1} / {visibleImages.length}
              </div>
            </div>

            <div className="relative h-[58vh] w-full overflow-hidden bg-black/25 md:h-[68vh]">
              <Image
                key={selectedImage.id}
                src={selectedImage.src}
                alt={getImageCaption(selectedImage)}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />

              {visibleImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPreviousImage}
                    className={`absolute top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/15 bg-primary-dark/80 p-4 text-white shadow-lg backdrop-blur transition-colors hover:border-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary md:block ${
                      isRtl ? 'right-5' : 'left-5'
                    }`}
                    aria-label={dict.previousImage}
                  >
                    <svg
                      className={`h-6 w-6 ${isRtl ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextImage}
                    className={`absolute top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/15 bg-primary-dark/80 p-4 text-white shadow-lg backdrop-blur transition-colors hover:border-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary md:block ${
                      isRtl ? 'left-5' : 'right-5'
                    }`}
                    aria-label={dict.nextImage}
                  >
                    <svg
                      className={`h-6 w-6 ${isRtl ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <figcaption className="flex flex-col gap-3 border-t border-white/10 bg-primary-dark/80 p-3 sm:p-4">
              <div className="flex items-center justify-center gap-3 md:hidden">
                <button
                  type="button"
                  onClick={goToPreviousImage}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:border-secondary hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-secondary"
                  aria-label={dict.previousImage}
                >
                  <svg
                    className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goToNextImage}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:border-secondary hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-secondary"
                  aria-label={dict.nextImage}
                >
                  <svg
                    className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {visibleImages.map((image, index) => {
                  const isSelected = index === selectedImageIndex;

                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-secondary ${
                        isSelected
                          ? 'border-secondary'
                          : 'border-white/15 opacity-70 hover:border-white/40 hover:opacity-100'
                      }`}
                      aria-label={`${dict.viewImage}: ${getImageCaption(image)}`}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      {isSelected && (
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-secondary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
