import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  'inches-to-cm',
  'feet-to-cm',
  'cm-to-feet',
  'meters-to-feet',
  'feet-to-meters',
  'mm-to-inches',
  'inches-to-mm',
  'about-us',
  'contact-us',
  'privacy-policy',
  'terms-and-conditions',
  'disclaimer',
  'cookie-policy',
  'sitemap',
  'unit-conversion-chart',
  'paper-size-in-inches',
  'ring-shoe-size-cm'
];

const redirectRoutes = [
  'cm-to-inches',
  '90-cm-to-inches',
  '150-cm-to-inches',
  '170-cm-to-inches',
  '180-cm-to-inches',
  '200-cm-to-inches',
  '5-feet-in-cm',
  '6-feet-in-cm'
];

const metadata = {
  'cm-to-inches': {
    title: 'CM to Inches Converter',
    h1: 'CM to Inches Converter',
    description: 'Determine centimeter to inches instantly. Official 1cm = 2.54in standards guide.',
    formula: 'Inches = Centimeters ÷ 2.54',
    steps: [
      { name: 'Identify centimeters', text: 'Determine the value in centimeters (cm) you want to convert.' },
      { name: 'Divide by constant', text: 'Divide the centimeter value by the official standard ratio of 2.54.' },
      { name: 'Read imperial length', text: 'The result is the corresponding length in customary inches.' }
    ]
  },
  'inches-to-cm': {
    title: 'Inches to CM Converter (in → cm) – Dynamic Ruler Calculator',
    h1: 'Inches to CM Converter (Precise in → cm)',
    description: 'Convert inches to centimeters using our high-precision base-10 metrics translator.',
    formula: 'Centimeters = Inches × 2.54',
    steps: [
      { name: 'Identify inches', text: 'Determine the length in inches (in) to convert to the metric system.' },
      { name: 'Multiply by standard', text: 'Multiply your inches measurement by exactly 2.54 centimeters.' },
      { name: 'Review centimeter value', text: 'Read the resulting metric length in centimeters.' }
    ]
  },
  'feet-to-cm': {
    title: 'Feet to CM Converter (ft → cm) – Vertical Height Calculator',
    h1: 'Feet to CM Converter (Precise ft → cm)',
    description: 'Translate standard imperial feet measures directly to decimal centimeters. Ideal for UK passports.',
    formula: 'Centimeters = Feet × 30.48',
    steps: [
      { name: 'Input feet measure', text: 'Identify the total length or height measured in imperial feet.' },
      { name: 'Multiply by conversion index', text: 'Multiply the feet value by 30.48 to translate to centimeters.' },
      { name: 'Collect metric height', text: 'The final result represents the height or length in standard metric cm.' }
    ]
  },
  'cm-to-feet': {
    title: 'CM to Feet Converter (cm → ft) – Physical Statures Guide',
    h1: 'CM to Feet Converter (Precise cm → ft)',
    description: 'Convert metric centimeters to customary imperial feet layout. Check formulas on-page.',
    formula: 'Feet = Centimeters ÷ 30.48',
    steps: [
      { name: 'Read centimeter height', text: 'Locate the centimeter measure you wish to translate into feet.' },
      { name: 'Divide by metric constant', text: 'Divide the number of centimeters by 30.48.' },
      { name: 'Apply feet conversion', text: 'The answer yields the equivalent distance or stature in customary feet.' }
    ]
  },
  'meters-to-feet': {
    title: 'Meters to Feet Converter (m → ft) – Modern Metrology',
    h1: 'Meters to Feet Converter (Precise m → ft)',
    description: 'Convert meters to feet instantly with this accurate calculator. Clean charts included.',
    formula: 'Feet = Meters × 3.2808399',
    steps: [
      { name: 'Determine metric meters', text: 'Obtain the length or height measurement in SI unit meters (m).' },
      { name: 'Multiply by ratio', text: 'Multiply the meters value by the custom conversion index of 3.2808399.' },
      { name: 'Interpret imperial feet', text: 'The resulting sum is the equivalent dimension in standard feet.' }
    ]
  },
  'feet-to-meters': {
    title: 'Feet to Meters Converter (ft → m) – Technical Measurements',
    h1: 'Feet to Meters Converter (Precise ft → m)',
    description: 'Convert feet measurements into SI meters with a clear mathematical step solver.',
    formula: 'Meters = Feet ÷ 3.2808399',
    steps: [
      { name: 'State imperial feet', text: 'Specify the distance or structural length in customary feet.' },
      { name: 'Divide by metrological index', text: 'Divide the feet value by 3.2808399 to determine equivalent SI meters.' },
      { name: 'Collect output meters', text: 'Your result represents the standard metric system metric meters (m).' }
    ]
  },
  'mm-to-inches': {
    title: 'Millimeters to Inches Converter (mm → in) – Carpenter Standard',
    h1: 'Millimeters to Inches Converter (Precise mm → in)',
    description: 'Convert fine millimeters to traditional inches fractions. Suited for UK woodworking and fabric mills.',
    formula: 'Inches = Millimeters ÷ 25.4',
    steps: [
      { name: 'Observe millimeters', text: 'Obtain the millimeter measurement from your caliper or blueprint.' },
      { name: 'Apply division metric', text: 'Divide the millimeter value by 25.4 to locate the equivalent imperial fraction.' },
      { name: 'Gather customary inches', text: 'The result represents the length in fractions or decimals of an inch.' }
    ]
  },
  'inches-to-mm': {
    title: 'Inches to Millimeters Converter (in → mm) – Metalwork Precise',
    h1: 'Inches to Millimeters Converter (Precise in → mm)',
    description: 'Convert imperial inches directly to metric millimeter values instantly.',
    formula: 'Millimeters = Inches × 25.4',
    steps: [
      { name: 'Identify blueprint inches', text: 'Locate the imperial inches index that requires millimetrical precision.' },
      { name: 'Multiply by standard ratio', text: 'Multiply your inches calculation by exactly 25.4.' },
      { name: 'Establish millimeter output', text: 'The resulting number constitutes the precise dimension in standard millimeters.' }
    ]
  },
  'about-us': {
    title: 'About Us – Editorial Standards & Measurement Accuracy | cmtoinches.uk',
    h1: 'About Us – cmtoinches.uk',
    description: 'Learn how cmtoinches.uk is built and maintained, our local-first privacy architecture, and our editorial calibration against UK Weights and Measures standards.'
  },
  'contact-us': {
    title: 'Contact Us – Support & Measurement Feedback | cmtoinches.uk',
    h1: 'Contact Us',
    description: 'Send feedback, bug reports, or general enquiries to the cmtoinches.uk editorial team at support@cmtoinches.uk or via our online contact form.'
  },
  'privacy-policy': {
    title: 'Privacy Policy – UK GDPR & Cookie Compliance | cmtoinches.uk',
    h1: 'Privacy Policy',
    description: 'Review our UK GDPR and PECR Privacy Policy, client-side calculation guarantees, and Google AdSense consent controls.'
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions of Service – cmtoinches.uk',
    h1: 'Terms and Conditions',
    description: 'Read our calculator terms of use, precision guidance, and intellectual property notices for cmtoinches.uk.'
  },
  'disclaimer': {
    title: 'Measurement & Engineering Disclaimer – cmtoinches.uk',
    h1: 'Measurement & Engineering Disclaimer',
    description: 'Important verification guidance for UK architectural, carpentry, garment, and travel measurement conversions.'
  },
  'cookie-policy': {
    title: 'Cookie Policy – UK PECR & Consent Settings | cmtoinches.uk',
    h1: 'Cookie Policy',
    description: 'Transparent breakdown of essential local storage preferences and optional advertising cookies on cmtoinches.uk.'
  },
  'sitemap': {
    title: 'HTML Sitemap – cmtoinches.uk Tools & Reference Pages',
    h1: 'cmtoinches.uk Sitemap',
    description: 'Browse all active UK length converters, reference charts, and editorial policy pages on cmtoinches.uk.'
  },
  'unit-conversion-chart': {
    title: 'Master Unit Conversion Charts (1 to 1500) – CM, MM, Inches & Feet',
    h1: 'Master Unit Conversion Charts (1 to 1500) – CM, MM, Inches & Feet',
    description: 'Comprehensive UK length reference charts from 1 to 1500 for CM to Inches, Inches to CM, Feet to CM, MM to CM, MM to Inches, MM to Feet, CM to Feet, and Inches to MM.'
  },
  'paper-size-in-inches': {
    title: 'Paper Size Converter: A4, A3, A2, A1 & A0–A15 in Inches, CM & MM',
    h1: 'Paper Size Converter: A4, A3, A2, A1 & A0–A15 in Inches, CM & MM',
    description: 'Convert ISO paper sizes from A0 to A15 into inches, cm, mm, and 300 DPI print pixels. Exact A4 size in inches (8.27 x 11.69 in), A3, A2, and A1 dimensions.'
  },
  'ring-shoe-size-cm': {
    title: 'Ring, Wrist & UK Shoe Size to CM Converter | Ring Size Chart UK',
    h1: 'Ring, Wrist & UK Shoe Size to CM Converter (Ring Size Chart UK A–Z)',
    description: 'Convert finger circumference (mm/cm) to UK ring sizes (A–Z), print a home ring sizer, and convert foot length (cm/in) to UK child & adult shoe sizes.',
    steps: [
      { name: 'Wrap a paper strip around your finger', text: 'Cut a 6 mm strip of non-stretch paper, wrap it snugly at the base of the intended finger, and mark the overlap point.' },
      { name: 'Measure circumference in mm or cm', text: 'Lay the strip flat against a metric ruler to read finger circumference in millimetres or centimetres.' },
      { name: 'Match against the UK Ring Size Chart (A–Z)', text: 'Enter the circumference into the converter or read the nearest BS 6820 alphabetical UK ring size (A–Z), diameter, US, and EU equivalent.' }
    ]
  }
};

