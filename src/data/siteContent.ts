/**
 * ============================================================================
 * WATER CYCLE — SINGLE SOURCE OF TRUTH (`src/data/siteContent.ts`)
 * ============================================================================
 * Non-technical site owners can edit all company details, copy, service cards,
 * before/after image paths, portfolio items, and verified customer reviews here.
 *
 * ITEMS TO CONFIRM WITH THE BUSINESS OWNER BEFORE PUBLIC LAUNCH:
 * 1. [LOGO]: Official logo extracted from brand PDF (`public/water-cycle-logo.png`).
 * 2. [SOLAR SCOPE]: Confirm whether "solar systems" is strictly solar water heating
 *    (current wording) or also includes photovoltaic electricity.
 * 3. [SERVICE SCOPE]: Confirm exact installation/maintenance arrangements for
 *    Sewage & Wastewater Treatment and Jacuzzi, Sauna & Steam Systems.
 * 4. [EMAIL]: Do not publish an email address until verified. Set `verifiedEmail`
 *    below once confirmed.
 * 5. [WHATSAPP]: Confirm whether +961 3 058 204 has WhatsApp enabled before adding
 *    any WhatsApp links.
 * 6. [BEFORE/AFTER PHOTOS]: Replace `/images/pool-before.webp` and `/images/pool-after.webp`
 *    in `public/images/` and set `useRealPhotos: true` in `BEFORE_AFTER_CONFIG`.
 * 7. [PROJECT PHOTOS]: Replace placeholder items in `PORTFOLIO_ITEMS` with real
 *    approved Water Cycle project photographs.
 * 8. [CUSTOMER REVIEWS]: Add verified client testimonials to `VERIFIED_CUSTOMER_REVIEWS`
 *    (the "What Our Customers Say" section stays hidden while this list is empty).
 * 9. [FORM ENDPOINT]: Set `VITE_CONTACT_FORM_ENDPOINT` in `.env.local` when a form
 *    backend (e.g., Formspree, custom API) is ready.
 * ============================================================================
 */

export type PageRoute = '/' | '/about' | '/services' | '/our-work' | '/contact';

export interface NavItem {
  label: string;
  footerLabel: string;
  path: PageRoute;
  title: string;
}

export type ServiceInquiryOption =
  | 'Swimming Pool Solutions'
  | 'Water Treatment & Filtration'
  | 'Solar Water Heating'
  | 'Pool & Leisure Construction'
  | 'Sewage & Wastewater Treatment'
  | 'Jacuzzi, Sauna & Steam Systems'
  | 'Other';

export type PortfolioCategory =
  | 'All'
  | 'Projects'
  | 'Swimming Pool Solutions'
  | 'Water Treatment & Filtration'
  | 'Solar Water Heating'
  | 'Sewage & Wastewater Treatment'
  | 'Jacuzzi, Sauna & Steam Systems';

export interface CoreServiceItem {
  id: 'pool-treatment' | 'filtration' | 'solar';
  number: string;
  title: string;
  shortCategory: string;
  description: string;
  highlights: string[];
  inquiryOption: ServiceInquiryOption;
}

export interface ConstructionServiceItem {
  id:
    | 'pool-construction'
    | 'jacuzzi-sauna-construction'
    | 'site-assessment-planning'
    | 'excavation-concrete'
    | 'tiling-finishing';
  number: string;
  title: string;
  shortCategory: string;
  description: string;
  highlights: string[];
  inquiryOption: ServiceInquiryOption;
}

export interface AdditionalServiceItem {
  id: 'wastewater' | 'wellness';
  number: string;
  title: string;
  shortCategory: string;
  description: string;
  highlights: string[];
  inquiryOption: ServiceInquiryOption;
}

export interface ProblemSolutionItem {
  id: string;
  problemTitle: string;
  problemDescription: string;
  solutionLabel: string;
  mappedService: ServiceInquiryOption;
  targetSectionId: 'services' | 'contact';
  linkedServiceCardId?: 'solar' | 'pool-treatment' | 'filtration';
}

export interface PortfolioImageStage {
  url: string;
  stageLabel: string;
  caption: string;
}

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;
  categoryLabel: string;
  location?: string;
  description: string;
  whatWasDone: readonly string[];
  imageUrl: string;
  images?: readonly string[];
  imageStages?: readonly PortfolioImageStage[];
  visualType?:
    | 'pool-transformation'
    | 'pool-maintenance'
    | 'filtration-setup'
    | 'solar-collectors'
    | 'water-clarity'
    | 'system-piping'
    | 'pool-construction';
  isPlaceholder?: boolean;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  serviceCategory: ServiceInquiryOption;
  comment: string;
  dateLabel: string;
}

