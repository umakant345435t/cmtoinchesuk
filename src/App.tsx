import React, { useState, useEffect } from 'react';
import { RoutePath, FAQItem } from './types';
import { CONVERSION_TYPES, POPULAR_PAGES, FAQ_HOME } from './data/conversions';
import { POLICIES_DATA } from './data/policies';
import { Navigation } from './components/Navigation';
import { ConverterTool } from './components/ConverterTool';
import { ConversionTables } from './components/ConversionTables';
import { FAQSection } from './components/FAQSection';
import { Sidebar } from './components/Sidebar';
import { Sitemap } from './components/Sitemap';
import { AdSensePlaceholder } from './components/AdSensePlaceholder';
import { Footer } from './components/Footer';

import { 
  Calculator, 
  BookOpen, 
  Info, 
  Mail, 
  ShieldAlert, 
  Check, 
  ArrowLeft, 
  HelpCircle, 
  Scale, 
  Home, 
  ChevronRight,
  TrendingUp,
  FileCheck,
  Send
} from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined') {
      let path = window.location.pathname;
      if (!path.endsWith('/') && !path.includes('.')) {
        path = path + '/';
      }
      
      const allPaths: string[] = [
        '/',
        '/cm-to-inches/',
        '/inches-to-cm/',
        '/feet-to-cm/',
        '/cm-to-feet/',
        '/meters-to-feet/',
        '/feet-to-meters/',
        '/mm-to-inches/',
        '/inches-to-mm/',
        '/150-cm-to-inches/',
        '/170-cm-to-inches/',
        '/180-cm-to-inches/',
        '/200-cm-to-inches/',
        '/5-feet-in-cm/',
        '/6-feet-in-cm/',
        '/about-us/',
        '/contact-us/',
        '/privacy-policy/',
        '/terms-and-conditions/',
        '/disclaimer/',
        '/cookie-policy/',
        '/sitemap/',
        '/unit-conversion-chart/'
      ];
      
      if (allPaths.includes(path)) {
        return path as RoutePath;
      }
    }
    return '/';
  });
  const [converterType, setConverterType] = useState<string>('cm-to-inches');
  const [converterValue, setConverterValue] = useState<number | undefined>(undefined);

  // States for interactive contact page
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Standard Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Handle popstate (browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname;
      if (!path.endsWith('/') && !path.includes('.')) {
        path = path + '/';
      }
      
      const allPaths: string[] = [
        '/',
        '/cm-to-inches/',
        '/inches-to-cm/',
        '/feet-to-cm/',
        '/cm-to-feet/',
        '/meters-to-feet/',
        '/feet-to-meters/',
        '/mm-to-inches/',
        '/inches-to-mm/',
        '/150-cm-to-inches/',
        '/170-cm-to-inches/',
        '/180-cm-to-inches/',
        '/200-cm-to-inches/',
        '/5-feet-in-cm/',
        '/6-feet-in-cm/',
        '/about-us/',
        '/contact-us/',
        '/privacy-policy/',
        '/terms-and-conditions/',
        '/disclaimer/',
        '/cookie-policy/',
        '/sitemap/',
        '/unit-conversion-chart/'
      ];

      if (allPaths.includes(path)) {
        handleNavigate(path as RoutePath);
      } else {
        handleNavigate('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Synchronize dynamic routes on startup
  useEffect(() => {
    if (currentPath !== '/') {
      handleNavigate(currentPath);
    }
  }, []);

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentPath]);

  // Hook to handle dynamic Document Title & SEO meta updates in real-time
  useEffect(() => {
    let title = 'CM to Inches Converter (cm → in) – Fast & Accurate Calculator';
    let description = 'Convert centimeters to inches instantly with our free CM to Inches Converter. Accurate calculations, conversion tables, formulas, and FAQs.';

    // Matches popular pages
    const popPage = POPULAR_PAGES.find(p => p.path === currentPath);
    if (popPage) {
      title = popPage.title;
      description = popPage.description;
    } else if (currentPath === '/cm-to-inches/') {
      title = 'CM to Inches Converter (cm → in) – Fast Imperial Tool';
      description = 'Determine centimeter to inches instantly. Official 1cm = 2.54in standards guide.';
    } else if (currentPath === '/inches-to-cm/') {
      title = 'Inches to CM Converter (in → cm) – Dynamic Ruler Calculator';
      description = 'Convert inches to centimeters using our high-precision base-10 metrics translator.';
    } else if (currentPath === '/feet-to-cm/') {
      title = 'Feet to CM Converter (ft → cm) – Vertical Height Calculator';
      description = 'Translate standard imperial feet measures directly to decimal centimeters. Ideal for UK passports.';
    } else if (currentPath === '/cm-to-feet/') {
      title = 'CM to Feet Converter (cm → ft) – Physical Statures Guide';
      description = 'Convert metric centimeters to customary imperial feet layout. Check formulas on-page.';
    } else if (currentPath === '/meters-to-feet/') {
      title = 'Meters to Feet Converter (m → ft) – Modern Metrology';
      description = 'Convert meters to feet instantly with this accurate calculator. Clean charts included.';
    } else if (currentPath === '/feet-to-meters/') {
      title = 'Feet to Meters Converter (ft → m) – Technical Measurements';
      description = 'Convert feet measurements into SI meters with a clear mathematical step solver.';
    } else if (currentPath === '/mm-to-inches/') {
      title = 'Millimeters to Inches Converter (mm → in) – Carpenter Standard';
      description = 'Convert fine millimeters to traditional inches fractions. Suited for UK woodworking and fabric mills.';
    } else if (currentPath === '/inches-to-mm/') {
      title = 'Inches to Millimeters Converter (in → mm) – Metalwork Precise';
      description = 'Convert imperial inches directly to metric millimeter values instantly.';
    } else if (currentPath === '/about-us/') {
      title = 'About Our Metrological Mission – cmtoinches.uk';
      description = 'Meet our team, study our measurement standards commitments, and review our accuracy promise.';
    } else if (currentPath === '/contact-us/') {
      title = 'Contact Metrological Support – Feedback & Queries';
      description = 'Get in touch with the admin team at cmtoinches.uk. Reach our desk at support@cmtoinches.uk.';
    } else if (currentPath === '/privacy-policy/') {
      title = 'Privacy Policy – GDPR & AdSense Compliance standards';
      description = 'Review our detailed visitor privacy policy, AdSense cookie agreements, and full EU/UK GDPR alignment files.';
    } else if (currentPath === '/terms-and-conditions/') {
      title = 'Terms & Conditions of Service – cmtoinches.uk';
      description = 'Study our calculator usage disclaimers, mathematical liability rules, and educational permissions.';
    } else if (currentPath === '/disclaimer/') {
      title = 'Complete Metrology Disclaimer – Verification Warning';
      description = 'Our official guidelines, calculations, and safety boundaries for architectural and mechanical DIY uses.';
    } else if (currentPath === '/cookie-policy/') {
      title = 'Cookie Policy – UK PECR & Tracking Frameworks';
      description = 'Details on how we leverage secure cache-only variables to improve page rendering speeds.';
    } else if (currentPath === '/sitemap/') {
      title = 'HTML Sitemap Index – cmtoinches.uk Navigation Map';
      description = 'Browse 100% of the active URLs, conversion guides, and legal policy structures on this portal.';
    } else if (currentPath === '/unit-conversion-chart/') {
      title = 'Inch in CM vs Stone to KG – Unit Conversion Chart & Quick Difference List';
      description = 'Compare length conversions (inch in cm) with weight conversions (stone to kg) using our quick reference list, conversion formula chart, and partner calculators.';
    }

    document.title = title;

    // Dynamically update meta description if safe
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [currentPath]);

  // Handle setting a custom value and type
  const handleSelectValue = (typeId: string, value: number) => {
    setConverterType(typeId);
    setConverterValue(value);
    
    // Auto translate type to RoutePath
    let route: RoutePath = '/';
    if (typeId === 'cm-to-inches') route = '/cm-to-inches/';
    else if (typeId === 'inches-to-cm') route = '/inches-to-cm/';
    else if (typeId === 'feet-to-cm') route = '/feet-to-cm/';
    else if (typeId === 'cm-to-feet') route = '/cm-to-feet/';
    else if (typeId === 'meters-to-feet') route = '/meters-to-feet/';
    else if (typeId === 'feet-to-meters') route = '/feet-to-meters/';
    else if (typeId === 'mm-to-inches') route = '/mm-to-inches/';
    else if (typeId === 'inches-to-mm') route = '/inches-to-mm/';
    
    setCurrentPath(route);
    if (typeof window !== 'undefined' && window.location.pathname !== route) {
      window.history.pushState({ path: route }, '', route);
    }
  };

  const handleNavigate = (path: RoutePath) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ path }, '', path);
    }
    // Reset specific custom values if arriving at generic route
    if (path === '/') {
      setConverterType('cm-to-inches');
      setConverterValue(0);
    } else {
      // Configure corresponding tool type based on route
      const cleanRouteSuffix = path.replace(/\//g, '');
      const typeMatch = CONVERSION_TYPES.find(t => t.id === cleanRouteSuffix);
      if (typeMatch) {
        setConverterType(typeMatch.id);
        setConverterValue(undefined);
      }
      
      const isPopular = POPULAR_PAGES.find(p => p.path === path);
      if (isPopular) {
        // Preset specific values
        let matchingType = 'cm-to-inches';
        if (isPopular.fromUnit === 'ft') matchingType = 'feet-to-cm';
        setConverterType(matchingType);
        setConverterValue(isPopular.fromValue);
      }
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSubmitted(true);
  };

  const renderBreadcrumb = () => {
    const segments = currentPath.split('/').filter(Boolean);
    return (
      <nav className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-6 bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
        <a 
          href="https://www.cmtoinches.uk/" 
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('/');
          }} 
          className="hover:text-blue-600 flex items-center gap-1 shrink-0 font-bold"
        >
          <Home className="w-3 h-3" />
          <span>cm to inches</span>
        </a>
        {segments.map((seg, idx) => {
          const isLast = idx === segments.length - 1;
          const routeSoFar = `/${segments.slice(0, idx + 1).join('/')}/` as RoutePath;
          
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <button
                disabled={isLast}
                onClick={() => handleNavigate(routeSoFar)}
                className={`truncate ${isLast ? 'text-slate-700 font-bold cursor-default' : 'hover:text-blue-600'}`}
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
    // 1. POPULAR CONVERSION LANDINGS
    const matchedPopularPage = POPULAR_PAGES.find(p => p.path === currentPath);
    if (matchedPopularPage) {
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-1 rounded font-mono uppercase tracking-wider">
              Popular Height Landmark Setup
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {matchedPopularPage.h1}
            </h1>
            
            <p className="text-lg text-slate-700 leading-relaxed font-sans">
              {matchedPopularPage.explanationText} Use our accurate length converter configured specifically below to change variables, review imperial increments, and extract fractional references.
            </p>

            <ConverterTool 
              initialTypeId={converterType} 
              initialFromValue={converterValue || matchedPopularPage.fromValue} 
              onNavigate={handleNavigate}
            />

            <AdSensePlaceholder slotId="1002" type="in-feed-horizontal" />

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-3.5 text-sm text-slate-700">
              <h3 className="text-xl font-extrabold flex items-center gap-1.5 text-slate-900">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                Comparative Calibration Table
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                In standard UK trade registries, {matchedPopularPage.fromValue} {matchedPopularPage.fromUnit} represents:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg text-slate-700 font-sans">
                <li><strong>{matchedPopularPage.toValue.toFixed(4)} Inches</strong> (Decimal layout)</li>
                <li><strong>{ (matchedPopularPage.fromValue / 2.54).toFixed(2) } Inches</strong> (General rounding)</li>
                {matchedPopularPage.displayImperial && (
                  <li><strong>Height Equivalent: {matchedPopularPage.displayImperial}</strong></li>
                )}
                <li>Estimated standard deviation margin: 0% (Absolute Mathematical Value)</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // 2. MAIN CONVERTER PAGES (Topical authority)
    const isMainConverterRoute = [
      '/cm-to-inches/',
      '/inches-to-cm/',
      '/feet-to-cm/',
      '/cm-to-feet/',
      '/meters-to-feet/',
      '/feet-to-meters/',
      '/mm-to-inches/',
      '/inches-to-mm/'
    ].includes(currentPath);

    if (isMainConverterRoute) {
      const activeType = CONVERSION_TYPES.find(t => t.id === currentPath.replace(/\//g, '')) || CONVERSION_TYPES[0];
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded font-mono uppercase tracking-widest">
              Authority Metrological Portal
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {activeType.label} (Precise {activeType.fromUnit} → {activeType.toUnit})
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed font-sans">
              Welcome to the official <strong>{activeType.label}</strong> authority segment. Use our optimized input layout box to calculate instantly, copy calibrated outcomes, and utilize correct step calculations.
            </p>

            <ConverterTool 
              initialTypeId={activeType.id} 
              initialFromValue={converterValue} 
              onNavigate={handleNavigate}
            />

            <AdSensePlaceholder slotId="1003" type="in-feed-horizontal" />

            <div className="space-y-4 prose text-lg text-slate-700">
              <h3 className="font-black text-slate-950 text-xl">How to manually solve this conversion?</h3>
              <p className="text-lg text-slate-700 leading-relaxed font-sans">
                To resolve this manually without an online engine, leverage the official formula: <code className="bg-slate-100 p-1.5 rounded font-mono font-black text-slate-900 text-base">{activeType.formula}</code>.
              </p>
              <h3 className="font-black text-slate-950 text-xl mt-5">Practical everyday demonstration:</h3>
              <p className="text-lg text-slate-700 leading-relaxed font-sans">
                {activeType.example}. By maintaining high-precision coefficient ratios, we prevent physical measurement miscalculation errors across textile sewing models, heavy architectural design tasks, and UK driving licenses.
              </p>
            </div>

            {currentPath === '/inches-to-cm/' && (
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl space-y-2 mt-6">
                <h4 className="text-xs font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span>⚡ External Conversion Resource</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Need to convert inches to centimeters for height, TV screens, paper, furniture, or everyday measurements? Visit our partner tool for fast <a href="https://inchesincm.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">inch in cm</a> conversions.
                </p>
              </div>
            )}

            {currentPath === '/feet-to-cm/' && (
              <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl space-y-2 mt-6">
                <h4 className="text-xs font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span>⚡ External Weight Converter</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Need to convert body weight, fitness, or everyday measurements between stone, pounds, and kilograms? Visit our partner tool for instant <a href="https://stonetokg.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">stone to kg</a> conversions.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 3. STATUTORY legal pages
    if (currentPath === '/about-us/') {
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="p-1 bg-slate-900 rounded text-amber-400 select-none text-sm font-bold">About</span>
              {POLICIES_DATA.aboutUs.title}
            </h1>
            <p className="text-lg text-slate-800 leading-relaxed font-black">
              {POLICIES_DATA.aboutUs.intro}
            </p>
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <h3 className="font-extrabold text-xl text-slate-900">1. Our Core Mission</h3>
              <p className="text-lg text-slate-700 leading-relaxed font-sans">{POLICIES_DATA.aboutUs.mission}</p>
              
              <h3 className="font-extrabold text-xl text-slate-900">2. Our Accuracy Commitment</h3>
              <p className="text-lg text-slate-700 leading-relaxed font-sans">{POLICIES_DATA.aboutUs.qualityPromise}</p>

              <h3 className="font-extrabold text-xl text-slate-900">3. Local UK Headquarters</h3>
              <p className="bg-slate-50 p-4 rounded-lg border border-slate-100 font-mono text-sm text-slate-700">
                {POLICIES_DATA.aboutUs.address}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentPath === '/contact-us/') {
      const handleCopyEmail = () => {
        navigator.clipboard.writeText('support@cmtoinches.uk');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 3000);
      };

      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6 text-center max-w-2xl mx-auto">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
              <Mail className="w-8 h-8 stroke-[2.2]" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Contact Our Support Team
              </h1>
              <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-sans">
                We value your comments, measurement inquiries, advertising partnerships, or metrological bug reports. To maintain your privacy and secure communication, we do not utilize third-party web forms.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 max-w-md mx-auto">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Official Helpdesk Email Address
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <a 
                  href="mailto:support@cmtoinches.uk" 
                  className="text-lg font-extrabold text-blue-600 hover:text-blue-700 hover:underline break-all font-mono tracking-tight"
                >
                  support@cmtoinches.uk
                </a>
                
                <button
                  onClick={handleCopyEmail}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    emailCopied 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' 
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                  aria-label="Copy email address"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 opacity-40" />
                      Copy Address
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-slate-400 font-medium">
                Our metrology support officers review all inquiries and respond within 48 business hours.
              </div>
            </div>

            <div className="text-xs text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-center gap-4">
              <span>📍 London, United Kingdom</span>
              <span>•</span>
              <span>⚡ Fast Response Guild</span>
            </div>
          </div>
        </div>
      );
    }

    if (currentPath === '/privacy-policy/') {
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h1 className="text-xl md:text-2xl font-black text-slate-900">
                {POLICIES_DATA.privacyPolicy.title}
              </h1>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Last updated: {POLICIES_DATA.privacyPolicy.lastUpdated}</p>
            </div>
            
            <div className="space-y-8 text-lg text-slate-700 leading-relaxed font-sans">
              {POLICIES_DATA.privacyPolicy.sections.map((sect, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="font-black text-xl text-slate-900">{sect.heading}</h3>
                  <p className="text-lg text-slate-700 leading-relaxed font-sans">{sect.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (currentPath === '/terms-and-conditions/') {
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h1 className="text-xl md:text-2xl font-black text-slate-900">
                {POLICIES_DATA.termsOfUse.title}
              </h1>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Last updated: {POLICIES_DATA.termsOfUse.lastUpdated}</p>
            </div>
            
            <div className="space-y-8 text-lg text-slate-700 leading-relaxed font-sans">
              {POLICIES_DATA.termsOfUse.sections.map((sect, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="font-black text-xl text-slate-900">{sect.heading}</h3>
                  <p className="text-lg text-slate-700 leading-relaxed font-sans">{sect.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (currentPath === '/disclaimer/') {
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-600 animate-pulse" />
              {POLICIES_DATA.disclaimer.title}
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold bg-rose-50 p-5 rounded-xl border border-rose-100 font-sans">
              {POLICIES_DATA.disclaimer.content}
            </p>
          </div>
        </div>
      );
    }

    if (currentPath === '/cookie-policy/') {
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
            <h1 className="text-xl md:text-2xl font-black text-slate-900">
              {POLICIES_DATA.cookiePolicy.title}
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed font-sans">
              {POLICIES_DATA.cookiePolicy.content}
            </p>
          </div>
        </div>
      );
    }

    if (currentPath === '/sitemap/') {
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <Sitemap onNavigate={handleNavigate} />
        </div>
      );
    }

    if (currentPath === '/unit-conversion-chart/') {
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
            <div className="border-b border-slate-100 pb-5 space-y-2">
              <span className="text-[10px] bg-blue-100 text-blue-800 font-black px-3 py-1 rounded-lg font-mono uppercase tracking-widest">
                UNIT CONVERSION QUICK CHART
              </span>
              <h1 className="text-xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                Inch in CM vs Stone to KG Comparison Chart
              </h1>
              <p className="text-base text-slate-700 font-medium leading-relaxed font-sans">
                Quick comparison list, difference summary, and conversion tables comparing length measurements (<a href="https://inchesincm.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">inch in cm</a>) and body weight measurements (<a href="https://stonetokg.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">stone to kg</a>).
              </p>
            </div>

            {/* Quick Partner Links Highlights */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-2">
                <h3 className="text-xs font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span>📏 Length Converter Partner</span>
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Need fast and accurate length conversions for height, paper sizes, furniture, and screens? Visit our partner tool for <a href="https://inchesincm.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">inch in cm</a> conversions.
                </p>
              </div>

              <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl space-y-2">
                <h3 className="text-xs font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span>⚖️ Weight Converter Partner</span>
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Need body weight, luggage, fitness, or scale conversions between stones, pounds, and kilograms? Use our partner calculator for <a href="https://stonetokg.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">stone to kg</a> conversions.
                </p>
              </div>
            </div>

            {/* Key Differences List */}
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight border-b border-slate-100 pb-2">
                Key Differences: Inch in CM vs Stone to KG
              </h2>
              <ul className="space-y-3 text-sm text-slate-700 font-sans">
                <li className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>1. Physical Dimension:</strong> <a href="https://inchesincm.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">inch in cm</a> measures <em>Length, Height, and Distance</em>, whereas <a href="https://stonetokg.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">stone to kg</a> measures <em>Mass and Body Weight</em>.
                </li>
                <li className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>2. Imperial &amp; Metric Standards:</strong> 1 inch is defined as exactly 2.54 centimeters. 1 British stone is defined as 14 pounds or approximately 6.35029 kilograms.
                </li>
                <li className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>3. Conversion Formulas:</strong>
                  <ul className="mt-2 space-y-1 text-xs font-mono">
                    <li>• Length: <code className="bg-white px-2 py-0.5 rounded border">Centimeters = Inches × 2.54</code></li>
                    <li>• Weight: <code className="bg-white px-2 py-0.5 rounded border">Kilograms = Stone × 6.35029318</code></li>
                  </ul>
                </li>
                <li className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>4. Primary Uses in the UK:</strong> Length conversions like <a href="https://inchesincm.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">inch in cm</a> are used for UK passport height, screen dimensions, clothing waist sizes, and timber design. Weight conversions like <a href="https://stonetokg.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">stone to kg</a> are used for body weight scales, gym progress, luggage, and medical charts.
                </li>
              </ul>
            </div>

            {/* Side by Side Conversion Reference Tables */}
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                Quick Unit Conversion Reference Charts
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Inch to CM Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-blue-600 text-white p-3.5 font-bold text-sm flex justify-between items-center">
                    <span>Inch to CM Reference Chart</span>
                    <a href="https://inchesincm.de/" target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-300 font-mono underline">
                      inch in cm →
                    </a>
                  </div>
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 font-bold text-slate-800">
                      <tr>
                        <th className="p-2.5 border-b">Inches (in)</th>
                        <th className="p-2.5 border-b">Centimeters (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr><td className="p-2.5">1 in</td><td className="p-2.5 font-bold">2.54 cm</td></tr>
                      <tr><td className="p-2.5">5 in</td><td className="p-2.5 font-bold">12.70 cm</td></tr>
                      <tr><td className="p-2.5">10 in</td><td className="p-2.5 font-bold">25.40 cm</td></tr>
                      <tr><td className="p-2.5">12 in (1 ft)</td><td className="p-2.5 font-bold">30.48 cm</td></tr>
                      <tr><td className="p-2.5">60 in (5 ft)</td><td className="p-2.5 font-bold">152.40 cm</td></tr>
                      <tr><td className="p-2.5">72 in (6 ft)</td><td className="p-2.5 font-bold">182.88 cm</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Stone to KG Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-amber-600 text-white p-3.5 font-bold text-sm flex justify-between items-center">
                    <span>Stone to KG Reference Chart</span>
                    <a href="https://stonetokg.uk/" target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-300 font-mono underline">
                      stone to kg →
                    </a>
                  </div>
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 font-bold text-slate-800">
                      <tr>
                        <th className="p-2.5 border-b">Stone (st)</th>
                        <th className="p-2.5 border-b">Kilograms (kg)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr><td className="p-2.5">1 st</td><td className="p-2.5 font-bold">6.35 kg</td></tr>
                      <tr><td className="p-2.5">5 st</td><td className="p-2.5 font-bold">31.75 kg</td></tr>
                      <tr><td className="p-2.5">10 st</td><td className="p-2.5 font-bold">63.50 kg</td></tr>
                      <tr><td className="p-2.5">11 st</td><td className="p-2.5 font-bold">69.85 kg</td></tr>
                      <tr><td className="p-2.5">12 st</td><td className="p-2.5 font-bold">76.20 kg</td></tr>
                      <tr><td className="p-2.5">14 st</td><td className="p-2.5 font-bold">88.90 kg</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 5. HOMEPAGE VIEW (Most Important Layout)
    return (
      <div className="space-y-8">
        {/* Instant Converter Panel */}
        <ConverterTool 
          initialTypeId={converterType} 
          initialFromValue={converterValue} 
          onNavigate={handleNavigate}
        />

        {/* Rich SEO Content (Topical relevance section) */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Scale className="w-6 h-6 text-blue-600" />
              CM to Inches &amp; Inch to CM Converter
            </h1>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed font-sans">
            Welcome to <strong>cmtoinches.uk</strong>, the premier UK measurement conversion tool. Whether you need to convert <strong>CM to Inches</strong> for clothing, DIY, and heights, or <strong>Inch to CM</strong> for engineering and woodworking, our instant UK calculator provides 100% accurate, high-precision results based on international metrology standards.
          </p>

          {/* Grid of Two Core Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {/* CM to Inches Formula Card */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-2xl font-mono space-y-3 shadow-sm">
              <span className="text-xs text-blue-700 font-black tracking-widest uppercase">1. CM TO INCHES FORMULA</span>
              <div className="text-xl font-black text-blue-900">
                Inches = Centimeters ÷ 2.54
              </div>
              <p className="text-xs text-slate-600 font-sans">
                Alternatively: <code className="bg-white/80 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">CM × 0.393701</code>
              </p>
              <div className="text-xs text-slate-700 font-sans pt-2 border-t border-blue-200/60">
                <strong>Example:</strong> 10 cm ÷ 2.54 = <strong>3.937 inches</strong>
              </div>
            </div>

            {/* Inch to CM Formula Card */}
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-600 rounded-r-2xl font-mono space-y-3 shadow-sm">
              <span className="text-xs text-emerald-700 font-black tracking-widest uppercase">2. INCH TO CM FORMULA</span>
              <div className="text-xl font-black text-emerald-900">
                Centimeters = Inches × 2.54
              </div>
              <p className="text-xs text-slate-600 font-sans">
                Exact constant defined by international agreement.
              </p>
              <div className="text-xs text-slate-700 font-sans pt-2 border-t border-emerald-200/60">
                <strong>Example:</strong> 12 inches × 2.54 = <strong>30.48 cm</strong>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
              CM to Inches Conversion (Metric to Imperial)
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-sans">
              Converting centimeters (cm) to inches (in) is required across the UK for height documentation on passports, online apparel sizing, and household measurements. Because 1 inch is defined as exactly 2.54 centimeters, dividing any centimeter figure by 2.54 gives the corresponding length in customary imperial inches.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
              Inch to CM Conversion (Imperial to Metric)
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-sans">
              Converting inches to centimeters (inch to cm) translates traditional imperial dimensions into the decimal System International (SI) metric framework. Simply multiply the number of inches by 2.54 to get the exact measurement in centimeters. For instance, a 70-inch height translates to <code className="bg-slate-100 text-slate-900 px-2 py-0.5 rounded font-mono font-bold">70 × 2.54 = 177.8 cm</code>.
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8">
        
        {/* Grid layout for layout structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main content pane (Left/Center Column) */}
          <section className="lg:col-span-8 order-1">
            {renderPageContent()}
          </section>

          {/* Sidebar Area (Right Column) */}
          <section className="lg:col-span-4 order-2 space-y-6">
            
            {/* Quick mini info block */}
            <div className="bg-amber-400 text-slate-950 p-4 rounded-2xl shadow-sm text-xs font-semibold flex items-center justify-between gap-3 border border-amber-300">
              <span>🇬🇧 Standard UK Metrical calibration model approved.</span>
              <TrendingUp className="w-5 h-5 opacity-80 shrink-0" />
            </div>

            <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
          </section>

        </div>
      </main>

      {/* Footer Area */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