/**
 * Helper to unwrap or remove balanced CSS blocks matching a given prefix regex.
 * If mode === 'unwrap', replaces `@rule ... { INNER }` with `INNER`.
 * If mode === 'remove', removes `@rule ... { INNER }` completely.
 */
function processCssBlocks(css, prefixRegex, mode = 'unwrap') {
  let result = css;
  let match;
  const regex = new RegExp(prefixRegex.source, 'i');
  while ((match = regex.exec(result)) !== null) {
    const startIdx = match.index;
    const openBraceIdx = startIdx + match[0].length - 1;
    if (result[openBraceIdx] !== '{') break;
    let depth = 1;
    let i = openBraceIdx + 1;
    while (i < result.length && depth > 0) {
      if (result[i] === '{') depth++;
      else if (result[i] === '}') depth--;
      i++;
    }
    if (depth === 0) {
      const innerContent = result.slice(openBraceIdx + 1, i - 1);
      const replacement = mode === 'unwrap' ? innerContent : '';
      result = result.slice(0, startIdx) + replacement + result.slice(i);
    } else {
      break;
    }
  }
  return result;
}

/**
 * Transforms Tailwind v4 CSS into 100% Universal Cross-Browser CSS:
 * 1. Removes `@layer ...;` statement declarations and unwraps all `@layer <name> { ... }` blocks.
 * 2. Unwraps Tailwind v4's restrictive `@supports` gate around `--tw-*` custom property initializations.
 * 3. Removes `@supports (color:color-mix(...))` and `@supports (color:oklch(...))` blocks.
 * 4. Converts EVERY `oklch(...)` color (including inside `--color-*` CSS variables) to standard `#hex` / `rgb()`.
 * 5. Strips `in oklab` / `in oklch` from linear-gradient positions so all browsers render gradients.
 * 6. Expands CSS logical properties (`padding-inline`, `padding-block`, `margin-inline`, `margin-block`, `inset-block`)
 *    to standard physical properties (`padding-left/right`, `margin-left/right`, `top/bottom`).
 * 7. Unwraps `:where()` in `.space-y-*` and `.divide-*` selectors and adds `transform:` fallbacks for `translate:` / `scale:`.
 */
