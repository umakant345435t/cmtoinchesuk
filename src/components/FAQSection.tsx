import React, { useState } from 'react';
import { FAQ_HOME } from '../data/conversions';
import { MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  customFAQs?: { question: string; answer: string }[];
}

export function FAQSection({ customFAQs }: FAQSectionProps) {
  const faqs = customFAQs || FAQ_HOME;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  // Convert current FAQs list to JSON-LD string
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden" id="faq-section">
      <svg width="0" height="0" className="hidden" aria-hidden="true">
        <defs>
          <g id="ico-chev"><path d="m6 9 6 6 6-6" /></g>
        </defs>
      </svg>
      <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-blue-600 stroke-[2.5] shrink-0" />
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-wide">
            ❓ Frequently Asked Questions (FAQ)
          </h3>
          <p className="text-base text-slate-600 font-semibold mt-0.5">
            Answers regarding measurements, British metrology regulations, and conversions.
          </p>
        </div>
      </div>

      <div className="p-6 divide-y divide-slate-200">
        {faqs.map((faq, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div key={idx} className="py-4.5 first:pt-0 last:pb-0">
              <button
                type="button"
                data-faq-btn={idx}
                aria-expanded={isExpanded}
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center text-left text-base sm:text-lg font-black text-slate-950 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer"
              >
                <span className="pr-4 leading-snug">{faq.question}</span>
                <svg viewBox="0 0 24 24" className="faq-chev" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <use href="#ico-chev" />
                </svg>
              </button>

              <div data-faq-panel={idx} className={isExpanded ? 'faq-ans' : 'hidden faq-ans'}>
                {isExpanded ? faq.answer : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* JSON-LD Schema Script Tag printed inside the layout so Google reads schema instantly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