export const COMPANY_CONTACT = {
  name: 'Water Cycle',
  location: 'Adma, Lebanon',
  locationUrl: 'https://maps.app.goo.gl/xUvJJ1G21bk9j6t96',
  tagline: 'Clear Solutions. Practical Results.',
  servicesSummary:
    'Swimming Pool Solutions • Water Treatment & Filtration • Solar Water Heating • Pool & Leisure Construction',
  phoneDisplay: '+961 3 058 204',
  phoneHref: 'tel:+9613058204',
  instagramHandle: '@water__cycle',
  instagramUrl: 'https://www.instagram.com/water__cycle/',
  facebookHandle: 'Water Cycle',
  facebookUrl: 'https://www.facebook.com/watercycle/',
  // [OWNER TO CONFIRM]: Leave empty until official public inbox is verified.
  verifiedEmail: '' as string,
} as const;

export const HERO_CONTENT = {
  headline: 'Better Water. Smarter Solutions.',
  subtitle:
    'Water treatment, filtration, swimming pool solutions, solar water heating, and pool & leisure construction.',
  supportingLine:
    'Practical solutions for cleaner water and more efficient systems.',
  primaryCtaLabel: 'Explore Services',
  secondaryCtaLabel: 'Contact Us',
} as const;

export const ABOUT_CONTENT = {
  sectionEyebrow: 'About Us',
  sectionTitle: 'About Water Cycle',
  companySince: '2021',
  personalExperienceYears: '22 Years',
  constructionExperienceYears: '3+ Years',
  paragraphs: [
    'Founded in 2021 and backed by 22 years of personal industry experience, Water Cycle is a business based in Adma, Lebanon focused on water treatment, filtration systems, swimming pool solutions, and solar water heating.',
    'At Water Cycle, we provide pool and water-system solutions alongside construction services for swimming pools, Jacuzzis, saunas, and related spaces. We help clients evaluate their available space, plan practical project layouts, and carry out construction work, including excavation, concrete work, tiling, and finishing. Our approach focuses on understanding each customer’s requirements and delivering functional, well-planned results.',
    'The company also provides solutions related to wastewater treatment and Jacuzzi, sauna, and steam facilities. Our goal is to help customers explore practical water-related systems suited to their needs.',
  ],
  proposedTagline: 'Clear Solutions. Practical Results.',
} as const;

export const CONSTRUCTION_OVERVIEW = {
  sectionTitle: 'Pool & Leisure Construction',
  sectionSubtitle: 'From Planning to Reality',
  experienceBadge: '3+ Years of Hands-On Construction Experience',
  paragraphs: [
    'Water Cycle offers construction services for swimming pools, Jacuzzis, saunas, and related spaces. From evaluating your property and planning the layout to excavation, concrete work, tiling, and finishing, we help bring your project to life.',
    'With over three years of hands-on construction experience, we focus on practical solutions, efficient space planning, and quality workmanship.',
  ],
  ctaLabel: 'Explore Our Services',
  scopeNote:
    'We evaluate each customer’s available space and recommend appropriate locations for the swimming pool, Jacuzzi, sauna, technical room, water tank, and related components, followed by construction execution including excavation, concrete work, tiling, and finishing.',
  scopeItems: [
    'Swimming pool construction',
    'Jacuzzi construction',
    'Sauna construction',
    'Site assessment and practical space planning',
    'Pool and equipment-room positioning',
    'Water tank positioning and infrastructure planning',
    'Excavation and site preparation',
    'Concrete construction',
    'Tiling and finishing works',
  ],
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'Home',
    footerLabel: 'Home',
    path: '/',
    title: 'Water Cycle – Better Water. Smarter Solutions. | Adma, Lebanon',
  },
  {
    label: 'About Us',
    footerLabel: 'About Us',
    path: '/about',
    title: 'About Water Cycle | Adma, Lebanon',
  },
  {
    label: 'Services',
    footerLabel: 'Services',
    path: '/services',
    title: 'What We Do – Services & Solutions | Water Cycle',
  },
  {
    label: 'Projects',
    footerLabel: 'Projects',
    path: '/our-work',
    title: 'Our Work & Water Treatment Comparison | Water Cycle',
  },
] as const;