function makeCssUniversal(rawCss) {
  let css = rawCss;

  // 1. Remove standalone `@layer a, b, c;` declarations (without braces)
  css = css.replace(/@layer\s+[^{;]+;/gi, '');

  // 2. Unwrap all `@layer <name> { ... }` blocks in place (preserving cascade order)
  css = processCssBlocks(css, /@layer\s+[^{]+\{/i, 'unwrap');

  // 3. Unwrap Tailwind v4's `@supports ((-webkit-hyphens:none)...) { ... }` property initializer block
  css = processCssBlocks(css, /@supports\s*\(\(\(-webkit-hyphens:\s*none\)[^{]+\{/i, 'unwrap');
  css = processCssBlocks(css, /@supports\s*\(\(-webkit-hyphens:\s*none\)[^{]+\{/i, 'unwrap');

  // 4. Remove `@supports (color:color-mix(...))` and `@supports (color:oklch(...))` override blocks
  css = processCssBlocks(css, /@supports\s*\(color:\s*color-mix\([^{]+\{/i, 'remove');
  css = processCssBlocks(css, /@supports\s*\(color:\s*oklch\([^{]+\{/i, 'remove');

  // 5. Convert ALL `oklch(...)` occurrences (including inside `:root { --color-*: oklch(...) }`) to standard #hex / rgb()
  const oklchMatches = Array.from(new Set(css.match(/oklch\([^)]+\)/gi) || []));
  for (const oklchStr of oklchMatches) {
    try {
      const converted = esbuild.transformSync(`.x{color:${oklchStr}}`, {
        loader: 'css',
        target: ['chrome60', 'safari11', 'firefox60'],
        minify: true,
      }).code.trim();
      const m = converted.match(/\.x\{color:([^}]+)\}/);
      if (m && m[1]) {
        css = css.split(oklchStr).join(m[1]);
      }
    } catch (_) {}
  }

  // 6. Strip `in oklab` / `in oklch` / `in srgb` from gradient directions (`to bottom in oklab` -> `to bottom`)
  css = css.replace(/\s+in\s+(?:oklab|oklch|srgb|lab|lch)/gi, '');

  // 7. Convert 4-digit `#0000` transparent and 8-digit `#rrggbbaa` hex inside custom properties to `rgba(...)`
  css = css.replace(/#0000(?=[;,)\s}])/g, 'rgba(0,0,0,0)');
  css = css.replace(/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})(?=[;,)\s}])/g, (_, r, g, b, a) => {
    const rv = parseInt(r, 16);
    const gv = parseInt(g, 16);
    const bv = parseInt(b, 16);
    const av = Number((parseInt(a, 16) / 255).toFixed(2));
    return `rgba(${rv},${gv},${bv},${av})`;
  });

  // 8. Expand CSS logical properties to universal physical properties
  css = css
    .replace(/padding-inline:([^;}]+)/g, 'padding-left:$1;padding-right:$1')
    .replace(/padding-block:([^;}]+)/g, 'padding-top:$1;padding-bottom:$1')
    .replace(/margin-inline:([^;}]+)/g, 'margin-left:$1;margin-right:$1')
    .replace(/margin-block:([^;}]+)/g, 'margin-top:$1;margin-bottom:$1')
    .replace(/margin-block-start:([^;}]+)/g, 'margin-top:$1')
    .replace(/margin-block-end:([^;}]+)/g, 'margin-bottom:$1')
    .replace(/inset-block:([^;}]+)/g, 'top:$1;bottom:$1')
    .replace(/border-inline-style:([^;}]+)/g, 'border-left-style:$1;border-right-style:$1')
    .replace(/border-inline-width:([^;}]+)/g, 'border-left-width:$1;border-right-width:$1')
    .replace(/border-inline-color:([^;}]+)/g, 'border-left-color:$1;border-right-color:$1');

  // 9. Unwrap `:where(...)` in `.space-y-*` and `.divide-*` so older browsers apply vertical spacing and table dividers
  css = css.replace(/:where\((\.(?:[a-z]+\\:)?(?:space-y|divide-y|divide-slate)[^)]+)\)/g, '$1');

  // 10. Add standard `transform:` fallbacks for individual `translate:` and `scale:` properties
  css = css
    .replace(/translate:var\(--tw-translate-x\)\s*var\(--tw-translate-y\)/g, 'transform:translate(var(--tw-translate-x,0),var(--tw-translate-y,0));translate:var(--tw-translate-x) var(--tw-translate-y)')
    .replace(/scale:var\(--tw-scale-x\)\s*var\(--tw-scale-y\)/g, 'transform:scale(var(--tw-scale-x,1),var(--tw-scale-y,1));scale:var(--tw-scale-x) var(--tw-scale-y)');

  // 11. Run esbuild CSS transformer with legacy browser targets to downlevel media ranges, inset, and vendor prefixes
  const transformed = esbuild.transformSync(css, {
    loader: 'css',
    target: ['chrome60', 'safari11', 'firefox60', 'edge79', 'ios11'],
    minify: true,
  });

  // 12. Remove `@property` declarations at the end so legacy CSS parsers never choke on unknown at-rules
  let finalCss = transformed.code.replace(/@property\s+--[^{]+\{[^}]*\}/gi, '').trim();

  return finalCss;
}

/**
 * Splits minified top-level CSS into AST statements { raw, selector, body, atRule }
 */
function splitCssStatements(css) {
  const statements = [];
  let i = 0;
  const len = css.length;
  while (i < len) {
    while (i < len && /\s/.test(css[i])) i++;
    if (i >= len) break;
    const start = i;
    let inString = null;
    while (i < len) {
      const ch = css[i];
      if (inString) {
        if (ch === '\\') i++;
        else if (ch === inString) inString = null;
      } else if (ch === '"' || ch === "'") {
        inString = ch;
      } else if (ch === '{') {
        const header = css.slice(start, i).trim();
        let depth = 1;
        i++;
        while (i < len && depth > 0) {
          const c = css[i];
          if (inString) {
            if (c === '\\') i++;
            else if (c === inString) inString = null;
          } else if (c === '"' || c === "'") {
            inString = c;
          } else if (c === '{') depth++;
          else if (c === '}') depth--;
          i++;
        }
        const body = css.slice(start + header.length + 1, i - 1);
        statements.push({
          raw: css.slice(start, i),
          header,
          body,
          isAtRule: header.startsWith('@'),
        });
        break;
      } else if (ch === ';') {
        i++;
        statements.push({ raw: css.slice(start, i), header: '', body: '', isAtRule: false });
        break;
      }
      i++;
    }
  }
  return statements;
}

/**
 * Extracts unescaped Tailwind class names referenced in a CSS selector part
 */
function extractClassTokensFromSelector(selectorPart) {
  const classes = [];
  let i = 0;
  const len = selectorPart.length;
  while (i < len) {
    if (selectorPart[i] === '.' && (i === 0 || !/[0-9]/.test(selectorPart[i - 1]))) {
      i++;
      let token = '';
      while (i < len) {
        const c = selectorPart[i];
        if (c === '\\') {
          i++;
          if (i < len && /[0-9a-fA-F]/.test(selectorPart[i])) {
            let hex = '';
            while (i < len && /[0-9a-fA-F]/.test(selectorPart[i]) && hex.length < 6) {
              hex += selectorPart[i++];
            }
            if (i < len && selectorPart[i] === ' ') i++;
            token += String.fromCodePoint(parseInt(hex, 16));
          } else if (i < len) {
            token += selectorPart[i++];
          }
        } else if (/[A-Za-z0-9_-]/.test(c)) {
          token += c;
          i++;
        } else {
          break;
        }
      }
      if (token) classes.push(token);
      continue;
    }
    i++;
  }
  return classes;
}

function splitSelectorList(selectorText) {
  const parts = [];
  let depthParen = 0;
  let depthBracket = 0;
  let start = 0;
  for (let i = 0; i < selectorText.length; i++) {
    const c = selectorText[i];
    if (c === '\\') { i++; continue; }
    if (c === '(') depthParen++;
    else if (c === ')') depthParen = Math.max(0, depthParen - 1);
    else if (c === '[') depthBracket++;
    else if (c === ']') depthBracket = Math.max(0, depthBracket - 1);
    else if (c === ',' && depthParen === 0 && depthBracket === 0) {
      parts.push(selectorText.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(selectorText.slice(start).trim());
  return parts.filter(Boolean);
}

const DYNAMIC_UI_CLASSES = [
  'bg-emerald-600', 'shadow-emerald-200', 'text-white', 'bg-blue-600', 'bg-slate-100',
  'text-slate-400', 'text-blue-600', 'underline', 'w-5', 'h-5', 'w-4', 'h-4', 'lg:hidden',
  'mb-3', 'p-1', 'hidden', 'flex', 'grid', 'text-xs', 'text-sm', 'text-base', 'text-lg',
  'text-xl', 'text-2xl', 'sm:text-sm', 'sm:text-base', 'sm:text-lg', 'sm:text-2xl', 'sm:text-3xl',
  'rt-grid', 'rt-m', 'rt-lbl', 'rt-lbl-r', 'rb', 'rb-m', 'rb-lbl', 'ct-tbl', 'ct-uk', 'c-b', 'c-g', 'c-m', 'faq-ans', 'faq-chev'
];

// Unused Tailwind Preflight element tags that can be pruned if the HTML tag never appears on the route
const OPTIONAL_HTML_TAGS = [
  'hr', 'abbr', 'sub', 'sup', 'kbd', 'samp', 'pre', 'code', 'audio', 'video', 'canvas',
  'summary', 'fieldset', 'legend', 'progress', 'meter', 'blockquote', 'dl', 'dd', 'dt',
  'figure', 'figcaption', 'caption', 'optgroup', 'textarea', 'menu', 'ol', 'ul', 'small', 'dfn'
];

/**
 * Purges unused Tailwind utility rules and unused `:root` / `--tw-*` CSS variables specifically for each route's SSR HTML,
 * slashing inline CSS down cleanly while preserving full cross-browser visual parity.
 */
function purgeCssForRoute(universalCss, routeHtml) {
  const usedClasses = new Set(DYNAMIC_UI_CLASSES);
  const classAttrRegex = /class="([^"]*)"/g;
  let cm;
  while ((cm = classAttrRegex.exec(routeHtml)) !== null) {
    const tokens = cm[1].split(/\s+/);
    for (const t of tokens) {
      if (t) usedClasses.add(t);
    }
  }

  const usedIds = new Set();
  const idAttrRegex = /id="([^"]*)"/g;
  let im;
  while ((im = idAttrRegex.exec(routeHtml)) !== null) {
    if (im[1]) usedIds.add(im[1]);
  }

  function filterRules(statements, rootBuckets) {
    const out = [];
    for (const st of statements) {
      if (st.isAtRule) {
        if (/^@media/i.test(st.header)) {
          const inner = splitCssStatements(st.body);
          const keptInner = filterRules(inner, rootBuckets);
          if (keptInner.length > 0) {
            out.push(`${st.header}{${keptInner.join('')}}`);
          }
        } else if (/^@(?:-\w+-)?keyframes\s+([A-Za-z0-9_-]+)/i.test(st.header)) {
          const kfName = st.header.match(/^@(?:-\w+-)?keyframes\s+([A-Za-z0-9_-]+)/i)[1];
          if (kfName === 'pulse' ? usedClasses.has('animate-pulse') : true) {
            out.push(st.raw);
          }
        } else {
          out.push(st.raw);
        }
        continue;
      }

      if (!st.header) {
        out.push(st.raw);
        continue;
      }

      if (st.header === ':root,:host' || st.header === ':root') {
        rootBuckets.push(st);
        out.push(`__ROOT_BUCKET_${rootBuckets.length - 1}__`);
        continue;
      }

      const parts = splitSelectorList(st.header);
      const keptParts = parts.filter((part) => {
        const idMatches = part.match(/#([A-Za-z0-9_-]+)/g);
        if (idMatches && idMatches.some((idSel) => !usedIds.has(idSel.slice(1)))) {
          return false;
        }
        const clsList = extractClassTokensFromSelector(part);
        if (clsList.length === 0) {
          const bareTag = part.replace(/:[:a-zA-Z0-9_-]+(?:\([^)]*\))?/g, '').trim().toLowerCase();
          if (OPTIONAL_HTML_TAGS.includes(bareTag) && !new RegExp(`<${bareTag}[\\s>]`, 'i').test(routeHtml)) {
            return false;
          }
          return true;
        }
        return clsList.every((cls) => usedClasses.has(cls));
      });

      if (keptParts.length > 0) {
        out.push(`${keptParts.join(',')}{${st.body}}`);
      }
    }
    return out;
  }

  const rootBuckets = [];
  const topStatements = splitCssStatements(universalCss);
  let filteredCss = filterRules(topStatements, rootBuckets).join('');

  // Inline static `:root` variables directly into `var(--name)` (makes CSS smaller AND eliminates `:root` dependency)
  const staticVarMap = {};
  rootBuckets.forEach((bucket) => {
    const decls = bucket.body.split(';').filter(Boolean);
    for (const decl of decls) {
      const colonIdx = decl.indexOf(':');
      if (colonIdx === -1) continue;
      const prop = decl.slice(0, colonIdx).trim();
      const val = decl.slice(colonIdx + 1).trim();
      if (prop.startsWith('--') && !prop.startsWith('--tw-')) {
        staticVarMap[prop] = val;
      }
    }
  });

  // Expand var(--foo) innermost-first so nested var(--tw-*,var(--text-*)) and --default-* fallbacks resolve completely
  for (let pass = 0; pass < 4; pass++) {
    filteredCss = filteredCss.replace(/var\((--[A-Za-z0-9_-]+)(?:,([^()]*))?\)/g, (full, name, fallback) => {
      if (Object.prototype.hasOwnProperty.call(staticVarMap, name)) {
        return staticVarMap[name];
      }
      if (fallback !== undefined && !name.startsWith('--tw-')) {
        return fallback.trim();
      }
      return full;
    });
  }

  const referencedVars = new Set();
  const varUseRegex = /var\((--[A-Za-z0-9_-]+)/g;
  let vm;
  while ((vm = varUseRegex.exec(filteredCss)) !== null) {
    referencedVars.add(vm[1]);
  }

  rootBuckets.forEach((bucket, idx) => {
    const decls = bucket.body.split(';').filter(Boolean);
    const keptDecls = decls.filter((decl) => {
      const colonIdx = decl.indexOf(':');
      if (colonIdx === -1) return true;
      const prop = decl.slice(0, colonIdx).trim();
      if (!prop.startsWith('--')) return true;
      return prop.startsWith('--tw-') || referencedVars.has(prop);
    });
    const replacement = keptDecls.length > 0 ? `${bucket.header}{${keptDecls.join(';')}}` : '';
    filteredCss = filteredCss.replace(`__ROOT_BUCKET_${idx}__`, () => replacement);
  });

  // Prune unreferenced `--tw-*` fallback defaults inside Tailwind's `*,:before,:after,::backdrop` rule
  const universalVarRuleRegex = /(\*,:before,:after,::backdrop\{)([^}]*)(\})/;
  const uvm = filteredCss.match(universalVarRuleRegex);
  if (uvm) {
    const outsideRule = filteredCss.replace(universalVarRuleRegex, '');
    const usedTwVars = new Set(['--tw-border-style']);
    let mTw;
    const twRegex = /(--tw-[A-Za-z0-9_-]+)/g;
    while ((mTw = twRegex.exec(outsideRule)) !== null) {
      usedTwVars.add(mTw[1]);
    }
    const keptTwDecls = uvm[2].split(';').filter(Boolean).filter((decl) => {
      const cIdx = decl.indexOf(':');
      if (cIdx === -1) return true;
      const prop = decl.slice(0, cIdx).trim();
      if (prop.startsWith('--tw-')) {
        return usedTwVars.has(prop);
      }
      return true;
    });
    filteredCss = filteredCss.replace(
      universalVarRuleRegex,
      () => keptTwDecls.length > 0 ? `${uvm[1]}${keptTwDecls.join(';')}${uvm[3]}` : ''
    );
  }

  // Final esbuild minify pass to tighten inlined expressions/whitespace and merge declarations
  try {
    filteredCss = esbuild.transformSync(filteredCss, {
      loader: 'css',
      target: ['chrome60', 'safari11', 'firefox60', 'edge79', 'ios11'],
      minify: true,
    }).code.trim();
  } catch (_) {}

  return filteredCss;
}

const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

// Compile unified SSR entry with resolved absolute source paths so esbuild bundles App + all views cleanly
const ssrBundlePath = path.join(distDir, '_ssr_app.mjs');
const appAbsPath = path.join(__dirname, 'src', 'App.tsx').replace(/\\/g, '/');
const registryAbsPath = path.join(__dirname, 'src', 'routeRegistry.ts').replace(/\\/g, '/');
const ssrEntryCode = `
  import App from ${JSON.stringify(appAbsPath)};
  import { preloadAllRouteViews } from ${JSON.stringify(registryAbsPath)};
  await preloadAllRouteViews();
  export { App };
`;
const ssrEntrySrc = path.join(distDir, '_ssr_entry_tmp.ts');
fs.writeFileSync(ssrEntrySrc, ssrEntryCode, 'utf-8');
esbuild.buildSync({
  entryPoints: [ssrEntrySrc],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: ssrBundlePath,
  external: ['react', 'react-dom', 'lucide-react'],
  jsx: 'automatic',
  absWorkingDir: __dirname,
  nodePaths: [path.join(__dirname, 'node_modules')],
});
if (fs.existsSync(ssrEntrySrc)) fs.unlinkSync(ssrEntrySrc);

const { App } = await import(`file://${ssrBundlePath}`);

function renderRouteHtml(routePath) {
  return renderToString(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(App, { initialPath: routePath })
    )
  );
}

