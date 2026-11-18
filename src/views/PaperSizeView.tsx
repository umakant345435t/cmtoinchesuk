import React, { useState } from 'react';
import { FAQSection } from '../components/FAQSection';
import { FileText, Copy, Check, ArrowLeftRight } from 'lucide-react';
import { RoutePath } from '../types';

interface PaperSizeRow {
  code: string;
  mmW: number;
  mmH: number;
  useCase: string;
}

// Complete ISO 216 A-Series & extended A11-A15 standards (rounded to nearest mm per ISO 216 halving progression)
const ISO_A_SIZES: PaperSizeRow[] = [
  { code: 'A0', mmW: 841, mmH: 1189, useCase: 'Architectural blueprints, exhibition posters, CAD plots' },
  { code: 'A1', mmW: 594, mmH: 841, useCase: 'Technical drawings, UK flipcharts, large shop posters' },
  { code: 'A2', mmW: 420, mmH: 594, useCase: 'Medium wall posters, studio photography prints, calendars' },
  { code: 'A3', mmW: 297, mmH: 420, useCase: 'Double-A4 spreads, UK ledger sheets, menus, art prints' },
  { code: 'A4', mmW: 210, mmH: 297, useCase: 'Standard UK office paper, letters, CVs, school worksheets' },
  { code: 'A5', mmW: 148, mmH: 210, useCase: 'Notebooks, paperback books, NHS leaflets, A5 flyers' },
  { code: 'A6', mmW: 105, mmH: 148, useCase: 'Standard UK postcards, C6 envelopes, greeting cards' },
  { code: 'A7', mmW: 74, mmH: 105, useCase: 'Pocket jotters, event passes, luggage tags' },
  { code: 'A8', mmW: 52, mmH: 74, useCase: 'ISO business cards, playing cards, retail swing tags' },
  { code: 'A9', mmW: 37, mmH: 52, useCase: 'Small product stickers, pharmaceutical labels, stamps' },
  { code: 'A10', mmW: 26, mmH: 37, useCase: 'Tiny asset decals, postage stamps, micro barcodes' },
  { code: 'A11', mmW: 18, mmH: 26, useCase: 'Miniature serial tags, jewellery price stickers' },
  { code: 'A12', mmW: 13, mmH: 18, useCase: 'PCB QR labels, watchmaker component compartments' },
  { code: 'A13', mmW: 9, mmH: 13, useCase: 'Micro-specimen index slips, electronics ID marks' },
  { code: 'A14', mmW: 6, mmH: 9, useCase: 'Theoretical ISO sub-series micro grid reference' },
  { code: 'A15', mmW: 4, mmH: 6, useCase: 'Theoretical ISO A15 minimum optical tolerance stamp' }
];

const PAPER_SIZE_FAQS = [
  {
    question: 'What is A4 size in inches, cm, and mm?',
    answer:
      'A standard A4 sheet measures 8.27 × 11.69 inches (21.0 × 29.7 cm or 210 × 297 mm). It is the everyday UK office printing size and is slightly narrower and taller than US Letter (8.5 × 11 inches).'
  },
  {
    question: 'What are A1, A2, and A3 sizes in inches?',
    answer:
      'A1 size in inches is 23.39 × 33.11 in (59.4 × 84.1 cm), A2 size in inches is 16.54 × 23.39 in (42.0 × 59.4 cm), and A3 size in inches is 11.69 × 16.54 in (29.7 × 42.0 cm). Each step up doubles the surface area.'
  },
  {
    question: 'How are paper sizes from A0 to A15 calculated?',
    answer:
      'The ISO 216 A-series starts at A0 with an area of 1 square metre (841 × 1189 mm) and maintains an aspect ratio of 1 : √2 (1 : 1.4142). Halving the long edge produces the next size down—from A1 and A4 all the way to A15 (4 × 6 mm / 0.16 × 0.24 in).'
  },
  {
    question: 'What is the pixel size of A4 and A3 at 300 DPI for UK printing?',
    answer:
      'At 300 DPI commercial print resolution, A4 equals 2480 × 3508 pixels and A3 equals 3508 × 4961 pixels (or 2551 × 3579 px with standard 3 mm bleed on all four edges).'
  }
];

