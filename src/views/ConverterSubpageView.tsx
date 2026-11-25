import React from 'react';
import { RoutePath } from '../types';
import { CONVERSION_TYPES } from '../data/conversions';
import { CONVERTER_GUIDES } from '../data/converterGuides';
import { ConverterTool } from '../components/ConverterTool';
import { FAQSection } from '../components/FAQSection';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';

interface ConverterSubpageViewProps {
  currentPath: RoutePath;
  converterValue?: number;
  onNavigate: (path: RoutePath | string) => void;
  breadcrumb: React.ReactNode;
}

export default function ConverterSubpageView({
  currentPath,
  converterValue,
  onNavigate,
  breadcrumb
}: ConverterSubpageViewProps) {
  const activeType =
    CONVERSION_TYPES.find((t) => t.id === currentPath.replace(/\//g, '')) || CONVERSION_TYPES[0];
  const guide = CONVERTER_GUIDES[activeType.id];

  return (
    <div className="space-y-6">
      {breadcrumb}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
            {guide ? guide.kicker : 'Measurement Conversion Guide'}
          </p>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            {activeType.label} Converter ({activeType.fromUnit} → {activeType.toUnit})
          </h1>
        </div>

        <ConverterTool
          initialTypeId={activeType.id}
          initialFromValue={converterValue}
          onNavigate={onNavigate}
        />

        <AdSensePlaceholder slotId="1003" type="in-feed-horizontal" />

        {guide && (
          <div className="space-y-7 pt-2 text-slate-700 font-sans">
            <p className="text-base sm:text-lg leading-relaxed">{guide.intro}</p>

            <div className="p-4 sm:p-5 bg-blue-50/70 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-800 font-mono">
                  Standard Formula &amp; Quick Estimate
                </div>
                <div className="text-lg font-black text-slate-900 font-mono mt-1">
                  {activeType.formula}
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-700 sm:max-w-md">{guide.quickTip}</p>
            </div>

            {guide.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="font-black text-slate-950 text-lg sm:text-xl tracking-tight">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-lg leading-relaxed text-slate-700">
                    {para}
                  </p>
                ))}
              </div>
            ))}

            {/* Page-Specific UK Practical Reference Table */}
            <div className="space-y-3 pt-2">
              <h2 className="font-black text-slate-950 text-lg sm:text-xl tracking-tight">
                {guide.table.title}
              </h2>
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-sm sm:text-base tabular-nums">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase font-mono text-xs sm:text-sm">
                    <tr>
                      <th className="p-3.5 border-b border-slate-200">{guide.table.headers[0]}</th>
                      <th className="p-3.5 border-b border-slate-200">{guide.table.headers[1]}</th>
                      <th className="p-3.5 border-b border-slate-200">{guide.table.headers[2]}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {guide.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="p-3.5 font-bold text-slate-900 font-mono">{row[0]}</td>
                        <td className="p-3.5 font-bold text-blue-700 font-mono">{row[1]}</td>
                        <td className="p-3.5 text-slate-700">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-base text-slate-700 mt-4">
          Need to convert another linear unit or check our full UK measurement reference guides? Return to the main{' '}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="text-blue-600 font-bold underline hover:text-blue-800"
          >
            CM to Inches Converter
          </a>
          .
        </div>
      </div>

      {guide && guide.faqs.length > 0 && <FAQSection customFAQs={guide.faqs} />}
    </div>
  );
}