let indexContent = fs.readFileSync(indexPath, 'utf-8');
let universalCss = '';
let cssHref = '';

// 1. Transform compiled CSS into Universal Cross-Browser CSS and overwrite asset stylesheet fallback
const cssLinkRegex = /<link\s+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/i;
const cssMatch = indexContent.match(cssLinkRegex);
if (cssMatch && cssMatch[1]) {
  cssHref = cssMatch[1];
  const cssFilePath = path.join(distDir, cssHref.replace(/^\//, ''));
  if (fs.existsSync(cssFilePath)) {
    const rawCssContent = fs.readFileSync(cssFilePath, 'utf-8');
    universalCss = makeCssUniversal(rawCssContent);
    fs.writeFileSync(cssFilePath, universalCss, 'utf-8');
    indexContent = indexContent.replace(
      cssLinkRegex,
      () => `__INLINE_CSS_PLACEHOLDER__<meta name="app-css" content="${cssHref}"><noscript><link rel="stylesheet" href="${cssHref}"></noscript>`
    );
    console.log(`Full Universal CSS (${(universalCss.length / 1024).toFixed(1)} kB raw) prepared for per-route purging`);
  }
}

// 2. Remove competing modulepreload tags and redundant shell style, place compact module entry at end of <body>
indexContent = indexContent
  .replace(/<style>html,body\{[^<]*<\/style>\s*/i, '')
  .replace(/<link\s+rel="modulepreload"[^>]*>\s*/gi, '')
  .replace(/>\s+</g, '><');
const scriptMatch = indexContent.match(/<script\s+type="module"[^>]*src="\/assets\/[^"]+\.js"[^>]*><\/script>/i);
if (scriptMatch) {
  const scriptTag = scriptMatch[0];
  indexContent = indexContent
    .replace(scriptTag, '')
    .replace('</body>', () => `${scriptTag}</body>`);
}

// Generate structural homepage JSON-LD schema (@graph with WebApplication, FAQPage, HowTo, WebSite, Organization)
const homepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://www.cmtoinches.uk/#app',
      'name': 'CM to Inches & Inch to CM Converter UK',
      'url': 'https://www.cmtoinches.uk/',
      'description': 'Convert CM to inches and inch to cm quickly with our accurate UK measurement converter. Get instant metric to imperial length conversions for free.',
      'applicationCategory': 'CalculatorApplication',
      'operatingSystem': 'All',
      'inLanguage': 'en-GB',
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'author': {
        '@type': 'Organization',
        'name': 'cmtoinches.uk',
        'url': 'https://www.cmtoinches.uk/'
      }
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.cmtoinches.uk/#website',
      'url': 'https://www.cmtoinches.uk/',
      'name': 'CM to Inches & Inch to CM Converter UK',
      'description': 'Official UK unit conversion tool for CM to Inches and Inch to CM.',
      'inLanguage': 'en-GB',
      'publisher': {
        '@type': 'Organization',
        'name': 'cmtoinches.uk',
        'url': 'https://www.cmtoinches.uk/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.cmtoinches.uk/favicon.svg'
        }
      }
    },
    {
      '@type': 'HowTo',
      '@id': 'https://www.cmtoinches.uk/#howto',
      'name': 'How to Convert CM to Inches and Inch to CM',
      'description': 'Step-by-step metrology guide for converting length units between centimeters and customary imperial inches.',
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Convert CM to Inches',
          'text': 'To convert centimeters to inches, divide the length in centimeters by 2.54. Formula: Inches = Centimeters ÷ 2.54.'
        },
        {
          '@type': 'HowToStep',
          'name': 'Convert Inch to CM',
          'text': 'To convert inches to centimeters, multiply the length in inches by 2.54. Formula: Centimeters = Inches × 2.54.'
        }
      ]
    }
  ]
};

