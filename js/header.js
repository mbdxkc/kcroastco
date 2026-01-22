/* =========================================================
   header.js
   =========================================================
   @project    kc roast co
   @desc       header navigation injection + mobile menu
   @author     valdez campos <dez@mediabrilliance.io>
   @version    1.0
   ========================================================= */

(function() {
  'use strict';

  /* ---------------------------------------------------------
     configuration
     --------------------------------------------------------- */
  const CONFIG = {
    siteName: 'kc roast co',
    siteUrl: '/',
    
    // navigation links
    navLinks: [
      { label: 'menu', href: '/menu' },
      { label: 'shop', href: '/shop' },
      { label: 'about', href: '/about' },
      { label: 'contact', href: '/contact' }
    ],

    // social links
    socialLinks: [
      { 
        label: 'Instagram', 
        href: 'https://instagram.com/kcroastco',
        icon: 'instagram'
      },
      { 
        label: 'Twitter', 
        href: 'https://twitter.com/kcroastco',
        icon: 'twitter'
      }
    ],

    // behavior
    scrollThreshold: 50,      // px before header changes style
    enableScrollEffect: true,
    enableMobileMenu: true
  };


  /* ---------------------------------------------------------
     icon SVGs
     --------------------------------------------------------- */
  const ICONS = {
    instagram: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    `,
    twitter: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
      </svg>
    `,
    menu: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    `,
    close: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    `
  };


  /* ---------------------------------------------------------
     state
     --------------------------------------------------------- */
  const state = {
    mobileMenuOpen: false,
    scrolled: false,
    currentPath: window.location.pathname
  };


  /* ---------------------------------------------------------
     utility functions
     --------------------------------------------------------- */
  
  /**
   * Check if a nav link matches the current path
   */
  function isActivePath(href) {
    const current = state.currentPath.replace(/\/$/, '') || '/';
    const link = href.replace(/\/$/, '') || '/';
    
    // exact match
    if (current === link) return true;
    
    // child page match (e.g., /shop/item matches /shop)
    if (link !== '/' && current.startsWith(link)) return true;
    
    return false;
  }

  /**
   * Create element with attributes
   */
  function createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'className') {
        el.className = value;
      } else if (key === 'innerHTML') {
        el.innerHTML = value;
      } else if (key.startsWith('data')) {
        el.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    });
    
    children.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child) {
        el.appendChild(child);
      }
    });
    
    return el;
  }


  /* ---------------------------------------------------------
     build header HTML
     --------------------------------------------------------- */
  function buildHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    // create header grid container
    const headerGrid = createElement('div', { className: 'header-grid' });
    
    // create nav
    const nav = createElement('nav', { 
      className: 'nav',
      'aria-label': 'main navigation'
    });

    // --- LEFT: Page links ---
    const navLeft = createElement('div', { className: 'nav-left' });
    const pages = createElement('ul', { className: 'pages', role: 'list' });
    
    CONFIG.navLinks.forEach(link => {
      const li = createElement('li');
      const a = createElement('a', {
        href: link.href,
        className: `nav-link${isActivePath(link.href) ? ' is-active' : ''}`
      }, [link.label]);
      
      if (isActivePath(link.href)) {
        a.setAttribute('aria-current', 'page');
      }
      
      li.appendChild(a);
      pages.appendChild(li);
    });
    
    navLeft.appendChild(pages);

    // --- CENTER: Logo/Site name ---
    const navCenter = createElement('div', { className: 'nav-center header-title' });
    const logoLink = createElement('a', { href: CONFIG.siteUrl }, [CONFIG.siteName]);
    navCenter.appendChild(logoLink);

    // --- RIGHT: Socials + Mobile toggle ---
    const navRight = createElement('div', { className: 'nav-right' });
    
    // social links
    const socials = createElement('ul', { className: 'socials', role: 'list' });
    
    CONFIG.socialLinks.forEach(link => {
      const li = createElement('li');
      const a = createElement('a', {
        href: link.href,
        className: 'nav-link nav-link--social',
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': link.label,
        innerHTML: `<span class="icon">${ICONS[link.icon]}</span>`
      });
      li.appendChild(a);
      socials.appendChild(li);
    });
    
    navRight.appendChild(socials);

    // mobile menu toggle button
    if (CONFIG.enableMobileMenu) {
      const mobileToggle = createElement('button', {
        className: 'nav-toggle',
        type: 'button',
        'aria-label': 'Toggle mobile menu',
        'aria-expanded': 'false',
        'aria-controls': 'mobile-menu',
        innerHTML: `<span class="icon">${ICONS.menu}</span>`
      });
      navRight.appendChild(mobileToggle);
    }

    // assemble nav
    nav.appendChild(navLeft);
    nav.appendChild(navCenter);
    nav.appendChild(navRight);
    
    // assemble header
    headerGrid.appendChild(nav);
    header.appendChild(headerGrid);

    // build mobile menu
    if (CONFIG.enableMobileMenu) {
      buildMobileMenu();
    }
  }


  /* ---------------------------------------------------------
     build mobile menu
     --------------------------------------------------------- */
  function buildMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!mobileMenu) return;

    // set ID for aria-controls
    mobileMenu.id = 'mobile-menu';
    mobileMenu.setAttribute('aria-hidden', 'true');

    // create nav list
    const navList = createElement('nav', { 
      className: 'mobile-nav',
      'aria-label': 'mobile navigation'
    });
    
    const ul = createElement('ul', { className: 'mobile-nav__list', role: 'list' });

    // add nav links
    CONFIG.navLinks.forEach(link => {
      const li = createElement('li', { className: 'mobile-nav__item' });
      const a = createElement('a', {
        href: link.href,
        className: `nav-link${isActivePath(link.href) ? ' is-active' : ''}`
      }, [link.label]);
      
      if (isActivePath(link.href)) {
        a.setAttribute('aria-current', 'page');
      }
      
      li.appendChild(a);
      ul.appendChild(li);
    });

    navList.appendChild(ul);

    // add social links section
    const socialSection = createElement('div', { className: 'mobile-nav__socials' });
    const socialTitle = createElement('span', { className: 'mobile-nav__label' }, ['follow us']);
    const socialLinks = createElement('div', { className: 'mobile-nav__social-links' });

    CONFIG.socialLinks.forEach(link => {
      const a = createElement('a', {
        href: link.href,
        className: 'mobile-nav__social-link',
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': link.label,
        innerHTML: `<span class="icon">${ICONS[link.icon]}</span> ${link.label}`
      });
      socialLinks.appendChild(a);
    });

    socialSection.appendChild(socialTitle);
    socialSection.appendChild(socialLinks);

    // assemble mobile menu
    mobileMenu.appendChild(navList);
    mobileMenu.appendChild(socialSection);
  }


  /* ---------------------------------------------------------
     mobile menu toggle
     --------------------------------------------------------- */
  function toggleMobileMenu(forceClose = false) {
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!toggle || !mobileMenu) return;

    if (forceClose || state.mobileMenuOpen) {
      // close menu
      state.mobileMenuOpen = false;
      mobileMenu.classList.remove('is-active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = `<span class="icon">${ICONS.menu}</span>`;
      document.body.classList.remove('menu-open');
      
      // restore scroll
      document.body.style.overflow = '';
    } else {
      // open menu
      state.mobileMenuOpen = true;
      mobileMenu.classList.add('is-active');
      mobileMenu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.innerHTML = `<span class="icon">${ICONS.close}</span>`;
      document.body.classList.add('menu-open');
      
      // prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // focus first link
      const firstLink = mobileMenu.querySelector('.nav-link');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    }
  }


  /* ---------------------------------------------------------
     scroll effects
     --------------------------------------------------------- */
  function handleScroll() {
    if (!CONFIG.enableScrollEffect) return;

    const header = document.getElementById('site-header');
    if (!header) return;

    const scrolled = window.scrollY > CONFIG.scrollThreshold;

    if (scrolled !== state.scrolled) {
      state.scrolled = scrolled;
      header.classList.toggle('is-scrolled', scrolled);
    }
  }


  /* ---------------------------------------------------------
     event listeners
     --------------------------------------------------------- */
  function bindEvents() {
    // mobile menu toggle
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => toggleMobileMenu());
    }

    // close mobile menu on link click
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
          toggleMobileMenu(true);
        }
      });
    }

    // close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.mobileMenuOpen) {
        toggleMobileMenu(true);
        document.querySelector('.nav-toggle')?.focus();
      }
    });

    // scroll handler (throttled)
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });

    // close mobile menu on resize to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && state.mobileMenuOpen) {
          toggleMobileMenu(true);
        }
      }, 100);
    });

    // handle click outside mobile menu
    document.addEventListener('click', (e) => {
      if (state.mobileMenuOpen) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const toggle = document.querySelector('.nav-toggle');
        
        if (mobileMenu && toggle && 
            !mobileMenu.contains(e.target) && 
            !toggle.contains(e.target)) {
          toggleMobileMenu(true);
        }
      }
    });
  }


  /* ---------------------------------------------------------
     initialization
     --------------------------------------------------------- */
  function init() {
    // wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        buildHeader();
        bindEvents();
        handleScroll(); // check initial scroll position
      });
    } else {
      buildHeader();
      bindEvents();
      handleScroll();
    }
  }

  // run
  init();


  /* ---------------------------------------------------------
     expose public API (optional)
     --------------------------------------------------------- */
  window.KCHeader = {
    toggleMobileMenu,
    getState: () => ({ ...state }),
    updateConfig: (newConfig) => Object.assign(CONFIG, newConfig)
  };

})();