import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeBeforeAfterState,
  validateContactForm,
  resolveProblemSelection,
  filterPortfolioItems,
  shouldShowReviewsSection,
  resolvePageRoute,
  getPageTitle,
  NAV_ITEMS,
  CORE_SERVICES,
  CONSTRUCTION_SERVICES,
  CONSTRUCTION_OVERVIEW,
  ADDITIONAL_SERVICES,
  PORTFOLIO_ITEMS,
  PROBLEM_SOLUTIONS,
  COMPANY_CONTACT,
} from './waterCycleLogic.ts';

test('Company contact details match verified Adma, Lebanon brief without unverified email', () => {
  assert.equal(COMPANY_CONTACT.name, 'Water Cycle');
  assert.equal(COMPANY_CONTACT.location, 'Adma, Lebanon');
  assert.equal(COMPANY_CONTACT.locationUrl, 'https://maps.app.goo.gl/xUvJJ1G21bk9j6t96');
  assert.equal(COMPANY_CONTACT.phoneDisplay, '+961 3 058 204');
  assert.equal(COMPANY_CONTACT.phoneHref, 'tel:+9613058204');
  assert.equal(COMPANY_CONTACT.whatsappUrl, 'https://wa.me/9613058204');
  assert.equal(COMPANY_CONTACT.instagramUrl, 'https://www.instagram.com/water__cycle/');
  assert.equal(COMPANY_CONTACT.facebookUrl, 'https://www.facebook.com/watercycle/');
  assert.equal(COMPANY_CONTACT.tiktokHandle, '@water1cycle');
  assert.equal(COMPANY_CONTACT.tiktokUrl, 'https://www.tiktok.com/@water1cycle?_r=1&_t=ZS-9AxbcekK4aD');
  assert.equal(COMPANY_CONTACT.verifiedEmail, '');
});

test('Primary, Construction, and Additional Services match the required structure', () => {
  assert.equal(CORE_SERVICES.length, 3);
  assert.equal(CONSTRUCTION_SERVICES.length, 5);
  assert.equal(ADDITIONAL_SERVICES.length, 2);
  assert.equal(CORE_SERVICES[0].title, 'Swimming Pool Solutions');
  assert.equal(CORE_SERVICES[1].title, 'Water Treatment & Filtration');
  assert.equal(CORE_SERVICES[2].title, 'Solar Water Heating');
  assert.equal(CONSTRUCTION_OVERVIEW.sectionTitle, 'Pool & Leisure Construction');
  assert.equal(CONSTRUCTION_OVERVIEW.sectionSubtitle, 'From Planning to Reality');
  assert.equal(CONSTRUCTION_SERVICES[0].title, 'Swimming Pool Construction');
  assert.equal(CONSTRUCTION_SERVICES[1].title, 'Jacuzzi & Sauna Construction');
  assert.equal(CONSTRUCTION_SERVICES[2].title, 'Site Assessment & Space Planning');
  assert.equal(CONSTRUCTION_SERVICES[3].title, 'Excavation & Concrete Works');
  assert.equal(CONSTRUCTION_SERVICES[4].title, 'Tiling & Finishing');
  assert.equal(ADDITIONAL_SERVICES[0].title, 'Sewage & Wastewater Treatment');
  assert.equal(ADDITIONAL_SERVICES[1].title, 'Jacuzzi, Sauna & Steam Systems');
});

test('Before & After slider logic never reverses BEFORE (dirty-green left) and AFTER (clean-blue right)', () => {
  const mid = computeBeforeAfterState(50);
  assert.equal(mid.leftSideLabel, 'BEFORE');
  assert.equal(mid.leftSidePoolState, 'dirty-green');
  assert.equal(mid.rightSideLabel, 'AFTER');
  assert.equal(mid.rightSidePoolState, 'clean-blue');
  assert.equal(mid.beforeOverlayClipPath, 'inset(0 50% 0 0)');
  assert.equal(mid.beforeVisibleWidthPercent, 50);
  assert.equal(mid.afterVisibleWidthPercent, 50);

  const mostlyBefore = computeBeforeAfterState(85);
  assert.equal(mostlyBefore.beforeOverlayClipPath, 'inset(0 15% 0 0)');
  assert.equal(mostlyBefore.beforeVisibleWidthPercent, 85);
  assert.equal(mostlyBefore.afterVisibleWidthPercent, 15);

  const clampedLow = computeBeforeAfterState(-20);
  assert.equal(clampedLow.clampedPercentage, 0);

  const clampedHigh = computeBeforeAfterState(140);
  assert.equal(clampedHigh.clampedPercentage, 100);
});

