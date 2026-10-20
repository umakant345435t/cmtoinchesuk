import React, { useState, useEffect, useRef } from 'react';
import { CONVERSION_TYPES } from '../data/conversions';
import { ConversionType, RoutePath } from '../types';
import { Copy, Check, Info, RefreshCw, Ruler, FileCheck, ChevronDown, Crosshair, Plus, Minus, ZoomIn, ArrowDownUp, ArrowRightLeft } from 'lucide-react';

interface ConverterToolProps {
  initialTypeId?: string;
  initialFromValue?: number;
  onNavigate?: (path: RoutePath) => void;
}

export function ConverterTool({ initialTypeId = 'cm-to-inches', initialFromValue, onNavigate }: ConverterToolProps) {
  const [selectedTypeId, setSelectedTypeId] = useState<string>(initialTypeId);
  // Default to '3' so initial load immediately showcases accurate 3cm alignment on the scale
  const [inputValue, setInputValue] = useState<string>(
    initialFromValue !== undefined ? initialFromValue.toString() : '3'
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [scalePreset, setScalePreset] = useState<'auto' | '10' | '30' | '100'>('auto');
  const tapeRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

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

  // Derive standardized physical real-world values for physical ruler calibration
  let physicalCm = 0;
  let physicalInches = 0;
  if (currentType.fromUnit === 'cm') {
    physicalCm = Math.max(0, numInput);
    physicalInches = Math.max(0, rawResult);
  } else if (currentType.fromUnit === 'in') {
    physicalInches = Math.max(0, numInput);
    physicalCm = Math.max(0, rawResult);
  } else if (currentType.fromUnit === 'mm') {
    physicalCm = Math.max(0, numInput / 10);
    physicalInches = Math.max(0, rawResult);
  } else if (currentType.fromUnit === 'm') {
    physicalCm = Math.max(0, numInput * 100);
    physicalInches = Math.max(0, rawResult);
  } else if (currentType.fromUnit === 'ft') {
    physicalCm = Math.max(0, rawResult);
    physicalInches = Math.max(0, numInput * 12);
  } else {
    physicalCm = Math.max(0, numInput);
    physicalInches = Math.max(0, rawResult);
  }

  // Determine active scale maximum (in Centimeters)
  let maxCm = 10;
  if (scalePreset === '10') {
    maxCm = 10;
  } else if (scalePreset === '30') {
    maxCm = 30;
  } else if (scalePreset === '100') {
    maxCm = 100;
  } else {
    // Auto Mode: dynamic best fit
    if (physicalCm <= 10) {
      maxCm = 10; // e.g. 3 cm sits comfortably at 30%
    } else if (physicalCm <= 30) {
      maxCm = 30; // 30cm standard ruler
    } else if (physicalCm <= 100) {
      maxCm = 100; // 1-meter stick
    } else if (physicalCm <= 200) {
      maxCm = 200;
    } else {
      maxCm = Math.ceil(physicalCm / 50) * 50;
    }
  }

  // Fractional conversion for UK carpentry usage
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

  // Adjust input by an increment step (e.g. +1 cm, -1 cm, +0.1 cm)
  const adjustValue = (delta: number) => {
    let newVal = numInput + delta;
    if (newVal < 0) newVal = 0;
    // Format to 1 or 2 decimal places to avoid floating point drift
    setInputValue(Number(newVal.toFixed(2)).toString());
  };

  // Scrubbing & clicking handler on the tape ruler
  const handleTapeInteraction = (clientX: number) => {
    if (!tapeRef.current) return;
    const rect = tapeRef.current.getBoundingClientRect();
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = clampedX / rect.width;
    const targetCm = ratio * maxCm;

    if (currentType.fromUnit === 'cm') {
      // Step to nearest 0.1 cm for easy snapping
      const snapped = Math.round(targetCm * 10) / 10;
      setInputValue(snapped.toString());
    } else if (currentType.fromUnit === 'in') {
      const targetIn = targetCm / 2.54;
      const snapped = Math.round(targetIn * 100) / 100;
      setInputValue(snapped.toString());
    } else if (currentType.fromUnit === 'mm') {
      const targetMm = Math.round(targetCm * 10);
      setInputValue(targetMm.toString());
    } else {
      setInputValue(targetCm.toFixed(1));
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    handleTapeInteraction(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      handleTapeInteraction(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  // Exact Pointer Percentage: Math.min(100, (physicalCm / maxCm) * 100)
  // When physicalCm = 3 and maxCm = 10, pointerPercent is EXACTLY 30.000%
  const pointerPercent = Math.min(100, Math.max(0, (physicalCm / maxCm) * 100));

  // Render Centimeters (Top Scale) Ticks
  const renderCmTicks = () => {
    const ticks: React.ReactNode[] = [];
    const step = maxCm <= 20 ? 1 : maxCm <= 50 ? 2 : 5;

    for (let c = 0; c <= maxCm; c++) {
      const pct = (c / maxCm) * 100;
      const isMajor = c % step === 0;

      // Major whole centimeter tick line
      ticks.push(
        <div
          key={`cm-major-${c}`}
          className="absolute top-0 flex flex-col items-center pointer-events-none"
          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
        >
          <div
            className={`w-[1.5px] ${
              c % 10 === 0 ? 'h-6 bg-red-700 w-[2px]' : isMajor ? 'h-5 bg-slate-900' : 'h-3.5 bg-slate-700'
            }`}
          />
          {isMajor && (
            <span
              className={`text-[10px] font-mono font-black mt-0.5 tracking-tighter ${
                c % 10 === 0 ? 'text-red-700' : 'text-slate-900'
              }`}
            >
              {c}
            </span>
          )}
        </div>
      );

      // Half-centimeter (5mm) tick
      if (c < maxCm && maxCm <= 50) {
        const midPct = ((c + 0.5) / maxCm) * 100;
        ticks.push(
          <div
            key={`cm-half-${c}`}
            className="absolute top-0 pointer-events-none"
            style={{ left: `${midPct}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-[1px] h-3 bg-slate-600" />
          </div>
        );
      }

      // Millimeter (1mm) fine hairline ticks (shown in high-detail zoom)
      if (c < maxCm && maxCm <= 20) {
        for (let mm = 1; mm < 10; mm++) {
          if (mm === 5) continue; // 5mm already drawn as half-tick
          const mmPct = ((c + mm * 0.1) / maxCm) * 100;
          ticks.push(
            <div
              key={`cm-mm-${c}-${mm}`}
              className="absolute top-0 pointer-events-none"
              style={{ left: `${mmPct}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-[1px] h-2 bg-slate-400/80" />
            </div>
          );
        }
      }
    }
    return ticks;
  };

  // Render Inches (Bottom Scale) Ticks
  const renderInchTicks = () => {
    const ticks: React.ReactNode[] = [];
    const maxInches = maxCm / 2.54;
    const wholeInchMax = Math.floor(maxInches);

    for (let i = 0; i <= wholeInchMax; i++) {
      const pct = ((i * 2.54) / maxCm) * 100;
      if (pct > 100) break;

      // Major whole inch tick line
      ticks.push(
        <div
          key={`in-major-${i}`}
          className="absolute bottom-0 flex flex-col items-center pointer-events-none"
          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
        >
          <span className="text-[10px] font-mono font-black mb-0.5 text-blue-900 tracking-tighter">
            {i}"
          </span>
          <div className="w-[2px] h-5 bg-blue-900" />
        </div>
      );

      // Half inch tick (1/2")
      const halfPct = (((i + 0.5) * 2.54) / maxCm) * 100;
      if (halfPct <= 100) {
        ticks.push(
          <div
            key={`in-half-${i}`}
            className="absolute bottom-0 pointer-events-none"
            style={{ left: `${halfPct}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-[1.5px] h-3.5 bg-blue-700" />
          </div>
        );
      }

      // Quarter inch ticks (1/4" and 3/4")
      if (maxCm <= 50) {
        const q1Pct = (((i + 0.25) * 2.54) / maxCm) * 100;
        const q3Pct = (((i + 0.75) * 2.54) / maxCm) * 100;
        if (q1Pct <= 100) {
          ticks.push(
            <div
              key={`in-q1-${i}`}
              className="absolute bottom-0 pointer-events-none"
              style={{ left: `${q1Pct}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-[1px] h-2.5 bg-blue-600/70" />
            </div>
          );
        }
        if (q3Pct <= 100) {
          ticks.push(
            <div
              key={`in-q3-${i}`}
              className="absolute bottom-0 pointer-events-none"
              style={{ left: `${q3Pct}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-[1px] h-2.5 bg-blue-600/70" />
            </div>
          );
        }
      }

      // Eighth inch ticks (1/8", 3/8", 5/8", 7/8")
      if (maxCm <= 20) {
        [0.125, 0.375, 0.625, 0.875].forEach((eighth, idx) => {
          const ePct = (((i + eighth) * 2.54) / maxCm) * 100;
          if (ePct <= 100) {
            ticks.push(
              <div
                key={`in-e-${i}-${idx}`}
                className="absolute bottom-0 pointer-events-none"
                style={{ left: `${ePct}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-[1px] h-1.5 bg-blue-400/80" />
              </div>
            );
          }
        });
      }
    }
    return ticks;
  };

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-slate-100 overflow-hidden" id="converter-tool">
      <div className="p-3.5 sm:p-6 md:p-8 space-y-3 sm:space-y-5">
        {/* Unit Selector Dropdown */}
        <div className="bg-slate-50/80 p-2.5 sm:p-3.5 border border-slate-200/80 rounded-xl sm:rounded-2xl">
          <label htmlFor="conversion-mode-select" className="block text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-wider mb-1 sm:mb-1.5">
            Active Conversion Mode:
          </label>
          <div className="relative">
            <select
              id="conversion-mode-select"
              value={selectedTypeId}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 text-slate-900 py-2 sm:py-3 px-3 sm:px-4 pr-9 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black shadow-xs transition-all hover:border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer appearance-none"
            >
              {CONVERSION_TYPES.map((type) => (
                <option key={type.id} value={type.id} className="font-bold text-slate-800">
                  {type.fromUnit.toUpperCase()} → {type.toUnit.toUpperCase()} ({type.label})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Input & Output Double-Panel layout */}
        <div className="grid md:grid-cols-9 gap-2 md:gap-6 items-center relative">
          {/* Input Panel */}
          <div className="md:col-span-4 flex flex-col">
            <label className="block text-[10px] sm:text-xs font-bold uppercase text-slate-400 mb-1 sm:mb-2">
              Centimeters / {currentType.fromUnit.toUpperCase()} input
            </label>
            <div className="relative">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="w-full text-2xl sm:text-3xl font-black bg-slate-50 border-2 border-slate-200 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3.5 focus:border-blue-500 focus:bg-white outline-none transition-all font-sans [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-xs"
                id="converter-input"
              />
              <span className="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-black text-slate-400 bg-slate-200/60 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md uppercase font-mono">
                {currentType.fromUnit}
              </span>
            </div>
          </div>

          {/* Swap Button: sleek arrow button saving space on mobile */}
          <div className="md:col-span-1 flex justify-center -my-2.5 md:my-0 relative z-10">
            <button
              onClick={swapUnits}
              title={`Swap direction (${currentType.fromUnit} ⇄ ${currentType.toUnit})`}
              aria-label="Swap conversion direction"
              type="button"
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-2 border-white shadow-md hover:shadow-lg w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all active:rotate-180 hover:scale-105 cursor-pointer group"
            >
              <ArrowDownUp className="w-4 h-4 md:hidden stroke-[2.5] group-hover:scale-110 transition-transform" />
              <ArrowRightLeft className="w-5 h-5 hidden md:block stroke-[2.5] group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Output Panel */}
          <div className="md:col-span-4 flex flex-col">
            <label className="block text-[10px] sm:text-xs font-bold uppercase text-slate-400 mb-1 sm:mb-2">
              Inches / {currentType.toUnit.toUpperCase()} output
            </label>
            <div className="w-full text-2xl sm:text-3xl font-black bg-blue-50 border-2 border-blue-100 text-blue-700 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 min-h-[54px] sm:min-h-[68px] shadow-xs">
              <span className="font-sans truncate" id="converter-result">
                {formattedResult}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-200/50 rounded-lg transition-all cursor-pointer"
                  title="Copy result"
                  aria-label="Copy result to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                </button>
                <span className="text-xs sm:text-sm font-black text-blue-500 bg-blue-200/40 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md uppercase font-mono">
                  {currentType.toUnit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copy Result & Formula Action Row */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-4 pt-2.5 border-t border-slate-100">
          <p className="text-xs sm:text-sm font-semibold text-slate-500 truncate">
            Formula: <span className="text-slate-700 font-mono italic">{currentType.formula}</span>
          </p>
          <button
            onClick={handleCopy}
            type="button"
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
            title="Copy conversion text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300 stroke-[3]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'CONVERSION COPIED!' : 'COPY RESULT'}</span>
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

        {/* NEXT-GENERATION REAL-TIME DUAL TAPE MEASURE & CALIPER SCALE */}
        <div className="border-2 border-slate-200 rounded-2xl p-5 bg-gradient-to-b from-slate-50 to-amber-50/30 space-y-4 shadow-sm">
          {/* Header Bar with Scale Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-400 text-slate-950 rounded-lg shadow-sm">
                <Ruler className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  Ultra-Accurate Dual Tape Scale
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-1.5 py-0.5 rounded">
                    1:1 Calibrated
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  Laser needle aligns with 100% mathematical precision on {physicalCm.toFixed(1)} cm and {physicalInches.toFixed(2)} in
                </p>
              </div>
            </div>

            {/* Scale Range Zoom Buttons */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs self-start sm:self-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase px-1.5">Zoom:</span>
              <button
                type="button"
                onClick={() => setScalePreset('auto')}
                className={`text-[10px] font-mono font-black px-2 py-1 rounded-lg transition-all ${
                  scalePreset === 'auto'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Auto ({maxCm}cm)
              </button>
              <button
                type="button"
                onClick={() => setScalePreset('10')}
                className={`text-[10px] font-mono font-black px-2 py-1 rounded-lg transition-all ${
                  scalePreset === '10'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                0–10cm
              </button>
              <button
                type="button"
                onClick={() => setScalePreset('30')}
                className={`text-[10px] font-mono font-black px-2 py-1 rounded-lg transition-all ${
                  scalePreset === '30'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                0–30cm
              </button>
              <button
                type="button"
                onClick={() => setScalePreset('100')}
                className={`text-[10px] font-mono font-black px-2 py-1 rounded-lg transition-all ${
                  scalePreset === '100'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                0–100cm
              </button>
            </div>
          </div>

          {/* Interactive Micro-Stepper & Digital HUD */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Adjust:</span>
              <div className="flex items-center gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => adjustValue(-1)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded text-xs font-bold transition-all"
                  title="Minus 1 cm"
                >
                  -1 cm
                </button>
                <button
                  type="button"
                  onClick={() => adjustValue(-0.1)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded text-xs font-bold transition-all"
                  title="Minus 1 mm (0.1 cm)"
                >
                  -1 mm
                </button>
                <button
                  type="button"
                  onClick={() => adjustValue(0.1)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded text-xs font-bold transition-all"
                  title="Plus 1 mm (0.1 cm)"
                >
                  +1 mm
                </button>
                <button
                  type="button"
                  onClick={() => adjustValue(1)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded text-xs font-bold transition-all"
                  title="Plus 1 cm"
                >
                  +1 cm
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Metric:</span>
                <span className="font-black text-slate-900 bg-amber-100/80 px-2 py-0.5 rounded text-xs">
                  {physicalCm.toFixed(2)} cm
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Imperial:</span>
                <span className="font-black text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded text-xs">
                  {physicalInches.toFixed(3)} in
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Calibrated Dual Tape Visualizer */}
          <div className="pt-8 pb-8 px-2 relative select-none">
            {/* The Physical Tape Container */}
            <div
              ref={tapeRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="relative w-full h-32 rounded-xl border-2 border-slate-700 shadow-lg overflow-hidden cursor-crosshair touch-none bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-200"
            >
              {/* Left Steel Hook of Tape Measure */}
              <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 border-r-2 border-slate-700 z-10 flex flex-col justify-between py-2 items-center pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800 shadow-inner" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800 shadow-inner" />
              </div>

              {/* Top Half: Metric / Centimeters Scale */}
              <div className="absolute top-0 left-3.5 right-0 h-16 border-b border-slate-600/60 bg-gradient-to-b from-yellow-200 to-amber-300/90">
                <span className="absolute top-1 left-2 text-[9px] font-black font-mono text-slate-600 uppercase tracking-widest pointer-events-none">
                  CM (Metric)
                </span>
                {renderCmTicks()}
              </div>

              {/* Bottom Half: Imperial / Inches Scale */}
              <div className="absolute bottom-0 left-3.5 right-0 h-16 bg-gradient-to-b from-amber-100 to-yellow-100">
                <span className="absolute bottom-1 left-2 text-[9px] font-black font-mono text-blue-800 uppercase tracking-widest pointer-events-none">
                  INCH (Imperial 1" = 2.54cm)
                </span>
                {renderInchTicks()}
              </div>

              {/* Center Channel Hairline Guideline */}
              <div className="absolute top-1/2 left-3.5 right-0 -translate-y-1/2 h-[1px] bg-slate-400/40 pointer-events-none" />

              {/* REAL-TIME HIGH-ACCURACY LASER INDICATOR NEEDLE */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-red-600 z-20 pointer-events-none transition-[left] duration-150 ease-out shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                style={{
                  left: `calc(14px + (100% - 14px) * ${pointerPercent / 100})`,
                  transform: 'translateX(-50%)'
                }}
              >
                {/* Center Crosshair Reticle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-4 h-4 rounded-full border-2 border-red-600 bg-white/80 shadow flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                </div>

                {/* Top Metric Flag */}
                <div className="absolute top-0 -translate-x-1/2 -translate-y-full mb-1 flex flex-col items-center">
                  <div className="bg-slate-950 text-white text-[11px] font-mono font-black px-2.5 py-1 rounded-lg shadow-xl border border-red-500 whitespace-nowrap flex items-center gap-1.5">
                    <span className="text-amber-400">{physicalCm.toFixed(1)} cm</span>
                    <span className="text-slate-400 text-[9px]">({(physicalCm * 10).toFixed(0)}mm)</span>
                  </div>
                  {/* Downward triangle pointer */}
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-5 border-t-slate-950" />
                </div>

                {/* Bottom Imperial Flag */}
                <div className="absolute bottom-0 -translate-x-1/2 translate-y-full mt-1 flex flex-col items-center">
                  {/* Upward triangle pointer */}
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-b-5 border-b-blue-950" />
                  <div className="bg-blue-950 text-white text-[11px] font-mono font-black px-2.5 py-1 rounded-lg shadow-xl border border-blue-400 whitespace-nowrap flex items-center gap-1.5">
                    <span className="text-yellow-300">{physicalInches.toFixed(2)}"</span>
                    <span className="text-blue-200 text-[9px]">({getFractionalEstimate(physicalInches)})</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 text-center font-medium mt-6">
              💡 Tip: Click or drag anywhere along the ruler tape to test live measurements with 100% exact tick synchronization.
            </p>
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
