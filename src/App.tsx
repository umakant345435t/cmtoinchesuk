import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import { CONVERSION_TYPES, REDIRECTED_PROGRAMMATIC_PRESETS } from './data/conversions';
import { RESOLVED_VIEWS, preloadRouteView } from './routeRegistry';
import { Navigation } from './components/Navigation';
import { ConverterTool } from './components/ConverterTool';
import { ConversionTables } from './components/ConversionTables';
import { FAQSection } from './components/FAQSection';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { Home, ChevronRight } from 'lucide-react';

const MAIN_CONVERTER_PATHS = new Set([
  '/inches-to-cm/',
  '/feet-to-cm/',
  '/cm-to-feet/',
  '/meters-to-feet/',
  '/feet-to-meters/',
  '/mm-to-inches/',
  '/inches-to-mm/'
]);

const STATIC_PAGE_PATHS = new Set([
  '/about-us/',
  '/contact-us/',
  '/privacy-policy/',
  '/terms-and-conditions/',
  '/disclaimer/',
  '/cookie-policy/',
  '/sitemap/'
]);

const CANONICAL_PATHS = new Set([
  '/',
  '/unit-conversion-chart/',
  '/paper-size-in-inches/',
  '/ring-size-in-cm/',
  ...MAIN_CONVERTER_PATHS,
  ...STATIC_PAGE_PATHS
]);

