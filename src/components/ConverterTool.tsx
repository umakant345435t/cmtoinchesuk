import React, { useState, useEffect } from 'react';
import { CONVERSION_TYPES } from '../data/conversions';
import { ConversionType, RoutePath } from '../types';
import { Copy, Check, Info, RefreshCw, Ruler, HelpCircle, FileCheck, ChevronDown } from 'lucide-react';

interface ConverterToolProps {
  initialTypeId?: string;
  initialFromValue?: number;
  onNavigate?: (path: RoutePath) => void;
}

export function ConverterTool({ initialTypeId = 'cm-to-inches', initialFromValue, onNavigate }: ConverterToolProps) {
  const [selectedTypeId, setSelectedTypeId] = useState<string>(initialTypeId);
  const [inputValue, setInputValue] = useState<string>(
    initialFromValue !== undefined ? initialFromValue.toString() : '10'
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Sync state if initial props change
  useEffect(() => {
    setSelectedTypeId(initialTypeId);
    if (initialFromValue !== undefined) {
      setInputValue(initialFromValue.toString());
    }
  }, [initialTypeId, initialFromValue]);

  const currentType = CONVERSION_TYPES.find((t) => t.id === selectedTypeId) || CONVERSION_TYPES[0];

  // Calculate Result
  const numInput = parseFloat(inputValue) || 0;
  const rawResult = numInput * currentType.ratio;
  const formattedResult = numInput === 0 ? '0' : rawResult.toFixed(4);

  // Additional outputs: fractional conversion for carpenter usage
  const getFractionalEstimate = (decimalInches: number): string => {
    if (decimalInches <= 0) return '0 in';
    const wholeInches = Math.floor(decimalInches);
    const remainder = decimalInches - wholeInches;
    
    // Nearest 16th of an inch
    const sixteenths = Math.round(remainder * 16);
    if (sixteenths === 0) return `${wholeInches} in`;
    if (sixteenths === 16) return `${wholeInches + 1} in`;
    
    // Simplify fraction
    let num = sixteenths;
    let denom = 16;
    if (num % 8 === 0) { num /= 8; denom /= 8; }
    else if (num % 4 === 0) { num /= 4; denom /= 4; }
    else if (num % 2 === 0) { num /= 2; denom /= 2; }

    return wholeInches === 0 ? `${num}/${denom} in` : `${wholeInches} ${num}/${denom} in`;
  };

  // Additional outputs: height formatting (feet ' inches") if cm or inches output
  const getImperialHeight = (): string | null => {
    if (currentType.id === 'cm-to-inches' || currentType.id === 'cm-to-feet') {
      const totalInches = numInput / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inchesValue = (totalInches % 12).toFixed(1);
      return `${feet}' ${inchesValue}"`;
    }
    if (currentType.id === 'inches-to-cm') {
      const feet = Math.floor(numInput / 12);
      const inchesValue = (numInput % 12).toFixed(1);
      return `${feet}' ${inchesValue}"`;
    }
    return null;
  };

  const handleCopy = () => {
    const textToCopy = `${inputValue} ${currentType.fromUnit} = ${formattedResult} ${currentType.toUnit}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapUnits = () => {
    let nextId = 'cm-to-inches';
    if (selectedTypeId === 'cm-to-inches') nextId = 'inches-to-cm';
    else if (selectedTypeId === 'inches-to-cm') nextId = 'cm-to-inches';
    else if (selectedTypeId === 'feet-to-cm') nextId = 'cm-to-feet';
    else if (selectedTypeId === 'cm-to-feet') nextId = 'feet-to-cm';
    else if (selectedTypeId === 'meters-to-feet') nextId = 'feet-to-meters';
    else if (selectedTypeId === 'feet-to-meters') nextId = 'meters-to-feet';
    else if (selectedTypeId === 'mm-to-inches') nextId = 'inches-to-mm';
    else if (selectedTypeId === 'inches-to-mm') nextId = 'mm-to-inches';
    
    setSelectedTypeId(nextId);
    // Convert current value so it translates logically
    const reverseType = CONVERSION_TYPES.find(t => t.id === nextId);
    if (reverseType && numInput > 0) {
      const converted = (numInput * currentType.ratio).toFixed(2);
      setInputValue(converted);
    }
  };

  // Switch conversion helper
  const handleTypeChange = (id: string) => {
    setSelectedTypeId(id);
    if (onNavigate) {
      // Map to standard SEO URLs
      if (id === 'cm-to-inches') onNavigate('/cm-to-inches/');
      else if (id === 'inches-to-cm') onNavigate('/inches-to-cm/');
      else if (id === 'feet-to-cm') onNavigate('/feet-to-cm/');
      else if (id === 'cm-to-feet') onNavigate('/cm-to-feet/');
      else if (id === 'meters-to-feet') onNavigate('/meters-to-feet/');
      else if (id === 'feet-to-meters') onNavigate('/feet-to-meters/');
      else if (id === 'mm-to-inches') onNavigate('/mm-to-inches/');
      else if (id === 'inches-to-mm') onNavigate('/inches-to-mm/');
    }
  };

  // Generate ticks for the graphical ruler comparison
  const renderRulerTickMarks = () => {
    const ticks = [];
    const maxVal = 12; // 12 marks
    for (let i = 0; i <= maxVal; i++) {
      ticks.push(
        <div key={i} className="flex flex-col items-center flex-1">
          <div className={`w-0.5 bg-slate-400 ${i % 4 === 0 ? 'h-5 bg-slate-700' : i % 2 === 0 ? 'h-3' : 'h-2'}`}></div>
          <span className="text-[9px] text-slate-500 font-mono mt-1">{i}</span>
        </div>
      );
    }
    return ticks;
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden" id="converter-tool">
      {/* Header card banner */}
      <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-blue-100 text-blue-800 font-black px-2.5 py-1 rounded-md font-mono uppercase tracking-wider">
            Calculator Mode
          </span>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
            UK Calibration Engine
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Instant Translate
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Unit Selector Dropdown */}
        <div className="bg-slate-50/70 p-4 border border-slate-200/80 rounded-2xl">
          <label htmlFor="conversion-mode-select" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
            Active Conversion Mode:
          </label>
          <div className="relative">
            <select
              id="conversion-mode-select"
              value={selectedTypeId}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 text-slate-900 py-3.5 px-4 pr-10 rounded-xl text-sm font-black shadow-sm transition-all hover:border-blue-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none cursor-pointer appearance-none"
            >
              {CONVERSION_TYPES.map((type) => (
                <option key={type.id} value={type.id} className="font-bold text-slate-800">
                  {type.fromUnit.toUpperCase()} → {type.toUnit.toUpperCase()} ({type.label})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-slate-500 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Input & Output Double-Panel layout */}
        <div className="grid md:grid-cols-9 gap-6 items-center">
          {/* Input Panel */}
          <div className="md:col-span-4 flex flex-col">
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
              Centimeters / {currentType.fromUnit.toUpperCase()} input
            </label>
            <div className="relative">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="w-full text-3xl font-black bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 focus:border-blue-500 focus:bg-white outline-none transition-all font-sans [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                id="converter-input"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 bg-slate-200/50 px-2.5 py-1 rounded-md uppercase font-mono">
                {currentType.fromUnit}
              </span>
            </div>
          </div>

          {/* Swap Button Column */}
          <div className="md:col-span-1 flex justify-center">
            <button
              onClick={swapUnits}
              title="Reverse direction"
              className="bg-blue-50 text-blue-600 border-2 border-blue-100 hover:bg-blue-100 hover:text-blue-700 p-3.5 rounded-full transition-all active:rotate-180 hover:scale-105 shadow-md shadow-blue-50 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Output Panel */}
          <div className="md:col-span-4 flex flex-col">
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
              Inches / {currentType.toUnit.toUpperCase()} output
            </label>
            <div className="w-full text-3xl font-black bg-blue-50 border-2 border-blue-100 text-blue-700 rounded-2xl px-5 py-4 flex items-center justify-between gap-3 min-h-[72px]">
              <span className="font-sans truncate" id="converter-result">
                {formattedResult}
              </span>
              <span className="text-sm font-black text-blue-400 bg-blue-200/30 px-2.5 py-1 rounded-md uppercase font-mono shrink-0">
                {currentType.toUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Copy Result & Formula Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2 border-t border-slate-100">
          <p className="text-sm font-semibold text-slate-400">
            Formula: <span className="text-slate-600 font-mono italic">{currentType.formula}</span>
          </p>
          <button
            onClick={handleCopy}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            title="Copy conversion text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300 stroke-[3]" /> : <Copy className="w-4 h-4" />}
            {copied ? 'CONVERSION COPIED!' : 'COPY RESULT'}
          </button>
        </div>

        {/* Multi-Format Information Cards (Great for UK DIY Trades & Height) */}
        {numInput > 0 && (
          <div className="grid sm:grid-cols-2 gap-4 p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 text-xs">
            <div>
              <h4 className="font-black text-slate-900 flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
                <FileCheck className="w-4 h-4 text-blue-600" />
                Fractional Equivalent (UK Carpentry)
              </h4>
              <p className="text-slate-600 text-sm font-black mt-0.5">
                {currentType.toUnit === 'in' ? (
                  <><strong>{getFractionalEstimate(rawResult)}</strong> (Nearest 1/16")</>
                ) : currentType.fromUnit === 'in' ? (
                  <>Input is precisely <strong>{getFractionalEstimate(numInput)}</strong></>
                ) : (
                  <>Applied on imperial outputs</>
                )}
              </p>
            </div>
            <div>
              <h4 className="font-black text-slate-900 flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
                <Info className="w-4 h-4 text-slate-500" />
                Formula Expression
              </h4>
              <p className="font-mono text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200 leading-normal">
                {inputValue} {currentType.fromUnit} * {currentType.ratio.toFixed(5)} = <strong>{formattedResult}</strong> {currentType.toUnit}
              </p>
            </div>
          </div>
        )}

        {/* Interactive Tape Measure Ruler Simulator */}
        <div className="border-2 border-slate-200 rounded-2xl p-5 bg-amber-500/5">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-black text-xs text-slate-700 uppercase tracking-widest flex items-center gap-1">
              📏 Real-Time Dual Tape Ruler Simulator
            </h4>
            <span className="text-[10px] font-mono text-amber-600 font-extrabold bg-amber-100 px-2 py-0.5 rounded-full uppercase">
              Compare Zoom
            </span>
          </div>
          
          <div className="space-y-4 pt-1">
            {/* Centimeters Scale */}
            <div className="space-y-1">
              <div className="relative h-12 w-full bg-amber-50 border-2 border-amber-200 rounded-xl flex overflow-hidden items-end">
                {renderRulerTickMarks()}
                {/* Pointer indicator based on input percentage */}
                <div 
                  className="absolute bottom-0 h-full w-0.5 bg-red-600 transition-all duration-300"
                  style={{ left: `${Math.min(100, Math.max(0, (numInput / 10) * 100))}%` }}
                >
                  <div className="absolute top-0 -translate-x-1/2 -translate-y-full bg-red-600 text-[10px] font-mono font-black text-white px-2 py-0.5 rounded-md shadow">
                    {numInput.toFixed(1)} {currentType.fromUnit}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-right font-black uppercase tracking-wider pr-1">Centimeters Side Gauge</p>
            </div>

            {/* Inches Scale */}
            <div className="space-y-1">
              <div className="relative h-12 w-full bg-yellow-50 border-2 border-yellow-200 rounded-xl flex overflow-hidden items-end">
                {renderRulerTickMarks()}
                {/* Pointer indicator based on output percentage */}
                <div 
                  className="absolute bottom-0 h-full w-0.5 bg-blue-600 transition-all duration-300"
                  style={{ left: `${Math.min(100, Math.max(0, (rawResult / 10) * 100))}%` }}
                >
                  <div className="absolute top-0 -translate-x-1/2 -translate-y-full bg-blue-600 text-[10px] font-mono font-black text-white px-2 py-0.5 rounded-md shadow">
                    {rawResult.toFixed(2)} {currentType.toUnit}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-right font-black uppercase tracking-wider pr-1">Inches Side Gauge</p>
            </div>
          </div>
        </div>

        {/* UK E-E-A-T Metric Formula Explanation */}
        <div className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
          <p>
            <strong>Note on Metric Standardization:</strong> Under UK metrology parameters and national measurement guidelines, 1 centimeter contains approximately <strong>0.3937 inches</strong>. To carry out highly precise calculations, we adhere to the international constant multiplier rating of <code className="bg-slate-100 text-slate-900 px-1 py-0.5 rounded font-mono font-bold">2.54</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
