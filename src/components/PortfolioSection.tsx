import React, { useState } from 'react';
import {
  Camera,
  ExternalLink,
  Sun,
  Droplets,
  Filter,
  Waves,
  Sparkles,
} from 'lucide-react';
import {
  PORTFOLIO_ITEMS,
  PortfolioCategory,
  PortfolioItem,
  filterPortfolioItems,
  COMPANY_CONTACT,
} from '../utils/waterCycleLogic';

const CATEGORIES: readonly PortfolioCategory[] = [
  'All',
  'Swimming Pool Solutions',
  'Water Treatment & Filtration',
  'Solar Water Heating',
  'Sewage & Wastewater Treatment',
  'Jacuzzi, Sauna & Steam Systems',
] as const;

const PlaceholderGraphic: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const getCategoryIcon = () => {
    if (item.category === 'Solar Water Heating') {
      return <Sun className="w-6 h-6 text-[#063D5B]" aria-hidden="true" />;
    }
    if (item.category === 'Water Treatment & Filtration') {
      return <Filter className="w-6 h-6 text-[#063D5B]" aria-hidden="true" />;
    }
    if (item.category === 'Sewage & Wastewater Treatment') {
      return <Waves className="w-6 h-6 text-[#063D5B]" aria-hidden="true" />;
    }
    if (item.category === 'Jacuzzi, Sauna & Steam Systems') {
      return <Sparkles className="w-6 h-6 text-[#063D5B]" aria-hidden="true" />;
    }
    return <Droplets className="w-6 h-6 text-[#063D5B]" aria-hidden="true" />;
  };

  if (item.imageUrl && !item.isPlaceholder) {
    return (
      <div className="relative w-full aspect-4/3 bg-[#063D5B] border-b-2 border-[#156D95] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover block"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-4/3 bg-gradient-to-br from-[#063D5B] via-[#156D95] to-[#4B89AA] border-b-2 border-[#156D95] flex flex-col items-center justify-center p-6 text-center">
      {/* Subtle Architectural Grid Lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#ABCDE9_1px,transparent_1px),linear-gradient(to_bottom,#ABCDE9_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-[#ABCDE9] border-2 border-[#62A1C2] shadow-sm flex items-center justify-center mb-3">
          {getCategoryIcon()}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#DCEBFA]">
          <Camera className="w-3.5 h-3.5 text-[#ABCDE9]" aria-hidden="true" />
          <span>Project Photo Placeholder</span>
        </div>
      </div>
    </div>
  );
};

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');
  const visibleItems = filterPortfolioItems(PORTFOLIO_ITEMS, activeCategory);

  return (
    <section
      id="our-work"
      aria-labelledby="our-work-heading"
      className="py-20 bg-[#ABCDE9]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Filter */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#063D5B] text-[#ABCDE9] text-xs font-bold tracking-wider uppercase mb-3">
              Project Portfolio
            </span>
            <h2
              id="our-work-heading"
              className="text-2xl sm:text-3xl font-bold text-[#063D5B] tracking-tight text-balance"
            >
              Our Work
            </h2>
            <p className="mt-3 text-base text-[#063D5B]/90 leading-relaxed font-medium">
              Structured gallery ready for approved Water Cycle project photographs across swimming pools, water filtration, solar water heating, wastewater treatment, and wellness systems.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter project gallery by service category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#063D5B] rounded-2xl self-start border border-[#156D95]"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#ABCDE9] text-[#063D5B] shadow-xs'
                      : 'text-[#ABCDE9] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6-Item Portfolio Grid */}
        <div
          data-testid="portfolio-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleItems.map((item) => (
            <article
              key={item.id}
              data-testid={`portfolio-card-${item.id}`}
              className="rounded-2xl border-2 border-[#156D95] bg-[#62A1C2] text-white overflow-hidden flex flex-col justify-between transition-colors hover:border-[#063D5B] shadow-sm"
            >
              <div>
                <PlaceholderGraphic item={item} />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#DCEBFA] mb-2">
                    <span className="font-bold text-[#063D5B] bg-[#ABCDE9] px-2.5 py-0.5 rounded-full">
                      {item.categoryLabel}
                    </span>
                    {item.isPlaceholder && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Replace in siteContent.ts</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#EFF7FD] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Social Presence Links (Instagram & Facebook from PDF) */}
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
