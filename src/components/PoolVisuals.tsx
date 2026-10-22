import React from 'react';

/**
 * Architectural daylight pool visual for the Homepage Hero.
 * Uses preserveAspectRatio="xMidYMid slice" so it fills its container edge-to-edge without letterboxing.
 */
export const HeroPoolScene: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] rounded-2xl overflow-hidden bg-[#ABCDE9] border-4 border-[#156D95] shadow-md select-none">
      <svg
        viewBox="0 0 800 560"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        role="img"
        aria-label="Clean modern swimming pool with clear blue water and solar water system architecture"
      >
        <defs>
          <linearGradient id="heroSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#62A1C2" />
            <stop offset="55%" stopColor="#ABCDE9" />
            <stop offset="100%" stopColor="#C6E0F5" />
          </linearGradient>
          <linearGradient id="heroPoolWater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#156D95" />
            <stop offset="100%" stopColor="#063D5B" />
          </linearGradient>
          <linearGradient id="solarPanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#063D5B" />
            <stop offset="50%" stopColor="#156D95" />
            <stop offset="100%" stopColor="#063D5B" />
          </linearGradient>
          <pattern id="heroTileGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="rgba(171, 205, 233, 0.32)"
              strokeWidth="1"
            />
          </pattern>
          <pattern id="deckStoneGrid" width="80" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 40"
              fill="none"
              stroke="#62A1C2"
              strokeWidth="1.5"
              opacity="0.45"
            />
          </pattern>
        </defs>

        {/* Bright Mediterranean Sky in Brand Blues */}
        <rect width="800" height="235" fill="url(#heroSky)" />

        {/* Subtle Daylight Sun */}
        <circle cx="675" cy="68" r="44" fill="#DCEBFA" opacity="0.55" />
        <circle cx="675" cy="68" r="24" fill="#EFF7FD" opacity="0.9" />

        {/* Architectural Villa Structure in Soft Sky Blue */}
        <rect x="55" y="92" width="470" height="135" fill="#C6E0F5" stroke="#156D95" strokeWidth="1.5" />
        <rect x="42" y="80" width="496" height="14" fill="#62A1C2" stroke="#156D95" strokeWidth="1" />

        {/* Rooftop Solar Water Heating System */}
        <g transform="translate(135, 38)">
          {/* Insulated Hot Water Storage Cylinder */}
          <rect x="28" y="0" width="95" height="22" rx="11" fill="#C6E0F5" stroke="#063D5B" strokeWidth="1.5" />
          <line x1="52" y1="0" x2="52" y2="22" stroke="#156D95" strokeWidth="1" />
          <line x1="98" y1="0" x2="98" y2="22" stroke="#156D95" strokeWidth="1" />
          {/* Collector Panel 1 */}
          <polygon
            points="10,42 65,19 135,19 80,42"
            fill="url(#solarPanelGrad)"
            stroke="#ABCDE9"
            strokeWidth="1.5"
          />
          <line x1="25" y1="39" x2="77" y2="19" stroke="#ABCDE9" strokeWidth="1" opacity="0.6" />
          <line x1="40" y1="39" x2="92" y2="19" stroke="#ABCDE9" strokeWidth="1" opacity="0.6" />
          <line x1="55" y1="39" x2="107" y2="19" stroke="#ABCDE9" strokeWidth="1" opacity="0.6" />
          <line x1="70" y1="39" x2="122" y2="19" stroke="#ABCDE9" strokeWidth="1" opacity="0.6" />

          {/* Collector Panel 2 */}
          <polygon
            points="145,42 200,19 270,19 215,42"
            fill="url(#solarPanelGrad)"
            stroke="#ABCDE9"
            strokeWidth="1.5"
          />
          <line x1="160" y1="39" x2="212" y2="19" stroke="#ABCDE9" strokeWidth="1" opacity="0.6" />
          <line x1="175" y1="39" x2="227" y2="19" stroke="#ABCDE9" strokeWidth="1" opacity="0.6" />
          <line x1="190" y1="39" x2="242" y2="19" stroke="#ABCDE9" strokeWidth="1" opacity="0.6" />
          <line x1="205" y1="39" x2="257" y2="19" stroke="#ABCDE9" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Architectural Windows */}
        <rect x="92" y="118" width="120" height="96" fill="#62A1C2" stroke="#063D5B" strokeWidth="1.5" />
        <line x1="152" y1="118" x2="152" y2="214" stroke="#063D5B" strokeWidth="1.5" />
        <rect x="240" y="118" width="150" height="96" fill="#62A1C2" stroke="#063D5B" strokeWidth="1.5" />
        <line x1="315" y1="118" x2="315" y2="214" stroke="#063D5B" strokeWidth="1.5" />
        <rect x="415" y="118" width="80" height="96" fill="#ABCDE9" stroke="#156D95" strokeWidth="1.5" />

        {/* Filtration Equipment Enclosure on Right */}
        <rect x="550" y="128" width="180" height="92" rx="6" fill="#C6E0F5" stroke="#156D95" strokeWidth="1.5" />
        <rect x="574" y="148" width="40" height="62" rx="18" fill="#156D95" />
        <rect x="584" y="138" width="20" height="10" rx="2" fill="#063D5B" />
        <rect x="632" y="162" width="34" height="48" rx="8" fill="#063D5B" />
        <path d="M 594 148 L 649 148 L 649 162" fill="none" stroke="#063D5B" strokeWidth="3" />
        <path d="M 666 188 L 704 188 L 704 210" fill="none" stroke="#063D5B" strokeWidth="3" />

        {/* Blue-Tinted Pool Deck */}
        <rect x="0" y="214" width="800" height="346" fill="#ABCDE9" />
        <rect x="0" y="214" width="800" height="346" fill="url(#deckStoneGrid)" />

        {/* Outer Pool Coping Border */}
        <polygon
          points="52,250 748,250 786,522 14,522"
          fill="#C6E0F5"
          stroke="#156D95"
          strokeWidth="2.5"
        />

        {/* Main Crystal-Clear Swimming Pool Basin */}
        <polygon
          points="72,264 728,264 762,506 38,506"
          fill="url(#heroPoolWater)"
        />

        {/* Mosaic Tile Overlay */}
        <polygon
          points="72,264 728,264 762,506 38,506"
          fill="url(#heroTileGrid)"
        />

        {/* Underwater Entry Steps on Left */}
        <polygon points="72,264 212,264 204,306 66,306" fill="#ABCDE9" opacity="0.72" />
        <polygon points="66,306 198,306 190,346 60,346" fill="#62A1C2" opacity="0.65" />
        <polygon points="60,346 184,346 176,384 54,384" fill="#156D95" opacity="0.55" />

        {/* Stainless Steel Pool Handrail */}
        <path
          d="M 122 242 C 122 222, 148 222, 148 245 L 142 315"
          fill="none"
          stroke="#063D5B"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Crisp Water Caustics & Shimmer Lines */}
        <path
          d="M 140 422 Q 220 404 300 422 T 460 418 T 620 426"
          fill="none"
          stroke="rgba(171,205,233,0.65)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 210 340 Q 290 325 370 340 T 530 336 T 680 344"
          fill="none"
          stroke="rgba(171,205,233,0.55)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 110 472 Q 230 456 350 472 T 590 466 T 710 476"
          fill="none"
          stroke="rgba(171,205,233,0.7)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom Scrim & Caption Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#063D5B]/95 via-[#063D5B]/70 to-transparent px-5 py-3.5 flex items-center justify-between text-xs text-white">
        <span className="font-bold">Complete Pool &amp; Water System Care</span>
        <span className="text-[#ABCDE9] font-medium hidden sm:inline">
          Solar Systems · Pool Treatment · Filtration
        </span>
      </div>
    </div>
  );
};