// Render 100% exact React SSR markup for Homepage ('/') + purge inline CSS strictly for homepage classes
const rootAppHtml = renderRouteHtml('/').replace(/<!--[\s\S]*?-->/g, '');
const homePurgedCss = universalCss ? purgeCssForRoute(universalCss, rootAppHtml) : '';
const homeJsonLdScript = `<script type="application/ld+json">${JSON.stringify(homepageSchema)}</script>`;
const updatedRootIndex = indexContent
  .replace('__INLINE_CSS_PLACEHOLDER__', () => homePurgedCss ? `<style id="inline-app-css">${homePurgedCss}</style>` : '')
  .replace(/<link rel="canonical" href="[^"]*"/g, '<link rel="canonical" href="https://www.cmtoinches.uk/"')
  .replace(/<meta property="og:url" content="[^"]*"/g, '<meta property="og:url" content="https://www.cmtoinches.uk/"')
  .replace(/<meta property="twitter:url" content="[^"]*"/g, '<meta property="twitter:url" content="https://www.cmtoinches.uk/"')
  .replace('<div id="root"></div>', () => `<div id="root">${rootAppHtml}</div>`)
  .replace('</head>', () => `${homeJsonLdScript}</head>`);

fs.writeFileSync(indexPath, updatedRootIndex, 'utf-8');
console.log(`Updated Root: dist/index.html (CSS trimmed to ${(homePurgedCss.length / 1024).toFixed(1)} kB raw)`);

