import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export type LogoIntroPhase = 'fullscreen-wave' | 'settled-with-descriptions';

interface HeroSeaWaveLogoProps {
  phase: LogoIntroPhase;
  onReplay?: () => void;
}

interface LiquidStrandParticle {
  side: -1 | 1;
  spread: number;
  omega: number;
  sphereFactor: number;
  seed: number;
  delay: number;
  burstAngle: number;
  isSpecular: boolean;
  targetX: number;
  targetY: number;
  prevX: number;
  prevY: number;
  hasPrev: boolean;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const liquidWaveNoise = (theta: number, t: number, seed: number) =>
  0.52 * Math.sin(3 * theta + 2.1 * t + seed) +
  0.31 * Math.sin(5 * theta - 2.7 * t + seed * 1.9) +
  0.17 * Math.sin(9 * theta + 3.6 * t + seed * 3.3);

/**
 * Recreates the exact 3-stage sequence from `Water logo animation - After effects.mp4`
 * tailored for the borderless Water Cycle logo on the Home page:
 *
 * - Stage 1 (0.0s – 1.0s): Volumetric top light rays shine down while a bright water
 *   splash forms at 12 o'clock and arcs down both sides (-90deg -> +90deg) to close a
 *   glossy circular water ring.
 * - Stage 2 (0.9s – 2.1s): The water ring erupts into a churning 3D liquid splash sphere
 *   with bright specular caustic ribbons and fine water droplets.
 * - Stage 3 (1.6s – 2.85s): The churning liquid water condenses and solidifies into the
 *   crisp, completely stable, non-blurry "WATER CYCLE" word and 3D water ring.
 */
export const HeroSeaWaveLogo: React.FC<HeroSeaWaveLogoProps> = ({
  phase,
  onReplay,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textDispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const ringDispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const textTurbRef = useRef<SVGFETurbulenceElement | null>(null);
  const ringTurbRef = useRef<SVGFETurbulenceElement | null>(null);
  const [runId, setRunId] = useState(0);
  const [isSettled, setIsSettled] = useState(false);

  // Real-time 60fps SVG liquid-glass refraction driving the solidification of the logo
  // from the churning water splash into the final crisp, stable "WATER CYCLE" logo
  useEffect(() => {
    setIsSettled(false);
    let rafId: number;
    const startTime = performance.now();

    const animateLiquidRefraction = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;

      // Solidification window: 1.45s -> 2.80s (matches Stage 3 of the After Effects video)
      const solidifyProgress = clamp01((elapsedSec - 1.45) / 1.35);
      const easeSolid = easeOutCubic(solidifyProgress);

      // Starts at high liquid splash distortion (68) and decays all the way to 0 (completely crisp & stable)
      const currentTextScale = 68 * (1 - easeSolid);
      const currentRingScale = 62 * (1 - easeSolid);

      if (textDispRef.current) {
        textDispRef.current.setAttribute('scale', currentTextScale.toFixed(2));
      }
      if (ringDispRef.current) {
        ringDispRef.current.setAttribute('scale', currentRingScale.toFixed(2));
      }

      const freqX = 0.013 + Math.sin(elapsedSec * 1.8) * 0.003 * (1 - easeSolid);
      const freqY = 0.034 + Math.cos(elapsedSec * 1.5) * 0.006 * (1 - easeSolid);
      if (textTurbRef.current) {
        textTurbRef.current.setAttribute(
          'baseFrequency',
          `${freqX.toFixed(4)} ${freqY.toFixed(4)}`
        );
      }
      if (ringTurbRef.current) {
        const rFreqX = 0.016 + Math.cos(elapsedSec * 1.6) * 0.0035 * (1 - easeSolid);
        const rFreqY = 0.029 + Math.sin(elapsedSec * 1.9) * 0.005 * (1 - easeSolid);
        ringTurbRef.current.setAttribute(
          'baseFrequency',
          `${rFreqX.toFixed(4)} ${rFreqY.toFixed(4)}`
        );
      }

      if (solidifyProgress < 1) {
        rafId = requestAnimationFrame(animateLiquidRefraction);
      } else {
        // Detach SVG displacement filters completely once settled so browser renders native crisp PNGs
        setIsSettled(true);
      }
    };

    rafId = requestAnimationFrame(animateLiquidRefraction);
    return () => cancelAnimationFrame(rafId);
  }, [runId]);

  // HTML5 Canvas 3-Stage After Effects Water Splash Simulation:
  // 1) Top light rays + dual downward water arcs forming the ring
  // 2) Churning 3D turbulent water splash sphere with bright caustic highlights
  // 3) Streams converging into the "WATER CYCLE" word & water ring and fading out cleanly
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 831;
    const height = 476;
    canvas.width = width;
    canvas.height = height;

    // Center of the circular water ring in the 831x476 logo coordinate space
    const cx = 562;
    const cy = 238;
    const ringRadius = 190;

    // Create 900 coherent liquid strand particles that form glossy water ribbons
    const strandCount = 38;
    const strandSpheres = Array.from(
      { length: strandCount },
      () => 0.18 + Math.random() * 0.86
    );

    const particles: LiquidStrandParticle[] = Array.from(
      { length: 900 },
      (_, i) => {
        const strand = i % strandCount;
        // Distribute morph targets across both the circular water ring and the "WATER CYCLE" word
        const isWordTarget = i % 3 === 0;
        const wordX = 28 + ((i * 17) % 605);
        const wordY = 236 + (((i * 29) % 54) - 27);
        const ringAngle = ((i * 13) % 360) * (Math.PI / 180);
        const ringTargetR = ringRadius + (((i * 7) % 26) - 13);

        return {
          side: i % 2 === 0 ? 1 : -1,
          spread: Math.pow((i % 90) / 90, 0.85),
          omega: 1.85 + (strand % 7) * 0.14,
          sphereFactor: strandSpheres[strand] + ((i % 5) - 2) * 0.02,
          seed: strand * 0.71 + (i % 11) * 0.04,
          delay: (i % 45) / 45,
          burstAngle: (i / 900) * Math.PI * 2,
          isSpecular: i % 4 === 0,
          targetX: isWordTarget
            ? wordX
            : cx + Math.cos(ringAngle) * ringTargetR,
          targetY: isWordTarget
            ? wordY
            : cy + Math.sin(ringAngle) * ringTargetR,
          prevX: 0,
          prevY: 0,
          hasPrev: false,
        };
      }
    );

    let animId: number;
    const start = performance.now();

    const renderAfterEffectsWater = (now: number) => {
      const t = (now - start) / 1000;

      ctx.clearRect(0, 0, width, height);

      // Phase progress values matching `Water logo animation - After effects.mp4`
      const raysIn = easeOutCubic(clamp01(t / 0.7));
      const raysFade = 1 - easeInOutCubic(clamp01((t - 2.1) / 0.75));
      const arcSpawn = easeOutCubic(clamp01((t - 0.1) / 1.05));
      const turbulence = easeInOutCubic(clamp01((t - 0.85) / 1.15));
      const morphToLogo = easeInOutCubic(clamp01((t - 1.65) / 1.05));
      const splashFadeOut = 1 - easeInOutCubic(clamp01((t - 2.15) / 0.7));

      // 1. Draw volumetric top light rays shining down onto the water splash
      const rayAlpha = raysIn * raysFade;
      if (rayAlpha > 0.01) {
        ctx.save();
        const rayAngles = [-0.34, -0.16, 0, 0.17, 0.35];
        for (let r = 0; r < rayAngles.length; r++) {
          const angle = rayAngles[r] + Math.sin(t * 1.8 + r) * 0.02;
          const topX = cx + (r - 2) * 14;
          const topY = 0;
          const beamLen = 380;
          const bottomX = topX + Math.sin(angle) * beamLen;
          const bottomY = topY + Math.cos(angle) * beamLen;

          const grad = ctx.createLinearGradient(topX, topY, bottomX, bottomY);
          const centerBoost = r === 2 ? 0.34 : 0.22;
          grad.addColorStop(
            0,
            `rgba(235, 250, 255, ${(centerBoost * rayAlpha).toFixed(3)})`
          );
          grad.addColorStop(
            0.55,
            `rgba(171, 205, 233, ${(centerBoost * 0.45 * rayAlpha).toFixed(3)})`
          );
          grad.addColorStop(1, 'rgba(171, 205, 233, 0)');

          ctx.beginPath();
          ctx.moveTo(topX - 12, topY);
          ctx.lineTo(topX + 12, topY);
          ctx.lineTo(bottomX + 68, bottomY);
          ctx.lineTo(bottomX - 68, bottomY);
          ctx.closePath();
          ctx.fillStyle = grad;
          ctx.fill();
        }
        ctx.restore();
      }

      // 2. Draw the initial crown splash highlight at 12 o'clock under the light beam
      if (t > 0.08 && t < 2.2) {
        const crownIntensity =
          clamp01((t - 0.08) / 0.35) * (1 - clamp01((t - 1.55) / 0.65));
        const crownGrad = ctx.createRadialGradient(
          cx,
          cy - ringRadius * (1 - turbulence * 0.25),
          2,
          cx,
          cy - ringRadius * (1 - turbulence * 0.25),
          64
        );
        crownGrad.addColorStop(
          0,
          `rgba(255, 255, 255, ${(0.85 * crownIntensity).toFixed(3)})`
        );
        crownGrad.addColorStop(
          0.45,
          `rgba(185, 230, 255, ${(0.45 * crownIntensity).toFixed(3)})`
        );
        crownGrad.addColorStop(1, 'rgba(171, 205, 233, 0)');
        ctx.fillStyle = crownGrad;
        ctx.beginPath();
        ctx.arc(
          cx,
          cy - ringRadius * (1 - turbulence * 0.25),
          64,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // 3. Draw the 3D liquid water strands:
      //    - Starts at 12 o'clock (-PI/2) and arcs down left & right to form the ring
      //    - Churns inward into a 3D turbulent water sphere
      //    - Morphs into the "WATER CYCLE" word & circular splash ring
      if (splashFadeOut > 0.01) {
        ctx.save();
        ctx.lineCap = 'round';

        for (const p of particles) {
          const born = clamp01((t - 0.08 - p.delay * 0.42) / 0.28);
          if (born <= 0) continue;

          // Angle starts at -PI/2 (top) and sweeps down both sides as arcSpawn goes 0 -> 1
          let theta =
            -Math.PI / 2 +
            p.side * p.spread * Math.PI * arcSpawn +
            p.omega * Math.max(0, t - 0.35) * (0.45 + 0.55 * turbulence);
          theta += turbulence * 0.65 * Math.sin(t * 2.4 + p.seed * 2.1);

          const n = liquidWaveNoise(theta, t * 1.35, p.seed);
          const rOnRing = ringRadius * (1 + n * (0.05 + 0.22 * turbulence));
          const rInSphere = ringRadius * p.sphereFactor * (1 + n * 0.32);

          // Blend from outer ring into churning 3D sphere during Stage 2
          const sphereBlend = Math.sin(turbulence * Math.PI) * 0.76;
          const radius = rOnRing * (1 - sphereBlend) + rInSphere * sphereBlend;

          let x = cx + Math.cos(theta) * radius;
          let y =
            cy +
            Math.sin(theta) *
              radius *
              (1 - 0.14 * turbulence * Math.sin(t * 1.7 + p.seed));

          // Outward splash droplets under the top light
          const splashBurst = Math.sin(arcSpawn * Math.PI) * 18;
          x += Math.cos(p.burstAngle) * splashBurst;
          y += Math.sin(p.burstAngle) * splashBurst;

          // Stage 3: Converge into the "WATER CYCLE" word & ring targets
          const k = easeInOutCubic(
            clamp01((t - 1.55 - p.delay * 0.35) / 0.85)
          );
          if (k > 0) {
            x += (p.targetX - x) * k;
            y += (p.targetY - y) * k;
          }

          if (p.hasPrev) {
            const dx = x - p.prevX;
            const dy = y - p.prevY;
            if (dx * dx + dy * dy < 6500) {
              const alpha =
                (p.isSpecular ? 0.92 : 0.46) * born * splashFadeOut;
              ctx.strokeStyle = p.isSpecular
                ? `rgba(245, 252, 255, ${alpha.toFixed(3)})`
                : `rgba(135, 208, 242, ${alpha.toFixed(3)})`;
              ctx.lineWidth =
                (p.isSpecular ? 2.4 : 1.3) * (1 - 0.35 * morphToLogo);
              ctx.beginPath();
              ctx.moveTo(p.prevX, p.prevY);
              ctx.lineTo(x, y);
              ctx.stroke();
            }
          }

          p.prevX = x;
          p.prevY = y;
          p.hasPrev = true;
        }
        ctx.restore();
      }

      if (t < 2.95) {
        animId = requestAnimationFrame(renderAfterEffectsWater);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animId = requestAnimationFrame(renderAfterEffectsWater);
    return () => cancelAnimationFrame(animId);
  }, [runId]);

  const handleClick = () => {
    setRunId((prev) => prev + 1);
    if (onReplay) {
      onReplay();
    }
  };

  return (
    <motion.div
      key={runId}
      data-testid="hero-sea-wave-logo"
      data-stage={phase}
      onClick={handleClick}
      role="img"
      aria-label="Water Cycle animated wave logo"
      title="Click to replay the water splash logo animation"
      layout
      initial={{ scale: 1.22 }}
      animate={{
        scale: phase === 'fullscreen-wave' ? 1.22 : 1,
      }}
      transition={{
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full max-w-3xl mx-auto flex items-center justify-center select-none overflow-visible cursor-pointer"
    >
      {/* Dual Real-Time SVG Liquid Filters active ONLY during the splash solidification phase */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="wavy-water-word-filter" x="-25%" y="-35%" width="150%" height="170%">
            <feTurbulence
              ref={textTurbRef}
              type="turbulence"
              baseFrequency="0.013 0.034"
              numOctaves="2"
              seed="8"
              result="wordWaveNoise"
            />
            <feDisplacementMap
              ref={textDispRef}
              in="SourceGraphic"
              in2="wordWaveNoise"
              scale="68"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="wavy-water-ring-filter" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              ref={ringTurbRef}
              type="turbulence"
              baseFrequency="0.016 0.029"
              numOctaves="3"
              seed="14"
              result="ringWaveNoise"
            />
            <feDisplacementMap
              ref={ringDispRef}
              in="SourceGraphic"
              in2="ringWaveNoise"
              scale="62"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Borderless Aspect-Locked 831x476 Stage Matching the Exact Logo Proportions */}
      <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[650px] aspect-[831/476]">
        {/* LAYER 1: "WATER CYCLE" WORD EMERGING & SOLIDIFYING INTO A CRISP, STABLE LOGO */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
          }}
          animate={{
            opacity: [0, 0, 0.85, 1],
            scale: [0.94, 0.96, 1.01, 1],
          }}
          transition={{
            duration: 2.75,
            times: [0, 0.52, 0.8, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        >
          <img
            src="/water-cycle-text.png"
            alt="Water Cycle"
            style={{
              filter: isSettled
                ? 'drop-shadow(0 0 14px rgba(255,255,255,0.92)) drop-shadow(0 2px 8px rgba(220,235,250,0.85))'
                : 'url(#wavy-water-word-filter) drop-shadow(0 0 16px rgba(255,255,255,0.92)) drop-shadow(0 2px 8px rgba(220,235,250,0.85))',
            }}
            className="w-full h-full object-contain block"
          />
        </motion.div>

        {/* LAYER 2: 3D WATER SPLASH RING CONDENSING INTO A CRISP, STABLE RING */}
        <motion.img
          src="/water-cycle-ring.png"
          alt=""
          aria-hidden="true"
          initial={{
            rotate: -120,
            scale: 0.82,
            opacity: 0,
          }}
          animate={{
            rotate: [-120, -42, 3, 0],
            scale: [0.82, 1.04, 0.995, 1],
            opacity: [0, 0.55, 0.96, 1],
          }}
          transition={{
            duration: 2.75,
            times: [0, 0.45, 0.8, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: '67.6% 50%',
            filter: isSettled
              ? 'drop-shadow(0 0 12px rgba(220,245,255,0.65))'
              : 'url(#wavy-water-ring-filter) drop-shadow(0 0 14px rgba(220,245,255,0.65))',
          }}
          className="absolute inset-0 w-full h-full object-contain block pointer-events-none z-20"
        />

        {/* LAYER 3: HTML5 CANVAS AFTER-EFFECTS WATER ARCS, TURBULENT 3D SPLASH & LIGHT RAYS */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30"
        />
      </div>
    </motion.div>
  );
};

/**
 * Upper-left Navbar Logo:
 * Uses the exact transparent Water Cycle logo with NO background/border behind it,
 * sized larger and animated with a subtle continuous liquid wave ripple.
 */
export const NavbarWavyLogo: React.FC = () => {
  return (
    <div className="relative inline-flex items-center select-none">
      {/* Crisp, Low-Distortion Continuous Liquid Wave Filter for Upper-Left Logo */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="navbar-wavy-logo-filter" x="-10%" y="-15%" width="120%" height="130%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.009 0.024"
              numOctaves="1"
              seed="4"
              result="navWaveNoise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.008 0.022;0.012 0.030;0.008 0.022"
                dur="3.6s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="navWaveNoise"
              scale="1.35"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.img
        src="/water-cycle-logo.png"
        alt="Water Cycle"
        animate={{
          y: [0, -1.5, 0, 1.5, 0],
          rotate: [0, -0.4, 0, 0.4, 0],
        }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          filter:
            'url(#navbar-wavy-logo-filter) drop-shadow(0 1px 2.5px rgba(255, 255, 255, 0.65))',
        }}
        className="h-12 sm:h-14 md:h-16 w-auto object-contain block"
      />
    </div>
  );
};
