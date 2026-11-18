import React, { useState } from 'react';
import { FAQSection } from '../components/FAQSection';
import { CircleDot, Printer, Check, Copy, ArrowLeftRight } from 'lucide-react';
import { RoutePath } from '../types';

interface RingSizeRow {
  uk: string;
  circMm: number;
  diamMm: number;
  us: string;
  eu: number;
}

// BS 6820 UK Alphabetical Ring Size Standard (A–Z, calibrated circumference & inner diameter)
const UK_RING_SIZES: RingSizeRow[] = [
  { uk: 'A', circMm: 37.8, diamMm: 12.04, us: '0.5', eu: 38 },
  { uk: 'B', circMm: 39.1, diamMm: 12.45, us: '1', eu: 39 },
  { uk: 'C', circMm: 40.4, diamMm: 12.85, us: '1.5', eu: 40 },
  { uk: 'D', circMm: 41.7, diamMm: 13.26, us: '2', eu: 42 },
  { uk: 'E', circMm: 42.9, diamMm: 13.67, us: '2.5', eu: 43 },
  { uk: 'F', circMm: 44.2, diamMm: 14.07, us: '3', eu: 44 },
  { uk: 'G', circMm: 45.5, diamMm: 14.48, us: '3.5', eu: 45 },
  { uk: 'H', circMm: 46.8, diamMm: 14.88, us: '4', eu: 47 },
  { uk: 'I', circMm: 48.0, diamMm: 15.27, us: '4.5', eu: 48 },
  { uk: 'J', circMm: 48.7, diamMm: 15.49, us: '4.75', eu: 49 },
  { uk: 'K', circMm: 50.0, diamMm: 15.90, us: '5.25', eu: 50 },
  { uk: 'L', circMm: 51.2, diamMm: 16.31, us: '5.75', eu: 51 },
  { uk: 'M', circMm: 52.5, diamMm: 16.71, us: '6.25', eu: 52 },
  { uk: 'N', circMm: 53.8, diamMm: 17.12, us: '6.75', eu: 54 },
  { uk: 'O', circMm: 55.1, diamMm: 17.53, us: '7', eu: 55 },
  { uk: 'P', circMm: 56.3, diamMm: 17.93, us: '7.5', eu: 56 },
  { uk: 'Q', circMm: 57.6, diamMm: 18.34, us: '8', eu: 58 },
  { uk: 'R', circMm: 58.9, diamMm: 18.75, us: '8.5', eu: 59 },
  { uk: 'S', circMm: 60.2, diamMm: 19.15, us: '9', eu: 60 },
  { uk: 'T', circMm: 61.4, diamMm: 19.56, us: '9.5', eu: 61 },
  { uk: 'U', circMm: 62.7, diamMm: 19.96, us: '10', eu: 63 },
  { uk: 'V', circMm: 64.0, diamMm: 20.37, us: '10.5', eu: 64 },
  { uk: 'W', circMm: 65.3, diamMm: 20.78, us: '11', eu: 65 },
  { uk: 'X', circMm: 66.6, diamMm: 21.18, us: '11.5', eu: 67 },
  { uk: 'Y', circMm: 67.8, diamMm: 21.59, us: '12', eu: 68 },
  { uk: 'Z', circMm: 68.5, diamMm: 21.79, us: '12.5', eu: 69 }
];

const RING_FAQS = [
  {
    question: 'How to measure ring size at home accurately in cm or mm?',
    answer:
      'Cut a non-stretch paper strip around 6 mm wide, wrap it snugly at the base of the finger (checking it slides over your knuckle), mark the overlap with a fine pen, and measure in millimetres or centimetres. For example, 5.25 cm (52.5 mm) matches UK Ring Size M under BS 6820.'
  },
  {
    question: 'What is the average ring size UK for women and men?',
    answer:
      'Across UK jewellers, the most common women’s ring sizes sit between UK L (51.2 mm / 5.12 cm) and UK N (53.8 mm / 5.38 cm), with UK M (52.5 mm) as the midpoint. Men’s wedding bands most frequently fall between UK S (60.2 mm) and UK U (62.7 mm).'
  },
  {
    question: 'Should I go up a half size for a wide ring band?',
    answer:
      'Yes. Narrow bands (1.5–2.5 mm) displace very little skin, whereas flat court or pipe-cut bands wider than 6 mm compress a wider section of tissue over the knuckle. Moving up half a UK letter size (about 0.63 mm in circumference) prevents tightness.'
  },
  {
    question: 'How do I measure ring size using an existing ring?',
    answer:
      'Place a well-fitting ring flat on a millimetre ruler and measure strictly across the inner circle from inside edge to inside edge—never including the outer metal wall. Multiply that inside diameter in mm by π (3.1416) to obtain circumference (for instance, 16.7 mm × π = 52.5 mm = UK M).'
  }
];

