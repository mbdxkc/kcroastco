/* =========================================================
   header.js
   =========================================================
   @project    kc roast co
   @desc       header navigation injection + mobile menu
   @author     valdez campos <dez@mediabrilliance.io>
   @version    1.1
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     configuration
     --------------------------------------------------------- */
  const CONFIG = {
    siteUrl: '/',

    navLinks: [
      { label: 'menu', href: '/menu' },
      { label: 'shop', href: '/shop' },
      { label: 'about', href: '/about' },
      { label: 'contact', href: '/contact' }
    ],

    socialLinks: [
      {
        label: 'Instagram',
        href: 'https://instagram.com/kcroastco',
        icon: 'instagram'
      }
    ],

    scrollThreshold: 50,
    enableMobileMenu: true
  };

  /* ---------------------------------------------------------
     icons
     --------------------------------------------------------- */
  const ICONS = {
    instagram: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8"/>
        <circle cx="17.5" cy="6.5" r="1"/>
      </svg>
    `,
    menu: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    `,
    close: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    `
  };

  /* ---------------------------------------------------------
     helpers
     --------------------------------------------------------- */
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);

    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else node.setAttribute(k, v);
    });

    children.forEach(c => {
      if (typeof c === 'string') node.appendChild(document.createTextNode(c));
      else if (c) node.appendChild(c);
    });

    return node;
  }

  function isActive(href) {
    const p = window.location.pathname.replace(/\/$/, '');
    const h = href.replace(/\/$/, '');
    return p === h || (h && p.startsWith(h));
  }

  /* ---------------------------------------------------------
     build header
     --------------------------------------------------------- */
  function buildHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const grid = el('div', { class: 'header-grid' });
    const nav = el('nav', { class: 'nav', 'aria-label': 'Main navigation' });

    /* LEFT */
    const left = el('div', { class: 'nav-left' });
    const pages = el('ul', { class: 'pages', role: 'list' });

    CONFIG.navLinks.forEach(link => {
      const a = el(
        'a',
        {
          href: link.href,
          class: `nav-link${isActive(link.href) ? ' is-active' : ''}`
        },
        [link.label]
      );

      if (isActive(link.href)) {
        a.setAttribute('aria-current', 'page');
      }

      pages.appendChild(el('li', {}, [a]));
    });

    left.appendChild(pages);

    /* CENTER LOGO */
    const center = el('div', { class: 'nav-center header-logo' });

    const logoLink = el('a', {
      href: CONFIG.siteUrl,
      'aria-label': 'kc roast co home'
    });

    const logoImg = el('img', {
      src: '/images/kcroastco_logo.svg',
      alt: 'kc roast co',
      class: 'site-logo',
      width: '140',
      height: '36'
    });

    logoLink.appendChild(logoImg);
    center.appendChild(logoLink);

    /* RIGHT */
    const right = el('div', { class: 'nav-right' });
    const socials = el('ul', { class: 'socials', role: 'list' });

    CONFIG.socialLinks.forEach(link => {
      socials.appendChild(
        el('li', {}, [
          el('a', {
            href: link.href,
            target: '_blank',
            rel: 'noopener',
            class: 'nav-link nav-link--social',
            'aria-label': link.label,
            html: ICONS[link.icon]
          })
        ])
      );
    });

    right.appendChild(socials);

    if (CONFIG.enableMobileMenu) {
      right.appendChild(
        el('button', {
          class: 'nav-toggle',
          'aria-label': 'Toggle menu',
          'aria-expanded': 'false',
          html: ICONS.menu
        })
      );
    }

    nav.append(left, center, right);
    grid.appendChild(nav);
    header.appendChild(grid);
  }

  /* ---------------------------------------------------------
     mobile menu
     --------------------------------------------------------- */
  function bindMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    let open = false;

    toggle.addEventListener('click', () => {
      open = !open;
      menu.classList.toggle('is-active', open);
      toggle.innerHTML = open ? ICONS.close : ICONS.menu;
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ---------------------------------------------------------
     init
     --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    buildHeader();
    bindMobileMenu();
  });

})();