// Helper to generate schema based on page attributes
function generateJsonLdSchema(route, meta) {
  const pageUrl = `https://www.cmtoinches.uk/${route}/`;

  if (meta.isBlog) {
    return {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'headline': meta.h1 || meta.title,
      'description': meta.description,
      'url': pageUrl,
      'datePublished': meta.datePublished,
      'dateModified': '2026-11-01',
      'author': {
        '@type': 'Person',
        'name': meta.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'cmtoinches.uk',
        'url': 'https://www.cmtoinches.uk/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.cmtoinches.uk/favicon.svg'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    };
  }

  if (meta.isSpecific) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': `How to convert ${meta.from} to imperial or metric units?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `To convert ${meta.from}, use the metrology calculation. By standard calibration, the translation results in exactly ${meta.to} using the conversion equation ${meta.formula}.`
          }
        },
        {
          '@type': 'Question',
          'name': `What is the accurate standard representation of ${meta.from}?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `${meta.from} evaluates to exactly ${meta.to}. This is verified against international standards where 1 inch is defined as precisely 2.54 centimeters.`
          }
        }
      ]
    };
  }

  if (meta.steps) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': meta.h1 || meta.title,
      'description': meta.description,
      'url': pageUrl,
      'estimatedCost': {
        '@type': 'MonetaryAmount',
        'currency': 'GBP',
        'value': '0'
      },
      'step': meta.steps.map((step, idx) => ({
        '@type': 'HowToStep',
        'url': `${pageUrl}#step${idx + 1}`,
        'name': step.name,
        'itemListElement': [
          {
            '@type': 'HowToDirection',
            'text': step.text
          }
        ]
      })),
      'tool': [
        {
          '@type': 'HowToTool',
          'name': 'cmtoinches.uk online converter'
        }
      ]
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': meta.h1 || meta.title,
    'description': meta.description,
    'url': pageUrl,
    'publisher': {
      '@type': 'Organization',
      'name': 'cmtoinches.uk',
      'url': 'https://www.cmtoinches.uk/'
    }
  };
}

