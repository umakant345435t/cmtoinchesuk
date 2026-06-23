import { ConversionType } from '../types';

export const CONVERSION_TYPES: ConversionType[] = [
  {
    id: 'cm-to-inches',
    fromUnit: 'cm',
    toUnit: 'in',
    label: 'Centimeters to Inches',
    ratio: 1 / 2.54,
    formula: 'in = cm / 2.54',
    example: '10 cm = 10 / 2.54 = 3.937 in'
  },
  {
    id: 'inches-to-cm',
    fromUnit: 'in',
    toUnit: 'cm',
    label: 'Inches to Centimeters',
    ratio: 2.54,
    formula: 'cm = in * 2.54',
    example: '10 in = 10 * 2.54 = 25.4 cm'
  },
  {
    id: 'feet-to-cm',
    fromUnit: 'ft',
    toUnit: 'cm',
    label: 'Feet to Centimeters',
    ratio: 30.48,
    formula: 'cm = ft * 30.48',
    example: '5 ft = 5 * 30.48 = 152.4 cm'
  },
  {
    id: 'cm-to-feet',
    fromUnit: 'cm',
    toUnit: 'ft',
    label: 'Centimeters to Feet',
    ratio: 1 / 30.48,
    formula: 'ft = cm / 30.48',
    example: '170 cm = 170 / 30.48 = 5.577 ft'
  },
  {
    id: 'meters-to-feet',
    fromUnit: 'm',
    toUnit: 'ft',
    label: 'Meters to Feet',
    ratio: 3.2808399,
    formula: 'ft = m * 3.28084',
    example: '2 m = 2 * 3.28084 = 6.562 ft'
  },
  {
    id: 'feet-to-meters',
    fromUnit: 'ft',
    toUnit: 'm',
    label: 'Feet to Meters',
    ratio: 0.3048,
    formula: 'm = ft * 0.3048',
    example: '6 ft = 6 * 0.3048 = 1.8288 m'
  },
  {
    id: 'mm-to-inches',
    fromUnit: 'mm',
    toUnit: 'in',
    label: 'Millimeters to Inches',
    ratio: 1 / 25.4,
    formula: 'in = mm / 25.4',
    example: '100 mm = 100 / 25.4 = 3.937 in'
  },
  {
    id: 'inches-to-mm',
    fromUnit: 'in',
    toUnit: 'mm',
    label: 'Inches to Millimeters',
    ratio: 25.4,
    formula: 'mm = in * 25.4',
    example: '5 in = 5 * 25.4 = 127 mm'
  }
];

export interface HardcodedConversionPage {
  path: string;
  title: string;
  description: string;
  h1: string;
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  displayImperial?: string; // e.g. 5' 7"
  explanationText: string;
}

export const POPULAR_PAGES: HardcodedConversionPage[] = [
  {
    path: '/150-cm-to-inches/',
    title: '150 CM to Inches Converter (150 cm → in) – Height Conversion',
    description: 'Convert 150 centimeters to inches accurately. Find out what 150 cm means in inches (59.06 inches) and feet-inches format (4ft 11 inches) with standard tables.',
    h1: '150 CM to Inches Conversion',
    fromValue: 150,
    fromUnit: 'cm',
    toValue: 59.0551,
    toUnit: 'in',
    displayImperial: `4' 11"`,
    explanationText: '150 cm is an extremely popular metric clothing size limit and standard height boundary for teens or petite adults. It evaluates to exactly 59.06 inches, which translates to 4 feet and 11 inches (4\'11") in the traditional British imperial layout.'
  },
  {
    path: '/170-cm-to-inches/',
    title: '170 CM to Inches Converter (170 cm → in) – Height Conversion',
    description: 'Convert exactly 170 cm to inches. 170 centimeters equals 66.93 inches or 5ft 7in. Check our detailed guide and formula.',
    h1: '170 CM to Inches Conversion',
    fromValue: 170,
    fromUnit: 'cm',
    toValue: 66.9291,
    toUnit: 'in',
    displayImperial: `5' 7"`,
    explanationText: '170 cm is a common benchmark height for both men and women in the United Kingdom. 170 centimeters evaluates to 66.93 inches, which equates to exactly 5 feet and 7 inches (5\'7") under traditional imperial measures.'
  },
  {
    path: '/180-cm-to-inches/',
    title: '180 CM to Inches Converter (180 cm → in) – Height Conversion',
    description: 'Convert 180 centimeters to inches. 180 cm equals 70.87 inches or 5 feet 11 inches. Fast, accurate, and completely free height guide.',
    h1: '180 CM to Inches Conversion',
    fromValue: 180,
    fromUnit: 'cm',
    toValue: 70.8661,
    toUnit: 'in',
    displayImperial: `5' 11"`,
    explanationText: '180 cm is a tall physical stature benchmark. In the UK, many aspire to achieve this standard (which is just under 6 feet). More precisely, 180 centimeters equals 70.87 inches, which converts directly to 5 feet and 10.87 inches, practically 5\'11".'
  },
  {
    path: '/200-cm-to-inches/',
    title: '200 CM to Inches Converter (200 cm → in) – Height Conversion',
    description: 'How many inches is 200 cm? Convert 200 cm to inches (78.74 inches) or feet-inches (6ft 6.7in) instantly with this accurate tool.',
    h1: '200 CM to Inches Conversion',
    fromValue: 200,
    fromUnit: 'cm',
    toValue: 78.7402,
    toUnit: 'in',
    displayImperial: `6' 6.7"`,
    explanationText: '200 cm represents a flat two-meter threshold. This height converts to exactly 78.74 inches, which translates in standard British measurements to 6 feet and 6.7 inches (6\'7") — a stature often linked with professional basketball and rugby players.'
  },
  {
    path: '/5-feet-in-cm/',
    title: '5 Feet in CM – Accurate Height Conversion (5 ft → cm)',
    description: 'Convert 5 feet to centimeters instantly. Learn how many centimeters are in 5 feet (152.4 cm) and view comprehensive conversion charts.',
    h1: '5 Feet to Centimeters Conversion',
    fromValue: 5,
    fromUnit: 'ft',
    toValue: 152.4,
    toUnit: 'cm',
    explanationText: '5 feet is an exact height milestone equal to exactly 60 inches. Translating to the decimal scientific metric layout, 5 feet equates to exactly 152.4 centimeters.'
  },
  {
    path: '/6-feet-in-cm/',
    title: '6 Feet in CM – Accurate Height Conversion (6 ft → cm)',
    description: 'Convert 6 feet to centimeters instantly. Learn how many centimeters are in 6 feet (182.88 cm) with step-by-step height calculations.',
    h1: '6 Feet to Centimeters Conversion',
    fromValue: 6,
    fromUnit: 'ft',
    toValue: 182.88,
    toUnit: 'cm',
    explanationText: '6 feet is a highly celebrated vertical height benchmark in English-speaking societies. Translating to the metric layout, 6 feet equates to exactly 182.88 centimeters.'
  }
];

