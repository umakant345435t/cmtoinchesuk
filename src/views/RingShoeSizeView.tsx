import React, { useState } from 'react';
import { FAQSection } from '../components/FAQSection';
import { CircleDot, Footprints, Watch, Printer, Copy, Check } from 'lucide-react';
import { RoutePath } from '../types';

interface RingSizeRow {
  uk: string;
  circMm: number;
  diaMm: number;
  us: string;
  eu: string;
}

// British Standard BS 6820 alphabetical ring sizes (A-Z) calibrated in mm circumference & inside diameter
const UK_RING_SIZES: RingSizeRow[] = [
  { uk: 'A', circMm: 37.8, diaMm: 12.04, us: '0.5', eu: '38' },
  { uk: 'B', circMm: 39.1, diaMm: 12.45, us: '1', eu: '39' },
  { uk: 'C', circMm: 40.4, diaMm: 12.86, us: '1.5', eu: '40' },
  { uk: 'D', circMm: 41.7, diaMm: 13.27, us: '2', eu: '42' },
  { uk: 'E', circMm: 42.9, diaMm: 13.66, us: '2.5', eu: '43' },
  { uk: 'F', circMm: 44.2, diaMm: 14.07, us: '3', eu: '44' },
  { uk: 'G', circMm: 45.5, diaMm: 14.48, us: '3.5', eu: '45.5' },
  { uk: 'H', circMm: 46.8, diaMm: 14.90, us: '4', eu: '47' },
  { uk: 'I', circMm: 48.0, diaMm: 15.28, us: '4.5', eu: '48' },
  { uk: 'J', circMm: 48.7, diaMm: 15.50, us: '5', eu: '49' },
  { uk: 'K', circMm: 50.0, diaMm: 15.92, us: '5.5', eu: '50' },
  { uk: 'L', circMm: 51.2, diaMm: 16.30, us: '6', eu: '51' },
  { uk: 'M', circMm: 52.5, diaMm: 16.71, us: '6.5', eu: '52.5' },
  { uk: 'N', circMm: 53.8, diaMm: 17.13, us: '7', eu: '54' },
  { uk: 'O', circMm: 55.1, diaMm: 17.54, us: '7.5', eu: '55' },
  { uk: 'P', circMm: 56.3, diaMm: 17.92, us: '8', eu: '56.5' },
  { uk: 'Q', circMm: 57.6, diaMm: 18.33, us: '8.5', eu: '57.5' },
  { uk: 'R', circMm: 58.9, diaMm: 18.75, us: '9', eu: '59' },
  { uk: 'S', circMm: 60.2, diaMm: 19.16, us: '9.5', eu: '60' },
  { uk: 'T', circMm: 61.4, diaMm: 19.54, us: '10', eu: '61.5' },
  { uk: 'U', circMm: 62.7, diaMm: 19.96, us: '10.5', eu: '63' },
  { uk: 'V', circMm: 64.0, diaMm: 20.37, us: '11', eu: '64' },
  { uk: 'W', circMm: 65.3, diaMm: 20.79, us: '11.5', eu: '65' },
  { uk: 'X', circMm: 66.6, diaMm: 21.20, us: '12', eu: '66.5' },
  { uk: 'Y', circMm: 67.8, diaMm: 21.58, us: '12.5', eu: '68' },
  { uk: 'Z', circMm: 68.5, diaMm: 21.80, us: '13', eu: '69' },
];

interface ShoeSizeRow {
  uk: string;
  group: 'child' | 'adult';
  cm: number;
  eu: string;
  us: string;
}

