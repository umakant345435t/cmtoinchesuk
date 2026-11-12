import React from 'react';
import { RoutePath } from '../types';

interface ConversionTablesProps {
  onSelectValue?: (typeId: string, value: number) => void;
  onNavigate?: (path: RoutePath) => void;
}

export function ConversionTables(_props: ConversionTablesProps) {
  const cmToInRows = [
    { cm: 1, in: 0.3937, fraction: '25/64"' },
    { cm: 2, in: 0.7874, fraction: '25/32"' },
    { cm: 5, in: 1.9685, fraction: '1 31/32"' },
    { cm: 10, in: 3.9370, fraction: '3 15/16"' },
    { cm: 15, in: 5.9055, fraction: '5 29/32"' },
    { cm: 20, in: 7.8740, fraction: '7 7/8"' },
    { cm: 30, in: 11.8110, fraction: '11 13/16"' },
    { cm: 40, in: 15.7480, fraction: '15 3/4"' },
    { cm: 50, in: 19.6850, fraction: '19 11/16"' },
    { cm: 75, in: 29.5276, fraction: '29 17/32"' },
    { cm: 100, in: 39.3701, fraction: '39 3/8"' },
    { cm: 120, in: 47.2441, fraction: '47 1/4"' },
    { cm: 150, in: 59.0551, fraction: '59 1/16"' },
    { cm: 160, in: 62.9921, fraction: '62 31/32"' },
    { cm: 170, in: 66.9291, fraction: '66 15/16"' },
    { cm: 180, in: 70.8661, fraction: '70 7/8"' },
    { cm: 200, in: 78.7402, fraction: '78 3/4"' },
    { cm: 300, in: 118.1102, fraction: '118 7/64"' },
    { cm: 400, in: 157.4803, fraction: '157 15/32"' },
    { cm: 500, in: 196.8504, fraction: '196 27/32"' },
  ];

  const inToCmRows = [
    { in: 0.25, cm: 0.635, fraction: '1/4"' },
    { in: 0.5, cm: 1.270, fraction: '1/2"' },
    { in: 1, cm: 2.540, fraction: '1"' },
    { in: 2, cm: 5.080, fraction: '2"' },
    { in: 3, cm: 7.620, fraction: '3"' },
    { in: 4, cm: 10.160, fraction: '4"' },
    { in: 5, cm: 12.700, fraction: '5"' },
    { in: 6, cm: 15.240, fraction: '6"' },
    { in: 8, cm: 20.320, fraction: '8"' },
    { in: 10, cm: 25.400, fraction: '10"' },
    { in: 12, cm: 30.480, fraction: '12" / 1ft' },
    { in: 18, cm: 45.720, fraction: '18"' },
    { in: 24, cm: 60.960, fraction: '24" / 2ft' },
    { in: 30, cm: 76.200, fraction: '30"' },
    { in: 36, cm: 91.440, fraction: '36" / 3ft' },
    { in: 48, cm: 121.920, fraction: '48" / 4ft' },
    { in: 60, cm: 152.400, fraction: '60" / 5ft' },
    { in: 72, cm: 182.880, fraction: '72" / 6ft' },
  ];

  const feetToCmRows = [
    { ft: 1, inches: '12 in', cm: 30.48 },
    { ft: 1.5, inches: '18 in', cm: 45.72 },
    { ft: 2, inches: '24 in', cm: 60.96 },
    { ft: 2.5, inches: '30 in', cm: 76.20 },
    { ft: 3, inches: '36 in', cm: 91.44 },
    { ft: 3.5, inches: '42 in', cm: 106.68 },
    { ft: 4, inches: '48 in', cm: 121.92 },
    { ft: 4.5, inches: '54 in', cm: 137.16 },
    { ft: 5, inches: '60 in (5\' 0")', cm: 152.40 },
    { ft: 5.25, inches: '63 in (5\' 3")', cm: 160.02 },
    { ft: 5.5, inches: '66 in (5\' 6")', cm: 167.64 },
    { ft: 5.75, inches: '69 in (5\' 9")', cm: 175.26 },
    { ft: 6, inches: '72 in (6\' 0")', cm: 182.88 },
    { ft: 6.25, inches: '75 in (6\' 3")', cm: 190.50 },
    { ft: 6.5, inches: '78 in (6\' 6")', cm: 198.12 },
    { ft: 7, inches: '84 in', cm: 213.36 },
    { ft: 8, inches: '96 in', cm: 243.84 },
    { ft: 10, inches: '120 in', cm: 304.80 },
  ];

  return (
    <div className="w-full space-y-8" id="conversion-tables">
      {/* 1. Centimeters to Inches Table */}
      <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              📏 Centimeters to Inches Conversion Table (1 to 500 cm)
            </h3>
            <p className="text-base text-slate-600 mt-1 font-medium">
              Quick metric to imperial reference for converting centimeters (cm) into decimal and fractional inches (in).
            </p>
          </div>
          <span className="hidden sm:inline-block text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg font-mono shrink-0">
            CM → IN
          </span>
        </div>

        <div className="w-full overflow-hidden">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-xs sm:text-sm">
                <th className="w-1/3 px-3 sm:px-5 py-3.5 border-b border-slate-200">
                  <span className="sm:hidden">CM</span>
                  <span className="hidden sm:inline">Centimeters (cm)</span>
                </th>
                <th className="w-1/3 px-3 sm:px-5 py-3.5 border-b border-slate-200">
                  <span className="sm:hidden">Inches</span>
                  <span className="hidden sm:inline">Inches (Decimal)</span>
                </th>
                <th className="w-1/3 px-3 sm:px-5 py-3.5 border-b border-slate-200">
                  <span className="sm:hidden">Fraction</span>
                  <span className="hidden sm:inline">Inches (Fraction)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              {cmToInRows.map((row, idx) => (
                <tr
                  key={row.cm}
                  className={`transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/60`}
                >
                  <td className="px-3 sm:px-5 py-3 font-bold text-slate-900 text-base truncate">
                    {row.cm} cm
                  </td>
                  <td className="px-3 sm:px-5 py-3 font-bold text-blue-700 text-base truncate">
                    {row.in.toFixed(3)}"
                  </td>
                  <td className="px-3 sm:px-5 py-3 font-mono text-slate-700 font-bold text-base truncate">
                    {row.fraction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Inches to Centimeters Table */}
      <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              📐 Inches to Centimeters Conversion Table (1/4" to 6 ft)
            </h3>
            <p className="text-base text-slate-600 mt-1 font-medium">
              Standard imperial to metric reference chart for converting inches (in) into centimeters (cm).
            </p>
          </div>
          <span className="hidden sm:inline-block text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg font-mono shrink-0">
            IN → CM
          </span>
        </div>

        <div className="w-full overflow-hidden">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-xs sm:text-sm">
                <th className="w-1/3 px-3 sm:px-5 py-3.5 border-b border-slate-200">
                  <span className="sm:hidden">Inches</span>
                  <span className="hidden sm:inline">Inches (in)</span>
                </th>
                <th className="w-1/3 px-3 sm:px-5 py-3.5 border-b border-slate-200">
                  <span className="sm:hidden">Fraction</span>
                  <span className="hidden sm:inline">Fractional / Feet</span>
                </th>
                <th className="w-1/3 px-3 sm:px-5 py-3.5 border-b border-slate-200">
                  <span className="sm:hidden">CM</span>
                  <span className="hidden sm:inline">Centimeters (cm)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              {inToCmRows.map((row, idx) => (
                <tr
                  key={row.in}
                  className={`transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/60`}
                >
                  <td className="px-3 sm:px-5 py-3 font-bold text-slate-900 text-base truncate">
                    {row.in} in
                  </td>
                  <td className="px-3 sm:px-5 py-3 font-mono text-slate-700 font-bold text-base truncate">
                    {row.fraction}
                  </td>
                  <td className="px-3 sm:px-5 py-3 font-bold text-emerald-700 text-base truncate">
                    {row.cm.toFixed(2)} cm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Feet to Centimeters Table */}
      <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              🧍 Feet to Centimeters Conversion Table (1 ft to 10 ft)
            </h3>
            <p className="text-base text-slate-600 mt-1 font-medium">
              Direct height and length conversion chart from imperial feet (ft) and inches into metric centimeters (cm).
            </p>
          </div>
          <span className="hidden sm:inline-block text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg font-mono shrink-0">
            FT → CM
          </span>
        </div>

        <div className="w-full overflow-hidden">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-xs sm:text-sm">
                <th className="w-1/3 px-3 sm:px-5 py-3.5 border-b border-slate-200">
                  <span className="sm:hidden">Feet</span>
                  <span className="hidden sm:inline">Feet (ft)</span>
                </th>
                <th className="w-1/3 px-3 sm:px-5 py-3.5 border-b border-slate-200">
                  <span className="sm:hidden">Inches</span>
                  <span className="hidden sm:inline">Inches Equivalent</span>
                </th>
                <th className="w-1/3 px-3 sm:px-5 py-3.5 border-b border-slate-200">
                  <span className="sm:hidden">CM</span>
                  <span className="hidden sm:inline">Centimeters (cm)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              {feetToCmRows.map((row, idx) => (
                <tr
                  key={row.ft}
                  className={`transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/60`}
                >
                  <td className="px-3 sm:px-5 py-3 font-bold text-slate-900 text-base truncate">
                    {row.ft} ft
                  </td>
                  <td className="px-3 sm:px-5 py-3 font-mono text-slate-700 font-bold text-base truncate">
                    {row.inches}
                  </td>
                  <td className="px-3 sm:px-5 py-3 font-bold text-blue-700 text-base truncate">
                    {row.cm.toFixed(2)} cm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