export default function App({ initialPath }: { initialPath?: RoutePath } = {}) {
  const [initialRedirectPreset] = useState<{ typeId: string; value: number } | null>(() => {
    if (typeof window !== 'undefined') {
      let path = window.location.pathname;
      if (!path.endsWith('/') && !path.includes('.')) {
        path = path + '/';
      }
      return REDIRECTED_PROGRAMMATIC_PRESETS[path] || null;
    }
    return null;
  });

  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (initialPath) {
      return initialPath;
    }
    if (typeof window !== 'undefined') {
      let path = window.location.pathname;
      if (!path.endsWith('/') && !path.includes('.')) {
        path = path + '/';
      }

      if (
        path === '/cm-to-inches/' ||
        path === '/cm-to-inches' ||
        path.startsWith('/cm-to-inches') ||
        Boolean(REDIRECTED_PROGRAMMATIC_PRESETS[path])
      ) {
        window.history.replaceState({ path: '/' }, '', '/');
        return '/';
      }

      if (path === '/ring-shoe-size-cm/') {
        window.history.replaceState({ path: '/ring-size-in-cm/' }, '', '/ring-size-in-cm/');
        return '/ring-size-in-cm/';
      }

      if (CANONICAL_PATHS.has(path)) {
        return path as RoutePath;
      }
    }
    return '/';
  });

  const [converterType, setConverterType] = useState<string>(() => {
    if (initialRedirectPreset) return initialRedirectPreset.typeId;
    const cleanRouteSuffix = currentPath.replace(/\//g, '');
    const typeMatch = CONVERSION_TYPES.find((t) => t.id === cleanRouteSuffix);
    if (typeMatch) return typeMatch.id;
    return 'cm-to-inches';
  });

  const [converterValue, setConverterValue] = useState<number | undefined>(() => {
    return initialRedirectPreset ? initialRedirectPreset.value : undefined;
  });

  // Handle browser back/forward navigation with zero-flicker chunk preloading
  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname;
      if (!path.endsWith('/') && !path.includes('.')) {
        path = path + '/';
      }

      const preset = REDIRECTED_PROGRAMMATIC_PRESETS[path];
      if (
        path === '/cm-to-inches/' ||
        path === '/cm-to-inches' ||
        path.startsWith('/cm-to-inches') ||
        Boolean(preset)
      ) {
        window.history.replaceState({ path: '/' }, '', '/');
        setCurrentPath('/');
        if (preset) {
          setConverterType(preset.typeId);
          setConverterValue(preset.value);
        }
        return;
      }

      if (path === '/ring-shoe-size-cm/') {
        window.history.replaceState({ path: '/ring-size-in-cm/' }, '', '/ring-size-in-cm/');
        void handleNavigate('/ring-size-in-cm/', true);
        return;
      }

      if (CANONICAL_PATHS.has(path)) {
        void handleNavigate(path as RoutePath, true);
      } else {
        void handleNavigate('/', true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Sync Document Title & Meta Description cleanly on route updates
  useEffect(() => {
    let title = 'CM to Inches Converter';
    let description =
      'Convert CM to inches and inch to cm accurately with worked formulas, UK 1/16" carpentry fractions, practical British measurement guides, and reference charts.';

    if (currentPath === '/inches-to-cm/') {
      title = 'Inches to CM Converter (in → cm) – UK Screen, Frame & Sizing Guide';
      description =
        'Convert inches to centimeters accurately for UK TV screens, photo frames, clothing, and DIY using our interactive calculator and chart.';
    } else if (currentPath === '/feet-to-cm/') {
      title = 'Feet to CM Converter (ft → cm) – UK Height & Timber Guide';
      description =
        'Translate imperial feet directly to decimal centimetres for UK NHS records, passport forms, and fencing panels.';
    } else if (currentPath === '/cm-to-feet/') {
      title = 'CM to Feet Converter (cm → ft) – Stature & Ceiling Clearance Guide';
      description =
        'Convert metric centimetres into imperial feet and inches for UK passport heights, curtains, and interior room plans.';
    } else if (currentPath === '/meters-to-feet/') {
      title = 'Meters to Feet Converter (m → ft) – UK Floorplan & Garden Guide';
      description =
        'Convert metres to feet for Rightmove/Zoopla room measurements, garden boundaries, and swimming pool distances.';
    } else if (currentPath === '/feet-to-meters/') {
      title = 'Feet to Meters Converter (ft → m) – UK Surveying & Timber Guide';
      description =
        'Convert imperial feet into SI metres for UK landscaping, paving orders, and narrowboat/caravan lengths.';
    } else if (currentPath === '/mm-to-inches/') {
      title = 'Millimeters to Inches Converter (mm → in) – UK Workshop & Carpentry Guide';
      description =
        'Convert millimetres to decimal and fractional inches (1/16") for UK woodworking, router bits, and pipework.';
    } else if (currentPath === '/inches-to-mm/') {
      title = 'Inches to Millimeters Converter (in → mm) – Precision Machining Guide';
      description =
        'Convert imperial inch fractions directly to metric millimetres for British workshops, timber boards, and hardware.';
    } else if (currentPath === '/about-us/') {
      title = 'About Us & Editorial Standards – cmtoinches.uk';
      description =
        'Learn who built cmtoinches.uk, why this independent UK length conversion utility exists, and how every formula is verified.';
    } else if (currentPath === '/contact-us/') {
      title = 'Contact Support – Feedback, Corrections & Privacy Inquiries | cmtoinches.uk';
      description =
        'Send questions, measurement corrections, or privacy enquiries directly to support@cmtoinches.uk.';
    } else if (currentPath === '/privacy-policy/') {
      title = 'Privacy Policy – UK GDPR, PECR & Google AdSense Compliance';
      description =
        'Review our visitor privacy policy, Google Consent Mode choices, AdSense cookie disclosures, and UK/EU GDPR rights.';
    } else if (currentPath === '/terms-and-conditions/') {
      title = 'Terms & Conditions – cmtoinches.uk';
      description =
        'Review our calculator usage terms, mathematical accuracy disclaimers, and governing laws of England and Wales.';
    } else if (currentPath === '/disclaimer/') {
      title = 'Legal Disclaimer – Measurement Tolerance Notice | cmtoinches.uk';
      description =
        'Important verification guidance for critical engineering, building, legal, and household measurement conversions.';
    } else if (currentPath === '/cookie-policy/') {
      title = 'Cookie Policy – UK PECR & Consent Preferences | cmtoinches.uk';
      description =
        'Details on functional local storage, Google AdSense cookies, and how to manage or withdraw cookie consent.';
    } else if (currentPath === '/sitemap/') {
      title = 'HTML Sitemap Index – cmtoinches.uk';
      description =
        'Browse all active calculators, master unit conversion charts, and statutory policy pages on cmtoinches.uk.';
    } else if (currentPath === '/unit-conversion-chart/') {
      title = 'Master Unit Conversion Charts (1 to 1500) – CM, MM, Inches & Feet';
      description =
        'Master reference lookup charts from 1 to 1500 for CM to Inches, Inches to CM, Feet to CM, MM to CM, MM to Inches, and more.';
    } else if (currentPath === '/paper-size-in-inches/') {
      title = 'Paper Size Converter: A4, A3, A2, A1 & A0–A15 in Inches, CM & MM';
      description =
        'Convert ISO paper sizes from A0 to A15 into inches, cm, mm, and 300 DPI print pixels. View exact A4 size in inches (8.27 x 11.69 in), A3, A2, and A1 dimensions.';
    } else if (currentPath === '/ring-size-in-cm/') {
      title = 'Ring Size Chart UK (A–Z) & Ring Size in CM Converter | cmtoinches.uk';
      description =
        'Measure ring size at home with our BS 6820 UK ring size chart (A–Z), finger circumference in cm/mm to UK size converter, printable 1:1 sizer, and 7 visual infographics.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [currentPath]);

  const handleNavigate = async (path: RoutePath | string, skipPushState = false) => {
    let targetPath = path as RoutePath;
    if ((targetPath as string) === '/ring-shoe-size-cm/' || (targetPath as string) === '/ring-shoe-size-cm') {
      targetPath = '/ring-size-in-cm/';
      if (typeof window !== 'undefined') {
        window.history.replaceState({ path: '/ring-size-in-cm/' }, '', '/ring-size-in-cm/');
      }
    }
    const preset = REDIRECTED_PROGRAMMATIC_PRESETS[targetPath];
    if (
      targetPath === ('/cm-to-inches/' as RoutePath) ||
      (targetPath as string) === '/cm-to-inches' ||
      Boolean(preset)
    ) {
      targetPath = '/';
      if (typeof window !== 'undefined') {
        window.history.replaceState({ path: '/' }, '', '/');
      }
    } else if (!skipPushState && typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ path: targetPath }, '', targetPath);
    }

    // Load lazy view chunk cleanly BEFORE state switch so UI never flickers
    await preloadRouteView(targetPath);

    setCurrentPath(targetPath);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    if (preset) {
      setConverterType(preset.typeId);
      setConverterValue(preset.value);
    } else if (targetPath === '/') {
      setConverterType('cm-to-inches');
      setConverterValue(undefined);
    } else {
      const cleanRouteSuffix = targetPath.replace(/\//g, '');
      const typeMatch = CONVERSION_TYPES.find((t) => t.id === cleanRouteSuffix);
      if (typeMatch) {
        setConverterType(typeMatch.id);
        setConverterValue(undefined);
      }
    }
  };

  const handleSelectValue = (typeId: string, value: number) => {
    setConverterType(typeId);
    setConverterValue(value);

    let route: RoutePath = '/';
    if (typeId === 'cm-to-inches') route = '/';
    else if (typeId === 'inches-to-cm') route = '/inches-to-cm/';
    else if (typeId === 'feet-to-cm') route = '/feet-to-cm/';
    else if (typeId === 'cm-to-feet') route = '/cm-to-feet/';
    else if (typeId === 'meters-to-feet') route = '/meters-to-feet/';
    else if (typeId === 'feet-to-meters') route = '/feet-to-meters/';
    else if (typeId === 'mm-to-inches') route = '/mm-to-inches/';
    else if (typeId === 'inches-to-mm') route = '/inches-to-mm/';

    void handleNavigate(route);
  };

  const renderBreadcrumb = () => {
    const segments = currentPath.split('/').filter(Boolean);
    return (
      <nav className="flex items-center gap-2 text-sm sm:text-base text-slate-600 font-semibold mb-4 sm:mb-6 bg-slate-50 border border-slate-200 p-3 rounded-xl">
        <a
          href="https://www.cmtoinches.uk/"
          onClick={(e) => {
            e.preventDefault();
            void handleNavigate('/');
          }}
          className="hover:text-blue-600 flex items-center gap-1.5 shrink-0 font-bold"
        >
          <Home className="w-4 h-4 text-blue-600" />
          <span>cm to inches</span>
        </a>
        {segments.map((seg, idx) => {
          const isLast = idx === segments.length - 1;
          const routeSoFar = `/${segments.slice(0, idx + 1).join('/')}/` as RoutePath;

          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              <button
                disabled={isLast}
                onClick={() => void handleNavigate(routeSoFar)}
                className={`truncate ${
                  isLast ? 'text-slate-900 font-bold cursor-default' : 'hover:text-blue-600 cursor-pointer'
                }`}
              >
                {seg.replace(/-/g, ' ')}
              </button>
            </React.Fragment>
          );
        })}
      </nav>
    );
  };

  const renderPageContent = () => {
    // 1. MAIN CONVERTER SUBPAGES (Code-split view)
    if (MAIN_CONVERTER_PATHS.has(currentPath) && RESOLVED_VIEWS.converterSubpage) {
      const ConverterSubpage = RESOLVED_VIEWS.converterSubpage;
      return (
        <ConverterSubpage
          currentPath={currentPath}
          converterValue={converterValue}
          onNavigate={handleNavigate}
          breadcrumb={renderBreadcrumb()}
        />
      );
    }

    // 2. MASTER UNIT CONVERSION CHART (1 TO 1500) (Code-split view)
    if (currentPath === '/unit-conversion-chart/' && RESOLVED_VIEWS.unitChart) {
      const UnitChart = RESOLVED_VIEWS.unitChart;
      return <UnitChart onNavigate={handleNavigate} breadcrumb={renderBreadcrumb()} />;
    }

    // 3. ISO PAPER SIZE CONVERTER A0-A15 (Code-split view)
    if (currentPath === '/paper-size-in-inches/' && RESOLVED_VIEWS.paperSize) {
      const PaperSize = RESOLVED_VIEWS.paperSize;
      return <PaperSize onNavigate={handleNavigate} breadcrumb={renderBreadcrumb()} />;
    }

    // 4. RING SIZE CHART UK & FINGER CM CONVERTER (Code-split view)
    if (currentPath === '/ring-size-in-cm/' && RESOLVED_VIEWS.ringSize) {
      const RingSize = RESOLVED_VIEWS.ringSize;
      return <RingSize onNavigate={handleNavigate} breadcrumb={renderBreadcrumb()} />;
    }

    // 4. STATUTORY, TRUST, CONTACT & SITEMAP PAGES (Code-split view)
    if (STATIC_PAGE_PATHS.has(currentPath) && RESOLVED_VIEWS.staticPages) {
      const StaticPages = RESOLVED_VIEWS.staticPages;
      return (
        <StaticPages
          currentPath={currentPath}
          onNavigate={handleNavigate}
          breadcrumb={renderBreadcrumb()}
        />
      );
    }

    // 4. HOMEPAGE VIEW (Clean interactive calculator + Real-World UK Measurement Guides)
    return (
      <div className="space-y-4 sm:space-y-8">
        {/* Instant Converter Panel */}
        <ConverterTool
          initialTypeId={converterType}
          initialFromValue={converterValue}
          onNavigate={handleNavigate}
        />

        {/* Core Formulas & Original UK Measurement Editorial Guide */}
        <article
          id="uk-guides"
          className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 space-y-7"
        >
          <div className="border-b border-slate-100 pb-4 space-y-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              CM to Inches &amp; Inch to CM Converter
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
              Convert centimetres to inches and inches to centimetres accurately using the exact international standard (<strong className="font-mono">1 inch = 2.54 cm</strong>). Enter any number above—whether a small 1.5 cm craft seam or a 240 cm room width—to see instant decimal inches, nearest <strong className="font-mono">1/16&quot;</strong> UK carpentry fractions, and the complete calculation step.
            </p>
          </div>

          {/* Concise Two-Formula Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
              <span className="text-xs text-blue-700 font-bold tracking-wider uppercase font-mono">
                CM to Inches Formula
              </span>
              <div className="text-lg sm:text-xl font-black text-blue-900 font-mono">
                Inches = cm ÷ 2.54
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-sans">
                Worked example: <span className="font-mono font-bold">10 cm ÷ 2.54 = 3.9370 in</span> (approx. 3 15/16&quot;)
              </p>
            </div>

            <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
              <span className="text-xs text-emerald-700 font-bold tracking-wider uppercase font-mono">
                Inch to CM Formula
              </span>
              <div className="text-lg sm:text-xl font-black text-emerald-900 font-mono">
                Centimetres = in × 2.54
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-sans">
                Worked example: <span className="font-mono font-bold">12 in × 2.54 = 30.48 cm</span> (1 imperial foot)
              </p>
            </div>
          </div>

          {/* Human-Written Practical UK Editorial Sections */}
          <div className="space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                How to Convert Centimetres to Inches &amp; Read 1/16&quot; Fractions
              </h2>
              <p>
                Under the International Yard and Pound Agreement of 1959 and the UK Weights and Measures Act, one international inch is fixed at exactly <strong>2.54 centimetres (25.4 mm)</strong>. Dividing any metric length by 2.54 gives decimal inches, which works cleanly for spreadsheets and CAD drawings, whereas traditional British imperial tape measures divide each inch into <strong>16 equal steps</strong> (1/16&quot;, 1/8&quot;, 1/4&quot;, 1/2&quot;).
              </p>
              <p>
                To turn a decimal result into a workshop fraction by hand, take only the digits after the decimal point and multiply by 16. For example, converting <strong>18 cm</strong> gives <code>18 ÷ 2.54 = 7.0866 in</code>. Multiplying <code>0.0866 × 16 = 1.39</code>, which rounds to <strong>1/16&quot;</strong>—so 18 cm marks just over <strong>7 1/16 inches</strong> on a physical joiner&apos;s tape.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Everyday UK Height, Mattress &amp; Passport Photo Dimensions
              </h2>
              <p>
                Because the United Kingdom blends metric official standards with traditional imperial retail labels, switching between units accurately avoids costly sizing mistakes across household purchases and government forms:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>UK Passport &amp; Visa Photos:</strong> HM Passport Office specifies printed photos at exactly <strong>35 × 45 mm (3.5 × 4.5 cm)</strong>, which converts to <strong>1.38&quot; × 1.77&quot;</strong>, with head height from crown to chin strictly between <strong>29 mm and 34 mm</strong> (1.14&quot;–1.34&quot;). By comparison, US and Indian 2×2 inch visa photos equal <strong>5.08 × 5.08 cm</strong>.
                </li>
                <li>
                  <strong>UK Bed &amp; Mattress Sizes:</strong> A British Single measures <strong>90 × 190 cm</strong> (3&apos; 0&quot; × 6&apos; 3&quot;), a UK Double measures <strong>135 × 190 cm</strong> (4&apos; 6&quot; × 6&apos; 3&quot;), a UK King is <strong>150 × 200 cm</strong> (5&apos; 0&quot; × 6&apos; 6&quot;), and a UK Super King is <strong>180 × 200 cm</strong> (6&apos; 0&quot; × 6&apos; 6&quot;). Always check metric dimensions before ordering fitted sheets from European IKEA stores (where a Double is 140 × 200 cm) or North American brands.
                </li>
                <li>
                  <strong>Personal Height on UK Forms:</strong> Divide your height in centimetres by 2.54 for total inches, then divide by 12 for whole feet. For instance, <strong>170 cm</strong> equals 66.93 inches (<strong>5 ft 7 in</strong>), <strong>175 cm</strong> equals 68.90 inches (<strong>5 ft 9 in</strong>), and <strong>180 cm</strong> equals 70.87 inches (<strong>5 ft 11 in</strong>).
                </li>
                <li>
                  <strong>UK Cabin Bags &amp; Parcel Limits:</strong> British Airways and Jet2 allow standard cabin bags up to <strong>56 × 45 × 25 cm</strong> (22.0&quot; × 17.7&quot; × 9.8&quot;), while Ryanair&apos;s free under-seat bag limit is <strong>40 × 20 × 25 cm</strong> (15.7&quot; × 7.9&quot; × 9.8&quot;). Royal Mail Small Parcels must stay within <strong>45 × 35 × 16 cm</strong> (17.7&quot; × 13.8&quot; × 6.3&quot;).
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Common CM-to-Inches Conversion Mistakes to Avoid
              </h2>
              <p>
                Even experienced DIYers and online shoppers frequently run into subtle unit traps when switching between metric and imperial specifications:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>Confusing decimal feet with feet and inches:</strong> A result of <strong>5.5 ft</strong> equals <strong>5 ft 6 in</strong> (half of 12 inches), not 5 ft 5 in. Always multiply the decimal portion of feet by 12 to obtain exact inches.
                </li>
                <li>
                  <strong>Using 2.5 instead of 2.54 for long spans:</strong> Rough mental rounding (dividing by 2.5) introduces a 1.6% error—barely noticeable on 5 cm, yet over a <strong>240 cm</strong> kitchen worktop it creates a <strong>3.8 cm (1.5 inch)</strong> cutting mistake.
                </li>
                <li>
                  <strong>Ignoring internal vs. external sizing:</strong> Television screens (e.g., 55&quot; = 139.7 cm) measure diagonally across the glass panel without the bezel, whereas UK photo frames (e.g., 8&quot; × 10&quot; = 20.3 × 25.4 cm) describe the artwork aperture rather than the outer moulding.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Specialised UK Sizing &amp; Print Reference Tools
              </h2>
              <p>
                Need exact dimensions for UK printing or jewellery? Check our{' '}
                <a
                  href="/paper-size-in-inches/"
                  onClick={(e) => {
                    e.preventDefault();
                    void handleNavigate('/paper-size-in-inches/');
                  }}
                  className="text-blue-600 font-bold underline hover:text-blue-800"
                >
                  Paper Size in Inches Converter (A0–A15)
                </a>{' '}
                for A4 (8.27&quot; × 11.69&quot;) and framing bleed sizes, use our{' '}
                <a
                  href="/ring-size-in-cm/"
                  onClick={(e) => {
                    e.preventDefault();
                    void handleNavigate('/ring-size-in-cm/');
                  }}
                  className="text-blue-600 font-bold underline hover:text-blue-800"
                >
                  Ring Size Chart UK (A–Z)
                </a>{' '}
                for BS 6820 finger circumference measurements, or browse our{' '}
                <a
                  href="/unit-conversion-chart/"
                  onClick={(e) => {
                    e.preventDefault();
                    void handleNavigate('/unit-conversion-chart/');
                  }}
                  className="text-blue-600 font-bold underline hover:text-blue-800"
                >
                  Master Unit Charts (1–1500)
                </a>
                .
              </p>
            </div>
          </div>
        </article>

        {/* Reference tables block */}
        <section>
          <ConversionTables onSelectValue={handleSelectValue} onNavigate={handleNavigate} />
        </section>

        {/* FAQ Accordions Section */}
        <section>
          <FAQSection />
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Dynamic Header & Path Bar */}
      <Navigation currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Main Container */}
      <main className="flex-1 w-full lg:w-[68%] max-w-[900px] mx-auto px-3 sm:px-5 pt-2 sm:pt-3 pb-6 sm:pb-8 space-y-6">
        {/* Main content pane */}
        <section className="w-full">{renderPageContent()}</section>

        {/* Related Converters Section */}
        <section className="w-full">
          <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
        </section>
      </main>

      {/* Footer Area */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
