import React, { useState, useEffect } from 'react';
import { RoutePath, BlogPost, FAQItem } from './types';
import { BLOG_POSTS } from './data/blog';
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
  const [currentPath, setCurrentPath] = useState<RoutePath>('/');
  const [converterType, setConverterType] = useState<string>('cm-to-inches');
  const [converterValue, setConverterValue] = useState<number | undefined>(undefined);

  // States for interactive contact page
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Standard Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

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
      description = 'Browse 100% of the active URLs, conversion guides, blog columns, and legal policy structures on this portal.';
    } else if (currentPath === '/blog/') {
      title = 'UK Metrology & Clothing Size Blog – Information Portal';
      description = 'Learn how metric measurements apply to British size charts, passport registries, and historic trades.';
    } else if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.split('/')[2];
      const blog = BLOG_POSTS.find(b => b.slug === slug);
      if (blog) {
        title = `${blog.title} – Metric Blog Guide`;
        description = blog.description;
      }
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
  };

  const handleNavigate = (path: RoutePath) => {
    setCurrentPath(path);
    // Reset specific custom values if arriving at generic route
    if (path === '/') {
      setConverterType('cm-to-inches');
      setConverterValue(10);
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
        <button onClick={() => handleNavigate('/')} className="hover:text-blue-600 flex items-center gap-1 shrink-0">
          <Home className="w-3 h-3" />
          <span>Home</span>
        </button>
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
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {matchedPopularPage.h1}
            </h2>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              {matchedPopularPage.explanationText} Use our accurate length converter configured specifically below to change variables, review imperial increments, and extract fractional references.
            </p>

            <ConverterTool 
              initialTypeId={converterType} 
              initialFromValue={converterValue || matchedPopularPage.fromValue} 
              onNavigate={handleNavigate}
            />

            <AdSensePlaceholder slotId="1002" type="in-feed-horizontal" />

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-3.5 text-xs text-slate-700">
              <h4 className="font-bold flex items-center gap-1.5 text-slate-900">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Comparative Calibration Table
              </h4>
              <p>
                In standard UK trade registries, {matchedPopularPage.fromValue} {matchedPopularPage.fromUnit} represents:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-mono text-[11px] text-slate-600">
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
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {activeType.label} (Precise {activeType.fromUnit} → {activeType.toUnit})
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Welcome to the official <strong>{activeType.label}</strong> authority segment. Use our optimized input layout box to calculate instantly, copy calibrated outcomes, and utilize correct step calculations.
            </p>

            <ConverterTool 
              initialTypeId={activeType.id} 
              initialFromValue={converterValue} 
              onNavigate={handleNavigate}
            />

            <AdSensePlaceholder slotId="1003" type="in-feed-horizontal" />

            <div className="space-y-3 prose text-xs text-slate-600">
              <h3 className="font-bold text-slate-950 text-sm">How to manual solve this conversion?</h3>
              <p>
                To resolve this manually without an online engine, leverage the official formula: <code className="bg-slate-100 p-0.5 rounded font-mono font-bold text-slate-900">{activeType.formula}</code>.
              </p>
              <h3 className="font-bold text-slate-950 text-sm mt-3">Practical everyday demonstration:</h3>
              <p>
                {activeType.example}. By maintaining high-precision coefficient ratios, we prevent physical measurement miscalculation errors across textile sewing models, heavy architectural design tasks, and UK driving licenses.
              </p>
            </div>
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
            <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="p-1 bg-slate-900 rounded text-amber-400 select-none text-sm font-bold">About</span>
              {POLICIES_DATA.aboutUs.title}
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed font-bold">
              {POLICIES_DATA.aboutUs.intro}
            </p>
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="font-bold text-sm text-slate-900">1. Our Core Mission</h3>
              <p>{POLICIES_DATA.aboutUs.mission}</p>
              
              <h3 className="font-bold text-sm text-slate-900">2. Our Accuracy Commitment</h3>
              <p>{POLICIES_DATA.aboutUs.qualityPromise}</p>

              <h3 className="font-bold text-sm text-slate-900">3. Local UK Headquarters</h3>
              <p className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-[11px] text-slate-700">
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
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Contact Our Support Team
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
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
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                {POLICIES_DATA.privacyPolicy.title}
              </h2>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Last updated: {POLICIES_DATA.privacyPolicy.lastUpdated}</p>
            </div>
            
            <div className="space-y-6 text-xs text-slate-600 leading-relaxed">
              {POLICIES_DATA.privacyPolicy.sections.map((sect, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-black text-sm text-slate-900">{sect.heading}</h3>
                  <p>{sect.content}</p>
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
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                {POLICIES_DATA.termsOfUse.title}
              </h2>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Last updated: {POLICIES_DATA.termsOfUse.lastUpdated}</p>
            </div>
            
            <div className="space-y-6 text-xs text-slate-600 leading-relaxed">
              {POLICIES_DATA.termsOfUse.sections.map((sect, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-black text-sm text-slate-900">{sect.heading}</h3>
                  <p>{sect.content}</p>
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
            <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-600 animate-pulse" />
              {POLICIES_DATA.disclaimer.title}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold bg-rose-50 p-4 rounded-xl border border-rose-100">
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
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              {POLICIES_DATA.cookiePolicy.title}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
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

    // 4. BLOG & ARTICLES ROUTING
    if (currentPath === '/blog/') {
      return (
        <div className="space-y-6">
          {renderBreadcrumb()}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl md:text-2xl font-black text-slate-950 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Measurement Metrology & Guide Blog
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Read deep-dives on international metric systems, clothing sizing conversions, and height indicators drafted by British experts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              {BLOG_POSTS.map((blog) => (
                <div 
                  key={blog.slug}
                  onClick={() => handleNavigate(`/blog/${blog.slug}/` as RoutePath)}
                  className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span className="bg-blue-100 text-blue-700 font-extrabold px-2 py-0.5 rounded">{blog.category}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="font-black text-slate-950 group-hover:text-blue-600 text-sm transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-500 text-[11px] line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>By: {blog.author}</span>
                    <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">Read guide →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.split('/')[2];
      const blog = BLOG_POSTS.find(b => b.slug === slug);
      if (blog) {
        return (
          <div className="space-y-6">
            {renderBreadcrumb()}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
              
              <button 
                onClick={() => handleNavigate('/blog/')}
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Blogs Index
              </button>

              <div className="space-y-2 border-b border-slate-100 pb-5">
                <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold uppercase text-slate-400">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{blog.category}</span>
                  <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded">{blog.readTime}</span>
                  <span>Updated: {blog.updatedAt}</span>
                </div>
                <h1 className="text-xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                  {blog.title}
                </h1>
                <p className="text-xs text-slate-500 italic mt-1 font-sans">
                  Published by: {blog.author} (Metrology content reviewer)
                </p>
              </div>

              {/* Blog body HTML contents parsed cleanly with beautiful styling */}
              <div 
                className="prose prose-slate max-w-none text-xs md:text-sm text-slate-700 space-y-4 leading-relaxed mt-4"
                dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
              />

              {/* Internal Author bio standard to AdSense EEAT */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex gap-3.5 items-center text-xs text-slate-600 mt-8">
                <div className="w-12 h-12 rounded-full bg-blue-900 border border-amber-300 text-white font-bold flex items-center justify-center shrink-0">
                  {blog.author.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Reviewed by: {blog.author}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                    Senior Research Lead on Length Metrology and Industrial Standards. Reviews metric indices for compliance with international standard agreements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }
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

        {/* AdSense Unit placement 1 */}
        <AdSensePlaceholder slotId="1001" type="in-feed-horizontal" />

        {/* Rich SEO Content (Topical relevance section) */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              Primary CM to Inches Metrology Explanation
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Welcome to the premier <strong>cmtoinches.uk</strong> gateway. If you are aiming to convert centimeters to inches, look no further! This program offers instant visual calculators designed specifically for United Kingdom citizens, crafters, builders, and standard e-commerce shoppers.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            By definition, one inch contains precisely 2.54 centimeters. To reverse this calculations and convert <strong>centimeters to inches</strong> directly, we apply the fractional base-10 metrics formula:
          </p>

          {/* Clean Formula Highlight Card */}
          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-xl font-mono text-center space-y-2 max-w-xl mx-auto my-6 shadow-sm">
            <span className="text-[10px] text-blue-700 font-black tracking-widest uppercase">OFFICIAL STANDARD FORMULA</span>
            <div className="text-base sm:text-lg font-black text-blue-900">
              Inches = Centimeters ÷ 2.54
            </div>
            <p className="text-[10px] text-slate-500">
              Rounded constant index ratio = 0.393700787 in/cm
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            For example, if you aim to find how many inches are in a layout measurement of 10 cm, compute: <code className="bg-slate-100 text-slate-900 px-1 py-0.5 rounded font-mono text-[10px]">10 ÷ 2.54 = 3.937 inches</code>. This accurate ratio ensures zero mechanical error margins.
          </p>
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
        
        {/* Dynamic Ad placement at the top of content */}
        <div className="hidden lg:block mb-6">
          <AdSensePlaceholder slotId="1000" type="header-leaderboard" />
        </div>

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

            <AdSensePlaceholder slotId="1004" type="sidebar-square" />
          </section>

        </div>
      </main>

      {/* Footer Area */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
