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
  ['Paper Size in Inches', '/paper-size-in-inches/'],
  ['Ring Size in CM', '/ring-size-in-cm/'],
  ['Unit Chart', '/unit-conversion-chart/'],
];

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
  const toolEl = document.getElementById('converter-tool');
  const activeMode = toolEl?.getAttribute('data-mode') || '';
  if (inp && inp.value) w.__PREHYDRATE_INPUT__ = inp.value;
  if (activeMode && (!targetPath || targetPath === prevPath)) {
    w.__PREHYDRATE_MODE__ = activeMode;
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
  };
  if (w.__VANILLA_ACTIVE__ || w.__REACT_HYDRATED__) return;
  w.__VANILLA_ACTIVE__ = true;

  // 1. Handle programmatic & retired slug redirects cleanly
  let normPath = window.location.pathname;
  if (normPath && !normPath.endsWith('/') && !normPath.includes('.')) normPath += '/';
  const preset = PRESETS[normPath];
  if (normPath.startsWith('/cm-to-inches') || preset) {
    window.history.replaceState({ path: '/' }, '', '/');
  } else if (normPath === '/ring-shoe-size-cm/') {
    window.history.replaceState({ path: '/ring-size-in-cm/' }, '', '/ring-size-in-cm/');
    handoffToReact('/ring-size-in-cm/');
    return;
  }

  // 2. Converter State (Zero scale limits, always-visible formula card)
  const toolEl = document.getElementById('converter-tool');
  const inp = document.getElementById('converter-input') as HTMLInputElement | null;
  const resEl = document.getElementById('converter-result');
  const outBox = document.getElementById('converter-output-box');

  if (inp && resEl) {
    let modeId = preset ? preset[0] : (toolEl?.getAttribute('data-mode') || 'cm-to-inches');
    if (preset) inp.value = preset[1];

    let copyTimer: number | undefined;
    const fracValEl = document.getElementById('converter-fraction-val');
    const formulaValEl = document.getElementById('converter-formula-val');

    const updateModeUI = () => {
      const m = MODES[modeId] || MODES['cm-to-inches'];
      const [fromU, toU] = m;
      const setTxt = (id: string, txt: string) => {
        const e = document.getElementById(id);
        if (e) e.textContent = txt;
      };
      setTxt('converter-in-label', `Enter ${fromU.toUpperCase()} value`);
      setTxt('converter-out-label', `Result in ${toU.toUpperCase()}`);
      setTxt('converter-from-badge', fromU);
      setTxt('converter-to-badge', toU);
      const swap = document.getElementById('converter-swap-btn');
      if (swap) swap.title = `Swap direction (${fromU} ⇄ ${toU})`;
      if (toolEl) toolEl.setAttribute('data-mode', modeId);
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

      if (fracValEl) {
        fracValEl.innerHTML = toU === 'in'
          ? `<strong>${getFractional(resNum)}</strong> (Nearest 1/16")`
          : fromU === 'in'
          ? `Input is precisely <strong>${getFractional(num)}</strong>`
          : 'Applied on imperial inch conversions';
      }
      if (formulaValEl) {
        formulaValEl.innerHTML = num > 0
          ? `${raw} ${fromU} × ${ratio.toFixed(5)} = <strong>${formatted}</strong> ${toU} (${formula})`
          : `1 ${fromU} = <strong>${ratio.toFixed(5)}</strong> ${toU} (${formula})`;
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
        copyBtn.className = 'min-h-[40px] px-4 py-2 rounded-lg sm:rounded-xl font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 select-none whitespace-nowrap bg-emerald-600 text-white shadow-md shadow-emerald-200';
        const svg = copyBtn.querySelector('svg');
        const lbl = copyBtn.querySelector('span');
        if (svg) svg.innerHTML = '<path d="M20 6 9 17l-5-5"/>';
        if (lbl) lbl.textContent = 'COPIED';
        if (copyTimer) window.clearTimeout(copyTimer);
        copyTimer = window.setTimeout(() => {
          copyBtn.className = 'min-h-[40px] px-4 py-2 rounded-lg sm:rounded-xl font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 select-none whitespace-nowrap bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg shadow-blue-200';
          if (svg) svg.innerHTML = '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>';
          if (lbl) lbl.textContent = 'COPY RESULT';
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

    if (preset) {
      updateModeUI();
      syncUI();
    }
  }

  const ensureDynCss = () => {
    if (document.getElementById('vc-ui')) return;
    const st = document.createElement('style');
    st.id = 'vc-ui';
    st.textContent =
      '.vc-drw{width:100%;background:#f8fafc;border:2px solid #e2e8f0;border-radius:1rem;padding:1rem;margin-top:.25rem;box-shadow:inset 0 2px 4px rgba(0,0,0,.05)}' +
      '.vc-drw-g{display:grid;grid-template-columns:1fr;gap:.375rem;margin-top:.75rem}@media(min-width:640px){.vc-drw-g{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
      '.vc-drw-a{display:flex;align-items:center;padding:.625rem .875rem;border-radius:.75rem;font-size:.925rem;background:#fff;color:#1e293b;border:1px solid rgba(226,232,240,.8);text-decoration:none}' +
      '.vc-drw-a.act{background:#2563eb;color:#fff;border-color:#2563eb;box-shadow:0 4px 6px -1px #dbeafe}';
    document.head.appendChild(st);
  };

  // 3. Mobile Menu Toggle
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

  // 4. Delegated Internal Route Navigation -> Lazy-Load React Shell Only When Switching Pages
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
