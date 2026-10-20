export type RoutePath =
  | '/'
  | '/inches-to-cm/'
  | '/feet-to-cm/'
  | '/cm-to-feet/'
  | '/meters-to-feet/'
  | '/feet-to-meters/'
  | '/mm-to-inches/'
  | '/inches-to-mm/'
  | '/90-cm-to-inches/'
  | '/150-cm-to-inches/'
  | '/170-cm-to-inches/'
  | '/180-cm-to-inches/'
  | '/200-cm-to-inches/'
  | '/5-feet-in-cm/'
  | '/6-feet-in-cm/'
  | '/about-us/'
  | '/contact-us/'
  | '/privacy-policy/'
  | '/terms-and-conditions/'
  | '/disclaimer/'
  | '/cookie-policy/'
  | '/sitemap/'
  | '/unit-conversion-chart/';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ConversionType {
  id: string;
  fromUnit: string;
  toUnit: string;
  label: string;
  ratio: number;
  formula: string;
  example: string;
}
