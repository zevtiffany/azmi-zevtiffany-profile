// =============================================
//  AZMI WIDHI ZEVTIFFANY — PORTFOLIO SCRIPT
//  Theme: Vintage Archive × Retro Streetwear
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ─── NAVBAR: Hamburger ───────────────────────
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', open);
        });
        navMenu.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => navMenu.classList.remove('open'))
        );
    }

    // ─── ACTIVE NAV on scroll ────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                const link = [...navLinks].find(l => l.getAttribute('href') === `#${sec.id}`);
                if (link) link.classList.add('active');
            }
        });
    }, { passive: true });

    // ─── SCROLL TO TOP ───────────────────────────
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ─── REVEAL ON SCROLL ────────────────────────
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ─── SKILL BARS ──────────────────────────────
    const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.width = e.target.getAttribute('data-width') + '%';
                skillObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = '0';
        skillObs.observe(bar);
    });

    // ─── ABOUT: Show More ─────────────────────────
    const aboutText = document.getElementById('about-text');
    const showMoreBtn = document.getElementById('show-more-btn');

    if (aboutText && showMoreBtn) {
        aboutText.classList.add('collapsed');
        showMoreBtn.addEventListener('click', () => {
            const c = aboutText.classList.toggle('collapsed');
            showMoreBtn.textContent = c ? '▼ Read More' : '▲ Collapse';
        });
    }

    // ─── CURSOR: vintage crosshair dot ───────────
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position:fixed; width:10px; height:10px;
        border:1px solid rgba(168,63,28,0.7);
        border-radius:50%;
        pointer-events:none; z-index:99997;
        transform:translate(-50%,-50%);
        transition:width 0.2s, height 0.2s, opacity 0.2s;
        mix-blend-mode:difference;
    `;
    document.body.appendChild(cursor);

    const cursorRing = document.createElement('div');
    cursorRing.style.cssText = `
        position:fixed; width:36px; height:36px;
        border:1px solid rgba(168,63,28,0.25);
        border-radius:50%;
        pointer-events:none; z-index:99996;
        transform:translate(-50%,-50%);
        transition:all 0.12s ease;
    `;
    document.body.appendChild(cursorRing);

    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let rx = cx, ry = cy;

    window.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });

    function animCursor() {
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
        rx += (cx - rx) * 0.12;
        ry += (cy - ry) * 0.12;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top = ry + 'px';
        requestAnimationFrame(animCursor);
    }
    animCursor();

    // Expand ring on hover over links/buttons
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '52px';
            cursorRing.style.height = '52px';
            cursorRing.style.borderColor = 'rgba(168,63,28,0.6)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '36px';
            cursorRing.style.height = '36px';
            cursorRing.style.borderColor = 'rgba(168,63,28,0.25)';
        });
    });

    // ─── FOOTER YEAR ─────────────────────────────
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});