routes.forEach((route) => {
  const meta = metadata[route] || {
    title: 'CM to Inches Converter',
    h1: 'CM to Inches Converter',
    description: 'Convert centimeters to inches instantly with our free CM to Inches Converter. Accurate calculations, conversion tables, formulas, and FAQs.'
  };

  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });

  const pageCanonical = `https://www.cmtoinches.uk/${route}/`;
  const schemaObj = generateJsonLdSchema(route, meta);
  const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(schemaObj)}</script>`;

  const routePath = `/${route}/`;
  const isHydratedRoute =
    route === 'paper-size-in-inches' ||
    route === 'ring-shoe-size-cm' ||
    route === 'unit-conversion-chart' ||
    route === 'contact-us';
  const rawRouteAppHtml = renderRouteHtml(routePath);
  const routeAppHtml = isHydratedRoute ? rawRouteAppHtml : rawRouteAppHtml.replace(/<!--[\s\S]*?-->/g, '');
  const routePurgedCss = universalCss ? purgeCssForRoute(universalCss, routeAppHtml) : '';

  let pageContent = indexContent
    .replace('__INLINE_CSS_PLACEHOLDER__', () => routePurgedCss ? `<style id="inline-app-css">${routePurgedCss}</style>` : '')
    .replace(/<title>.*?<\/title>/g, () => `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/g, () => `<meta name="description" content="${meta.description}"`)
    .replace(/<link rel="canonical" href="[^"]*"/g, () => `<link rel="canonical" href="${pageCanonical}"`)
    .replace(/<meta property="og:url" content="[^"]*"/g, () => `<meta property="og:url" content="${pageCanonical}"`)
    .replace(/<meta property="og:title" content="[^"]*"/g, () => `<meta property="og:title" content="${meta.title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/g, () => `<meta property="og:description" content="${meta.description}"`)
    .replace(/<meta property="twitter:url" content="[^"]*"/g, () => `<meta property="twitter:url" content="${pageCanonical}"`)
    .replace(/<meta property="twitter:title" content="[^"]*"/g, () => `<meta property="twitter:title" content="${meta.title}"`)
    .replace(/<meta property="twitter:description" content="[^"]*"/g, () => `<meta property="twitter:description" content="${meta.description}"`)
    .replace('<div id="root"></div>', () => `<div id="root">${routeAppHtml}</div>`)
    .replace('</head>', () => `${jsonLdScript}</head>`);

  fs.writeFileSync(path.join(targetDir, 'index.html'), pageContent, 'utf-8');
  console.log(`Generated: ${route}/index.html (CSS trimmed to ${(routePurgedCss.length / 1024).toFixed(1)} kB raw)`);
});

