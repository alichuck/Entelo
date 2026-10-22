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
  | 'Sewage & Wastewater Treatment'
  | 'Jacuzzi, Sauna & Steam Systems'
  | 'Other';

export type PortfolioCategory =
  | 'All'
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
  category: Exclude<PortfolioCategory, 'All'>;
  title: string;
  categoryLabel: string;
  description: string;
  imageUrl?: string;
  visualType:
    | 'pool-transformation'
    | 'pool-maintenance'
    | 'filtration-setup'
    | 'solar-collectors'
    | 'water-clarity'
    | 'system-piping';
  isPlaceholder: boolean;
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
    'Swimming Pool Solutions • Water Treatment & Filtration • Solar Water Heating',
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
    'Water treatment, filtration, swimming pool solutions, and solar water heating.',
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
  paragraphs: [
    'Founded in 2021 and backed by 22 years of personal industry experience, Water Cycle is a business based in Adma, Lebanon focused on water treatment, filtration systems, swimming pool solutions, and solar water heating.',
    'The company also provides solutions related to wastewater treatment and Jacuzzi, sauna, and steam facilities. Our goal is to help customers explore practical water-related systems suited to their needs.',
  ],
  proposedTagline: 'Clear Solutions. Practical Results.',
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
  {
    label: 'Contact',
    footerLabel: 'Contact',
    path: '/contact',
    title: "Let's Talk About Your Water Project | Water Cycle",
  },
] as const;

export const SERVICE_INQUIRY_OPTIONS: readonly ServiceInquiryOption[] = [
  'Swimming Pool Solutions',
  'Water Treatment & Filtration',
  'Solar Water Heating',
  'Sewage & Wastewater Treatment',
  'Jacuzzi, Sauna & Steam Systems',
  'Other',
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
    id: 'work-1',
    category: 'Swimming Pool Solutions',
    title: 'Swimming Pool Water Treatment Slot',
    categoryLabel: 'Swimming Pool Solutions',
    description:
      'Placeholder slot reserved for an approved Water Cycle swimming pool water treatment photograph.',
    visualType: 'pool-transformation',
    isPlaceholder: true,
  },
  {
    id: 'work-2',
    category: 'Swimming Pool Solutions',
    title: 'Pool System Solutions Slot',
    categoryLabel: 'Swimming Pool Solutions',
    description:
      'Placeholder slot reserved for an approved Water Cycle swimming pool system photograph.',
    visualType: 'pool-maintenance',
    isPlaceholder: true,
  },
  {
    id: 'work-3',
    category: 'Water Treatment & Filtration',
    title: 'Water Filtration System Slot',
    categoryLabel: 'Water Treatment & Filtration',
    description:
      'Placeholder slot reserved for an approved Water Cycle water treatment and filtration photograph.',
    visualType: 'filtration-setup',
    isPlaceholder: true,
  },
  {
    id: 'work-4',
    category: 'Solar Water Heating',
    title: 'Solar Water Heating Slot',
    categoryLabel: 'Solar Water Heating',
    description:
      'Placeholder slot reserved for an approved Water Cycle solar water heating system photograph.',
    visualType: 'solar-collectors',
    isPlaceholder: true,
  },
  {
    id: 'work-5',
    category: 'Sewage & Wastewater Treatment',
    title: 'Wastewater Treatment Solutions Slot',
    categoryLabel: 'Sewage & Wastewater Treatment',
    description:
      'Placeholder slot reserved for an approved Water Cycle sewage and wastewater treatment photograph.',
    visualType: 'system-piping',
    isPlaceholder: true,
  },
  {
    id: 'work-6',
    category: 'Jacuzzi, Sauna & Steam Systems',
    title: 'Jacuzzi, Sauna & Steam Systems Slot',
    categoryLabel: 'Jacuzzi, Sauna & Steam Systems',
    description:
      'Placeholder slot reserved for an approved Water Cycle wellness and relaxation system photograph.',
    visualType: 'water-clarity',
    isPlaceholder: true,
  },
] as const;

/**
 * [OWNER TO UPDATE]:
 * Keep empty until real, approved customer testimonials are provided.
 * The "What Our Customers Say" section is automatically hidden while empty.
 */
export const VERIFIED_CUSTOMER_REVIEWS: readonly CustomerReview[] = [];