interface PaperSizeViewProps {
  onNavigate: (path: RoutePath | string) => void;
  breadcrumb: React.ReactNode;
}

export default function PaperSizeView({ onNavigate, breadcrumb }: PaperSizeViewProps) {
  const [selectedCode, setSelectedCode] = useState<string>('A4');
  const [landscape, setLandscape] = useState<boolean>(false);
  const [dpi, setDpi] = useState<number>(300);
  const [copied, setCopied] = useState<boolean>(false);
  const [imgFailed, setImgFailed] = useState<boolean>(false);
  const [frameImgFailed, setFrameImgFailed] = useState<boolean>(false);

  const row = ISO_A_SIZES.find((r) => r.code === selectedCode) || ISO_A_SIZES[4];
  const wMm = landscape ? row.mmH : row.mmW;
  const hMm = landscape ? row.mmW : row.mmH;
  const wCm = (wMm / 10).toFixed(1);
  const hCm = (hMm / 10).toFixed(1);
  const wIn = (wMm / 25.4).toFixed(2);
  const hIn = (hMm / 25.4).toFixed(2);
  const wPx = Math.round((wMm / 25.4) * dpi);
  const hPx = Math.round((hMm / 25.4) * dpi);

  const handleCopyDimensions = () => {
    const summary = `${row.code} (${landscape ? 'Landscape' : 'Portrait'}): ${wIn}" × ${hIn}" | ${wCm} × ${hCm} cm | ${wMm} × ${hMm} mm (${wPx} × ${hPx} px @ ${dpi} DPI)`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(summary).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {breadcrumb}

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 md:p-8 space-y-8">
        <div className="border-b border-slate-100 pb-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            <span>ISO 216 Paper Dimensions &amp; Inch Converter (A0 – A15)</span>
          </p>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Paper Size Converter: A4, A3, A2, A1 &amp; A0–A15 in Inches, CM &amp; MM
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Check exact paper dimensions in inches, centimetres, millimetres, and print pixels for every ISO A-series format from <strong>A0 down to A15</strong>—including <strong>A4 size in inches (8.27&quot; × 11.69&quot;)</strong>, <strong>A3</strong>, <strong>A2</strong>, and <strong>A1</strong>.
          </p>
        </div>

        {/* Visual ISO Paper Scale Reference Image (< 40 KB WebP) */}
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          {imgFailed ? (
            <div className="aspect-[4/3] w-full flex flex-col items-center justify-center gap-2 p-6 text-slate-500 bg-slate-100">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-semibold text-slate-700">ISO A3, A4, A5 &amp; A6 Proportional Scale Comparison</span>
            </div>
          ) : (
            <img
              src="/images/iso-paper-sizes.webp"
              alt="ISO A3, A4, A5, and A6 archival paper sheets aligned corner to corner beside a stainless steel cm and inch ruler"
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-auto aspect-[4/3] object-cover block"
            />
          )}
          <figcaption className="px-4 py-2.5 text-xs sm:text-sm text-slate-600 border-t border-slate-200 bg-white">
            Visual ISO 216 comparison showing how each paper step halves cleanly from A3 (11.69&quot; × 16.54&quot;) through A4 (8.27&quot; × 11.69&quot;), A5, and A6.
          </figcaption>
        </figure>

        {/* Interactive Paper Size Converter */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="paper-size-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Select Page Size (A0 – A15)
              </label>
              <select
                id="paper-size-select"
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-black text-slate-900 focus:border-blue-600 outline-none cursor-pointer"
              >
                {ISO_A_SIZES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {`${s.code} (${(s.mmW / 25.4).toFixed(2)}" × ${(s.mmH / 25.4).toFixed(2)}")`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Orientation
              </label>
              <button
                type="button"
                onClick={() => setLandscape((prev) => !prev)}
                className="w-full bg-white border-2 border-slate-200 hover:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 flex items-center justify-between cursor-pointer whitespace-nowrap"
              >
                <span>{landscape ? 'Landscape (Wide)' : 'Portrait (Tall)'}</span>
                <ArrowLeftRight className="w-4 h-4 text-blue-600 shrink-0" />
              </button>
            </div>

            <div>
              <label htmlFor="paper-dpi-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Print Resolution (DPI)
              </label>
              <select
                id="paper-dpi-select"
                value={dpi}
                onChange={(e) => setDpi(Number(e.target.value))}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-black text-slate-900 focus:border-blue-600 outline-none cursor-pointer"
              >
                <option value={72}>72 DPI (Screen Web)</option>
                <option value={150}>150 DPI (Office Draft)</option>
                <option value={300}>300 DPI (UK Print Standard)</option>
                <option value={600}>600 DPI (Fine Photography)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 tabular-nums">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 sm:p-4">
              <div className="text-xs font-bold uppercase text-blue-700 font-mono">{`${row.code} Size in Inches`}</div>
              <div className="text-base sm:text-xl font-black text-blue-900 font-mono mt-1">
                {`${wIn}" × ${hIn}"`}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">Centimeters (CM)</div>
              <div className="text-base sm:text-xl font-black text-slate-900 font-mono mt-1">
                {`${wCm} × ${hCm} cm`}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">Millimeters (MM)</div>
              <div className="text-base sm:text-xl font-black text-slate-900 font-mono mt-1">
                {`${wMm} × ${hMm} mm`}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4">
              <div className="text-xs font-bold uppercase text-slate-500 font-mono">{`Pixels (${dpi} DPI)`}</div>
              <div className="text-base sm:text-xl font-black text-slate-900 font-mono mt-1">
                {`${wPx} × ${hPx} px`}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-sm text-slate-700">
              <strong>Common UK Use:</strong> {row.useCase}
            </p>
            <button
              type="button"
              onClick={handleCopyDimensions}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
                copied ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : `Copy ${row.code} Dimensions`}</span>
            </button>
          </div>
        </div>

        {/* Complete A0 to A15 Paper Size Chart (Fixed zero-scroll responsive mobile table) */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            All Paper Sizes A0 to A15 in Inches, CM, MM &amp; Pixels
          </h2>
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full table-fixed text-left tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase font-mono text-[11px] sm:text-xs">
                <tr>
                  <th className="w-[14%] px-2 py-2.5 sm:p-3 border-b border-slate-200">Size</th>
                  <th className="w-[30%] px-2 py-2.5 sm:p-3 border-b border-slate-200">Inches</th>
                  <th className="w-[32%] px-2 py-2.5 sm:p-3 border-b border-slate-200">CM / MM</th>
                  <th className="w-[24%] px-2 py-2.5 sm:p-3 border-b border-slate-200">300 DPI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px] sm:text-sm md:text-base">
                {ISO_A_SIZES.map((s, idx) => {
                  const inW = (s.mmW / 25.4).toFixed(2);
                  const inH = (s.mmH / 25.4).toFixed(2);
                  const pxW = Math.round((s.mmW / 25.4) * 300);
                  const pxH = Math.round((s.mmH / 25.4) * 300);
                  return (
                    <tr
                      key={s.code}
                      onClick={() => setSelectedCode(s.code)}
                      className={`cursor-pointer transition-colors ${
                        selectedCode === s.code
                          ? 'bg-blue-50'
                          : idx % 2 === 0
                          ? 'bg-white hover:bg-slate-50'
                          : 'bg-slate-50/50 hover:bg-slate-100/70'
                      }`}
                    >
                      <td className="px-2 py-2.5 sm:p-3 font-black text-slate-900 align-top">{s.code}</td>
                      <td className="px-2 py-2.5 sm:p-3 font-bold text-blue-700 align-top break-words">{`${inW}"×${inH}"`}</td>
                      <td className="px-2 py-2.5 sm:p-3 text-slate-800 align-top">
                        <span className="block font-semibold">{`${(s.mmW / 10).toFixed(1)}×${(s.mmH / 10).toFixed(1)} cm`}</span>
                        <span className="block text-[10px] sm:text-xs text-slate-500">{`${s.mmW}×${s.mmH} mm`}</span>
                      </td>
                      <td className="px-2 py-2.5 sm:p-3 text-slate-600 align-top break-words">{`${pxW}×${pxH}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dedicated Practical Guide & Advanced ISO 216 Engineering Article Section */}
        <article className="space-y-6 text-slate-700 font-sans text-base sm:text-lg leading-relaxed border-t border-slate-100 pt-6">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              A4 Size in Inches (8.27 × 11.69 Inches) &amp; ISO 216 Halving Geometry
            </h2>
            <p>
              <strong>A4 size in inches</strong> is exactly <strong>8.27 × 11.69 in</strong> (derived from <strong>210 × 297 mm</strong> divided by 25.4). Every ISO 216 sheet obeys the <strong>Lichtenberg 1 : √2 aspect ratio</strong> (1 : 1.4142), anchored to <strong>A0 = 1 square metre</strong> (33.11&quot; × 46.81&quot;). Because √2 halves cleanly along the longer side without changing proportions, a UK designer can scale artwork from A4 to A3 (141.4%) or down to A5 (70.7%) with zero cropping or wasted trim.
            </p>
          </div>

          {/* Article Infographic Blueprint + Studio Envelope/Frame WebP Visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <figure className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
              <div className="p-4 bg-white flex-1 flex items-center justify-center">
                <svg
                  viewBox="0 0 360 250"
                  className="w-full h-auto"
                  role="img"
                  aria-label="ISO 216 1 to square root 2 halving ratio blueprint showing A0 through A6 sheet nesting"
                >
                  <rect x="14" y="14" width="332" height="222" rx="6" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2.5" />
                  <text x="96" y="130" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e3a8a" fontFamily="monospace">
                    A1
                  </text>
                  <text x="96" y="148" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontFamily="monospace">
                    23.39&quot; × 33.11&quot;
                  </text>

                  <line x1="180" y1="14" x2="180" y2="236" stroke="#1d4ed8" strokeWidth="2" />
                  <rect x="180" y="14" width="166" height="111" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                  <text x="263" y="68" textAnchor="middle" fontSize="20" fontWeight="900" fill="#065f46" fontFamily="monospace">
                    A2
                  </text>
                  <text x="263" y="85" textAnchor="middle" fontSize="9" fill="#047857" fontFamily="monospace">
                    16.54&quot; × 23.39&quot;
                  </text>

                  <rect x="180" y="125" width="83" height="111" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                  <text x="221" y="178" textAnchor="middle" fontSize="16" fontWeight="900" fill="#92400e" fontFamily="monospace">
                    A3
                  </text>
                  <text x="221" y="194" textAnchor="middle" fontSize="8" fill="#b45309" fontFamily="monospace">
                    11.69&quot;×16.54&quot;
                  </text>

                  <rect x="263" y="125" width="83" height="55.5" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
                  <text x="304" y="153" textAnchor="middle" fontSize="13" fontWeight="900" fill="#312e81" fontFamily="monospace">
                    A4
                  </text>
                  <text x="304" y="167" textAnchor="middle" fontSize="7.5" fill="#3730a3" fontFamily="monospace">
                    8.27&quot;×11.69&quot;
                  </text>

                  <rect x="263" y="180.5" width="41.5" height="55.5" fill="#fce7f3" stroke="#be185d" strokeWidth="1.8" />
                  <text x="283" y="212" textAnchor="middle" fontSize="11" fontWeight="900" fill="#831843" fontFamily="monospace">
                    A5
                  </text>

                  <rect x="304.5" y="180.5" width="41.5" height="27.7" fill="#f1f5f9" stroke="#334155" strokeWidth="1.5" />
                  <text x="325" y="198" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#0f172a" fontFamily="monospace">
                    A6
                  </text>

                  <rect x="304.5" y="208.2" width="20.7" height="27.8" fill="#ffffff" stroke="#64748b" strokeWidth="1.2" />
                  <text x="315" y="225" textAnchor="middle" fontSize="7" fontWeight="800" fill="#475569" fontFamily="monospace">
                    A7
                  </text>
                </svg>
              </div>
              <figcaption className="p-4 bg-white border-t border-slate-200 space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  Infographic • ISO 216 1 : √2 Halving Ratio
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Halving any A-series long edge produces the next size down with identical 1 : 1.4142 proportions—cutting two A4 sheets cleanly from one A3 press sheet.
                </p>
              </figcaption>
            </figure>

            <figure className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
              {frameImgFailed ? (
                <div className="aspect-[4/3] w-full flex items-center justify-center p-6 bg-slate-100 text-slate-600 text-sm font-semibold">
                  UK A4 Sheet, C4/C5 Envelopes &amp; Picture Frame Clearance
                </div>
              ) : (
                <img
                  src="/images/paper-frame-guide.webp"
                  alt="Printed A4 sheet next to matching C4 kraft flat envelope, C5 folded envelope, timber picture frame, and metal metric ruler"
                  width={760}
                  height={567}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setFrameImgFailed(true)}
                  className="w-full h-auto aspect-[4/3] object-cover block"
                />
              )}
              <figcaption className="p-4 bg-white border-t border-slate-200 space-y-1 flex-1">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  UK Print &amp; Envelope Fit • A4 vs C4 / C5 &amp; Frames
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Match unfolded A4 documents to a C4 envelope (229 × 324 mm / 9.02&quot; × 12.76&quot;) or single-folded A4 letters to a C5 pocket (6.38&quot; × 9.02&quot;).
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              A3, A2 &amp; A1 Sizes in Inches for UK Posters &amp; Picture Frames
            </h2>
            <p>
              <strong>A3 size in inches</strong> measures <strong>11.69 × 16.54 in</strong> (<strong>29.7 × 42.0 cm</strong>), making it the natural two-up layout for UK menus, technical schematics, and inkjet proofing. Stepping up, <strong>A2 size in inches</strong> is <strong>16.54 × 23.39 in</strong> (<strong>42.0 × 59.4 cm</strong>) for exhibition fine-art prints, while <strong>A1 size in inches</strong> reaches <strong>23.39 × 33.11 in</strong> (<strong>59.4 × 84.1 cm</strong>) for architectural elevations and high-street retail boards. Always double-check North American frames labelled 8.5×11&quot; (US Letter) or 11×17&quot; (Tabloid), as they trim the extra height of A4 and A3 sheets.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Print Bleed, Royal Mail Envelopes &amp; 300 DPI Prepress Specs
            </h2>
            <p>
              Commercial litho and digital presses in the UK require a <strong>3 mm (0.12&quot;) trim bleed</strong> beyond the finished trim box so edge-to-edge colour reaches the guillotine line cleanly. At <strong>300 DPI</strong>, an unbled A4 canvas measures <strong>2480 × 3508 px</strong> (expanding to <strong>2551 × 3579 px</strong> with 3 mm bleed), while A5 postcards sit at <strong>1748 × 2480 px</strong> and slip straight into C6 envelopes (4.49&quot; × 6.38&quot;) within standard Royal Mail Letter thickness limits.
            </p>
          </div>

          <p className="text-base text-slate-700 pt-1">
            Need custom decimal or 1/16&quot; inch conversions? Return to our{' '}
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

      <FAQSection customFAQs={PAPER_SIZE_FAQS} />
    </div>
  );
}
