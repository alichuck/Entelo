import React from 'react';
import {
  ArrowRight,
  MapPin,
  Calendar,
  Award,
  Hammer,
  ExternalLink,
} from 'lucide-react';
import {
  ABOUT_CONTENT,
  COMPANY_CONTACT,
  PageRoute,
} from '../utils/waterCycleLogic';
import { ReviewsSection } from '../components/ReviewsSection';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* ABOUT WATER CYCLE — Location + Industry Since 2021 + 22 Years Personal Experience */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative min-h-[calc(100vh-5rem)] py-20 bg-[#063D5B] text-white border-b-4 border-[#156D95] overflow-hidden"
      >
        {/* Background Photo Layer: High-opacity pool, sauna, jacuzzi, solar & filtration scene */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/about-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-100 select-none"
          />
          {/* Subtle atmospheric gradient so the background photo stays vivid while text remains readable */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#063D5B]/25 via-[#063D5B]/15 to-[#063D5B]/55"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Title, Proposed Tagline & Experience/Location Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
                  {ABOUT_CONTENT.sectionEyebrow}
                </span>
                <h1
                  id="about-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance drop-shadow-[0_3px_16px_rgba(4,43,65,0.9)]"
                >
                  {ABOUT_CONTENT.sectionTitle}
                </h1>
                <p className="mt-3 text-base font-bold text-[#EAF4FC] tracking-wide drop-shadow-[0_2px_10px_rgba(4,43,65,0.9)]">
                  &ldquo;{ABOUT_CONTENT.proposedTagline}&rdquo;
                </p>
              </div>

              {/* Experience & Location Highlight Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#063D5B]/82 backdrop-blur-xs border-2 border-[#156D95] shadow-lg space-y-5">
                {/* 22 Years Personal Experience */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#ABCDE9]">
                      Personal Industry Experience
                    </span>
                    <span className="text-lg font-bold text-white">
                      {ABOUT_CONTENT.personalExperienceYears} of Personal Experience
                    </span>
                    <span className="block text-xs text-[#DCEBFA]/85 mt-0.5">
                      Hands-on expertise in water, pool, and filtration systems
                    </span>
                  </div>
                </div>

                {/* In the Industry Since 2021 */}
                <div className="pt-4 border-t border-[#156D95] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#ABCDE9]">
                      Company Established
                    </span>
                    <span className="text-lg font-bold text-white">
                      In the Industry Since {ABOUT_CONTENT.companySince}
                    </span>
                    <span className="block text-xs text-[#DCEBFA]/85 mt-0.5">
                      Dedicated water and pool solutions company
                    </span>
                  </div>
                </div>

                {/* Since 2018 in Construction */}
                <div className="pt-4 border-t border-[#156D95] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0">
                    <Hammer className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#ABCDE9]">
                      Pool &amp; Leisure Construction
                    </span>
                    <span className="text-lg font-bold text-white">
                      {ABOUT_CONTENT.constructionExperienceYears} in Construction
                    </span>
                    <span className="block text-xs text-[#DCEBFA]/85 mt-0.5">
                      Space evaluation, excavation, concrete works, tiling, and finishing
                    </span>
                  </div>
                </div>

                {/* Location: Adma, Lebanon (Clickable Google Maps Link) */}
                <div className="pt-4 border-t border-[#156D95]">
                  <a
                    href={COMPANY_CONTACT.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#ABCDE9] text-[#063D5B] group-hover:bg-white transition-colors flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-[#ABCDE9]">
                        Location (Google Maps)
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-base font-bold text-white group-hover:text-[#ABCDE9] underline underline-offset-4 transition-colors">
                        <span>{COMPANY_CONTACT.location}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </span>
                      <span className="block text-xs text-[#DCEBFA]/85 mt-0.5">
                        Click to view location on Maps
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Main Copy & Structured Scope Summary */}
            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#EFF7FD] leading-relaxed bg-[#063D5B]/82 backdrop-blur-xs p-5 sm:p-9 rounded-2xl border-2 border-[#156D95] shadow-lg">
              {ABOUT_CONTENT.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-[#EFF7FD] leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Key Milestones Banner Inside Copy Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#156D95]/60 border border-[#62A1C2]/60 text-center">
                  <span className="block text-2xl font-bold text-white font-display">
                    {ABOUT_CONTENT.personalExperienceYears}
                  </span>
                  <span className="mt-1 block text-xs font-medium text-[#ABCDE9]">
                    Personal Experience
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#156D95]/60 border border-[#62A1C2]/60 text-center">
                  <span className="block text-2xl font-bold text-white font-display">
                    Since {ABOUT_CONTENT.companySince}
                  </span>
                  <span className="mt-1 block text-xs font-medium text-[#ABCDE9]">
                    Water Cycle Established
                  </span>
                </div>
                <a
                  href={COMPANY_CONTACT.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 sm:p-4 rounded-xl bg-[#156D95]/60 hover:bg-[#156D95] border border-[#62A1C2]/60 hover:border-[#ABCDE9] text-center transition-colors block group"
                >
                  <span className="inline-flex items-center justify-center gap-1 text-xl font-bold text-white group-hover:text-[#ABCDE9] underline underline-offset-4 font-display">
                    <span>{COMPANY_CONTACT.location}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-xs font-medium text-[#ABCDE9]">
                    Open in Google Maps
                  </span>
                </a>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/services');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-[#063D5B] bg-[#ABCDE9] hover:bg-[#C6E0F5] rounded-full transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-[#156D95] hover:bg-[#62A1C2] border border-[#ABCDE9]/50 rounded-full transition-colors whitespace-nowrap shrink-0"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* F. CUSTOMER REVIEWS ("What Our Customers Say" — Automatically hidden until verified reviews exist) */}
      <ReviewsSection />
    </div>
  );
};