/**
 * Shared architectural pool frame used by BOTH BeforeDirtyPoolScene and AfterCleanPoolScene
 * with preserveAspectRatio="xMidYMid slice" so dragging the slider compares identical pool geometry
 * edge-to-edge without any side letterboxing bars.
 */
export const BeforeDirtyPoolScene: React.FC = () => {
  return (
    <div
      data-testid="pool-scene-before-dirty"
      className="w-full h-full bg-[#ABCDE9] select-none"
    >
      <svg
        viewBox="0 0 960 540"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        role="img"
        aria-label="Before treatment: swimming pool with murky, dirty green algae water"
      >
        <defs>
          <linearGradient id="dirtyGreenWater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4d6b31" />
            <stop offset="50%" stopColor="#365322" />
            <stop offset="100%" stopColor="#243b16" />
          </linearGradient>
          <radialGradient id="algaeBloom1" cx="30%" cy="40%" r="45%">
            <stop offset="0%" stopColor="#658339" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#2d4620" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="algaeBloom2" cx="70%" cy="65%" r="40%">
            <stop offset="0%" stopColor="#58742f" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#243b16" stopOpacity="0" />
          </radialGradient>
          <pattern id="murkyTileGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(163, 190, 110, 0.10)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Stone Pool Deck Surround in Brand Sky Blue */}
        <rect width="960" height="540" fill="#ABCDE9" />
        <line x1="0" y1="54" x2="960" y2="54" stroke="#62A1C2" strokeWidth="2" />
        <line x1="0" y1="486" x2="960" y2="486" stroke="#62A1C2" strokeWidth="2" />
        <line x1="160" y1="0" x2="160" y2="540" stroke="#62A1C2" strokeWidth="1.5" />
        <line x1="380" y1="0" x2="380" y2="540" stroke="#62A1C2" strokeWidth="1.5" />
        <line x1="580" y1="0" x2="580" y2="540" stroke="#62A1C2" strokeWidth="1.5" />
        <line x1="800" y1="0" x2="800" y2="540" stroke="#62A1C2" strokeWidth="1.5" />

        {/* Pool Coping Frame */}
        <rect
          x="44"
          y="38"
          width="872"
          height="464"
          rx="14"
          fill="#C6E0F5"
          stroke="#156D95"
          strokeWidth="2.5"
        />

        {/* Murky Dirty Green Pool Basin */}
        <rect
          x="66"
          y="60"
          width="828"
          height="420"
          rx="8"
          fill="url(#dirtyGreenWater)"
        />
        <rect
          x="66"
          y="60"
          width="828"
          height="420"
          rx="8"
          fill="url(#murkyTileGrid)"
        />

        {/* Stained & Cloudy Underwater Steps on Left */}
        <rect x="66" y="60" width="90" height="420" fill="#5b783b" opacity="0.55" />
        <rect x="156" y="60" width="66" height="420" fill="#4c672f" opacity="0.45" />
        <rect x="222" y="60" width="54" height="420" fill="#3f5826" opacity="0.35" />

        {/* Heavy Algae Blooms & Murky Cloudiness */}
        <rect x="66" y="60" width="828" height="420" fill="url(#algaeBloom1)" />
        <rect x="66" y="60" width="828" height="420" fill="url(#algaeBloom2)" />

        {/* Perimeter Algae Biofilm Staining */}
        <rect
          x="70"
          y="64"
          width="820"
          height="412"
          rx="6"
          fill="none"
          stroke="#213513"
          strokeWidth="12"
          opacity="0.58"
        />

        {/* Surface Murk & Organic Debris Specks */}
        <ellipse cx="265" cy="190" rx="95" ry="48" fill="#6b8a3d" opacity="0.38" />
        <ellipse cx="480" cy="340" rx="130" ry="62" fill="#5e7c34" opacity="0.35" />
        <ellipse cx="690" cy="210" rx="110" ry="54" fill="#6b8a3d" opacity="0.32" />
        <circle cx="210" cy="155" r="5" fill="#1e2f12" opacity="0.7" />
        <circle cx="310" cy="295" r="6" fill="#1e2f12" opacity="0.65" />
        <circle cx="425" cy="175" r="4.5" fill="#1e2f12" opacity="0.7" />
        <circle cx="355" cy="390" r="5.5" fill="#1e2f12" opacity="0.65" />
        <circle cx="540" cy="240" r="5" fill="#1e2f12" opacity="0.6" />
        <circle cx="670" cy="340" r="6" fill="#1e2f12" opacity="0.65" />

        {/* Murky Surface Wavy Lines */}
        <path
          d="M 110 140 Q 240 155 360 140 T 600 145 T 830 138"
          fill="none"
          stroke="rgba(185, 209, 138, 0.26)"
          strokeWidth="2.5"
        />
        <path
          d="M 130 285 Q 280 302 420 285 T 700 292 T 850 284"
          fill="none"
          stroke="rgba(185, 209, 138, 0.24)"
          strokeWidth="2.5"
        />
        <path
          d="M 105 410 Q 260 395 410 410 T 710 405 T 845 412"
          fill="none"
          stroke="rgba(185, 209, 138, 0.24)"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
};

export const AfterCleanPoolScene: React.FC = () => {
  return (
    <div
      data-testid="pool-scene-after-clean"
      className="w-full h-full bg-[#ABCDE9] select-none"
    >
      <svg
        viewBox="0 0 960 540"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        role="img"
        aria-label="After treatment: swimming pool with crystal-clear sparkling blue water"
      >
        <defs>
          <linearGradient id="cleanBlueWater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#62A1C2" />
            <stop offset="50%" stopColor="#156D95" />
            <stop offset="100%" stopColor="#063D5B" />
          </linearGradient>
          <radialGradient id="sunlightCaustic1" cx="65%" cy="35%" r="45%">
            <stop offset="0%" stopColor="#ABCDE9" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#156D95" stopOpacity="0" />
          </radialGradient>
          <pattern id="crispMosaicTiles" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(171, 205, 233, 0.35)"
              strokeWidth="1.2"
            />
            <path
              d="M 20 0 L 20 40 M 0 20 L 40 20"
              fill="none"
              stroke="rgba(171, 205, 233, 0.18)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>

        {/* Stone Pool Deck Surround in Brand Sky Blue (matches Before frame 1:1) */}
        <rect width="960" height="540" fill="#ABCDE9" />
        <line x1="0" y1="54" x2="960" y2="54" stroke="#62A1C2" strokeWidth="2" />
        <line x1="0" y1="486" x2="960" y2="486" stroke="#62A1C2" strokeWidth="2" />
        <line x1="160" y1="0" x2="160" y2="540" stroke="#62A1C2" strokeWidth="1.5" />
        <line x1="380" y1="0" x2="380" y2="540" stroke="#62A1C2" strokeWidth="1.5" />
        <line x1="580" y1="0" x2="580" y2="540" stroke="#62A1C2" strokeWidth="1.5" />
        <line x1="800" y1="0" x2="800" y2="540" stroke="#62A1C2" strokeWidth="1.5" />

        {/* Clean Sky-Tinted Pool Coping Frame */}
        <rect
          x="44"
          y="38"
          width="872"
          height="464"
          rx="14"
          fill="#C6E0F5"
          stroke="#156D95"
          strokeWidth="2.5"
        />

        {/* Crystal-Clear Sparkling Blue Pool Basin */}
        <rect
          x="66"
          y="60"
          width="828"
          height="420"
          rx="8"
          fill="url(#cleanBlueWater)"
        />

        {/* Crisp Visible Bottom Mosaic Tiles */}
        <rect
          x="66"
          y="60"
          width="828"
          height="420"
          rx="8"
          fill="url(#crispMosaicTiles)"
        />

        {/* Clear Underwater Steps on Left */}
        <rect
          x="66"
          y="60"
          width="90"
          height="420"
          fill="#ABCDE9"
          opacity="0.65"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
        <rect
          x="156"
          y="60"
          width="66"
          height="420"
          fill="#62A1C2"
          opacity="0.55"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
        />
        <rect
          x="222"
          y="60"
          width="54"
          height="420"
          fill="#156D95"
          opacity="0.45"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
        />

        {/* Visible Clean Floor Main Drains */}
        <rect
          x="765"
          y="215"
          width="26"
          height="26"
          rx="4"
          fill="#ABCDE9"
          stroke="#063D5B"
          strokeWidth="1.5"
          opacity="0.85"
        />
        <rect
          x="765"
          y="295"
          width="26"
          height="26"
          rx="4"
          fill="#ABCDE9"
          stroke="#063D5B"
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* Bright Sunlight Caustic Reflection */}
        <rect x="66" y="60" width="828" height="420" fill="url(#sunlightCaustic1)" />

        {/* Sparkling Water Surface Highlights */}
        <path
          d="M 110 140 Q 240 125 360 140 T 600 135 T 830 142"
          fill="none"
          stroke="rgba(171, 205, 233, 0.72)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 130 285 Q 280 268 420 285 T 700 278 T 850 286"
          fill="none"
          stroke="rgba(171, 205, 233, 0.65)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 105 410 Q 260 395 410 410 T 710 402 T 845 412"
          fill="none"
          stroke="rgba(171, 205, 233, 0.68)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const ServiceVisual: React.FC<{
  serviceId: 'solar' | 'pool-treatment' | 'filtration';
}> = ({ serviceId }) => {
  if (serviceId === 'solar') {
    return (
      <div className="w-full h-48 bg-[#063D5B] border-b-2 border-[#156D95] overflow-hidden">
        <svg
          viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full block"
          role="img"
          aria-label="Solar water system illustration"
        >
          <rect width="400" height="220" fill="#063D5B" />
          <circle cx="330" cy="48" r="24" fill="#ABCDE9" opacity="0.85" />
          <circle cx="330" cy="48" r="14" fill="#62A1C2" />
          <rect x="40" y="175" width="320" height="16" rx="3" fill="#156D95" />
          <line x1="95" y1="90" x2="95" y2="175" stroke="#ABCDE9" strokeWidth="4" />
          <line x1="265" y1="145" x2="265" y2="175" stroke="#ABCDE9" strokeWidth="4" />
          <rect
            x="68"
            y="54"
            width="92"
            height="36"
            rx="18"
            fill="#ABCDE9"
            stroke="#62A1C2"
            strokeWidth="2.5"
          />
          <text x="114" y="76" textAnchor="middle" fill="#063D5B" fontSize="10" fontWeight="700">
            SOLAR TANK
          </text>
          <polygon
            points="105,86 155,72 305,134 255,148"
            fill="#156D95"
            stroke="#ABCDE9"
            strokeWidth="2"
          />
          <line x1="125" y1="81" x2="270" y2="141" stroke="#ABCDE9" strokeWidth="1.5" opacity="0.85" />
          <line x1="138" y1="77" x2="285" y2="137" stroke="#ABCDE9" strokeWidth="1.5" opacity="0.85" />
          <path d="M 85 90 L 85 162 L 320 162" fill="none" stroke="#62A1C2" strokeWidth="3" />
        </svg>
      </div>
    );
  }

  if (serviceId === 'pool-treatment') {
    return (
      <div className="w-full h-48 bg-[#063D5B] border-b-2 border-[#156D95] overflow-hidden">
        <svg
          viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full block"
          role="img"
          aria-label="Pool treatment transformation from green water to clear blue water"
        >
          <rect x="0" y="0" width="190" height="220" fill="#365322" />
          <rect x="190" y="0" width="210" height="220" fill="#156D95" />
          <line x1="230" y1="0" x2="230" y2="220" stroke="rgba(171,205,233,0.3)" strokeWidth="1" />
          <line x1="270" y1="0" x2="270" y2="220" stroke="rgba(171,205,233,0.3)" strokeWidth="1" />
          <line x1="310" y1="0" x2="310" y2="220" stroke="rgba(171,205,233,0.3)" strokeWidth="1" />
          <line x1="350" y1="0" x2="350" y2="220" stroke="rgba(171,205,233,0.3)" strokeWidth="1" />
          <line x1="190" y1="55" x2="400" y2="55" stroke="rgba(171,205,233,0.3)" strokeWidth="1" />
          <line x1="190" y1="110" x2="400" y2="110" stroke="rgba(171,205,233,0.3)" strokeWidth="1" />
          <line x1="190" y1="165" x2="400" y2="165" stroke="rgba(171,205,233,0.3)" strokeWidth="1" />
          <line x1="190" y1="0" x2="190" y2="220" stroke="#ABCDE9" strokeWidth="3" />
          <circle cx="190" cy="110" r="22" fill="#ABCDE9" />
          <path
            d="M 182 110 L 198 110 M 193 104 L 199 110 L 193 116"
            fill="none"
            stroke="#063D5B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="28" y="34" fill="#d9f99d" fontSize="11" fontWeight="700" letterSpacing="0.06em">
            UNTREATED
          </text>
          <text x="295" y="34" fill="#ABCDE9" fontSize="11" fontWeight="700" letterSpacing="0.06em">
            TREATED
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-[#063D5B] border-b-2 border-[#156D95] overflow-hidden">
      <svg
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        role="img"
        aria-label="Water filtration system illustration"
      >
        <rect width="400" height="220" fill="#063D5B" />
        <rect x="55" y="182" width="290" height="14" rx="3" fill="#156D95" />
        <rect
          x="130"
          y="64"
          width="84"
          height="118"
          rx="36"
          fill="#62A1C2"
          stroke="#ABCDE9"
          strokeWidth="2"
        />
        <rect x="154" y="42" width="36" height="22" rx="4" fill="#ABCDE9" />
        <rect
          x="248"
          y="124"
          width="66"
          height="58"
          rx="8"
          fill="#156D95"
          stroke="#ABCDE9"
          strokeWidth="1.5"
        />
        <path
          d="M 80 145 L 130 145 M 172 52 L 265 52 L 265 124 M 314 152 L 345 152"
          fill="none"
          stroke="#ABCDE9"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line x1="144" y1="115" x2="200" y2="115" stroke="#063D5B" strokeWidth="2" strokeDasharray="4 3" />
        <line x1="144" y1="138" x2="200" y2="138" stroke="#063D5B" strokeWidth="2" strokeDasharray="4 3" />
      </svg>
    </div>
  );
};
