/* ============================================================
   Srishti Gangolly — motion engine
   - Page-to-page curtain transitions
   - Scroll-reveal with 3 switchable flavors (subtle/playful/cinematic)
   - Tactile photo hover (3D tilt + lift)
   - Word-by-word heading reveal
   - Nav condense on scroll + parallax (cinematic)
   ============================================================ */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* -------- motion flavor (persisted) -------- */
  const STYLES = ['subtle', 'playful', 'cinematic'];
  let motion = 'playful';
  document.body.setAttribute('data-motion', motion);

  /* =========================================================
     1. NAV — condense on scroll
     ========================================================= */
  const nav = document.querySelector('nav');
  const onScrollNav = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();


  /* =========================================================
     3. WORD-BY-WORD reveal for .word-fade headings
     ========================================================= */
  function splitWords(node) {
    const kids = Array.from(node.childNodes);
    kids.forEach((child) => {
      if (child.nodeType === 3) { // text
        const frag = document.createDocumentFragment();
        const parts = child.textContent.split(/(\s+)/);
        parts.forEach((p) => {
          if (p.trim() === '') { frag.appendChild(document.createTextNode(p)); return; }
          const span = document.createElement('span');
          span.className = 'wf-word';
          span.textContent = p;
          frag.appendChild(span);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1 && child.tagName !== 'BR') {
        splitWords(child);
      }
    });
  }

  const wordHeads = Array.from(document.querySelectorAll('.word-fade')).filter((el) => !el.closest('#contact'));
  if (!reduced) wordHeads.forEach(splitWords);

  function revealWords(el) {
    const words = el.querySelectorAll('.wf-word');
    words.forEach((w, i) => {
      w.style.transitionDelay = (i * 0.08) + 's';
      w.classList.add('in');
      setTimeout(() => {
        w.style.transition = 'none';
        w.style.transform = 'none';
      }, 1100 + i * 80 + 150);
    });
  }

  /* =========================================================
     4. SCROLL REVEAL (flavored)
     ========================================================= */
  // gather targets
  const photoSel = '[style*="#c8c0b4"], [data-tilt-only]'; // polaroid/booth frames + die-cut sticker
  const targets = [];

  function collect() {
    targets.length = 0;
    const set = new Set();
    // paragraphs + banners + headings + teaching paras
    document.querySelectorAll(
      '.about-eyebrow, .word-fade, .about-body > p, .intro-flex-section > p, .section-banner, .teaching-flex > p, .pull-quote, .contact-sub, .contact-links, .footer-note, .hey-title-wrap, .flow'
    ).forEach((el) => { if (!el.closest('#contact')) set.add(el); });
    // photo frames — reveal the polaroid WRAPPER so its rotation is preserved
    document.querySelectorAll(photoSel).forEach((frame) => {
      const wrap = frame.closest('.pol-float-l, .pol-float-r') ||
                   frame.closest('.photobooth-strip') ||
                   frame.parentElement;
      set.add(wrap || frame);
    });
    set.forEach((el) => targets.push(el));
  }

  function baseRot(el) {
    const t = el.style.transform || '';
    const m = t.match(/rotate\((-?[\d.]+)deg\)/);
    return m ? parseFloat(m[1]) : 0;
  }

  function fromState(el) {
    const isPhoto = !!(el.matches && (el.matches('.pol-float-l, .pol-float-r, .photobooth-strip') || (el.querySelector && el.querySelector(photoSel))));
    const rot = baseRot(el);
    let ty, scale, extraRot, blur;
    if (motion === 'subtle') {
      ty = 16; scale = 1; extraRot = 0; blur = 0;
    } else if (motion === 'cinematic') {
      ty = isPhoto ? 70 : 52; scale = isPhoto ? 0.97 : 1; extraRot = 0; blur = isPhoto ? 7 : 5;
    } else { // playful
      ty = isPhoto ? 40 : 28; scale = isPhoto ? 0.9 : 1; extraRot = isPhoto ? (rot >= 0 ? 8 : -8) : 0; blur = 0;
    }
    el.dataset.restRot = rot;
    el.style.opacity = '0';
    el.style.filter = blur ? `blur(${blur}px)` : 'none';
    el.style.transform = `translate3d(0,${ty}px,0) scale(${scale}) rotate(${rot + extraRot}deg)`;
    el.style.willChange = 'transform, opacity, filter';
  }

  function toState(el, delay) {
    const rot = parseFloat(el.dataset.restRot || '0');
    const dur = motion === 'cinematic' ? 1.6 : motion === 'subtle' ? 1.1 : 1.3;
    const ease = motion === 'playful'
      ? 'cubic-bezier(.32,1.25,.4,1)'        // gentle, soft overshoot
      : 'cubic-bezier(.22,.61,.36,1)';      // smooth ease-out
    el.style.transition =
      `transform ${dur}s ${ease} ${delay}s, opacity ${dur * 0.8}s ease ${delay}s, filter ${dur}s ease ${delay}s`;
    el.style.opacity = '1';
    el.style.filter = 'none';
    el.style.transform = `translate3d(0,0,0) scale(1) rotate(${rot}deg)`;
    const settle = (dur + delay) * 1000 + 80;
    setTimeout(() => {
      el.style.willChange = 'auto';
      el.style.transform = rot ? `rotate(${rot}deg)` : 'none';
      if (motion !== 'cinematic') el.style.transition = 'none';
    }, settle);
  }

  function checkReveals() {
    if (reduced) return;
    const trigger = window.innerHeight * 0.9;
    let stagger = 0;
    targets.forEach((el) => {
      if (el.dataset.revealed) return;
      const top = el.getBoundingClientRect().top;
      if (top < trigger && top > -el.offsetHeight - 200) {
        el.dataset.revealed = '1';
        toState(el, Math.min(stagger * 0.11, 0.45));
        stagger++;
        if (el.classList.contains('word-fade') || el.querySelector?.('.wf-word')) {
          const head = el.classList.contains('word-fade') ? el : el.querySelector('.word-fade');
          if (head) revealWords(head);
        }
      } else if (top <= -el.offsetHeight - 200) {
        // already scrolled well past — show without animation
        el.dataset.revealed = '1';
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.filter = 'none';
        el.style.transform = `rotate(${parseFloat(el.dataset.restRot || '0')}deg)`;
      }
    });
  }

  function initReveal() {
    if (reduced) {
      // ensure everything visible
      collect();
      targets.forEach((el) => { el.style.opacity = '1'; el.style.filter = 'none'; });
      document.querySelectorAll('.wf-word').forEach((w) => w.classList.add('in'));
      return;
    }
    collect();
    targets.forEach((el) => { delete el.dataset.revealed; fromState(el); });
    document.querySelectorAll('.wf-word').forEach((w) => w.classList.remove('in'));
  }

  let revTick = false;
  function onScrollReveal() {
    if (revTick) return;
    revTick = true;
    requestAnimationFrame(() => { checkReveals(); revTick = false; });
  }
  window.addEventListener('scroll', onScrollReveal, { passive: true });
  window.addEventListener('resize', () => { collect(); checkReveals(); });

  // Watchdog: guarantees reveals fire regardless of how scroll is delivered
  // (some embeds drive scroll from a parent frame so window 'scroll' is quiet).
  // Throttled to ~10fps and self-terminates once everything is revealed.
  let lastWatch = 0;
  function watchdog(ts) {
    if (reduced) return;
    if (ts - lastWatch > 100) { lastWatch = ts; checkReveals(); }
    if (targets.some((el) => !el.dataset.revealed)) {
      requestAnimationFrame(watchdog);
    }
  }
  function startWatchdog() {
    if (reduced) return;
    requestAnimationFrame(watchdog);
  }

  function reflavor(newStyle) {
    motion = newStyle;
    localStorage.setItem('sg-motion', motion);
    document.body.setAttribute('data-motion', motion);
    if (reduced) return;
    // reset & replay so the change is felt immediately
    initReveal();
    requestAnimationFrame(() => requestAnimationFrame(checkReveals));
  }

  /* =========================================================
     5. TACTILE PHOTO HOVER (3D tilt + lift)
     ========================================================= */
  function bindHover() {
    document.querySelectorAll(photoSel).forEach((frame) => {
      if (frame.dataset.hoverBound) return;
      frame.dataset.hoverBound = '1';
      const parent = frame.parentElement;
      if (parent) parent.style.perspective = '900px';
      // polaroids that have a hand-drawn outline should stay pinned flat —
      // tilt only, no lift / scale / shadow pop.
      const outlined = !!(parent && parent.querySelector('rect[filter="url(#doodle)"]')) ||
                       !!frame.closest('[data-tilt-only]') || frame.hasAttribute('data-tilt-only');
      frame.style.transition = 'transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .25s ease';
      const baseShadow = frame.style.boxShadow;
      frame.addEventListener('mousemove', (e) => {
        if (reduced) return;
        const r = frame.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const rx = (-py * 9).toFixed(2);
        const ry = (px * 11).toFixed(2);
        if (outlined) {
          // tilt only — no pop
          frame.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        } else {
          frame.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-7px) scale(1.035)`;
          frame.style.boxShadow = '8px 16px 0px #c8c0b4, 0 26px 50px rgba(26,22,20,0.30)';
          frame.style.zIndex = '40';
        }
      });
      const reset = () => {
        frame.style.transform = '';
        frame.style.boxShadow = baseShadow;
        frame.style.zIndex = '';
      };
      frame.addEventListener('mouseleave', reset);
    });
  }

  /* =========================================================
     6. PARALLAX (cinematic only) — gentle photo drift
     ========================================================= */
  let parallaxItems = [];
  function collectParallax() {
    parallaxItems = Array.from(document.querySelectorAll('.pol-float-l, .pol-float-r, .photobooth-strip'));
  }
  let ticking = false;
  function parallaxTick() {
    if (motion !== 'cinematic' || reduced) { ticking = false; return; }
    const vh = window.innerHeight;
    parallaxItems.forEach((el, i) => {
      if (!el.dataset.revealed) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const off = (center - vh / 2) / vh;          // -1..1
      const depth = (i % 3 === 0) ? 26 : (i % 3 === 1) ? -18 : 12;
      const rot = parseFloat(el.dataset.restRot || '0');
      el.style.transition = 'transform .15s linear';
      el.style.transform = `translate3d(0,${(off * depth).toFixed(1)}px,0) rotate(${rot}deg)`;
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (motion !== 'cinematic') return;
    if (!ticking) { ticking = true; requestAnimationFrame(parallaxTick); }
  }, { passive: true });

  /* =========================================================
     7. MOTION SWITCHER UI
     ========================================================= */
  function buildSwitcher() {
    const wrap = document.createElement('div');
    wrap.id = 'motion-switch';
    wrap.innerHTML = `
      <span class="ms-label">Motion</span>
      <div class="ms-track" role="tablist">
        <button data-m="subtle">Subtle</button>
        <button data-m="playful">Playful</button>
        <button data-m="cinematic">Cinematic</button>
      </div>`;
    document.body.appendChild(wrap);
    const buttons = wrap.querySelectorAll('button');
    const sync = () => buttons.forEach((b) => b.classList.toggle('active', b.dataset.m === motion));
    sync();
    buttons.forEach((b) => b.addEventListener('click', () => {
      reflavor(b.dataset.m);
      sync();
      collectParallax();
      // nudge: scroll up a hair then back so in-view items replay cleanly
      window.scrollBy({ top: -1, behavior: 'instant' in window ? 'instant' : 'auto' });
    }));

    const style = document.createElement('style');
    style.textContent = `
      #motion-switch{
        position:fixed; right:1.4rem; bottom:1.4rem; z-index:500;
        display:flex; align-items:center; gap:.7rem;
        padding:.5rem .6rem .5rem .9rem; border-radius:999px;
        background:rgba(251,248,241,.82); backdrop-filter:blur(12px) saturate(1.1);
        -webkit-backdrop-filter:blur(12px) saturate(1.1);
        border:1px solid var(--border); box-shadow:0 10px 30px rgba(26,22,20,.14);
        font-family:'DM Sans',sans-serif;
        animation:msIn .7s cubic-bezier(.2,.7,.2,1) .9s both;
      }
      @keyframes msIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      #motion-switch .ms-label{
        font-size:.62rem; font-weight:600; letter-spacing:.14em; text-transform:uppercase;
        color:var(--muted);
      }
      #motion-switch .ms-track{ display:flex; gap:2px; background:rgba(66,0,1,.06); border-radius:999px; padding:3px; }
      #motion-switch button{
        font-family:inherit; font-size:.74rem; font-weight:500; cursor:pointer;
        border:none; background:none; color:var(--muted);
        padding:.34rem .8rem; border-radius:999px;
        transition:color .25s ease, background .25s ease, transform .25s ease;
      }
      #motion-switch button:hover{ color:var(--ink); }
      #motion-switch button.active{ background:var(--oxblood); color:#FBF8F1; box-shadow:0 3px 10px rgba(66,0,1,.22); }
      @media (max-width:768px){
        #motion-switch{ right:.7rem; bottom:.7rem; padding:.4rem .45rem .4rem .7rem; gap:.5rem; }
        #motion-switch .ms-label{ display:none; }
        #motion-switch button{ font-size:.68rem; padding:.32rem .62rem; }
      }
.wf-word{ display:inline-block; opacity:0; transform:translateY(.5em); transition:opacity .95s ease, transform 1.1s cubic-bezier(.22,.61,.36,1); }
      .wf-word.in{ opacity:1; transform:none; }
    `;
    document.head.appendChild(style);
  }

  /* =========================================================
     BOOT
     ========================================================= */
  /* =========================================================
     SLIDE-TO-UNLOCK → About
     ========================================================= */
  function initSlideToUnlock() {
    const wrap = document.getElementById('slide-unlock');
    if (!wrap) return;
    const track = wrap.querySelector('.su-track');
    const knob = wrap.querySelector('.su-knob');
    const text = wrap.querySelector('.su-text');
    let dragging = false, startX = 0, x = 0, max = 0, done = false;

    const calcMax = () => { max = track.clientWidth - knob.offsetWidth - 10; };
    calcMax();
    window.addEventListener('resize', calcMax);

    function setX(v) {
      x = Math.max(0, Math.min(max, v));
      knob.style.transform = 'translateX(' + x + 'px)';
      if (text) text.style.opacity = String(Math.max(0, 1 - (x / max) * 1.4));
    }
    const pointX = (e) => (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX);

    function down(e) {
      if (done) return;
      dragging = true;
      startX = pointX(e) - x;
      knob.style.transition = 'none';
    }
    function move(e) {
      if (!dragging) return;
      setX(pointX(e) - startX);
      if (e.cancelable) e.preventDefault();
    }
    function up() {
      if (!dragging) return;
      dragging = false;
      if (x >= max * 0.88) {
        complete();
      } else {
        knob.style.transition = 'transform .4s cubic-bezier(.34,1.56,.34,1)';
        setX(0);
      }
    }
    function complete() {
      done = true;
      knob.style.transition = 'transform .22s ease';
      setX(max);
      track.classList.add('done');
      setTimeout(() => {
        window.location.href = 'about.html';
      }, 320);
    }

    knob.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    knob.addEventListener('touchstart', down, { passive: false });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
  }

  function boot() {
    initReveal();
    bindHover();
    collectParallax();
    initSlideToUnlock();
    setTimeout(checkReveals, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
