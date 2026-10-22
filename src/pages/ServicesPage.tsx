import React from 'react';
import { ArrowRight, Check, Waves, Sparkles } from 'lucide-react';
import {
  CORE_SERVICES,
  ADDITIONAL_SERVICES,
  PROBLEM_SOLUTIONS,
  ServiceInquiryOption,
} from '../utils/waterCycleLogic';
import { ServiceVisual } from '../components/PoolVisuals';

interface ServicesPageProps {
  activeProblemId: string | null;
  onServiceInquire: (serviceOption: ServiceInquiryOption) => void;
  onProblemClick: (problemId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  activeProblemId,
  onServiceInquire,
  onProblemClick,
}) => {
  return (
    <div>
      {/* 1. MAIN SERVICES ("What We Do") — 3 Primary Services + Visually Quieter "Additional Solutions" */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="py-20 bg-[#ABCDE9] border-b-4 border-[#156D95]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#063D5B] text-[#ABCDE9] text-xs font-bold tracking-wider uppercase mb-3">
              Main Services
            </span>
            <h1
              id="services-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#063D5B] tracking-tight text-balance"
            >
              What We Do
            </h1>
            <p className="mt-3 text-base text-[#063D5B]/90 leading-relaxed font-medium">
              Practical solutions for swimming pools, water treatment and filtration, and solar water heating in Lebanon.
            </p>
          </div>

          {/* 3 Primary Services (Equal Visual Priority) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map((service) => (
              <article
                key={service.id}
                id={`service-${service.id}`}
                className="rounded-2xl border-2 border-[#156D95] bg-[#62A1C2] text-white overflow-hidden flex flex-col justify-between transition-all hover:border-[#063D5B] shadow-md"
              >
                <div>
                  <ServiceVisual serviceId={service.id} />
                  <div className="p-6">
                    <div className="text-xs text-[#DCEBFA] mb-2 flex items-center gap-2">
                      <span className="font-bold text-[#063D5B] bg-[#ABCDE9] px-2 py-0.5 rounded-md">
                        {service.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold">Primary Service</span>
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm text-[#EFF7FD] leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="mt-5 pt-5 border-t border-[#ABCDE9]/35 space-y-2.5">
                      {service.highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-xs text-white"
                        >
                          <Check
                            className="w-4 h-4 text-[#ABCDE9] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onServiceInquire(service.inquiryOption)}
                    className="w-full inline-flex items-center justify-between px-5 py-3 text-xs font-bold text-[#063D5B] bg-[#ABCDE9] hover:bg-[#C6E0F5] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
                  >
                    <span>Contact Us About {service.shortCategory}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Visually Quieter Group: "Additional Solutions" (Cards 4 & 5 from PDF) */}
          <div className="mt-14 pt-12 border-t-2 border-[#62A1C2]">
            <div className="max-w-2xl mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#156D95] text-white text-xs font-bold tracking-wider uppercase mb-2">
                Additional Solutions
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#063D5B] tracking-tight">
                Additional Water &amp; Wellness Solutions
              </h2>
              <p className="mt-1.5 text-sm text-[#063D5B]/85 font-medium">
                Water Cycle also helps clients explore practical solutions for wastewater management and relaxation facilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ADDITIONAL_SERVICES.map((item) => (
                <article
                  key={item.id}
                  id={`service-${item.id}`}
                  className="rounded-2xl border-2 border-[#156D95]/80 bg-[#C6E0F5]/90 text-[#063D5B] p-6 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-[#156D95]">
                        <span className="px-2 py-0.5 rounded-md bg-[#063D5B] text-[#ABCDE9]">
                          {item.number}
                        </span>
                        <span>Additional Solution</span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#62A1C2] text-white flex items-center justify-center shrink-0">
                        {item.id === 'wastewater' ? (
                          <Waves className="w-5 h-5" aria-hidden="true" />
                        ) : (
                          <Sparkles className="w-5 h-5" aria-hidden="true" />
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#063D5B] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#063D5B]/90 leading-relaxed font-medium">
                      {item.description}
                    </p>

                    <ul className="mt-4 pt-4 border-t border-[#62A1C2]/40 space-y-2">
                      {item.highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-xs text-[#063D5B]"
                        >
                          <Check
                            className="w-4 h-4 text-[#156D95] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => onServiceInquire(item.inquiryOption)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#063D5B] hover:bg-[#156D95] rounded-full transition-colors cursor-pointer"
                    >
                      <span>Discuss {item.shortCategory}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SOLUTION GUIDE — Helps Visitors Select Their Need & Contact Water Cycle */}
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
              Select a category below to pre-select that topic in our contact form and discuss the right next step with Water Cycle.
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

                  <div className="mt-6 pt-4 border-t border-[#ABCDE9]/35 flex items-center justify-between gap-2">
                    <span className="text-xs text-[#ABCDE9] font-medium">Selected Topic</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold whitespace-nowrap shrink-0">
                      <span>→ {item.solutionLabel}</span>
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
