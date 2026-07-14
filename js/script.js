// ============ HEADER SCROLL STATE ============
const siteHeader = document.getElementById('siteHeader');
const scrollTopBtn = document.getElementById('scrollTop');

function onScroll() {
  const scrolled = window.scrollY > 40;
  siteHeader.classList.toggle('scrolled', scrolled);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============ MOBILE NAV TOGGLE ============
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mainNav.classList.toggle('open');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mainNav.classList.remove('open');
  });
});

// ============ CUSTOM CURSOR ============
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (!isTouch) {
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .work-card, .service-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
} else {
  cursorDot.style.display = 'none';
  cursorRing.style.display = 'none';
}

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============ ANIMATED COUNTERS ============
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ============ MAGNETIC BUTTONS ============
if (!isTouch) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ============ WORK CARD TILT ============
if (!isTouch) {
  document.querySelectorAll('.work-thumb').forEach(thumb => {
    thumb.addEventListener('mousemove', (e) => {
      const rect = thumb.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      thumb.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    thumb.addEventListener('mouseleave', () => {
      thumb.style.transform = '';
    });
  });
}

// ============ SERVICE DETAIL MODAL ============
const serviceData = {
  webdesign: {
    tag: 'Webdesign',
    gradient: 'thumb-1',
    description: 'Wir gestalten individuelle, responsive Websites, die auf jedem Gerät ihre volle Wirkung entfalten. Jedes Projekt beginnt mit einer klaren Strategie: Wer ist Ihre Zielgruppe, was soll die Website erreichen, und wie hebt sich Ihre Marke von der Konkurrenz ab? Das Ergebnis sind maßgeschneiderte Designs, die exakt auf Ihre Ziele abgestimmt sind — schnell, zugänglich und auf allen Bildschirmgrößen gestochen scharf.',
    features: [
      'Individuelles, responsives Design für alle Endgeräte',
      'Suchmaschinenoptimierte Struktur von Anfang an',
      'Schnelle Ladezeiten durch performante Umsetzung',
      'Content-Management-System nach Wahl',
      'Ausführliches Cross-Browser- und Device-Testing'
    ],
    duration: '3–6 Wochen',
    idealFor: 'Unternehmen, die einen professionellen digitalen Auftritt aufbauen möchten'
  },
  uiux: {
    tag: 'UI/UX Design',
    gradient: 'thumb-3',
    description: 'Gutes Design ist unsichtbar — es führt Nutzer:innen intuitiv zum Ziel. Wir entwickeln Wireframes, Prototypen und User Flows, die auf echten Nutzerbedürfnissen basieren, testen sie mit Ihrer Zielgruppe und verfeinern jedes Detail, bis Bedienung und Ästhetik perfekt zusammenspielen.',
    features: [
      'Nutzerforschung & Zielgruppenanalyse',
      'Wireframes und klickbare Prototypen',
      'Usability-Tests mit echten Nutzer:innen',
      'Konsistentes Design-System / Komponenten-Bibliothek',
      'Barrierefreiheit nach WCAG-Richtlinien'
    ],
    duration: '2–4 Wochen',
    idealFor: 'Produkte und Plattformen mit komplexen Nutzerinteraktionen'
  },
  branding: {
    tag: 'Branding & Identity',
    gradient: 'thumb-2',
    description: 'Eine starke Marke beginnt mit einer klaren visuellen Sprache. Wir entwickeln Logo, Farbwelt, Typografie und Bildsprache aus einem Guss — konsistent über alle Kontaktpunkte hinweg. So wird Ihre Marke sofort wiedererkennbar, ob auf der Website, in Social Media oder auf gedruckten Materialien.',
    features: [
      'Logo-Design und Markenzeichen',
      'Farbpalette & Typografie-System',
      'Styleguide / Brand-Book',
      'Bildsprache und Icon-Set',
      'Anwendung auf digitalen & gedruckten Medien'
    ],
    duration: '2–5 Wochen',
    idealFor: 'Neugründungen und Marken im Relaunch'
  },
  ecommerce: {
    tag: 'E-Commerce Design',
    gradient: 'thumb-4',
    description: 'Ein Onlineshop muss mehr leisten als gut auszusehen — er muss verkaufen. Wir gestalten Customer Journeys, die Vertrauen aufbauen, Kaufhürden abbauen und den Checkout so reibungslos wie möglich machen. Von der Produktseite bis zur Bestellbestätigung wird jeder Schritt auf Conversion optimiert.',
    features: [
      'Conversion-optimierte Produkt- & Kategorieseiten',
      'Reibungsloser, mehrstufiger Checkout-Prozess',
      'Integration gängiger Shop-Systeme (Shopify, WooCommerce u.a.)',
      'Trust-Elemente wie Bewertungen und Gütesiegel',
      'Mobile-First-Optimierung für unterwegs'
    ],
    duration: '4–8 Wochen',
    idealFor: 'Marken mit eigenem Onlinehandel'
  },
  landingpage: {
    tag: 'Landingpages',
    gradient: 'thumb-6',
    description: 'Für Kampagnen zählt jede Sekunde Aufmerksamkeit. Wir gestalten fokussierte Landingpages mit klarer Botschaft, starkem Storytelling und eindeutigem Call-to-Action — ohne Ablenkung, dafür mit maximaler Wirkung auf Ihre Conversion-Rate.',
    features: [
      'Klare Struktur mit einem einzigen Conversion-Ziel',
      'A/B-Test-taugliches Aufbauprinzip',
      'Extrem schnelle Ladezeiten',
      'Nahtlose Integration mit Ad- & Analytics-Tools',
      'Abstimmung mit starkem Copywriting'
    ],
    duration: '1–2 Wochen',
    idealFor: 'Produktlaunches, Kampagnen und Events'
  },
  wartung: {
    tag: 'Wartung & Support',
    gradient: 'thumb-5',
    description: 'Nach dem Launch beginnt die eigentliche Arbeit: Ihre Website soll sicher, aktuell und performant bleiben. Wir übernehmen laufende Updates, überwachen die Performance und stehen bei Fragen oder Anpassungen als verlässlicher Partner an Ihrer Seite.',
    features: [
      'Regelmäßige Updates & Sicherheits-Patches',
      'Performance- und Uptime-Monitoring',
      'Regelmäßige Backups',
      'Priorisierter Support bei Fragen und Änderungen',
      'Monatliche Reports zu Traffic & Performance'
    ],
    duration: 'Laufend, monatliche Betreuung',
    idealFor: 'Unternehmen, die sich um IT-Details keine Sorgen machen möchten'
  }
};

const serviceCards = document.querySelectorAll('.service-card');
const serviceModalBackdrop = document.getElementById('serviceModalBackdrop');
const serviceModal = document.getElementById('serviceModal');
const serviceModalClose = document.getElementById('serviceModalClose');
const serviceModalVisual = document.getElementById('serviceModalVisual');
const serviceModalIcon = document.getElementById('serviceModalIcon');
const serviceModalTag = document.getElementById('serviceModalTag');
const serviceModalTitle = document.getElementById('serviceModalTitle');
const serviceModalDesc = document.getElementById('serviceModalDesc');
const serviceModalFeatures = document.getElementById('serviceModalFeatures');
const serviceModalDuration = document.getElementById('serviceModalDuration');
const serviceModalIdealFor = document.getElementById('serviceModalIdealFor');

let lastFocusedCard = null;
const checkIconSvg = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function openServiceModal(card) {
  const key = card.dataset.service;
  const data = serviceData[key];
  if (!data) return;

  lastFocusedCard = card;

  serviceModalVisual.className = 'service-modal-visual ' + data.gradient;
  serviceModalIcon.innerHTML = card.querySelector('.service-icon').innerHTML;
  serviceModalTag.textContent = data.tag;
  serviceModalTitle.textContent = card.querySelector('h3').textContent;
  serviceModalDesc.textContent = data.description;
  serviceModalDuration.textContent = data.duration;
  serviceModalIdealFor.textContent = data.idealFor;
  serviceModalFeatures.innerHTML = data.features
    .map(f => `<li>${checkIconSvg}<span>${f}</span></li>`)
    .join('');

  document.body.classList.add('modal-open');
  serviceModalBackdrop.classList.add('open');
  serviceModalClose.focus();
}

function closeServiceModal() {
  serviceModalBackdrop.classList.remove('open');
  document.body.classList.remove('modal-open');
  if (lastFocusedCard) lastFocusedCard.focus();
}

serviceCards.forEach(card => {
  card.addEventListener('click', () => openServiceModal(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openServiceModal(card);
    }
  });
});

serviceModalClose.addEventListener('click', closeServiceModal);
serviceModalBackdrop.addEventListener('click', (e) => {
  if (e.target === serviceModalBackdrop) closeServiceModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && serviceModalBackdrop.classList.contains('open')) {
    closeServiceModal();
  }
});
serviceModal.querySelector('#serviceModalCta').addEventListener('click', closeServiceModal);

// ============ CONTACT FORM (DEMO SUBMIT) ============
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Danke! Ihre Nachricht wurde erfasst — wir melden uns in Kürze.';
  contactForm.reset();
});
