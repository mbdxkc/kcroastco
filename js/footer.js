/* =========================================================
   kc roast co stylesheet
   design. code. clarity.
   ========================================================= */


/* =========================================================
   1) design tokens
   ========================================================= */
:root{
  /* colors - coffee shop palette */
  --bg:           #0F0D0C;
  --bg-warm:      #1A1615;
  --bg-card:      rgba(255,245,235,.03);
  --text:         rgba(255,250,245,.9);
  --muted:        rgba(255,250,245,.6);

  /* brand accents */
  --accent-primary:   #C4A77D;
  --accent-secondary: #8B5A2B;
  --accent-highlight: #E8DCC4;
  --accent-dark:      #2C1810;

  /* semantic */
  --success: #7CB342;
  --error:   #D84315;
  --warning: #F9A825;

  /* layout */
  --container:    1200px;
  --container-sm: 720px;
  --header-h:     64px;

  /* shape */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 32px;

  /* shadow */
  --shadow-soft:   0 8px 24px rgba(0,0,0,.4);
  --shadow-card:   0 4px 12px rgba(0,0,0,.3);
  --shadow-glow:   0 0 40px rgba(196,167,125,.15);

  /* motion */
  --t-fast: .15s;
  --t-base: .3s;
  --t-slow: .6s;
  --ease:   cubic-bezier(.25,.8,.25,1);
}


/* =========================================================
   2) reset + global guards
   ========================================================= */
*,*::before,*::after{
  box-sizing: border-box;
}

html,body{
  height: 100%;
}

html{
  overflow-x: hidden;
  scrollbar-gutter: stable both-edges;
  scroll-behavior: smooth;
}

body{
  margin: 0;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
  font-family: "Nunito Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}


/* =========================================================
   3) accessibility utilities
   ========================================================= */
.sr-only{
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

.skip-link{
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 10000;
  padding: .75rem 1.5rem;
  background: var(--accent-primary);
  color: var(--accent-dark);
  font-weight: 700;
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  transition: top var(--t-base) ease;
}

.skip-link:focus{
  top: 0;
}


/* =========================================================
   4) page transition
   ========================================================= */
#page-transition{
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg);
  pointer-events: none;
  transform: translateX(0);
  transition: transform var(--t-slow) var(--ease);
}

#page-transition.exit{
  transform: translateX(-100%);
}

main{
  flex: 1 0 auto;
  opacity: 1;
  transition: opacity var(--t-base) ease;
}

body.is-loading main,
body.is-leaving main{
  opacity: 0;
}


/* =========================================================
   5) typography
   ========================================================= */
h1,h2,h3,h4,h5,h6{
  margin: 0 0 .5em;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text);
  letter-spacing: -.02em;
}

h1{ font-size: clamp(2.5rem, 6vw, 4rem); }
h2{ font-size: clamp(1.75rem, 4vw, 2.5rem); }
h3{ font-size: clamp(1.25rem, 3vw, 1.75rem); }
h4{ font-size: 1.25rem; }

p{ margin: 0 0 1em; }

small{
  color: var(--muted);
  font-size: .875rem;
}

a{
  color: var(--accent-primary);
  text-decoration: none;
  transition: color var(--t-fast) ease;
}

a:hover{
  color: var(--accent-highlight);
}

strong, b{ font-weight: 700; }
blockquote{ margin: 0; padding: 0; }


/* =========================================================
   6) layout primitives
   ========================================================= */
