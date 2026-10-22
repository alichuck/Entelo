import {
  COMPANY_CONTACT,
  HERO_CONTENT,
  ABOUT_CONTENT,
  CONSTRUCTION_OVERVIEW,
  NAV_ITEMS,
  SERVICE_INQUIRY_OPTIONS,
  CORE_SERVICES,
  CONSTRUCTION_SERVICES,
  ADDITIONAL_SERVICES,
  PROBLEM_SOLUTIONS,
  BEFORE_AFTER_CONFIG,
  PORTFOLIO_ITEMS,
  VERIFIED_CUSTOMER_REVIEWS,
} from '../data/siteContent.ts';

import type {
  PageRoute,
  NavItem,
  ServiceInquiryOption,
  PortfolioCategory,
  CoreServiceItem,
  ConstructionServiceItem,
  AdditionalServiceItem,
  ProblemSolutionItem,
  PortfolioItem,
  CustomerReview,
} from '../data/siteContent.ts';

export {
  COMPANY_CONTACT,
  HERO_CONTENT,
  ABOUT_CONTENT,
  CONSTRUCTION_OVERVIEW,
  NAV_ITEMS,
  SERVICE_INQUIRY_OPTIONS,
  CORE_SERVICES,
  CONSTRUCTION_SERVICES,
  ADDITIONAL_SERVICES,
  PROBLEM_SOLUTIONS,
  BEFORE_AFTER_CONFIG,
  PORTFOLIO_ITEMS,
  VERIFIED_CUSTOMER_REVIEWS,
};

export type {
  PageRoute,
  NavItem,
  ServiceInquiryOption,
  PortfolioCategory,
  CoreServiceItem,
  ConstructionServiceItem,
  AdditionalServiceItem,
  ProblemSolutionItem,
  PortfolioItem,
  CustomerReview,
};

export interface ContactFormInput {
  name: string;
  contactInfo: string;
  service: ServiceInquiryOption;
  message: string;
  honeypot?: string;
}

export interface ContactFormValidationResult {
  isValid: boolean;
  isSpam?: boolean;
  errors: {
    name?: string;
    contactInfo?: string;
    service?: string;
    message?: string;
  };
}

export interface BeforeAfterSliderState {
  clampedPercentage: number;
  leftSidePoolState: 'dirty-green';
  rightSidePoolState: 'clean-blue';
  leftSideLabel: 'BEFORE';
  rightSideLabel: 'AFTER';
  beforeOverlayClipPath: string;
  beforeVisibleWidthPercent: number;
  afterVisibleWidthPercent: number;
}

export function shouldShowReviewsSection(
  reviews: readonly CustomerReview[] = VERIFIED_CUSTOMER_REVIEWS
): boolean {
  return reviews.length > 0;
}

/**
 * Computes the exact visual geometry and state labels for the Before & After pool slider.
 *
 * CRITICAL INVARIANT:
 * - Left side (0% -> clampedPercentage%) is ALWAYS the BEFORE state ('dirty-green') labeled 'BEFORE'.
 * - Right side (clampedPercentage% -> 100%) is ALWAYS the AFTER state ('clean-blue') labeled 'AFTER'.
 */
export function computeBeforeAfterState(rawPercentage: number): BeforeAfterSliderState {
  const numeric = Number.isFinite(rawPercentage) ? rawPercentage : 50;
  const clampedPercentage = Math.min(100, Math.max(0, Math.round(numeric * 10) / 10));
  const rightInsetPercent = Math.round((100 - clampedPercentage) * 10) / 10;

  return {
    clampedPercentage,
    leftSidePoolState: 'dirty-green',
    rightSidePoolState: 'clean-blue',
    leftSideLabel: 'BEFORE',
    rightSideLabel: 'AFTER',
    beforeOverlayClipPath: `inset(0 ${rightInsetPercent}% 0 0)`,
    beforeVisibleWidthPercent: clampedPercentage,
    afterVisibleWidthPercent: rightInsetPercent,
  };
}

export function resolveProblemSelection(problemId: string): {
  service: ServiceInquiryOption;
  suggestedMessage: string;
} {
  const found = PROBLEM_SOLUTIONS.find((item) => item.id === problemId);
  if (!found) {
    return {
      service: 'Other',
      suggestedMessage: '',
    };
  }

  return {
    service: found.mappedService,
    suggestedMessage: `Hello Water Cycle, I would like to discuss: ${found.problemTitle}.`,
  };
}

export function filterPortfolioItems(
  items: readonly PortfolioItem[],
  category: PortfolioCategory
): PortfolioItem[] {
  if (category === 'All') {
    return [...items];
  }
  return items.filter((item) => item.category === category);
}

export function validateContactForm(input: ContactFormInput): ContactFormValidationResult {
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return {
      isValid: false,
      isSpam: true,
      errors: {},
    };
  }

  const errors: ContactFormValidationResult['errors'] = {};

  const trimmedName = input.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const trimmedContact = input.contactInfo.trim();
  if (!trimmedContact) {
    errors.contactInfo = 'Please provide a phone number or email address.';
  } else {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const digitCount = (trimmedContact.match(/\d/g) || []).length;
    const isPhone = /^[+\d\s()-]+$/.test(trimmedContact) && digitCount >= 6;

    if (!isEmail && !isPhone) {
      errors.contactInfo =
        'Please enter a valid phone number (e.g. +961 3 058 204) or email address.';
    }
  }

  if (!SERVICE_INQUIRY_OPTIONS.includes(input.service)) {
    errors.service = 'Please select a service.';
  }

  const trimmedMessage = input.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please enter a short message describing how we can help.';
  } else if (trimmedMessage.length < 5) {
    errors.message = 'Please provide a few more details in your message.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function resolvePageRoute(rawPathOrHash: string): PageRoute {
  const cleaned = rawPathOrHash
    .trim()
    .toLowerCase()
    .replace(/^#/, '/')
    .replace(/\/+$/, '');

  if (!cleaned || cleaned === '' || cleaned === '/home' || cleaned === '/index.html') {
    return '/';
  }
  if (cleaned === '/about' || cleaned === '/about-us' || cleaned === '/reviews') {
    return '/about';
  }
  if (cleaned === '/services' || cleaned === '/solutions') {
    return '/services';
  }
  if (
    cleaned === '/our-work' ||
    cleaned === '/projects' ||
    cleaned === '/before-after' ||
    cleaned === '/portfolio'
  ) {
    return '/our-work';
  }
  if (cleaned === '/contact' || cleaned === '/contact-us') {
    return '/contact';
  }
  return '/';
}

export function getPageTitle(route: PageRoute): string {
  const match = NAV_ITEMS.find((item) => item.path === route);
  return match ? match.title : NAV_ITEMS[0].title;
}