// Clean up temporary SSR bundle
if (fs.existsSync(ssrBundlePath)) {
  fs.unlinkSync(ssrBundlePath);
}

// Also create a 404.html at the root of dist as a fallback with homepage JSON-LD
fs.writeFileSync(path.join(distDir, '404.html'), updatedRootIndex, 'utf-8');
console.log('Generated: 404.html fallback');

// Generate noindex + 301 redirect HTML pages for duplicate & retired programmatic number routes
redirectRoutes.forEach((redirectRoute) => {
  const redirectDir = path.join(distDir, redirectRoute);
  fs.mkdirSync(redirectDir, { recursive: true });
  const redirectHtml = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <title>301 Moved Permanently - CM to Inches Converter</title>
  <meta http-equiv="refresh" content="0;url=https://www.cmtoinches.uk/">
  <link rel="canonical" href="https://www.cmtoinches.uk/">
  <meta name="robots" content="noindex, follow">
  <script>
    window.location.replace("https://www.cmtoinches.uk/");
  </script>
</head>
<body style="font-family:system-ui,-apple-system,sans-serif;padding:32px;text-align:center;background:#f8fafc;color:#0f172a;">
  <p><strong>301 Moved Permanently</strong></p>
  <p>This page has been consolidated into our main UK Length Converter.</p>
  <p>Redirecting to <a href="https://www.cmtoinches.uk/">https://www.cmtoinches.uk/</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(redirectDir, 'index.html'), redirectHtml, 'utf-8');
  console.log(`Generated: ${redirectRoute}/index.html with noindex + 301 redirect to https://www.cmtoinches.uk/`);
});

// Ensure _redirects and .htaccess are in dist
const redirectsSrc = path.join(__dirname, 'public', '_redirects');
if (fs.existsSync(redirectsSrc)) {
  fs.copyFileSync(redirectsSrc, path.join(distDir, '_redirects'));
}
const htaccessSrc = path.join(__dirname, 'public', '.htaccess');
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, path.join(distDir, '.htaccess'));
}

console.log('Static route prerendering completed successfully!');