const UK_CHILD_SHOES: ShoeSizeRow[] = [
  { uk: '1K (Infant)', group: 'child', cm: 9.3, eu: '16', us: '2C' },
  { uk: '2K', group: 'child', cm: 10.2, eu: '18', us: '3C' },
  { uk: '3K', group: 'child', cm: 11.0, eu: '19', us: '4C' },
  { uk: '4K', group: 'child', cm: 11.9, eu: '20', us: '5C' },
  { uk: '5K', group: 'child', cm: 12.7, eu: '21.5', us: '6C' },
  { uk: '6K', group: 'child', cm: 13.5, eu: '23', us: '7C' },
  { uk: '7K', group: 'child', cm: 14.4, eu: '24', us: '8C' },
  { uk: '8K', group: 'child', cm: 15.2, eu: '25.5', us: '9C' },
  { uk: '9K', group: 'child', cm: 16.1, eu: '27', us: '10C' },
  { uk: '10K', group: 'child', cm: 16.9, eu: '28', us: '11C' },
  { uk: '11K', group: 'child', cm: 17.8, eu: '29', us: '12C' },
  { uk: '12K', group: 'child', cm: 18.6, eu: '30.5', us: '13C' },
  { uk: '13K', group: 'child', cm: 19.5, eu: '32', us: '1Y' },
  { uk: '13.5K', group: 'child', cm: 19.9, eu: '32.5', us: '1.5Y' },
  { uk: '1 (Junior)', group: 'child', cm: 20.3, eu: '33', us: '2Y' },
  { uk: '2 (Junior)', group: 'child', cm: 21.2, eu: '34.5', us: '3Y' },
  { uk: '3 (Junior)', group: 'child', cm: 22.0, eu: '35.5', us: '4Y' },
  { uk: '4 (Junior)', group: 'child', cm: 22.9, eu: '37', us: '5Y' },
  { uk: '5 (Junior)', group: 'child', cm: 23.7, eu: '38', us: '6Y' },
];

const UK_ADULT_SHOES: ShoeSizeRow[] = [
  { uk: 'UK 3', group: 'adult', cm: 22.0, eu: '35.5', us: '4M / 5.5W' },
  { uk: 'UK 4', group: 'adult', cm: 22.9, eu: '37', us: '5M / 6.5W' },
  { uk: 'UK 5', group: 'adult', cm: 23.7, eu: '38', us: '6M / 7.5W' },
  { uk: 'UK 6', group: 'adult', cm: 24.6, eu: '39.5', us: '7M / 8.5W' },
  { uk: 'UK 7', group: 'adult', cm: 25.4, eu: '40.5', us: '8M / 9.5W' },
  { uk: 'UK 8', group: 'adult', cm: 26.2, eu: '42', us: '9M / 10.5W' },
  { uk: 'UK 9', group: 'adult', cm: 27.1, eu: '43', us: '10M / 11.5W' },
  { uk: 'UK 10', group: 'adult', cm: 27.9, eu: '44.5', us: '11M / 12.5W' },
  { uk: 'UK 11', group: 'adult', cm: 28.8, eu: '46', us: '12M / 13.5W' },
  { uk: 'UK 12', group: 'adult', cm: 29.6, eu: '47', us: '13M' },
  { uk: 'UK 13', group: 'adult', cm: 30.5, eu: '48.5', us: '14M' },
];

const RING_SHOE_FAQS = [
  {
    question: 'How do I measure ring size at home accurately?',
    answer:
      'Wrap a 6 mm wide strip of non-stretch paper snugly around the base of your finger, mark the overlap line with a fine pen, lay it flat against a millimetre ruler, and match that circumference in mm or cm against our UK A–Z ring size chart above.'
  },
  {
    question: 'How does the UK ring size chart (A–Z) compare to finger circumference in CM and MM?',
    answer:
      'Under British Standard BS 6820, UK ring sizes run alphabetically from A (37.8 mm / 3.78 cm) to Z (68.5 mm / 6.85 cm). Average UK women ring sizes fall between L (5.12 cm) and N (5.38 cm), while average UK men ring sizes fall between R (5.89 cm) and T (6.14 cm).'
  },
  {
    question: 'What is a UK child shoe size in cm?',
    answer:
      'In the UK children sizing scale, toddler size 4K measures 11.9 cm (4.69 in), size 8K measures 15.2 cm (5.98 in), size 12K measures 18.6 cm (7.32 in), and Junior UK 2 measures 21.2 cm (8.35 in). Always measure both feet standing up and add 0.8 to 1.2 cm of growing room.'
  },
  {
    question: 'Should I size up when measuring my wrist or ring finger in warm weather?',
    answer:
      'Fingers swell slightly in warm UK indoor rooms or after exercise and shrink when cold. Measure in the evening at room temperature, check that the strip glides comfortably over your knuckle, and add 1.5 cm to your bare wrist measurement for an everyday bracelet fit.'
  }
];

interface RingShoeSizeViewProps {
  onNavigate: (path: RoutePath | string) => void;
  breadcrumb: React.ReactNode;
}

