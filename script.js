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

    // ─── ACTIVE NAV on scroll (IntersectionObserver) ─────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const link = Array.from(navLinks).find(l => l.getAttribute('href') === `#${entry.target.id}`);
                if (link) link.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    sections.forEach(sec => navObserver.observe(sec));

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
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position:fixed; width:8px; height:8px;
            background: rgba(240,240,240,1);
            border-radius:0;
            pointer-events:none; z-index:99997;
            transform:translate(-50%,-50%);
            transition:width 0.2s, height 0.2s, opacity 0.2s;
            mix-blend-mode:difference;
        `;
        document.body.appendChild(cursor);

        const cursorRing = document.createElement('div');
        cursorRing.style.cssText = `
            position:fixed; width:36px; height:36px;
            border:1.5px solid rgba(240,240,240,0.4);
            border-radius:0;
            pointer-events:none; z-index:99996;
            transform:translate(-50%,-50%);
            transition:all 0.12s ease;
        `;
        document.body.appendChild(cursorRing);

        let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        let rx = cx, ry = cy;
        let isMoving = false;

        window.addEventListener('mousemove', e => {
            cx = e.clientX;
            cy = e.clientY;
            if (!isMoving) {
                isMoving = true;
                requestAnimationFrame(animCursor);
            }
        });

        function animCursor() {
            cursor.style.left = cx + 'px';
            cursor.style.top = cy + 'px';
            rx += (cx - rx) * 0.12;
            ry += (cy - ry) * 0.12;
            cursorRing.style.left = rx + 'px';
            cursorRing.style.top = ry + 'px';

            if (Math.abs(cx - rx) < 0.1 && Math.abs(cy - ry) < 0.1) {
                isMoving = false;
            } else {
                requestAnimationFrame(animCursor);
            }
        }
        // initial call
        animCursor();

        document.querySelectorAll('a, button, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.style.width = '48px';
                cursorRing.style.height = '48px';
                cursorRing.style.borderColor = 'rgba(240,240,240,1)';
                cursorRing.style.transform = 'translate(-50%,-50%) rotate(45deg)';
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.style.width = '36px';
                cursorRing.style.height = '36px';
                cursorRing.style.borderColor = 'rgba(240,240,240,0.4)';
                cursorRing.style.transform = 'translate(-50%,-50%) rotate(0deg)';
            });
        });
    }

    // ─── TOAST NOTIFICATION & A11Y BINDINGS ──────
    function showToast(msg) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'custom-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');

        if (window.toastTimeout) clearTimeout(window.toastTimeout);

        window.toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Bind toast to project cards
    document.querySelectorAll('[data-toast]').forEach(el => {
        el.addEventListener('click', () => {
            showToast(el.getAttribute('data-toast'));
        });
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showToast(el.getAttribute('data-toast'));
            }
        });
    });

    // ─── FOOTER YEAR ─────────────────────────────
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});