export const SERVICE_INQUIRY_OPTIONS: readonly ServiceInquiryOption[] = [
  'Swimming Pool Solutions',
  'Water Treatment & Filtration',
  'Solar Water Heating',
  'Pool & Leisure Construction',
  'Sewage & Wastewater Treatment',
  'Jacuzzi, Sauna & Steam Systems',
  'Other',
] as const;

/**
 * Construction Services ("Construction Services" — 5 individual cards)
 */
export const CONSTRUCTION_SERVICES: readonly ConstructionServiceItem[] = [
  {
    id: 'pool-construction',
    number: '01.',
    title: 'Swimming Pool Construction',
    shortCategory: 'Pool Construction',
    description:
      'Complete construction of indoor and outdoor swimming pools, covering site assessment and space planning, excavation and concrete works, and quality tiling and finishing.',
    highlights: [
      'Swimming pool construction for indoor and outdoor spaces',
      'Site assessment and space planning for pool, technical room, and water tank positioning',
      'Excavation, ground preparation, and solid concrete construction',
      'Quality tiling and finishing works for durability and final readiness',
    ],
    inquiryOption: 'Pool & Leisure Construction',
  },
  {
    id: 'jacuzzi-sauna-construction',
    number: '02.',
    title: 'Jacuzzi & Sauna Construction',
    shortCategory: 'Jacuzzi & Sauna Construction',
    description:
      'Construction of Jacuzzis, saunas, and related leisure spaces, including site assessment and space planning, excavation and concrete works, and tiling and finishing.',
    highlights: [
      'Jacuzzi construction and sauna construction for indoor and outdoor spaces',
      'Site assessment and space planning around your property layout and equipment systems',
      'Excavation, site preparation, and concrete construction works',
      'Tiling and finishing works completing your Jacuzzi, sauna, and leisure space',
    ],
    inquiryOption: 'Pool & Leisure Construction',
  },
  {
    id: 'site-assessment-planning',
    number: '03.',
    title: 'Site Assessment & Space Planning',
    shortCategory: 'Site Assessment & Planning',
    description:
      'On-site evaluation of your available space to recommend practical locations for the pool, Jacuzzi, sauna, technical room, and water tank.',
    highlights: [
      'Site assessment and practical space planning',
      'Pool, Jacuzzi, sauna, and equipment-room positioning',
      'Water tank positioning and infrastructure planning',
    ],
    inquiryOption: 'Pool & Leisure Construction',
  },
  {
    id: 'excavation-concrete',
    number: '04.',
    title: 'Excavation & Concrete Works',
    shortCategory: 'Excavation & Concrete',
    description:
      'Ground preparation, excavation, and solid concrete construction carried out to build a reliable structure for your pool and leisure spaces.',
    highlights: [
      'Excavation and site preparation',
      'Concrete construction for pools, Jacuzzis, and technical rooms',
      'Infrastructure preparation for piping and water tanks',
    ],
    inquiryOption: 'Pool & Leisure Construction',
  },
  {
    id: 'tiling-finishing',
    number: '05.',
    title: 'Tiling & Finishing',
    shortCategory: 'Tiling & Finishing',
    description:
      'Quality tiling and finishing works that complete the appearance, durability, and usability of your swimming pool, Jacuzzi, or sauna.',
    highlights: [
      'Tiling and finishing works for pools and leisure spaces',
      'Clean interior surface detailing and coping finishes',
      'Final readiness for water filling and system operation',
    ],
    inquiryOption: 'Pool & Leisure Construction',
  },
] as const;

/**
 * Primary Services ("What We Do" — equal visual priority as 3 individual cards)
 */