interface RingSizeViewProps {
  onNavigate: (path: RoutePath | string) => void;
  breadcrumb: React.ReactNode;
}

export default function RingSizeView({ onNavigate, breadcrumb }: RingSizeViewProps) {
  const [unit, setUnit] = useState<'mm' | 'cm' | 'in'>('mm');
  const [ringMeasureInput, setRingMeasureInput] = useState<string>('52.5');
  const [measureMode, setMeasureMode] = useState<'circumference' | 'diameter'>('circumference');
  const [bandStyle, setBandStyle] = useState<'narrow' | 'medium' | 'wide'>('narrow');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [img1Failed, setImg1Failed] = useState<boolean>(false);
  const [img2Failed, setImg2Failed] = useState<boolean>(false);

  const rawNum = Math.max(0, parseFloat(ringMeasureInput) || 0);
  const rawMm = unit === 'mm' ? rawNum : unit === 'cm' ? rawNum * 10 : rawNum * 25.4;
  const circMm = measureMode === 'circumference' ? rawMm : rawMm * Math.PI;
  const diamMm = circMm / Math.PI;
  const bandOffsetMm = bandStyle === 'wide' ? 0.65 : bandStyle === 'medium' ? 0.3 : 0;
  const adjustedCircMm = circMm + bandOffsetMm;

  const nearestIdx = UK_RING_SIZES.reduce((bestIdx, cur, idx) => {
    const curDiff = Math.abs(cur.circMm - adjustedCircMm);
    const bestDiff = Math.abs(UK_RING_SIZES[bestIdx].circMm - adjustedCircMm);
    return curDiff < bestDiff ? idx : bestIdx;
  }, 12);
  const matchedRing = UK_RING_SIZES[nearestIdx];

  const handleSelectRow = (row: RingSizeRow) => {
    setMeasureMode('circumference');
    setBandStyle('narrow');
    if (unit === 'mm') setRingMeasureInput(row.circMm.toFixed(1));
    else if (unit === 'cm') setRingMeasureInput((row.circMm / 10).toFixed(2));
    else setRingMeasureInput((row.circMm / 25.4).toFixed(2));
  };

  const handleUnitSwitch = (nextUnit: 'mm' | 'cm' | 'in') => {
    if (nextUnit === unit) return;
    if (nextUnit === 'mm') setRingMeasureInput(rawMm.toFixed(1));
    else if (nextUnit === 'cm') setRingMeasureInput((rawMm / 10).toFixed(2));
    else setRingMeasureInput((rawMm / 25.4).toFixed(2));
    setUnit(nextUnit);
  };

  const handleCopyMatch = () => {
    const text = `UK Ring Size ${matchedRing.uk} | Finger: ${(matchedRing.circMm / 10).toFixed(2)} cm (${matchedRing.circMm.toFixed(1)} mm) | Diameter: ${matchedRing.diamMm.toFixed(2)} mm | US ${matchedRing.us} | EU ${matchedRing.eu}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handlePrintSizer = () => {
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {breadcrumb}

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono flex items-center gap-1.5">
            <CircleDot className="w-4 h-4 shrink-0" />
            <span>BS 6820 Alphabetical Ring Sizing (UK A – Z)</span>
          </p>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Ring Size Chart UK &amp; Finger Circumference to CM Converter (A–Z)
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Measure your finger circumference or inside ring diameter in <strong>cm, mm, or inches</strong> and match it instantly to the official <strong>UK ring size chart (A–Z)</strong>, US &amp; EU equivalents, and a printable 1:1 home paper sizer.
          </p>
        </div>

        {/* Interactive UK Ring Size Calculator */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-xl bg-white border border-slate-200 p-1">
              <button
                type="button"
                onClick={() => setMeasureMode('circumference')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-colors ${
                  measureMode === 'circumference' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Finger Circumference
              </button>
              <button
                type="button"
                onClick={() => setMeasureMode('diameter')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-colors ${
                  measureMode === 'diameter' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Ring Inside Diameter
              </button>
            </div>

            <div className="inline-flex rounded-xl bg-white border border-slate-200 p-1">
              {(['mm', 'cm', 'in'] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => handleUnitSwitch(u)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase cursor-pointer transition-colors ${
                    unit === u ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="ring-measure-input" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {measureMode === 'circumference' ? 'Finger Wrap Length' : 'Inner Ring Diameter'} ({unit})
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setMeasureMode((prev) => (prev === 'circumference' ? 'diameter' : 'circumference'))
                  }
                  className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeftRight className="w-3 h-3" />
                  <span>{measureMode === 'circumference' ? 'Switch to Diameter' : 'Switch to Circumference'}</span>
                </button>
              </div>
              <input
                id="ring-measure-input"
                type="number"
                step="0.1"
                value={ringMeasureInput}
                onChange={(e) => setRingMeasureInput(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2 text-lg font-black text-slate-900 font-mono focus:border-blue-600 outline-none tabular-nums"
              />
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase text-slate-500 mr-1">Band Width:</span>
                {[
                  { id: 'narrow' as const, label: '1.5–3 mm' },
                  { id: 'medium' as const, label: '4–5 mm' },
                  { id: 'wide' as const, label: '6–8 mm' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBandStyle(b.id)}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold border cursor-pointer transition-colors ${
                      bandStyle === b.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col justify-center tabular-nums">
              <div className="text-xs font-bold uppercase text-blue-700 font-mono">Recommended UK Size</div>
              <div className="text-2xl font-black text-blue-900 font-mono mt-1">{`UK ${matchedRing.uk}`}</div>
              <div className="text-xs text-blue-800 font-semibold mt-0.5">
                {`US ${matchedRing.us} • EU ${matchedRing.eu}`}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-center tabular-nums">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">Exact Ring Metrics</div>
              <div className="text-base font-black text-slate-900 font-mono mt-1">
                {`${(circMm / 10).toFixed(2)} cm (${circMm.toFixed(1)} mm)`}
              </div>
              <div className="text-xs text-slate-600 font-mono mt-0.5">
                {`Ø ${diamMm.toFixed(2)} mm • ${(circMm / 25.4).toFixed(2)}"`}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-600">
              {bandStyle === 'wide'
                ? 'Applied +0.65 mm wide-band knuckle allowance (6–8 mm flat band).'
                : bandStyle === 'medium'
                ? 'Applied +0.30 mm comfort allowance for medium court profiles (4–5 mm).'
                : 'Standard BS 6820 narrow-band calibration (1.5–3 mm).'}
            </p>
            <button
              type="button"
              onClick={handleCopyMatch}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
                copiedSummary ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Copied Size!' : `Copy UK ${matchedRing.uk} Metrics`}</span>
            </button>
          </div>
        </div>

        {/* Printable 1:1 Home Ring Sizer Strip */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Printable 1:1 Home Ring Sizer Strip (Print at 100% Scale)
              </h2>
              <p className="text-xs sm:text-sm text-slate-700">
                Verify the <strong>5.0 cm (50 mm) calibration bar</strong> with a UK ruler before cutting around your finger.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrintSizer}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Ring Sizer</span>
            </button>
          </div>

          <div className="bg-white border border-dashed border-slate-400 rounded-xl p-3">
            <svg
              viewBox="0 0 680 96"
              className="w-full max-w-[680px] h-auto block"
              role="img"
              aria-label="Printable 1:1 UK Ring Sizer Strip from UK A to Z marked in millimetres and centimetres"
            >
              <rect x="0" y="0" width="680" height="96" fill="#ffffff" />
              <line x1="20" y1="18" x2="220" y2="18" stroke="#1e293b" strokeWidth="2" />
              <line x1="20" y1="12" x2="20" y2="24" stroke="#1e293b" strokeWidth="2" />
              <line x1="220" y1="12" x2="220" y2="24" stroke="#1e293b" strokeWidth="2" />
              <text x="120" y="13" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#2563eb" fontFamily="monospace">
                CALIBRATION CHECK = 5.0 CM (50 MM)
              </text>

              <rect x="20" y="34" width="640" height="44" rx="6" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="56" y1="34" x2="56" y2="78" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="38" y="60" textAnchor="middle" fontSize="9" fontWeight="800" fill="#dc2626" fontFamily="monospace">
                SLIT
              </text>

              {[
                { label: 'F', mm: 44, x: 185 },
                { label: 'H', mm: 47, x: 225 },
                { label: 'J', mm: 49, x: 265 },
                { label: 'L', mm: 51, x: 305 },
                { label: 'M', mm: 52.5, x: 345 },
                { label: 'N', mm: 54, x: 385 },
                { label: 'P', mm: 56, x: 425 },
                { label: 'R', mm: 59, x: 470 },
                { label: 'T', mm: 61, x: 515 },
                { label: 'W', mm: 65, x: 565 },
                { label: 'Z', mm: 68.5, x: 618 }
              ].map((tick) => (
                <g key={tick.label}>
                  <line x1={tick.x} y1="34" x2={tick.x} y2="52" stroke="#0f172a" strokeWidth="1.4" />
                  <text x={tick.x} y="64" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f172a" fontFamily="monospace">
                    {tick.label}
                  </text>
                  <text x={tick.x} y="74" textAnchor="middle" fontSize="8" fill="#475569" fontFamily="monospace">
                    {`${tick.mm}`}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Complete UK Ring Size Chart A-Z (Fixed Zero-Scroll Mobile Table) */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            UK Ring Size Chart (A–Z) in CM, MM, Diameter, US &amp; EU
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Tap any row in the BS 6820 UK chart below to load its exact finger circumference into the calculator.
          </p>
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full table-fixed text-left tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase font-mono text-[11px] sm:text-xs">
                <tr>
                  <th className="w-[15%] px-2 py-2.5 sm:p-3 border-b border-slate-200">UK</th>
                  <th className="w-[33%] px-2 py-2.5 sm:p-3 border-b border-slate-200">Circumf.</th>
                  <th className="w-[26%] px-2 py-2.5 sm:p-3 border-b border-slate-200">Diameter</th>
                  <th className="w-[26%] px-2 py-2.5 sm:p-3 border-b border-slate-200">US / EU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px] sm:text-sm">
                {UK_RING_SIZES.map((r, idx) => (
                  <tr
                    key={r.uk}
                    onClick={() => handleSelectRow(r)}
                    className={`cursor-pointer transition-colors ${
                      matchedRing.uk === r.uk
                        ? 'bg-blue-50'
                        : idx % 2 === 0
                        ? 'bg-white hover:bg-slate-50'
                        : 'bg-slate-50/50 hover:bg-slate-100/70'
                    }`}
                  >
                    <td className="px-2 py-2 sm:p-3 font-black text-slate-900">{`UK ${r.uk}`}</td>
                    <td className="px-2 py-2 sm:p-3 font-bold text-blue-700">
                      <span className="block">{`${(r.circMm / 10).toFixed(2)} cm`}</span>
                      <span className="block text-[10px] sm:text-xs text-slate-500 font-normal">{`${r.circMm.toFixed(1)} mm`}</span>
                    </td>
                    <td className="px-2 py-2 sm:p-3 text-slate-700">{`${r.diamMm.toFixed(2)} mm`}</td>
                    <td className="px-2 py-2 sm:p-3 text-slate-600">{`${r.us} / ${r.eu}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 7 Unique Ring Sizing Infographics + Studio Macro Photos */}
        <section className="space-y-6 pt-2" aria-labelledby="ring-infographics-heading">
          <div className="border-b border-slate-200 pb-3 space-y-1">
            <h2 id="ring-infographics-heading" className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              7 Visual Ring Sizing Infographics: How to Measure Ring Size at Home
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Seven calibrated metrological diagrams and UK workshop references explaining how jewellers eliminate home-measuring errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Infographic 1 */}
            <figure className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
              {img1Failed ? (
                <div className="aspect-[4/3] w-full flex items-center justify-center p-6 bg-slate-100 text-slate-600 text-sm font-semibold">
                  Ring Finger Circumference Strip Calibration
                </div>
              ) : (
                <img
                  src="/images/ring-size-measure.webp"
                  alt="Wrapping a non-stretch paper strip around the ring finger beside a precision metric ruler to measure circumference in cm and mm"
                  width={720}
                  height={540}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setImg1Failed(true)}
                  className="w-full h-auto aspect-[4/3] object-cover block"
                />
              )}
              <figcaption className="p-4 bg-white border-t border-slate-200 space-y-1 flex-1">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  Infographic 01 • Non-Stretch Paper Strip Method
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Wrap a flat 6 mm paper ribbon snugly around the base phalanx—never elastic string or wool, which stretches by 2–4 mm and jumps two UK sizes.
                </p>
              </figcaption>
            </figure>

            {/* Infographic 2 */}
            <figure className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
              <div className="p-4 bg-white flex-1 flex items-center justify-center">
                <svg viewBox="0 0 360 220" className="w-full h-auto" role="img" aria-label="Inside ring diameter C equals pi times d infographic">
                  <rect x="0" y="0" width="360" height="220" rx="12" fill="#f8fafc" />
                  <circle cx="115" cy="110" r="64" fill="none" stroke="#94a3b8" strokeWidth="14" />
                  <circle cx="115" cy="110" r="57" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="5 3" />
                  <line x1="58" y1="110" x2="172" y2="110" stroke="#dc2626" strokeWidth="2.5" />
                  <polygon points="58,110 66,105 66,115" fill="#dc2626" />
                  <polygon points="172,110 164,105 164,115" fill="#dc2626" />
                  <text x="115" y="99" textAnchor="middle" fontSize="11" fontWeight="800" fill="#dc2626" fontFamily="monospace">
                    INNER d = 16.71 mm
                  </text>
                  <line x1="44" y1="186" x2="186" y2="186" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="115" y="201" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="sans-serif">
                    Exclude outer metal wall
                  </text>
                  <rect x="200" y="34" width="144" height="152" rx="10" fill="#ffffff" stroke="#e2e8f0" />
                  <text x="272" y="60" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a" fontFamily="monospace">
                    C = π × d
                  </text>
                  <text x="272" y="84" textAnchor="middle" fontSize="10.5" fill="#334155" fontFamily="monospace">
                    d = 16.71 mm
                  </text>
                  <text x="272" y="102" textAnchor="middle" fontSize="10.5" fill="#334155" fontFamily="monospace">
                    C = 3.1416 × 16.71
                  </text>
                  <rect x="216" y="118" width="112" height="32" rx="6" fill="#eff6ff" stroke="#93c5fd" />
                  <text x="272" y="138" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1d4ed8" fontFamily="monospace">
                    52.5 mm = UK M
                  </text>
                  <text x="272" y="170" textAnchor="middle" fontSize="9.5" fill="#64748b" fontFamily="sans-serif">
                    0.4 mm error = 1/3 UK size
                  </text>
                </svg>
              </div>
              <figcaption className="p-4 bg-white border-t border-slate-200 space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  Infographic 02 • Inside Diameter Formula (C = π × d)
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Measure strictly between the inside metal walls of an existing ring. Counting a 1.5 mm rim adds ~4.7 mm to circumference and skews your result by nearly 4 UK letters.
                </p>
              </figcaption>
            </figure>

            {/* Infographic 3 */}
            <figure className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
              <div className="p-4 bg-white flex-1 flex items-center justify-center">
                <svg viewBox="0 0 360 220" className="w-full h-auto" role="img" aria-label="BS 6820 UK Alphabetical Ring Size Step Scale">
                  <rect x="0" y="0" width="360" height="220" rx="12" fill="#f8fafc" />
                  <text x="180" y="26" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0f172a" fontFamily="monospace">
                    BS 6820 PROGRESSION (+1.25 MM / LETTER)
                  </text>
                  <line x1="28" y1="88" x2="332" y2="88" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                  {[
                    { uk: 'H', mm: '46.8', x: 38, h: 24 },
                    { uk: 'J', mm: '48.7', x: 84, h: 32 },
                    { uk: 'L', mm: '51.2', x: 132, h: 40 },
                    { uk: 'M', mm: '52.5', x: 180, h: 52, active: true },
                    { uk: 'N', mm: '53.8', x: 228, h: 40 },
                    { uk: 'P', mm: '56.3', x: 276, h: 32 },
                    { uk: 'R', mm: '58.9', x: 322, h: 24 }
                  ].map((item) => (
                    <g key={item.uk}>
                      <line
                        x1={item.x}
                        y1={88 - item.h}
                        x2={item.x}
                        y2={88}
                        stroke={item.active ? '#2563eb' : '#475569'}
                        strokeWidth={item.active ? 3.5 : 2}
                      />
                      <circle cx={item.x} cy={88} r={item.active ? 5 : 3.5} fill={item.active ? '#2563eb' : '#0f172a'} />
                      <text
                        x={item.x}
                        y="112"
                        textAnchor="middle"
                        fontSize={item.active ? '12.5' : '11'}
                        fontWeight="800"
                        fill={item.active ? '#1d4ed8' : '#0f172a'}
                        fontFamily="monospace"
                      >
                        {item.uk}
                      </text>
                      <text x={item.x} y="128" textAnchor="middle" fontSize="9.5" fill="#475569" fontFamily="monospace">
                        {item.mm}
                      </text>
                    </g>
                  ))}
                  <rect x="28" y="148" width="304" height="52" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
                  <text x="180" y="169" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1e3a8a" fontFamily="sans-serif">
                    1 Full Letter Step ≈ +1.25 mm circumference (+0.40 mm Ø)
                  </text>
                  <text x="180" y="187" textAnchor="middle" fontSize="10" fill="#1e40af" fontFamily="monospace">
                    Half Size (e.g. M½ = 53.1 mm) ≈ +0.63 mm
                  </text>
                </svg>
              </div>
              <figcaption className="p-4 bg-white border-t border-slate-200 space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  Infographic 03 • BS 6820 Alphabetical Step Increments
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  British Standard 6820 increments ring circumference linearly by ~1.25 mm per letter (~0.40 mm inside diameter), giving fine precision across 26 whole sizes A–Z.
                </p>
              </figcaption>
            </figure>

            {/* Infographic 4 */}
            <figure className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
              {img2Failed ? (
                <div className="aspect-[4/3] w-full flex items-center justify-center p-6 bg-slate-100 text-slate-600 text-sm font-semibold">
                  BS 6820 Jeweller Mandrel &amp; Narrow vs Wide Band Fit
                </div>
              ) : (
                <img
                  src="/images/ring-mandrel-bands.webp"
                  alt="Steel UK jeweller ring mandrel marked A to Z beside a 2 mm narrow band and 8 mm wide band comparing fit profile"
                  width={720}
                  height={538}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setImg2Failed(true)}
                  className="w-full h-auto aspect-[4/3] object-cover block"
                />
              )}
              <figcaption className="p-4 bg-white border-t border-slate-200 space-y-1 flex-1">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  Infographic 04 • Band Width Fit Compensation (2 mm vs 8 mm)
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  An 8 mm wide band contacts four times more skin than a 2 mm solitaire shank. Always size up half a UK letter when choosing flat bands 6 mm or wider.
                </p>
              </figcaption>
            </figure>

            {/* Infographic 5 */}
            <figure className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
              <div className="p-4 bg-white flex-1 flex items-center justify-center">
                <svg viewBox="0 0 360 210" className="w-full h-auto" role="img" aria-label="Daily temperature and finger swelling variation curve">
                  <rect x="0" y="0" width="360" height="210" rx="12" fill="#f8fafc" />
                  <text x="180" y="25" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a" fontFamily="monospace">
                    DAILY FINGER CIRCUMFERENCE DRIFT (±0.8 MM)
                  </text>
                  <rect x="130" y="40" width="120" height="122" fill="#dcfce7" opacity="0.7" />
                  <text x="190" y="55" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#166534" fontFamily="monospace">
                    BEST MEASURE WINDOW
                  </text>
                  <line x1="36" y1="162" x2="332" y2="162" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="36" y1="42" x2="36" y2="162" stroke="#94a3b8" strokeWidth="1.5" />
                  <path
                    d="M 42 138 Q 100 132 145 104 T 245 92 Q 290 72 324 58"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="52" cy="136" r="4.5" fill="#0284c7" />
                  <circle cx="190" cy="96" r="5" fill="#16a34a" />
                  <circle cx="316" cy="61" r="4.5" fill="#dc2626" />
                  <text x="58" y="154" fontSize="9" fill="#0369a1" fontFamily="sans-serif">
                    Cold AM (-0.5 size)
                  </text>
                  <text x="190" y="182" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#15803d" fontFamily="sans-serif">
                    Mid-Afternoon • 20°C Neutral
                  </text>
                  <text x="275" y="48" textAnchor="middle" fontSize="9" fill="#b91c1c" fontFamily="sans-serif">
                    Heat/Exercise (+0.5)
                  </text>
                </svg>
              </div>
              <figcaption className="p-4 bg-white border-t border-slate-200 space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  Infographic 05 • Thermal Expansion &amp; Time of Day
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Fingers shrink in cold winter mornings and swell slightly after hot showers, salty meals, or exercise. Measure at room temperature late afternoon across 2–3 days.
                </p>
              </figcaption>
            </figure>

            {/* Infographic 6 */}
            <figure className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
              <div className="p-4 bg-white flex-1 flex items-center justify-center">
                <svg viewBox="0 0 360 210" className="w-full h-auto" role="img" aria-label="Knuckle clearance versus base phalanx fit diagram">
                  <rect x="0" y="0" width="360" height="210" rx="12" fill="#f8fafc" />
                  <text x="180" y="25" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a" fontFamily="monospace">
                    KNUCKLE VS BASE TAPER CHECK
                  </text>
                  <path
                    d="M 48 92 C 92 92 108 72 132 72 C 156 72 172 86 218 84 C 248 83 272 78 294 82 C 316 86 322 104 316 116 C 310 128 282 132 218 128 C 172 126 156 140 132 140 C 108 140 92 120 48 120 Z"
                    fill="#fde68a"
                    stroke="#b45309"
                    strokeWidth="2"
                  />
                  <rect x="128" y="67" width="9" height="78" rx="4" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="3 2" />
                  <rect x="86" y="88" width="12" height="36" rx="4" fill="#2563eb" opacity="0.88" />
                  <text x="132" y="57" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#dc2626" fontFamily="monospace">
                    KNUCKLE MAX (53.8 mm)
                  </text>
                  <text x="92" y="160" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#1d4ed8" fontFamily="monospace">
                    BASE (51.2 mm)
                  </text>
                  <rect x="28" y="173" width="304" height="26" rx="6" fill="#eff6ff" stroke="#bfdbfe" />
                  <text x="180" y="190" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1e3a8a" fontFamily="sans-serif">
                    Rule: Average both when knuckle &gt; base by 2+ UK sizes (M½)
                  </text>
                </svg>
              </div>
              <figcaption className="p-4 bg-white border-t border-slate-200 space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  Infographic 06 • Knuckle Clearance Balance
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  A properly fitted ring slides smoothly on yet needs a 1–2 second gentle twist back over the knuckle. If your knuckle exceeds your base, pick the exact midpoint size.
                </p>
              </figcaption>
            </figure>

            {/* Infographic 7 (Full Width Summary Cross-Reference) */}
            <figure className="md:col-span-2 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
              <div className="p-4 bg-white">
                <svg viewBox="0 0 680 185" className="w-full h-auto" role="img" aria-label="International UK to US and EU ring size cross-reference infographic">
                  <rect x="0" y="0" width="680" height="185" rx="12" fill="#f8fafc" />
                  <text x="340" y="26" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a" fontFamily="monospace">
                    POPULAR UK RING SIZES ↔ US NUMERIC ↔ EU CIRCUMFERENCE (MM)
                  </text>
                  {[
                    { uk: 'UK J', mm: '48.7 mm', us: 'US 4.75', eu: 'EU 49', x: 24 },
                    { uk: 'UK L', mm: '51.2 mm', us: 'US 5.75', eu: 'EU 51', x: 132 },
                    { uk: 'UK M', mm: '52.5 mm', us: 'US 6.25', eu: 'EU 52', x: 240, hi: true },
                    { uk: 'UK N', mm: '53.8 mm', us: 'US 6.75', eu: 'EU 54', x: 348 },
                    { uk: 'UK P', mm: '56.3 mm', us: 'US 7.5', eu: 'EU 56', x: 456 },
                    { uk: 'UK T', mm: '61.4 mm', us: 'US 9.5', eu: 'EU 61', x: 564 }
                  ].map((c) => (
                    <g key={c.uk}>
                      <rect
                        x={c.x}
                        y="44"
                        width="92"
                        height="118"
                        rx="10"
                        fill={c.hi ? '#eff6ff' : '#ffffff'}
                        stroke={c.hi ? '#2563eb' : '#cbd5e1'}
                        strokeWidth={c.hi ? 2 : 1.2}
                      />
                      <text x={c.x + 46} y="69" textAnchor="middle" fontSize="14" fontWeight="900" fill={c.hi ? '#1d4ed8' : '#0f172a'} fontFamily="monospace">
                        {c.uk}
                      </text>
                      <line x1={c.x + 12} y1="79" x2={c.x + 80} y2="79" stroke="#e2e8f0" />
                      <text x={c.x + 46} y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155" fontFamily="monospace">
                        {c.mm}
                      </text>
                      <text x={c.x + 46} y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f766e" fontFamily="monospace">
                        {c.us}
                      </text>
                      <text x={c.x + 46} y="144" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4338ca" fontFamily="monospace">
                        {c.eu}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              <figcaption className="p-4 bg-white border-t border-slate-200 space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  Infographic 07 • International UK ↔ US ↔ EU Jewellery Conversion
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  European (ISO 8653) ring sizes literally equal the ring’s inner circumference rounded to whole millimetres—so measuring your finger in mm immediately gives both your EU number and exact BS 6820 UK letter.
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Advanced Metrological & Jeweller Editorial Guide */}
        <article className="space-y-6 text-slate-700 font-sans text-base sm:text-lg leading-relaxed border-t border-slate-100 pt-6">
          <div className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Complete UK BS 6820 Ring Sizing Standards &amp; Engineering Precision
            </h2>
            <p>
              Unlike casual clothing letters, British ring sizes follow <strong>British Standard BS 6820</strong> (alongside ISO 8653 metric circumference mapping). Beginning at <strong>UK Size A (37.8 mm)</strong>, each whole letter step increases internal circumference by roughly <strong>1.25 mm</strong> (which raises internal diameter by <strong>0.398 mm</strong> via <em>d = C ÷ π</em>). Half sizes—written by UK high-street jewellers as <strong>J½, L½, M½, N½</strong>—split that step to 0.625 mm, providing sub-millimetre comfort tuning for engagement rings and wedding bands.
            </p>
          </div>

          <div className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Avoiding Common Home Measurement Errors &amp; Mandate Tolerances
            </h2>
            <p>
              Three physical variables explain nearly 90% of online ring returns in the United Kingdom: <strong>strip elasticity</strong>, <strong>band profile geometry</strong>, and <strong>diurnal finger temperature</strong>. Avoid string or sewing thread, as tension compresses skin under the loop and under-reads true size by one to two letters. Measure with a crisp 6 mm paper collar in the late afternoon around 20 °C, check both hands separately (your dominant hand is typically half a letter larger), and never measure immediately after cold weather or exercise.
            </p>
          </div>

          <div className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Matching Profile Shapes: Court, D-Shape &amp; Flat Pipe-Cut Bands
            </h2>
            <p>
              <strong>Traditional Court (Comfort-Fit)</strong> bands feature a gently domed interior surface that reduces skin contact area, allowing narrow-to-medium bands (2–4 mm) to fit true to your nominal BS 6820 chart size. Conversely, <strong>Flat / Pipe-Cut</strong> wedding bands of 6–8 mm grip the finger across their entire width and restrict knuckle passage; British bespoke jewellers routinely recommend ordering <strong>+0.5 UK size larger</strong> (adding ~0.65 mm circumference) for wide parallel profiles.
            </p>
          </div>

          <p className="text-base text-slate-700 pt-1">
            Need to convert any ruler, ring diameter, or decimal centimetre measurement into fractional inches? Return to our{' '}
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
          </p>
        </article>
      </div>

      <FAQSection customFAQs={RING_FAQS} />
    </div>
  );
}
