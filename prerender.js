import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
    title: 'Inch in CM vs Stone to KG – Unit Conversion Chart & Quick Difference List',
    h1: 'Inch in CM vs Stone to KG Comparison Chart',
    description: 'Quick comparison list and reference charts comparing length conversions (inch in cm) and weight conversions (stone to kg) with direct calculator links.'
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

const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf-8');

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

const staticRootBody = `<div id="root"><div class="min-h-screen bg-slate-50 flex flex-col font-sans"><header class="w-full bg-white text-slate-950 border-b border-slate-200 shadow-sm" id="header-navigation"><div class="max-w-7xl mx-auto px-4 md:px-6 py-2.5 sm:py-4 flex items-center justify-between"><div class="flex items-center"><a href="/" class="flex items-center"><img src="/favicon.svg" alt="CM to Inches Converter Logo" class="w-9 h-9 sm:w-11 sm:h-11 rounded-xl shadow-md shrink-0" width="44" height="44" /></a></div><nav class="hidden lg:flex items-center gap-2"><a href="/" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-lg shadow-blue-100">cm to inches</a><a href="/inches-to-cm/" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-100/80">Inches → CM</a><a href="/feet-to-cm/" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-100/80">Feet → CM</a><a href="/cm-to-feet/" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-100/80">CM → Feet</a><a href="/unit-conversion-chart/" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-100/80">Unit Chart</a><a href="/sitemap/" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-100/80">Sitemap</a></nav></div></header><main class="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 flex-grow w-full"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-8 space-y-6"><div class="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-5 sm:p-7 space-y-5"><div class="flex items-center gap-1.5 overflow-x-auto pb-1"><a href="/" class="px-3.5 py-2 rounded-xl text-xs font-black bg-blue-600 text-white shadow-sm shrink-0">Centimeters to Inches</a><a href="/inches-to-cm/" class="px-3.5 py-2 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0">Inches to Centimeters</a><a href="/feet-to-cm/" class="px-3.5 py-2 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0">Feet to Centimeters</a><a href="/cm-to-feet/" class="px-3.5 py-2 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0">Centimeters to Feet</a></div><div class="grid grid-cols-1 md:grid-cols-9 gap-3 items-center"><div class="md:col-span-4 flex flex-col"><span class="block text-[10px] sm:text-xs font-bold uppercase text-slate-400 mb-1 sm:mb-2">Centimeters / CM input</span><div class="relative"><div class="w-full text-2xl sm:text-3xl font-black bg-slate-50 border-2 border-slate-200 rounded-xl sm:rounded-2xl pl-4 sm:pl-5 pr-20 sm:pr-24 py-2.5 sm:py-3.5 font-sans shadow-xs text-slate-400">0</div><div class="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2"><span class="text-sm sm:text-base font-black text-slate-700 bg-slate-200/90 px-2.5 sm:px-3 py-1 rounded-lg uppercase font-mono shadow-xs">cm</span></div></div></div><div class="md:col-span-1 flex justify-center -my-2.5 md:my-0"><button type="button" class="bg-blue-600 text-white w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center font-bold">⇄</button></div><div class="md:col-span-4 flex flex-col"><span class="block text-[10px] sm:text-xs font-bold uppercase text-slate-400 mb-1 sm:mb-2">Inches / IN output</span><div class="w-full text-2xl sm:text-3xl font-black bg-blue-50 border-2 border-blue-100 text-blue-700 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 shadow-xs"><span class="font-sans">0</span><span class="text-sm sm:text-base font-black text-blue-700 bg-blue-200/80 px-2.5 sm:px-3 py-1 rounded-lg uppercase font-mono shadow-xs">in</span></div></div></div><div class="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1 pb-1"><button type="button" class="min-h-[40px] px-4 py-2 rounded-lg sm:rounded-xl font-black text-[11px] uppercase tracking-wider bg-blue-600 text-white shadow-md flex items-center justify-center gap-1.5">COPY RESULT</button><button type="button" class="min-h-[40px] px-4 py-2 rounded-lg sm:rounded-xl font-black text-[11px] uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs flex items-center justify-center gap-1.5">CLEAR</button></div><div class="border-2 border-slate-200 rounded-2xl p-5 bg-gradient-to-b from-slate-50 to-amber-50/30 space-y-4 shadow-sm"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1"><div><h4 class="font-black text-sm sm:text-base text-slate-900 uppercase tracking-wider">Real-Time Adaptive Scale</h4></div><div class="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs"><span class="text-[17px] font-bold text-slate-500 uppercase px-2">Zoom:</span><span class="px-3 py-1 rounded-lg text-[17px] font-mono font-black bg-blue-600 text-white">Auto (100)</span><span class="px-3 py-1 rounded-lg text-[17px] font-mono font-black bg-slate-100 text-slate-700">10</span><span class="px-3 py-1 rounded-lg text-[17px] font-mono font-black bg-slate-100 text-slate-700">20</span><span class="px-3 py-1 rounded-lg text-[17px] font-mono font-black bg-slate-100 text-slate-700">50</span><span class="px-3 py-1 rounded-lg text-[17px] font-mono font-black bg-slate-100 text-slate-700">100</span></div></div><div class="pt-6 pb-6 px-2 relative select-none"><div class="relative w-full h-32 rounded-xl border-2 border-slate-700 shadow-lg overflow-hidden bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-200"><div class="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 border-r-2 border-slate-700 z-10"></div><div class="absolute top-0 left-3.5 right-0 h-16 border-b border-slate-600/60 bg-gradient-to-b from-yellow-200 to-amber-300/90"><span class="absolute top-1.5 left-2.5 sm:left-3 text-base sm:text-lg font-black font-mono text-slate-800">CM</span></div><div class="absolute bottom-0 left-3.5 right-0 h-16 bg-gradient-to-b from-amber-100 to-yellow-100"><span class="absolute bottom-1.5 left-2.5 sm:left-3 text-base sm:text-lg font-black font-mono text-blue-950">IN</span></div></div></div></div></div><section class="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 space-y-6"><h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">CM to Inches &amp; Inch to CM Converter</h1><p class="text-lg text-slate-700 leading-relaxed font-sans">Welcome to <strong>cmtoinches.uk</strong>, the premier UK measurement conversion tool. Whether you need to convert <strong>CM to Inches</strong> for clothing, DIY, and heights, or <strong>Inch to CM</strong> for engineering and woodworking, our instant UK calculator provides 100% accurate, high-precision results based on international metrology standards (1 inch = 2.54 cm).</p><div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6"><div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-2xl font-mono space-y-3 shadow-sm"><span class="text-xs text-blue-700 font-black tracking-widest uppercase">1. CM TO INCHES FORMULA</span><div class="text-xl font-black text-blue-900">Inches = Centimeters ÷ 2.54</div><p class="text-xs text-slate-600 font-sans">Alternatively: <code class="bg-white/80 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">CM × 0.393701</code></p></div><div class="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-600 rounded-r-2xl font-mono space-y-3 shadow-sm"><span class="text-xs text-emerald-700 font-black tracking-widest uppercase">2. INCH TO CM FORMULA</span><div class="text-xl font-black text-emerald-900">Centimeters = Inches × 2.54</div><p class="text-xs text-slate-600 font-sans">Exact constant defined by international agreement.</p></div></div></section></div></div></main><footer class="bg-slate-950 text-slate-400 text-xs border-t-2 border-slate-900 p-8 text-center"><p>© 2026 cmtoinches.uk. All rights reserved. Created in alignment with UK measurement guidelines.</p><p class="mt-2">Partner tools: <a href="https://stonetokg.uk/" target="_blank" rel="noopener" class="text-yellow-400 underline">stone to kg</a> | <a href="https://inchesincm.de/" target="_blank" rel="noopener" class="text-yellow-400 underline">inch in cm</a></p><div class="mt-4 flex items-center justify-start gap-2.5"><a href="https://www.facebook.com/cmtoinches" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a><a href="https://uk.pinterest.com/cmtoinches/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.04-.98-.07-2.48.15-3.55.2-.97 1.3-5.5 1.3-5.5s-.33-.67-.33-1.65c0-1.55.9-2.7 2.02-2.7.95 0 1.41.71 1.41 1.57 0 .96-.61 2.39-.93 3.71-.27 1.11.56 2.02 1.65 2.02 1.98 0 3.5-2.09 3.5-5.1 0-2.67-1.92-4.54-4.66-4.54-3.17 0-5.03 2.38-5.03 4.84 0 .96.37 1.99.83 2.54.09.11.1.21.08.32-.09.36-.28 1.15-.32 1.32-.05.21-.17.26-.39.16-1.44-.67-2.34-2.78-2.34-4.47 0-3.64 2.65-6.99 7.64-6.99 4.01 0 7.13 2.86 7.13 6.68 0 3.99-2.51 7.2-6 7.2-1.17 0-2.27-.61-2.65-1.33l-.72 2.75c-.26 1-.96 2.26-1.43 3.02A12 12 0 1 0 12 0z"/></svg></a><a href="https://www.instagram.com/cm_to_inches_converter/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a></div></footer></div></div>`;

