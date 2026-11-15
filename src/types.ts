export type RoutePath =
  | '/'
  | '/inches-to-cm/'
  | '/feet-to-cm/'
  | '/cm-to-feet/'
  | '/meters-to-feet/'
  | '/feet-to-meters/'
  | '/mm-to-inches/'
  | '/inches-to-mm/'
  | '/about-us/'
  | '/contact-us/'
  | '/privacy-policy/'
  | '/terms-and-conditions/'
  | '/disclaimer/'
  | '/cookie-policy/'
  | '/sitemap/'
  | '/unit-conversion-chart/'
  | '/paper-size-in-inches/'
  | '/ring-shoe-size-cm/';

export interface ConversionType {
  id: string;
  label: string;
  shortLabel?: string;
  fromUnit: string;
  toUnit: string;
  ratio: number;
  formula: string;
  example?: string;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
