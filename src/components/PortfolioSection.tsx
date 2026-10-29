import React, { useState, useRef } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  FolderGit2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import {
  PORTFOLIO_ITEMS,
  COMPANY_CONTACT,
  PortfolioItem,
} from '../utils/waterCycleLogic';

const ProjectCard: React.FC<{ item: PortfolioItem; index: number }> = ({
  item,
  index,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const images = item.images && item.images.length > 0
    ? item.images
    : [item.imageUrl];

  const currentStage = item.imageStages?.[activeImageIndex];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || !hasMultipleImages) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 35) {
      nextImage();
    } else if (diff < -35) {
      prevImage();
    }
    touchStartXRef.current = null;
  };

  return (
    <article
      data-testid={`portfolio-card-${item.id}`}
      className="group rounded-2xl border-2 border-[#156D95] bg-[#62A1C2] text-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#063D5B] hover:shadow-xl hover:-translate-y-1"
    >
      <div>
        {/* Project Image Container with Touch Swipe support */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full aspect-16/10 bg-[#063D5B] border-b-2 border-[#156D95] overflow-hidden select-none touch-pan-y"
        >
          <img
            src={images[activeImageIndex]}
            alt={currentStage?.stageLabel || item.title}
            loading="lazy"
            className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-102"
          />

          {/* Project Number Badge */}
          <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-[#063D5B]/90 backdrop-blur-xs text-[#ABCDE9] border border-[#156D95] text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs">
            Project {String(index + 1).padStart(2, '0')}
          </div>

          {/* Location Badge Overlay if present */}
          {item.location && (
            <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 bg-[#063D5B]/90 backdrop-blur-xs text-white border border-[#156D95] text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#ABCDE9]" aria-hidden="true" />
              <span>{item.location}</span>
            </div>
          )}

          {/* Multi-Image Navigation Controls */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous project image"
                className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#063D5B]/85 hover:bg-[#063D5B] text-white border border-[#156D95] flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4 text-[#ABCDE9]" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next project image"
                className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#063D5B]/85 hover:bg-[#063D5B] text-white border border-[#156D95] flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-110"
              >
                <ChevronRight className="w-4 h-4 text-[#ABCDE9]" />
              </button>

              {/* Stage Caption Strip at Bottom of Image */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#063D5B]/95 via-[#063D5B]/75 to-transparent px-3 py-2 pt-6 text-left">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[#ABCDE9]">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#ABCDE9]" />
                    {currentStage?.stageLabel || `Photo ${activeImageIndex + 1} of ${images.length}`}
                  </span>
                  <span className="text-[10px] text-[#DCEBFA]/80">
                    {activeImageIndex + 1} / {images.length}
                  </span>
                </div>
                {currentStage?.caption && (
                  <p className="text-[10px] sm:text-[11px] text-[#EFF7FD] line-clamp-1 mt-0.5 font-normal">
                    {currentStage.caption}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Selector Strip for multi-image projects */}
        {hasMultipleImages && item.imageStages && (
          <div className="bg-[#063D5B] px-2.5 sm:px-3 py-2 border-b-2 border-[#156D95] grid grid-flow-col auto-cols-fr gap-1.5 sm:gap-2">
            {item.imageStages.map((stage, sIdx) => {
              const isActive = sIdx === activeImageIndex;
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => setActiveImageIndex(sIdx)}
                  className={`text-left p-1 rounded-lg border transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#ABCDE9] bg-[#156D95]/60 shadow-xs ring-1 ring-[#ABCDE9]'
                      : 'border-[#156D95]/50 bg-[#063D5B]/40 hover:border-[#ABCDE9]/60'
                  }`}
                >
                  <div className="relative aspect-16/10 rounded overflow-hidden mb-1">
                    <img
                      src={stage.url}
                      alt={stage.stageLabel}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-[#DCEBFA] truncate">
                    {stage.stageLabel.replace(/Stage \d+: /, '')}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Content Under Image */}
        <div className="p-4 sm:p-6">
          {/* Metadata Row: Category & Location */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="inline-block font-bold text-xs text-[#063D5B] bg-[#ABCDE9] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {item.category}
            </span>
            {item.location && (
              <span className="inline-flex items-center gap-1 font-bold text-xs text-white bg-[#063D5B] border border-[#156D95] px-2.5 py-0.5 rounded-full">
                <MapPin className="w-3 h-3 text-[#ABCDE9]" />
                <span>Location: {item.location}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
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
  );
};

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
            Hands-on pool construction, water treatment, and wellness installations completed across Lebanon.
          </p>
        </div>

        {/* Unified Projects Grid */}
        <div
          data-testid="portfolio-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PORTFOLIO_ITEMS.map((item, index) => (
            <ProjectCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Social Presence Links (Instagram, Facebook & TikTok) */}
        <div className="mt-16 pt-12 border-t-2 border-[#62A1C2]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#063D5B] text-white p-5 sm:p-8 rounded-2xl border-2 border-[#156D95]">
            <div>
              <h3 className="text-lg font-bold text-white">
                Follow Water Cycle on Social Media
              </h3>
              <p className="mt-1 text-sm text-[#ABCDE9]">
                See updates and connect with Water Cycle ({COMPANY_CONTACT.location}) on Instagram, Facebook, and TikTok.
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
              <a
                href={COMPANY_CONTACT.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#156D95] hover:bg-[#62A1C2] border border-[#ABCDE9]/40 rounded-full transition-colors whitespace-nowrap"
              >
                <span>TikTok ({COMPANY_CONTACT.tiktokHandle})</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
