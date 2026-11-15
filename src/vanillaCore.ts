type ModeTuple = [
  fromUnit: string,
  toUnit: string,
  ratio: number,
  formula: string,
  route: string,
  oppositeId: string
];

const MODES: Record<string, ModeTuple> = {
  'cm-to-inches': ['cm', 'in', 1 / 2.54, 'in = cm / 2.54', '/', 'inches-to-cm'],
  'inches-to-cm': ['in', 'cm', 2.54, 'cm = in * 2.54', '/inches-to-cm/', 'cm-to-inches'],
  'feet-to-cm': ['ft', 'cm', 30.48, 'cm = ft * 30.48', '/feet-to-cm/', 'cm-to-feet'],
  'cm-to-feet': ['cm', 'ft', 1 / 30.48, 'ft = cm / 30.48', '/cm-to-feet/', 'feet-to-cm'],
  'meters-to-feet': ['m', 'ft', 3.2808399, 'ft = m * 3.28084', '/meters-to-feet/', 'feet-to-meters'],
  'feet-to-meters': ['ft', 'm', 0.3048, 'm = ft * 0.3048', '/feet-to-meters/', 'meters-to-feet'],
  'mm-to-inches': ['mm', 'in', 1 / 25.4, 'in = mm / 25.4', '/mm-to-inches/', 'inches-to-mm'],
  'inches-to-mm': ['in', 'mm', 25.4, 'mm = in * 25.4', '/inches-to-mm/', 'mm-to-inches'],
};

const PRESETS: Record<string, [string, string]> = {
  '/90-cm-to-inches/': ['cm-to-inches', '90'],
  '/150-cm-to-inches/': ['cm-to-inches', '150'],
  '/170-cm-to-inches/': ['cm-to-inches', '170'],
  '/180-cm-to-inches/': ['cm-to-inches', '180'],
  '/200-cm-to-inches/': ['cm-to-inches', '200'],
  '/5-feet-in-cm/': ['feet-to-cm', '5'],
  '/6-feet-in-cm/': ['feet-to-cm', '6'],
};

const SITE_PAGES: [string, string][] = [
  ['CM to Inches', '/'],
  ['Inches → CM', '/inches-to-cm/'],
  ['Feet → CM', '/feet-to-cm/'],
  ['CM → Feet', '/cm-to-feet/'],
  ['Meters → Feet', '/meters-to-feet/'],
  ['Feet → Meters', '/feet-to-meters/'],
  ['MM → Inches', '/mm-to-inches/'],
  ['Inches → MM', '/inches-to-mm/'],
  ['Paper Sizes (A0–A15)', '/paper-size-in-inches/'],
  ['Ring & Shoe Size (CM)', '/ring-shoe-size-cm/'],
  ['Unit Chart', '/unit-conversion-chart/'],
];

const CONSENT_KEY = 'cmtoinches_cookie_consent_v1';
const FONT_TIERS = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'sm:text-sm', 'sm:text-base', 'sm:text-lg', 'sm:text-2xl', 'sm:text-3xl'];

function sizeClassFor(len: number): [string, string] {
  if (len > 18) return ['text-xs', 'sm:text-sm'];
  if (len > 13) return ['text-sm', 'sm:text-base'];
  if (len > 9) return ['text-base', 'sm:text-lg'];
  if (len > 6) return ['text-xl', 'sm:text-2xl'];
  return ['text-2xl', 'sm:text-3xl'];
}

function setFontTier(el: HTMLElement | null, len: number) {
  if (!el) return;
  for (let i = 0; i < FONT_TIERS.length; i++) el.classList.remove(FONT_TIERS[i]);
  const [m, d] = sizeClassFor(len);
  el.classList.add(m, d);
}

function getFractional(dec: number): string {
  if (dec <= 0) return '0 in';
  const w = Math.floor(dec);
  const s = Math.round((dec - w) * 16);
  if (s === 0) return `${w} in`;
  if (s === 16) return `${w + 1} in`;
  let n = s;
  let d = 16;
  if (n % 8 === 0) { n /= 8; d /= 8; }
  else if (n % 4 === 0) { n /= 4; d /= 4; }
  else if (n % 2 === 0) { n /= 2; d /= 2; }
  return w === 0 ? `${n}/${d} in` : `${w} ${n}/${d} in`;
}

