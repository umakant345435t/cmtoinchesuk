import React, { useState } from 'react';
import { RoutePath } from '../types';

interface ConversionTablesProps {
  onSelectValue: (typeId: string, value: number) => void;
  onNavigate: (path: RoutePath) => void;
}

export function ConversionTables({ onSelectValue, onNavigate }: ConversionTablesProps) {
  const [activeTab, setActiveTab] = useState<'cm-to-in' | 'in-to-cm' | 'height-references'>('cm-to-in');

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

  const heightsRows = [
    { cm: 140, ftIn: `4' 7"`, status: 'Petite Stature' },
    { cm: 145, ftIn: `4' 9"`, status: 'Petite Stature' },
    { cm: 150, ftIn: `4' 11"`, status: 'Petite / UK Teen' },
    { cm: 155, ftIn: `5' 1"`, status: 'Below Average Female' },
    { cm: 160, ftIn: `5' 3"`, status: 'Average UK Female text-sm font-semibold' },
    { cm: 165, ftIn: `5' 5"`, status: 'Above Average Female' },
    { cm: 170, ftIn: `5' 7"`, status: 'Average UK Stature' },
    { cm: 175, ftIn: `5' 9"`, status: 'Average UK Male' },
    { cm: 180, ftIn: `5' 11"`, status: 'Above Average Male' },
    { cm: 185, ftIn: `6' 1"`, status: 'Tall Stature' },
    { cm: 190, ftIn: `6' 3"`, status: 'Very Tall Stature' },
    { cm: 195, ftIn: `6' 5"`, status: 'Professional Athlete Stature' },
    { cm: 200, ftIn: `6' 6.7"`, status: 'Elite Height Threshold' },
  ];

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden" id="conversion-tables">
      {/* Title & Tabs */}
      <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
        <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">
          📊 High-Traffic Conversion Tables
        </h3>
        <p className="text-lg text-slate-700 mt-2 font-semibold">
          Select a reference tab below. Click any row to automatically load its values into the calculator tool.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-200 bg-slate-100/50 p-2 gap-1.5 flex-col sm:flex-row">
        <button
          onClick={() => setActiveTab('cm-to-in')}
          className={`py-2.5 px-4 text-xs font-black rounded-xl text-center transition-all cursor-pointer ${
            activeTab === 'cm-to-in'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          Centimeters → Inches (1 to 500 cm)
        </button>
        <button
          onClick={() => setActiveTab('in-to-cm')}
          className={`py-2.5 px-4 text-xs font-black rounded-xl text-center transition-all cursor-pointer ${
            activeTab === 'in-to-cm'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          Inches → Centimeters (1/4" to 6ft)
        </button>
        <button
          onClick={() => setActiveTab('height-references')}
          className={`py-2.5 px-4 text-xs font-black rounded-xl text-center transition-all cursor-pointer ${
            activeTab === 'height-references'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          UK Height Guide Milestones
        </button>
      </div>

      {/* Table Area */}
      <div className="p-2 overflow-x-auto">
        {activeTab === 'cm-to-in' && (
          <table className="min-w-full text-xs text-left text-slate-700">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="px-4 py-3 border-b border-slate-200">Value (cm)</th>
                <th className="px-4 py-3 border-b border-slate-200">Inches (Dec)</th>
                <th className="px-4 py-3 border-b border-slate-200">Inches (Fraction)</th>
                <th className="px-4 py-3 border-b border-slate-200 text-right">Quick Presets Tool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cmToInRows.map((row, idx) => (
                <tr 
                  key={row.cm}
                  className={`cursor-pointer transition-all duration-155 group ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/80`}
                  onClick={() => onSelectValue('cm-to-inches', row.cm)}
                >
                  <td className="px-4 py-3 font-bold text-slate-900 font-sans">
                    {row.cm} cm
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-700 font-sans text-sm">
                    {row.in.toFixed(4)}"
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 font-bold">
                    {row.fraction}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="px-3 py-1 bg-white hover:bg-blue-600 hover:text-white border-2 border-slate-200 font-bold hover:border-blue-600 rounded-lg text-[10px] uppercase tracking-wider transition-colors cursor-pointer">
                      Load
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'in-to-cm' && (
          <table className="min-w-full text-xs text-left text-slate-700">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="px-4 py-3 border-b border-slate-200">Value (inches)</th>
                <th className="px-4 py-3 border-b border-slate-200">Inches (Fractional Label)</th>
                <th className="px-4 py-3 border-b border-slate-200">Value (cm)</th>
                <th className="px-4 py-3 border-b border-slate-200 text-right">Quick Presets Tool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {inToCmRows.map((row, idx) => (
                <tr 
                  key={row.in}
                  className={`cursor-pointer transition-all duration-155 group ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/80`}
                  onClick={() => onSelectValue('inches-to-cm', row.in)}
                >
                  <td className="px-4 py-3 font-bold text-slate-900 font-sans">
                    {row.in} in
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 font-bold">
                    {row.fraction}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-700 text-sm">
                    {row.cm.toFixed(3)} cm
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="px-3 py-1 bg-white hover:bg-blue-600 hover:text-white border-2 border-slate-200 font-bold hover:border-blue-600 rounded-lg text-[10px] uppercase tracking-wider transition-colors cursor-pointer">
                      Load
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'height-references' && (
          <table className="min-w-full text-xs text-left text-slate-700">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="px-4 py-3 border-b border-slate-200">Stature Metric (cm)</th>
                <th className="px-4 py-3 border-b border-slate-200">Stature Imperial (ft ' in")</th>
                <th className="px-4 py-3 border-b border-slate-200">UK Visual Profile Guidance</th>
                <th className="px-4 py-3 border-b border-slate-200 text-right">Instant Route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {heightsRows.map((row, idx) => (
                <tr 
                  key={row.cm}
                  className={`cursor-pointer transition-all duration-155 group ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/80`}
                  onClick={() => {
                    const mappedPath: RoutePath = row.cm === 150 ? '/150-cm-to-inches/' : row.cm === 170 ? '/170-cm-to-inches/' : row.cm === 180 ? '/180-cm-to-inches/' : row.cm === 200 ? '/200-cm-to-inches/' : '/';
                    if (mappedPath !== '/') {
                      onNavigate(mappedPath);
                    } else {
                      onSelectValue('cm-to-inches', row.cm);
                    }
                  }}
                >
                  <td className="px-4 py-3 font-bold text-slate-900 font-sans">
                    {row.cm} cm
                  </td>
                  <td className="px-4 py-3 font-black text-blue-600 text-sm">
                    {row.ftIn}
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-bold">
                    {row.status}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="px-3 py-1 bg-white hover:bg-blue-600 hover:text-white border-2 border-slate-200 font-bold hover:border-blue-600 rounded-lg text-[10px] uppercase tracking-wider transition-colors cursor-pointer">
                      {row.cm === 150 || row.cm === 170 || row.cm === 180 || row.cm === 200 ? 'Go to Page' : 'Load'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Footer warning */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        UK Metrological Standards Agreement Registered
      </div>
    </div>
  );
}