export const FAQ_HOME: { question: string; answer: string }[] = [
  {
    question: 'How do you convert CM to Inches mathematically?',
    answer: 'To convert centimeters to inches, divide your centimeter value by 2.54. This specific divisor is used because one international standard inch is officially defined as exactly 2.54 centimeters. For example, if you have 25.4 cm, dividing by 2.54 yields exactly 10 inches. The mathematical representation is: Inches = Centimeters / 2.54 (or alternatively, Inches = Centimeters × 0.393700787).'
  },
  {
    question: 'What is the absolute legal conversion factor between metric centimeters and imperial inches?',
    answer: 'The definitive, legally binding conversion factor was standardized by the International Yard and Pound Agreement in July 1959. This treaty established that 1 inch is precisely equal to 2.54 centimeters. Because this ratio is exact by definition, there is no fractional variation or metrological drift, making 2.54 the mathematically absolute constant used worldwide for length translation.'
  },
  {
    question: 'How can I convert decimal inches to standard English fractions (such as 1/16 or 1/8)?',
    answer: 'To translate a decimal inch value into a practical fractional value, isolate the decimal portion and multiply it by your desired fractional denominator (e.g., 16, 32, or 64). Round the resulting number to the nearest whole integer to find your numerator. For example, to convert 0.3937 inches to the nearest 16th: 0.3937 × 16 = 6.299, which rounds to 6. Therefore, 0.3937 inches is approximately 6/16, which simplifies to 3/8 of an inch.'
  },
  {
    question: 'How many feet and inches are equivalent to exactly 170 cm?',
    answer: 'A height of 170 centimeters conversion yields exactly 66.9291 inches. Since there are 12 inches in a foot, dividing 66.9291 by 12 yields 5 feet with a remainder of 6.9291 inches. For everyday practical use and stature estimates, this is rounded to 5 feet and 7 inches (5\'7"), representing a highly common adult female stature in the United Kingdom.'
  },
  {
    question: 'How many feet and inches are equivalent to exactly 180 cm?',
    answer: 'A standard measurement of 180 centimeters conversion translates to exactly 70.8661 inches. To express this in imperial feet and inches, divide by 12, which results in 5 feet and a remainder of 10.8661 inches. For clothing labels, physical height checks, and medical forms, this is conventionally rounded to 5 feet and 11 inches (5\'11").'
  },
  {
    question: 'Why does the United Kingdom still use a hybrid system of imperial and metric lengths?',
    answer: 'The UK currently administers a unique hybrid system due to a gradual, incomplete decimalization process initiated in the mid-1960s. While scientific research, school curriculums, and commercial trade transactions utilize metric centimeters, statutory road regulations (miles and yards) and personal height or weight measurements remain strongly rooted in imperial feet, inches, and stones to maintain cultural consistency.'
  }
];
