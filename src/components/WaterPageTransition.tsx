import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageRoute } from '../utils/waterCycleLogic';

interface WaterPageTransitionProps {
  routeKey: PageRoute;
  children: React.ReactNode;
}

/**
 * Wraps page content in a smooth watery flow transition when navigating between pages:
 * 1) A translucent multi-layered water wave crest sweeps across the screen.
 * 2) The incoming page flows in with a gentle liquid wave ripple that decays to 0
 *    and detaches completely so the settled page is 100% crisp and stable.
 */
export const WaterPageTransition: React.FC<WaterPageTransitionProps> = ({
  routeKey,
  children,
}) => {
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const [isFlowing, setIsFlowing] = useState(false);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip full page wave overlay on initial site load so the Hero logo intro takes center stage
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setIsFlowing(true);
    let rafId: number;
    const start = performance.now();
    const durationMs = 680;

    const animateWaterFlow = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start) / durationMs));
      // Smooth sine bell curve that peaks early and settles cleanly to 0
      const waveEnvelope = Math.sin(progress * Math.PI) * (1 - progress * 0.45);
      const scale = 24 * waveEnvelope;

      if (dispRef.current) {
        dispRef.current.setAttribute('scale', scale.toFixed(2));
      }
      if (turbRef.current) {
        const freqX = 0.012 + Math.sin(progress * Math.PI * 2) * 0.004;
        const freqY = 0.028 + Math.cos(progress * Math.PI * 2) * 0.008;
        turbRef.current.setAttribute(
          'baseFrequency',
          `${freqX.toFixed(4)} ${freqY.toFixed(4)}`
        );
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(animateWaterFlow);
      } else {
        if (dispRef.current) {
          dispRef.current.setAttribute('scale', '0');
        }
        setIsFlowing(false);
      }
    };

    rafId = requestAnimationFrame(animateWaterFlow);
    return () => cancelAnimationFrame(rafId);
  }, [routeKey]);

  return (
    <div className="relative flex-1 flex flex-col overflow-x-clip">
      {/* Real-time SVG Liquid Ripple Filter applied only during the watery page transition */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter
            id="page-water-flow-filter"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0.012 0.028"
              numOctaves="2"
              seed="11"
              result="pageFlowNoise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="pageFlowNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Translucent Multi-Layered Water Wave Sweep Overlay during Page Navigation */}
      <AnimatePresence>
        {isFlowing && (
          <motion.div
            key={`wave-crest-${routeKey}`}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.92, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, times: [0, 0.38, 1], ease: 'easeInOut' }}
            className="fixed inset-0 z-30 pointer-events-none overflow-hidden"
          >
            {/* Flowing Water Current Curtain */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: ['100%', '-8%', '-115%'] }}
              transition={{
                duration: 0.72,
                times: [0, 0.44, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-0 -top-28 -bottom-28 flex flex-col justify-between"
            >
              {/* Leading Top Wave Crest SVG */}
              <svg
                viewBox="0 0 1440 180"
                preserveAspectRatio="none"
                className="w-full h-28 sm:h-36 shrink-0"
              >
                <path
                  d="M0,128 C240,32 480,176 720,96 C960,16 1200,152 1440,72 L1440,180 L0,180 Z"
                  fill="rgba(220, 235, 250, 0.55)"
                />
                <path
                  d="M0,144 C320,64 620,180 940,88 C1180,24 1320,136 1440,96 L1440,180 L0,180 Z"
                  fill="rgba(98, 161, 194, 0.42)"
                />
                <path
                  d="M0,128 C240,32 480,176 720,96 C960,16 1200,152 1440,72"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.85)"
                  strokeWidth="3.5"
                />
              </svg>

              {/* Translucent Shimmering Water Body */}
              <div
                className="flex-1 w-full"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(98,161,194,0.42) 0%, rgba(171,205,233,0.48) 50%, rgba(21,109,149,0.34) 100%)',
                }}
              />

              {/* Trailing Bottom Wave Crest SVG */}
              <svg
                viewBox="0 0 1440 180"
                preserveAspectRatio="none"
                className="w-full h-28 sm:h-36 shrink-0"
              >
                <path
                  d="M0,0 L1440,0 L1440,84 C1160,168 880,16 580,108 C320,184 140,48 0,112 Z"
                  fill="rgba(21, 109, 149, 0.34)"
                />
                <path
                  d="M0,84 C280,164 560,24 860,104 C1140,178 1300,52 1440,96"
                  fill="none"
                  stroke="rgba(235, 248, 255, 0.75)"
                  strokeWidth="2.5"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Incoming Page with Watery Current Motion & Decaying Liquid Ripple */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={routeKey}
          initial={{ opacity: 0, y: 22, scale: 0.992 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.995 }}
          transition={{
            duration: 0.46,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            filter: isFlowing ? 'url(#page-water-flow-filter)' : 'none',
          }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
