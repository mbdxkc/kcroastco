/**
 * ============================================================================
 * kc roast co — Header Component
 * ============================================================================
 * @project    kc roast co case study
 * @version    0.3
 * @author     Valdez Campos <dez@mediabrilliance.io>
 * @date       2026-01-22
 * @file       /js/header.js
 *
 * @desc       Injects the site header navigation into
 *             <header id="site-header">.
 *             Applies active + aria-current state based on URL.
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. PAGE DETECTION
   * -------------------------------------------------------------------------- */
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  const isHome    = page === 'index.html';
  const isMenu    = page === 'menu.html';
  const isShop    = page === 'shop.html';
  const isAbout   = page === 'about.html';
  const isContact = page === 'contact.html';

  /* --------------------------------------------------------------------------
   * 2. ACTIVE / ARIA HELPER
   * -------------------------------------------------------------------------- */
  const linkAttrs = (active) =>
    active
      ? ' class="is-active" aria-current="page"'
      : '';

  /* --------------------------------------------------------------------------
   * 3. HEADER TEMPLATE (MATCHES CSS EXACTLY)
   * -------------------------------------------------------------------------- */
  const headerHTML = `
    <div class="header-grid">
      <nav class="nav" aria-label="primary navigation">

        <!-- MOBILE TOGGLE -->
        <button class="nav-toggle" aria-label="open menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- LEFT: PAGE LINKS -->
        <div class="nav-left-section">
          <a href="/index.html"${linkAttrs(isHome)}>home</a>
          <a href="/menu.html"${linkAttrs(isMenu)}>menu</a>
          <a href="/shop.html"${linkAttrs(isShop)}>shop</a>
          <a href="/about.html"${linkAttrs(isAbout)}>about</a>
          <a href="/contact.html"${linkAttrs(isContact)}>contact</a>
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

  /* --------------------------------------------------------------------------
   * 4. INSERT HEADER
   * -------------------------------------------------------------------------- */
  function insertHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    headerEl.innerHTML = headerHTML;
  }

  /* --------------------------------------------------------------------------
   * 5. INIT
   * -------------------------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertHeader);
  } else {
    insertHeader();
  }

})();
