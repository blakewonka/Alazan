import "../css/style.css";
import "../components/product-card.css";

// =====================
// Fullscreen nav overlay — inject into DOM on every page
// =====================

document.body.insertAdjacentHTML("beforeend", `
  <div class="nav-overlay" id="nav-overlay" aria-hidden="true">
    <div class="nav-overlay-links">
      <a href="./collections.html" class="nav-overlay-link" style="--i:0">
        <span>Collections</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
      <a href="./collections.html" class="nav-overlay-link" style="--i:1">
        <span>Woman</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
      <a href="./collections.html" class="nav-overlay-link" style="--i:2">
        <span>Man</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
      <a href="./collections.html" class="nav-overlay-link" style="--i:3">
        <span>Kids</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
      <a href="./about.html" class="nav-overlay-link" style="--i:4">
        <span>About</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
      <a href="./contact.html" class="nav-overlay-link" style="--i:5">
        <span>Contact</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
    </div>
    <div class="nav-overlay-footer">
      <p>+994 50 749 13 81</p>
      <p>info@alazan.com</p>
      <p>Bakı ş. Səbail r. Q. Abbasov k. 32</p>
    </div>
  </div>
`);

const navOverlay = document.getElementById("nav-overlay");
const menuBtn = document.querySelector(".menu-btn");

// Inject both icons into the hamburger button so CSS can toggle them
if (menuBtn) {
  menuBtn.innerHTML = `
    <svg class="icon-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7"/>
      <line x1="4" y1="12" x2="20" y2="12"/>
      <line x1="4" y1="17" x2="20" y2="17"/>
    </svg>
    <svg class="icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19"/>
      <line x1="19" y1="5" x2="5" y2="19"/>
    </svg>
  `;
}

const openNav = () => {
  navOverlay.classList.add("is-open");
  navOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  menuBtn?.setAttribute("aria-expanded", "true");
  menuBtn?.classList.add("is-open");
};

const closeNav = () => {
  navOverlay.classList.remove("is-open");
  navOverlay.setAttribute("aria-hidden", "true");
  menuBtn?.setAttribute("aria-expanded", "false");
  menuBtn?.classList.remove("is-open");
  setTimeout(() => {
    if (!navOverlay.classList.contains("is-open")) {
      document.body.style.overflow = "";
    }
  }, 320);
};

menuBtn?.addEventListener("click", () => {
  navOverlay.classList.contains("is-open") ? closeNav() : openNav();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navOverlay.classList.contains("is-open")) closeNav();
});

// =====================
// Active nav link highlight
// =====================

const path = window.location.pathname;

document.querySelectorAll(".nav-desktop a, .nav-overlay-link").forEach((link) => {
  const linkPath = new URL(link.href).pathname;
  if (linkPath === path || (path.endsWith("/") && linkPath.endsWith("index.html"))) {
    link.classList.add("active");
  }
});

if (path.endsWith("search.html")) {
  document.querySelector(".search-text")?.classList.add("active");
}

// =====================
// Hero — intro animation + scroll panels (homepage only)
// =====================

const heroIntro = document.getElementById("hero-intro");
const heroIntroText = document.getElementById("hero-intro-text");
const heroWrapper = document.getElementById("hero-wrapper");
const panel1 = document.getElementById("hero-panel-1");
const panel2 = document.getElementById("hero-panel-2");
const headerLogo = document.querySelector(".header-logo");

// Intro: play once per session; skip on return visits
if (heroIntro && heroIntroText && headerLogo) {
  if (sessionStorage.getItem("alazan-intro-shown")) {
    // Return visit: remove overlay instantly, no animation
    heroIntro.style.cssText = "opacity:0;transition:none;pointer-events:none";
    requestAnimationFrame(() => heroIntro.remove());
  } else {
    // First visit: mark shown, run full animation
    sessionStorage.setItem("alazan-intro-shown", "1");
    document.body.style.overflow = "hidden";
    headerLogo.style.opacity = "0";

    setTimeout(() => {
      const logoRect = headerLogo.getBoundingClientRect();
      const textRect = heroIntroText.getBoundingClientRect();
      const dx = (logoRect.left + logoRect.width / 2) - (textRect.left + textRect.width / 2);
      const dy = (logoRect.top + logoRect.height / 2) - (textRect.top + textRect.height / 2);
      const scale = logoRect.width / textRect.width;

      heroIntroText.style.transition = "transform 0.75s cubic-bezier(0.4,0,0.2,1), color 0.75s cubic-bezier(0.4,0,0.2,1)";
      heroIntroText.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      heroIntroText.style.color = "rgba(255,255,255,0.902)";

      heroIntro.style.transition = "background-color 0.75s cubic-bezier(0.4,0,0.2,1)";
      heroIntro.style.backgroundColor = "transparent";

      setTimeout(() => {
        headerLogo.style.transition = "opacity 0.3s";
        headerLogo.style.opacity = "1";
        heroIntro.style.transition = "opacity 0.2s";
        heroIntro.style.opacity = "0";

        setTimeout(() => {
          heroIntro.remove();
          document.body.style.overflow = "";
        }, 220);
      }, 780);
    }, 900);
  }
}

// Scroll: snap panel 1 → panel 2 at threshold
if (heroWrapper && panel1 && panel2) {
  let snapped = false;

  const updateHero = () => {
    const stickyEnd = heroWrapper.offsetHeight - window.innerHeight;
    const progress = window.scrollY / stickyEnd;

    if (!snapped && progress >= 0.45) {
      snapped = true;
      panel1.style.transform = "translateY(-100%)";
      panel2.style.transform = "translateY(0)";
    } else if (snapped && progress < 0.45) {
      snapped = false;
      panel1.style.transform = "translateY(0)";
      panel2.style.transform = "translateY(100%)";
    }
  };

  window.addEventListener("scroll", updateHero, { passive: true });
  updateHero();
}

// =====================
// Hero image slideshow (homepage only)
// =====================

const heroImages = document.querySelectorAll(".hero-bg img");
if (heroImages.length > 1) {
  let currentImg = 0;
  setInterval(() => {
    heroImages[currentImg].classList.remove("active");
    currentImg = (currentImg + 1) % heroImages.length;
    heroImages[currentImg].classList.add("active");
  }, 5000);
}
