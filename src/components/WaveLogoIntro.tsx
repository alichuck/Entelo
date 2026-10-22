import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { getAssetUrl } from '../utils/waterCycleLogic';

export type LogoIntroPhase = 'fullscreen-wave' | 'settled-with-descriptions';

interface HeroSeaWaveLogoProps {
  phase: LogoIntroPhase;
  onReplay?: () => void;
}

interface WaterStreamParticle {
  angle: number;
  angularVelocity: number;
  baseRadius: number;
  radiusOffset: number;
  size: number;
  alpha: number;
  isHighlight: boolean;
  phaseOffset: number;
}

/**
 * Realistic full-screen-to-hero Water Cycle logo animation:
 * 1. Starts on the whole screen while the 3D water wave rotates in a fluid vortex.
 * 2. During the rotation of the wave, the "WATER CYCLE" word is progressively created
 *    out of the churning water.
 * 3. Both the word "WATER CYCLE" and the water splash ring around it remain continuously
 *    wavy with real-time liquid water physics after the descriptions appear.
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

  // Continuous 60fps liquid water physics driving BOTH the creation turbulence
  // and the ongoing wavy motion of "WATER CYCLE" + the water splash ring around it
  useEffect(() => {
    let rafId: number;
    const startTime = performance.now();
    const creationDuration = 2200; // ms for the wave rotation to create the logo

    const animateWaterPhysics = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / creationDuration);
      const timeSec = elapsed / 1000;

      // Ease out from high liquid wave distortion (54) down to a continuous living water wave (7.5)
      const easeOut = 1 - Math.pow(1 - t, 3);
      const continuousTextWave = 6.5 + Math.sin(timeSec * 2.6) * 2.2;
      const continuousRingWave = 8.5 + Math.cos(timeSec * 2.2) * 3.0;

      const currentTextScale =
        52 * (1 - easeOut) + continuousTextWave * easeOut;
      const currentRingScale =
        44 * (1 - easeOut) + continuousRingWave * easeOut;

      if (textDispRef.current) {
        textDispRef.current.setAttribute('scale', currentTextScale.toFixed(2));
      }
      if (ringDispRef.current) {
        ringDispRef.current.setAttribute('scale', currentRingScale.toFixed(2));
      }

      // Gently oscillate turbulence frequencies so the water & letters undulate like a real wave
      const freqX = 0.012 + Math.sin(timeSec * 1.7) * 0.003;
      const freqY = 0.032 + Math.cos(timeSec * 1.4) * 0.006;
      if (textTurbRef.current) {
        textTurbRef.current.setAttribute(
          'baseFrequency',
          `${freqX.toFixed(4)} ${freqY.toFixed(4)}`
        );
      }
      if (ringTurbRef.current) {
        const rFreqX = 0.015 + Math.cos(timeSec * 1.5) * 0.0035;
        const rFreqY = 0.028 + Math.sin(timeSec * 1.8) * 0.005;
        ringTurbRef.current.setAttribute(
          'baseFrequency',
          `${rFreqX.toFixed(4)} ${rFreqY.toFixed(4)}`
        );
      }

      rafId = requestAnimationFrame(animateWaterPhysics);
    };

    rafId = requestAnimationFrame(animateWaterPhysics);
    return () => cancelAnimationFrame(rafId);
  }, [runId]);

  // Realistic HTML5 Canvas water stream ribbons, foam arcs & 320 water droplets
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 831;
    const height = 476;
    canvas.width = width;
    canvas.height = height;

    // Exact center of the circular water splash ring in the 831x476 logo coordinate space
    const cx = 562;
    const cy = 238;
    const ringRadius = 192;

    const particles: WaterStreamParticle[] = Array.from({ length: 300 }, (_, i) => {
      const angle = (i / 300) * Math.PI * 2;
      return {
        angle,
        angularVelocity: 0.025 + (i % 7) * 0.004,
        baseRadius: ringRadius + ((i % 11) - 5) * 6.5,
        radiusOffset: (Math.random() - 0.5) * 28,
        size: 1.1 + (i % 5) * 0.65,
        alpha: 0.35 + (i % 4) * 0.16,
        isHighlight: i % 3 === 0,
        phaseOffset: i * 0.23,
      };
    });

    let animId: number;
    const start = performance.now();

    const drawWaterVortex = (now: number) => {
      const elapsedSec = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Rotational progress during the first 2.2s, then gentle ongoing water circulation
      const isIntro = elapsedSec < 2.2;
      const introProgress = Math.min(1, elapsedSec / 2.2);
      const speedMultiplier = isIntro ? 1.85 * (1 - introProgress * 0.65) : 0.32;

      // 1. Draw flowing liquid water stream ribbons along the rotating wave arc
      const ribbonCount = 3;
      for (let r = 0; r < ribbonCount; r++) {
        const startAngle =
          elapsedSec * (2.4 - r * 0.35) + r * ((Math.PI * 2) / ribbonCount);
        const arcLength = isIntro ? Math.PI * 1.35 : Math.PI * 0.85;
        const rad = ringRadius + (r - 1) * 11 + Math.sin(elapsedSec * 3 + r) * 5;

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, rad, startAngle, startAngle + arcLength);
        ctx.strokeStyle =
          r === 0
            ? `rgba(255, 255, 255, ${isIntro ? 0.55 : 0.22})`
            : r === 1
            ? `rgba(98, 161, 194, ${isIntro ? 0.5 : 0.2})`
            : `rgba(21, 109, 149, ${isIntro ? 0.45 : 0.16})`;
        ctx.lineWidth = isIntro ? 6 - r * 1.5 : 3 - r * 0.7;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw horizontal water wave stream sweeping through "WATER CYCLE" as the wave rotates
      if (elapsedSec > 0.2 && elapsedSec < 2.1) {
        const wordProgress = Math.min(1, (elapsedSec - 0.2) / 1.45);
        const waveHeadX = 20 + wordProgress * 640;
        const waveGrad = ctx.createLinearGradient(
          Math.max(0, waveHeadX - 240),
          240,
          waveHeadX + 40,
          240
        );
        waveGrad.addColorStop(0, 'rgba(171, 205, 233, 0)');
        waveGrad.addColorStop(0.5, 'rgba(21, 109, 149, 0.38)');
        waveGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0.85)');
        waveGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(Math.max(10, waveHeadX - 220), 238);
        for (let x = Math.max(10, waveHeadX - 220); x <= waveHeadX + 25; x += 12) {
          const wy =
            238 +
            Math.sin(x * 0.045 - elapsedSec * 9) * 18 * (1 - wordProgress * 0.4);
          ctx.lineTo(x, wy);
        }
        ctx.strokeStyle = waveGrad;
        ctx.lineWidth = 14 * (1 - wordProgress * 0.5);
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      // 3. Draw swirling water droplets & fine spray mist around the wave ring
      const mistIntensity = isIntro ? 0.95 : 0.42;
      for (const p of particles) {
        p.angle += p.angularVelocity * speedMultiplier;
        const dynamicRadius =
          p.baseRadius +
          Math.sin(elapsedSec * 2.8 + p.phaseOffset) * 9 +
          p.radiusOffset * (isIntro ? 1.15 : 0.65);

        const px = cx + Math.cos(p.angle) * dynamicRadius;
        const py = cy + Math.sin(p.angle) * dynamicRadius;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        const a = p.alpha * mistIntensity;
        ctx.fillStyle = p.isHighlight
          ? `rgba(255, 255, 255, ${a})`
          : `rgba(6, 61, 91, ${a * 0.55})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(drawWaterVortex);
    };

    animId = requestAnimationFrame(drawWaterVortex);
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
      title="Click to replay the full-screen water wave logo animation"
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
      {/* Dual Real-Time SVG Liquid Filters:
          1) #wavy-water-word-filter keeps "WATER CYCLE" undulating with the water around it
          2) #wavy-water-ring-filter keeps the 3D water splash ring rippling continuously */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="wavy-water-word-filter" x="-20%" y="-30%" width="140%" height="160%">
            <feTurbulence
              ref={textTurbRef}
              type="turbulence"
              baseFrequency="0.012 0.032"
              numOctaves="2"
              seed="8"
              result="wordWaveNoise"
            />
            <feDisplacementMap
              ref={textDispRef}
              in="SourceGraphic"
              in2="wordWaveNoise"
              scale="48"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="wavy-water-ring-filter" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              ref={ringTurbRef}
              type="turbulence"
              baseFrequency="0.015 0.028"
              numOctaves="3"
              seed="14"
              result="ringWaveNoise"
            />
            <feDisplacementMap
              ref={ringDispRef}
              in="SourceGraphic"
              in2="ringWaveNoise"
              scale="44"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Borderless Aspect-Locked 831x476 Stage Matching the Exact Logo Proportions */}
      <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[650px] aspect-[831/476]">
        {/* LAYER 1: "WATER CYCLE" WORD CREATED DURING THE ROTATION OF THE WAVE
            Synchronized clip-path + wave distortion so each letter forms as the wave rotates! */}
        <motion.div
          initial={{
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0,
            x: -18,
          }}
          animate={{
            clipPath: [
              'inset(0 100% 0 0)',
              'inset(0 62% 0 0)',
              'inset(0 18% 0 0)',
              'inset(0 0% 0 0)',
            ],
            opacity: [0, 0.85, 1, 1],
            x: [-18, -6, 2, 0],
          }}
          transition={{
            duration: 1.85,
            times: [0, 0.32, 0.72, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        >
          {/* Continuous buoyant wave bobbing on the WATER CYCLE word */}
          <motion.img
            src={getAssetUrl('/water-cycle-text.png')}
            alt="Water Cycle"
            animate={{
              y: [0, -3.5, 0, 3.5, 0],
              rotate: [0, -0.45, 0, 0.45, 0],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              filter:
                'url(#wavy-water-word-filter) drop-shadow(0 0 16px rgba(255,255,255,0.92)) drop-shadow(0 2px 8px rgba(220,235,250,0.85))',
            }}
            className="w-full h-full object-contain block"
          />
        </motion.div>

        {/* LAYER 2: REALISTIC 3D WATER WAVE RING ROTATING & SPLASHING AROUND "WATER CYCLE" */}
        {/* Secondary trailing water splash wave for realistic multi-layered fluid depth */}
        <motion.img
          src={getAssetUrl('/water-cycle-ring.png')}
          alt=""
          aria-hidden="true"
          initial={{
            rotate: -260,
            scale: 0.68,
            opacity: 0,
          }}
          animate={{
            rotate: [-260, -85, 12, 0],
            scale: [0.68, 1.08, 0.97, 1],
            opacity: [0, 0.65, 0.45, 0.28],
          }}
          transition={{
            duration: 2.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: '67.6% 50%',
            filter: 'url(#wavy-water-ring-filter) brightness(1.25)',
          }}
          className="absolute inset-0 w-full h-full object-contain block pointer-events-none z-15"
        />

        {/* Primary 3D Water Wave Ring rotating from -210deg -> 0deg while creating the word */}
        <motion.img
          src={getAssetUrl('/water-cycle-ring.png')}
          alt=""
          aria-hidden="true"
          initial={{
            rotate: -210,
            scale: 0.74,
            opacity: 0,
          }}
          animate={{
            rotate: [-210, -45, 6, 0],
            scale: [0.74, 1.04, 0.99, 1],
            opacity: [0, 1, 1, 1],
          }}
          transition={{
            duration: 1.95,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: '67.6% 50%',
            filter:
              'url(#wavy-water-ring-filter) drop-shadow(0 0 12px rgba(255,255,255,0.55))',
          }}
          className="absolute inset-0 w-full h-full object-contain block pointer-events-none z-20"
        />

        {/* LAYER 3: HTML5 CANVAS REALISTIC WATER STREAMS & DROPLET SPRAY */}
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
      {/* Subtle Continuous Liquid Wave Filter for Upper-Left Logo */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="navbar-wavy-logo-filter" x="-15%" y="-20%" width="130%" height="140%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.015 0.042"
              numOctaves="2"
              seed="4"
              result="navWaveNoise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.014 0.038;0.020 0.052;0.014 0.038"
                dur="3.4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="navWaveNoise"
              scale="3.6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.img
        src={getAssetUrl('/water-cycle-logo.png')}
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
            'url(#navbar-wavy-logo-filter) drop-shadow(0 0 8px rgba(220, 235, 250, 0.75))',
        }}
        className="h-12 sm:h-14 md:h-16 w-auto object-contain block"
      />
    </div>
  );
};
