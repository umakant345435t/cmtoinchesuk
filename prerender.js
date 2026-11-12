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
    title: 'About Our Metrological Mission – cmtoinches.uk',
    h1: 'About Our Metrological Mission',
    description: 'Meet our team, study our measurement standards commitments, and review our accuracy promise.'
  },
  'contact-us': {
    title: 'Contact Metrological Support – Feedback & Queries',
    h1: 'Contact Our Support Team',
    description: 'Get in touch with the admin team at cmtoinches.uk. Reach our desk at support@cmtoinches.uk.'
  },
  'privacy-policy': {
    title: 'Privacy Policy – GDPR & AdSense Compliance standards',
    h1: 'Privacy Policy',
    description: 'Review our detailed visitor privacy policy, AdSense cookie agreements, and full EU/UK GDPR alignment files.'
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions of Service – cmtoinches.uk',
    h1: 'Terms and Conditions',
    description: 'Study our calculator usage disclaimers, mathematical liability rules, and educational permissions.'
  },
  'disclaimer': {
    title: 'Complete Metrology Disclaimer – Verification Warning',
    h1: 'Complete Metrology Disclaimer',
    description: 'Our official guidelines, calculations, and safety boundaries for architectural and mechanical DIY uses.'
  },
  'cookie-policy': {
    title: 'Cookie Policy – UK PECR & Tracking Frameworks',
    h1: 'Cookie Policy',
    description: 'Details on how we leverage secure cache-only variables to improve page rendering speeds.'
  },
  'sitemap': {
    title: 'HTML Sitemap Index – cmtoinches.uk Navigation Map',
    h1: 'Programmatic HTML Sitemap Index',
    description: 'Browse 100% of the active URLs, conversion guides, and legal policy structures on this portal.'
  },
  'unit-conversion-chart': {
    title: 'Master Unit Conversion Charts (1 to 1500) – CM, MM, Inches & Feet',
    h1: 'Master Unit Conversion Charts (1 to 1500) – CM, MM, Inches & Feet',
    description: 'Comprehensive UK length reference charts from 1 to 1500 for CM to Inches, Inches to CM, Feet to CM, MM to CM, MM to Inches, MM to Feet, CM to Feet, and Inches to MM.'
  },
  '90-cm-to-inches': {
    title: '90 CM to Inches Converter (90 cm → in) – Standard Height & Width',
    h1: '90 CM to Inches Conversion',
    description: 'Convert 90 centimeters to inches accurately. 90 cm equals 35.4331 inches or 2 feet 11.4 inches. View conversion formula, steps, and instant chart.',
    formula: '90 ÷ 2.54 = 35.4331 inches',
    isSpecific: true,
    from: '90 cm',
    to: '35.43 inches (2 feet 11.4 inches)'
  },
  '150-cm-to-inches': {
    title: '150 CM to Inches Converter (150 cm → in) – Height Conversion',
    h1: '150 CM to Inches Height Converter',
    description: 'Convert 150 centimeters to inches accurately. Find out what 150 cm means in inches (59.06 inches) and feet-inches format (4ft 11 inches) with standard tables.',
    formula: '150 ÷ 2.54 = 59.0551 inches',
    isSpecific: true,
    from: '150 cm',
    to: '59.06 inches (4 feet 11 inches)'
  },
  '170-cm-to-inches': {
    title: '170 CM to Inches Converter (170 cm → in) – Height Conversion',
    h1: '170 CM to Inches Height Converter',
    description: 'Convert exactly 170 cm to inches. 170 centimeters equals 66.93 inches or 5ft 7in. Check our detailed guide and formula.',
    formula: '170 ÷ 2.54 = 66.9291 inches',
    isSpecific: true,
    from: '170 cm',
    to: '66.93 inches (5 feet 7 inches)'
  },
  '180-cm-to-inches': {
    title: '180 CM to Inches Converter (180 cm → in) – Height Conversion',
    h1: '180 CM to Inches Height Converter',
    description: 'Convert 180 centimeters to inches. 180 cm equals 70.87 inches or 5 feet 11 inches. Fast, accurate, and completely free height guide.',
    formula: '180 ÷ 2.54 = 70.8661 inches',
    isSpecific: true,
    from: '180 cm',
    to: '70.87 inches (5 feet 11 inches)'
  },
  '200-cm-to-inches': {
    title: '200 CM to Inches Converter (200 cm → in) – Height Conversion',
    h1: '200 CM to Inches Height Converter',
    description: 'How many inches is 200 cm? Convert 200 cm to inches (78.74 inches) or feet-inches (6ft 6.7in) instantly with this accurate tool.',
    formula: '200 ÷ 2.54 = 78.7402 inches',
    isSpecific: true,
    from: '200 cm',
    to: '78.74 inches (6 feet 6.7 inches)'
  },
  '5-feet-in-cm': {
    title: '5 Feet in CM – Accurate Height Conversion (5 ft → cm)',
    h1: '5 Feet in CM Height Converter',
    description: 'Convert 5 feet to centimeters instantly. Learn how many centimeters are in 5 feet (152.4 cm) and view comprehensive conversion charts.',
    formula: '5 × 30.48 = 152.4 centimeters',
    isSpecific: true,
    from: '5 feet',
    to: '152.4 centimeters'
  },
  '6-feet-in-cm': {
    title: '6 Feet in CM – Accurate Height Conversion (6 ft → cm)',
    h1: '6 Feet in CM Height Converter',
    description: 'Convert exactly 6 feet to centimeters. Learn how many cm are in 6 feet (182.88 cm) and study the standard conversion metrics table.',
    formula: '6 × 30.48 = 182.88 centimeters',
    isSpecific: true,
    from: '6 feet',
    to: '182.88 centimeters'
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
 * 1. Removes `@layer ...;` statement declarations and unwraps all `@layer <name> { ... }` blocks
 *    so browsers without CSS Cascade Layers support (Chrome < 99, Safari < 15.4, Firefox < 97,
 *    UC Browser, older Samsung Internet, Android/iOS WebViews, Windows 7/8 browsers) apply 100% of styles.
 * 2. Unwraps Tailwind v4's restrictive `@supports` gate around `--tw-*` custom property initializations
 *    so all browsers (even without `@property` support) initialize `--tw-border-style: solid`, shadows, and gradients.
 * 3. Removes `@supports (color:color-mix(...))` blocks so standard hex/rgba colors are used everywhere.
 * 4. Runs esbuild CSS downleveling targeting Chrome 60 / Safari 11 / Firefox 60 / Edge 79 / iOS 11
 *    to convert all `oklch()` colors to `#hex`/`rgb()`, `@media (width >= ...)` to `@media (min-width: ...)`,
 *    `#rrggbbaa` to `rgba()`, and `inset` to `top/right/bottom/left`.
 */
function makeCssUniversal(rawCss) {
  let css = rawCss;

  // 1. Remove standalone `@layer a, b, c;` declarations (without braces)
  css = css.replace(/@layer\s+[^{;]+;/gi, '');

  // 2. Unwrap all `@layer <name> { ... }` blocks in place (preserving cascade order)
  css = processCssBlocks(css, /@layer\s+[^{]+\{/i, 'unwrap');

  // 3. Unwrap Tailwind v4's `@supports ((-webkit-hyphens:none)...) { ... }` property initializer block
  // so `*, :before, :after, ::backdrop { --tw-border-style: solid; ... }` applies unconditionally in all browsers
  css = processCssBlocks(css, /@supports\s*\(\(\(-webkit-hyphens:\s*none\)[^{]+\{/i, 'unwrap');
  css = processCssBlocks(css, /@supports\s*\(\(-webkit-hyphens:\s*none\)[^{]+\{/i, 'unwrap');

  // 4. Remove `@supports (color:color-mix(...))` and `@supports (color:oklch(...))` override blocks
  // since standard rgba/hex fallbacks are already emitted right before them
  css = processCssBlocks(css, /@supports\s*\(color:\s*color-mix\([^{]+\{/i, 'remove');
  css = processCssBlocks(css, /@supports\s*\(color:\s*oklch\([^{]+\{/i, 'remove');

  // 5. Run esbuild CSS transformer with legacy browser targets to downlevel oklch(), media ranges, inset, and hex alpha
  const transformed = esbuild.transformSync(css, {
    loader: 'css',
    target: ['chrome60', 'safari11', 'firefox60', 'edge79', 'ios11'],
    minify: true,
  });

  return transformed.code.trim();
}

const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

// Compile src/App.tsx into a temporary Node ESM bundle so we can SSR-prerender 100% pixel-identical HTML
const ssrBundlePath = path.join(distDir, '_ssr_app.mjs');
esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'src', 'App.tsx')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: ssrBundlePath,
  external: ['react', 'react-dom', 'lucide-react'],
  jsx: 'automatic',
});

const { default: App } = await import(`file://${ssrBundlePath}`);

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

// 1. Transform compiled CSS into Universal Cross-Browser CSS, write back to dist/assets/*.css,
// and inject BOTH inline <style> (for 0.2s FCP/LCP) AND non-blocking <link rel="stylesheet"> fallback!
const cssLinkRegex = /<link\s+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/i;
const cssMatch = indexContent.match(cssLinkRegex);
if (cssMatch && cssMatch[1]) {
  const cssHref = cssMatch[1];
  const cssFilePath = path.join(distDir, cssHref.replace(/^\//, ''));
  if (fs.existsSync(cssFilePath)) {
    const rawCssContent = fs.readFileSync(cssFilePath, 'utf-8');
    const universalCss = makeCssUniversal(rawCssContent);
    // Overwrite asset CSS file so fallback stylesheet is also 100% universally compatible
    fs.writeFileSync(cssFilePath, universalCss, 'utf-8');
    const dualCssDeliveryHtml = `<style id="inline-app-css">${universalCss}</style><link rel="stylesheet" href="${cssHref}" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="${cssHref}"></noscript>`;
    // Use function replacement callback so $ characters in CSS are never mangled
    indexContent = indexContent.replace(cssLinkRegex, () => dualCssDeliveryHtml);
    console.log(`Universal CSS (${(universalCss.length / 1024).toFixed(1)} kB) inlined + fallback linked for 100% browser compatibility`);
  }
}

// 2. Remove competing modulepreload tags from <head> and move main module script to end of <body>
// Also attach a tiny ES5 fallback script so even legacy non-module browsers can calculate conversions
const es5CalculatorFallback = `<script>(function(){var inp=document.getElementById('converter-input'),res=document.getElementById('converter-result'),sel=document.getElementById('conversion-mode-select');if(!inp||!res)return;var ratios={'cm-to-inches':0.3937007874,'inches-to-cm':2.54,'feet-to-cm':30.48,'cm-to-feet':0.032808399,'meters-to-feet':3.280839895,'feet-to-meters':0.3048,'mm-to-inches':0.0393700787,'inches-to-mm':25.4};inp.addEventListener('input',function(){var r= document.getElementById('root');if(r&&r._reactRootContainer)return;var v=parseFloat((inp.value||'').replace(/,/g,'.'));if(isNaN(v)||v<=0){res.textContent='0';return;}var mode=sel?sel.value:'cm-to-inches';var k=ratios[mode]||0.3937007874;res.textContent=Number((v*k).toFixed(4)).toString();});})();</script>`;

indexContent = indexContent.replace(/<link\s+rel="modulepreload"[^>]*>\s*/gi, '');
const scriptMatch = indexContent.match(/<script\s+type="module"[^>]*src="\/assets\/[^"]+\.js"[^>]*><\/script>/i);
if (scriptMatch) {
  const scriptTag = scriptMatch[0];
  indexContent = indexContent
    .replace(scriptTag, '')
    .replace('</body>', () => `  ${scriptTag}\n  ${es5CalculatorFallback}\n  </body>`);
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
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cmtoinches.uk/#faq',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How do I convert CM to Inches (cm to in)?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'To convert CM to Inches, divide your centimeter value by 2.54. For example, 50 cm ÷ 2.54 = 19.685 inches.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I convert Inch to CM (in to cm)?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'To convert Inch to CM, multiply your value in inches by 2.54. For example, 10 inches × 2.54 = 25.4 cm.'
          }
        }
      ]
    }
  ]
};

// Render 100% exact React SSR markup for Homepage ('/') so hydration is bit-for-bit identical with zero blink/flicker
const rootAppHtml = renderRouteHtml('/');
const homeJsonLdScript = `<script type="application/ld+json">${JSON.stringify(homepageSchema)}</script>`;
const updatedRootIndex = indexContent
  .replace(/<link rel="canonical" href="[^"]*"/g, '<link rel="canonical" href="https://www.cmtoinches.uk/"')
  .replace(/<meta property="og:url" content="[^"]*"/g, '<meta property="og:url" content="https://www.cmtoinches.uk/"')
  .replace(/<meta property="twitter:url" content="[^"]*"/g, '<meta property="twitter:url" content="https://www.cmtoinches.uk/"')
  .replace('<div id="root"></div>', () => `<div id="root">${rootAppHtml}</div>`)
  .replace('</head>', () => `${homeJsonLdScript}\n</head>`);

fs.writeFileSync(indexPath, updatedRootIndex, 'utf-8');
console.log('Updated Root: dist/index.html with exact SSR HTML, universal CSS, and homepage JSON-LD');

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
  const routeAppHtml = renderRouteHtml(routePath);

  let pageContent = indexContent
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
    .replace('</head>', () => `${jsonLdScript}\n</head>`);

  fs.writeFileSync(path.join(targetDir, 'index.html'), pageContent, 'utf-8');
  console.log(`Generated: ${route}/index.html with exact SSR HTML, universal CSS & JSON-LD`);
});

// Clean up temporary SSR bundle
if (fs.existsSync(ssrBundlePath)) {
  fs.unlinkSync(ssrBundlePath);
}

// Also create a 404.html at the root of dist as a fallback with homepage JSON-LD
fs.writeFileSync(path.join(distDir, '404.html'), updatedRootIndex, 'utf-8');
console.log('Generated: 404.html fallback');

// Generate 301 Moved Permanently redirect for duplicate /cm-to-inches/ route to Canonical Homepage
const redirectDir = path.join(distDir, 'cm-to-inches');
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
  <p>This duplicate page has been permanently relocated to our official homepage.</p>
  <p>Redirecting to <a href="https://www.cmtoinches.uk/">https://www.cmtoinches.uk/</a>...</p>
</body>
</html>`;
fs.writeFileSync(path.join(redirectDir, 'index.html'), redirectHtml, 'utf-8');
console.log('Generated: cm-to-inches/index.html with 301 Permanent Redirect to https://www.cmtoinches.uk/');

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
