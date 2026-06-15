'use client';

import { useState } from 'react';
import { serializeJsonLd } from '../seo';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  dict: {
    heading: string;
    headingAccent: string;
    subtext: string;
    items: FaqItem[];
  };
  locale: string;
}

export default function FaqSection({ dict }: FaqSectionProps) {
  // State: stores index of active open question (null if all closed)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Generate FAQ JSON-LD Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section
      className="w-full py-16 md:py-24 px-4 bg-white"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* Title Header */}
        <h2 id="faq-heading" className="text-3xl md:text-4.5xl font-black text-primary-dark mb-4 text-center">
          {dict.heading} <span className="text-secondary">{dict.headingAccent}</span>
        </h2>

        {/* Subtext description */}
        <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 text-center">
          {dict.subtext}
        </p>

        {/* Accordion Questions List */}
        <div className="w-full flex flex-col gap-4" id="faq-accordion-group">
          {dict.items.map((item, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div
                key={idx}
                className="w-full border border-gray-100 rounded-2xl overflow-hidden bg-gray-50 shadow-sm"
              >
                {/* Clickable Header Button */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-start font-bold text-primary-dark hover:bg-gray-100/50 transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="text-base md:text-lg select-none leading-snug">{item.question}</span>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/5 text-primary shrink-0 transition-transform duration-200">
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Collapsible Answer Panel */}
                <div
                  id={`faq-answer-${idx}`}
                  aria-labelledby={`faq-question-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[300px] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 py-5 text-text-muted text-sm md:text-base leading-relaxed bg-white text-start">
                    {item.answer}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