export const CORE_SERVICES: readonly CoreServiceItem[] = [
  {
    id: 'pool-treatment',
    number: '01.',
    title: 'Swimming Pool Solutions',
    shortCategory: 'Swimming Pool Solutions',
    description:
      'Pool water treatment and system solutions focused on helping maintain clear, enjoyable swimming pools.',
    highlights: [
      'Pool water treatment for clean, clear water',
      'Recovery of green, cloudy, or untreated pool water',
      'Practical pool circulation and water-care solutions',
    ],
    inquiryOption: 'Swimming Pool Solutions',
  },
  {
    id: 'filtration',
    number: '02.',
    title: 'Water Treatment & Filtration',
    shortCategory: 'Water Treatment & Filtration',
    description:
      'Water treatment and filtration solutions tailored to different water-quality and system requirements.',
    highlights: [
      'Filtration solutions for residential and commercial water systems',
      'Water-quality improvement and sediment filtration',
      'Practical system configurations tailored to your requirements',
    ],
    inquiryOption: 'Water Treatment & Filtration',
  },
  {
    id: 'solar',
    number: '03.',
    title: 'Solar Water Heating',
    shortCategory: 'Solar Water Heating',
    description:
      'Water-heating systems that use solar energy to support practical, energy-conscious operation.',
    highlights: [
      'Solar thermal water-heating system solutions',
      'Energy-conscious domestic and commercial hot water setups',
      'Practical circulation and storage tank configurations',
    ],
    inquiryOption: 'Solar Water Heating',
  },
] as const;

/**
 * Additional Solutions (visually quieter group below the 3 primary services)
 */
export const ADDITIONAL_SERVICES: readonly AdditionalServiceItem[] = [
  {
    id: 'wastewater',
    number: '04.',
    title: 'Sewage & Wastewater Treatment',
    shortCategory: 'Sewage & Wastewater',
    description:
      'Treatment solutions for wastewater management requirements.',
    highlights: [
      'Practical wastewater management and treatment solutions',
      'Tailored guidance for residential and commercial requirements',
    ],
    inquiryOption: 'Sewage & Wastewater Treatment',
  },
  {
    id: 'wellness',
    number: '05.',
    title: 'Jacuzzi, Sauna & Steam Systems',
    shortCategory: 'Jacuzzi, Sauna & Steam',
    description:
      'Water-related systems and facilities for relaxation and wellness spaces.',
    highlights: [
      'Solutions for Jacuzzi, sauna, and steam room facilities',
      'Water and heat system guidance for relaxation spaces',
    ],
    inquiryOption: 'Jacuzzi, Sauna & Steam Systems',
  },
] as const;

export const PROBLEM_SOLUTIONS: readonly ProblemSolutionItem[] = [
  {
    id: 'green-dirty-pool',
    problemTitle: 'Green or Cloudy Swimming Pool Water',
    problemDescription:
      'Algae buildup, murky visibility, or untreated pool water that needs practical treatment to restore clarity.',
    solutionLabel: 'Swimming Pool Solutions',
    mappedService: 'Swimming Pool Solutions',
    targetSectionId: 'contact',
    linkedServiceCardId: 'pool-treatment',
  },
  {
    id: 'water-filtration-problems',
    problemTitle: 'Water Quality or Filtration Needs',
    problemDescription:
      'Sediment, water-quality concerns, or a property that needs a tailored water treatment and filtration solution.',
    solutionLabel: 'Water Treatment & Filtration',
    mappedService: 'Water Treatment & Filtration',
    targetSectionId: 'contact',
    linkedServiceCardId: 'filtration',
  },
  {
    id: 'solar-water-needs',
    problemTitle: 'Solar Water Heating Requirements',
    problemDescription:
      'Looking for a water-heating system that uses solar energy for practical, energy-conscious hot water.',
    solutionLabel: 'Solar Water Heating',
    mappedService: 'Solar Water Heating',
    targetSectionId: 'contact',
    linkedServiceCardId: 'solar',
  },
  {
    id: 'wastewater-needs',
    problemTitle: 'Sewage & Wastewater Management',
    problemDescription:
      'Need practical treatment solutions for residential or commercial wastewater management requirements.',
    solutionLabel: 'Sewage & Wastewater Treatment',
    mappedService: 'Sewage & Wastewater Treatment',
    targetSectionId: 'contact',
  },
  {
    id: 'wellness-facility-needs',
    problemTitle: 'Jacuzzi, Sauna, or Steam Space',
    problemDescription:
      'Exploring water-related systems and facilities for a relaxation, spa, or wellness space.',
    solutionLabel: 'Jacuzzi, Sauna & Steam Systems',
    mappedService: 'Jacuzzi, Sauna & Steam Systems',
    targetSectionId: 'contact',
  },
  {
    id: 'existing-system-attention',
    problemTitle: 'Discuss Another Water Project',
    problemDescription:
      'Tell us what you need, and Water Cycle can discuss the right next step with you.',
    solutionLabel: 'Contact Water Cycle',
    mappedService: 'Other',
    targetSectionId: 'contact',
  },
] as const;

