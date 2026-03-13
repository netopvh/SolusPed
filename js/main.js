/**
 * SolusPed - Landing Page JavaScript
 * ==================================
 */

document.addEventListener('DOMContentLoaded', function () {
  initLucideIcons();
  initNavbarScroll();
  initMobileMenu();
  initScrollAnimations();
  initStatsCounter();
  initAccordion();
  initPricingToggle();
  initSmoothScroll();
  initScrollToTop();
});

/** Inicializa os ícones Lucide */
function initLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/** Efeito de scroll na navbar */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener(
    'scroll',
    function () {
      const currentScroll = window.pageYOffset;
      navbar.classList.toggle('is-scrolled', currentScroll > 50);
    },
    { passive: true }
  );
}

/** Menu mobile */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!mobileMenuBtn || !mobileMenu || !mobileOverlay) return;

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    mobileOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    mobileOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));
}

/** Animações de scroll */
function initScrollAnimations() {
  const scrollElements = document.querySelectorAll('.scroll-animate');
  if (!scrollElements.length) return;

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px' }
  );

  scrollElements.forEach((el) => scrollObserver.observe(el));
}

/** Animação do contador de estatísticas */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-number');
  if (!statElements.length) return;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statElements.forEach((el) => statsObserver.observe(el));
}

function animateStat(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals) || 0;
  const duration = 2000;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = target * easeOut;

    el.textContent =
      decimals > 0 ? current.toFixed(decimals) + suffix : Math.floor(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

/** Accordion FAQ */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      accordionItems.forEach((otherItem) => otherItem.classList.remove('is-open'));

      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
}

/** Toggle de preços mensal/anual */
function initPricingToggle() {
  const billingToggle = document.getElementById('billing-toggle');
  const monthlyLabel = document.getElementById('monthly-label');
  const yearlyLabel = document.getElementById('yearly-label');
  const discountBadge = document.getElementById('discount-badge');
  const priceMonthlies = document.querySelectorAll('.price-monthly');
  const priceYearlies = document.querySelectorAll('.price-yearly');
  const yearlyTexts = document.querySelectorAll('.yearly-text');

  if (!billingToggle) return;

  let isYearly = false;

  billingToggle.addEventListener('click', () => {
    isYearly = !isYearly;

    const toggleSpan = billingToggle.querySelector('span');
    if (toggleSpan) {
      toggleSpan.style.transform = isYearly ? 'translateX(28px)' : 'translateX(0)';
    }
    billingToggle.setAttribute('aria-checked', isYearly);
    billingToggle.style.backgroundColor = isYearly ? '#8B1E1E' : '#E5E5E5';

    if (monthlyLabel) {
      monthlyLabel.classList.toggle('text-gray-900', !isYearly);
      monthlyLabel.classList.toggle('text-gray-500', isYearly);
    }
    if (yearlyLabel) {
      yearlyLabel.classList.toggle('text-gray-900', isYearly);
      yearlyLabel.classList.toggle('text-gray-500', !isYearly);
    }
    if (discountBadge) {
      discountBadge.classList.toggle('hidden', !isYearly);
    }

    priceMonthlies.forEach((el) => el.classList.toggle('hidden', isYearly));
    priceYearlies.forEach((el) => el.classList.toggle('hidden', !isYearly));
    yearlyTexts.forEach((el) => el.classList.toggle('hidden', !isYearly));
  });
}

/** Botão scroll to top */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');
  if (!scrollBtn) return;

  const scrollThreshold = 400;

  function toggleVisibility() {
    if (window.pageYOffset > scrollThreshold) {
      scrollBtn.classList.add('is-visible');
    } else {
      scrollBtn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

/** Scroll suave para âncoras */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}
