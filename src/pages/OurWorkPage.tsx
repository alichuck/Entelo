import React from 'react';
import { BeforeAfterSection } from '../components/BeforeAfterSection';
import { PortfolioSection } from '../components/PortfolioSection';

export const OurWorkPage: React.FC = () => {
  return (
    <div>
      {/* 1. BEFORE & AFTER POOL SECTION */}
      <BeforeAfterSection />

      {/* 2. OUR WORK / PORTFOLIO & INSTAGRAM */}
      <PortfolioSection />
    </div>
  );
};