/**
 * Real before/after pool water treatment comparison photos:
 * - Before (dirty/algae-green water): `public/images/pool-before.jpg`
 * - After (clean/clear blue water): `public/images/pool-after.jpg`
 */
export const BEFORE_AFTER_CONFIG = {
  sectionTitle: 'See the Difference Water Treatment Can Make',
  sectionSubtitle:
    'Drag the slider to compare untreated, algae-green pool water (Before) with clear, treated pool water (After).',
  beforeImagePath: '/images/pool-before.jpg',
  afterImagePath: '/images/pool-after.jpg',
  useRealPhotos: true,
  demoNotice:
    'Real Before & After Pool Water Comparison',
} as const;

/**
 * [OWNER TO UPDATE]:
 * Replace placeholder items below with actual Water Cycle project photographs.
 * Do not fabricate project names, clients, cities, results, or completion dates.
 */
export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: 'project-hiyata-pool-construction',
    category: 'Projects',
    title: 'Hillside Swimming Pool Construction',
    categoryLabel: 'Projects',
    location: 'Hiyata',
    description:
      'Turn-key hillside pool build in Hiyata: bedrock excavation, reinforced concrete basin, stone terrace, and landscaped lawn.',
    imageUrl: '/images/hiyata-pool-3.jpg',
    images: [
      '/images/hiyata-pool-1.jpg',
      '/images/hiyata-pool-2.jpg',
      '/images/hiyata-pool-3.jpg',
    ],
    imageStages: [
      {
        url: '/images/hiyata-pool-1.jpg',
        stageLabel: 'Stage 1: Excavation & Rebar',
        caption: 'Hillside site excavation down to solid rock, Bobcat site grading, and structural dual-layer steel rebar grid in Hiyata.',
      },
      {
        url: '/images/hiyata-pool-2.jpg',
        stageLabel: 'Stage 2: Concrete Shell & Plastering',
        caption: 'Monolithic reinforced concrete basin with smooth cementitious waterproofing plaster, formwork, and rough-in plumbing.',
      },
      {
        url: '/images/hiyata-pool-3.jpg',
        stageLabel: 'Stage 3: Completed Pool & Landscaping',
        caption: 'Finished swimming pool in Hiyata with crystal-clear water, stone terrace deck, lawn, loungers, and safety railings.',
      },
    ],
    whatWasDone: [
      'Bedrock excavation and site leveling.',
      'Dual-layer steel rebar grid framing.',
      'Reinforced waterproof concrete shell pour.',
      'Circulation piping and filtration rough-in.',
      'Stone terrace coping and lawn landscaping.',
    ],
    visualType: 'pool-construction',
    isPlaceholder: false,
  },
  {
    id: 'project-baouchriye-rooftop-pool',
    category: 'Projects',
    title: 'Urban Rooftop Swimming Pool & Spa Construction',
    categoryLabel: 'Projects',
    location: 'Baouchriye',
    description:
      'Rooftop pool and spa build in Baouchriye: structural load engineering, cast concrete slab, mosaic tiling, and terrace deck.',
    imageUrl: '/images/baouchriye-pool-3.jpg',
    images: [
      '/images/baouchriye-pool-1.jpg',
      '/images/baouchriye-pool-2.jpg',
      '/images/baouchriye-pool-3.jpg',
    ],
    imageStages: [
      {
        url: '/images/baouchriye-pool-1.jpg',
        stageLabel: 'Stage 1: Rebar & Rough-In Plumbing',
        caption: 'Rooftop slab rebar reinforcement grid, pool basin formwork box, and dual-loop PVC circulation piping rough-in in Baouchriye.',
      },
      {
        url: '/images/baouchriye-pool-2.jpg',
        stageLabel: 'Stage 2: Structural Concrete Pour',
        caption: 'Monolithic concrete pour for the rooftop deck and pool basin opening with perimeter column rebar cages and pipe penetrations.',
      },
      {
        url: '/images/baouchriye-pool-3.jpg',
        stageLabel: 'Stage 3: Completed Tiled Rooftop Pool',
        caption: 'Finished urban rooftop pool in Baouchriye with mosaic tile finish, built-in steps, stainless handrails, underwater lighting, and terrace deck.',
      },
    ],
    whatWasDone: [
      'Rooftop load engineering and vibration isolation.',
      'Rebar mesh slab and parapet reinforcement.',
      'Under-slab PVC hydraulic loops and drain sleeves.',
      'Cast waterproof concrete basin and deck slab.',
      'Mosaic glass tiling, LED lights, and access stairs.',
    ],
    visualType: 'pool-construction',
    isPlaceholder: false,
  },
  {
    id: 'project-yahchouch-mountain-pool',
    category: 'Projects',
    title: 'Panoramic Mountain Swimming Pool & Waterfall Construction',
    categoryLabel: 'Projects',
    location: 'Yahchouch',
    description:
      'Mountain valley pool in Yahchouch: cliff excavation, concrete shell, glass mosaic tiling, and dual cobra waterfalls.',
    imageUrl: '/images/yahchouch-pool-3.jpg',
    images: [
      '/images/yahchouch-pool-1.jpg',
      '/images/yahchouch-pool-2.jpg',
      '/images/yahchouch-pool-3.jpg',
    ],
    imageStages: [
      {
        url: '/images/yahchouch-pool-1.jpg',
        stageLabel: 'Stage 1: Excavation & Formwork',
        caption: 'Mountain ridge excavation, level sub-base concrete casting, perimeter wooden formwork, and steel rebar cage assembly in Yahchouch.',
      },
      {
        url: '/images/yahchouch-pool-2.jpg',
        stageLabel: 'Stage 2: Mosaic Tiling & Waterfall Setup',
        caption: 'Completed blue mosaic basin tiling, natural limestone perimeter coping, and dual stainless steel cobra waterfall cascade installations.',
      },
      {
        url: '/images/yahchouch-pool-3.jpg',
        stageLabel: 'Stage 3: Completed Pool & Scenic Valley Sunset',
        caption: 'Finished luxury swimming pool with flowing cobra waterfall, stone terrace, lush grass lawn, and panoramic mountain sunset views in Yahchouch.',
      },
    ],
    whatWasDone: [
      'Cliffside rock excavation and concrete sub-base.',
      'Dual-layer wall and floor rebar cage anchoring.',
      'Monolithic waterproof concrete basin casting.',
      'Glass mosaic tiling and limestone coping.',
      'Dual stainless steel cobra waterfall setup.',
    ],
    visualType: 'pool-construction',
    isPlaceholder: false,
  },
  {
    id: 'project-freeform-pool-jacuzzi',
    category: 'Projects',
    title: 'Freeform Lagoon Pool & Raised Jacuzzi Construction',
    categoryLabel: 'Projects',
    description:
      'Curved freeform pool and elevated round Jacuzzi with timber cladding, perimeter overflow, and sand-toned deck.',
    imageUrl: '/images/freeform-pool-jacuzzi-2.jpg',
    images: [
      '/images/freeform-pool-jacuzzi-1.jpg',
      '/images/freeform-pool-jacuzzi-2.jpg',
    ],
    imageStages: [
      {
        url: '/images/freeform-pool-jacuzzi-1.jpg',
        stageLabel: 'Stage 1: Basin Tiling & Jacuzzi Cladding',
        caption: 'Curved concrete shell plastering, blue mosaic wall tiling, radial entry stairs, and elevated circular Jacuzzi timber cladding.',
      },
      {
        url: '/images/freeform-pool-jacuzzi-2.jpg',
        stageLabel: 'Stage 2: Completed Pool, Spa & Garden Deck',
        caption: 'Finished freeform lagoon pool with overflow grating channel, operational circular spa, polished sand-toned deck, and olive grove landscaping.',
      },
    ],
    whatWasDone: [
      'Excavation and curved contour formwork.',
      'Custom rebar grid and radial entry stairs.',
      'Monolithic pour for lagoon pool and raised Jacuzzi.',
      'Jacuzzi timber exterior cladding and steps.',
      'Perimeter overflow channel and seamless sand deck.',
    ],
    visualType: 'pool-construction',
    isPlaceholder: false,
  },
  {
    id: 'project-maaysrah-water-treatment',
    category: 'Projects',
    title: 'Multi-Stage Water Treatment & Filtration Station',
    categoryLabel: 'Projects',
    location: 'Maaysrah',
    description:
      'Comprehensive water treatment plant in Maaysrah: quartz sand filtration, activated carbon, water softening, and automated chlorination.',
    imageUrl: '/images/maaysrah-treatment-1.jpg',
    images: [
      '/images/maaysrah-treatment-1.jpg',
      '/images/maaysrah-treatment-2.jpg',
      '/images/maaysrah-treatment-3.jpg',
    ],
    imageStages: [
      {
        url: '/images/maaysrah-treatment-1.jpg',
        stageLabel: 'Stage 1: Media Filtration & Chlorination',
        caption: 'Indoor central plant with Sand filter, Carbon filter, Softener vessel, salt brine tank, and automated chlorine dosing station in Maaysrah.',
      },
      {
        url: '/images/maaysrah-treatment-2.jpg',
        stageLabel: 'Stage 2: Reverse Osmosis & Purification Skid',
        caption: 'Multi-stage media filtration vessels paired with a commercial Reverse Osmosis (RO) membrane purification skid and digital instrumentation in Maaysrah.',
      },
      {
        url: '/images/maaysrah-treatment-3.jpg',
        stageLabel: 'Stage 3: Water Softener & Cartridge Station',
        caption: 'Dedicated automatic resin water softener cylinder with brine tank and dual high-efficiency cartridge sediment pre-filters in Maaysrah.',
      },
    ],
    whatWasDone: [
      'Installed triple-vessel quartz sand, activated carbon, and resin softener filters.',
      'Integrated automated chlorine dosing system and brine regeneration tank.',
      'Configured commercial reverse osmosis (RO) membrane purification skid.',
      'Connected high-pressure booster pumps and dual cartridge sediment pre-filters.',
      'Calibrated digital flow meters, pressure gauges, and automated backwash valves.',
    ],
    visualType: 'filtration-setup',
    isPlaceholder: false,
  },
  {
    id: 'project-residential-filtration-uv',
    category: 'Projects',
    title: 'Domestic Water Filtration & UV Sterilization Systems',
    categoryLabel: 'Projects',
    description:
      'Advanced domestic water purification: automated media softening, dual cartridge micro-filtration, UV sterilization, and reverse osmosis.',
    imageUrl: '/images/filtration-uv-1.jpg',
    images: [
      '/images/filtration-uv-1.jpg',
      '/images/filtration-uv-2.jpg',
      '/images/filtration-uv-3.jpg',
    ],
    imageStages: [
      {
        url: '/images/filtration-uv-1.jpg',
        stageLabel: 'Stage 1: Media Softening & Dual Pre-Filters',
        caption: 'Central automated resin water softener cylinder with digital valve head and dual Big Blue cartridge sediment filters.',
      },
      {
        url: '/images/filtration-uv-2.jpg',
        stageLabel: 'Stage 2: Cartridge Filtration & UV Sterilizer',
        caption: 'Wall-mounted dual micro-filtration housings paired with a stainless steel ultraviolet (UV) germicidal sterilization chamber.',
      },
      {
        url: '/images/filtration-uv-3.jpg',
        stageLabel: 'Stage 3: Multi-Stage Reverse Osmosis & UV Unit',
        caption: 'Under-sink multi-stage Reverse Osmosis (RO) drinking purification system with pressure gauge and in-line UV sterilizer.',
      },
    ],
    whatWasDone: [
      'Installed automatic media resin softener with digital control valve.',
      'Mounted dual-stage sediment and carbon cartridge micro-filters.',
      'Integrated stainless steel ultraviolet (UV) germicidal sterilizer.',
      'Configured multi-stage reverse osmosis (RO) drinking purification unit.',
      'Connected bypass valves, pressure gauges, and flexible plumbing lines.',
    ],
    visualType: 'filtration-setup',
    isPlaceholder: false,
  },
  {
    id: 'project-commercial-ro-filtration',
    category: 'Projects',
    title: 'Commercial RO Desalination & Solar-Powered Filtration',
    categoryLabel: 'Projects',
    description:
      'Advanced water purification: commercial reverse osmosis desalination, anti-scale dosing, solar-canopy media filtration, and digital softening.',
    imageUrl: '/images/filtration-station-1.jpg',
    images: [
      '/images/filtration-station-1.jpg',
      '/images/filtration-station-2.jpg',
      '/images/filtration-station-3.jpg',
    ],
    imageStages: [
      {
        url: '/images/filtration-station-1.jpg',
        stageLabel: 'Stage 1: RO Desalination & Media Plant',
        caption: 'Commercial Reverse Osmosis (RO) skid with stainless membrane housings, anti-scale dosing station, Sand, and Carbon filters.',
      },
      {
        url: '/images/filtration-station-2.jpg',
        stageLabel: 'Stage 2: Solar Canopy Multi-Media Filtration',
        caption: 'Rooftop 3-vessel automated media plant under solar canopy with digital control heads, UV disinfection, and bulk storage integration.',
      },
      {
        url: '/images/filtration-station-3.jpg',
        stageLabel: 'Stage 3: Automated Water Softener Station',
        caption: 'Indoor digital resin softener cylinder with salt brine regeneration tank and dual Big Blue sediment cartridge pre/post-filters.',
      },
    ],
    whatWasDone: [
      'Assembled commercial Reverse Osmosis skid with digital TDS monitor.',
      'Integrated anti-scale chemical dosing tank and high-pressure pump.',
      'Installed triple-vessel media filtration plant under solar canopy.',
      'Mounted in-line stainless steel UV germicidal sterilizer unit.',
      'Connected automatic digital water softener and dual cartridge filters.',
    ],
    visualType: 'filtration-setup',
    isPlaceholder: false,
  },
  {
    id: 'project-solar-water-heating',
    category: 'Projects',
    title: 'Rooftop Solar Water Heating System Installation',
    categoryLabel: 'Projects',
    description:
      'Energy-efficient domestic hot water: high-absorptivity flat-plate solar collector, insulated storage tank, and reinforced mounting frame.',
    imageUrl: '/images/solar-heating-1.jpg',
    images: [
      '/images/solar-heating-1.jpg',
      '/images/solar-heating-2.jpg',
    ],
    imageStages: [
      {
        url: '/images/solar-heating-1.jpg',
        stageLabel: 'Stage 1: Solar Collector & Storage Cylinder',
        caption: 'High-efficiency flat-plate solar thermal collector panel paired with a horizontal insulated hot water storage tank.',
      },
      {
        url: '/images/solar-heating-2.jpg',
        stageLabel: 'Stage 2: Anchored Subframe & Hydraulic Piping',
        caption: 'Galvanized steel structural support rack anchored on concrete footings with insulated thermal circulation lines.',
      },
    ],
    whatWasDone: [
      'Assembled galvanized steel support frame with concrete ballast anchors.',
      'Mounted tempered glass flat-plate solar thermal collector panel.',
      'Installed pressurized insulated solar hot water storage cylinder.',
      'Connected insulated supply, return, and temperature relief lines.',
      'Pressure-tested hydraulic circuit and commissioned thermostatic controls.',
    ],
    visualType: 'solar-collectors',
    isPlaceholder: false,
  },
  {
    id: 'project-rooftop-infinity-jacuzzi',
    category: 'Projects',
    title: 'Panoramic Rooftop Hydrotherapy Jacuzzi & Plunge Pool',
    categoryLabel: 'Projects',
    description:
      'Luxury rooftop spa with coastal views: marble-tiled hydrotherapy Jacuzzi, spillover plunge pool, timber deck, and glass balustrades.',
    imageUrl: '/images/rooftop-jacuzzi-1.jpg',
    images: [
      '/images/rooftop-jacuzzi-1.jpg',
      '/images/rooftop-jacuzzi-2.jpg',
    ],
    imageStages: [
      {
        url: '/images/rooftop-jacuzzi-1.jpg',
        stageLabel: 'Stage 1: Rooftop Spa & Coastal Terrace',
        caption: 'Overhead view of the dual-zone hydrotherapy Jacuzzi, cascade plunge pool, timber decking, and glass railing with sunset coastal views.',
      },
      {
        url: '/images/rooftop-jacuzzi-2.jpg',
        stageLabel: 'Stage 2: High-Power Hydrotherapy Jets',
        caption: 'Active multi-port massage jet nozzles, stone spillover waterfall spout, blue marble tiling, and panoramic Mediterranean sunset.',
      },
    ],
    whatWasDone: [
      'Reinforced concrete basin casting for dual-zone spa and plunge pool.',
      'Multi-port high-pressure hydrotherapy massage jet manifold.',
      'Natural stone spillover waterfall cascade and overflow return.',
      'Premium blue veined marble tiling and bullnose coping stones.',
      'Frameless tempered glass safety balustrade and composite timber deck.',
    ],
    visualType: 'system-piping',
    isPlaceholder: false,
  },
] as const;

/**
 * [OWNER TO UPDATE]:
 * Keep empty until real, approved customer testimonials are provided.
 * The "What Our Customers Say" section is automatically hidden while empty.
 */
export const VERIFIED_CUSTOMER_REVIEWS: readonly CustomerReview[] = [];