function applyConsent(choice: 'all' | 'essential') {
  const g = choice === 'all' ? 'granted' : 'denied';
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      ad_storage: g,
      ad_user_data: g,
      ad_personalization: g,
      analytics_storage: g,
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
  }
}

let bootPromise: Promise<void> | null = null;
function handoffToReact(targetPath?: string) {
  const w = window as Window & {
    __REACT_HYDRATED__?: boolean;
    __PREHYDRATE_INPUT__?: string;
    __PREHYDRATE_MODE__?: string;
    __PENDING_ROUTE__?: string;
  };
  if (w.__REACT_HYDRATED__) return;
  const prevPath = window.location.pathname;
  const inp = document.getElementById('converter-input') as HTMLInputElement | null;
  const sel = document.getElementById('conversion-mode-select') as HTMLSelectElement | null;
  if (inp && inp.value) w.__PREHYDRATE_INPUT__ = inp.value;
  if (sel && sel.value && (!targetPath || targetPath === prevPath)) {
    w.__PREHYDRATE_MODE__ = sel.value;
  }
  if (targetPath) {
    w.__PENDING_ROUTE__ = targetPath;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ path: targetPath }, '', targetPath);
    }
  }
  if (!bootPromise) {
    bootPromise = import('./reactBoot').then((m) => m.bootReact());
  }
}