.container{
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.site-header{
  position: sticky;
  top: 0;
  z-index: 1000;
  height: var(--header-h);
  width: 100%;
  background: rgba(15,13,12,.85);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border-bottom: 1px solid rgba(255,250,245,.08);
}

.header-grid{
  max-width: var(--container);
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
}

.nav{
  display: grid;
  grid-template-columns: minmax(0,1fr) auto minmax(0,1fr);
  align-items: center;
  width: 100%;
  height: 100%;
}

.nav .pages,
.nav .socials{
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav .header-title{
  justify-self: center;
}

.nav .header-title a{
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: .05em;
  text-transform: lowercase;
  color: var(--accent-highlight);
}

.nav .socials{
  justify-self: end;
}

.nav-link{
  font-size: .875rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: lowercase;
  letter-spacing: .02em;
  transition: color var(--t-fast) ease;
}

.nav-link:hover{
  color: var(--text);
}

.nav-link.is-active{
  color: var(--accent-primary);
}

.nav-link--social{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem;
}

.nav-link--social .icon{
  width: 1.25rem;
  height: 1.25rem;
}

.nav-toggle{
  display: none;
  appearance: none;
  background: transparent;
  border: none;
  padding: .5rem;
  cursor: pointer;
}

.nav-toggle .icon{
  width: 1.5rem;
  height: 1.5rem;
  display: block;
}

.nav-left,
.nav-center,
.nav-right{
  display: flex;
  align-items: center;
}

.nav-center{ justify-self: center; }
.nav-left{ justify-self: start; }
.nav-right{ justify-self: end; }


/* =========================================================
   7) mobile menu
   ========================================================= */
.mobile-menu{
  display: none;
  position: fixed;
  top: var(--header-h);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: var(--bg);
  padding: 2rem 1.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-1rem);
  transition:
    opacity var(--t-base) var(--ease),
    transform var(--t-base) var(--ease),
    visibility var(--t-base);
}

.mobile-menu.is-active{
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.mobile-nav__list{
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav__item{
  border-bottom: 1px solid rgba(255,250,245,.08);
}

.mobile-nav__item .nav-link{
  display: block;
  padding: 1.25rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}


/* =========================================================
   8) images
   ========================================================= */
img{
  display: block;
  max-width: 100%;
  height: auto;
}

figure{ margin: 0; }


/* =========================================================
   9) buttons
   ========================================================= */
.btn,
.button{
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  padding: .875rem 1.75rem;
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: .9375rem;
  font-weight: 700;
  letter-spacing: .02em;
  text-transform: lowercase;
  text-decoration: none;
  border: 2px solid transparent;
  box-shadow: var(--shadow-card);
  transition:
    transform var(--t-fast) ease,
    box-shadow var(--t-fast) ease,
    background var(--t-fast) ease,
    border-color var(--t-fast) ease,
    color var(--t-fast) ease;
}

.btn:hover,
.button:hover{
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
}

.btn--primary{
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: var(--accent-dark);
}

.btn--primary:hover{
  background: var(--accent-highlight);
  border-color: var(--accent-highlight);
}

.btn--outline{
  background: transparent;
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.btn--outline:hover{
  background: var(--accent-primary);
  color: var(--accent-dark);
}


/* =========================================================
   10) links with icons/arrows
   ========================================================= */
.link{
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  font-weight: 600;
  color: var(--accent-primary);
}

.link:hover{
  color: var(--accent-highlight);
}

.link--arrow::after{
  content: '→';
  transition: transform var(--t-fast) ease;
}

.link--arrow:hover::after{
  transform: translateX(4px);
}

.link--icon{
  gap: .625rem;
}

.link--icon .icon{
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
}


/* =========================================================
   11) hero section
   ========================================================= */
.hero{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 3rem;
  min-height: calc(100vh - var(--header-h));
  padding: 4rem 1.5rem;
  max-width: var(--container);
  margin: 0 auto;
}

.hero__content{
  max-width: 720px;
}

.hero__title{
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 1;
  margin-bottom: .5em;
  color: var(--accent-highlight);
  letter-spacing: -.03em;
}

.hero__tagline{
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: var(--muted);
  margin-bottom: 2rem;
  line-height: 1.5;
}

.hero__cta-group{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.hero__image{
  position: relative;
  width: 100%;
  max-width: 900px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 16/9;
  box-shadow: var(--shadow-glow);
}

.hero__image img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/* =========================================================
   12) section component
   ========================================================= */
.section{
  padding: 5rem 1.5rem;
  max-width: var(--container);
  margin: 0 auto;
}

.section__header{
  text-align: center;
  max-width: 640px;
  margin: 0 auto 3rem;
}

.section__title{
  margin-bottom: .25em;
  color: var(--accent-highlight);
}

.section__subtitle{
  font-size: 1.125rem;
  color: var(--muted);
  margin: 0;
}

.section__text{
  color: var(--muted);
  font-size: 1.0625rem;
  line-height: 1.7;
}

.section__cta{
  text-align: center;
  margin-top: 3rem;
}


/* =========================================================
   13) two column layout
   ========================================================= */
.section--two-col{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section--two-col .section__media{
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
}

.section--two-col .section__media img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4/3;
}

.section--reversed .section__media{
  order: 2;
}

.section--reversed .section__content{
  order: 1;
}


/* =========================================================
   14) featured section
   ========================================================= */
.section--featured{
  background: var(--bg-warm);
  max-width: 100%;
  padding: 5rem 1.5rem;
}

.section--featured .section__header,
.section--featured .card-grid,
.section--featured .section__cta{
  max-width: var(--container);
  margin-left: auto;
  margin-right: auto;
}


/* =========================================================
   15) testimonials section
   ========================================================= */
.section--testimonials{
  background: linear-gradient(135deg, var(--accent-dark) 0%, var(--bg) 100%);
  max-width: 100%;
  padding: 5rem 1.5rem;
}


/* =========================================================
   16) newsletter section (in main)
   ========================================================= */
.section--newsletter{
  background: var(--bg-warm);
  max-width: 100%;
  padding: 5rem 1.5rem;
}

.newsletter{
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
}

.newsletter__title{
  color: var(--accent-highlight);
  margin-bottom: .5rem;
}

.newsletter__text{
  color: var(--muted);
  margin-bottom: 2rem;
}

.newsletter__form .form-group{
  display: flex;
  gap: .75rem;
  margin-bottom: 1rem;
}

.newsletter__form .form-input{
  flex: 1;
}

.newsletter__disclaimer{
  font-size: .8125rem;
  color: var(--muted);
  margin: 0;
}


/* =========================================================
   17) card grid + cards
   ========================================================= */
.card-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.card{
  position: relative;
  background: var(--bg-card);
  border: 1px solid rgba(255,250,245,.08);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    border-color var(--t-base) ease,
    transform var(--t-fast) ease,
    box-shadow var(--t-base) ease;
}

.card:hover{
  border-color: rgba(196,167,125,.3);
  transform: translateY(-4px);
  box-shadow: var(--shadow-glow);
}

.card__image{
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: var(--bg-warm);
}

.card__image img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--t-slow) ease;
}

.card:hover .card__image img{
  transform: scale(1.05);
}

.card__badge{
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: .375rem .75rem;
  background: var(--accent-primary);
  color: var(--accent-dark);
  font-size: .75rem;
  font-weight: 700;
  text-transform: lowercase;
  border-radius: var(--radius-sm);
}

.card__content{
  padding: 1.5rem;
}

.card__title{
  font-size: 1.25rem;
  margin-bottom: .25rem;
  color: var(--text);
}

.card__desc{
  font-size: .9375rem;
  color: var(--muted);
  margin-bottom: .5rem;
  font-style: italic;
}

.card__meta{
  font-size: .8125rem;
  color: var(--muted);
  margin-bottom: 1rem;
  text-transform: lowercase;
}

.card__price{
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin: 0;
}

.card__unit{
  font-size: .875rem;
  font-weight: 400;
  color: var(--muted);
}

.card__link{
  position: absolute;
  inset: 0;
  z-index: 1;
}


/* =========================================================
   18) menu preview
   ========================================================= */
.menu-preview{
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.menu-preview__item{
  display: flex;
  align-items: baseline;
  gap: .5rem;
  padding: .75rem 0;
  border-bottom: 1px solid rgba(255,250,245,.08);
}

.menu-preview__item:last-child{
  border-bottom: none;
}

.menu-preview__name{
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}

.menu-preview__dots{
  flex: 1;
  border-bottom: 1px dotted rgba(255,250,245,.3);
  margin: 0 .5rem;
  min-width: 2rem;
  transform: translateY(-4px);
}

.menu-preview__price{
  font-weight: 700;
  color: var(--accent-primary);
  white-space: nowrap;
}


/* =========================================================
   19) testimonial
   ========================================================= */
.testimonial{
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.testimonial__quote{
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 2rem;
}

.testimonial__quote p{
  margin: 0;
}

.testimonial__quote::before{
  content: '"';
  display: block;
  font-size: 4rem;
  line-height: 1;
  color: var(--accent-primary);
  opacity: .5;
  margin-bottom: .5rem;
}

.testimonial__author{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .25rem;
}

.testimonial__avatar{
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: .5rem;
  border: 2px solid var(--accent-primary);
}

.testimonial__name{
  font-weight: 700;
  color: var(--text);
}

.testimonial__location{
  font-size: .875rem;
  color: var(--muted);
}


/* =========================================================
   20) location & hours
   ========================================================= */
.location-info{
  font-style: normal;
  margin-bottom: 2rem;
}

.location-info__address{
  line-height: 1.7;
  color: var(--muted);
  margin: 0;
}

.location-info__address strong{
  display: block;
  color: var(--text);
  margin-bottom: .25rem;
}

.hours{
  display: grid;
  grid-template-columns: auto 1fr;
  gap: .5rem 1.5rem;
  margin-bottom: 2rem;
}

.hours__label{
  font-weight: 600;
  color: var(--text);
  text-transform: lowercase;
}

.hours__value{
  color: var(--muted);
  margin: 0;
}

.contact-links{
  display: flex;
  flex-direction: column;
  gap: .75rem;
}

.section__media--map{
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4/3;
}

.section__media--map iframe{
  width: 100%;
  height: 100%;
  display: block;
}


/* =========================================================
   21) form elements
   ========================================================= */
.form-group{
  margin-bottom: 1.25rem;
}

.form-label{
  display: block;
  margin-bottom: .5rem;
  font-weight: 600;
  font-size: .875rem;
  color: var(--text);
}

.form-input,
.form-textarea,
.form-select{
  width: 100%;
  padding: .875rem 1.25rem;
  font: inherit;
  font-size: 1rem;
  color: var(--text);
  background: rgba(255,250,245,.05);
  border: 1px solid rgba(255,250,245,.15);
  border-radius: var(--radius-sm);
  transition:
    border-color var(--t-base) ease,
    box-shadow var(--t-base) ease;
}

.form-input::placeholder,
.form-textarea::placeholder{
  color: var(--muted);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus{
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(196,167,125,.2);
}


/* =========================================================
   22) FOOTER - COMPLETE
   ========================================================= */
.footer{
  margin-top: auto;
  background: var(--bg-warm);
  border-top: 1px solid rgba(255,250,245,.08);
  flex-shrink: 0;
}

.footer__inner{
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* GRID - THIS IS THE KEY PART */
.footer__main{
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1.25fr;
  gap: 2rem;
  padding: 4rem 0;
}

.footer__col{
  min-width: 0;
}

/* brand column */
.footer__brand{
  max-width: 280px;
}

.footer__logo{
  display: inline-flex;
  align-items: center;
  gap: .625rem;
  margin-bottom: 1rem;
  text-decoration: none;
}

.footer__logo-icon{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: var(--accent-primary);
}

.footer__logo-icon svg{
  width: 24px;
  height: 24px;
  display: block;
}

.footer__logo-text{
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-highlight);
}

.footer__tagline{
  font-size: .9375rem;
  color: var(--muted);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.footer__socials{
  display: flex;
  gap: .5rem;
}

.footer__social-link{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,250,245,.05);
  color: var(--muted);
  transition: 
    background var(--t-fast) ease,
    color var(--t-fast) ease,
    transform var(--t-fast) ease;
}

.footer__social-link:hover{
  background: var(--accent-primary);
  color: var(--accent-dark);
  transform: translateY(-2px);
}

.footer__social-link svg{
  width: 18px;
  height: 18px;
  display: block;
}

/* nav columns */
.footer__title{
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: var(--accent-highlight);
  margin: 0 0 1.25rem 0;
}

.footer__subtitle{
  font-size: .6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: var(--text);
  margin: 1.5rem 0 .75rem;
}

.footer__list{
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer__list-item{
  margin-bottom: .625rem;
}

.footer__link{
  font-size: .9375rem;
  color: var(--muted);
  text-decoration: none;
  transition: color var(--t-fast) ease;
}

.footer__link:hover{
  color: var(--accent-primary);
}

/* contact column */
.footer__address{
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: .75rem;
  margin: 0;
}

.footer__contact-link{
  display: flex;
  align-items: flex-start;
  gap: .75rem;
  font-size: .9375rem;
  color: var(--muted);
  text-decoration: none;
  transition: color var(--t-fast) ease;
}

.footer__contact-link:hover{
  color: var(--accent-primary);
}

.footer__contact-icon{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--accent-primary);
}

.footer__contact-icon svg{
  width: 16px;
  height: 16px;
  display: block;
}

.footer__contact-text{
  line-height: 1.5;
}

.footer__hours{
  display: grid;
  grid-template-columns: auto 1fr;
  gap: .25rem 1rem;
  margin: 0;
}

.footer__hours-day{
  font-size: .875rem;
  font-weight: 600;
  color: var(--text);
}

.footer__hours-time{
  font-size: .875rem;
  color: var(--muted);
  margin: 0;
}

/* newsletter in footer */
.footer__newsletter{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0;
  border-top: 1px solid rgba(255,250,245,.08);
  border-bottom: 1px solid rgba(255,250,245,.08);
}

.footer__newsletter-content{
  flex: 1;
  max-width: 400px;
}

.footer__newsletter-title{
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-highlight);
  margin: 0 0 .25rem 0;
}

.footer__newsletter-text{
  font-size: .9375rem;
  color: var(--muted);
  margin: 0;
}

.footer__newsletter-form{
  flex: 1;
  max-width: 420px;
}

.footer__newsletter-group{
  display: flex;
  gap: .75rem;
}

.footer__newsletter-input{
  flex: 1;
  padding: .75rem 1rem;
  font: inherit;
  font-size: .9375rem;
  color: var(--text);
  background: rgba(255,250,245,.05);
  border: 1px solid rgba(255,250,245,.15);
  border-radius: var(--radius-sm);
}

.footer__newsletter-input::placeholder{
  color: var(--muted);
}

.footer__newsletter-input:focus{
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(196,167,125,.2);
}

.footer__newsletter-btn{
  appearance: none;
  padding: .75rem 1.25rem;
  font: inherit;
  font-size: .9375rem;
  font-weight: 700;
  text-transform: lowercase;
  color: var(--accent-dark);
  background: var(--accent-primary);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--t-fast) ease;
}

.footer__newsletter-btn:hover{
  background: var(--accent-highlight);
}

.footer__newsletter-btn.is-success{
  background: var(--success);
  color: #fff;
}

/* footer bottom */
.footer__bottom{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  gap: 1rem;
}

.footer__copyright{
  font-size: .8125rem;
  color: var(--muted);
  margin: 0;
}

.footer__legal-list{
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer__legal-link{
  font-size: .8125rem;
  color: var(--muted);
  text-decoration: none;
  transition: color var(--t-fast) ease;
}

.footer__legal-link:hover{
  color: var(--accent-primary);
}

/* back to top */
.back-to-top{
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--accent-primary);
  color: var(--accent-dark);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: var(--shadow-soft);
  opacity: 0;
  visibility: hidden;
  transform: translateY(1rem);
  transition:
    opacity var(--t-base) ease,
    visibility var(--t-base) ease,
    transform var(--t-base) ease,
    background var(--t-fast) ease;
}

.back-to-top:hover{
  background: var(--accent-highlight);
  transform: translateY(-2px);
}

.back-to-top.is-visible{
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top svg{
  width: 20px;
  height: 20px;
  display: block;
}


/* =========================================================
   23) responsive
   ========================================================= */
@media (max-width: 1024px){
  .footer__main{
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .footer__col--brand{
    grid-column: 1 / -1;
  }

  .footer__brand{
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }

  .footer__logo{
    margin-bottom: 0;
  }

  .footer__tagline{
    flex: 1;
    margin: 0;
    min-width: 200px;
  }
}

@media (max-width: 992px){
  .section--two-col{
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .section--two-col .section__media{
    max-width: 600px;
    margin: 0 auto;
    order: -1;
  }

  .section--reversed .section__media,
  .section--reversed .section__content{
    order: unset;
  }
}

@media (max-width: 768px){
  :root{
    --header-h: 56px;
  }

  .container{
    padding: 0 1rem;
  }

  .nav .pages{
    display: none;
  }

  .nav-toggle{
    display: block;
  }

  .mobile-menu{
    display: block;
  }

  .hero{
    min-height: auto;
    padding: 3rem 1rem;
    gap: 2rem;
  }

  .hero__cta-group{
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  .hero__cta-group .btn{
    width: 100%;
  }

  .section{
    padding: 3.5rem 1rem;
  }

  /* footer responsive */
  .footer__main{
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 3rem 0;
  }

  .footer__col--brand{
    grid-column: 1 / -1;
  }

  .footer__brand{
    display: block;
    text-align: center;
  }

  .footer__logo{
    justify-content: center;
    margin-bottom: 1rem;
  }

  .footer__tagline{
    margin-bottom: 1.5rem;
  }

  .footer__socials{
    justify-content: center;
  }

  .footer__col--contact{
    grid-column: 1 / -1;
  }

  .footer__newsletter{
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .footer__newsletter-content,
  .footer__newsletter-form{
    max-width: 100%;
    width: 100%;
  }

  .footer__newsletter-group{
    flex-direction: column;
  }

  .footer__bottom{
    flex-direction: column;
    text-align: center;
    gap: .75rem;
  }

  .footer__legal-list{
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .newsletter__form .form-group{
    flex-direction: column;
  }
}

@media (max-width: 480px){
  .footer__main{
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer__col{
    text-align: center;
  }

  .footer__address{
    align-items: center;
  }

  .footer__contact-link{
    justify-content: center;
  }

  .footer__hours{
    display: inline-grid;
    text-align: left;
  }
}


/* =========================================================
   24) print styles
   ========================================================= */
@media print{
  .site-header,
  .footer__newsletter,
  .footer__socials,
  .back-to-top,
  #page-transition,
  .skip-link{
    display: none !important;
  }
}