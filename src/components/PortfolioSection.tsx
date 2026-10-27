import React from 'react';
import {
  ExternalLink,
  CheckCircle2,
  FolderGit2,
} from 'lucide-react';
import {
  PORTFOLIO_ITEMS,
  COMPANY_CONTACT,
} from '../utils/waterCycleLogic';

export const PortfolioSection: React.FC = () => {
  return (
    <section
      id="our-work"
      aria-labelledby="our-work-heading"
      className="py-20 bg-[#ABCDE9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Unified under one category: Projects */}
        <div className="flex flex-col gap-4 mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-[#063D5B] text-[#ABCDE9] text-xs font-bold tracking-wider uppercase">
            <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Projects</span>
          </div>
          <h2
            id="our-work-heading"
            className="text-3xl sm:text-4xl font-extrabold text-[#063D5B] tracking-tight text-balance"
          >
            Featured Projects & Execution
          </h2>
          <p className="text-base sm:text-lg text-[#063D5B]/90 leading-relaxed font-medium">
            Explore Water Cycle’s hands-on project work across Lebanon. Every project below details the exact scope, structural milestones, and technical execution completed on site.
          </p>
        </div>

        {/* Unified Projects Grid */}
        <div
          data-testid="portfolio-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PORTFOLIO_ITEMS.map((item, index) => (
            <article
              key={item.id}
              data-testid={`portfolio-card-${item.id}`}
              className="group rounded-2xl border-2 border-[#156D95] bg-[#62A1C2] text-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#063D5B] hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Project Image */}
                <div className="relative w-full aspect-16/10 bg-[#063D5B] border-b-2 border-[#156D95] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#063D5B]/90 backdrop-blur-xs text-[#ABCDE9] border border-[#156D95] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    Project {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content Under Image */}
                <div className="p-6">
                  {/* Category Pill */}
                  <div className="mb-2.5">
                    <span className="inline-block font-bold text-xs text-[#063D5B] bg-[#ABCDE9] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  {/* Project Description */}
                  <p className="mt-2.5 text-sm text-[#EFF7FD]/95 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-[#156D95]/70 my-5" />

                  {/* What Was Done Section */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#DCEBFA] flex items-center gap-1.5 mb-3">
                      <span>What was done in this project:</span>
                    </h4>
                    <ul className="space-y-2">
                      {item.whatWasDone.map((step, stepIndex) => (
                        <li
                          key={stepIndex}
                          className="flex items-start gap-2.5 text-xs text-[#EFF7FD] leading-relaxed"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#ABCDE9] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Social Presence Links (Instagram & Facebook) */}
        <div className="mt-16 pt-12 border-t-2 border-[#62A1C2]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#063D5B] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#156D95]">
            <div>
              <h3 className="text-lg font-bold text-white">
                Follow Water Cycle on Social Media
              </h3>
              <p className="mt-1 text-sm text-[#ABCDE9]">
                See updates and connect with Water Cycle ({COMPANY_CONTACT.location}) on Instagram and Facebook.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={COMPANY_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-[#063D5B] bg-[#ABCDE9] hover:bg-[#C6E0F5] rounded-full transition-colors whitespace-nowrap"
              >
                <span>Instagram ({COMPANY_CONTACT.instagramHandle})</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <a
                href={COMPANY_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#156D95] hover:bg-[#62A1C2] border border-[#ABCDE9]/40 rounded-full transition-colors whitespace-nowrap"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
