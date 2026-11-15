import React from 'react';

interface UnitChartViewProps {
  breadcrumb: React.ReactNode;
}

const CHART_VALUES_1_TO_1500 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  25, 30, 35, 40, 45, 50, 60, 70, 75, 80,
  90, 100, 120, 140, 150, 160, 170, 180, 190, 200,
  250, 300, 350, 400, 450, 500, 600, 700, 800, 900,
  1000, 1100, 1200, 1300, 1400, 1500
];

const formatFeetAndInchesFromInches = (totalInches: number) => {
  const ft = Math.floor(totalInches / 12);
  const remIn = +(totalInches - ft * 12).toFixed(2);
  return `${ft}' ${remIn}"`;
};

export default function UnitChartView({ breadcrumb }: UnitChartViewProps) {
  const cmToInchTable = CHART_VALUES_1_TO_1500.map((cm) => {
    const inches = cm / 2.54;
    return { cm, in: inches.toFixed(4), ftIn: formatFeetAndInchesFromInches(inches) };
  });

  const inchToCmTable = CHART_VALUES_1_TO_1500.map((inVal) => ({
    inVal,
    cm: (inVal * 2.54).toFixed(2),
    ftIn: formatFeetAndInchesFromInches(inVal)
  }));

  const feetToCmTable = CHART_VALUES_1_TO_1500.map((ft) => ({
    ft,
    inTotal: `${(ft * 12).toLocaleString()} in`,
    cm: (ft * 30.48).toFixed(2)
  }));

  const mmToCmTable = CHART_VALUES_1_TO_1500.map((mm) => ({
    mm,
    cm: (mm / 10).toFixed(2),
    m: (mm / 1000).toFixed(4)
  }));

  const mmToInchesTable = CHART_VALUES_1_TO_1500.map((mm) => {
    const inches = mm / 25.4;
    return { mm, in: inches.toFixed(4), ftIn: formatFeetAndInchesFromInches(inches) };
  });

  const mmToFeetTable = CHART_VALUES_1_TO_1500.map((mm) => {
    const feet = mm / 304.8;
    const inches = mm / 25.4;
    return { mm, ft: feet.toFixed(4), ftIn: formatFeetAndInchesFromInches(inches) };
  });

  const cmToFeetTable = CHART_VALUES_1_TO_1500.map((cm) => {
    const feet = cm / 30.48;
    const inches = cm / 2.54;
    return { cm, ft: feet.toFixed(4), ftIn: formatFeetAndInchesFromInches(inches) };
  });

  const inchesToMmTable = CHART_VALUES_1_TO_1500.map((inVal) => ({
    inVal,
    mm: (inVal * 25.4).toFixed(2),
    cm: (inVal * 2.54).toFixed(2)
  }));

  return (
    <div className="space-y-6">
      {breadcrumb}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-10">
        <div className="border-b border-slate-100 pb-6 space-y-4">
          <span className="text-xs bg-blue-100 text-blue-800 font-black px-3 py-1 rounded-lg font-mono uppercase tracking-widest">
            UNIT CONVERSION MASTER CHART (1 TO 1500)
          </span>
          <h1 className="text-xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight">
            Master Unit Conversion Charts (1 to 1500) – CM, MM, Inches &amp; Feet
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed font-sans">
            Comprehensive UK reference lookup tables from <strong>1 to 1500</strong> for all major linear measurements: CM to Inches, Inches to CM, Feet to CM, MM to CM, MM to Inches, MM to Feet, CM to Feet, and Inches to MM.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {[
              { label: 'CM → Inches (1–1500)', href: '#chart-cm-to-inches' },
              { label: 'Inches → CM (1–1500)', href: '#chart-inches-to-cm' },
              { label: 'Feet → CM (1–1500)', href: '#chart-feet-to-cm' },
              { label: 'MM → CM (1–1500)', href: '#chart-mm-to-cm' },
              { label: 'MM → Inches (1–1500)', href: '#chart-mm-to-inches' },
              { label: 'MM → Feet (1–1500)', href: '#chart-mm-to-feet' },
              { label: 'CM → Feet (1–1500)', href: '#chart-cm-to-feet' },
              { label: 'Inches → MM (1–1500)', href: '#chart-inches-to-mm' }
            ].map((jump) => (
              <a
                key={jump.href}
                href={jump.href}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 text-slate-800 hover:text-white text-sm sm:text-base font-bold transition-colors"
              >
                {jump.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {/* 1. CM to Inches Table */}
          <div id="chart-cm-to-inches" className="space-y-3.5 scroll-mt-24">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                1. Centimeters to Inches Chart (1 to 1500 CM)
              </h2>
              <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg font-mono">
                CM → IN
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="ct-tbl ct-uc">
                <thead>
                  <tr>
                    <th>Centimeters (CM)</th>
                    <th>Inches (IN)</th>
                    <th>Feet &amp; Inches</th>
                  </tr>
                </thead>
                <tbody>
                  {cmToInchTable.map((row) => (
                    <tr key={row.cm}>
                      <td>{row.cm} cm</td>
                      <td className="c-b">{row.in} in</td>
                      <td>{row.ftIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Inches to CM Table */}
          <div id="chart-inches-to-cm" className="space-y-3.5 scroll-mt-24">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                2. Inches to Centimeters Chart (1 to 1500 IN)
              </h2>
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg font-mono">
                IN → CM
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="ct-tbl ct-uc">
                <thead>
                  <tr>
                    <th>Inches (IN)</th>
                    <th>Centimeters (CM)</th>
                    <th>Feet &amp; Inches</th>
                  </tr>
                </thead>
                <tbody>
                  {inchToCmTable.map((row) => (
                    <tr key={row.inVal}>
                      <td>{row.inVal} in</td>
                      <td className="c-g">{row.cm} cm</td>
                      <td>{row.ftIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Feet to CM Table */}
          <div id="chart-feet-to-cm" className="space-y-3.5 scroll-mt-24">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                3. Feet to Centimeters Chart (1 to 1500 FT)
              </h2>
              <span className="text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg font-mono">
                FT → CM
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="ct-tbl ct-uc">
                <thead>
                  <tr>
                    <th>Feet (FT)</th>
                    <th>Total Inches</th>
                    <th>Centimeters (CM)</th>
                  </tr>
                </thead>
                <tbody>
                  {feetToCmTable.map((row) => (
                    <tr key={row.ft}>
                      <td>{row.ft} ft</td>
                      <td>{row.inTotal}</td>
                      <td className="c-i">{row.cm} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. MM to CM Table */}
          <div id="chart-mm-to-cm" className="space-y-3.5 scroll-mt-24">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                4. Millimeters to Centimeters Chart (1 to 1500 MM)
              </h2>
              <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg font-mono">
                MM → CM
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="ct-tbl ct-uc">
                <thead>
                  <tr>
                    <th>Millimeters (MM)</th>
                    <th>Centimeters (CM)</th>
                    <th>Meters (M)</th>
                  </tr>
                </thead>
                <tbody>
                  {mmToCmTable.map((row) => (
                    <tr key={row.mm}>
                      <td>{row.mm} mm</td>
                      <td className="c-b">{row.cm} cm</td>
                      <td>{row.m} m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. MM to Inches Table */}
          <div id="chart-mm-to-inches" className="space-y-3.5 scroll-mt-24">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                5. Millimeters to Inches Chart (1 to 1500 MM)
              </h2>
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg font-mono">
                MM → IN
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="ct-tbl ct-uc">
                <thead>
                  <tr>
                    <th>Millimeters (MM)</th>
                    <th>Inches (IN)</th>
                    <th>Feet &amp; Inches</th>
                  </tr>
                </thead>
                <tbody>
                  {mmToInchesTable.map((row) => (
                    <tr key={row.mm}>
                      <td>{row.mm} mm</td>
                      <td className="c-g">{row.in} in</td>
                      <td>{row.ftIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. MM to Feet Table */}
          <div id="chart-mm-to-feet" className="space-y-3.5 scroll-mt-24">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                6. Millimeters to Feet Chart (1 to 1500 MM)
              </h2>
              <span className="text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg font-mono">
                MM → FT
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="ct-tbl ct-uc">
                <thead>
                  <tr>
                    <th>Millimeters (MM)</th>
                    <th>Feet (FT)</th>
                    <th>Feet &amp; Inches</th>
                  </tr>
                </thead>
                <tbody>
                  {mmToFeetTable.map((row) => (
                    <tr key={row.mm}>
                      <td>{row.mm} mm</td>
                      <td className="c-i">{row.ft} ft</td>
                      <td>{row.ftIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. CM to Feet Table */}
          <div id="chart-cm-to-feet" className="space-y-3.5 scroll-mt-24">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                7. Centimeters to Feet Chart (1 to 1500 CM)
              </h2>
              <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg font-mono">
                CM → FT
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="ct-tbl ct-uc">
                <thead>
                  <tr>
                    <th>Centimeters (CM)</th>
                    <th>Feet (FT)</th>
                    <th>Feet &amp; Inches</th>
                  </tr>
                </thead>
                <tbody>
                  {cmToFeetTable.map((row) => (
                    <tr key={row.cm}>
                      <td>{row.cm} cm</td>
                      <td className="c-b">{row.ft} ft</td>
                      <td>{row.ftIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 8. Inches to MM Table */}
          <div id="chart-inches-to-mm" className="space-y-3.5 scroll-mt-24">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                8. Inches to Millimeters Chart (1 to 1500 IN)
              </h2>
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg font-mono">
                IN → MM
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="ct-tbl ct-uc">
                <thead>
                  <tr>
                    <th>Inches (IN)</th>
                    <th>Millimeters (MM)</th>
                    <th>Centimeters (CM)</th>
                  </tr>
                </thead>
                <tbody>
                  {inchesToMmTable.map((row) => (
                    <tr key={row.inVal}>
                      <td>{row.inVal} in</td>
                      <td className="c-g">{row.mm} mm</td>
                      <td>{row.cm} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Single Homepage Backlink on cm to inches keyword */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-2.5">
          <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
            <span>⚡ Instant Length Conversion Tool</span>
          </h3>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Centimeters, millimeters, inches, and feet are standard linear units used for height, screen sizes, furniture, and architectural measurements (1 inch = 2.54 cm = 25.4 mm, 1 foot = 30.48 cm = 304.8 mm). Need to calculate custom values outside these charts? Use our instant{' '}
            <a href="https://www.cmtoinches.uk/" className="text-blue-600 font-black underline hover:text-blue-800">
              cm to inches
            </a>{' '}
            converter for real-time precision results.
          </p>
        </div>
      </div>
    </div>
  );
}