export function initVanillaCore() {
  const w = window as Window & {
    __VANILLA_ACTIVE__?: boolean;
    __REACT_HYDRATED__?: boolean;
    __cmtoinchesOpenConsent?: () => void;
  };
  if (w.__VANILLA_ACTIVE__ || w.__REACT_HYDRATED__) return;
  w.__VANILLA_ACTIVE__ = true;

  // 1. Handle programmatic /cm-to-inches redirects cleanly
  let normPath = window.location.pathname;
  if (normPath && !normPath.endsWith('/') && !normPath.includes('.')) normPath += '/';
  const preset = PRESETS[normPath];
  if (normPath.startsWith('/cm-to-inches') || preset) {
    window.history.replaceState({ path: '/' }, '', '/');
  }

  // 2. Converter + Dual Adaptive Ruler State
  const inp = document.getElementById('converter-input') as HTMLInputElement | null;
  const sel = document.getElementById('conversion-mode-select') as HTMLSelectElement | null;
  const resEl = document.getElementById('converter-result');
  const outBox = document.getElementById('converter-output-box');

  if (inp && resEl) {
    let modeId = preset ? preset[0] : (sel ? sel.value : 'cm-to-inches');
    if (preset && sel) sel.value = modeId;
    if (preset) inp.value = preset[1];

    let zoomPreset: 'auto' | '10' | '20' | '50' | '100' = 'auto';
    let lastTicksKey = '';
    let isDragging = false;
    let copyTimer: number | undefined;

    const fromTicksEl = document.getElementById('tape-from-ticks');
    const toTicksEl = document.getElementById('tape-to-ticks');
    const needleEl = document.getElementById('tape-needle');
    const needleFromVal = document.getElementById('needle-from-val');
    const needleFromUnit = document.getElementById('needle-from-unit');
    const needleToVal = document.getElementById('needle-to-val');
    const needleToUnit = document.getElementById('needle-to-unit');
    const needleFrac = document.getElementById('needle-frac-wrap');
    const warnEl = document.getElementById('tape-out-warning');
    const infoCard = document.getElementById('converter-info-card');
    const fracValEl = document.getElementById('converter-fraction-val');
    const formulaValEl = document.getElementById('converter-formula-val');
    const zoomBtns = Array.from(document.querySelectorAll('#tape-zoom-controls [data-zoom]')) as HTMLButtonElement[];
    const autoBtn = document.querySelector('#tape-zoom-controls [data-zoom="auto"]') as HTMLButtonElement | null;

    const renderTicks = (maxScale: number, ratio: number, toUnit: string) => {
      const key = `${maxScale}:${modeId}`;
      if (key === lastTicksKey) return;
      lastTicksKey = key;

      if (fromTicksEl) {
        const majorInt = maxScale / 10;
        let html = '<div class="rt-grid"></div>';
        for (let i = 0; i <= 10; i++) {
          const u = Number((i * majorInt).toFixed(2));
          const isRed = i === 0 || i === 5 || i === 10;
          html += `<div class="rt-m" style="left:${i * 10}%">${isRed ? '<b></b>' : '<i></i>'}<span class="${isRed ? 'rt-lbl rt-lbl-r' : 'rt-lbl'}">${u}</span></div>`;
        }
        fromTicksEl.innerHTML = html;
      }

      if (toTicksEl) {
        const maxT = maxScale * ratio;
        if (maxT <= 0) { toTicksEl.innerHTML = ''; return; }
        let maj = 1;
        let min = 0.2;
        if (maxT <= 1) { maj = 0.1; min = 0.02; }
        else if (maxT <= 4) { maj = 0.5; min = 0.1; }
        else if (maxT <= 10) { maj = 1; min = 0.2; }
        else if (maxT <= 25) { maj = 2.5; min = 0.5; }
        else if (maxT <= 60) { maj = 5; min = 1; }
        else if (maxT <= 150) { maj = 10; min = 2; }
        else if (maxT <= 350) { maj = 25; min = 5; }
        else if (maxT <= 800) { maj = 50; min = 10; }
        else { maj = 100; min = 20; }

        const steps = Math.min(Math.floor(maxT / min), 120);
        let html = '';
        for (let s = 0; s <= steps; s++) {
          const v = s * min;
          if (v > maxT + 0.0001) break;
          const pct = Math.round(((v / maxT) * 100) * 100) / 100;
          if (pct > 100.01) break;
          const rem = v % maj;
          const isMaj = Math.abs(rem) < 0.001 || Math.abs(rem - maj) < 0.001;
          if (isMaj) {
            html += `<div class="rb-m" style="left:${pct}%"><span class="rb-lbl">${Number(v.toFixed(2))}${toUnit === 'in' ? '"' : ''}</span><i></i></div>`;
          } else {
            html += `<i class="rb" style="left:${pct}%"></i>`;
          }
        }
        toTicksEl.innerHTML = html;
      }
    };

    const updateModeUI = () => {
      const m = MODES[modeId] || MODES['cm-to-inches'];
      const [fromU, toU] = m;
      const setTxt = (id: string, txt: string) => { const e = document.getElementById(id); if (e) e.textContent = txt; };
      setTxt('converter-in-label', `Centimeters / ${fromU.toUpperCase()} input`);
      setTxt('converter-out-label', `Inches / ${toU.toUpperCase()} output`);
      setTxt('converter-from-badge', fromU);
      setTxt('converter-to-badge', toU);
      setTxt('tape-from-unit-lbl', fromU.toUpperCase());
      setTxt('tape-to-unit-lbl', toU.toUpperCase());
      if (needleFromUnit) needleFromUnit.textContent = fromU.toUpperCase();
      if (needleToUnit) needleToUnit.textContent = toU.toUpperCase();
      setTxt('tape-limit-unit', `100 ${fromU}`);
      setTxt('tape-reset-100-btn', `Set to 100 ${fromU}`);
      const swap = document.getElementById('converter-swap-btn');
      if (swap) swap.title = `Swap direction (${fromU} ⇄ ${toU})`;
      if (sel) sel.value = modeId;
    };

    const syncUI = () => {
      if (w.__REACT_HYDRATED__) return;
      const m = MODES[modeId] || MODES['cm-to-inches'];
      const [fromU, toU, ratio, formula] = m;
      const raw = inp.value;
      const p = parseFloat(raw);
      const valid = !isNaN(p) && isFinite(p) && raw.trim() !== '';
      const num = valid ? Math.max(0, p) : 0;
      const resNum = num * ratio;
      const formatted = (!valid || num === 0)
        ? '0'
        : resNum.toLocaleString('en-GB', { useGrouping: false, maximumFractionDigits: 4 });

      resEl.textContent = formatted;
      setFontTier(inp, raw.length);
      setFontTier(outBox, formatted.length);

      const outOfScale = num > 100 || num < 0;
      const autoScale = num <= 10 ? 10 : num <= 20 ? 20 : num <= 50 ? 50 : 100;
      const maxScale = zoomPreset === 'auto' ? autoScale : parseInt(zoomPreset, 10);

      if (autoBtn) autoBtn.textContent = `Auto (${maxScale})`;
      for (const b of zoomBtns) {
        const active = b.dataset.zoom === zoomPreset;
        b.className = `px-3 py-1 rounded-lg text-[17px] font-mono font-black transition-all cursor-pointer ${
          active ? 'bg-blue-600 text-white shadow-xs scale-105' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
        }`;
      }

      if (warnEl) {
        warnEl.classList.toggle('hidden', !outOfScale);
        warnEl.classList.toggle('flex', outOfScale);
      }

      renderTicks(maxScale, ratio, toU);

      const sFrom = outOfScale ? 0 : num;
      const sTo = outOfScale ? 0 : num * ratio;
      const pct = outOfScale ? 0 : Math.min(100, Math.max(0, (sFrom / maxScale) * 100));

      if (needleEl) needleEl.style.left = `calc(14px + (100% - 14px) * ${pct / 100})`;
      if (needleFromVal) needleFromVal.textContent = String(sFrom);
      if (needleToVal) {
        needleToVal.textContent = Number.isInteger(sTo)
          ? String(sTo)
          : sTo.toFixed(ratio >= 10 ? 1 : (ratio >= 1 ? 2 : 3));
      }
      if (needleFrac) {
        if (toU === 'in' && sTo > 0) {
          needleFrac.textContent = `(${getFractional(sTo)})`;
          needleFrac.classList.remove('hidden');
        } else {
          needleFrac.classList.add('hidden');
        }
      }

      if (infoCard) {
        if (num > 0) {
          infoCard.classList.remove('hidden');
          infoCard.classList.add('grid');
          if (fracValEl) {
            fracValEl.innerHTML = toU === 'in'
              ? `<strong>${getFractional(resNum)}</strong> (Nearest 1/16")`
              : fromU === 'in'
              ? `Input is precisely <strong>${getFractional(num)}</strong>`
              : 'Applied on imperial outputs';
          }
          if (formulaValEl) {
            formulaValEl.innerHTML = `${raw} ${fromU} * ${ratio.toFixed(5)} = <strong>${formatted}</strong> ${toU}, Formula: ${formula}`;
          }
        } else {
          infoCard.classList.add('hidden');
          infoCard.classList.remove('grid');
        }
      }
    };

    inp.addEventListener('input', () => {
      if (w.__REACT_HYDRATED__) return;
      const clean = inp.value.replace(/,/g, '.');
      if (clean === '' || /^\d*\.?\d*$/.test(clean)) {
        inp.value = clean.slice(0, 25);
        syncUI();
      } else {
        inp.value = clean.replace(/[^\d.]/g, '').slice(0, 25);
        syncUI();
      }
    });

    if (sel) {
      sel.addEventListener('change', () => {
        if (w.__REACT_HYDRATED__) return;
        const nextMode = MODES[sel.value];
        if (nextMode) {
          modeId = sel.value;
          updateModeUI();
          syncUI();
          if (window.location.pathname !== nextMode[4]) {
            handoffToReact(nextMode[4]);
          }
        }
      });
    }

    const swapBtn = document.getElementById('converter-swap-btn');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        if (w.__REACT_HYDRATED__) return;
        const old = MODES[modeId] || MODES['cm-to-inches'];
        const p = parseFloat(inp.value);
        const curNum = !isNaN(p) && isFinite(p) && inp.value.trim() !== '' ? Math.max(0, p) : 0;
        modeId = old[5];
        if (curNum > 0) inp.value = (curNum * old[2]).toFixed(2);
        updateModeUI();
        syncUI();
      });
    }

    const copyBtn = document.getElementById('converter-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (w.__REACT_HYDRATED__) return;
        const txt = resEl.textContent || '0';
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(txt).catch(() => {});
        } else {
          try {
            const ta = document.createElement('textarea');
            ta.value = txt;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          } catch (_) {}
        }
        copyBtn.className = 'min-h-[40px] px-4 py-2 rounded-lg sm:rounded-xl font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 select-none bg-emerald-600 text-white shadow-md shadow-emerald-200';
        const svg = copyBtn.querySelector('svg');
        if (svg) svg.innerHTML = '<path d="M20 6 9 17l-5-5"/>';
        if (copyTimer) window.clearTimeout(copyTimer);
        copyTimer = window.setTimeout(() => {
          copyBtn.className = 'min-h-[40px] px-4 py-2 rounded-lg sm:rounded-xl font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 select-none bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg shadow-blue-200';
          if (svg) svg.innerHTML = '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>';
        }, 2000);
      });
    }

    const clearBtn = document.getElementById('converter-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (w.__REACT_HYDRATED__) return;
        inp.value = '';
        syncUI();
      });
    }

    for (const btn of zoomBtns) {
      btn.addEventListener('click', () => {
        if (w.__REACT_HYDRATED__) return;
        const z = btn.dataset.zoom as 'auto' | '10' | '20' | '50' | '100';
        if (z) { zoomPreset = z; syncUI(); }
      });
    }

    const reset100Btn = document.getElementById('tape-reset-100-btn');
    if (reset100Btn) {
      reset100Btn.addEventListener('click', () => {
        if (w.__REACT_HYDRATED__) return;
        inp.value = '100';
        syncUI();
      });
    }

    const tapeEl = document.getElementById('tape-ruler');
    if (tapeEl) {
      const calcMaxScale = () => {
        const p = parseFloat(inp.value);
        const num = !isNaN(p) && isFinite(p) && inp.value.trim() !== '' ? Math.max(0, p) : 0;
        const autoS = num <= 10 ? 10 : num <= 20 ? 20 : num <= 50 ? 50 : 100;
        return zoomPreset === 'auto' ? autoS : parseInt(zoomPreset, 10);
      };
      const scrub = (clientX: number) => {
        const rect = tapeEl.getBoundingClientRect();
        const maxS = calcMaxScale();
        const clamped = Math.max(0, Math.min(rect.width, clientX - rect.left));
        const snapped = Math.max(0, Math.min(maxS, Math.round(((clamped / rect.width) * maxS) / 0.1) * 0.1));
        inp.value = Number(snapped.toFixed(1)).toString();
        syncUI();
      };
      tapeEl.addEventListener('pointerdown', (e) => {
        if (w.__REACT_HYDRATED__) return;
        isDragging = true;
        try { tapeEl.setPointerCapture(e.pointerId); } catch (_) {}
        scrub(e.clientX);
      });
      tapeEl.addEventListener('pointermove', (e) => {
        if (!w.__REACT_HYDRATED__ && isDragging) scrub(e.clientX);
      });
      tapeEl.addEventListener('pointerup', (e) => {
        isDragging = false;
        try { tapeEl.releasePointerCapture(e.pointerId); } catch (_) {}
      });
      tapeEl.addEventListener('wheel', (e) => {
        if (w.__REACT_HYDRATED__) return;
        e.preventDefault();
        const p = parseFloat(inp.value);
        const cur = !isNaN(p) && isFinite(p) && inp.value.trim() !== '' ? Math.max(0, p) : 0;
        const maxS = calcMaxScale();
        const d = (e.deltaY < 0 || e.deltaX > 0) ? 0.1 : -0.1;
        const next = Math.max(0, Math.min(maxS, Math.round((cur + d) * 10) / 10));
        inp.value = Number(next.toFixed(1)).toString();
        syncUI();
      }, { passive: false });
    }

    if (preset) { updateModeUI(); syncUI(); }
  }

  // 3. FAQ Accordion Toggles (reads collapsed answers directly from FAQPage JSON-LD so HTML stays compact)
  const faqBtns = Array.from(document.querySelectorAll('[data-faq-btn]')) as HTMLButtonElement[];
  let faqAnswers: string[] | null = null;
  const getFaqAnswer = (idx: number): string => {
    if (!faqAnswers) {
      faqAnswers = [];
      const sc = document.querySelector('#faq-section script[type="application/ld+json"]');
      if (sc && sc.textContent) {
        try {
          const data = JSON.parse(sc.textContent);
          if (Array.isArray(data?.mainEntity)) {
            faqAnswers = data.mainEntity.map((q: { acceptedAnswer?: { text?: string } }) => q?.acceptedAnswer?.text || '');
          }
        } catch (_) {}
      }
    }
    return faqAnswers[idx] || '';
  };
  for (const btn of faqBtns) {
    btn.addEventListener('click', () => {
      if (w.__REACT_HYDRATED__) return;
      const idx = btn.dataset.faqBtn;
      const nextOpen = btn.getAttribute('aria-expanded') !== 'true';
      for (const b of faqBtns) {
        const match = nextOpen && b.dataset.faqBtn === idx;
        b.setAttribute('aria-expanded', match ? 'true' : 'false');
        const panel = document.querySelector(`[data-faq-panel="${b.dataset.faqBtn}"]`) as HTMLElement | null;
        if (panel) {
          if (match && !panel.textContent) {
            panel.textContent = getFaqAnswer(parseInt(b.dataset.faqBtn || '0', 10));
          }
          panel.classList.toggle('hidden', !match);
        }
      }
    });
  }

  const ensureDynCss = () => {
    if (document.getElementById('vc-ui')) return;
    const st = document.createElement('style');
    st.id = 'vc-ui';
    st.textContent =
      '.vc-drw{width:100%;background:#f8fafc;border:2px solid #e2e8f0;border-radius:1rem;padding:1rem;margin-top:.25rem;box-shadow:inset 0 2px 4px rgba(0,0,0,.05)}' +
      '.vc-drw-g{display:grid;grid-template-columns:1fr;gap:.375rem;margin-top:.75rem}@media(min-width:640px){.vc-drw-g{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
      '.vc-drw-a{display:flex;align-items:center;padding:.625rem .875rem;border-radius:.75rem;font-size:.925rem;background:#fff;color:#1e293b;border:1px solid rgba(226,232,240,.8);text-decoration:none}' +
      '.vc-drw-a.act{background:#2563eb;color:#fff;border-color:#2563eb;box-shadow:0 4px 6px -1px #dbeafe}' +
      '.vc-cc{position:fixed;bottom:.75rem;left:.75rem;right:.75rem;z-index:50;background:#fff;border:2px solid #e2e8f0;border-radius:1rem;box-shadow:0 20px 25px -5px rgba(0,0,0,.1);padding:1rem;color:#1e293b}' +
      '@media(min-width:640px){.vc-cc{left:auto;right:1.25rem;max-width:28rem;padding:1.25rem}}' +
      '.vc-cc-h{display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem;margin-bottom:.5rem}' +
      '.vc-cc-b{flex:1;min-height:40px;padding:.5rem 1rem;border-radius:.75rem;font-size:.8125rem;cursor:pointer;white-space:nowrap}';
    document.head.appendChild(st);
  };

  // 4. Mobile Menu Toggle
  const menuBtn = document.querySelector('button[aria-label="Toggle Menu"]') as HTMLButtonElement | null;
  if (menuBtn) {
    let drawer: HTMLElement | null = null;
    menuBtn.addEventListener('click', () => {
      if (w.__REACT_HYDRATED__) return;
      const nextOpen = menuBtn.getAttribute('aria-expanded') !== 'true';
      menuBtn.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
      const svg = menuBtn.querySelector('svg');
      if (svg) {
        svg.innerHTML = nextOpen
          ? '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
          : '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
      }
      if (!drawer) {
        ensureDynCss();
        const wrap = document.querySelector('#header-navigation > div');
        if (wrap) {
          drawer = document.createElement('nav');
          drawer.setAttribute('aria-label', 'Mobile Navigation');
          drawer.className = 'vc-drw lg:hidden';
          const curP = window.location.pathname;
          drawer.innerHTML = `<div class="px-1 text-xs uppercase tracking-wider text-slate-400">All Converters &amp; Pages</div><div class="vc-drw-g">${
            SITE_PAGES.map(([label, href]) => {
              const act = curP === href;
              return `<a href="${href}" class="vc-drw-a${act ? ' act' : ''}"><span>${label}</span></a>`;
            }).join('')
          }</div>`;
          wrap.appendChild(drawer);
        }
      }
      if (drawer) drawer.classList.toggle('hidden', !nextOpen);
    });
  }

  // 5. UK GDPR Cookie Consent Banner
  let consentBox: HTMLElement | null = null;
  const openConsent = () => {
    if (w.__REACT_HYDRATED__) return;
    if (!consentBox) {
      ensureDynCss();
      consentBox = document.createElement('div');
      consentBox.setAttribute('role', 'dialog');
      consentBox.setAttribute('aria-live', 'polite');
      consentBox.setAttribute('aria-label', 'UK & EU Cookie Consent Preferences');
      consentBox.className = 'vc-cc';
      consentBox.innerHTML = `<div class="vc-cc-h"><div class="flex items-center gap-2"><svg viewBox="0 0 24 24" class="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg><h2 class="text-sm font-bold text-slate-900">Privacy &amp; Cookie Settings (UK GDPR)</h2></div><button type="button" data-consent="essential" aria-label="Dismiss with essential storage only" class="text-slate-400 p-1 cursor-pointer"><svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button></div><p class="text-xs text-slate-600 leading-relaxed mb-3">cmtoinches.uk performs all conversions locally in your browser. With your consent, Google AdSense uses cookies to serve relevant ads and support this free tool. Review our <a href="/privacy-policy/" class="text-blue-600 underline">Privacy Policy</a> and <a href="/cookie-policy/" class="text-blue-600 underline">Cookie Policy</a>.</p><div class="flex flex-wrap items-center gap-2"><button type="button" data-consent="all" class="vc-cc-b bg-blue-600 text-white font-bold">Accept All</button><button type="button" data-consent="essential" class="vc-cc-b bg-slate-100 text-slate-800 border border-slate-300 font-semibold">Essential Only</button></div>`;
      consentBox.addEventListener('click', (e) => {
        const btn = (e.target as HTMLElement).closest('[data-consent]') as HTMLElement | null;
        if (!btn) return;
        const ch = btn.dataset.consent as 'all' | 'essential';
        try { window.localStorage.setItem(CONSENT_KEY, ch); } catch (_) {}
        applyConsent(ch);
        if (consentBox) consentBox.classList.add('hidden');
      });
      document.body.appendChild(consentBox);
    }
    consentBox.classList.remove('hidden');
  };

  w.__cmtoinchesOpenConsent = openConsent;
  window.addEventListener('cmtoinches-open-cookie-consent', openConsent);
  const cookieFooterBtn = document.querySelector('#footer button');
  if (cookieFooterBtn) {
    cookieFooterBtn.addEventListener('click', () => {
      if (!w.__REACT_HYDRATED__) openConsent();
    });
  }

  try {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === 'all' || saved === 'essential') {
      applyConsent(saved);
    } else {
      openConsent();
    }
  } catch (_) {
    openConsent();
  }

  // 6. Delegated Internal Route Navigation -> Lazy-Load React Shell Only When Switching Pages
  document.addEventListener('click', (e) => {
    if (w.__REACT_HYDRATED__) return;
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null;
    if (!anchor) return;
    const rawHref = anchor.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:')) return;
    let url: URL;
    try { url = new URL(anchor.href, window.location.origin); } catch (_) { return; }
    if (url.origin !== window.location.origin || anchor.target === '_blank') return;

    e.preventDefault();
    if (consentBox && !consentBox.classList.contains('hidden')) consentBox.classList.add('hidden');
    if (url.pathname === window.location.pathname && url.pathname === '/') {
      window.scrollTo(0, 0);
      return;
    }
    handoffToReact(url.pathname);
  });

  window.addEventListener('popstate', () => {
    if (!w.__REACT_HYDRATED__) handoffToReact();
  });
}
