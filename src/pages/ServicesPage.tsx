import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  CORE_SERVICES,
  CONSTRUCTION_SERVICES,
  CONSTRUCTION_OVERVIEW,
  ADDITIONAL_SERVICES,
  PROBLEM_SOLUTIONS,
  ABOUT_CONTENT,
  ServiceInquiryOption,
} from '../utils/waterCycleLogic';
import {
  AnyWaterCycleServiceId,
  ServiceCardThumbnail,
  getServiceSlides,
} from '../components/ServiceCategoryVisuals';

interface ServicesPageProps {
  activeProblemId: string | null;
  onServiceInquire: (serviceOption: ServiceInquiryOption) => void;
  onProblemClick: (problemId: string) => void;
  resetTrigger?: number;
}

interface UnifiedServiceEntry {
  id: AnyWaterCycleServiceId;
  number: string;
  title: string;
  shortCategory: string;
  groupLabel: 'Main Service' | 'Construction Service' | 'Additional Solution';
  description: string;
  highlights: readonly string[];
  inquiryOption: ServiceInquiryOption;
  leadHeadline: string;
  extendedParagraphs: string[];
}

const ALL_UNIFIED_SERVICES: readonly UnifiedServiceEntry[] = [
  ...CORE_SERVICES.map((s): UnifiedServiceEntry => ({
    id: s.id,
    number: s.number,
    title: s.title,
    shortCategory: s.shortCategory,
    groupLabel: 'Main Service',
    description: s.description,
    highlights: s.highlights,
    inquiryOption: s.inquiryOption,
    leadHeadline:
      s.id === 'pool-treatment'
        ? 'WE PROVIDE PRACTICAL SWIMMING POOL WATER TREATMENT, CIRCULATION, AND RECOVERY SOLUTIONS FOR CLEAR, ENJOYABLE POOLS.'
        : s.id === 'filtration'
        ? 'WE CONFIGURE PRACTICAL WATER TREATMENT AND FILTRATION SYSTEMS TAILORED TO RESIDENTIAL AND COMMERCIAL WATER-QUALITY NEEDS.'
        : 'WE PROVIDE SOLAR THERMAL WATER-HEATING SOLUTIONS DESIGNED FOR PRACTICAL, ENERGY-CONSCIOUS OPERATION.',
    extendedParagraphs: [
      s.description,
      ABOUT_CONTENT.paragraphs[0],
      'At Water Cycle, our approach focuses on understanding each customer’s water system requirements in Lebanon and delivering functional, well-planned results.',
    ],
  })),
  ...CONSTRUCTION_SERVICES.map((s): UnifiedServiceEntry => ({
    id: s.id,
    number: s.number,
    title: s.title,
    shortCategory: s.shortCategory,
    groupLabel: 'Construction Service',
    description: s.description,
    highlights: s.highlights,
    inquiryOption: s.inquiryOption,
    leadHeadline: `WE CARRY OUT ${s.title.toUpperCase()} WITH OVER THREE YEARS OF HANDS-ON CONSTRUCTION EXPERIENCE, FROM SPACE EVALUATION TO FINISHING.`,
    extendedParagraphs: [
      s.description,
      CONSTRUCTION_OVERVIEW.paragraphs[0],
      CONSTRUCTION_OVERVIEW.scopeNote,
    ],
  })),
  ...ADDITIONAL_SERVICES.map((s): UnifiedServiceEntry => ({
    id: s.id,
    number: s.number,
    title: s.title,
    shortCategory: s.shortCategory,
    groupLabel: 'Additional Solution',
    description: s.description,
    highlights: s.highlights,
    inquiryOption: s.inquiryOption,
    leadHeadline:
      s.id === 'wastewater'
        ? 'WE HELP CLIENTS EXPLORE PRACTICAL SEWAGE AND WASTEWATER TREATMENT SOLUTIONS SUITED TO THEIR PROPERTY REQUIREMENTS.'
        : 'WE PROVIDE WATER AND HEATING SYSTEM SOLUTIONS FOR JACUZZI, SAUNA, AND STEAM RELAXATION FACILITIES.',
    extendedParagraphs: [
      s.description,
      ABOUT_CONTENT.paragraphs[2],
      ABOUT_CONTENT.paragraphs[1],
    ],
  })),
];

