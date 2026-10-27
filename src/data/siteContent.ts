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

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;
  categoryLabel: string;
  description: string;
  whatWasDone: readonly string[];
  imageUrl: string;
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
    id: 'project-chalet-pool-complete',
    category: 'Projects',
    title: 'Chalet Swimming Pool Construction & Timber Decking',
    categoryLabel: 'Projects',
    description:
      'Turn-key swimming pool construction integrated into a hillside mountain chalet with custom blue mosaic tiling and panoramic timber decking.',
    imageUrl: '/images/pool-construction-4.jpg',
    whatWasDone: [
      'Excavation and monolithic reinforced concrete basin construction.',
      'Installed dual-skimmer circulation system, wall return jets, and underwater lighting.',
      'Complete interior finish with premium blue ceramic mosaic tiles and bullnose stone coping.',
      'Constructed cantilevered structural steel subframe with natural timber deck terrace and stainless steel pool ladder.',
    ],
    visualType: 'pool-construction',
    isPlaceholder: false,
  },
  {
    id: 'project-chalet-deck-framing',
    category: 'Projects',
    title: 'Chalet Pool Structural Deck & Cantilever Framing',
    categoryLabel: 'Projects',
    description:
      'Engineering and structural fabrication of an elevated cantilevered deck and pool surround for a hillside chalet retreat.',
    imageUrl: '/images/pool-construction-3.jpg',
    whatWasDone: [
      'Engineered heavy-duty steel subframe anchored directly to the reinforced stone terrace foundation.',
      'Erected perimeter steel safety railing and subfloor joists to support high-load wooden decking.',
      'Coordinated pool basin waterproofing, skimmer alignment, and hydraulic pressure testing.',
      'Prepared surrounding elevation for seamless transition between chalet living area and pool deck.',
    ],
    visualType: 'pool-construction',
    isPlaceholder: false,
  },
  {
    id: 'project-pool-basin-concrete',
    category: 'Projects',
    title: 'Reinforced Concrete Pool Basin & Integrated Entry Steps',
    categoryLabel: 'Projects',
    description:
      'Monolithic reinforced concrete swimming pool basin featuring cast-in-place entry stairs, sun-shelf, and integrated hydraulic channels.',
    imageUrl: '/images/pool-construction-2.jpg',
    whatWasDone: [
      'Built precision wooden formwork for the rectangular pool shell and integrated multi-tier steps.',
      'Tied dual-layer high-tensile steel rebar cage across basin base and structural perimeter walls.',
      'Poured and vibrated monolithic waterproof concrete shell engineered for seismic and soil pressure.',
      'Embedded primary suction drains, skimmer boxes, and wall return fittings with waterstops.',
    ],
    visualType: 'pool-construction',
    isPlaceholder: false,
  },
  {
    id: 'project-pool-excavation-rebar',
    category: 'Projects',
    title: 'Pool Basin Excavation, Rebar Cage & Circulation Rough-In',
    categoryLabel: 'Projects',
    description:
      'Initial earthworks, bedrock excavation, and full structural reinforcement grid installation for a residential pool basin.',
    imageUrl: '/images/pool-construction-1.jpg',
    whatWasDone: [
      'Excavated hillside terrain down to bedrock foundation and leveled pool basin floor.',
      'Installed heavy rebar grid reinforcement along basin base and retaining wall boundaries.',
      'Laid pressure-rated Schedule 40 PVC circulation piping for floor drains, inlets, and surface skimmers.',
      'Conducted comprehensive pre-pour hydrostatic pressure testing on all rough-in lines.',
    ],
    visualType: 'pool-construction',
    isPlaceholder: false,
  },
  {
    id: 'project-villa-pool-treatment',
    category: 'Projects',
    title: 'Luxury Villa Swimming Pool Water Clarity & System Setup',
    categoryLabel: 'Projects',
    description:
      'Comprehensive water treatment, chemical balancing, and advanced filtration commissioning for an expansive private villa pool.',
    imageUrl: '/images/pool-treatment-villa.jpg',
    whatWasDone: [
      'Multi-stage chemical treatment, alkalinity correction, and water clarification for mirror-like finish.',
      'Installed and calibrated commercial-grade sand filtration media and variable-speed circulation pumps.',
      'Balanced chlorine, pH, and calcium hardness to protect limestone coping and pool finishes.',
      'Tested and commissioned evening architectural lighting and automated filtration timer cycles.',
    ],
    visualType: 'water-clarity',
    isPlaceholder: false,
  },
  {
    id: 'project-pool-algae-recovery',
    category: 'Projects',
    title: 'Residential Pool Water Recovery & Algae Remediation',
    categoryLabel: 'Projects',
    description:
      'Complete rehabilitation of a stagnant, algae-heavy swimming pool, restoring crystal-clear water clarity and chemical balance.',
    imageUrl: '/images/pool-treatment-clean.jpg',
    whatWasDone: [
      'Aggressive shock chlorination and specialty algaecide dosing to neutralize heavy green algae bloom.',
      'Flocculation process applied to bind suspended microscopic particulates and settle sediment.',
      'Full manual vacuuming of pool floor debris directly to waste without loading filter media.',
      'Filter backwash, sand regeneration, and fine-tuning to deliver crystal-clear, swimming-ready water.',
    ],
    visualType: 'pool-transformation',
    isPlaceholder: false,
  },
  {
    id: 'project-jacuzzi-plumbing',
    category: 'Projects',
    title: 'Custom Concrete Jacuzzi Jet & Air Manifold Plumbing',
    categoryLabel: 'Projects',
    description:
      'High-performance hydraulic and pneumatic rough-in installation for a custom-built hillside concrete Jacuzzi.',
    imageUrl: '/images/jacuzzi-construction-3.jpg',
    whatWasDone: [
      'Engineered closed-loop hydrotherapy manifold with targeted lumbar and leg jet nozzles.',
      'Integrated dedicated air induction venturi line for balanced bubble and pressure distribution.',
      'Installed surface skimmer, bottom suction fittings, and heavy-gauge steel reinforcement formwork.',
      'Hydrostatically pressure-tested all PVC plumbing joints prior to structural concrete pouring.',
    ],
    visualType: 'system-piping',
    isPlaceholder: false,
  },
  {
    id: 'project-sauna-interior-finishing',
    category: 'Projects',
    title: 'Custom Indoor Sauna — Cedar Panelling & Heater Installation',
    categoryLabel: 'Projects',
    description:
      'Interior timber carpentry, multi-tiered floating bench construction, and rock heater installation for a bespoke indoor sauna.',
    imageUrl: '/images/sauna-construction-2.jpg',
    whatWasDone: [
      'Hand-fitted horizontal Nordic cedar tongue-and-groove thermal wall and ceiling panelling.',
      'Fabricated dual-level ergonomic floating wooden benches and removable slatted floor duckboards.',
      'Installed heavy-duty electric rock sauna heater with protective wooden safety guardrail.',
      'Integrated recessed warm ambient lighting, sauna stones, and digital thermostatic wall controls.',
    ],
    visualType: 'system-piping',
    isPlaceholder: false,
  },
  {
    id: 'project-sauna-framing-assembly',
    category: 'Projects',
    title: 'Custom Indoor Sauna — Structural Framing & Cabin Assembly',
    categoryLabel: 'Projects',
    description:
      'Structural timber framing, moisture barrier, and cabin construction for an indoor wellness sauna room.',
    imageUrl: '/images/sauna-construction-1.jpg',
    whatWasDone: [
      'Erected precision timber stud framing tailored to the dedicated indoor room dimensions.',
      'Installed high-density rockwool thermal insulation and reflective aluminium foil vapor barrier.',
      'Fitted tempered safety glass front door frame, ventilation air vents, and heat-resistant wiring conduits.',
      'Levelled subfloor base to ensure structural integrity and long-term timber stability.',
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

