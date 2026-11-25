import React from 'react';
import { FAQ_HOME } from '../data/conversions';

interface FAQSectionProps {
  customFAQs?: { question: string; answer: string }[];
}

export function FAQSection({ customFAQs }: FAQSectionProps) {
  const faqs = customFAQs || FAQ_HOME;

  // Structured FAQPage JSON-LD matching every visible question and answer
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
      <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium mt-0.5">
          Complete, verified answers on metric-to-imperial formulas, UK sizing, and everyday measurements.
        </p>
      </div>

      <dl className="p-6 divide-y divide-slate-200">
        {faqs.map((faq, idx) => (
          <div key={idx} className="py-5 first:pt-0 last:pb-0 space-y-2.5">
            <dt className="text-base sm:text-lg font-black text-slate-950 leading-snug">
              {faq.question}
            </dt>
            <dd className="faq-ans">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
