import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CONVERSION_TYPES } from '../data/conversions';
import { ConversionType, RoutePath } from '../types';
import { Copy, Check, Info, RefreshCw, Ruler, FileCheck, ChevronDown, Crosshair, Plus, Minus, ZoomIn, ArrowDownUp, ArrowRightLeft, X } from 'lucide-react';

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
  const [zoomPreset, setZoomPreset] = useState<'auto' | '10' | '20' | '50' | '100'>('auto');
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

  // Controlled input change handler: permits numbers, decimal point, backspacing, and international commas
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/,/g, '.');
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      if (val.length <= 12) {
        setInputValue(val);
      }
    }
  };

  // Calculate Result safely
  const parsedNum = parseFloat(inputValue);
  const isValidNumber = !isNaN(parsedNum) && isFinite(parsedNum) && inputValue.trim() !== '';
  const numInput = isValidNumber ? Math.max(0, parsedNum) : 0;
  const rawResult = numInput * currentType.ratio;
  const formattedResult = !isValidNumber || numInput === 0 
    ? '0' 
    : (Number.isInteger(rawResult) ? rawResult.toString() : rawResult.toFixed(4));

  // ADAPTIVE AUTO-ZOOM VISUAL RULER SPECIFICATION (Max 100 Units Cap):
  // 1. Auto-Zoom System:
  //    - If input <= 10: scale zooms in on 0 to 10 (large, spaced-out ticks for 0..10).
  //    - If 10 < input <= 20: scale expands to 0 to 20.
  //    - If 20 < input <= 50: scale expands to 0 to 50.
  //    - If 50 < input <= 100: scale spans 0 to 100.
  // 2. Strict 100 Max Limit: Scale never exceeds 100 units.
  // 3. Values > 100 reset the visual ruler pointer to 0 with a warning notice.
  const isOutOfScale = numInput > 100 || numInput < 0;

  const autoScale = useMemo(() => {
    if (numInput <= 10) return 10;
    if (numInput <= 20) return 20;
    if (numInput <= 50) return 50;
    return 100;
  }, [numInput]);

  const maxScale = zoomPreset === 'auto' ? autoScale : parseInt(zoomPreset, 10);

  const scaleFromValue = isOutOfScale ? 0 : numInput;
  const scaleToValue = isOutOfScale ? 0 : (numInput * currentType.ratio);

  // Pointer position along tape: strictly 0% to 100% relative to current maxScale
  const pointerPercent = isOutOfScale 
    ? 0 
    : Math.min(100, Math.max(0, (scaleFromValue / maxScale) * 100));

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
  // Adjust input by an increment step (e.g. +1, -1, +10, -10)
  const adjustValue = (delta: number) => {
    let newVal = numInput + delta;
    if (newVal < 0) newVal = 0;
    setInputValue(Number(newVal.toFixed(1)).toString());
  };

  // Scrubbing & clicking handler on the tape ruler (maps 0% - 100% directly to 0 - maxScale units)
  const handleTapeInteraction = (clientX: number) => {
    if (!tapeRef.current) return;
    const rect = tapeRef.current.getBoundingClientRect();
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = clampedX / rect.width;
    const targetVal = ratio * maxScale;
    const snapStep = maxScale <= 10 ? 0.1 : (maxScale <= 20 ? 0.2 : 0.5);
    const snapped = Math.round(targetVal / snapStep) * snapStep;
    setInputValue(Number(snapped.toFixed(1)).toString());
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

  // Top Scale Ticks: Adaptive based on maxScale (10, 20, 50, 100)
  const fromUnitTicks = useMemo(() => {
    const ticks: React.ReactNode[] = [];
    
    let majorInterval = 10;
    let halfInterval = 5;
    let minorInterval = 1;
    let redMarks = [0, 50, 100];

    if (maxScale === 10) {
      majorInterval = 1;
      halfInterval = 0.5;
      minorInterval = 0.1;
      redMarks = [0, 5, 10];
    } else if (maxScale === 20) {
      majorInterval = 2;
      halfInterval = 1;
      minorInterval = 0.2;
      redMarks = [0, 10, 20];
    } else if (maxScale === 50) {
      majorInterval = 5;
      halfInterval = 2.5;
      minorInterval = 0.5;
      redMarks = [0, 25, 50];
    }

    const totalMinors = Math.round(maxScale / minorInterval);

    for (let i = 0; i <= totalMinors; i++) {
      const u = Number((i * minorInterval).toFixed(2));
      if (u > maxScale + 0.0001) break;
      const pct = (u / maxScale) * 100;
      if (pct > 100.01) break;

      const isMajor = Math.abs(u % majorInterval) < 0.001 || Math.abs((u % majorInterval) - majorInterval) < 0.001;
      const isHalf = !isMajor && (Math.abs(u % halfInterval) < 0.001 || Math.abs((u % halfInterval) - halfInterval) < 0.001);

      if (isMajor) {
        const isRed = redMarks.some((rm) => Math.abs(rm - u) < 0.001);
        ticks.push(
          <div
            key={`from-major-${u}`}
            className="absolute top-0 flex flex-col items-center pointer-events-none"
            style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          >
            <div
              className={`w-[1.5px] ${
                isRed ? 'h-6 bg-red-700 w-[2px]' : 'h-4.5 bg-slate-900'
              }`}
            />
            <span
              className={`text-[10px] sm:text-[11px] font-mono font-black mt-0.5 tracking-tighter ${
                isRed ? 'text-red-700 font-extrabold' : 'text-slate-900'
              }`}
            >
              {u}
            </span>
          </div>
        );
      } else if (isHalf) {
        ticks.push(
          <div
            key={`from-half-${u}`}
            className="absolute top-0 pointer-events-none"
            style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-[1.2px] h-3 bg-slate-700" />
          </div>
        );
      } else {
        ticks.push(
          <div
            key={`from-minor-${u}`}
            className="absolute top-0 pointer-events-none"
            style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-[1px] h-1.5 bg-slate-500/70" />
          </div>
        );
      }
    }
    return ticks;
  }, [maxScale]);

  // Bottom Scale Ticks: calibrated 0 to (maxScale * ratio) of the converted unit (toUnit)
  const toUnitTicks = useMemo(() => {
    const ticks: React.ReactNode[] = [];
    const maxTarget = maxScale * currentType.ratio;
    if (maxTarget <= 0) return ticks;

    // Pick a clean step size for round tick numbers
    let majorStep = 1;
    let minorStep = 0.2;

    if (maxTarget <= 1) {
      majorStep = 0.1;
      minorStep = 0.02;
    } else if (maxTarget <= 4) {
      majorStep = 0.5;
      minorStep = 0.1;
    } else if (maxTarget <= 10) {
      majorStep = 1;
      minorStep = 0.2;
    } else if (maxTarget <= 25) {
      majorStep = 2.5;
      minorStep = 0.5;
    } else if (maxTarget <= 60) {
      majorStep = 5;
      minorStep = 1;
    } else if (maxTarget <= 150) {
      majorStep = 10;
      minorStep = 2;
    } else if (maxTarget <= 350) {
      majorStep = 25;
      minorStep = 5;
    } else if (maxTarget <= 800) {
      majorStep = 50;
      minorStep = 10;
    } else {
      majorStep = 100;
      minorStep = 20;
    }

    const totalSteps = Math.floor(maxTarget / minorStep);
    const safeSteps = Math.min(totalSteps, 120);

    for (let s = 0; s <= safeSteps; s++) {
      const val = s * minorStep;
      if (val > maxTarget + 0.0001) break;
      const pct = (val / maxTarget) * 100;
      if (pct > 100.01) break;

      const rem = val % majorStep;
      const isMajor = Math.abs(rem) < 0.001 || Math.abs(rem - majorStep) < 0.001;

      if (isMajor) {
        const displayVal = Number(val.toFixed(2));
        ticks.push(
          <div
            key={`to-major-${s}`}
            className="absolute bottom-0 flex flex-col items-center pointer-events-none"
            style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          >
            <span className="text-[10px] sm:text-[11px] font-mono font-black mb-0.5 text-blue-900 tracking-tighter">
              {displayVal}{currentType.toUnit === 'in' ? '"' : ''}
            </span>
            <div className="w-[1.5px] h-4.5 bg-blue-900" />
          </div>
        );
      } else {
        ticks.push(
          <div
            key={`to-minor-${s}`}
            className="absolute bottom-0 pointer-events-none"
            style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-[1px] h-2 bg-blue-600/60" />
          </div>
        );
      }
    }

    return ticks;
  }, [maxScale, currentType.ratio, currentType.toUnit]);

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
                type="text"
                inputMode="decimal"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full text-2xl sm:text-3xl font-black bg-slate-50 border-2 border-slate-200 rounded-xl sm:rounded-2xl pl-4 sm:pl-5 pr-20 sm:pr-24 py-2.5 sm:py-3.5 focus:border-blue-500 focus:bg-white outline-none transition-all font-sans shadow-xs"
                id="converter-input"
              />
              <div className="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {inputValue !== '' && (
                  <button
                    type="button"
                    onClick={() => setInputValue('')}
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 rounded-full transition-colors cursor-pointer"
                    title="Clear input"
                    aria-label="Clear input value"
                  >
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                )}
                <span className="text-sm sm:text-base font-black text-slate-700 bg-slate-200/90 px-2.5 sm:px-3 py-1 rounded-lg uppercase font-mono shadow-xs">
                  {currentType.fromUnit}
                </span>
              </div>
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
                <span className="text-sm sm:text-base font-black text-blue-700 bg-blue-200/80 px-2.5 sm:px-3 py-1 rounded-lg uppercase font-mono shadow-xs">
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
          {/* Header Bar with Adaptive Zoom & Scale Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-400 text-slate-950 rounded-lg shadow-sm">
                <Ruler className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-xs sm:text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  Real-Time Adaptive Scale
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-1.5 py-0.5 rounded">
                    {zoomPreset === 'auto' ? `Auto-Zoom (0 – ${maxScale})` : `0 – ${maxScale}`}
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {isOutOfScale ? (
                    <span className="text-amber-700 font-semibold">
                      Input exceeds 100 visual limit. Ruler reset to 0 (see converted result in card above).
                    </span>
                  ) : (
                    <span>
                      Laser needle aligns accurately on {scaleFromValue} {currentType.fromUnit} and {Number(scaleToValue.toFixed(currentType.ratio >= 10 ? 1 : 2))} {currentType.toUnit}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Adaptive Zoom Preset Pills */}
            <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs self-start sm:self-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase px-1.5">Zoom:</span>
              {(['auto', '10', '20', '50', '100'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setZoomPreset(mode)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black transition-all ${
                    zoomPreset === mode
                      ? 'bg-blue-600 text-white shadow-xs scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {mode === 'auto' ? `Auto (${maxScale})` : mode}
                </button>
              ))}
            </div>
          </div>

          {/* Out of scale warning notice */}
          {isOutOfScale && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl px-3.5 py-2 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-amber-600 font-bold">⚠️ Scale Limit:</span>
                <span>
                  Real-time visual ruler only measures up to <strong>100 {currentType.fromUnit}</strong>. Values &gt; 100 display 0 on ruler.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInputValue('100')}
                className="px-2 py-0.5 bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold rounded text-[11px] transition-all cursor-pointer"
              >
                Set to 100 {currentType.fromUnit}
              </button>
            </div>
          )}

          {/* Interactive Micro-Stepper & Digital HUD */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Step:</span>
              <div className="flex flex-wrap items-center gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => adjustValue(-10)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded text-xs font-bold transition-all cursor-pointer"
                  title={`Minus 10 ${currentType.fromUnit}`}
                >
                  -10
                </button>
                <button
                  type="button"
                  onClick={() => adjustValue(-1)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded text-xs font-bold transition-all cursor-pointer"
                  title={`Minus 1 ${currentType.fromUnit}`}
                >
                  -1
                </button>
                <button
                  type="button"
                  onClick={() => adjustValue(1)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded text-xs font-bold transition-all cursor-pointer"
                  title={`Plus 1 ${currentType.fromUnit}`}
                >
                  +1
                </button>
                <button
                  type="button"
                  onClick={() => adjustValue(10)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded text-xs font-bold transition-all cursor-pointer"
                  title={`Plus 10 ${currentType.fromUnit}`}
                >
                  +10
                </button>
                <button
                  type="button"
                  onClick={() => setInputValue('0')}
                  className="px-2 py-1 bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-800 rounded text-xs font-bold transition-all cursor-pointer"
                  title="Reset to 0"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => setInputValue(maxScale.toString())}
                  className="px-2 py-1 bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 rounded text-xs font-bold transition-all cursor-pointer"
                  title={`Set to max (${maxScale})`}
                >
                  {maxScale}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold">{currentType.fromUnit}:</span>
                <span className="font-black text-slate-900 text-sm sm:text-base">
                  {scaleFromValue} <span className="text-xs font-black text-slate-600">{currentType.fromUnit.toUpperCase()}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold">{currentType.toUnit}:</span>
                <span className="font-black text-blue-700 text-sm sm:text-base">
                  {Number(scaleToValue.toFixed(currentType.ratio >= 10 ? 1 : (currentType.ratio >= 1 ? 2 : 3)))} <span className="text-xs font-black text-blue-600">{currentType.toUnit.toUpperCase()}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Calibrated Dual Tape Visualizer */}
          <div className="pt-6 pb-6 px-2 relative select-none">
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

              {/* Top Half: Source Unit Scale */}
              <div className="absolute top-0 left-3.5 right-0 h-16 border-b border-slate-600/60 bg-gradient-to-b from-yellow-200 to-amber-300/90">
                <span className="absolute top-1.5 left-2.5 sm:left-3 text-base sm:text-lg font-black font-mono text-slate-800 tracking-wider pointer-events-none z-10 select-none">
                  {currentType.fromUnit.toUpperCase()}
                </span>
                {fromUnitTicks}
              </div>

              {/* Bottom Half: Converted Unit Scale */}
              <div className="absolute bottom-0 left-3.5 right-0 h-16 bg-gradient-to-b from-amber-100 to-yellow-100">
                <span className="absolute bottom-1.5 left-2.5 sm:left-3 text-base sm:text-lg font-black font-mono text-blue-950 tracking-wider pointer-events-none z-10 select-none">
                  {currentType.toUnit.toUpperCase()}
                </span>
                {toUnitTicks}
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
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-4 h-4 rounded-full border-2 border-red-600 bg-white/90 shadow flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                </div>

                {/* Top Source Flag */}
                <div className="absolute top-0 -translate-x-1/2 -translate-y-full mb-1 flex flex-col items-center">
                  <div className="bg-slate-950 text-white text-xs font-mono font-black px-2.5 py-1 rounded-lg shadow-xl border border-red-500 whitespace-nowrap flex items-center gap-1.5">
                    <span className="text-amber-400">{scaleFromValue}</span>
                    <span className="text-white text-[11px] font-black">{currentType.fromUnit.toUpperCase()}</span>
                  </div>
                  {/* Downward triangle pointer */}
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-5 border-t-slate-950" />
                </div>

                {/* Bottom Target Flag */}
                <div className="absolute bottom-0 -translate-x-1/2 translate-y-full mt-1 flex flex-col items-center">
                  {/* Upward triangle pointer */}
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-b-5 border-b-blue-950" />
                  <div className="bg-blue-950 text-white text-xs font-mono font-black px-2.5 py-1 rounded-lg shadow-xl border border-blue-400 whitespace-nowrap flex items-center gap-1.5">
                    <span className="text-yellow-300">
                      {Number.isInteger(scaleToValue) ? scaleToValue : scaleToValue.toFixed(currentType.ratio >= 10 ? 1 : (currentType.ratio >= 1 ? 2 : 3))}
                    </span>
                    <span className="text-blue-100 text-[11px] font-black">{currentType.toUnit.toUpperCase()}</span>
                    {currentType.toUnit === 'in' && scaleToValue > 0 && (
                      <span className="text-blue-200 text-[10px] font-medium">({getFractionalEstimate(scaleToValue)})</span>
                    )}
                  </div>
                </div>
              </div>
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
