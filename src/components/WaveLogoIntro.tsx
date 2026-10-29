import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export type LogoIntroPhase = 'fullscreen-wave' | 'settled-with-descriptions';

interface HeroSeaWaveLogoProps {
  phase: LogoIntroPhase;
  onReplay?: () => void;
}

interface WaterPearl {
  angle: number;
  angularSpeed: number;
  radiusOffset: number;
  size: number;
  alpha: number;
  phaseOffset: number;
}

interface WaterRibbon {
  startAngle: number;
  speed: number;
  arcLength: number;
  radius: number;
  width: number;
  isBright: boolean;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/**
 * Smooth, phone-friendly & desktop-friendly Water Cycle Hero Logo Animation.
 *
 * Keeps the original `/water-cycle-logo.png` 100% intact and razor-sharp while
 * animating a silky-smooth 60fps circular water stream, expanding pool ripples,
 * and floating micro-droplets around the logo's water ring.
 */
export const HeroSeaWaveLogo: React.FC<HeroSeaWaveLogoProps> = ({
  phase,
  onReplay,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pulseStartRef = useRef<number>(performance.now());
  const [replayCount, setReplayCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Logical coordinate system matching the exact 831x476 aspect ratio of water-cycle-logo.png
    const logicalWidth = 831;
    const logicalHeight = 476;

    // Cap DPR at 2 for crisp mobile retina & desktop screens without heavy GPU load
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;

    // Exact center and radius of the circular water splash ring in the 831x476 frame
    const cx = 562;
    const cy = 238;
    const baseRingRadius = 176;

    // 4 smooth, continuous flowing water ribbons that glide around the circular ring
    const ribbons: WaterRibbon[] = [
      {
        startAngle: -Math.PI * 0.65,
        speed: 2.35,
        arcLength: Math.PI * 0.85,
        radius: baseRingRadius - 2,
        width: 7.5,
        isBright: true,
      },
      {
        startAngle: Math.PI * 0.35,
        speed: 2.15,
        arcLength: Math.PI * 0.75,
        radius: baseRingRadius + 6,
        width: 5.5,
        isBright: false,
      },
      {
        startAngle: -Math.PI * 0.15,
        speed: 2.55,
        arcLength: Math.PI * 0.6,
        radius: baseRingRadius - 10,
        width: 4.5,
        isBright: true,
      },
      {
        startAngle: Math.PI * 0.95,
        speed: 1.95,
        arcLength: Math.PI * 0.7,
        radius: baseRingRadius + 12,
        width: 4.0,
        isBright: false,
      },
    ];

    // 22 gentle floating water pearls / micro-droplets orbiting the water ring
    const pearls: WaterPearl[] = Array.from({ length: 22 }, (_, i) => ({
      angle: (i / 22) * Math.PI * 2,
      angularSpeed: 0.35 + (i % 5) * 0.08,
      radiusOffset: ((i * 7) % 34) - 17,
      size: 1.8 + (i % 4) * 0.9,
      alpha: 0.35 + (i % 3) * 0.2,
      phaseOffset: i * 0.9,
    }));

    pulseStartRef.current = performance.now();
    let animId: number;

    const renderSmoothWater = (now: number) => {
      const elapsed = (now - pulseStartRef.current) / 1000;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      // Intro surge envelope: peaks during the first 1.5s, then settles into a calm ambient flow
      const introProgress = clamp01(elapsed / 1.65);
      const introFadeIn = easeOutCubic(clamp01(elapsed / 0.35));
      const introSurge = 1 - easeInOutCubic(clamp01((elapsed - 1.05) / 1.1));
      // Ambient level keeps a delicate, living water shimmer even after the intro finishes
      const activeIntensity = introFadeIn * (0.22 + 0.78 * introSurge);

      // 1. Soft radial aquatic glow inside the water ring during the intro sweep
      if (introSurge > 0.01) {
        const glowRadius = baseRingRadius * (0.85 + 0.25 * easeOutCubic(introProgress));
        const radialGlow = ctx.createRadialGradient(
          cx,
          cy,
          glowRadius * 0.25,
          cx,
          cy,
          glowRadius * 1.25
        );
        const glowAlpha = 0.28 * introFadeIn * introSurge;
        radialGlow.addColorStop(0, `rgba(220, 235, 250, ${(glowAlpha * 0.4).toFixed(3)})`);
        radialGlow.addColorStop(0.65, `rgba(171, 205, 233, ${glowAlpha.toFixed(3)})`);
        radialGlow.addColorStop(1, 'rgba(171, 205, 233, 0)');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius * 1.25, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Concentric expanding water ripples radiating smoothly from the ring center
      const rippleCount = 3;
      for (let r = 0; r < rippleCount; r++) {
        const rippleStart = r * 0.26;
        const rippleProgress = clamp01((elapsed - rippleStart) / 1.45);
        if (rippleProgress > 0 && rippleProgress < 1) {
          const easedRipple = easeOutCubic(rippleProgress);
          const currentRadius = baseRingRadius * (0.55 + easedRipple * 0.72);
          const rippleAlpha =
            Math.sin(rippleProgress * Math.PI) * (1 - rippleProgress * 0.4) * 0.42;

          ctx.beginPath();
          ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(235, 248, 255, ${rippleAlpha.toFixed(3)})`;
          ctx.lineWidth = 2.2 * (1 - rippleProgress * 0.6);
          ctx.stroke();
        }
      }

      // 3. Silky-smooth tapered water ribbons flowing along the circular water ring
      ctx.lineCap = 'round';
      const speedMultiplier = 0.35 + 0.65 * introSurge;

      for (let i = 0; i < ribbons.length; i++) {
        const rib = ribbons[i];
        // Smoothly decelerate from initial swirl into a gentle continuous current
        const distanceTravelled =
          rib.speed * (elapsed * 0.38 + (1 - Math.exp(-elapsed * 1.6)) * 0.85);
        const headAngle = rib.startAngle + distanceTravelled;
        const currentArc = rib.arcLength * (0.45 + 0.55 * speedMultiplier);

        // Draw ribbon as 18 smooth connected tapered segments for a liquid brushstroke look
        const segments = 18;
        for (let s = 0; s < segments; s++) {
          const u0 = s / segments;
          const u1 = (s + 1) / segments;
          const a0 = headAngle - currentArc * (1 - u0);
          const a1 = headAngle - currentArc * (1 - u1);

          // Gentle organic breathing on the radius
          const waveOffset0 = Math.sin(a0 * 3 + elapsed * 2.2 + i) * 3.5;
          const waveOffset1 = Math.sin(a1 * 3 + elapsed * 2.2 + i) * 3.5;
          const r0 = rib.radius + waveOffset0;
          const r1 = rib.radius + waveOffset1;

          const x0 = cx + Math.cos(a0) * r0;
          const y0 = cy + Math.sin(a0) * r0;
          const x1 = cx + Math.cos(a1) * r1;
          const y1 = cy + Math.sin(a1) * r1;

          // Taper smoothly at both tail (u=0) and head (u=1)
          const taper = Math.sin(u1 * Math.PI);
          const segAlpha = taper * activeIntensity * (rib.isBright ? 0.78 : 0.48);

          if (segAlpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.strokeStyle = rib.isBright
              ? `rgba(245, 252, 255, ${segAlpha.toFixed(3)})`
              : `rgba(171, 215, 245, ${segAlpha.toFixed(3)})`;
            ctx.lineWidth = Math.max(0.8, rib.width * taper * (0.55 + 0.45 * introSurge));
            ctx.stroke();
          }
        }
      }

      // 4. Delicate floating water pearls / micro-droplets orbiting around the water ring
      for (let i = 0; i < pearls.length; i++) {
        const p = pearls[i];
        const currentAngle =
          p.angle + elapsed * p.angularSpeed * (0.45 + 0.85 * introSurge);
        const radialBreath =
          Math.sin(elapsed * 1.8 + p.phaseOffset) * 6 + p.radiusOffset;
        const r = baseRingRadius + radialBreath;

        const px = cx + Math.cos(currentAngle) * r;
        const py = cy + Math.sin(currentAngle) * r;

        const twinkle = 0.65 + 0.35 * Math.sin(elapsed * 2.6 + p.phaseOffset);
        const pearlAlpha = p.alpha * twinkle * activeIntensity * 1.35;

        if (pearlAlpha > 0.02) {
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 252, 255, ${Math.min(0.9, pearlAlpha).toFixed(3)})`;
          ctx.fill();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(renderSmoothWater);
    };

    animId = requestAnimationFrame(renderSmoothWater);
    return () => cancelAnimationFrame(animId);
  }, [replayCount]);

  const handleTriggerRipple = () => {
    pulseStartRef.current = performance.now();
    setReplayCount((prev) => prev + 1);
    if (onReplay) {
      onReplay();
    }
  };

  return (
    <motion.div
      data-testid="hero-sea-wave-logo"
      data-stage={phase}
      onClick={handleTriggerRipple}
      role="img"
      aria-label="Water Cycle animated wave logo"
      title="Tap or click to ripple the water"
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 1.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full max-w-3xl mx-auto flex items-center justify-center select-none overflow-visible cursor-pointer px-2 sm:px-0"
    >
      {/* Responsive Aspect-Locked 831x476 Stage Matching the Exact Logo Proportions */}
      <div className="relative w-full max-w-[310px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[640px] aspect-[831/476]">
        {/* LAYER 1: Soft Breathing Aquatic Halo Behind the Water Ring */}
        <motion.div
          aria-hidden="true"
          animate={{
            scale: [0.96, 1.05, 0.96],
            opacity: [0.42, 0.68, 0.42],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: '67.6%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute w-[44%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(235,248,255,0.55)_0%,rgba(171,205,233,0.22)_55%,transparent_75%)] pointer-events-none z-0"
        />

        {/* LAYER 2: Crisp, Un-Distorted Original Water Cycle Logo with Gentle Buoyancy */}
        <motion.div
          key={`logo-entrance-${replayCount === 0 ? 'initial' : 'settled'}`}
          initial={{
            opacity: 0,
            filter: 'blur(6px)',
            clipPath: 'inset(0 18% 0 0)',
          }}
          animate={{
            opacity: 1,
            filter: 'blur(0px)',
            clipPath: 'inset(0 0% 0 0)',
          }}
          transition={{
            duration: 1.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        >
          <motion.img
            src="/water-cycle-logo.png"
            alt="Water Cycle"
            animate={{
              y: [0, -3.5, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              filter:
                'drop-shadow(0 0 14px rgba(255,255,255,0.88)) drop-shadow(0 3px 10px rgba(6,61,91,0.35))',
            }}
            className="w-full h-full object-contain block"
          />
        </motion.div>

        {/* LAYER 3: Luminous Water Sheen Sweep Across Logo on Load & Tap */}
        <motion.div
          key={`sheen-${replayCount}`}
          aria-hidden="true"
          initial={{ x: '-110%', opacity: 0 }}
          animate={{ x: '125%', opacity: [0, 0.65, 0] }}
          transition={{
            duration: 1.35,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-3xl"
        >
          <div
            className="w-1/3 h-full -skew-x-20"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* LAYER 4: Smooth 60fps HTML5 Canvas Water Streams, Ripples & Floating Pearls */}
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
 * kept 100% razor-sharp with a gentle, hardware-accelerated floating motion.
 */
export const NavbarWavyLogo: React.FC = () => {
  return (
    <div className="relative inline-flex items-center select-none">
      <motion.img
        src="/water-cycle-logo.png"
        alt="Water Cycle"
        animate={{
          y: [0, -1.5, 0],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          filter: 'drop-shadow(0 1px 2.5px rgba(255, 255, 255, 0.72))',
        }}
        className="h-10 sm:h-12 md:h-16 w-auto object-contain block"
      />
    </div>
  );
};
