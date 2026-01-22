/**
 * ============================================================================
 * kc roast co — Header Component
 * ============================================================================
 * @project    kc roast co case study
 * @version    0.2
 * @author     Valdez Campos <dez@mediabrilliance.io>
 * @date       2026-01-21
 * @file       /js/header.js
 *
 * @desc       Reusable header component that injects site navigation
 *             into <header id="site-header">.
 *             Automatically detects the current page and applies
 *             aria-current + active state styling.
 *
 * @usage      Add <header id="site-header"></header> to HTML
 *             Include this script with the `defer` attribute
 *
 * @exports    none (IIFE)
 * ============================================================================
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. PAGE DETECTION
  // ---------------------------------------------------------------------------
  const currentPath = window.location.pathname;
  const page = currentPath.split('/').pop() || 'index.html';

  const isHome     = page === '' || page === 'index.html';
  const isMenu     = page === 'menu.html';
  const isShop     = page === 'shop.html';
  const isAbout    = page === 'about.html';
  const isContact  = page === 'contact.html';

  // ---------------------------------------------------------------------------
  // 2. ARIA + ACTIVE STATE HELPERS
  // ---------------------------------------------------------------------------
  const aria = (condition) =>
    condition ? ' aria-current="page" class="nav-link is-active"' : ' class="nav-link"';

  // ---------------------------------------------------------------------------
  // 3. HEADER HTML TEMPLATE
  //    Grid: left (pages) | center (logo) | right (social)
  // ---------------------------------------------------------------------------
  const headerHTML = `
    <div class="header-grid">
      <nav class="nav" aria-label="primary navigation">

        <!-- LEFT: PAGE LINKS -->
        <div class="pages">
          <a href="/index.html"${aria(isHome)}>home</a>
          <a href="/menu.html"${aria(isMenu)}>menu</a>
          <a href="/shop.html"${aria(isShop)}>shop</a>
          <a href="/about.html"${aria(isAbout)}>about</a>
          <a href="/contact.html"${aria(isContact)}>contact</a>
        </div>

        <!-- CENTER: LOGO -->
        <div class="header-title">
          <a href="/index.html" aria-label="kc roast co home">
            <img
              src="/images/kcroastco_logo.svg"
              alt="kc roast co"
              width="180"
              height="48"
              loading="eager"
              decoding="async"
            />
          </a>
        </div>

        <!-- RIGHT: SOCIAL -->
        <div class="socials">
          <a
            href="https://www.instagram.com/kcroastco/"
            class="nav-link--social"
            aria-label="kc roast co on instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/instagram_dark.svg" alt="" aria-hidden="true" />
          </a>
        </div>

      </nav>
    </div>
  `;

  // ---------------------------------------------------------------------------
  // 4. DOM INSERTION
  // ---------------------------------------------------------------------------
  function insertHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    headerEl.innerHTML = headerHTML;
  }

  // ---------------------------------------------------------------------------
  // 5. INIT
  // ---------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertHeader);
  } else {
    insertHeader();
  }

})();
