/**
 * ============================================================================
 * kc roast co — Header Component
 * ============================================================================
 *
 * @project    kc roast co case study
 * @version    1.0.0
 * @author     Valdez Campos <dez@mediabrilliance.io>
 * @date       2026-01-22
 * @file       /js/header.js
 *
 * @desc       Dynamically injects the site header navigation into the
 *             <header id="site-header"> element. Handles:
 *             - Active page state detection based on URL
 *             - ARIA attributes for accessibility
 *             - Logo and icon hover effects (image swapping)
 *             - Responsive navigation structure
 *
 * @usage      Include this script with defer attribute:
 *             <script src="/js/header.js" defer></script>
 *
 * @requires   - DOM element: <header id="site-header">
 *             - CSS classes defined in /style.css
 *             - SVG/image assets in /images/
 *
 * @a11y       - aria-label on navigation landmark
 *             - aria-current="page" on active links
 *             - aria-expanded on mobile toggle
 *             - Screen reader text for icon-only links
 *
 * @exports    None (self-executing IIFE)
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. PAGE DETECTION
   * --------------------------------------------------------------------------
   * Determines current page from URL pathname to set active navigation state.
   * Falls back to 'index.html' for root path.
   * -------------------------------------------------------------------------- */
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  // Page state flags for navigation highlighting
  const isHome = page === '' || page === 'index.html';
  const isMenu = page === 'menu.html';
  const isShop = page === 'shop.html';

  /* --------------------------------------------------------------------------
   * 2. ACTIVE / ARIA HELPER
   * --------------------------------------------------------------------------
   * Returns class and ARIA attributes for active navigation links.
   * Provides visual indication and screen reader announcement.
   *
   * @param {boolean} active - Whether this link is the current page
   * @returns {string} - HTML attributes string or empty string
   * -------------------------------------------------------------------------- */
  const linkAttrs = (active) =>
    active
      ? ' class="is-active" aria-current="page"'
      : '';

  /* --------------------------------------------------------------------------
   * 3. HEADER TEMPLATE
   * --------------------------------------------------------------------------
   * HTML template for the complete header structure including:
   * - Mobile hamburger toggle (hidden on desktop)
   * - Left navigation links (home, menu, shop)
   * - Center logo with hover effect
   * - Right social/utility icons with hover effects
   *
   * Note: Uses template literal for cleaner multi-line HTML.
   * Image hover effects are handled via CSS (show/hide classes).
   * -------------------------------------------------------------------------- */
  const headerHTML = `
    <div class="header-grid">
      <nav class="nav" aria-label="Primary navigation">

        <!-- MOBILE TOGGLE (hidden on desktop via CSS) -->
        <button
          class="nav-toggle"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- LEFT: PAGE LINKS -->
        <div class="nav-left-section">
          <a href="/index.html"${linkAttrs(isHome)}>home</a>
          <a href="/menu.html"${linkAttrs(isMenu)}>menu</a>
          <a href="/shop.html"${linkAttrs(isShop)}>shop</a>
        </div>

        <!-- CENTER: LOGO with hover effect -->
        <div class="header-title">
          <a href="/index.html" aria-label="KC Roast Co. home">
            <img
              class="logo-default"
              src="/images/kcroastco_logo.svg"
              alt="KC Roast Co."
              width="180"
              height="48"
              loading="eager"
              decoding="async"
            />
            <img
              class="logo-hover"
              src="/images/kcroastco_logo_hover.svg"
              alt=""
              aria-hidden="true"
              width="180"
              height="48"
              loading="eager"
              decoding="async"
            />
          </a>
        </div>

        <!-- RIGHT: UTILITY/SOCIAL ICONS with hover effects -->
        <div class="socials">
          <!-- About link -->
          <a
            href="/about.html"
            class="nav-link--social"
            aria-label="About KC Roast Co."
          >
            <img class="icon-default" src="/images/coffee_lite.svg" alt="" aria-hidden="true" width="20" height="20" />
            <img class="icon-hover" src="/images/coffee_dark.svg" alt="" aria-hidden="true" width="20" height="20" />
          </a>

          <!-- Contact link -->
          <a
            href="/contact.html"
            class="nav-link--social"
            aria-label="Contact KC Roast Co."
          >
            <img class="icon-default" src="/images/mail_lite.svg" alt="" aria-hidden="true" width="20" height="20" />
            <img class="icon-hover" src="/images/mail_dark.svg" alt="" aria-hidden="true" width="20" height="20" />
          </a>

          <!-- Instagram (external link) -->
          <a
            href="https://www.instagram.com/kcroastco/"
            class="nav-link--social"
            aria-label="KC Roast Co. on Instagram (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img class="icon-default" src="/images/instagram_bright.svg" alt="" aria-hidden="true" width="20" height="20" />
            <img class="icon-hover" src="/images/instagram_dark.svg" alt="" aria-hidden="true" width="20" height="20" />
          </a>
        </div>

      </nav>
    </div>
  `;

  /* --------------------------------------------------------------------------
   * 4. INSERT HEADER
   * --------------------------------------------------------------------------
   * Injects the header HTML into the designated container element.
   * Fails silently if container is not found.
   * -------------------------------------------------------------------------- */
  function insertHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) {
      console.warn('[header.js] #site-header element not found');
      return;
    }

    headerEl.innerHTML = headerHTML;
  }

  /* --------------------------------------------------------------------------
   * 5. INITIALIZATION
   * --------------------------------------------------------------------------
   * Executes header injection when DOM is ready.
   * Handles both scenarios:
   * - Script loaded before DOM ready (addEventListener)
   * - Script loaded after DOM ready (immediate execution)
   * -------------------------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertHeader);
  } else {
    insertHeader();
  }

})();