test('Problem-to-Solution mapping covers all 5 service categories + general inquiry', () => {
  assert.equal(PROBLEM_SOLUTIONS.length, 6);

  const greenPool = resolveProblemSelection('green-dirty-pool');
  assert.equal(greenPool.service, 'Swimming Pool Solutions');

  const filtration = resolveProblemSelection('water-filtration-problems');
  assert.equal(filtration.service, 'Water Treatment & Filtration');

  const solar = resolveProblemSelection('solar-water-needs');
  assert.equal(solar.service, 'Solar Water Heating');

  const wastewater = resolveProblemSelection('wastewater-needs');
  assert.equal(wastewater.service, 'Sewage & Wastewater Treatment');

  const wellness = resolveProblemSelection('wellness-facility-needs');
  assert.equal(wellness.service, 'Jacuzzi, Sauna & Steam Systems');

  const existing = resolveProblemSelection('existing-system-attention');
  assert.equal(existing.service, 'Other');
});

test('Contact form validation rejects empty/malformed inputs, blocks honeypot spam, and accepts valid phone or email', () => {
  const emptyResult = validateContactForm({
    name: '   ',
    contactInfo: '',
    service: 'Swimming Pool Solutions',
    message: '',
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.contactInfo);
  assert.ok(emptyResult.errors.message);

  const spamResult = validateContactForm({
    name: 'Bot',
    contactInfo: '+961 3 058 204',
    service: 'Swimming Pool Solutions',
    message: 'Spam message here',
    honeypot: 'http://spam.example.com',
  });
  assert.equal(spamResult.isValid, false);
  assert.equal(spamResult.isSpam, true);

  const validPhoneResult = validateContactForm({
    name: 'Karim Haddad',
    contactInfo: '+961 3 058 204',
    service: 'Swimming Pool Solutions',
    message: 'Our pool water turned green and needs treatment.',
  });
  assert.equal(validPhoneResult.isValid, true);
  assert.deepEqual(validPhoneResult.errors, {});

  const validEmailResult = validateContactForm({
    name: 'Nadia Khoury',
    contactInfo: 'nadia@example.com',
    service: 'Water Treatment & Filtration',
    message: 'Looking for a water filtration system solution.',
  });
  assert.equal(validEmailResult.isValid, true);
});

test('Portfolio items are organized under unified Projects category with images and descriptions', () => {
  const all = filterPortfolioItems(PORTFOLIO_ITEMS, 'All');
  assert.equal(all.length, 10);

  const projects = filterPortfolioItems(PORTFOLIO_ITEMS, 'Projects');
  assert.equal(projects.length, 10);
  assert.ok(projects.every((i) => i.category === 'Projects'));
  assert.ok(projects.every((i) => i.imageUrl.length > 0));
  assert.ok(projects.every((i) => i.whatWasDone.length > 0));

  // Verify Project 1 is the Hiyata construction project with 3 stage images
  const hiyataProject = PORTFOLIO_ITEMS[0];
  assert.equal(hiyataProject.location, 'Hiyata');
  assert.equal(hiyataProject.images?.length, 3);
  assert.equal(hiyataProject.imageStages?.length, 3);
  assert.ok(hiyataProject.description.includes('Hiyata'));

  // Verify Project 2 is the Baouchriye rooftop pool project with 3 stage images
  const baouchriyeProject = PORTFOLIO_ITEMS[1];
  assert.equal(baouchriyeProject.location, 'Baouchriye');
  assert.equal(baouchriyeProject.images?.length, 3);
  assert.equal(baouchriyeProject.imageStages?.length, 3);
  assert.ok(baouchriyeProject.description.includes('Baouchriye'));

  // Verify Project 3 is the Yahchouch mountain pool project with 3 stage images
  const yahchouchProject = PORTFOLIO_ITEMS[2];
  assert.equal(yahchouchProject.location, 'Yahchouch');
  assert.equal(yahchouchProject.images?.length, 3);
  assert.equal(yahchouchProject.imageStages?.length, 3);
  assert.ok(yahchouchProject.description.includes('Yahchouch'));

  // Verify Project 4 is the freeform lagoon pool and jacuzzi project in Ghazir with 2 stage images
  const freeformProject = PORTFOLIO_ITEMS[3];
  assert.equal(freeformProject.location, 'Ghazir');
  assert.equal(freeformProject.images?.length, 2);
  assert.equal(freeformProject.imageStages?.length, 2);
  assert.ok(freeformProject.description.includes('freeform'));

  // Verify Project 5 is the Maaysrah water treatment project
  const maaysrahProject = PORTFOLIO_ITEMS[4];
  assert.equal(maaysrahProject.location, 'Maaysrah');
  assert.ok((maaysrahProject.images?.length ?? 0) >= 2);
  assert.ok(maaysrahProject.description.includes('Maaysrah'));

  // Verify Project 6 is the filtration & UV water treatment project
  const filtrationProject = PORTFOLIO_ITEMS[5];
  assert.ok((filtrationProject.images?.length ?? 0) >= 2);
  assert.ok(filtrationProject.description.includes('filtration'));

  // Verify Project 7 is the commercial RO & solar filtration project
  const roProject = PORTFOLIO_ITEMS[6];
  assert.ok((roProject.images?.length ?? 0) >= 2);
  assert.ok(roProject.description.includes('filtration'));

  // Verify Project 8 is the solar water heating panel project
  const solarProject = PORTFOLIO_ITEMS[7];
  assert.equal(solarProject.images?.length, 2);
  assert.ok(solarProject.description.includes('solar'));

  // Verify Project 9 is the rooftop infinity Jacuzzi project
  const jacuzziProject = PORTFOLIO_ITEMS[8];
  assert.equal(jacuzziProject.images?.length, 2);
  assert.ok(jacuzziProject.description.includes('Jacuzzi'));

  // Verify Project 10 is the Water Treatment for Pools project with 5 images
  const poolWaterTreatmentProject = PORTFOLIO_ITEMS[9];
  assert.equal(poolWaterTreatmentProject.title, 'Water Treatment for Pools');
  assert.equal(poolWaterTreatmentProject.images?.length, 5);
  assert.equal(poolWaterTreatmentProject.imageStages?.length, 5);
  assert.ok(poolWaterTreatmentProject.description.toLowerCase().includes('water treatment for pools'));
});

test('Reviews section hides by default when no real reviews exist and renders when populated', () => {
  assert.equal(shouldShowReviewsSection([]), false);
  assert.equal(
    shouldShowReviewsSection([
      {
        id: 'r1',
        customerName: 'Verified Client',
        serviceCategory: 'Swimming Pool Solutions',
        comment: 'Clear water restored.',
        dateLabel: '2026',
      },
    ]),
    true
  );
});

test('Multi-page route resolver maps clean paths, legacy hashes, and unknown paths to the 4 pages', () => {
  assert.equal(NAV_ITEMS.length, 4);
  assert.equal(resolvePageRoute('/'), '/');
  assert.equal(resolvePageRoute('/about'), '/about');
  assert.equal(resolvePageRoute('/services/'), '/services');
  assert.equal(resolvePageRoute('/our-work'), '/our-work');
  assert.equal(resolvePageRoute('/projects'), '/our-work');
  assert.equal(resolvePageRoute('/unknown-page'), '/');

  assert.ok(getPageTitle('/services').includes('Services'));
  assert.ok(getPageTitle('/our-work').includes('Our Work'));
});