/**
 * Splits a highlight sentence into a sky-blue uppercase opening phrase
 * and a crisp white uppercase continuation (matching the visual rhythm of Image 2).
 */
function splitHighlightWords(text: string): { lead: string; rest: string } {
  const words = text.trim().split(/\s+/);
  const splitIndex = Math.min(3, Math.ceil(words.length / 2));
  return {
    lead: words.slice(0, splitIndex).join(' ').toUpperCase(),
    rest: words.slice(splitIndex).join(' ').toUpperCase(),
  };
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  activeProblemId,
  onServiceInquire,
  onProblemClick,
  resetTrigger = 0,
}) => {
  const [selectedServiceId, setSelectedServiceId] =
    useState<AnyWaterCycleServiceId | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSelectedServiceId(null);
    setSlideIndex(0);
  }, [resetTrigger]);

  const handleSelectService = (id: AnyWaterCycleServiceId) => {
    setSelectedServiceId(id);
    setSlideIndex(0);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeService = selectedServiceId
    ? ALL_UNIFIED_SERVICES.find((item) => item.id === selectedServiceId) ?? null
    : null;

  const activeSlides = activeService ? getServiceSlides(activeService.id) : [];
  const currentSlide =
    activeSlides.length > 0
      ? activeSlides[slideIndex % activeSlides.length]
      : null;

  const handlePrevSlide = () => {
    if (!activeSlides.length) return;
    setSlideIndex(
      (prev) => (prev - 1 + activeSlides.length) % activeSlides.length
    );
  };

  const handleNextSlide = () => {
    if (!activeSlides.length) return;
    setSlideIndex((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <div>
      {activeService && currentSlide ? (
        /* =====================================================================
         * VIEW 2: SERVICE CATEGORY DETAIL PAGE (Matches Second Reference Image)
         * Left sidebar category switcher + Large white-framed work image slider
         * + 2-column description and highlights below
         * ===================================================================== */
        <section
          id="service-detail-view"
          aria-labelledby="service-detail-heading"
          className="py-14 sm:py-20 bg-[#042B41] text-white border-b-4 border-[#156D95] min-h-[calc(100vh-5rem)]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Back Bar & Category Eyebrow */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <button
                type="button"
                onClick={() => setSelectedServiceId(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#063D5B] hover:bg-[#156D95] text-[#ABCDE9] hover:text-white border border-[#62A1C2]/60 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back to All Services</span>
              </button>

              <span className="inline-block px-3.5 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold tracking-wider uppercase">
                {activeService.groupLabel} · {activeService.number}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* LEFT SIDEBAR MENU — All Water Cycle Services (Matches Left Blue Box in Image 2) */}
              <aside
                aria-label="Service Categories"
                className="lg:col-span-3 w-full rounded-sm overflow-hidden border border-[#ABCDE9]/50 bg-[#62A1C2] shadow-lg"
              >
                <ul className="divide-y divide-[#ABCDE9]/45">
                  {ALL_UNIFIED_SERVICES.map((item) => {
                    const isCurrent = item.id === activeService.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleSelectService(item.id)}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={`w-full text-left px-4 py-3 text-xs sm:text-sm transition-colors cursor-pointer leading-snug ${
                            isCurrent
                              ? 'bg-[#ABCDE9] text-[#042B41] font-extrabold'
                              : 'text-white font-medium hover:bg-[#156D95]/65'
                          }`}
                        >
                          {item.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>

              {/* RIGHT MAIN COLUMN — Large Framed Work Image Slider + 2-Column Description Below */}
              <div className="lg:col-span-9 space-y-10">
                {/* Large White-Bordered Image Carousel Frame (Matches Image 2) */}
                <div className="relative bg-[#063D5B] border-[6px] sm:border-[8px] border-white shadow-2xl overflow-hidden aspect-[16/9]">
                  <div className="w-full h-full">{currentSlide.render()}</div>

                  {/* Subtle Bottom Caption Bar inside Frame */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#042B41]/90 via-[#042B41]/55 to-transparent px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
                        {currentSlide.title}
                      </p>
                      <p className="text-[11px] sm:text-xs text-[#DCEBFA]">
                        {currentSlide.caption}
                      </p>
                    </div>

                    {/* Slide Dots */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {activeSlides.map((slide, idx) => (
                        <button
                          key={slide.title}
                          type="button"
                          onClick={() => setSlideIndex(idx)}
                          aria-label={`View slide ${idx + 1}: ${slide.title}`}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === slideIndex
                              ? 'w-6 bg-white'
                              : 'w-2 bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Left Circular Arrow Button on White Frame Edge */}
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Previous service image"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#62A1C2] hover:text-[#042B41] shadow-md flex items-center justify-end pr-2.5 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>

                  {/* Right Circular Arrow Button on White Frame Edge */}
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Next service image"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#62A1C2] hover:text-[#042B41] shadow-md flex items-center justify-start pl-2.5 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                {/* BOTTOM 2-COLUMN DESCRIPTION SECTION (Matches Image 2 Layout with Water Cycle Content) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pt-2">
                  {/* Bottom-Left Column: Divided Uppercase Key Highlights + Summary Statement */}
                  <div className="md:col-span-5 space-y-4">
                    {activeService.highlights.map((point) => {
                      const { lead, rest } = splitHighlightWords(point);
                      return (
                        <div
                          key={point}
                          className="pb-4 border-b border-[#62A1C2]/45 text-xs sm:text-sm font-semibold tracking-wide leading-relaxed"
                        >
                          <span className="text-[#62A1C2] font-bold">
                            {lead}
                          </span>{' '}
                          <span className="text-white">{rest},</span>
                        </div>
                      );
                    })}

                    <p className="pt-1 text-sm sm:text-base font-bold text-[#62A1C2] uppercase tracking-wide leading-snug">
                      THESE ARE KEY AREAS OF{' '}
                      {activeService.title.toUpperCase()} THAT WATER CYCLE
                      OFFERS TO CLIENTS IN LEBANON.
                    </p>
                  </div>

                  {/* Bottom-Right Column: Uppercase Lead + Verified Water Cycle Paragraphs + Contact CTA */}
                  <div className="md:col-span-7 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <h1
                        id="service-detail-heading"
                        className="sr-only"
                      >
                        {activeService.title}
                      </h1>
                      <p className="text-sm sm:text-base font-bold text-[#62A1C2] uppercase tracking-wide leading-relaxed">
                        {activeService.leadHeadline}
                      </p>

                      {activeService.extendedParagraphs.map((para, idx) => (
                        <p
                          key={idx}
                          className="text-sm text-[#EFF7FD] leading-relaxed"
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    <div className="pt-5 border-t border-[#62A1C2]/45 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          onServiceInquire(activeService.inquiryOption)
                        }
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#ABCDE9] hover:bg-white text-[#042B41] text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-sm"
                      >
                        <span>
                          Contact Us About {activeService.shortCategory}
                        </span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedServiceId(null)}
                        className="text-xs font-bold text-[#ABCDE9] hover:text-white underline underline-offset-4 cursor-pointer"
                      >
                        View All Services
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* =====================================================================
         * VIEW 1: SERVICES OVERVIEW GRID (Matches First Reference Image)
         * Keeps existing Water Cycle sections & structure, removes long card
         * descriptions from the overview grid, and opens View 2 on click.
         * ===================================================================== */
        <section
          id="services"
          aria-labelledby="services-heading"
          className="py-20 bg-[#042B41] text-white border-b-4 border-[#156D95]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold tracking-wider uppercase mb-3">
                Main Services
              </span>
              <h1
                id="services-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance"
              >
                What We Do
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-[#DCEBFA] font-medium">
                Select any service below to view detailed information and visuals of our work.
              </p>
            </div>

            {/* 1. Primary Services Grid (Image + Uppercase Title underneath, like Reference Image 1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {CORE_SERVICES.map((service) => (
                <article
                  key={service.id}
                  id={`service-${service.id}`}
                  className="group"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectService(service.id)}
                    className="w-full text-left cursor-pointer focus:outline-none"
                  >
                    <div className="w-full aspect-[16/10] bg-[#063D5B] border-2 border-[#156D95] group-hover:border-[#ABCDE9] overflow-hidden shadow-lg transition-all">
                      <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                        <ServiceCardThumbnail serviceId={service.id} />
                      </div>
                    </div>
                    <h2 className="mt-3 text-sm sm:text-base font-bold text-white group-hover:text-[#ABCDE9] uppercase tracking-wider transition-colors">
                      {service.title}
                    </h2>
                  </button>
                </article>
              ))}
            </div>

            {/* 2. Construction Services Grid (5 Cards in the same clean Image + Uppercase Title layout) */}
            <div
              id="construction-services"
              className="mt-16 pt-14 border-t border-[#156D95]"
            >
              <div className="max-w-3xl mb-10">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold tracking-wider uppercase mb-3">
                  Construction Services
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {CONSTRUCTION_OVERVIEW.sectionTitle} —{' '}
                  {CONSTRUCTION_OVERVIEW.sectionSubtitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {CONSTRUCTION_SERVICES.map((card) => (
                  <article
                    key={card.id}
                    id={`service-${card.id}`}
                    className="group"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectService(card.id)}
                      className="w-full text-left cursor-pointer focus:outline-none"
                    >
                      <div className="w-full aspect-[16/10] bg-[#063D5B] border-2 border-[#156D95] group-hover:border-[#ABCDE9] overflow-hidden shadow-lg transition-all">
                        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                          <ServiceCardThumbnail serviceId={card.id} />
                        </div>
                      </div>
                      <h3 className="mt-3 text-sm sm:text-base font-bold text-white group-hover:text-[#ABCDE9] uppercase tracking-wider transition-colors">
                        {card.title}
                      </h3>
                    </button>
                  </article>
                ))}
              </div>
            </div>

            {/* 3. Additional Solutions Grid (2 Cards in the same clean Image + Uppercase Title layout) */}
            <div className="mt-16 pt-14 border-t border-[#156D95]">
              <div className="max-w-2xl mb-10">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#156D95] text-white text-xs font-bold tracking-wider uppercase mb-3">
                  Additional Solutions
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Additional Water &amp; Wellness Solutions
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {ADDITIONAL_SERVICES.map((item) => (
                  <article
                    key={item.id}
                    id={`service-${item.id}`}
                    className="group"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectService(item.id)}
                      className="w-full text-left cursor-pointer focus:outline-none"
                    >
                      <div className="w-full aspect-[16/10] bg-[#063D5B] border-2 border-[#156D95] group-hover:border-[#ABCDE9] overflow-hidden shadow-lg transition-all">
                        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                          <ServiceCardThumbnail serviceId={item.id} />
                        </div>
                      </div>
                      <h3 className="mt-3 text-sm sm:text-base font-bold text-white group-hover:text-[#ABCDE9] uppercase tracking-wider transition-colors">
                        {item.title}
                      </h3>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INTERACTIVE SOLUTION GUIDE — Helps Visitors Select Their Need & Contact Water Cycle */}
      <section
        id="solutions"
        aria-labelledby="solutions-heading"
        className="py-20 bg-[#063D5B] text-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold tracking-wider uppercase mb-3">
              How Can We Help?
            </span>
            <h2
              id="solutions-heading"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance"
            >
              Find the Right Solution for Your Project
            </h2>
            <p className="mt-2 text-sm text-[#DCEBFA]/90 leading-relaxed">
              Select a category below to pre-select that topic in our contact section and discuss the right next step with Water Cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROBLEM_SOLUTIONS.map((item) => {
              const isSelected = activeProblemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={`problem-card-${item.id}`}
                  onClick={() => onProblemClick(item.id)}
                  className={`text-left p-6 rounded-2xl border-2 transition-colors flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#62A1C2] border-[#ABCDE9]'
                      : 'bg-[#156D95]/75 border-[#62A1C2]/60 hover:bg-[#62A1C2] hover:border-[#ABCDE9]'
                  }`}
                >
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      {item.problemTitle}
                    </h3>
                    <p className="mt-2 text-xs text-[#EFF7FD] leading-relaxed">
                      {item.problemDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#ABCDE9]/35 flex flex-wrap items-center justify-between gap-2 min-w-0">
                    <span className="text-xs text-[#ABCDE9] font-medium shrink-0">
                      Selected Topic
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-[11px] sm:text-xs font-bold max-w-full min-w-0">
                      <span className="truncate">→ {item.solutionLabel}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
