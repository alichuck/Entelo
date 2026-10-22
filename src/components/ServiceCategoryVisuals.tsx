import React from 'react';
import {
  CoreServiceItem,
  ConstructionServiceItem,
  AdditionalServiceItem,
} from '../utils/waterCycleLogic';

export type AnyWaterCycleServiceId =
  | CoreServiceItem['id']
  | ConstructionServiceItem['id']
  | AdditionalServiceItem['id'];

export interface ServiceSlideItem {
  title: string;
  caption: string;
  render: () => React.ReactNode;
}

/**
 * Renders a detailed architectural/technical SVG or real photograph slide
 * for each of Water Cycle's 10 verified services.
 */
export const getServiceSlides = (
  serviceId: AnyWaterCycleServiceId
): ServiceSlideItem[] => {
  switch (serviceId) {
    case 'pool-treatment':
      return [
        {
          title: 'Crystal-Clear Swimming Pool Water Treatment',
          caption: 'Water Cycle — Swimming Pool Water Care & Clarity Restoration',
          render: () => (
            <img
              src="/images/pool-after.jpg"
              alt="Clean, clear blue swimming pool water after Water Cycle treatment"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Before & After Pool Water Recovery',
          caption: 'Untreated Algae-Green Pool Water (Left) vs. Treated Clear Pool Water (Right)',
          render: () => (
            <div className="relative w-full h-full grid grid-cols-2 overflow-hidden bg-[#063D5B]">
              <div className="relative h-full overflow-hidden border-r-2 border-white">
                <img
                  src="/images/pool-before.jpg"
                  alt="Before treatment: green pool water"
                  className="w-full h-full object-cover object-center block"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#042B41]/90 text-[#ABCDE9] text-[11px] font-bold uppercase tracking-wider">
                  Before Treatment
                </span>
              </div>
              <div className="relative h-full overflow-hidden">
                <img
                  src="/images/pool-after.jpg"
                  alt="After treatment: clear blue pool water"
                  className="w-full h-full object-cover object-center block"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#063D5B]/90 text-white text-[11px] font-bold uppercase tracking-wider">
                  After Treatment
                </span>
              </div>
            </div>
          ),
        },
        {
          title: 'Outdoor & Infinity Pool Water Circulation Solutions',
          caption: 'Balanced Water Chemistry, Circulation & Ongoing Pool Care',
          render: () => (
            <img
              src="/hero-pool-bg.jpg"
              alt="Infinity swimming pool with clean balanced water"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
      ];

    case 'filtration':
      return [
        {
          title: 'Multi-Stage Water Treatment & Pressure Filtration Systems',
          caption: 'Sand & Media Filtration Vessels, Manifold Piping & Circulation Control',
          render: () => <FiltrationTechnicalVisual variant="vessels" />,
        },
        {
          title: 'Sediment & Water-Quality Filtration Setup',
          caption: 'Tailored Residential & Commercial Water Filtration Configurations',
          render: () => <FiltrationTechnicalVisual variant="schematic" />,
        },
        {
          title: 'Integrated Property Water Filtration & Technical Room',
          caption: 'Outdoor Filtration & Equipment Positioning for Pools and Water Systems',
          render: () => (
            <img
              src="/about-bg.jpg"
              alt="Property with integrated water filtration and pool equipment"
              className="w-full h-full object-cover object-right block"
            />
          ),
        },
      ];

    case 'solar':
      return [
        {
          title: 'Solar Thermal Water-Heating Collector Systems',
          caption: 'Rooftop Solar Collectors & Insulated Hot-Water Storage Cylinders',
          render: () => <SolarTechnicalVisual variant="rooftop" />,
        },
        {
          title: 'Property Solar Water Heating Integration',
          caption: 'Energy-Conscious Solar Thermal Collectors Installed on Villa Rooftops',
          render: () => (
            <img
              src="/about-bg.jpg"
              alt="Rooftop solar panels and water heating system on villa"
              className="w-full h-full object-cover object-top block"
            />
          ),
        },
        {
          title: 'Solar Thermal Circulation & Storage Configuration',
          caption: 'Closed-Loop Solar Collector Array & Thermal Storage Tank Layout',
          render: () => <SolarTechnicalVisual variant="loop" />,
        },
      ];

    case 'pool-construction':
      return [
        {
          title: 'Outdoor & Infinity Swimming Pool Construction',
          caption: 'End-to-End Pool Construction from Space Evaluation to Final Finishing',
          render: () => (
            <img
              src="/hero-pool-bg.jpg"
              alt="Completed outdoor infinity swimming pool construction"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Complete Pool, Deck & Equipment-Room Execution',
          caption: 'Practical Layout Planning, Concrete Basin Construction & Tiling',
          render: () => (
            <img
              src="/about-bg.jpg"
              alt="Swimming pool and leisure deck construction"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Finished Tiled Swimming Pool Ready for Operation',
          caption: 'High-Durability Pool Basin, Coping & Circulation Readiness',
          render: () => (
            <img
              src="/images/pool-after.jpg"
              alt="Finished tiled swimming pool filled with clear water"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
      ];

    case 'jacuzzi-sauna-construction':
      return [
        {
          title: 'Custom Jacuzzi & Cedar Sauna Construction',
          caption: 'Indoor & Outdoor Sauna and Poolside Jacuzzi Construction',
          render: () => (
            <img
              src="/about-bg.jpg"
              alt="Custom glass-front timber sauna and built-in poolside Jacuzzi"
              className="w-full h-full object-cover object-left block"
            />
          ),
        },
        {
          title: 'Jacuzzi Hydrotherapy & Sauna Layout Engineering',
          caption: 'Coordinated Positioning for Water, Heating, Jets & Equipment Rooms',
          render: () => <JacuzziSaunaVisual variant="construction" />,
        },
        {
          title: 'Integrated Poolside Spa & Wellness Spaces',
          caption: 'Seamless Integration with Swimming Pools and Outdoor Terraces',
          render: () => (
            <img
              src="/hero-pool-bg.jpg"
              alt="Outdoor pool and leisure space"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
      ];

    case 'site-assessment-planning':
      return [
        {
          title: 'On-Site Property Evaluation & Practical Space Planning',
          caption: 'Optimal Positioning for Pool, Jacuzzi, Sauna, Technical Room & Water Tank',
          render: () => <SitePlanningVisual variant="blueprint" />,
        },
        {
          title: 'Coordinated Multi-Zone Property Layout',
          caption: 'Harmonic Placement of Pool, Sauna, Jacuzzi, Solar Collectors & Filtration',
          render: () => (
            <img
              src="/about-bg.jpg"
              alt="Coordinated property layout with pool, sauna, Jacuzzi, solar and filtration"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Water Tank & Equipment-Room Infrastructure Planning',
          caption: 'Practical Piping Distances, Access Routes & Elevation Planning',
          render: () => <SitePlanningVisual variant="infrastructure" />,
        },
      ];

    case 'excavation-concrete':
      return [
        {
          title: 'Site Excavation & Reinforced Concrete Pool Construction',
          caption: 'Ground Preparation, Steel Reinforcement & Structural Concrete Pouring',
          render: () => <ExcavationConcreteVisual variant="rebar" />,
        },
        {
          title: 'Structural Basin, Technical Room & Water Tank Foundations',
          caption: 'Solid Concrete Works Built for Long-Term Structural Integrity',
          render: () => <ExcavationConcreteVisual variant="shell" />,
        },
        {
          title: 'Completed Structural Pool Deck & Coping Architecture',
          caption: 'Precision Concrete Forming Ready for Waterproofing and Tiling',
          render: () => (
            <img
              src="/hero-pool-bg.jpg"
              alt="Completed structural pool and terrace"
              className="w-full h-full object-cover object-bottom block"
            />
          ),
        },
      ];

    case 'tiling-finishing':
      return [
        {
          title: 'Mosaic Pool Tiling & Perimeter Coping Finishes',
          caption: 'Precision Interior Tiling, Grouting & Non-Slip Deck Coping',
          render: () => <TilingFinishingVisual variant="mosaic" />,
        },
        {
          title: 'Completed Tiled Swimming Pool Basin',
          caption: 'Clean Interior Surface Detailing & Final Readiness for Water Filling',
          render: () => (
            <img
              src="/images/pool-after.jpg"
              alt="Finished blue tiled swimming pool"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Outdoor Stone Terrace & Leisure Area Finishing',
          caption: 'Quality Finishing Works for Pools, Jacuzzis, and Surrounding Decks',
          render: () => (
            <img
              src="/about-bg.jpg"
              alt="Finished stone terrace around pool and Jacuzzi"
              className="w-full h-full object-cover object-bottom block"
            />
          ),
        },
      ];

    case 'wastewater':
      return [
        {
          title: 'Sewage & Wastewater Treatment System Installation',
          caption: 'Water Cycle Control Panel, Chemical Dosing Pump, Dual Aeration Blowers & Dosing Tank',
          render: () => (
            <img
              src="/images/wastewater-1.jpg"
              alt="Water Cycle sewage and wastewater treatment dosing tank, control panel, and aeration blowers"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Dual Aeration Blowers & Treatment Tank Setup',
          caption: 'Clean Technical Room Piping, Dual Air Blowers & Treatment Storage Tank',
          render: () => (
            <div className="relative w-full h-full bg-[#042B41] flex items-center justify-center overflow-hidden">
              <img
                src="/images/wastewater-2.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-md opacity-45 scale-110"
              />
              <img
                src="/images/wastewater-2.jpg"
                alt="Dual aeration blowers and treatment tank installation"
                className="relative z-10 w-full h-full object-contain block"
              />
            </div>
          ),
        },
        {
          title: 'Regenerative Air Blower & Dosing System',
          caption: 'Water Cycle Dosing Tank, Wall-Mounted Dosing Pump & Side-Channel Blower',
          render: () => (
            <div className="relative w-full h-full bg-[#042B41] flex items-center justify-center overflow-hidden">
              <img
                src="/images/wastewater-3.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-md opacity-45 scale-110"
              />
              <img
                src="/images/wastewater-3.jpg"
                alt="Water Cycle dosing tank, dosing pump, and regenerative air blower"
                className="relative z-10 w-full h-full object-contain block"
              />
            </div>
          ),
        },
      ];

    case 'wellness':
    default:
      return [
        {
          title: 'Jacuzzi, Sauna & Steam Room Systems',
          caption: 'Relaxation & Wellness Facilities with Coordinated Water & Heat Systems',
          render: () => (
            <img
              src="/about-bg.jpg"
              alt="Glass sauna and Jacuzzi wellness space"
              className="w-full h-full object-cover object-left block"
            />
          ),
        },
        {
          title: 'Hydrotherapy Jets, Steam Generators & Sauna Heating',
          caption: 'Complete Water Circulation, Heating & Control Systems for Spas',
          render: () => <JacuzziSaunaVisual variant="systems" />,
        },
        {
          title: 'Crystal-Clear Spa & Pool Water Quality',
          caption: 'Hygienic Filtration & Water Care for Relaxation Facilities',
          render: () => (
            <img
              src="/images/pool-after.jpg"
              alt="Clear treated water for pool and wellness systems"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
      ];
  }
};

/**
 * Renders the first slide thumbnail for the Services Overview Grid (Image 1 layout).
 */
export const ServiceCardThumbnail: React.FC<{
  serviceId: AnyWaterCycleServiceId;
}> = ({ serviceId }) => {
  const slides = getServiceSlides(serviceId);
  return <div className="w-full h-full">{slides[0].render()}</div>;
};

/* ============================================================================
 * TECHNICAL & ARCHITECTURAL ILLUSTRATIONS FOR SPECIFIC SERVICE CATEGORIES
 * ============================================================================ */

const FiltrationTechnicalVisual: React.FC<{
  variant: 'vessels' | 'schematic';
}> = ({ variant }) => (
  <svg
    viewBox="0 0 800 450"
    preserveAspectRatio="xMidYMid slice"
    className="w-full h-full block bg-[#063D5B]"
    role="img"
    aria-label="Water Cycle multi-vessel filtration and piping system"
  >
    <defs>
      <linearGradient id="filtBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#042B41" />
        <stop offset="55%" stopColor="#063D5B" />
        <stop offset="100%" stopColor="#156D95" />
      </linearGradient>
      <linearGradient id="vesselTank" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#62A1C2" />
        <stop offset="45%" stopColor="#ABCDE9" />
        <stop offset="100%" stopColor="#156D95" />
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#filtBg)" />
    {/* Subtle technical grid */}
    <g stroke="rgba(171,205,233,0.12)" strokeWidth="1">
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
      ))}
    </g>

    {/* Concrete Equipment Pad */}
    <rect x="70" y="365" width="660" height="28" rx="6" fill="#156D95" stroke="#ABCDE9" strokeWidth="1.5" />

    {variant === 'vessels' ? (
      <>
        {/* 3 Commercial/Residential Pressure Filtration Vessels */}
        {[170, 340, 510].map((x, idx) => (
          <g key={x}>
            <rect
              x={x}
              y="125"
              width="115"
              height="240"
              rx="52"
              fill="url(#vesselTank)"
              stroke="#DCEBFA"
              strokeWidth="2.5"
            />
            {/* Multiport Valve Head */}
            <rect
              x={x + 32}
              y="88"
              width="51"
              height="37"
              rx="6"
              fill="#042B41"
              stroke="#ABCDE9"
              strokeWidth="2"
            />
            {/* Pressure Gauge */}
            <circle cx={x + 57} cy="72" r="11" fill="#DCEBFA" stroke="#063D5B" strokeWidth="2" />
            <line x1={x + 57} y1="72" x2={x + 63} y2="66" stroke="#063D5B" strokeWidth="2" />
            {/* Internal Filter Media Layers */}
            <line
              x1={x + 14}
              y1="230"
              x2={x + 101}
              y2="230"
              stroke="#063D5B"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <line
              x1={x + 14}
              y1="285"
              x2={x + 101}
              y2="285"
              stroke="#063D5B"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <text
              x={x + 57}
              y="205"
              textAnchor="middle"
              fill="#042B41"
              fontSize="12"
              fontWeight="800"
            >
              STAGE 0{idx + 1}
            </text>
          </g>
        ))}
        {/* Header & Collector Manifold Pipes */}
        <path
          d="M 95 106 L 675 106 M 115 320 L 705 320"
          fill="none"
          stroke="#DCEBFA"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 95 106 L 675 106 M 115 320 L 705 320"
          fill="none"
          stroke="#62A1C2"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        {/* Raw Water -> Pump -> Media Filter -> Fine Cartridge -> Treated Water Output */}
        <rect x="95" y="245" width="110" height="120" rx="12" fill="#156D95" stroke="#ABCDE9" strokeWidth="2.5" />
        <text x="150" y="308" textAnchor="middle" fill="#DCEBFA" fontSize="13" fontWeight="700">
          FEED PUMP
        </text>
        <rect x="275" y="135" width="130" height="230" rx="58" fill="url(#vesselTank)" stroke="#DCEBFA" strokeWidth="2.5" />
        <text x="340" y="250" textAnchor="middle" fill="#042B41" fontSize="13" fontWeight="800">
          MEDIA FILTER
        </text>
        <rect x="475" y="165" width="95" height="200" rx="36" fill="#62A1C2" stroke="#DCEBFA" strokeWidth="2.5" />
        <text x="522" y="268" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
          FINE FILTER
        </text>
        <path
          d="M 205 300 L 275 300 M 340 135 L 340 105 L 522 105 L 522 165 M 570 265 L 700 265"
          fill="none"
          stroke="#ABCDE9"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

const SolarTechnicalVisual: React.FC<{ variant: 'rooftop' | 'loop' }> = ({
  variant,
}) => (
  <svg
    viewBox="0 0 800 450"
    preserveAspectRatio="xMidYMid slice"
    className="w-full h-full block bg-[#063D5B]"
    role="img"
    aria-label="Solar thermal water heating collector array and insulated storage cylinder"
  >
    <defs>
      <linearGradient id="solarSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#063D5B" />
        <stop offset="60%" stopColor="#156D95" />
        <stop offset="100%" stopColor="#62A1C2" />
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#solarSky)" />
    {/* Sun & Warm Rays */}
    <circle cx="660" cy="92" r="56" fill="#DCEBFA" opacity="0.28" />
    <circle cx="660" cy="92" r="36" fill="#EFF7FD" opacity="0.92" />

    {/* Roof Structure */}
    <rect x="70" y="345" width="660" height="26" rx="4" fill="#042B41" stroke="#ABCDE9" strokeWidth="1.5" />

    {/* Mounting Frame */}
    <line x1="175" y1="175" x2="175" y2="345" stroke="#ABCDE9" strokeWidth="6" />
    <line x1="535" y1="295" x2="535" y2="345" stroke="#ABCDE9" strokeWidth="6" />
    <line x1="175" y1="265" x2="415" y2="345" stroke="#62A1C2" strokeWidth="4" />

    {/* Insulated Solar Storage Cylinder */}
    <rect
      x="115"
      y="102"
      width="185"
      height="72"
      rx="36"
      fill="#DCEBFA"
      stroke="#063D5B"
      strokeWidth="3"
    />
    <text x="207" y="143" textAnchor="middle" fill="#063D5B" fontSize="14" fontWeight="800">
      SOLAR HOT WATER TANK
    </text>

    {/* Solar Thermal Collector Tubes / Panels */}
    <polygon
      points="195,172 285,146 615,276 525,302"
      fill="#042B41"
      stroke="#ABCDE9"
      strokeWidth="3"
    />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <line
        key={i}
        x1={212 + i * 44}
        y1={168 + i * 16}
        x2={302 + i * 44}
        y2={148 + i * 16}
        stroke="#62A1C2"
        strokeWidth="3"
      />
    ))}

    {variant === 'loop' && (
      <path
        d="M 150 174 L 150 322 L 580 322 L 580 288"
        fill="none"
        stroke="#EFF7FD"
        strokeWidth="5"
        strokeDasharray="10 6"
      />
    )}
  </svg>
);

const SitePlanningVisual: React.FC<{
  variant: 'blueprint' | 'infrastructure';
}> = ({ variant }) => (
  <svg
    viewBox="0 0 800 450"
    preserveAspectRatio="xMidYMid slice"
    className="w-full h-full block bg-[#042B41]"
    role="img"
    aria-label="Property site assessment and space planning layout for pool, Jacuzzi, sauna, technical room, and water tank"
  >
    <rect width="800" height="450" fill="#042B41" />
    {/* Blueprint Grid */}
    <g stroke="rgba(171,205,233,0.16)" strokeWidth="1">
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`bv-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="450" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`bh-${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} />
      ))}
    </g>

    {/* Property Boundary */}
    <rect
      x="55"
      y="42"
      width="690"
      height="366"
      rx="10"
      fill="none"
      stroke="#ABCDE9"
      strokeWidth="2.5"
      strokeDasharray="10 6"
    />

    {/* Swimming Pool Zone */}
    <rect
      x="95"
      y="85"
      width="355"
      height="195"
      rx="12"
      fill="rgba(21,109,149,0.55)"
      stroke="#DCEBFA"
      strokeWidth="2.5"
    />
    <text x="272" y="182" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800">
      SWIMMING POOL POSITIONING
    </text>

    {/* Jacuzzi & Sauna Zone */}
    <rect
      x="480"
      y="85"
      width="225"
      height="115"
      rx="10"
      fill="rgba(98,161,194,0.4)"
      stroke="#ABCDE9"
      strokeWidth="2"
    />
    <text x="592" y="146" textAnchor="middle" fill="#DCEBFA" fontSize="13" fontWeight="700">
      JACUZZI &amp; SAUNA ZONE
    </text>

    {/* Technical Equipment Room */}
    <rect
      x="480"
      y="230"
      width="225"
      height="140"
      rx="10"
      fill="rgba(6,61,91,0.85)"
      stroke="#ABCDE9"
      strokeWidth="2"
    />
    <text x="592" y="295" textAnchor="middle" fill="#ABCDE9" fontSize="13" fontWeight="700">
      TECHNICAL ROOM &amp;
    </text>
    <text x="592" y="316" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
      WATER TANK POSITIONING
    </text>

    {/* Dimension & Piping Lines */}
    <path
      d="M 450 180 L 480 180 M 450 255 L 480 255 M 272 280 L 272 335 L 480 335"
      fill="none"
      stroke="#ABCDE9"
      strokeWidth="2.5"
      strokeDasharray={variant === 'infrastructure' ? '4 4' : undefined}
    />
    <text x="272" y="365" textAnchor="middle" fill="#ABCDE9" fontSize="12" fontWeight="700">
      SITE ASSESSMENT · PRACTICAL LAYOUT &amp; INFRASTRUCTURE PLANNING
    </text>
  </svg>
);

const ExcavationConcreteVisual: React.FC<{ variant: 'rebar' | 'shell' }> = ({
  variant,
}) => (
  <svg
    viewBox="0 0 800 450"
    preserveAspectRatio="xMidYMid slice"
    className="w-full h-full block bg-[#063D5B]"
    role="img"
    aria-label="Excavation, site preparation, and reinforced concrete pool construction"
  >
    <rect width="800" height="450" fill="#063D5B" />
    {/* Excavated Ground Cutaway */}
    <polygon points="0,145 800,145 800,450 0,450" fill="#042B41" />
    {/* Concrete Pool Basin Shell */}
    <polygon
      points="95,145 145,145 165,335 635,335 655,145 705,145 675,380 125,380"
      fill="#62A1C2"
      stroke="#DCEBFA"
      strokeWidth="2.5"
    />
    {/* Interior Structural Concrete Basin */}
    <polygon
      points="145,145 655,145 635,335 165,335"
      fill="#156D95"
      stroke="#ABCDE9"
      strokeWidth="2"
    />
    {/* Steel Rebar Reinforcement Grid */}
    <g
      stroke={variant === 'rebar' ? '#DCEBFA' : '#ABCDE9'}
      strokeWidth="1.5"
      opacity="0.65"
    >
      {[185, 225, 265, 305].map((y) => (
        <line key={y} x1="160" y1={y} x2="640" y2={y} />
      ))}
      {[210, 275, 340, 405, 470, 535, 595].map((x) => (
        <line key={x} x1={x} y1="148" x2={x} y2="335" />
      ))}
    </g>
    <text x="400" y="95" textAnchor="middle" fill="#EFF7FD" fontSize="16" fontWeight="800">
      EXCAVATION, SITE PREPARATION &amp; REINFORCED CONCRETE WORKS
    </text>
  </svg>
);

const TilingFinishingVisual: React.FC<{ variant: 'mosaic' }> = () => (
  <svg
    viewBox="0 0 800 450"
    preserveAspectRatio="xMidYMid slice"
    className="w-full h-full block bg-[#063D5B]"
    role="img"
    aria-label="Pool mosaic tiling and stone coping finishing works"
  >
    <defs>
      <pattern id="mosaicTilePattern" width="36" height="36" patternUnits="userSpaceOnUse">
        <rect width="34" height="34" rx="3" fill="#156D95" />
        <rect x="2" y="2" width="14" height="14" rx="1.5" fill="#62A1C2" />
        <rect x="18" y="2" width="14" height="14" rx="1.5" fill="#38bdf8" opacity="0.75" />
        <rect x="2" y="18" width="14" height="14" rx="1.5" fill="#063D5B" />
        <rect x="18" y="18" width="14" height="14" rx="1.5" fill="#ABCDE9" opacity="0.85" />
      </pattern>
    </defs>
    {/* Stone Coping Top Border */}
    <rect x="0" y="0" width="800" height="92" fill="#DCEBFA" />
    <line x1="160" y1="0" x2="160" y2="92" stroke="#62A1C2" strokeWidth="2" />
    <line x1="340" y1="0" x2="340" y2="92" stroke="#62A1C2" strokeWidth="2" />
    <line x1="520" y1="0" x2="520" y2="92" stroke="#62A1C2" strokeWidth="2" />
    <line x1="680" y1="0" x2="680" y2="92" stroke="#62A1C2" strokeWidth="2" />
    <rect x="0" y="84" width="800" height="12" fill="#ABCDE9" />

    {/* Tiled Pool Wall & Floor */}
    <rect x="0" y="96" width="800" height="354" fill="url(#mosaicTilePattern)" />
    <rect
      x="180"
      y="215"
      width="440"
      height="78"
      rx="12"
      fill="rgba(4,43,65,0.86)"
      stroke="#ABCDE9"
      strokeWidth="2"
    />
    <text x="400" y="260" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800">
      PRECISION MOSAIC TILING &amp; COPING FINISHES
    </text>
  </svg>
);

const JacuzziSaunaVisual: React.FC<{
  variant: 'construction' | 'systems';
}> = ({ variant }) => (
  <svg
    viewBox="0 0 800 450"
    preserveAspectRatio="xMidYMid slice"
    className="w-full h-full block bg-[#042B41]"
    role="img"
    aria-label="Jacuzzi, sauna, and steam wellness construction and systems"
  >
    <rect width="800" height="450" fill="#042B41" />
    {/* Left: Sauna Cabin */}
    <rect
      x="65"
      y="75"
      width="310"
      height="285"
      rx="10"
      fill="#063D5B"
      stroke="#ABCDE9"
      strokeWidth="2.5"
    />
    {/* Timber Bench Slats */}
    <rect x="92" y="220" width="185" height="20" rx="4" fill="#62A1C2" />
    <rect x="92" y="265" width="220" height="22" rx="4" fill="#ABCDE9" />
    {/* Sauna Heater Unit */}
    <rect x="305" y="195" width="46" height="95" rx="6" fill="#156D95" stroke="#DCEBFA" strokeWidth="2" />
    <text x="220" y="125" textAnchor="middle" fill="#DCEBFA" fontSize="15" fontWeight="800">
      SAUNA &amp; STEAM CABIN
    </text>

    {/* Right: Jacuzzi Spa Basin */}
    <rect
      x="425"
      y="75"
      width="310"
      height="285"
      rx="18"
      fill="#156D95"
      stroke="#DCEBFA"
      strokeWidth="2.5"
    />
    <rect
      x="455"
      y="105"
      width="250"
      height="225"
      rx="14"
      fill="#62A1C2"
      stroke="#EFF7FD"
      strokeWidth="2"
    />
    {/* Hydrotherapy Jet Nozzles */}
    {[485, 580, 675].map((cx) => (
      <circle key={cx} cx={cx} cy="218" r="16" fill="#DCEBFA" stroke="#063D5B" strokeWidth="2.5" />
    ))}
    <text x="580" y="155" textAnchor="middle" fill="#042B41" fontSize="15" fontWeight="800">
      JACUZZI HYDROTHERAPY
    </text>

    <text x="400" y="405" textAnchor="middle" fill="#ABCDE9" fontSize="13" fontWeight="700">
      {variant === 'construction'
        ? 'CUSTOM JACUZZI & SAUNA CONSTRUCTION · SPACE & SYSTEM INTEGRATION'
        : 'WATER, HEATING, STEAM & FILTRATION SYSTEMS FOR RELAXATION SPACES'}
    </text>
  </svg>
);
