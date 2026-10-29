import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sun,
  Droplets,
  Filter,
  Waves,
  Sparkles,
  Hammer,
  CheckCircle2,
} from 'lucide-react';
import {
  COMPANY_CONTACT,
  HERO_CONTENT,
  CONSTRUCTION_OVERVIEW,
  CORE_SERVICES,
  ADDITIONAL_SERVICES,
  PageRoute,
  ServiceInquiryOption,
} from '../utils/waterCycleLogic';
import { HeroSeaWaveLogo, LogoIntroPhase } from '../components/WaveLogoIntro';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onServiceInquire?: (service: ServiceInquiryOption) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onServiceInquire,
}) => {
  const [introPhase, setIntroPhase] = useState<LogoIntroPhase>('fullscreen-wave');

  const handleReplay = useCallback(() => {
    setIntroPhase('settled-with-descriptions');
  }, []);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setIntroPhase('settled-with-descriptions');
    }, 550);

    return () => clearTimeout(revealTimer);
  }, []);

  const showDescriptions = introPhase === 'settled-with-descriptions';

  const getPrimaryIcon = (id: 'pool-treatment' | 'filtration' | 'solar') => {
    if (id === 'pool-treatment') {
      return <Droplets className="w-5 h-5" aria-hidden="true" />;
    }
    if (id === 'filtration') {
      return <Filter className="w-5 h-5" aria-hidden="true" />;
    }
    return <Sun className="w-5 h-5" aria-hidden="true" />;
  };

  return (
    <div>
      {/* 1. HOMEPAGE HERO — Real Pool Background Photo Aligned Behind the Wavy Logo */}
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-[calc(100vh-5rem)] py-12 sm:py-16 lg:py-20 bg-[#063D5B] border-b-4 border-[#156D95] text-white overflow-hidden flex flex-col justify-center"
      >
        {/* Background Photo Layer: Balanced opacity infinity pool & mountain horizon */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/hero-pool-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[50%_58%] opacity-75 select-none"
          />
          {/* Balanced Brand-Blue Overlay so the logo and hero text stand out clearly */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#DCEBFA]/45 via-[#62A1C2]/30 to-[#063D5B]/78"
          />
          {/* Soft Radial Halo Behind the Logo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_52%_38%_at_50%_36%,rgba(220,235,250,0.48)_0%,rgba(171,205,233,0.22)_55%,transparent_85%)]"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          {/* Realistic Rotating Water Wave Creating the Wavy "WATER CYCLE" Logo */}
          <HeroSeaWaveLogo phase={introPhase} onReplay={handleReplay} />

          {/* Main Headline, Subtitle, Supporting Line & Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={
              showDescriptions
                ? { opacity: 1, y: 0, pointerEvents: 'auto' }
                : { opacity: 0, y: 28, pointerEvents: 'auto' }
            }
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ pointerEvents: 'auto' }}
            className="relative z-20 flex flex-col items-center pointer-events-auto w-full"
          >
            <h1
              id="hero-heading"
              className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] sm:leading-[1.12] text-balance drop-shadow-[0_3px_16px_rgba(4,43,65,0.9)]"
            >
              {HERO_CONTENT.headline}
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl font-semibold text-[#EAF4FC] leading-snug max-w-2xl drop-shadow-[0_2px_12px_rgba(4,43,65,0.9)]">
              {HERO_CONTENT.subtitle}
            </p>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-white leading-relaxed max-w-xl font-medium drop-shadow-[0_2px_10px_rgba(4,43,65,0.88)]">
              {HERO_CONTENT.supportingLine}
            </p>

            {/* Primary & Secondary Action Buttons ("Explore Services" & "Contact Us") */}
            <div className="relative z-30 mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto max-w-xs sm:max-w-none pointer-events-auto">
              <a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/services');
                }}
                className="relative z-30 pointer-events-auto touch-manipulation cursor-pointer min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-[#063D5B] bg-[#ABCDE9] hover:bg-[#DCEBFA] active:bg-[#DCEBFA] border-2 border-white/40 rounded-full transition-colors whitespace-nowrap shadow-lg"
              >
                <span>{HERO_CONTENT.primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className="relative z-30 pointer-events-auto touch-manipulation cursor-pointer min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white bg-[#063D5B]/95 hover:bg-[#042B41] active:bg-[#042B41] border-2 border-[#ABCDE9]/60 rounded-full transition-colors whitespace-nowrap shadow-lg"
              >
                <span>{HERO_CONTENT.secondaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#ABCDE9] shrink-0" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. "WHAT WE DO" OVERVIEW — 3 Primary Services + 2 Additional Solutions */}
      <section
        aria-labelledby="home-overview-heading"
        className="py-16 sm:py-20 bg-[#ABCDE9]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#156D95] mb-2">
                Main Services
              </p>
              <h2
                id="home-overview-heading"
                className="text-2xl sm:text-3xl font-bold text-[#063D5B] tracking-tight"
              >
                What We Do
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#063D5B]/85 max-w-2xl font-medium">
                {COMPANY_CONTACT.tagline} Explore our core water, pool, filtration, and solar water-heating solutions.
              </p>
            </div>
            <a
              href="/our-work"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/our-work');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#063D5B] text-[#ABCDE9] hover:text-white text-xs font-bold transition-colors self-start sm:self-auto shrink-0"
            >
              <span>See the Difference Water Treatment Can Make</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* 3 Primary Services (Visually Equal Priority) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl border-2 border-[#156D95] bg-[#62A1C2] text-white shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center mb-4 shadow-xs">
                    {getPrimaryIcon(service.id)}
                  </div>
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm text-[#EFF7FD] leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/services');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ABCDE9] text-[#063D5B] hover:bg-[#C6E0F5] text-xs font-bold transition-colors"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  {onServiceInquire && (
                    <button
                      type="button"
                      onClick={() => onServiceInquire(service.inquiryOption)}
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#063D5B]/80 hover:bg-[#063D5B] text-[#ABCDE9] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Inquire</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Visually Quieter "Additional Solutions" Group Below Primary Services */}
          <div className="mt-10 pt-8 border-t-2 border-[#62A1C2]/60">
            <div className="mb-5">
              <h3 className="text-sm font-bold tracking-wider uppercase text-[#063D5B]">
                Additional Solutions
              </h3>
              <p className="text-xs text-[#063D5B]/80 mt-0.5 font-medium">
                Specialized water-related systems and treatment solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ADDITIONAL_SERVICES.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-[#156D95]/70 bg-[#C6E0F5]/85 text-[#063D5B] flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#62A1C2] text-white flex items-center justify-center shrink-0 mt-0.5">
                      {item.id === 'wastewater' ? (
                        <Waves className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <Sparkles className="w-5 h-5" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#063D5B]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm text-[#063D5B]/85 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/services');
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#063D5B] text-[#ABCDE9] hover:text-white text-xs font-bold whitespace-nowrap shrink-0 self-center transition-colors"
                  >
                    Details →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. POOL & LEISURE CONSTRUCTION — "From Planning to Reality" */}
      <section
        id="home-construction"
        aria-labelledby="home-construction-heading"
        className="py-16 sm:py-20 bg-[#063D5B] text-white border-t-4 border-[#156D95]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Title, Subtitle, Description Paragraphs & "Explore Our Services" Button */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold tracking-wider uppercase">
                <Hammer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{CONSTRUCTION_OVERVIEW.experienceBadge}</span>
              </div>

              <div>
                <h2
                  id="home-construction-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance"
                >
                  {CONSTRUCTION_OVERVIEW.sectionTitle}
                </h2>
                <p className="mt-2 text-lg sm:text-xl font-semibold text-[#ABCDE9]">
                  {CONSTRUCTION_OVERVIEW.sectionSubtitle}
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#EFF7FD] leading-relaxed">
                {CONSTRUCTION_OVERVIEW.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/services');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#063D5B] bg-[#ABCDE9] hover:bg-[#DCEBFA] rounded-full transition-colors whitespace-nowrap shadow-md"
                >
                  <span>{CONSTRUCTION_OVERVIEW.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Column: Structured Construction Scope List */}
            <div className="lg:col-span-6 bg-[#156D95]/45 border-2 border-[#62A1C2]/60 rounded-2xl p-6 sm:p-8 shadow-md">
              <h3 className="text-sm font-bold tracking-wider uppercase text-[#ABCDE9] mb-2">
                Construction Scope &amp; Space Planning
              </h3>
              <p className="text-xs sm:text-sm text-[#DCEBFA] leading-relaxed mb-5">
                {CONSTRUCTION_OVERVIEW.scopeNote}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONSTRUCTION_OVERVIEW.scopeItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#063D5B]/80 border border-[#62A1C2]/40 text-xs sm:text-sm text-white font-medium"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#ABCDE9] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
