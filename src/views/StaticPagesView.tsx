import React, { useState } from 'react';
import { RoutePath } from '../types';
import { POLICIES_DATA } from '../data/policies';
import { Sitemap } from '../components/Sitemap';
import { Mail, Check, Send } from 'lucide-react';

interface StaticPagesViewProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath | string) => void;
  breadcrumb: React.ReactNode;
}

export default function StaticPagesView({ currentPath, onNavigate, breadcrumb }: StaticPagesViewProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Measurement Accuracy Question');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSubmitted(true);
  };

  if (currentPath === '/about-us/') {
    return (
      <div className="space-y-6">
        {breadcrumb}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
          <h1 className="text-xl md:text-2xl font-black text-slate-900">
            {POLICIES_DATA.aboutUs.title}
          </h1>
          <p className="text-lg text-slate-800 leading-relaxed font-semibold">
            {POLICIES_DATA.aboutUs.intro}
          </p>
          <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            <div className="space-y-2">
              <h2 className="font-extrabold text-xl text-slate-900">1. Who Built cmtoinches.uk &amp; Why</h2>
              <p>{POLICIES_DATA.aboutUs.whoBuiltIt}</p>
            </div>

            <div className="space-y-2">
              <h2 className="font-extrabold text-xl text-slate-900">2. Our Editorial Purpose &amp; Privacy Focus</h2>
              <p>{POLICIES_DATA.aboutUs.mission}</p>
            </div>

            <div className="space-y-2">
              <h2 className="font-extrabold text-xl text-slate-900">3. Measurement Standards &amp; Editorial Review</h2>
              <p>{POLICIES_DATA.aboutUs.qualityPromise}</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <h2 className="font-extrabold text-lg text-slate-900">4. Editorial Contact &amp; Corrections</h2>
              <p className="text-base text-slate-700">
                {POLICIES_DATA.aboutUs.editorialContact}{' '}
                <a
                  href="/contact-us/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact-us/');
                  }}
                  className="text-blue-600 font-bold underline hover:text-blue-800"
                >
                  Open Contact Form
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPath === '/contact-us/') {
    const handleCopyEmail = () => {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText('support@cmtoinches.uk').catch(() => {});
      }
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 3000);
    };

    return (
      <div className="space-y-6">
        {breadcrumb}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
              <Mail className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Contact cmtoinches.uk
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-sans">
              Have a measurement correction, guide suggestion, or privacy question? Email us directly at <strong>support@cmtoinches.uk</strong>, or use the message helper below to prepare a pre-filled email in your own mail app (no third-party form storage is used).
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <div className="mx-auto w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <h2 className="text-lg font-black text-slate-900">Message Prepared Successfully</h2>
              <p className="text-sm sm:text-base text-slate-700">
                Thank you, <strong>{contactName}</strong>. For immediate delivery from your email client, click below or email{' '}
                <a
                  href={`mailto:support@cmtoinches.uk?subject=${encodeURIComponent(`[${contactSubject}] from ${contactName}`)}&body=${encodeURIComponent(`${contactMessage}\n\nReply-To: ${contactEmail}`)}`}
                  className="text-blue-600 font-bold underline"
                >
                  support@cmtoinches.uk
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setContactSubmitted(false);
                  setContactName('');
                  setContactEmail('');
                  setContactMessage('');
                }}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-left bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm sm:text-base focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="name@example.co.uk"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm sm:text-base focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  id="contact-subject"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm sm:text-base focus:border-blue-500 outline-none"
                >
                  <option value="Measurement Accuracy Question">Measurement Accuracy Question</option>
                  <option value="Chart or Feature Suggestion">Chart or Feature Suggestion</option>
                  <option value="UK GDPR / Privacy Request">UK GDPR / Privacy Request</option>
                  <option value="General Support">General Support</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Write your question or feedback here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm sm:text-base focus:border-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Prepare Email Draft</span>
              </button>
            </form>
          )}

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Direct Support Email
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href="mailto:support@cmtoinches.uk"
                className="text-lg font-extrabold text-blue-600 hover:text-blue-700 hover:underline break-all font-mono tracking-tight"
              >
                support@cmtoinches.uk
              </a>

              <button
                type="button"
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

            <p className="text-xs text-slate-500">
              Support messages are typically answered within 48 business hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentPath === '/privacy-policy/') {
    return (
      <div className="space-y-6">
        {breadcrumb}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-xl md:text-2xl font-black text-slate-900">
              {POLICIES_DATA.privacyPolicy.title}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono mt-1">
              Last updated: {POLICIES_DATA.privacyPolicy.lastUpdated}
            </p>
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
            <h2 className="font-black text-lg sm:text-xl text-slate-900">
              Official Google AdSense &amp; UK Privacy Opt-Out Links
            </h2>
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
        {breadcrumb}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-xl md:text-2xl font-black text-slate-900">
              {POLICIES_DATA.termsOfUse.title}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono mt-1">
              Last updated: {POLICIES_DATA.termsOfUse.lastUpdated}
            </p>
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
        {breadcrumb}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
          <h1 className="text-xl md:text-2xl font-black text-slate-900">
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
        {breadcrumb}
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
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {breadcrumb}
      <Sitemap onNavigate={onNavigate} />
    </div>
  );
}
