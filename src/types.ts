export type RoutePath =
  | '/'
  | '/cm-to-inches/'
  | '/inches-to-cm/'
  | '/feet-to-cm/'
  | '/cm-to-feet/'
  | '/meters-to-feet/'
  | '/feet-to-meters/'
  | '/mm-to-inches/'
  | '/inches-to-mm/'
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
  | '/blog/'
  | '/blog/how-many-inches-in-1-cm/'
  | '/blog/cm-vs-inches/'
  | '/blog/uk-height-conversion-guide/'
  | '/blog/clothing-size-conversion/'
  | '/blog/international-measurement-systems/';

export interface BlogPost {
  slug: string;
  title: string;
  updatedAt: string;
  description: string;
  author: string;
  category: string;
  readTime: string;
  contentHtml: string;
}

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
