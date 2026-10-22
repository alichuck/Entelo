import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal, Info } from 'lucide-react';
import {
  BEFORE_AFTER_CONFIG,
  computeBeforeAfterState,
} from '../utils/waterCycleLogic';
import { BeforeDirtyPoolScene, AfterCleanPoolScene } from './PoolVisuals';

export const BeforeAfterSection: React.FC = () => {
  const [sliderPercent, setSliderPercent] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const sliderState = computeBeforeAfterState(sliderPercent);

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0) return;
    const relativeX = clientX - rect.left;
    const rawPercent = (relativeX / rect.width) * 100;
    const nextState = computeBeforeAfterState(rawPercent);
    setSliderPercent(nextState.clampedPercentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPercent((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPercent((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-heading"
      className="py-20 bg-[#62A1C2] text-white border-b-4 border-[#156D95]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold tracking-wider uppercase mb-3">
              Before &amp; After Comparison
            </span>
            <h2
              id="before-after-heading"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance"
            >
              {BEFORE_AFTER_CONFIG.sectionTitle}
            </h2>
            <p className="mt-3 text-base text-[#EFF7FD] leading-relaxed">
              {BEFORE_AFTER_CONFIG.sectionSubtitle}
            </p>
          </div>

          {/* Interactive Quick Position Controls */}
          <div
            role="group"
            aria-label="Comparison slider position presets"
            className="flex items-center gap-1 p-1.5 bg-[#063D5B] rounded-full self-start md:self-auto shrink-0 border border-[#156D95]"
          >
            <button
              type="button"
              onClick={() => setSliderPercent(85)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sliderState.clampedPercentage >= 75
                  ? 'bg-[#ABCDE9] text-[#063D5B] shadow-xs'
                  : 'text-[#ABCDE9] hover:text-white'
              }`}
            >
              Focus Before
            </button>
            <button
              type="button"
              onClick={() => setSliderPercent(50)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sliderState.clampedPercentage > 25 && sliderState.clampedPercentage < 75
                  ? 'bg-[#ABCDE9] text-[#063D5B] shadow-xs'
                  : 'text-[#ABCDE9] hover:text-white'
              }`}
            >
              50 / 50 Split
            </button>
            <button
              type="button"
              onClick={() => setSliderPercent(15)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sliderState.clampedPercentage <= 25
                  ? 'bg-[#ABCDE9] text-[#063D5B] shadow-xs'
                  : 'text-[#ABCDE9] hover:text-white'
              }`}
            >
              Focus After
            </button>
          </div>
        </div>

        {/* Horizontal Comparison Viewport Sized to Native 1024x654 Resolution Without Scaling In */}
        <div
          ref={containerRef}
          tabIndex={0}
          role="slider"
          aria-label="Before and after pool water comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderState.clampedPercentage)}
          data-testid="before-after-container"
          data-left-state={sliderState.leftSidePoolState}
          data-right-state={sliderState.rightSidePoolState}
          data-slider-percent={sliderState.clampedPercentage}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          className="relative w-full max-w-[920px] mx-auto aspect-[1024/654] rounded-2xl overflow-hidden border-4 border-[#156D95] shadow-xl cursor-ew-resize touch-none select-none bg-[#063D5B] focus:outline-none focus:ring-2 focus:ring-[#ABCDE9]"
        >
          {/* BASE LAYER (RIGHT SIDE): AFTER — Clean, Clear Blue Pool */}
          <div
            data-testid="after-clean-layer"
            className="absolute inset-0 w-full h-full"
          >
            {BEFORE_AFTER_CONFIG.useRealPhotos ? (
              <img
                src={BEFORE_AFTER_CONFIG.afterImagePath}
                alt="After water treatment: clear blue swimming pool"
                draggable={false}
                className="w-full h-full object-contain block select-none pointer-events-none"
              />
            ) : (
              <AfterCleanPoolScene />
            )}
          </div>

          {/* CLIPPED OVERLAY LAYER (LEFT SIDE): BEFORE — Dirty, Green Pool */}
          <div
            data-testid="before-dirty-layer"
            style={{ clipPath: sliderState.beforeOverlayClipPath }}
            className="absolute inset-0 w-full h-full"
          >
            {BEFORE_AFTER_CONFIG.useRealPhotos ? (
              <img
                src={BEFORE_AFTER_CONFIG.beforeImagePath}
                alt="Before water treatment: dirty algae-green swimming pool"
                draggable={false}
                className="w-full h-full object-contain block select-none pointer-events-none"
              />
            ) : (
              <BeforeDirtyPoolScene />
            )}
          </div>

          {/* Persistent Left Side Label: BEFORE (Dirty / Green Pool) */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <div
              data-testid="label-before-side"
              className="bg-[#063D5B]/90 backdrop-blur-xs text-white px-3.5 py-2 rounded-xl border border-[#ABCDE9]/30 shadow-xs"
            >
              <span className="block text-xs font-bold tracking-wider text-lime-300">
                {sliderState.leftSideLabel}
              </span>
              <span className="block text-xs text-[#DCEBFA] mt-0.5">
                Dirty / Algae-Green Pool
              </span>
            </div>
          </div>

          {/* Persistent Right Side Label: AFTER (Clean / Blue Pool) */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none text-right">
            <div
              data-testid="label-after-side"
              className="bg-[#063D5B]/90 backdrop-blur-xs text-white px-3.5 py-2 rounded-xl border border-[#ABCDE9]/30 shadow-xs"
            >
              <span className="block text-xs font-bold tracking-wider text-[#ABCDE9]">
                {sliderState.rightSideLabel}
              </span>
              <span className="block text-xs text-[#DCEBFA] mt-0.5">
                Clear Blue Pool
              </span>
            </div>
          </div>

          {/* Clearly Labeled Illustrative Demo State Notice (when real photos are not yet supplied) */}
          {!BEFORE_AFTER_CONFIG.useRealPhotos && (
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-10 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#063D5B]/90 border border-[#ABCDE9]/30 text-[11px] text-[#DCEBFA]">
                <Info className="w-3.5 h-3.5 text-[#ABCDE9] shrink-0" aria-hidden="true" />
                <span>
                  Illustrative Demo Visualization (replace with{' '}
                  <code className="text-white">/images/pool-before.webp</code> &amp;{' '}
                  <code className="text-white">/images/pool-after.webp</code>)
                </span>
              </div>
            </div>
          )}

          {/* Vertical Divider Line & Drag Handle */}
          <div
            style={{ left: `${sliderState.clampedPercentage}%` }}
            className="absolute top-0 bottom-0 w-1 bg-[#ABCDE9] shadow-[0_0_12px_rgba(6,61,91,0.65)] z-20 pointer-events-none"
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#ABCDE9] text-[#063D5B] shadow-md border-2 border-[#063D5B] flex items-center justify-center">
              <MoveHorizontal className="w-5 h-5 text-[#063D5B]" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Accessible Range Input Control Below Viewport */}
        <div className="mt-5 max-w-[920px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#063D5B] text-[#ABCDE9] px-5 py-3.5 rounded-2xl border-2 border-[#156D95]">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-white">BEFORE (Left):</span>
            <span>Dirty / green pool</span>
            <span aria-hidden="true" className="text-[#62A1C2]">·</span>
            <span className="font-bold text-white">AFTER (Right):</span>
            <span>Clear blue pool</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-72">
            <label
              htmlFor="pool-comparison-range"
              className="text-xs font-semibold text-white whitespace-nowrap shrink-0"
            >
              Slide to compare
            </label>
            <input
              id="pool-comparison-range"
              type="range"
              min={0}
              max={100}
              step={1}
              value={sliderState.clampedPercentage}
              onChange={(e) => setSliderPercent(Number(e.target.value))}
              aria-label="Before and after pool water comparison slider"
              className="w-full h-2 bg-[#156D95] rounded-lg appearance-none cursor-pointer accent-[#ABCDE9]"
            />
            <span className="text-xs font-mono tabular-nums text-white font-bold w-9 text-right shrink-0">
              {Math.round(sliderState.clampedPercentage)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