// Also write updated Root index.html with canonical tags and homepage JSON-LD for AI Search indexers
const homeJsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(homepageSchema, null, 2)}\n</script>`;
const updatedRootIndex = indexContent
  .replace(/<link rel="canonical" href="[^"]*"/g, '<link rel="canonical" href="https://www.cmtoinches.uk/"')
  .replace(/<meta property="og:url" content="[^"]*"/g, '<meta property="og:url" content="https://www.cmtoinches.uk/"')
  .replace(/<meta property="twitter:url" content="[^"]*"/g, '<meta property="twitter:url" content="https://www.cmtoinches.uk/"')
  .replace('<div id="root"></div>', staticRootBody)
  .replace('</head>', `${homeJsonLdScript}\n</head>`);

fs.writeFileSync(indexPath, updatedRootIndex, 'utf-8');
console.log('Updated Root: dist/index.html with canonical tags and homepage JSON-LD');

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
      'dateModified': '2026-06-24',
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
    // Height standard page schema (FAQ & Calculation details)
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
    // Converter Page (HowTo & WebApplication combined)
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

  // Legal / Default pages
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
  const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;

  const pageH1 = meta.h1 || meta.title.split('–')[0].trim();
  const partnerLink = route === 'inches-to-cm' 
    ? `<p>Convert <a href="https://inchesincm.de/" target="_blank" rel="noopener">inch in cm</a> instantly with our partner calculator for height, paper, furniture, and screens.</p>` 
    : route === 'feet-to-cm'
    ? `<p>Need stone to kg or pounds? Convert body weight instantly with <a href="https://stonetokg.uk/" target="_blank" rel="noopener">stone to kg</a>.</p>`
    : '';

  const staticPageBody = `<div id="root"><div class="min-h-screen bg-slate-50 flex flex-col font-sans"><header class="w-full bg-white text-slate-950 border-b border-slate-200 shadow-sm" id="header-navigation"><div class="max-w-7xl mx-auto px-4 md:px-6 py-2.5 sm:py-4 flex items-center justify-between"><div class="flex items-center"><a href="/" class="flex items-center"><img src="/favicon.svg" alt="CM to Inches Converter Logo" class="w-9 h-9 sm:w-11 sm:h-11 rounded-xl shadow-md shrink-0" width="44" height="44" /></a></div><nav class="hidden lg:flex items-center gap-2"><a href="/" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-100/80">cm to inches</a><a href="/inches-to-cm/" class="px-3 py-1.5 rounded-lg text-xs font-bold ${route === 'inches-to-cm' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'}">Inches → CM</a><a href="/feet-to-cm/" class="px-3 py-1.5 rounded-lg text-xs font-bold ${route === 'feet-to-cm' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'}">Feet → CM</a><a href="/cm-to-feet/" class="px-3 py-1.5 rounded-lg text-xs font-bold ${route === 'cm-to-feet' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'}">CM → Feet</a><a href="/unit-conversion-chart/" class="px-3 py-1.5 rounded-lg text-xs font-bold ${route === 'unit-conversion-chart' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'}">Unit Chart</a><a href="/sitemap/" class="px-3 py-1.5 rounded-lg text-xs font-bold ${route === 'sitemap' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'}">Sitemap</a></nav></div></header><main class="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 flex-grow w-full"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-8 space-y-6"><div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6"><h1 class="text-xl md:text-2xl font-black text-slate-900 tracking-tight">${pageH1}</h1><p class="text-lg text-slate-700 leading-relaxed font-sans">${meta.description}</p>${partnerLink}</div></div></div></main><footer class="bg-slate-950 text-slate-400 text-xs border-t-2 border-slate-900 p-8 text-center"><p>© 2026 cmtoinches.uk. All rights reserved. Created in alignment with UK measurement guidelines.</p><p class="mt-2">Partner tools: <a href="https://stonetokg.uk/" target="_blank" rel="noopener" class="text-yellow-400 underline">stone to kg</a> | <a href="https://inchesincm.de/" target="_blank" rel="noopener" class="text-yellow-400 underline">inch in cm</a></p><div class="mt-4 flex items-center justify-start gap-2.5"><a href="https://www.facebook.com/cmtoinches" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a><a href="https://uk.pinterest.com/cmtoinches/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.04-.98-.07-2.48.15-3.55.2-.97 1.3-5.5 1.3-5.5s-.33-.67-.33-1.65c0-1.55.9-2.7 2.02-2.7.95 0 1.41.71 1.41 1.57 0 .96-.61 2.39-.93 3.71-.27 1.11.56 2.02 1.65 2.02 1.98 0 3.5-2.09 3.5-5.1 0-2.67-1.92-4.54-4.66-4.54-3.17 0-5.03 2.38-5.03 4.84 0 .96.37 1.99.83 2.54.09.11.1.21.08.32-.09.36-.28 1.15-.32 1.32-.05.21-.17.26-.39.16-1.44-.67-2.34-2.78-2.34-4.47 0-3.64 2.65-6.99 7.64-6.99 4.01 0 7.13 2.86 7.13 6.68 0 3.99-2.51 7.2-6 7.2-1.17 0-2.27-.61-2.65-1.33l-.72 2.75c-.26 1-.96 2.26-1.43 3.02A12 12 0 1 0 12 0z"/></svg></a><a href="https://www.instagram.com/cm_to_inches_converter/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a></div></footer></div></div>`;

  // Dynamic meta replacements
  let pageContent = indexContent
    // 1. Replace title tag
    .replace(/<title>.*?<\/title>/g, `<title>${meta.title}</title>`)
    // 2. Replace meta description
    .replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${meta.description}"`)
    // 3. Replace canonical links
    .replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="${pageCanonical}"`)
    // 4. Replace Open Graph details
    .replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="${pageCanonical}"`)
    .replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${meta.title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${meta.description}"`)
    // 5. Replace Twitter details
    .replace(/<meta property="twitter:url" content="[^"]*"/g, `<meta property="twitter:url" content="${pageCanonical}"`)
    .replace(/<meta property="twitter:title" content="[^"]*"/g, `<meta property="twitter:title" content="${meta.title}"`)
    .replace(/<meta property="twitter:description" content="[^"]*"/g, `<meta property="twitter:description" content="${meta.description}"`)
    // 6. Inject pre-rendered static body containing unique H1 for raw HTML crawlers
    .replace('<div id="root"></div>', staticPageBody)
    // 7. Inject dynamic structured JSON-LD data for Googlebot SGE and modern AI LLM engines
    .replace('</head>', `${jsonLdScript}\n</head>`);

  fs.writeFileSync(path.join(targetDir, 'index.html'), pageContent, 'utf-8');
  console.log(`Generated: ${route}/index.html with custom metadata & JSON-LD`);
});

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
