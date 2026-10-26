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
              src="/images/pool-treatment-clean.jpg"
              alt="Clean, clear sparkling blue swimming pool water after Water Cycle treatment"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Luxury Estate Pool Water Solutions & Circulation',
          caption: 'Comprehensive Water Quality, Circulation & Clarity Maintenance for Private Pools',
          render: () => (
            <img
              src="/images/pool-treatment-villa.jpg"
              alt="Luxury stone villa estate swimming pool with crystal-clear balanced water"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Untreated Green Algae Pool Water Before Recovery',
          caption: 'Algae Overgrowth, Cloudy Visibility & Chemical Imbalance Prior to Treatment',
          render: () => (
            <img
              src="/images/pool-treatment-dirty.jpg"
              alt="Untreated algae-green swimming pool water prior to Water Cycle recovery"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
      ];

    case 'filtration':
      return [
        {
          title: 'Multi-Stage Sand, Carbon & Softener Filtration System',
          caption: 'Water Cycle 3-Vessel Filtration Setup with Anti-Corrosion & Chlorine Dosing',
          render: () => (
            <img
              src="/images/filtration-1.jpg"
              alt="Water Cycle Softener, Carbon Filter, and Sand Filter vessels with dosing tanks and booster pumps"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Commercial & Residential Water Treatment & Filtration',
          caption: 'Water Cycle Softener, Carbon Filter & Sand Filter System with Pressure & Storage Tanks',
          render: () => (
            <img
              src="/images/filtration-2.jpg"
              alt="Water Cycle Softener, Carbon Filter, and Sand Filter installation with pressure and storage tanks"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Automated Filtration Vessels & Dosing Control',
          caption: 'Triple Media Vessels, Cartridge Pre-Filter with Pressure Gauge, Dosing Pump & Brine Tank',
          render: () => (
            <img
              src="/images/filtration-3.jpg"
              alt="Water Cycle triple blue filtration vessels, pre-filter housing, dosing pump, and brine tank"
              className="w-full h-full object-cover object-[center_45%] block"
            />
          ),
        },
      ];

    case 'solar':
      return [
        {
          title: 'Solar Thermal Water-Heating Collector Systems',
          caption: 'Dual Flat-Plate Rooftop Solar Thermal Collectors & Expansion Vessel Installation',
          render: () => (
            <img
              src="/images/solar-1.jpg"
              alt="Rooftop flat-plate solar water heating collectors and expansion vessel installation"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Property Solar Water Heating Integration',
          caption: 'Dual Flat-Plate Solar Thermal Collectors with Rooftop Hot-Water Storage Cylinder',
          render: () => (
            <img
              src="/images/solar-2.jpg"
              alt="Dual flat-plate rooftop solar water heating collectors and horizontal storage tank"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Solar Thermal Circulation & Storage Configuration',
          caption: 'Solflex Solar Energy System with Insulated Hot-Water Tank & Flat-Plate Collector',
          render: () => (
            <img
              src="/images/solar-3.jpg"
              alt="Solflex solar water heating system with rooftop storage cylinder and flat-plate collector"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
      ];

    case 'pool-construction':
      return [
        {
          title: 'Site Excavation, Rebar Grid & Drainage Plumbing',
          caption: 'Ground Excavation, Timber Shoring, Double-Mesh Steel Rebar & Floor Piping Installation',
          render: () => (
            <img
              src="/images/pool-construction-1.jpg"
              alt="Workers tying steel rebar grid mesh across pool floor and walls during excavation"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Reinforced Concrete Pool Basin & Step Construction',
          caption: 'Solid Cast Concrete Pool Walls, Built-In Steps & Pipe Penetrations with Scenic Mountain Backdrop',
          render: () => (
            <img
              src="/images/pool-construction-2.jpg"
              alt="Cast reinforced concrete swimming pool basin with built-in steps and plumbing conduits"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Cantilevered Steel Deck Framing & Chalet Integration',
          caption: 'Structural Steel Deck Subframe, Under-Deck Technical Space & Mountain Chalet Architecture',
          render: () => (
            <img
              src="/images/pool-construction-3.jpg"
              alt="Wooden chalet construction with integrated swimming pool and cantilevered steel deck subframe"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Finished Mosaic-Tiled Pool & Finished Terrace Deck',
          caption: 'Blue Mosaic Tiling, Non-Slip Coping Stones, Stainless Steel Ladder & Complete Terrace Decking',
          render: () => (
            <img
              src="/images/pool-construction-4.jpg"
              alt="Finished mosaic-tiled swimming pool with wooden chalet facade, coping stone, and deck railing"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
      ];

    case 'jacuzzi-sauna-construction':
      return [
        {
          title: 'Jacuzzi Basin Plastering & Waterproof Contouring',
          caption: 'Precision Contouring for Ergonomic Seating, Steps & Hydrotherapy Jet Sleeves',
          render: () => (
            <img
              src="/images/jacuzzi-construction-2.jpg"
              alt="Worker plastering and contouring the concrete basin and seating of a rooftop Jacuzzi"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Solid Concrete & Masonry Jacuzzi Basin Construction',
          caption: 'Reinforced Blockwork, Concrete Core & Hydrotherapy Jet Conduits',
          render: () => (
            <img
              src="/images/jacuzzi-construction-1.jpg"
              alt="Masonry and concrete block construction of a Jacuzzi basin with wall jet fittings and rebar"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Jacuzzi Jet & Air Line Plumbing Infrastructure',
          caption: 'High-Pressure PVC Jet Lines, Air Manifolds & Skimmer Assembly Before Concrete Pouring',
          render: () => (
            <img
              src="/images/jacuzzi-construction-3.jpg"
              alt="Jacuzzi plumbing showing jet lines, air lines, and skimmer inside wooden formwork"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Custom Timber Sauna Cabin Construction',
          caption: 'Precision Wood Framing, Tongue-and-Groove Assembly & Structural Fitting',
          render: () => (
            <img
              src="/images/sauna-construction-1.jpg"
              alt="Worker assembling the structural timber frame and tongue-and-groove walls of a custom indoor sauna cabin"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Sauna Interior Cladding & Bench Craftsmanship',
          caption: 'Handcrafted Timber Bench Levels, Wall Panelling & Sauna Heater Installation',
          render: () => (
            <img
              src="/images/sauna-construction-2.jpg"
              alt="Worker installing cedar wood wall cladding, multi-level benches and heater in a custom sauna room"
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
          title: 'Dual Aeration Blowers & Treatment Tank Setup',
          caption: 'Clean Technical Room Piping, Dual Air Blowers & Treatment Storage Tank',
          render: () => (
            <img
              src="/images/wastewater-2.jpg"
              alt="Dual aeration blowers and treatment tank installation"
              className="w-full h-full object-cover object-[center_58%] block"
            />
          ),
        },
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
          title: 'Regenerative Air Blower & Dosing System',
          caption: 'Water Cycle Dosing Tank, Wall-Mounted Dosing Pump & Side-Channel Blower',
          render: () => (
            <img
              src="/images/wastewater-3.jpg"
              alt="Water Cycle dosing tank, dosing pump, and regenerative air blower"
              className="w-full h-full object-cover object-[center_58%] block"
            />
          ),
        },
      ];

    case 'wellness':
    default:
      return [
        {
          title: 'Rooftop Tiled Jacuzzi with Hydrotherapy Jets',
          caption: 'Built-In Jacuzzi System with Marble-Effect Tiling, Jets & Glass Balustrade',
          render: () => (
            <img
              src="/images/jacuzzi-sauna-1.jpg"
              alt="Rooftop tiled Jacuzzi with active hydrotherapy jets and glass balustrade overlooking the sea"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Curved Timber Sauna with Electric Heater',
          caption: 'Curved Wooden Bench Seating, Slatted Flooring & Electric Sauna Heater',
          render: () => (
            <img
              src="/images/jacuzzi-sauna-2.jpg"
              alt="Curved timber sauna interior with slatted bench and electric sauna heater"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Sauna Heating System & Interior Finishing',
          caption: 'Solid Wood Wall Cladding, Bench Detailing & Stone Sauna Heater',
          render: () => (
            <img
              src="/images/jacuzzi-sauna-3.jpg"
              alt="Sauna interior with wood cladding, slatted benches and stone heater"
              className="w-full h-full object-cover object-center block"
            />
          ),
        },
        {
          title: 'Indoor Sauna Room with Digital Controls',
          caption: 'Timber Sauna Cabin with Digital Control Panel Integrated into Marble Interior',
          render: () => (
            <img
              src="/images/jacuzzi-sauna-4.jpg"
              alt="Indoor timber sauna room entrance with digital control panel and marble walls"
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
