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

export const REDIRECTED_PROGRAMMATIC_PRESETS: Record<string, { typeId: string; value: number }> = {
  '/90-cm-to-inches/': { typeId: 'cm-to-inches', value: 90 },
  '/150-cm-to-inches/': { typeId: 'cm-to-inches', value: 150 },
  '/170-cm-to-inches/': { typeId: 'cm-to-inches', value: 170 },
  '/180-cm-to-inches/': { typeId: 'cm-to-inches', value: 180 },
  '/200-cm-to-inches/': { typeId: 'cm-to-inches', value: 200 },
  '/5-feet-in-cm/': { typeId: 'feet-to-cm', value: 5 },
  '/6-feet-in-cm/': { typeId: 'feet-to-cm', value: 6 }
};

export const FAQ_HOME: { question: string; answer: string }[] = [
  {
    question: 'What is the exact official ratio between CM and Inches?',
    answer: 'Under the International Yard and Pound Agreement of 1959 and the UK Weights and Measures Act, 1 international inch is defined as exactly 2.54 centimetres (25.4 mm). This means converting centimetres to inches always divides by 2.54, while converting inches to centimetres multiplies by 2.54 with zero rounding drift.'
  },
  {
    question: 'What is the official UK passport photo size in cm and inches?',
    answer: 'HM Passport Office rules specify printed UK passport photos must be 45 mm high by 35 mm wide (4.5 cm × 3.5 cm), which converts to 1.77 inches high by 1.38 inches wide. The head from crown to chin must measure between 29 mm and 34 mm (2.9 cm to 3.4 cm, or 1.14" to 1.34").'
  },
  {
    question: 'How do I convert decimal inches into 1/16" UK carpentry fractions?',
    answer: 'Take only the decimal portion after the whole inch and multiply by 16, then round to the nearest whole number. For example, 3.5433 inches has a remainder of 0.5433. Multiplying 0.5433 × 16 gives 8.69, which rounds to 9/16"—giving a practical tape-measure reading of 3 9/16 inches.'
  },
  {
    question: 'How do standard UK bed and mattress dimensions compare in CM vs Feet/Inches?',
    answer: 'A standard UK Single mattress measures 90 × 190 cm (approx. 3 ft × 6 ft 3 in), a UK Double measures 135 × 190 cm (4 ft 6 in × 6 ft 3 in), a UK King measures 150 × 200 cm (5 ft × 6 ft 6 in), and a UK Super King measures 180 × 200 cm (6 ft × 6 ft 6 in). Note that UK mattress sizes differ slightly from US Twin/Queen/King dimensions.'
  },
  {
    question: 'How do I convert my metric height in cm to feet and inches for UK forms?',
    answer: 'First divide your height in centimetres by 2.54 to get total inches, then divide by 12 to find whole feet and remaining inches. For instance, 170 cm ÷ 2.54 = 66.93 inches, which equals 5 feet 6.9 inches (commonly written 5 ft 7 in), while 180 cm equals 70.87 inches (5 ft 11 in).'
  },
  {
    question: 'Why does the United Kingdom use both centimetres and inches?',
    answer: 'The UK adopted metric units in schools, science, and trade manufacturing from the late 1960s onward, while everyday consumer categories—such as television screen diagonals, jeans waist sizes, timber lengths, and personal height—kept traditional imperial feet and inches alongside metric packaging.'
  }
];
