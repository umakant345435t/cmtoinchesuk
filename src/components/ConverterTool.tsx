import React, { useState, useEffect, useLayoutEffect } from 'react';
import { CONVERSION_TYPES } from '../data/conversions';
import { RoutePath } from '../types';
import { Copy, Check, ArrowDownUp, ArrowRightLeft, RotateCcw } from 'lucide-react';

interface ConverterToolProps {
  initialTypeId?: string;
  initialFromValue?: number;
  onNavigate?: (path: RoutePath) => void;
}

const DEFAULT_VALUES: Record<string, string> = {
  'cm-to-inches': '10',
  'inches-to-cm': '10',
  'feet-to-cm': '5',
  'cm-to-feet': '170',
  'meters-to-feet': '2',
  'feet-to-meters': '6',
  'mm-to-inches': '25',
  'inches-to-mm': '1',
};

export function ConverterTool({ initialTypeId = 'cm-to-inches', initialFromValue }: ConverterToolProps) {
  const [selectedTypeId, setSelectedTypeId] = useState<string>(initialTypeId);
  const [inputValue, setInputValue] = useState<string>(
    initialFromValue !== undefined ? initialFromValue.toString() : (DEFAULT_VALUES[initialTypeId] ?? '10')
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Restore any digits/mode entered during the pre-hydration window before first paint
  useLayoutEffect(() => {
    const w = window as Window & { __PREHYDRATE_INPUT__?: string; __PREHYDRATE_MODE__?: string };
    if (typeof w.__PREHYDRATE_INPUT__ === 'string' && w.__PREHYDRATE_INPUT__.length > 0) {
      setInputValue(w.__PREHYDRATE_INPUT__);
      delete w.__PREHYDRATE_INPUT__;
    }
    if (typeof w.__PREHYDRATE_MODE__ === 'string' && w.__PREHYDRATE_MODE__.length > 0) {
      setSelectedTypeId(w.__PREHYDRATE_MODE__);
      delete w.__PREHYDRATE_MODE__;
    }
  }, []);

  // Sync state if initial props change
  useEffect(() => {
    setSelectedTypeId(initialTypeId);
    setInputValue(
      initialFromValue !== undefined ? initialFromValue.toString() : (DEFAULT_VALUES[initialTypeId] ?? '10')
    );
  }, [initialTypeId, initialFromValue]);

  const currentType = CONVERSION_TYPES.find((t) => t.id === selectedTypeId) || CONVERSION_TYPES[0];

  // Controlled input change handler: permits numbers, decimal point, backspacing, and commas up to 25 digits
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '.');
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      if (val.length <= 25) {
        setInputValue(val);
      }
    }
  };

  // Calculate result safely for arbitrarily large numbers with zero scale cap
  const parsedNum = parseFloat(inputValue);
  const isValidNumber = !isNaN(parsedNum) && isFinite(parsedNum) && inputValue.trim() !== '';
  const numInput = isValidNumber ? Math.max(0, parsedNum) : 0;
  const rawResult = numInput * currentType.ratio;
  const formattedResult =
    !isValidNumber || numInput === 0
      ? '0'
      : rawResult.toLocaleString('en-GB', { useGrouping: false, maximumFractionDigits: 4 });

  // Fractional conversion for UK carpentry usage (nearest 1/16 inch)
  const getFractionalEstimate = (decimalInches: number): string => {
    if (decimalInches <= 0) return '0 in';
    const wholeInches = Math.floor(decimalInches);
    const remainder = decimalInches - wholeInches;
    const sixteenths = Math.round(remainder * 16);
    if (sixteenths === 0) return `${wholeInches} in`;
    if (sixteenths === 16) return `${wholeInches + 1} in`;

    let num = sixteenths;
    let denom = 16;
    if (num % 8 === 0) {
      num /= 8;
      denom /= 8;
    } else if (num % 4 === 0) {
      num /= 4;
      denom /= 4;
    } else if (num % 2 === 0) {
      num /= 2;
      denom /= 2;
    }

    return wholeInches === 0 ? `${num}/${denom} in` : `${wholeInches} ${num}/${denom} in`;
  };

  const handleCopy = () => {
    const textToCopy = formattedResult;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(() => {});
    } else {
      try {
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (_) {}
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputValue('');
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
    const reverseType = CONVERSION_TYPES.find((t) => t.id === nextId);
    if (reverseType && numInput > 0) {
      const converted = (numInput * currentType.ratio).toFixed(2);
      setInputValue(converted);
    }
  };

  return (
    <div
      className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-slate-100 overflow-hidden"
      id="converter-tool"
      data-mode={selectedTypeId}
    >
      <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
        {/* Input & Output Double-Panel layout */}
        <div className="grid md:grid-cols-9 gap-2 md:gap-6 items-center relative w-full min-w-0">
          {/* Input Panel */}
          <div className="md:col-span-4 flex flex-col min-w-0 w-full">
            <label htmlFor="converter-input" id="converter-in-label" className="block text-[10px] sm:text-xs font-bold uppercase text-slate-500 mb-1 sm:mb-2 truncate">
              {`Enter ${currentType.fromUnit.toUpperCase()} value`}
            </label>
            <div className="relative w-full min-w-0">
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                maxLength={25}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="10"
                className={`w-full max-w-full min-w-0 font-black bg-slate-50 border-2 border-slate-200 rounded-xl sm:rounded-2xl pl-3.5 sm:pl-4 pr-14 sm:pr-16 py-2.5 sm:py-3.5 focus:border-blue-500 focus:bg-white outline-none transition-all font-sans shadow-xs truncate tabular-nums ${
                  inputValue.length > 18
                    ? 'text-xs sm:text-sm'
                    : inputValue.length > 13
                    ? 'text-sm sm:text-base'
                    : inputValue.length > 9
                    ? 'text-base sm:text-lg'
                    : inputValue.length > 6
                    ? 'text-xl sm:text-2xl'
                    : 'text-2xl sm:text-3xl'
                }`}
                id="converter-input"
              />
              <div className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 flex items-center shrink-0">
                <span id="converter-from-badge" className="text-xs sm:text-sm font-black text-slate-700 bg-slate-200/90 px-2 sm:px-2.5 py-1 rounded-lg uppercase font-mono shadow-xs shrink-0 select-none">
                  {currentType.fromUnit}
                </span>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center -my-2.5 md:my-0 relative z-10 shrink-0">
            <button
              id="converter-swap-btn"
              onClick={swapUnits}
              title={`Swap direction (${currentType.fromUnit} ⇄ ${currentType.toUnit})`}
              aria-label="Swap conversion direction"
              type="button"
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-2 border-white shadow-md hover:shadow-lg w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all active:rotate-180 hover:scale-105 cursor-pointer group shrink-0"
            >
              <ArrowDownUp className="w-4 h-4 md:hidden stroke-[2.5] group-hover:scale-110 transition-transform" />
              <ArrowRightLeft className="w-5 h-5 hidden md:block stroke-[2.5] group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Output Panel */}
          <div className="md:col-span-4 flex flex-col min-w-0 w-full">
            <label id="converter-out-label" className="block text-[10px] sm:text-xs font-bold uppercase text-slate-500 mb-1 sm:mb-2 truncate">
              {`Result in ${currentType.toUnit.toUpperCase()}`}
            </label>
            <div
              id="converter-output-box"
              className={`w-full max-w-full min-w-0 font-black bg-blue-50 border-2 border-blue-100 text-blue-700 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 min-h-[54px] sm:min-h-[68px] shadow-xs overflow-hidden tabular-nums ${
                formattedResult.length > 18
                  ? 'text-xs sm:text-sm'
                  : formattedResult.length > 13
                  ? 'text-sm sm:text-base'
                  : formattedResult.length > 9
                  ? 'text-base sm:text-lg'
                  : formattedResult.length > 6
                  ? 'text-xl sm:text-2xl'
                  : 'text-2xl sm:text-3xl'
              }`}
            >
              <span className="font-sans truncate min-w-0 flex-1" id="converter-result">
                {formattedResult}
              </span>
              <div className="flex items-center shrink-0">
                <span id="converter-to-badge" className="text-xs sm:text-sm font-black text-blue-700 bg-blue-200/80 px-2 sm:px-2.5 py-1 rounded-lg uppercase font-mono shadow-xs shrink-0 select-none">
                  {currentType.toUnit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1 pb-1">
          <button
            id="converter-copy-btn"
            onClick={handleCopy}
            type="button"
            className={`min-h-[40px] px-4 py-2 rounded-lg sm:rounded-xl font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 select-none whitespace-nowrap ${
              copied
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg shadow-blue-200'
            }`}
            title="Copy conversion result"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED' : 'COPY RESULT'}</span>
          </button>

          <button
            id="converter-clear-btn"
            onClick={handleClear}
            type="button"
            className="min-h-[40px] px-4 py-2 rounded-lg sm:rounded-xl font-black text-[11px] uppercase tracking-wider bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 hover:text-slate-900 border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 select-none whitespace-nowrap"
            title="Clear input and calculation"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>CLEAR</span>
          </button>
        </div>

        {/* Always-Visible Calculation Details (Carpentry Fraction & Exact Formula) */}
        <div
          id="converter-info-card"
          className="grid sm:grid-cols-2 gap-4 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs"
        >
          <div>
            <h4 className="font-black text-slate-900 mb-1 text-[11px] uppercase tracking-wider">
              Fractional Equivalent (UK Carpentry)
            </h4>
            <p id="converter-fraction-val" className="text-slate-700 text-sm font-black mt-1">
              {currentType.toUnit === 'in' ? (
                <><strong>{getFractionalEstimate(rawResult)}</strong> (Nearest 1/16&quot;)</>
              ) : currentType.fromUnit === 'in' ? (
                <>Input is precisely <strong>{getFractionalEstimate(numInput)}</strong></>
              ) : (
                <>Applied on imperial inch conversions</>
              )}
            </p>
          </div>
          <div>
            <h4 className="font-black text-slate-900 mb-1 text-[11px] uppercase tracking-wider">
              Formula Expression
            </h4>
            <p id="converter-formula-val" className="font-mono text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 leading-normal tabular-nums">
              {numInput > 0 ? (
                <>
                  {`${inputValue} ${currentType.fromUnit} × ${currentType.ratio.toFixed(5)} = `}
                  <strong>{formattedResult}</strong>
                  {` ${currentType.toUnit} (${currentType.formula})`}
                </>
              ) : (
                <>
                  {`1 ${currentType.fromUnit} = `}
                  <strong>{currentType.ratio.toFixed(5)}</strong>
                  {` ${currentType.toUnit} (${currentType.formula})`}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
