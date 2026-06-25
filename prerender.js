import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  'cm-to-inches',
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
  'blog',
  'blog/how-many-inches-in-1-cm',
  'blog/cm-vs-inches',
  'blog/uk-height-conversion-guide',
  'blog/clothing-size-conversion',
  'blog/international-measurement-systems',
  '150-cm-to-inches',
  '170-cm-to-inches',
  '180-cm-to-inches',
  '200-cm-to-inches',
  '5-feet-in-cm',
  '6-feet-in-cm'
];

const metadata = {
  'cm-to-inches': {
    title: 'CM to Inches Converter (cm → in) – Fast Imperial Tool',
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
    description: 'Meet our team, study our measurement standards commitments, and review our accuracy promise.'
  },
  'contact-us': {
    title: 'Contact Metrological Support – Feedback & Queries',
    description: 'Get in touch with the admin team at cmtoinches.uk. Reach our desk at support@cmtoinches.uk.'
  },
  'privacy-policy': {
    title: 'Privacy Policy – GDPR & AdSense Compliance standards',
    description: 'Review our detailed visitor privacy policy, AdSense cookie agreements, and full EU/UK GDPR alignment files.'
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions of Service – cmtoinches.uk',
    description: 'Study our calculator usage disclaimers, mathematical liability rules, and educational permissions.'
  },
  'disclaimer': {
    title: 'Complete Metrology Disclaimer – Verification Warning',
    description: 'Our official guidelines, calculations, and safety boundaries for architectural and mechanical DIY uses.'
  },
  'cookie-policy': {
    title: 'Cookie Policy – UK PECR & Tracking Frameworks',
    description: 'Details on how we leverage secure cache-only variables to improve page rendering speeds.'
  },
  'sitemap': {
    title: 'HTML Sitemap Index – cmtoinches.uk Navigation Map',
    description: 'Browse 100% of the active URLs, conversion guides, blog columns, and legal policy structures on this portal.'
  },
  'blog': {
    title: 'UK Metrology & Clothing Size Blog – Information Portal',
    description: 'Learn how metric measurements apply to British size charts, passport registries, and historic trades.'
  },
  'blog/how-many-inches-in-1-cm': {
    title: 'How Many Inches in 1 CM? The Definitive Metrology Answer – Metric Blog Guide',
    description: 'Study the exact fractional standard for how many inches live inside a single centimeter. Accurate layout tables and historical metric treaty summaries.',
    isBlog: true,
    author: 'Eleanor Vance',
    datePublished: '2026-06-20',
    category: 'Length metrology'
  },
  'blog/cm-vs-inches': {
    title: 'CM vs Inches: Understanding the Imperial & Metric Systems – Metric Blog Guide',
    description: 'Explore historical, industrial, and daily differences between centimeters and inches. Essential reading for global engineering students.',
    isBlog: true,
    author: 'James Sterling',
    datePublished: '2026-06-21',
    category: 'Socio-metrics'
  },
  'blog/uk-height-conversion-guide': {
    title: 'The Ultimate UK Height Conversion Guide (CM, Feet, Inches) – Metric Blog Guide',
    description: 'Master British height documentation requirements. Seamlessly bridge metric meters and imperial stone, feet, or inches.',
    isBlog: true,
    author: 'Eleanor Vance',
    datePublished: '2026-06-22',
    category: 'Passport standards'
  },
  'blog/clothing-size-conversion': {
    title: 'How CM and Inches Impact Clothing & Shoe Sizes – Metric Blog Guide',
    description: 'Learn why UK shoe sizes, trousers, waist measures, and clothing labels vary across regions. Full metric translation arrays inside.',
    isBlog: true,
    author: 'Harriet Cole',
    datePublished: '2026-06-23',
    category: 'E-commerce sizing'
  },
  'blog/international-measurement-systems': {
    title: 'A History of the International System of Units (SI) – Metric Blog Guide',
    description: 'A deep metrological study outlining the history of length definitions, from local steps to the light-speed standard.',
    isBlog: true,
    author: 'James Sterling',
    datePublished: '2026-06-24',
    category: 'Metrology history'
  },
  '150-cm-to-inches': {
    title: '150 CM to Inches Converter (150 cm → in) – Height Conversion',
    description: 'Convert 150 centimeters to inches accurately. Find out what 150 cm means in inches (59.06 inches) and feet-inches format (4ft 11 inches) with standard tables.',
    formula: '150 ÷ 2.54 = 59.0551 inches',
    isSpecific: true,
    from: '150 cm',
    to: '59.06 inches (4 feet 11 inches)'
  },
  '170-cm-to-inches': {
    title: '170 CM to Inches Converter (170 cm → in) – Height Conversion',
    description: 'Convert exactly 170 cm to inches. 170 centimeters equals 66.93 inches or 5ft 7in. Check our detailed guide and formula.',
    formula: '170 ÷ 2.54 = 66.9291 inches',
    isSpecific: true,
    from: '170 cm',
    to: '66.93 inches (5 feet 7 inches)'
  },
  '180-cm-to-inches': {
    title: '180 CM to Inches Converter (180 cm → in) – Height Conversion',
    description: 'Convert 180 centimeters to inches. 180 cm equals 70.87 inches or 5 feet 11 inches. Fast, accurate, and completely free height guide.',
    formula: '180 ÷ 2.54 = 70.8661 inches',
    isSpecific: true,
    from: '180 cm',
    to: '70.87 inches (5 feet 11 inches)'
  },
  '200-cm-to-inches': {
    title: '200 CM to Inches Converter (200 cm → in) – Height Conversion',
    description: 'How many inches is 200 cm? Convert 200 cm to inches (78.74 inches) or feet-inches (6ft 6.7in) instantly with this accurate tool.',
    formula: '200 ÷ 2.54 = 78.7402 inches',
    isSpecific: true,
    from: '200 cm',
    to: '78.74 inches (6 feet 6.7 inches)'
  },
  '5-feet-in-cm': {
    title: '5 Feet in CM – Accurate Height Conversion (5 ft → cm)',
    description: 'Convert 5 feet to centimeters instantly. Learn how many centimeters are in 5 feet (152.4 cm) and view comprehensive conversion charts.',
    formula: '5 × 30.48 = 152.4 centimeters',
    isSpecific: true,
    from: '5 feet',
    to: '152.4 centimeters'
  },
  '6-feet-in-cm': {
    title: '6 Feet in CM – Accurate Height Conversion (6 ft → cm)',
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

// Generate structural homepage JSON-LD schema
const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'CM to Inches Converter (cmtoinches.uk)',
  'url': 'https://www.cmtoinches.uk/',
  'description': 'Instant centimeters (cm) to inches (in) length metrics translation engine. Featuring live conversion charts, standard UK height guide reference, and interactive gauges.',
  'applicationCategory': 'CalculatorApplication',
  'operatingSystem': 'All',
  'browserRequirements': 'Requires JavaScript. Requires HTML5.',
  'author': {
    '@type': 'Organization',
    'name': 'cmtoinches.uk',
    'url': 'https://www.cmtoinches.uk/'
  }
};

// Also write updated Root index.html with canonical tags and homepage JSON-LD for AI Search indexers
const homeJsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(homepageSchema, null, 2)}\n</script>`;
const updatedRootIndex = indexContent
  .replace(/<link rel="canonical" href="[^"]*"/g, '<link rel="canonical" href="https://www.cmtoinches.uk/"')
  .replace(/<meta property="og:url" content="[^"]*"/g, '<meta property="og:url" content="https://www.cmtoinches.uk/"')
  .replace(/<meta property="twitter:url" content="[^"]*"/g, '<meta property="twitter:url" content="https://www.cmtoinches.uk/"')
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
      'headline': meta.title,
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
      'name': meta.title,
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
    'name': meta.title,
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
    title: 'CM to Inches Converter (cm → in) – Fast & Accurate Calculator',
    description: 'Convert centimeters to inches instantly with our free CM to Inches Converter. Accurate calculations, conversion tables, formulas, and FAQs.'
  };

  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });

  const pageCanonical = `https://www.cmtoinches.uk/${route}/`;
  const schemaObj = generateJsonLdSchema(route, meta);
  const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;

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
    // 6. Inject dynamic structured JSON-LD data for Googlebot SGE and modern AI LLM engines
    .replace('</head>', `${jsonLdScript}\n</head>`);

  fs.writeFileSync(path.join(targetDir, 'index.html'), pageContent, 'utf-8');
  console.log(`Generated: ${route}/index.html with custom metadata & JSON-LD`);
});

// Also create a 404.html at the root of dist as a fallback with homepage JSON-LD
fs.writeFileSync(path.join(distDir, '404.html'), updatedRootIndex, 'utf-8');
console.log('Generated: 404.html fallback');

console.log('Static route prerendering completed successfully!');