export default function RingShoeSizeView({ onNavigate, breadcrumb }: RingShoeSizeViewProps) {
  const [ringUnit, setRingUnit] = useState<'mm' | 'cm'>('mm');
  const [ringInput, setRingInput] = useState<string>('52.5');
  const [shoeAgeGroup, setShoeAgeGroup] = useState<'child' | 'adult'>('child');
  const [footCmInput, setFootCmInput] = useState<string>('15.2');
  const [wristCmInput, setWristCmInput] = useState<string>('16.5');
  const [copiedKey, setCopiedKey] = useState<string>('');
  const [ringImgErr, setRingImgErr] = useState<boolean>(false);
  const [shoeImgErr, setShoeImgErr] = useState<boolean>(false);

  // 1. Ring Calculation
  const parsedRing = parseFloat(ringInput);
  const circMm = isFinite(parsedRing) && parsedRing > 0 ? (ringUnit === 'cm' ? parsedRing * 10 : parsedRing) : 52.5;
  const closestRing = UK_RING_SIZES.reduce((best, cur) =>
    Math.abs(cur.circMm - circMm) < Math.abs(best.circMm - circMm) ? cur : best
  );
  const ringDiaMm = (circMm / Math.PI).toFixed(2);
  const ringCircCm = (circMm / 10).toFixed(2);
  const ringCircIn = (circMm / 25.4).toFixed(2);

  // 2. UK Shoe Size Calculation
  const parsedFootCm = parseFloat(footCmInput);
  const footCm = isFinite(parsedFootCm) && parsedFootCm > 0 ? parsedFootCm : 15.2;
  const footInches = (footCm / 2.54).toFixed(2);
  const activeShoeTable = shoeAgeGroup === 'child' ? UK_CHILD_SHOES : UK_ADULT_SHOES;
  const closestShoe = activeShoeTable.reduce((best, cur) =>
    Math.abs(cur.cm - footCm) < Math.abs(best.cm - footCm) ? cur : best
  );

  // 3. Wrist Size Calculation
  const parsedWristCm = parseFloat(wristCmInput);
  const wristCm = isFinite(parsedWristCm) && parsedWristCm > 0 ? parsedWristCm : 16.5;
  const wristIn = (wristCm / 2.54).toFixed(2);
  const comfortBraceletCm = (wristCm + 1.5).toFixed(1);
  const looseBraceletCm = (wristCm + 2.5).toFixed(1);
  const watchDialMm = wristCm < 15 ? '32–36 mm' : wristCm < 17 ? '36–40 mm' : wristCm < 19 ? '40–42 mm' : '42–44 mm';
  const wristBand =
    wristCm <= 14
      ? 'XS'
      : wristCm <= 15.5
      ? 'S'
      : wristCm <= 17.0
      ? 'M'
      : wristCm <= 18.5
      ? 'L'
      : wristCm <= 20.0
      ? 'XL'
      : 'XXL';

  const copySummary = (key: string, text: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  return (
    <div className="space-y-6">
      {breadcrumb}

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 md:p-8 space-y-8">
        <div className="border-b border-slate-100 pb-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono flex items-center gap-1.5">
            <CircleDot className="w-4 h-4" />
            <span>UK Jewellery, Wrist &amp; Footwear Sizing</span>
          </p>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Ring, Wrist &amp; UK Shoe Size to CM Converter (Ring Size Chart UK A–Z)
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Convert finger circumference in <strong>mm</strong> or <strong>cm</strong> into official <strong>UK ring sizes (A–Z)</strong>, translate foot length in cm to <strong>UK Child &amp; Adult shoe sizes</strong>, check bracelet &amp; watch dial proportions, and print a home ring sizer strip.
          </p>
        </div>

        {/* 1. Interactive UK Ring Size to CM / MM Converter */}
        <section className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-5" aria-labelledby="ring-calc-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 id="ring-calc-heading" className="text-lg font-black text-slate-900 flex items-center gap-2">
              <CircleDot className="w-5 h-5 text-blue-600 shrink-0" />
              <span>UK Ring Size Converter (MM / CM to A–Z)</span>
            </h2>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
              {(['mm', 'cm'] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => {
                    if (unit === ringUnit) return;
                    const v = parseFloat(ringInput);
                    if (isFinite(v) && v > 0) {
                      setRingInput(unit === 'cm' ? (v / 10).toFixed(2) : (v * 10).toFixed(1));
                    }
                    setRingUnit(unit);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                    ringUnit === unit ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {unit} input
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="ring-circ-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Finger Circumference ({ringUnit})
              </label>
              <input
                id="ring-circ-input"
                type="number"
                step={ringUnit === 'cm' ? '0.05' : '0.1'}
                min="1"
                value={ringInput}
                onChange={(e) => setRingInput(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-lg font-black font-mono text-slate-900 outline-none"
              />
            </div>

            <div>
              <label htmlFor="uk-ring-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Or Pick UK Size (A–Z)
              </label>
              <select
                id="uk-ring-select"
                value={closestRing.uk}
                onChange={(e) => {
                  const found = UK_RING_SIZES.find((r) => r.uk === e.target.value);
                  if (found) {
                    setRingInput(ringUnit === 'cm' ? (found.circMm / 10).toFixed(2) : found.circMm.toFixed(1));
                  }
                }}
                className="w-full bg-white border-2 border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-base font-black text-slate-900 outline-none cursor-pointer"
              >
                {UK_RING_SIZES.map((r) => (
                  <option key={r.uk} value={r.uk}>
                    UK Size {r.uk} ({r.circMm} mm / US {r.us})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() =>
                copySummary(
                  'ring',
                  `UK Ring Size ${closestRing.uk} | Circ: ${circMm.toFixed(1)} mm (${ringCircCm} cm / ${ringCircIn} in) | Dia: ${ringDiaMm} mm | US ${closestRing.us} / EU ${closestRing.eu}`
                )
              }
              className={`min-h-[46px] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
                copiedKey === 'ring' ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copiedKey === 'ring' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'ring' ? 'Copied Ring Size' : 'Copy Ring Result'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 tabular-nums">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-blue-700 font-mono">Closest UK Ring Size</div>
              <div className="text-2xl font-black text-blue-900 font-mono mt-1">Size {closestRing.uk}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">Circumference (CM)</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{ringCircCm} cm</div>
              <div className="text-xs text-slate-500 font-mono">{ringCircIn}&quot; / {circMm.toFixed(1)} mm</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">Inside Diameter</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{ringDiaMm} mm</div>
              <div className="text-xs text-slate-500 font-mono">{(Number(ringDiaMm) / 25.4).toFixed(3)} in</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">US &amp; EU Equivalent</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">US {closestRing.us}</div>
              <div className="text-xs text-slate-500 font-mono">EU {closestRing.eu}</div>
            </div>
          </div>

          {/* Printable Home Ring Sizer Strip */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-black text-slate-900">Printable Ring Sizer Reference Scale (1:1 Print at 100% Scale)</h3>
                <p className="text-xs text-slate-600">When printing, select <strong>Actual Size / 100%</strong> (never &ldquo;Fit to Page&rdquo;) and verify 5.0 cm against a physical ruler.</p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap print:hidden"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Ring Sizer</span>
              </button>
            </div>
            <div className="pb-1">
              <div className="w-[90mm] max-w-full print:max-w-none h-12 bg-amber-50 border-2 border-slate-800 rounded-lg relative select-none">
                <div className="flex justify-between px-1 pt-1 text-[10px] font-mono font-bold text-slate-800">
                  <span>0 cm</span>
                  <span>2.5 cm</span>
                  <span>5.0 cm (J–K)</span>
                  <span>7.0 cm (Z)</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-5 flex justify-between px-[1mm]">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => (
                    <span key={c} className="w-px h-full bg-slate-900 inline-block" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. UK Shoe Size in CM Converter (Child & Adult) */}
        <section className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-5" aria-labelledby="shoe-calc-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 id="shoe-calc-heading" className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Footprints className="w-5 h-5 text-blue-600 shrink-0" />
              <span>UK Shoe Size in CM Converter (Child &amp; Adult)</span>
            </h2>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setShoeAgeGroup('child');
                  if (footCm > 24) setFootCmInput('15.2');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${
                  shoeAgeGroup === 'child' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                UK Child / Kids
              </button>
              <button
                type="button"
                onClick={() => {
                  setShoeAgeGroup('adult');
                  if (footCm < 21) setFootCmInput('25.4');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${
                  shoeAgeGroup === 'adult' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                UK Adult
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="foot-cm-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Heel-to-Toe Foot Length (CM)
              </label>
              <input
                id="foot-cm-input"
                type="number"
                step="0.1"
                min="7"
                max="35"
                value={footCmInput}
                onChange={(e) => setFootCmInput(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-lg font-black font-mono text-slate-900 outline-none"
              />
            </div>

            <div>
              <label htmlFor="uk-shoe-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Or Pick {shoeAgeGroup === 'child' ? 'UK Child Size' : 'UK Adult Size'}
              </label>
              <select
                id="uk-shoe-select"
                value={closestShoe.uk}
                onChange={(e) => {
                  const found = activeShoeTable.find((s) => s.uk === e.target.value);
                  if (found) setFootCmInput(found.cm.toString());
                }}
                className="w-full bg-white border-2 border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-base font-black text-slate-900 outline-none cursor-pointer"
              >
                {activeShoeTable.map((s) => (
                  <option key={s.uk} value={s.uk}>
                    {s.uk} — {s.cm} cm (EU {s.eu})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 tabular-nums">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-blue-700 font-mono">Recommended UK Size</div>
              <div className="text-xl font-black text-blue-900 font-mono mt-1">{closestShoe.uk}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">Length in Inches</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{footInches}&quot;</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">EU Equivalent</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">EU {closestShoe.eu}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">US Equivalent</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{closestShoe.us}</div>
            </div>
          </div>
        </section>

        {/* 3. Wrist Size to CM Converter (Watch Dial & Bracelet Fit) */}
        <section className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-4" aria-labelledby="wrist-calc-heading">
          <h2 id="wrist-calc-heading" className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Watch className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Wrist Size to CM Converter (Bracelet &amp; Watch Case Fit)</span>
          </h2>
          <div className="grid sm:grid-cols-4 gap-3.5 items-end tabular-nums">
            <div>
              <label htmlFor="wrist-cm-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Bare Wrist Size (CM)
              </label>
              <input
                id="wrist-cm-input"
                type="number"
                step="0.1"
                min="10"
                max="26"
                value={wristCmInput}
                onChange={(e) => setWristCmInput(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-lg font-black font-mono text-slate-900 outline-none"
              />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">Wrist in Inches</div>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{wristIn}&quot; (Band {wristBand})</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">Bracelet Length</div>
              <div className="text-lg font-black text-blue-700 font-mono mt-0.5">{comfortBraceletCm}–{looseBraceletCm} cm</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">UK Watch Dial</div>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{watchDialMm}</div>
            </div>
          </div>
        </section>

        {/* How to Measure Ring Size at Home Editorial Guide + Image (< 30 KB WebP) */}
        <section className="space-y-4 text-slate-700 font-sans text-base sm:text-lg leading-relaxed">
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            How to Measure Ring Size at Home (2 Accurate Methods)
          </h2>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {ringImgErr ? (
              <div className="aspect-[4/3] w-full flex flex-col items-center justify-center gap-2 p-6 text-slate-500 bg-slate-100">
                <CircleDot className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Home Paper Strip Ring Circumference Guide</span>
              </div>
            ) : (
              <img
                src="/images/ring-size-measure.webp"
                alt="How to measure ring size at home using a paper circumference strip and metric millimetre ruler"
                width={720}
                height={540}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setRingImgErr(true)}
                className="w-full h-auto aspect-[4/3] object-cover block"
              />
            )}
            <figcaption className="px-4 py-2 text-xs sm:text-sm text-slate-600 border-t border-slate-200 bg-white">
              Wrap a non-stretch paper strip around the base of your finger and measure the marked length in mm or cm against a straight ruler.
            </figcaption>
          </figure>
          <p>
            Knowing <strong>how to measure ring size at home</strong> avoids costly resizing fees when ordering wedding bands or engagement rings online in the UK. Always measure the exact finger and hand you intend to wear the ring on—dominant hands are commonly half to one UK letter larger.
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Paper Strip Circumference Method:</strong> Cut a crisp strip of non-elastic paper around 6 mm wide, wrap it firmly around the base of your finger, mark where the end overlaps, lay it flat along a ruler in <strong>millimetres</strong> or <strong>centimetres</strong>, and enter the reading into the converter above.
            </li>
            <li>
              <strong>Existing Ring Diameter Method:</strong> Lay a well-fitting ring flat over a metric ruler and measure the straight <strong>inside diameter in mm</strong> (excluding the metal band edge), then match against the diameter column in the <strong>Ring Size Chart UK</strong> table below.
            </li>
          </ol>
        </section>

        {/* Complete UK Ring Size Chart (A-Z) - Zero-scroll fixed layout on mobile */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Ring Size Chart UK (Alphabetical Sizes A to Z in MM, CM &amp; Inches)
          </h2>
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full table-fixed text-left tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase font-mono text-[11px] sm:text-xs">
                <tr>
                  <th className="w-[18%] px-2 py-2.5 sm:p-3 border-b border-slate-200">UK</th>
                  <th className="w-[31%] px-2 py-2.5 sm:p-3 border-b border-slate-200">MM / CM</th>
                  <th className="w-[23%] px-2 py-2.5 sm:p-3 border-b border-slate-200">Dia.</th>
                  <th className="w-[28%] px-2 py-2.5 sm:p-3 border-b border-slate-200">US / EU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px] sm:text-sm md:text-base">
                {UK_RING_SIZES.map((r, idx) => (
                  <tr
                    key={r.uk}
                    onClick={() => setRingInput(ringUnit === 'cm' ? (r.circMm / 10).toFixed(2) : r.circMm.toFixed(1))}
                    className={`cursor-pointer transition-colors ${
                      closestRing.uk === r.uk
                        ? 'bg-blue-50'
                        : idx % 2 === 0
                        ? 'bg-white hover:bg-slate-50'
                        : 'bg-slate-50/50 hover:bg-slate-100/70'
                    }`}
                  >
                    <td className="px-2 py-2.5 sm:p-3 font-black text-slate-900 align-top">{`UK ${r.uk}`}</td>
                    <td className="px-2 py-2.5 sm:p-3 align-top">
                      <span className="block font-bold text-blue-700">{`${r.circMm.toFixed(1)} mm`}</span>
                      <span className="block text-[10px] sm:text-xs text-slate-500">{`${(r.circMm / 10).toFixed(2)} cm`}</span>
                    </td>
                    <td className="px-2 py-2.5 sm:p-3 text-slate-700 align-top">{`${r.diaMm.toFixed(2)} mm`}</td>
                    <td className="px-2 py-2.5 sm:p-3 text-slate-600 align-top break-words">{`US ${r.us} / EU ${r.eu}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* UK Child Shoe Size in CM Chart + Image (< 30 KB WebP) */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            UK Shoe Size in CM Child &amp; Toddler Chart (1K to Junior 5)
          </h2>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {shoeImgErr ? (
              <div className="aspect-[4/3] w-full flex flex-col items-center justify-center gap-2 p-6 text-slate-500 bg-slate-100">
                <Footprints className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Child Heel-to-Toe Foot Length Measurement in CM</span>
              </div>
            ) : (
              <img
                src="/images/child-shoe-cm.webp"
                alt="UK children's leather shoes placed beside a foot length measurement chart and centimetre ruler"
                width={720}
                height={540}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setShoeImgErr(true)}
                className="w-full h-auto aspect-[4/3] object-cover block"
              />
            )}
            <figcaption className="px-4 py-2 text-xs sm:text-sm text-slate-600 border-t border-slate-200 bg-white">
              Stand barefoot with heels gently against paper on a flat floor, measure heel-to-longest-toe in cm, and allow 0.8–1.2 cm child growth room.
            </figcaption>
          </figure>
          <p className="text-base text-slate-700 font-sans">
            When shopping for UK school shoes, trainers, or wellies, stand your child barefoot with heels gently touching a wall on paper, mark the longest toe, measure heel-to-toe in <strong>cm</strong>, and check the chart below.
          </p>
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full table-fixed text-left tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase font-mono text-[11px] sm:text-xs">
                <tr>
                  <th className="w-[29%] px-2 py-2.5 sm:p-3 border-b border-slate-200">UK Size</th>
                  <th className="w-[31%] px-2 py-2.5 sm:p-3 border-b border-slate-200">CM / IN</th>
                  <th className="w-[20%] px-2 py-2.5 sm:p-3 border-b border-slate-200">EU</th>
                  <th className="w-[20%] px-2 py-2.5 sm:p-3 border-b border-slate-200">US</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px] sm:text-sm md:text-base">
                {UK_CHILD_SHOES.map((s, idx) => (
                  <tr
                    key={s.uk}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                  >
                    <td className="px-2 py-2.5 sm:p-3 font-black text-slate-900 align-top break-words">{s.uk}</td>
                    <td className="px-2 py-2.5 sm:p-3 align-top">
                      <span className="block font-bold text-blue-700">{`${s.cm.toFixed(1)} cm`}</span>
                      <span className="block text-[10px] sm:text-xs text-slate-500">{`${(s.cm / 2.54).toFixed(2)}"`}</span>
                    </td>
                    <td className="px-2 py-2.5 sm:p-3 text-slate-700 align-top">{`EU ${s.eu}`}</td>
                    <td className="px-2 py-2.5 sm:p-3 text-slate-600 align-top">{s.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-base text-slate-700 pt-2">
            Need general length conversions between centimetres, millimetres, and inches? Use our{' '}
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
        </section>
      </div>

      <FAQSection customFAQs={RING_SHOE_FAQS} />
    </div>
  );
}
