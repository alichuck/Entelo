import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import {
  COMPANY_CONTACT,
  NAV_ITEMS,
  PageRoute,
  ServiceInquiryOption,
  getPageTitle,
  resolvePageRoute,
  resolveProblemSelection,
} from './utils/waterCycleLogic';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { ContactPage } from './pages/ContactPage';
import { NavbarWavyLogo } from './components/WaveLogoIntro';

function getInitialRoute(): PageRoute {
  if (typeof window === 'undefined') {
    return '/';
  }
  if (window.location.hash) {
    return resolvePageRoute(window.location.hash);
  }
  return resolvePageRoute(window.location.pathname);
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getInitialRoute);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<ServiceInquiryOption>('Swimming Pool Solutions');
  const [suggestedProblemMessage, setSuggestedProblemMessage] = useState('');
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);

  const navigate = useCallback((route: PageRoute) => {
    setMobileMenuOpen(false);
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
      const targetUrl = route === '/' ? `${base}/` : `${base}${route}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ route }, '', targetUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

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
      setCurrentRoute(nextRoute);
      setMobileMenuOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleProblemClick = (problemId: string) => {
    setActiveProblemId(problemId);
    const resolved = resolveProblemSelection(problemId);
    setSelectedService(resolved.service);
    setSuggestedProblemMessage(resolved.suggestedMessage);
    navigate('/contact');
  };

  const handleServiceInquire = (serviceOption: ServiceInquiryOption) => {
    setSelectedService(serviceOption);
    navigate('/contact');
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
          />
        );
      case '/our-work':
        return <OurWorkPage />;
      case '/contact':
        return (
          <ContactPage
            selectedService={selectedService}
            suggestedProblemMessage={suggestedProblemMessage}
            onServiceChange={setSelectedService}
          />
        );
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
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
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

      <main className="flex-1" data-testid="active-page" data-route={currentRoute}>
        {renderPage()}
      </main>

      {/* H. FOOTER — Water Cycle branding, concise navigation, and copyright (contact details kept exclusively on Contact Us page) */}
      <footer className="bg-[#042B41] text-[#ABCDE9] py-10 border-t-2 border-[#156D95]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#156D95]/60">
            <div>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="text-lg font-bold text-white tracking-wider uppercase font-display"
              >
                {COMPANY_CONTACT.name}
              </a>
              <p className="mt-1 text-sm text-[#DCEBFA] font-medium">
                {COMPANY_CONTACT.tagline}
              </p>
              <p className="mt-1 text-xs text-[#ABCDE9]/80">
                {COMPANY_CONTACT.servicesSummary}
              </p>
            </div>

            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center gap-6 text-sm text-[#ABCDE9]"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  className={`hover:text-white transition-colors whitespace-nowrap ${
                    currentRoute === item.path ? 'text-white font-semibold underline underline-offset-4' : ''
                  }`}
                >
                  {item.footerLabel}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#ABCDE9]/75">
            <p>
              &copy; {new Date().getFullYear()} {COMPANY_CONTACT.name}. All rights reserved.
            </p>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
              className="text-white font-semibold hover:text-[#ABCDE9] underline underline-offset-4"
            >
              Get in Touch →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
