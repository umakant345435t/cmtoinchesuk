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
import { CookieConsent } from './components/CookieConsent';
import { Scale, Home, ChevronRight } from 'lucide-react';

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
  '/ring-shoe-size-cm/',
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
      'Convert CM to inches and inch to cm quickly with our accurate UK measurement converter, dual adaptive ruler, passport photo dims, mattress & clothing guides.';

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
        'Send questions, bug reports, or data protection requests via our interactive Contact Form or support@cmtoinches.uk.';
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
        'Important guidelines on screen ruler PPI calibration and verifying critical engineering dimensions physically.';
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
    } else if (currentPath === '/ring-shoe-size-cm/') {
      title = 'Ring, Wrist & UK Shoe Size to CM Converter | Ring Size Chart UK';
      description =
        'Convert finger circumference (mm/cm) to UK ring sizes (A–Z), print a home ring sizer, and convert foot length (cm/in) to UK child & adult shoe sizes.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [currentPath]);

  const handleNavigate = async (path: RoutePath | string, skipPushState = false) => {
    let targetPath = path as RoutePath;
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
      return <UnitChart breadcrumb={renderBreadcrumb()} />;
    }

    // 3. ISO PAPER SIZE CONVERTER A0-A15 (Code-split view)
    if (currentPath === '/paper-size-in-inches/' && RESOLVED_VIEWS.paperSize) {
      const PaperSize = RESOLVED_VIEWS.paperSize;
      return <PaperSize onNavigate={handleNavigate} breadcrumb={renderBreadcrumb()} />;
    }

    // 4. RING, WRIST & UK SHOE SIZE TO CM CONVERTER (Code-split view)
    if (currentPath === '/ring-shoe-size-cm/' && RESOLVED_VIEWS.ringShoeSize) {
      const RingShoeSize = RESOLVED_VIEWS.ringShoeSize;
      return <RingShoeSize onNavigate={handleNavigate} breadcrumb={renderBreadcrumb()} />;
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

        {/* Core Formulas & Practical UK Measurement Guides */}
        <section
          id="uk-guides"
          className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 space-y-8"
        >
          <div className="border-b border-slate-100 pb-3 space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Scale className="w-6 h-6 text-blue-600 shrink-0" />
              CM to Inches &amp; Inch to CM Converter
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
              Convert centimetres to inches and inches to centimetres accurately using the international metrology ratio (<strong className="font-mono">1 inch = 2.54 cm</strong>). Use the live calculator above for decimal and UK 1/16&quot; carpentry fractions, or consult our UK reference guides below.
            </p>
          </div>

          {/* Concise Two-Formula Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs text-blue-700 font-bold tracking-wider uppercase font-mono">
                CM to Inches
              </span>
              <div className="text-lg sm:text-xl font-black text-blue-900 font-mono">
                Inches = cm ÷ 2.54
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-sans">
                Example: <span className="font-mono font-bold">15 cm ÷ 2.54 = 5.9055 in</span>
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs text-emerald-700 font-bold tracking-wider uppercase font-mono">
                Inch to CM
              </span>
              <div className="text-lg sm:text-xl font-black text-emerald-900 font-mono">
                Centimetres = in × 2.54
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-sans">
                Example: <span className="font-mono font-bold">12 in × 2.54 = 30.48 cm</span>
              </p>
            </div>
          </div>

          {/* Practical Guide 1: UK Passport & Visa Photo Dimensions */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              1. UK Passport &amp; Photo ID Dimensions (CM &amp; Inches)
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-sans">
              Printed United Kingdom passport photographs submitted to HM Passport Office must meet strict millimetre and centimetre rules. Here is how official UK photo requirements translate into inches for imported frames or photo cutters:
            </p>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="ct-tbl ct-uk">
                <thead>
                  <tr>
                    <th>Requirement</th>
                    <th>Metric (CM / MM)</th>
                    <th>Imperial (Inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Printed Photo Size</td>
                    <td className="c-m c-b">3.5 × 4.5 cm (35 × 45 mm)</td>
                    <td className="c-m">1.38&quot; × 1.77&quot;</td>
                  </tr>
                  <tr>
                    <td>Head Size (Crown to Chin)</td>
                    <td className="c-m c-b">2.9 – 3.4 cm (29 – 34 mm)</td>
                    <td className="c-m">1.14&quot; – 1.34&quot;</td>
                  </tr>
                  <tr>
                    <td>US / India 2×2&quot; Visa Photo</td>
                    <td className="c-m c-b">5.08 × 5.08 cm (51 × 51 mm)</td>
                    <td className="c-m">2.00&quot; × 2.00&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Practical Guide 2: UK Standard Bed & Mattress Sizes */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              2. UK Standard Bed &amp; Mattress Sizes (CM vs Feet &amp; Inches)
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-sans">
              British mattress sizes differ from European IKEA and North American dimensions. Always compare both centimetre and imperial tape measurements before ordering fitted sheets or bed frames:
            </p>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="ct-tbl ct-uk">
                <thead>
                  <tr>
                    <th>UK Bed Size</th>
                    <th>Centimetres (W × L)</th>
                    <th>Inches / Feet &amp; Inches</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>UK Single</td>
                    <td className="c-m c-b">90 × 190 cm</td>
                    <td className="c-m">35.4&quot; × 74.8&quot; (3&apos; 0&quot; × 6&apos; 3&quot;)</td>
                  </tr>
                  <tr>
                    <td>Small Double (Queen)</td>
                    <td className="c-m c-b">120 × 190 cm</td>
                    <td className="c-m">47.2&quot; × 74.8&quot; (4&apos; 0&quot; × 6&apos; 3&quot;)</td>
                  </tr>
                  <tr>
                    <td>UK Double</td>
                    <td className="c-m c-b">135 × 190 cm</td>
                    <td className="c-m">53.1&quot; × 74.8&quot; (4&apos; 6&quot; × 6&apos; 3&quot;)</td>
                  </tr>
                  <tr>
                    <td>UK King Size</td>
                    <td className="c-m c-b">150 × 200 cm</td>
                    <td className="c-m">59.1&quot; × 78.7&quot; (5&apos; 0&quot; × 6&apos; 6&quot;)</td>
                  </tr>
                  <tr>
                    <td>UK Super King</td>
                    <td className="c-m c-b">180 × 200 cm</td>
                    <td className="c-m">70.9&quot; × 78.7&quot; (6&apos; 0&quot; × 6&apos; 6&quot;)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Practical Guide 3: UK & European Airline Cabin Luggage Allowances */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              3. UK &amp; European Cabin Luggage Allowances (CM to Inches)
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-sans">
              Airlines operating from UK airports publish bag sizer limits in centimetres, while suitcase manufacturers frequently tag cabin bags as 18-inch, 20-inch, or 22-inch carry-ons:
            </p>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="ct-tbl ct-uk">
                <thead>
                  <tr>
                    <th>UK / EU Airline</th>
                    <th>Limit (CM)</th>
                    <th>Converted Inches</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>British Airways (Cabin Bag)</td>
                    <td className="c-m c-b">56 × 45 × 25 cm</td>
                    <td className="c-m">22.0&quot; × 17.7&quot; × 9.8&quot;</td>
                  </tr>
                  <tr>
                    <td>easyJet (Free Under-Seat)</td>
                    <td className="c-m c-b">45 × 36 × 20 cm</td>
                    <td className="c-m">17.7&quot; × 14.2&quot; × 7.9&quot;</td>
                  </tr>
                  <tr>
                    <td>Ryanair (Free Small Bag)</td>
                    <td className="c-m c-b">40 × 20 × 25 cm</td>
                    <td className="c-m">15.7&quot; × 7.9&quot; × 9.8&quot;</td>
                  </tr>
                  <tr>
                    <td>Jet2 (Standard Hand Luggage)</td>
                    <td className="c-m c-b">56 × 45 × 25 cm</td>
                    <td className="c-m">22.0&quot; × 17.7&quot; × 9.8&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Practical Guide 4: UK Clothing, Collar & Trouser Waist Chart */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              4. UK Clothing, Shirt Collar &amp; Trouser Waist Chart
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-sans">
              UK menswear collars and denim waist sizes use inches, whereas continental brands list garments in centimetres:
            </p>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="ct-tbl ct-uk">
                <thead>
                  <tr>
                    <th>UK Garment Size</th>
                    <th>Centimetres (CM)</th>
                    <th>Imperial (Inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Men&apos;s Shirt Collar (S / M / L)</td>
                    <td className="c-m c-b">37 / 39 / 41 cm</td>
                    <td className="c-m">14.5&quot; / 15.5&quot; / 16&quot;</td>
                  </tr>
                  <tr>
                    <td>Men&apos;s Waist (30&quot; / 32&quot; / 34&quot; / 36&quot;)</td>
                    <td className="c-m c-b">76 / 81 / 86 / 91 cm</td>
                    <td className="c-m">30&quot; / 32&quot; / 34&quot; / 36&quot;</td>
                  </tr>
                  <tr>
                    <td>UK Women&apos;s Size 10 (Bust / Waist)</td>
                    <td className="c-m c-b">86 cm / 68 cm</td>
                    <td className="c-m">34&quot; / 26.8&quot;</td>
                  </tr>
                  <tr>
                    <td>UK Women&apos;s Size 14 (Bust / Waist)</td>
                    <td className="c-m c-b">96 cm / 78 cm</td>
                    <td className="c-m">37.8&quot; / 30.7&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-base text-slate-700 font-medium pt-1">
              Explore our{' '}
              <a
                href="/unit-conversion-chart/"
                onClick={(e) => {
                  e.preventDefault();
                  void handleNavigate('/unit-conversion-chart/');
                }}
                title="Master Unit Conversion Charts"
                className="text-blue-600 font-bold underline hover:text-blue-800"
              >
                Master Unit Charts (1–1500)
              </a>
              ,{' '}
              <a
                href="/paper-size-in-inches/"
                onClick={(e) => {
                  e.preventDefault();
                  void handleNavigate('/paper-size-in-inches/');
                }}
                title="Paper Size Converter A0 to A15 in Inches"
                className="text-blue-600 font-bold underline hover:text-blue-800"
              >
                Paper Size Converter (A0–A15)
              </a>
              , or{' '}
              <a
                href="/ring-shoe-size-cm/"
                onClick={(e) => {
                  e.preventDefault();
                  void handleNavigate('/ring-shoe-size-cm/');
                }}
                title="Ring, Wrist & UK Shoe Size to CM Converter"
                className="text-blue-600 font-bold underline hover:text-blue-800"
              >
                Ring, Wrist &amp; UK Shoe Size to CM Converter
              </a>
              .
            </p>
          </div>
        </section>

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

      {/* UK GDPR & PECR Cookie Consent Banner */}
      <CookieConsent onNavigate={handleNavigate} />
    </div>
  );
}
