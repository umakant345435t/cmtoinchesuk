import React, { useState } from 'react';
import { FAQ_HOME } from '../data/conversions';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

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
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center text-left text-base sm:text-lg font-black text-slate-950 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer"
              >
                <span className="pr-4 leading-snug">{faq.question}</span>
                {isExpanded ? (
                  <ChevronUp className="text-blue-100 bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center stroke-[3px] shrink-0 p-1" />
                ) : (
                  <ChevronDown className="text-slate-500 bg-slate-100 rounded-full h-6 w-6 flex items-center justify-center stroke-[2.5px] shrink-0 p-1" />
                )}
              </button>
              
              {isExpanded && (
                <div className="mt-3.5 text-base sm:text-lg text-slate-700 leading-relaxed bg-blue-50/40 p-5 rounded-xl border border-blue-200/70 transition-all font-sans">
                  {faq.answer}
                </div>
              )}
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
