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
      
      // 301 Permanent Redirect: remove duplicate /cm-to-inches/ page and route to / (homepage)
      if (path === '/cm-to-inches/' || path === '/cm-to-inches' || path.startsWith('/cm-to-inches')) {
        window.history.replaceState({ path: '/' }, '', '/');
        return '/';
      }
      
      const allPaths: string[] = [
        '/',
        '/inches-to-cm/',
        '/feet-to-cm/',
        '/cm-to-feet/',
        '/meters-to-feet/',
        '/feet-to-meters/',
        '/mm-to-inches/',
        '/inches-to-mm/',
        '/90-cm-to-inches/',
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
  const [converterType, setConverterType] = useState<string>(() => {
    const cleanRouteSuffix = currentPath.replace(/\//g, '');
    const typeMatch = CONVERSION_TYPES.find(t => t.id === cleanRouteSuffix);
    if (typeMatch) return typeMatch.id;
    const isPopular = POPULAR_PAGES.find(p => p.path === currentPath);
    if (isPopular) return isPopular.fromUnit === 'ft' ? 'feet-to-cm' : 'cm-to-inches';
    return 'cm-to-inches';
  });
  const [converterValue, setConverterValue] = useState<number | undefined>(() => {
    const isPopular = POPULAR_PAGES.find(p => p.path === currentPath);
    return isPopular ? isPopular.fromValue : undefined;
  });

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
      
      // 301 Redirect duplicate /cm-to-inches/ to /
      if (path === '/cm-to-inches/' || path === '/cm-to-inches' || path.startsWith('/cm-to-inches')) {
        window.history.replaceState({ path: '/' }, '', '/');
        handleNavigate('/');
        return;
      }

      const allPaths: string[] = [
        '/',
        '/inches-to-cm/',
        '/feet-to-cm/',
        '/cm-to-feet/',
        '/meters-to-feet/',
        '/feet-to-meters/',
        '/mm-to-inches/',
        '/inches-to-mm/',
        '/90-cm-to-inches/',
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

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentPath]);

  // Hook to handle dynamic Document Title & SEO meta updates in real-time
  useEffect(() => {
    let title = 'CM to Inches Converter';
    let description = 'Convert centimeters to inches instantly with our free CM to Inches Converter. Accurate calculations, conversion tables, formulas, and FAQs.';

    // Matches popular pages
    const popPage = POPULAR_PAGES.find(p => p.path === currentPath);
    if (popPage) {
      title = popPage.title;
      description = popPage.description;
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
      title = 'CM to Inches, Inches to CM & Feet to CM – Master Unit Conversion Chart';
      description = 'Master reference lookup charts for CM to Inches, Inches to CM (inch to cm), and Feet to CM conversions with instant formulas and calculators.';
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
    
    // Auto translate type to RoutePath (cm-to-inches maps directly to canonical homepage '/')
    let route: RoutePath = '/';
    if (typeId === 'cm-to-inches') route = '/';
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

  const handleNavigate = (path: RoutePath | string) => {
    let targetPath = path as RoutePath;
    if (targetPath === ('/cm-to-inches/' as RoutePath) || (targetPath as string) === '/cm-to-inches') {
      targetPath = '/';
      if (typeof window !== 'undefined') {
        window.history.replaceState({ path: '/' }, '', '/');
      }
    } else if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ path: targetPath }, '', targetPath);
    }
    setCurrentPath(targetPath);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    // Reset specific custom values if arriving at generic route
    if (targetPath === '/') {
      setConverterType('cm-to-inches');
      setConverterValue(undefined);
    } else {
      // Configure corresponding tool type based on route
      const cleanRouteSuffix = targetPath.replace(/\//g, '');
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
      <nav className="flex items-center gap-2 text-sm sm:text-base text-slate-600 font-semibold mb-4 sm:mb-6 bg-slate-50 border border-slate-200 p-3 rounded-xl">
        <a 
          href="https://www.cmtoinches.uk/" 
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('/');
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
                onClick={() => handleNavigate(routeSoFar)}
                className={`truncate ${isLast ? 'text-slate-900 font-bold cursor-default' : 'hover:text-blue-600 cursor-pointer'}`}
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
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-2.5 mt-6">
                <h4 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span>⚡ External Conversion Resource</span>
                </h4>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
                  Need to convert inches to centimeters for height, TV screens, paper, furniture, or everyday measurements? Visit our partner tool for fast <a href="https://www.cmtoinches.uk/" className="text-blue-600 font-black underline hover:text-blue-800">inch in cm</a> conversions.
                </p>
              </div>
            )}

            {currentPath === '/feet-to-cm/' && (
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl space-y-2.5 mt-6">
                <h4 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span>⚡ External Weight Converter</span>
                </h4>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
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
                  <h2 className="font-black text-xl text-slate-900">{sect.heading}</h2>
                  <p className="text-lg text-slate-700 leading-relaxed font-sans">{sect.content}</p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3.5 text-base sm:text-lg text-slate-700">
              <h2 className="font-black text-lg sm:text-xl text-slate-900">Official Google AdSense &amp; UK Privacy Opt-Out Links</h2>
              <ul className="list-disc pl-6 space-y-2.5">
                <li>
                  <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline hover:text-blue-800">
                    How Google uses information from sites or apps that use our services
                  </a>
                </li>
                <li>
                  <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline hover:text-blue-800">
                    Google Advertising &amp; DART Cookie Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline hover:text-blue-800">
                    Google Ads Settings (Manage or Opt Out of Personalized Ads)
                  </a>
                </li>
                <li>
                  <a href="https://www.youronlinechoices.com/uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline hover:text-blue-800">
                    Your Online Choices UK (IAB UK Behavioural Advertising Opt-Out)
                  </a>
                </li>
                <li>
                  <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline hover:text-blue-800">
                    UK Information Commissioner&apos;s Office (ICO)
                  </a>
                </li>
              </ul>
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
                  <h2 className="font-black text-xl text-slate-900">{sect.heading}</h2>
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
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm text-slate-700">
              <p className="font-bold text-slate-900">Manage Cookie &amp; Ad Personalization Preferences:</p>
              <p>
                Review{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">
                  How Google uses information from sites or apps that use our services
                </a>{' '}
                or opt out of personalized DART cookies at{' '}
                <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">
                  Google Ads Settings
                </a>.
              </p>
            </div>
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
      const cmToInchTable = [
        { cm: 1, in: (1 / 2.54).toFixed(4), ftIn: '0\' 0.39"' },
        { cm: 5, in: (5 / 2.54).toFixed(4), ftIn: '0\' 1.97"' },
        { cm: 10, in: (10 / 2.54).toFixed(4), ftIn: '0\' 3.94"' },
        { cm: 25, in: (25 / 2.54).toFixed(4), ftIn: '0\' 9.84"' },
        { cm: 50, in: (50 / 2.54).toFixed(4), ftIn: '1\' 7.69"' },
        { cm: 75, in: (75 / 2.54).toFixed(4), ftIn: '2\' 5.53"' },
        { cm: 100, in: (100 / 2.54).toFixed(4), ftIn: '3\' 3.37"' },
        { cm: 150, in: (150 / 2.54).toFixed(4), ftIn: '4\' 11.06"' },
        { cm: 170, in: (170 / 2.54).toFixed(4), ftIn: '5\' 6.93"' },
        { cm: 180, in: (180 / 2.54).toFixed(4), ftIn: '5\' 10.87"' },
        { cm: 200, in: (200 / 2.54).toFixed(4), ftIn: '6\' 6.74"' },
        { cm: 250, in: (250 / 2.54).toFixed(4), ftIn: '8\' 2.43"' },
        { cm: 300, in: (300 / 2.54).toFixed(4), ftIn: '9\' 10.11"' },
        { cm: 400, in: (400 / 2.54).toFixed(4), ftIn: '13\' 1.48"' },
        { cm: 500, in: (500 / 2.54).toFixed(4), ftIn: '16\' 4.85"' },
        { cm: 600, in: (600 / 2.54).toFixed(4), ftIn: '19\' 8.22"' },
        { cm: 700, in: (700 / 2.54).toFixed(4), ftIn: '22\' 11.59"' },
        { cm: 800, in: (800 / 2.54).toFixed(4), ftIn: '26\' 2.96"' },
        { cm: 900, in: (900 / 2.54).toFixed(4), ftIn: '29\' 6.33"' },
        { cm: 1000, in: (1000 / 2.54).toFixed(4), ftIn: '32\' 9.70"' },
      ];

      const inchToCmTable = [
        { inVal: 1, cm: (1 * 2.54).toFixed(2), ftIn: '0\' 1"' },
        { inVal: 2, cm: (2 * 2.54).toFixed(2), ftIn: '0\' 2"' },
        { inVal: 3, cm: (3 * 2.54).toFixed(2), ftIn: '0\' 3"' },
        { inVal: 4, cm: (4 * 2.54).toFixed(2), ftIn: '0\' 4"' },
        { inVal: 5, cm: (5 * 2.54).toFixed(2), ftIn: '0\' 5"' },
        { inVal: 6, cm: (6 * 2.54).toFixed(2), ftIn: '0\' 6"' },
        { inVal: 8, cm: (8 * 2.54).toFixed(2), ftIn: '0\' 8"' },
        { inVal: 10, cm: (10 * 2.54).toFixed(2), ftIn: '0\' 10"' },
        { inVal: 12, cm: (12 * 2.54).toFixed(2), ftIn: '1\' 0"' },
        { inVal: 18, cm: (18 * 2.54).toFixed(2), ftIn: '1\' 6"' },
        { inVal: 24, cm: (24 * 2.54).toFixed(2), ftIn: '2\' 0"' },
        { inVal: 30, cm: (30 * 2.54).toFixed(2), ftIn: '2\' 6"' },
        { inVal: 36, cm: (36 * 2.54).toFixed(2), ftIn: '3\' 0"' },
        { inVal: 48, cm: (48 * 2.54).toFixed(2), ftIn: '4\' 0"' },
        { inVal: 60, cm: (60 * 2.54).toFixed(2), ftIn: '5\' 0"' },
        { inVal: 65, cm: (65 * 2.54).toFixed(2), ftIn: '5\' 5"' },
        { inVal: 70, cm: (70 * 2.54).toFixed(2), ftIn: '5\' 10"' },
        { inVal: 72, cm: (72 * 2.54).toFixed(2), ftIn: '6\' 0"' },
        { inVal: 84, cm: (84 * 2.54).toFixed(2), ftIn: '7\' 0"' },
        { inVal: 100, cm: (100 * 2.54).toFixed(2), ftIn: '8\' 4"' },
      ];

      const feetToCmTable = [
        { ft: 1, inTotal: '12 in', cm: (1 * 30.48).toFixed(2) },
        { ft: 1.5, inTotal: '18 in', cm: (1.5 * 30.48).toFixed(2) },
        { ft: 2, inTotal: '24 in', cm: (2 * 30.48).toFixed(2) },
        { ft: 2.5, inTotal: '30 in', cm: (2.5 * 30.48).toFixed(2) },
        { ft: 3, inTotal: '36 in', cm: (3 * 30.48).toFixed(2) },
        { ft: 3.5, inTotal: '42 in', cm: (3.5 * 30.48).toFixed(2) },
        { ft: 4, inTotal: '48 in', cm: (4 * 30.48).toFixed(2) },
        { ft: 4.5, inTotal: '54 in', cm: (4.5 * 30.48).toFixed(2) },
        { ft: 5, inTotal: '60 in', cm: (5 * 30.48).toFixed(2) },
        { ft: 5.25, inTotal: '63 in (5\' 3")', cm: (5.25 * 30.48).toFixed(2) },
        { ft: 5.5, inTotal: '66 in (5\' 6")', cm: (5.5 * 30.48).toFixed(2) },
        { ft: 5.75, inTotal: '69 in (5\' 9")', cm: (5.75 * 30.48).toFixed(2) },
        { ft: 6, inTotal: '72 in (6\' 0")', cm: (6 * 30.48).toFixed(2) },
        { ft: 6.25, inTotal: '75 in (6\' 3")', cm: (6.25 * 30.48).toFixed(2) },
        { ft: 6.5, inTotal: '78 in (6\' 6")', cm: (6.5 * 30.48).toFixed(2) },
        { ft: 7, inTotal: '84 in', cm: (7 * 30.48).toFixed(2) },
        { ft: 8, inTotal: '96 in', cm: (8 * 30.48).toFixed(2) },
        { ft: 10, inTotal: '120 in', cm: (10 * 30.48).toFixed(2) },
        { ft: 15, inTotal: '180 in', cm: (15 * 30.48).toFixed(2) },
        { ft: 20, inTotal: '240 in', cm: (20 * 30.48).toFixed(2) },
      ];

      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
            <div className="border-b border-slate-100 pb-5 space-y-2.5">
              <span className="text-xs bg-blue-100 text-blue-800 font-black px-3 py-1 rounded-lg font-mono uppercase tracking-widest">
                UNIT CONVERSION MASTER CHART
              </span>
              <h1 className="text-xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                CM to Inches, Inches to CM &amp; Feet to CM Conversion Charts
              </h1>
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed font-sans">
                Comprehensive UK reference lookup charts for linear length conversions — including centimeters to inches, inches to centimeters, and feet to centimeters — spanning everyday household, height, and engineering measurements.
              </p>
            </div>

            {/* Vertically Stacked Reference Tables: CM to Inches, Inches to CM & Feet to CM */}
            <div className="space-y-8">
              {/* 1. CM to Inches Table */}
              <div className="space-y-3.5">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    📏 Centimeters to Inches Chart (1 to 1000 CM)
                  </h2>
                  <span className="text-sm font-bold text-slate-500 font-mono">
                    CM → IN
                  </span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm sm:text-base text-left tabular-nums">
                    <thead className="bg-slate-100 font-bold text-slate-800 uppercase font-mono text-xs sm:text-sm">
                      <tr>
                        <th className="p-3 border-b">Centimeters (CM)</th>
                        <th className="p-3 border-b">Inches (IN)</th>
                        <th className="p-3 border-b">Feet &amp; Inches</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {cmToInchTable.map((row) => (
                        <tr key={row.cm} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-slate-900">{row.cm} cm</td>
                          <td className="p-3 text-blue-700 font-bold">{row.in} in</td>
                          <td className="p-3 text-slate-700">{row.ftIn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Inches to CM Table */}
              <div className="space-y-3.5">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    📐 Inches to Centimeters Chart (1 to 100 IN)
                  </h2>
                  <span className="text-sm font-bold text-slate-500 font-mono">
                    IN → CM
                  </span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm sm:text-base text-left tabular-nums">
                    <thead className="bg-slate-100 font-bold text-slate-800 uppercase font-mono text-xs sm:text-sm">
                      <tr>
                        <th className="p-3 border-b">Inches (IN)</th>
                        <th className="p-3 border-b">Centimeters (CM)</th>
                        <th className="p-3 border-b">Feet &amp; Inches</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {inchToCmTable.map((row) => (
                        <tr key={row.inVal} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-slate-900">{row.inVal} in</td>
                          <td className="p-3 text-emerald-700 font-bold">{row.cm} cm</td>
                          <td className="p-3 text-slate-700">{row.ftIn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 3. Feet to CM Table */}
            <div className="space-y-3.5 pt-2">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  🧍 Feet to Centimeters Height Chart (1 to 20 FT)
                </h2>
                <span className="text-sm font-bold text-slate-500 font-mono">
                  FT → CM
                </span>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm sm:text-base text-left tabular-nums">
                  <thead className="bg-slate-100 font-bold text-slate-800 uppercase font-mono text-xs sm:text-sm">
                    <tr>
                      <th className="p-3 border-b">Feet (FT)</th>
                      <th className="p-3 border-b">Inches Equivalent</th>
                      <th className="p-3 border-b">Centimeters (CM)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {feetToCmTable.map((row) => (
                      <tr key={row.ft} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{row.ft} ft</td>
                        <td className="p-3 text-slate-700">{row.inTotal}</td>
                        <td className="p-3 text-blue-700 font-bold">{row.cm} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Single Homepage Backlink on cm to inches keyword */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <span>⚡ Instant Length Conversion Tool</span>
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
                Centimeters, inches, and feet are standard linear units used for height, screen sizes, furniture, and architectural measurements (1 inch = 2.54 cm, 1 foot = 30.48 cm). Need to calculate custom values outside these charts? Use our instant <a href="https://www.cmtoinches.uk/" className="text-blue-600 font-black underline hover:text-blue-800">cm to inches</a> converter for real-time precision results.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 5. HOMEPAGE VIEW (Most Important Layout)
    return (
      <div className="space-y-4 sm:space-y-8">
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
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl font-mono space-y-3 shadow-sm">
              <span className="text-sm text-blue-700 font-black tracking-widest uppercase">1. CM TO INCHES FORMULA</span>
              <div className="text-xl font-black text-blue-900">
                Inches = Centimeters ÷ 2.54
              </div>
              <p className="text-base text-slate-700 font-sans">
                Alternatively: <code className="bg-white/80 px-2 py-0.5 rounded font-mono font-bold text-slate-900">CM × 0.393701</code>
              </p>
              <div className="text-base text-slate-700 font-sans pt-2 border-t border-blue-200/60">
                <strong>Example:</strong> 10 cm ÷ 2.54 = <strong>3.937 inches</strong>
              </div>
            </div>

            {/* Inch to CM Formula Card */}
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl font-mono space-y-3 shadow-sm">
              <span className="text-sm text-emerald-700 font-black tracking-widest uppercase">2. INCH TO CM FORMULA</span>
              <div className="text-xl font-black text-emerald-900">
                Centimeters = Inches × 2.54
              </div>
              <p className="text-base text-slate-700 font-sans">
                Exact constant defined by international agreement.
              </p>
              <div className="text-base text-slate-700 font-sans pt-2 border-t border-emerald-200/60">
                <strong>Example:</strong> 12 inches × 2.54 = <strong>30.48 cm</strong>
              </div>
            </div>
          </div>

          {/* Example Calculation Visual Card */}
          <div className="my-6 p-5 md:p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-sm font-black text-slate-800 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <span>📊 CONVERSION EXAMPLE PREVIEW</span>
              </span>
              <span className="text-sm bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-lg font-mono">
                9 CM = 3.5433 IN
              </span>
            </div>
            
            <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  ACTIVE CONVERSION MODE:
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-800 flex justify-between items-center">
                  <span>CM → IN (Centimeters to Inches)</span>
                  <span className="text-slate-400 text-sm">▼</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    CENTIMETERS / CM INPUT
                  </label>
                  <div className="p-3.5 border-2 border-blue-500 rounded-xl bg-white font-mono font-bold text-2xl text-slate-900 flex justify-between items-center">
                    <span>9</span>
                    <span className="text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded font-sans font-bold">CM</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    INCHES / IN OUTPUT
                  </label>
                  <div className="p-3.5 border border-blue-100 bg-blue-50/70 rounded-xl font-mono font-bold text-2xl text-blue-700 flex justify-between items-center">
                    <span>3.5433</span>
                    <span className="text-sm text-blue-700 bg-blue-100 px-2.5 py-1 rounded font-sans font-bold">IN</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm sm:text-base border-t border-slate-100">
                <div className="font-mono text-slate-700">
                  Formula: <span className="italic font-bold">in = cm / 2.54</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-base space-y-1">
                  <div className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <span>📄 FRACTIONAL EQUIVALENT (UK CARPENTRY)</span>
                  </div>
                  <div className="font-bold text-slate-900 font-mono text-base">
                    3 9/16 in <span className="text-slate-600 font-normal text-sm">(Nearest 1/16")</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-base space-y-1">
                  <div className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <span>ℹ️ FORMULA EXPRESSION</span>
                  </div>
                  <div className="font-mono text-slate-800 bg-white p-2 rounded border border-slate-200 text-base font-bold">
                    9 cm * 0.39370 = 3.5433 in
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              CM to Inches Conversion (Metric to Imperial)
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed font-sans">
              Converting centimeters (cm) to inches (in) is required across the UK for height documentation on passports, online apparel sizing, and household measurements. Because 1 inch is defined as exactly 2.54 centimeters, dividing any centimeter figure by 2.54 gives the corresponding length in customary imperial inches.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Inch to CM Conversion (Imperial to Metric)
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed font-sans">
              Converting inches to centimeters (inch to cm) translates traditional imperial dimensions into the decimal System International (SI) metric framework. Simply multiply the number of inches by 2.54 to get the exact measurement in centimeters. For instance, a 70-inch height translates to <code className="bg-slate-100 text-slate-900 px-2 py-0.5 rounded font-mono font-bold">70 × 2.54 = 177.8 cm</code>.
            </p>
            <p className="text-base sm:text-lg text-slate-700 font-medium">
              Explore our comprehensive <a href="/unit-conversion-chart/" onClick={(e) => { e.preventDefault(); handleNavigate('/unit-conversion-chart/'); }} title="Inch to CM Conversion (Imperial to Metric)" className="text-blue-600 font-black underline hover:text-blue-800">Chart List</a> for inch to cm and cm to inches reference tables.
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-3.5 sm:py-8">
        
        {/* Grid layout for layout structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          
          {/* Main content pane (Left/Center Column) */}
          <section className="lg:col-span-8 order-1">
            {renderPageContent()}
          </section>

          {/* Sidebar Area (Right Column) */}
          <section className="lg:col-span-4 order-2 space-y-6">
            <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
          </section>

        </div>
      </main>

      {/* Footer Area */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
