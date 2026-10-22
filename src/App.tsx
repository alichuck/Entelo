import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Phone, MapPin, ExternalLink, Mail } from 'lucide-react';
import {
  COMPANY_CONTACT,
  NAV_ITEMS,
  PageRoute,
  ServiceInquiryOption,
  getPageTitle,
  resolvePageRoute,
} from './utils/waterCycleLogic';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { NavbarWavyLogo } from './components/WaveLogoIntro';
import { WaterPageTransition } from './components/WaterPageTransition';

function getInitialRoute(): PageRoute {
  if (typeof window === 'undefined') {
    return '/';
  }
  const resolved = window.location.hash
    ? resolvePageRoute(window.location.hash)
    : resolvePageRoute(window.location.pathname);
  return resolved === '/contact' ? '/' : resolved;
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getInitialRoute);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);
  const [servicesResetTrigger, setServicesResetTrigger] = useState(0);

  const scrollToFooterContact = useCallback(() => {
    setMobileMenuOpen(false);
    if (typeof document !== 'undefined') {
      const footerEl = document.getElementById('footer-contact');
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const navigate = useCallback(
    (route: PageRoute) => {
      setMobileMenuOpen(false);
      if (route === '/contact') {
        scrollToFooterContact();
        return;
      }
      if (route === '/services') {
        setServicesResetTrigger((prev) => prev + 1);
      }
      setCurrentRoute(route);
      if (typeof window !== 'undefined') {
        if (window.location.pathname !== route) {
          window.history.pushState({ route }, '', route);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [scrollToFooterContact]
  );

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = getPageTitle(currentRoute);
    }
  }, [currentRoute]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const nextRoute = window.location.hash
        ? resolvePageRoute(window.location.hash)
        : resolvePageRoute(window.location.pathname);
      if (nextRoute === '/contact') {
        scrollToFooterContact();
        return;
      }
      setCurrentRoute(nextRoute);
      setMobileMenuOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [scrollToFooterContact]);

  const handleProblemClick = (problemId: string) => {
    setActiveProblemId(problemId);
    scrollToFooterContact();
  };

  const handleServiceInquire = (_serviceOption: ServiceInquiryOption) => {
    scrollToFooterContact();
  };

  const renderPage = () => {
    switch (currentRoute) {
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/services':
        return (
          <ServicesPage
            activeProblemId={activeProblemId}
            onServiceInquire={handleServiceInquire}
            onProblemClick={handleProblemClick}
            resetTrigger={servicesResetTrigger}
          />
        );
      case '/our-work':
        return <OurWorkPage />;
      case '/':
      default:
        return (
          <HomePage
            onNavigate={navigate}
            onServiceInquire={handleServiceInquire}
          />
        );
    }
  };

  return (
    <div id="home" className="min-h-screen flex flex-col bg-[#ABCDE9] text-[#063D5B]">
      {/* Top Navigation Bar — Sky-to-Cerulean Blue with Upper-Left Wavy Logo flush to the left edge */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#DCEBFA]/95 via-[#ABCDE9]/95 to-[#62A1C2]/95 backdrop-blur-xs border-b-2 border-[#156D95] shadow-sm">
        <div className="w-full pl-2 sm:pl-3 pr-4 sm:pr-6 lg:pr-8 h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Larger Borderless Wavy Logo flush to the left edge */}
          <a
            href="/"
            aria-label={COMPANY_CONTACT.name}
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="inline-flex items-center shrink-0"
          >
            <NavbarWavyLogo />
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#063D5B]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  className={`transition-colors whitespace-nowrap shrink-0 underline-offset-4 ${
                    isActive
                      ? 'text-[#063D5B] font-bold underline decoration-2 decoration-[#063D5B]'
                      : 'text-[#063D5B]/85 hover:text-[#063D5B] hover:underline'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Direct Phone / Contact CTA + Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={COMPANY_CONTACT.phoneHref}
              aria-label={`Call ${COMPANY_CONTACT.phoneDisplay}`}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#063D5B] text-[#ABCDE9] hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href="#footer-contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToFooterContact();
              }}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#063D5B] hover:bg-[#042B41] rounded-full transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              Contact Us
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#063D5B] hover:bg-[#156D95]/20 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation-menu"
            aria-label="Mobile Navigation"
            className="md:hidden bg-[#063D5B] border-b-2 border-[#156D95] px-4 pt-2 pb-5 space-y-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  className={`block px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#ABCDE9] text-[#063D5B] font-bold'
                      : 'text-[#ABCDE9] hover:bg-[#156D95] hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#156D95] px-3.5 flex items-center justify-between text-xs text-[#ABCDE9]">
              <a
                href={COMPANY_CONTACT.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-2"
              >
                {COMPANY_CONTACT.location}
              </a>
              <a
                href={COMPANY_CONTACT.phoneHref}
                className="font-bold text-white underline tabular-nums"
              >
                {COMPANY_CONTACT.phoneDisplay}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 flex flex-col" data-testid="active-page" data-route={currentRoute}>
        <WaterPageTransition routeKey={currentRoute}>
          {renderPage()}
        </WaterPageTransition>
      </main>

      {/* FOOTER — All Contact Info in Footer (No Navigation Links) */}
      <footer
        id="footer-contact"
        aria-label="Contact Water Cycle"
        className="bg-[#042B41] text-[#ABCDE9] py-12 border-t-4 border-[#156D95]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold tracking-wider uppercase mb-3">
              Contact Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              {COMPANY_CONTACT.name} — Let&rsquo;s Talk About Your Water Project
            </h2>
            <p className="mt-1.5 text-sm text-[#DCEBFA] font-medium">
              {COMPANY_CONTACT.tagline} · {COMPANY_CONTACT.servicesSummary}
            </p>
          </div>

          {/* All Verified Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8 border-b border-[#156D95]/60">
            {/* 1. Telephone */}
            <a
              href={COMPANY_CONTACT.phoneHref}
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm min-w-0 overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-[#ABCDE9]">
                  Telephone
                </span>
                <span className="mt-0.5 block text-sm xl:text-base font-bold text-white tabular-nums tracking-wide truncate">
                  {COMPANY_CONTACT.phoneDisplay}
                </span>
              </div>
            </a>

            {/* 2. Location (Google Maps) */}
            <a
              href={COMPANY_CONTACT.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm min-w-0 overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-[#ABCDE9]">
                  Location (Google Maps)
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm xl:text-base font-bold text-white group-hover:text-[#ABCDE9] transition-colors max-w-full">
                  <span className="truncate">{COMPANY_CONTACT.location}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </span>
              </div>
            </a>

            {/* 3. Instagram */}
            <a
              href={COMPANY_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm min-w-0 overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-[#ABCDE9]">
                  Instagram
                </span>
                <span className="mt-0.5 block text-sm xl:text-base font-bold text-white truncate">
                  {COMPANY_CONTACT.instagramHandle}
                </span>
              </div>
            </a>

            {/* 4. Facebook */}
            <a
              href={COMPANY_CONTACT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm min-w-0 overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-[#ABCDE9]">
                  Facebook
                </span>
                <span className="mt-0.5 block text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                  facebook.com/watercycle
                </span>
              </div>
            </a>

            {/* Optional Verified Email (if populated in siteContent.ts) */}
            {COMPANY_CONTACT.verifiedEmail && (
              <a
                href={`mailto:${COMPANY_CONTACT.verifiedEmail}`}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#ABCDE9]">
                    Email
                  </span>
                  <span className="mt-0.5 block text-base font-bold text-white break-all">
                    {COMPANY_CONTACT.verifiedEmail}
                  </span>
                </div>
              </a>
            )}
          </div>

          <div className="mt-6 text-xs text-[#ABCDE9]/75">
            <p>
              &copy; {new Date().getFullYear()} {COMPANY_CONTACT.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
