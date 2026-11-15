export interface ConverterGuideSection {
  heading: string;
  paragraphs: string[];
}

export interface ConverterGuideTable {
  title: string;
  headers: [string, string, string];
  rows: [string, string, string][];
}

export interface ConverterGuide {
  id: string;
  kicker: string;
  intro: string;
  sections: ConverterGuideSection[];
  table: ConverterGuideTable;
  quickTip: string;
  faqs: { question: string; answer: string }[];
}

export const CONVERTER_GUIDES: Record<string, ConverterGuide> = {
  'inches-to-cm': {
    id: 'inches-to-cm',
    kicker: 'Imperial to Metric Length Guide',
    intro:
      'Converting inches to centimetres is essential across the United Kingdom whenever imperial product specifications meet metric living spaces. From mounting a 55-inch television above a chimney breast to checking whether an 18-inch carry-on suitcase fits budget airline sizers, multiplying inches by 2.54 gives the exact centimetre figure needed for any standard metric tape measure.',
    sections: [
      {
        heading: 'Where Inches Are Still Standard in the UK',
        paragraphs: [
          'Even though British schools, architects, and courier services operate in centimetres and millimetres, several everyday retail categories remain firmly rooted in imperial inches. Television sets, computer monitors, laptops, and tablet screens are always advertised by their diagonal glass measurement in inches. Similarly, bicycle frames and wheels (such as 26-inch, 27.5-inch, and 29-inch tyres), waistbands on denim jeans, takeaway pizza boxes, and standard photography frames (6×4", 7×5", 10×8") are sold by imperial dimensions.',
          'When ordering furniture, wall brackets, or picture mounts online from UK retailers like Argos, John Lewis, or IKEA, technical assembly diagrams almost always quote wall clearances in centimetres or millimetres. Translating the advertised inch specification into centimetres beforehand stops mounting hardware from colliding with alcoves or radiator pipes.'
        ]
      },
      {
        heading: 'How to Convert Inches to Centimetres Accurately',
        paragraphs: [
          'Since the International Yard and Pound Agreement of 1959, one international inch has been defined by law as exactly 2.54 centimetres (or 25.4 millimetres). There are no recurring decimals or regional British-versus-US discrepancies for modern inches. Simply multiply any length in inches by 2.54 to obtain centimetres.',
          'For rough mental arithmetic while browsing in a DIY store, multiply your inch figure by 2.5 and add an extra 1.6% (or roughly 4 mm per 10 inches). For instance, 20 inches × 2.5 = 50, plus 0.8 cm equals 50.8 cm. For joinery, picture framing, or boiler flue clearances, always rely on the exact 2.54 factor shown in the calculator above.'
        ]
      },
      {
        heading: 'TV Screen Widths vs Diagonal Inches',
        paragraphs: [
          'A frequent point of confusion when measuring a living-room alcove is assuming a 55-inch TV is 55 inches wide. Screen sizes measure corner-to-corner diagonally, not horizontally. On modern 16:9 widescreen televisions, horizontal width is approximately 87.2% of the diagonal. A 55-inch screen therefore spans 139.7 cm diagonally, but its physical cabinet width is roughly 122 cm (around 48 inches) depending on bezel thickness.'
        ]
      }
    ],
    table: {
      title: 'Common UK Screen, Photo Frame & Waist Sizes (Inches to CM)',
      headers: ['Imperial Size', 'Exact Centimetres', 'Common UK Application'],
      rows: [
        ['6 in', '15.24 cm', 'Standard 6×4" photo print length'],
        ['10 in', '25.40 cm', '10×8" frame & compact tablet screen'],
        ['14 in', '35.56 cm', 'Standard compact work laptop display'],
        ['24 in', '60.96 cm', 'Desktop office monitor / 2 ft shelving'],
        ['32 in', '81.28 cm', 'Bedroom LED TV / 32" trouser waist'],
        ['43 in', '109.22 cm', 'Mid-size UK living room Smart TV'],
        ['55 in', '139.70 cm', 'Popular OLED/QLED widescreen TV'],
        ['65 in', '165.10 cm', 'Large cinema lounge television']
      ]
    },
    quickTip: 'Mental shortcut: Multiply inches by 2.5, then add 0.4 cm for every 10 inches (20 in ≈ 50 + 0.8 = 50.8 cm).',
    faqs: [
      {
        question: 'How many centimetres are in a 16-inch MacBook or laptop bag sleeve?',
        answer: '16 inches equals 40.64 cm measured diagonally across the screen. Because chassis bezels add a small margin, UK laptop backpacks for a 16-inch device usually list an internal compartment width of around 36 cm × 25 cm.'
      },
      {
        question: 'Is a UK 6×4 photo frame 15×10 cm?',
        answer: 'Almost—6 × 4 inches translates precisely to 15.24 cm × 10.16 cm. Most UK photo labs print "6×4" at 15.2 × 10.2 cm, though snug European 15×10 cm IKEA frames sometimes require trimming 2 mm.'
      },
      {
        question: 'How wide is a 34-inch waist pair of trousers in centimetres?',
        answer: 'Multiplying 34 × 2.54 gives 86.36 cm. Most UK high-street labels round a 34-inch waist to 86 cm or 86.5 cm.'
      }
    ]
  },

  'feet-to-cm': {
    id: 'feet-to-cm',
    kicker: 'Imperial Stature & Clearance Guide',
    intro:
      'In the United Kingdom, human height, room ceiling clearance, shed panels, and trampoline diameters are routinely spoken of in feet, while medical charts, passport applications, and European product specs record heights in centimetres. Because one international foot contains 12 inches, every foot translates to exactly 30.48 centimetres.',
    sections: [
      {
        heading: 'NHS, Passport & Gym Records in the UK',
        paragraphs: [
          'If you ask someone in Britain how tall they are, they will almost certainly reply in feet and inches—such as 5 ft 6 in or 5 ft 11 in. Yet when completing an NHS GP registration, booking a ski boot fitting, ordering cycle frame sizing, or submitting height data for an EU visa, forms typically request centimetres.',
          'Remember that decimal feet (for example, 5.5 ft) are different from feet and inches (5 ft 5 in). Half a foot (5.5 ft) is 5 ft 6 in (167.64 cm), whereas 5 ft 5 in is 65 inches or 165.10 cm. Always double-check whether your source figure uses decimal feet or separate feet and inches before converting.'
        ]
      },
      {
        heading: 'Fencing Panels, Garden Sheds & Timber Lengths',
        paragraphs: [
          'British timber merchants and garden centres sell feather-edge fence panels, decking boards, and garden sheds in traditional 6 ft, 8 ft, 10 ft, and 12 ft increments—even though modern builders work off metric tape measures and concrete gravel boards measured in millimetres. A classic 6 ft wide by 6 ft tall UK lap fence panel measures approximately 182.88 cm × 182.88 cm (often sold as 183 cm in metric equivalents).'
        ]
      },
      {
        heading: 'How the 30.48 Factor Works',
        paragraphs: [
          'Since 1 foot equals 12 inches and 1 inch equals 2.54 cm, multiplying 12 × 2.54 produces 30.48 cm per foot. For quick estimates without a calculator, multiply feet by 30 and add 0.5 cm per foot: for example, 8 feet ≈ 240 + 4 = 244 cm (exact value: 243.84 cm).'
        ]
      }
    ],
    table: {
      title: 'Standard Feet to Centimetres Reference (Height & Building)',
      headers: ['Feet (Decimal)', 'Feet & Inches / Inches', 'Centimetres (Exact)'],
      rows: [
        ['4.0 ft', '4 ft 0 in (48 in)', '121.92 cm'],
        ['4.5 ft', '4 ft 6 in (54 in)', '137.16 cm'],
        ['5.0 ft', '5 ft 0 in (60 in)', '152.40 cm'],
        ['5.25 ft', '5 ft 3 in (63 in)', '160.02 cm'],
        ['5.5 ft', '5 ft 6 in (66 in)', '167.64 cm'],
        ['5.75 ft', '5 ft 9 in (69 in)', '175.26 cm'],
        ['6.0 ft', '6 ft 0 in (72 in)', '182.88 cm'],
        ['8.0 ft', '8 ft 0 in (96 in)', '243.84 cm']
      ]
    },
    quickTip: 'Be careful: 5.5 ft equals 5 ft 6 in (167.64 cm), NOT 5 ft 5 in (165.10 cm). Every 1 inch adds 2.54 cm.',
    faqs: [
      {
        question: 'How many cm is 5 ft 8 in compared to 5.8 feet?',
        answer: '5 ft 8 in equals 68 inches × 2.54 = 172.72 cm. By contrast, 5.8 decimal feet equals 5.8 × 30.48 = 176.78 cm (roughly 5 ft 9.6 in).'
      },
      {
        question: 'What is the average adult height in the UK in cm and feet?',
        answer: 'According to UK health survey averages, adult men average around 175–176 cm (5 ft 9 in) and adult women average roughly 161–162 cm (5 ft 3.5 in).'
      },
      {
        question: 'How tall is a standard UK 6-foot garden fence panel in cm?',
        answer: '6 imperial feet converts to 182.88 cm. Most UK timber suppliers stock metric-cut "6 ft" panels at 183 cm wide by 183 cm high.'
      }
    ]
  },

  'cm-to-feet': {
    id: 'cm-to-feet',
    kicker: 'Metric to Imperial Height & Room Guide',
    intro:
      'Dividing centimetres by 30.48 turns metric ruler numbers back into familiar British feet. Whether you are reading your official European ID height, checking ready-made curtain drop lengths, or interpreting UK ceiling heights on a builder’s blueprint, converting cm to feet gives immediate intuitive scale.',
    sections: [
      {
        heading: 'Turning Passport & Medical CM Heights into Feet',
        paragraphs: [
          'Medical notes, children’s red books, and overseas identity cards list body height strictly in centimetres—such as 165 cm, 173 cm, or 185 cm. Most people in Britain still picture stature in feet and inches. When you enter a figure like 173 cm into our converter, dividing by 30.48 yields 5.6759 decimal feet.',
          'To read 5.6759 decimal feet in everyday speech, keep the whole 5 feet and multiply the remainder (0.6759) by 12 inches, giving 8.11 inches—so 173 cm is 5 ft 8 in.'
        ]
      },
      {
        heading: 'UK Home Ceiling Heights & Ready-Made Curtains',
        paragraphs: [
          'Modern British housing regulations and new-build homes typically feature floor-to-ceiling heights around 230 cm to 240 cm (approximately 7 ft 6 in to 7 ft 10 in), whereas Victorian terraced houses often exceed 270 cm to 300 cm (8 ft 10 in to nearly 10 ft). Ready-made UK curtains are still packaged in classic drops like 137 cm (54 in / 4.5 ft), 183 cm (72 in / 6 ft), and 229 cm (90 in / 7.5 ft).'
        ]
      },
      {
        heading: 'Precision vs Everyday Rounding',
        paragraphs: [
          'Notice that dividing by 30.48 returns decimal feet (e.g., 180 cm = 5.9055 ft), which is ideal for engineering area calculations or timber pricing per foot, whereas everyday speech separates whole feet and inches.'
        ]
      }
    ],
    table: {
      title: 'Everyday Centimetres to Feet & Inches Benchmarks',
      headers: ['Centimetres', 'Decimal Feet', 'Everyday Feet & Inches'],
      rows: [
        ['100 cm', '3.2808 ft', '3 ft 3.4 in'],
        ['137 cm', '4.4948 ft', '4 ft 6 in (54" curtain drop)'],
        ['155 cm', '5.0853 ft', '5 ft 1 in'],
        ['165 cm', '5.4134 ft', '5 ft 5 in'],
        ['175 cm', '5.7415 ft', '5 ft 9 in'],
        ['183 cm', '6.0039 ft', '6 ft 0 in (72" door / curtain)'],
        ['190 cm', '6.2336 ft', '6 ft 2.8 in (UK mattress length)'],
        ['240 cm', '7.8740 ft', '7 ft 10.5 in (Standard ceiling)']
      ]
    },
    quickTip: 'Divide cm by 30 for a rough foot estimate, then subtract ~1.6% for high accuracy (180 ÷ 30 = 6 ft, minus 1.6% ≈ 5.91 ft).',
    faqs: [
      {
        question: 'How many feet is 160 cm in height?',
        answer: '160 cm ÷ 30.48 equals 5.2493 decimal feet, which translates to exactly 5 feet 3 inches (5\' 3").'
      },
      {
        question: 'Why does 183 cm come out to almost exactly 6 feet?',
        answer: 'Six international feet equal 182.88 cm, so 183 cm is within 1.2 millimetres of an exact 6-foot span—why UK doors and panels use 183 cm.'
      },
      {
        question: 'How do I convert decimal feet into remaining inches?',
        answer: 'Multiply the digits after the decimal point by 12. For example, 5.75 ft has a remainder of 0.75; 0.75 × 12 = 9 inches, making 5 ft 9 in.'
      }
    ]
  },

  'meters-to-feet': {
    id: 'meters-to-feet',
    kicker: 'Property Floorplan & Landscaping Guide',
    intro:
      'Estate agent floorplans across Rightmove and Zoopla, new garden turf quotes, and swimming pool lap lengths are primarily listed in metres. Converting metres to feet helps UK homebuyers, gardeners, and athletes picture room dimensions instantly when they are used to thinking in imperial feet.',
    sections: [
      {
        heading: 'Reading UK Estate Agent Floorplans',
        paragraphs: [
          'Almost every British property listing displays room sizes in both metres and feet-and-inches, or in metres alone—for example, a kitchen-diner measuring 4.50 m × 3.20 m. Because 1 metre equals approximately 3.28084 feet, that kitchen spans roughly 14 ft 9 in by 10 ft 6 in.',
          'Being able to turn metres into feet quickly during a house viewing lets you check at a glance whether a 6 ft Super King bed or an 8 ft dining table will comfortably fit without squeezing around radiator valves or inward-opening wardrobe doors.'
        ]
      },
      {
        heading: 'Garden Boundaries, Decking & Athletics',
        paragraphs: [
          'UK Land Registry title deeds often mix metric ordnance distances with older imperial chain or foot covenants. Similarly, track events (100 m, 400 m) and 25 m / 50 m British leisure centre pools use exact metric lanes, whereas recreational boats, yacht lengths, and ceiling clearances still quote feet.'
        ]
      },
      {
        heading: 'Calculation Standard (1 m = 3.2808399 ft)',
        paragraphs: [
          'Because 1 foot is defined as 0.3048 metres exactly, the reciprocal conversion factor from metres to feet is 1 ÷ 0.3048 = 3.280839895. Multiplying metres by 3.28084 achieves sub-millimetre accuracy across domestic and surveying scales.'
        ]
      }
    ],
    table: {
      title: 'Common Room, Garden & Sport Distances (Metres to Feet)',
      headers: ['Metres (m)', 'Feet (Decimal)', 'Practical UK Example'],
      rows: [
        ['1.0 m', '3.2808 ft', 'Wide hallway / wheelchair turning width'],
        ['1.8 m', '5.9055 ft', 'Standard residential privacy fence height'],
        ['2.4 m', '7.8740 ft', 'Plasterboard sheet / standard room ceiling'],
        ['3.0 m', '9.8425 ft', 'Compact UK box bedroom width'],
        ['4.0 m', '13.1234 ft', 'Standard residential living room span'],
        ['5.0 m', '16.4042 ft', 'Typical single garage length'],
        ['10.0 m', '32.8084 ft', 'Average urban terraced garden length'],
        ['25.0 m', '82.0210 ft', 'Standard UK public swimming pool length']
      ]
    },
    quickTip: 'Multiply metres by 3, then add roughly 10% (more accurately 9.36%). For 10 m: 10 × 3 = 30 + ~2.8 = 32.8 ft.',
    faqs: [
      {
        question: 'How big is a 4 m × 3 m bedroom in feet?',
        answer: '4 metres is 13.12 feet (13 ft 1.5 in) and 3 metres is 9.84 feet (9 ft 10 in), giving a floor area of 12 square metres or roughly 129 square feet.'
      },
      {
        question: 'How many feet is a 1.8 m or 2.0 m garden fence?',
        answer: '1.8 metres equals 5.91 feet (just under a 6 ft fence panel), while 2.0 metres equals 6.56 feet (often near maximum UK rear-garden height without planning permission).'
      },
      {
        question: 'Why are UK plasterboards 2.4 metres long?',
        answer: '2.4 metres translates to 7 ft 10.5 in (essentially a metric rounding of the historic 8-foot timber stud and sheet length).'
      }
    ]
  },

  'feet-to-meters': {
    id: 'feet-to-meters',
    kicker: 'Building, Surveying & Timber Guide',
    intro:
      'Converting feet to metres is indispensable whenever older British imperial measurements need to enter modern metric building calculations, turf orders, or architectural drawings. Because one international foot equals exactly 0.3048 metres, translating feet gives exact metric values for builders merchants and landscapers.',
    sections: [
      {
        heading: 'Matching Legacy House Deeds & Garden Plans to Metric Materials',
        paragraphs: [
          'Homeowners frequently pace out a lawn or measure a patio in feet—such as 20 ft by 15 ft—only to discover that paving slabs, artificial grass rolls, DPC membranes, and composite decking boards are sold by the linear metre or square metre. Converting each dimension by multiplying by 0.3048 prevents costly over-ordering or awkward shortfall strips along garden edges.'
        ]
      },
      {
        heading: 'Maritime Depths, Loft Ladders & Caravan Lengths',
        paragraphs: [
          'In UK caravanning, shipping, and aviation, hull lengths, narrowboat cabins (e.g., 45 ft, 57 ft, 70 ft), and cruise elevations are spoken of in feet. Canal lock chambers, marina berths, and European ferry vehicle-deck limits often publish limits in metres: knowing that a 22 ft motorhome is 6.71 metres long is vital when booking Channel crossings or campsite pitches.'
        ]
      },
      {
        heading: 'Exact Conversion Formula (ft × 0.3048)',
        paragraphs: [
          'Each foot contains 12 inches × 0.0254 metres = 0.3048 metres exactly. Dividing feet by 3 gives a fast ballpark metric number in your head, and subtracting 8.5% refines it within a few centimetres.'
        ]
      }
    ],
    table: {
      title: 'Common Property, Vehicle & Canal Lengths (Feet to Metres)',
      headers: ['Feet (ft)', 'Exact Metres (m)', 'UK Practical Context'],
      rows: [
        ['6 ft', '1.8288 m', 'Standard fence width / bed length'],
        ['8 ft', '2.4384 m', 'Full-length UK timber & plaster sheet'],
        ['10 ft', '3.0480 m', 'Compact garden shed / single-car width'],
        ['12 ft', '3.6576 m', 'Generous main bedroom width'],
        ['16 ft', '4.8768 m', 'Typical family hatchback parking bay'],
        ['20 ft', '6.0960 m', '20-foot standard ISO shipping container'],
        ['40 ft', '12.1920 m', 'Large articulated shipping container'],
        ['57 ft', '17.3736 m', 'All-route UK canal narrowboat length']
      ]
    },
    quickTip: 'Multiply feet by 3 and move the decimal one place left, then add ~1.6% (e.g., 20 ft × 0.3 = 6.0 m + 0.1 = 6.10 m).',
    faqs: [
      {
        question: 'How long is a 57-foot UK narrowboat in metres?',
        answer: '57 ft × 0.3048 equals 17.3736 metres—the classic maximum length that fits through virtually every lock across the English and Welsh canal network.'
      },
      {
        question: 'How many metres is a 12 ft × 10 ft living room?',
        answer: '12 ft converts to 3.66 m and 10 ft converts to 3.05 m, giving an approximate floor area of 11.15 square metres for carpet ordering.'
      },
      {
        question: 'How many metres is 100 feet?',
        answer: '100 feet equals exactly 30.48 metres.'
      }
    ]
  },

  'mm-to-inches': {
    id: 'mm-to-inches',
    kicker: 'UK Carpentry, Hardware & Machining Guide',
    intro:
      'In British engineering workshops, kitchen fitting, plumbing, and 3D printing, precision parts are calibrated in millimetres, yet legacy bolts, spanners, guitar frets, and woodworking router bits frequently reference decimal or fractional inches. Dividing millimetres by 25.4 converts fine caliper readings into exact imperial equivalents.',
    sections: [
      {
        heading: 'Workshop Drill Bits, Bolts & Carpentry Fractions',
        paragraphs: [
          'If you measure an older brass hinge, timber dowel, or classic car fastener with a digital caliper and read 6.35 mm, 9.52 mm, or 12.7 mm, you are almost certainly holding a traditional imperial 1/4-inch, 3/8-inch, or 1/2-inch component. Knowing the millimetre-to-inch translation prevents stripping threads with the wrong socket or drilling an oversized pilot hole in oak worktops.'
        ]
      },
      {
        heading: 'Pipework, Kitchen Worktops & Jewellery Gauges',
        paragraphs: [
          'Standard UK copper plumbing (15 mm and 22 mm) interfaces with BSP threads and shower hoses historically named after 1/2-inch and 3/4-inch bores. Likewise, UK laminated and solid wood worktops are manufactured in 28 mm, 38 mm, and 40 mm thicknesses—translating cleanly to roughly 1.1", 1.5", and 1.57" when ordering undermount sink clips or recessed hob brackets.'
        ]
      },
      {
        heading: 'Exact Divisor (1 inch = 25.4 mm)',
        paragraphs: [
          'Because 1 inch equals 25.4 millimetres with zero rounding error, dividing any millimetre reading by 25.4 produces decimal inches. Above the formula box, our UK Carpentry Fractional card automatically rounds that result to the nearest 1/16" for physical imperial rulers.'
        ]
      }
    ],
    table: {
      title: 'Key Workshop Millimetre to Inch Equivalents (Precision Hardware)',
      headers: ['Millimetres (mm)', 'Decimal Inches', 'Nearest Standard Fraction'],
      rows: [
        ['1.59 mm', '0.0626 in', '1/16 in (Fine pilot bit)'],
        ['3.18 mm', '0.1252 in', '1/8 in (Rivet / small drill)'],
        ['6.35 mm', '0.2500 in', '1/4 in (Hex shank / router collet)'],
        ['9.53 mm', '0.3752 in', '3/8 in (Socket drive / dowel)'],
        ['12.70 mm', '0.5000 in', '1/2 in (Heavy router bit / MDF)'],
        ['19.05 mm', '0.7500 in', '3/4 in (Joinery ply / garden hose)'],
        ['25.40 mm', '1.0000 in', '1 in exact (Standard timber 1")'],
        ['38.00 mm', '1.4961 in', '1 1/2 in (UK kitchen worktop)']
      ]
    },
    quickTip: 'Divide mm by 25 for a quick estimate, then deduct 1.6% (e.g., 50 mm ÷ 25 = 2.0", actual = 1.9685").',
    faqs: [
      {
        question: 'What imperial router collet fits a 6.35 mm or 12.7 mm cutter shank?',
        answer: '6.35 mm is an exact 1/4-inch shank and 12.7 mm is an exact 1/2-inch shank—never force a 6 mm metric cutter into a 6.35 mm (1/4") collet.'
      },
      {
        question: 'How many inches is 300 mm on a UK steel school ruler?',
        answer: '300 mm equals 30 cm, which converts to 11.811 inches (just 4.8 mm shy of a traditional 12-inch / 304.8 mm ruler).'
      },
      {
        question: 'What inch size matches an 18 mm furniture board?',
        answer: '18 mm divides by 25.4 to 0.7087 inches, which lies just under 3/4 inch (19.05 mm).'
      }
    ]
  },

  'inches-to-mm': {
    id: 'inches-to-mm',
    kicker: 'Imperial Blueprint to Metric Caliper Guide',
    intro:
      'Whenever you follow an American woodworking plan, service imperial plumbing valves, or check watch strap lug widths and audio jack specifications, converting inches to millimetres delivers the fine metric detail required by British calipers and CNC routers. Simply multiply inches by exactly 25.4.',
    sections: [
      {
        heading: 'Adapting Woodworking Plans for UK Timber Merchants',
        paragraphs: [
          'Thousands of popular cabinetmaking videos, CNC project files, and furniture blueprints quote thicknesses in fractions of an inch such as 1/4", 3/8", 1/2", and 3/4". Walking into a British timber yard, however, sheet materials come in metric 6 mm, 9 mm, 12 mm, 18 mm, and 25 mm thicknesses. Converting inch dimensions to millimetres right away lets you adjust dados, rebate grooves, and drawer clearances so joints assemble flush.'
        ]
      },
      {
        heading: 'Audio Connectors, Spanners & Bike Components',
        paragraphs: [
          'Consumer hardware mixes inches and millimetres constantly: studio headphones use 1/4-inch (6.35 mm) plugs compared to 3.5 mm mobile jacks, socket sets pair 3/8" (9.525 mm) and 1/2" (12.7 mm) ratchets with metric sockets, and mountain bike suspension stems bridge 1 1/8-inch (28.6 mm) steerer tubes.'
        ]
      },
      {
        heading: 'Exact Multiplication Standard (in × 25.4)',
        paragraphs: [
          'One inch is defined globally as 25.4000 millimetres. Multiplying by 25 and adding 0.4 mm per whole inch provides fast mental accuracy on site.'
        ]
      }
    ],
    table: {
      title: 'Standard Imperial Fractions to Millimetres Chart',
      headers: ['Fractional Inches', 'Decimal Inches', 'Exact Millimetres (mm)'],
      rows: [
        ['1/16 in', '0.0625 in', '1.5875 mm'],
        ['1/8 in', '0.1250 in', '3.1750 mm'],
        ['1/4 in', '0.2500 in', '6.3500 mm'],
        ['3/8 in', '0.3750 in', '9.5250 mm'],
        ['1/2 in', '0.5000 in', '12.7000 mm'],
        ['3/4 in', '0.7500 in', '19.0500 mm'],
        ['1 in', '1.0000 in', '25.4000 mm'],
        ['12 in (1 ft)', '12.0000 in', '304.8000 mm']
      ]
    },
    quickTip: 'Multiply inches by 25, then add 0.4 mm for every 1 inch (e.g., 5 in × 25 = 125 + 2.0 = 127 mm exact).',
    faqs: [
      {
        question: 'How many millimetres are in 3/4 of an inch?',
        answer: '0.75 inches × 25.4 equals exactly 19.05 millimetres. When substituting UK 18 mm birch ply in a 3/4-inch American plan, remember your sheet is ~1 mm thinner.'
      },
      {
        question: 'What is 1.5 inches in mm?',
        answer: '1.5 × 25.4 equals exactly 38.1 millimetres.'
      },
      {
        question: 'Is a 1/2-inch ratchet drive the same as 13 mm?',
        answer: '1/2 inch is exactly 12.7 mm, whereas a 13 mm hex nut (0.5118 in) is slightly larger—the square drive refers to the ratchet anvil, not the nut size.'
      }
    ]
  }
};
