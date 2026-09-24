/* ============================================
   GLOBE SKILLZ — Interactions
   ============================================ */

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ---------- Preloader ---------- */
  const preloader = $('#preloader');
  const prCount = $('#prCount');
  let prVal = 0;
  const prTick = setInterval(() => {
    prVal = Math.min(100, prVal + Math.random() * 9 + 4);
    if (prCount) prCount.textContent = 'LOADING · ' + String(Math.round(prVal)).padStart(3, '0');
    if (prVal >= 100) clearInterval(prTick);
  }, 90);

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader?.classList.add('done');
      document.body.classList.add('loaded');
      revealHero();
    }, 1600);
  });
  // fallback in case load never fires
  setTimeout(() => { if (!preloader.classList.contains('done')) { preloader.classList.add('done'); revealHero(); } }, 3200);

  /* ---------- Split text (chars) ---------- */
  $$('.split[data-split="chars"]').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    for (const ch of text) {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(s);
    }
  });
  $$('.split[data-split="words"]').forEach(el => {
    const words = el.textContent.split(' ');
    el.innerHTML = '';
    words.forEach(w => {
      const s = document.createElement('span');
      s.className = 'word';
      s.textContent = w;
      el.appendChild(s);
    });
  });

  function revealHero() {
    // Stagger hero chars
    $$('#hero .split').forEach((el, i) => {
      const chars = $$('.char, .word', el);
      chars.forEach((c, j) => {
        c.style.transitionDelay = `${i * 0.2 + j * 0.045}s`;
      });
      requestAnimationFrame(() => el.classList.add('in'));
    });
    $$('#hero .reveal').forEach(el => el.classList.add('in'));
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        // If it contains splits, stagger their chars
        $$('.split', e.target).forEach(el => {
          const chars = $$('.char, .word', el);
          chars.forEach((c, j) => c.style.transitionDelay = `${j * 0.04}s`);
          el.classList.add('in');
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => io.observe(el));
  $$('.split').forEach(el => {
    if (!el.closest('#hero')) io.observe(el);
  });

  /* ---------- Custom cursor ---------- */
  const cDot = $('.cursor-dot');
  const cRing = $('.cursor-ring');
  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;
  let dx = mx, dy = my;

  if (!isTouch) {
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });

    const tickCursor = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      cRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(tickCursor);
    };
    tickCursor();

    // Hover states
    const hoverSel = 'a, button, [data-magnetic], .service-card, .p-card, .loc-card, .price-card, .faq-item__q';
    document.addEventListener('mouseover', e => {
      const t = e.target.closest(hoverSel);
      if (t) {
        document.body.classList.add('cursor-hover');
        if (t.dataset.cursor === 'view') document.body.classList.add('cursor-view');
      }
    });
    document.addEventListener('mouseout', e => {
      const t = e.target.closest(hoverSel);
      if (t) {
        document.body.classList.remove('cursor-hover', 'cursor-view');
      }
    });
  } else {
    document.body.classList.add('no-cursor');
  }

  /* ---------- Hero spotlight ---------- */
  const hero = $('#hero');
  const spotlight = $('#spotlight');
  if (hero && spotlight && !isTouch) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlight.style.setProperty('--mx', x + '%');
      spotlight.style.setProperty('--my', y + '%');
    }, { passive: true });
  }

  /* ---------- Hero globe parallax on mousemove + subtle scroll ---------- */
  const heroStage = $('#heroStage');
  if (heroStage && !isTouch) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      heroStage.style.transform = `perspective(1400px) rotateY(${nx * 8}deg) rotateX(${-ny * 6}deg)`;
    }, { passive: true });
    hero.addEventListener('mouseleave', () => {
      heroStage.style.transform = '';
    });
  }

  /* ---------- Location pins on hero globe ---------- */
  const pinsG = $('#pins');
  if (pinsG) {
    const pins = [
      { x: 220, y: 320 }, { x: 310, y: 260 }, { x: 490, y: 300 },
      { x: 560, y: 380 }, { x: 400, y: 200 }, { x: 350, y: 460 },
      { x: 520, y: 480 }, { x: 250, y: 460 }
    ];
    pins.forEach((p, i) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.innerHTML = `
        <circle cx="${p.x}" cy="${p.y}" r="14" fill="none" stroke="url(#hgradbold)" stroke-width="1" opacity=".4">
          <animate attributeName="r" from="4" to="18" dur="2.4s" begin="${i * 0.3}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from=".7" to="0" dur="2.4s" begin="${i * 0.3}s" repeatCount="indefinite"/>
        </circle>
        <circle cx="${p.x}" cy="${p.y}" r="4" fill="#a3ff5c" filter="drop-shadow(0 0 8px #a3ff5c)"/>
      `;
      pinsG.appendChild(g);
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!isTouch && !prefersReduce) {
    $$('[data-magnetic]').forEach(el => {
      let raf, tx = 0, ty = 0, targetX = 0, targetY = 0;
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        targetX = (e.clientX - r.left - r.width / 2) * strength;
        targetY = (e.clientY - r.top - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(tick);
      });
      el.addEventListener('mouseleave', () => {
        targetX = 0; targetY = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      });
      function tick() {
        tx += (targetX - tx) * 0.2;
        ty += (targetY - ty) * 0.2;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        if (Math.abs(tx - targetX) > 0.05 || Math.abs(ty - targetY) > 0.05) {
          raf = requestAnimationFrame(tick);
        } else { raf = null; }
      }
    });
  }

  /* ---------- 3D tilt ---------- */
  if (!isTouch && !prefersReduce) {
    $$('[data-tilt]').forEach(card => {
      let raf, rx = 0, ry = 0, targetRx = 0, targetRy = 0;
      const max = 8;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        targetRy = nx * max;
        targetRx = -ny * max;
        if (!raf) raf = requestAnimationFrame(tick);
      });
      card.addEventListener('mouseleave', () => {
        targetRx = 0; targetRy = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      });
      function tick() {
        rx += (targetRx - rx) * 0.18;
        ry += (targetRy - ry) * 0.18;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
        if (Math.abs(rx - targetRx) > 0.05 || Math.abs(ry - targetRy) > 0.05) {
          raf = requestAnimationFrame(tick);
        } else { raf = null; }
      }
    });
  }

  /* ---------- Parallax on scroll ---------- */
  const parallaxEls = $$('.parallax[data-parallax]');
  const onScroll = () => {
    const y = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });

    // Nav scrolled
    const nav = $('#nav');
    if (nav) nav.classList.toggle('scrolled', y > 40);

    // Process line progress
    const pList = $('#processList');
    if (pList) {
      const r = pList.getBoundingClientRect();
      const visible = Math.max(0, Math.min(1, (innerHeight * 0.7 - r.top) / r.height));
      pList.style.setProperty('--progress', (visible * 100) + '%');
      const steps = $$('.process-step', pList);
      steps.forEach((s, i) => {
        const sr = s.getBoundingClientRect();
        s.classList.toggle('active', sr.top < innerHeight * 0.55);
      });
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Count-up ---------- */
  const counters = $$('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const decimal = parseInt(el.dataset.decimal || '0', 10);
      const dur = 1800;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        const formatted = decimal > 0 ? val.toFixed(decimal) : Math.round(val).toLocaleString();
        el.textContent = formatted + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => cio.observe(c));

  /* ---------- FAQ accordion ---------- */
  $$('.faq-item').forEach(item => {
    const q = $('.faq-item__q', item);
    const a = $('.faq-item__a', item);
    q.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    });
  });

  /* ============================================
     PORTFOLIO VIDEO RAIL — probe then mount
     ============================================ */
  $$('#videoGrid .video-card').forEach(card => {
    const src = card.dataset.video;
    if (!src) return;
    fetch(src, { method: 'HEAD' }).then(r => {
      if (!r.ok) throw new Error('missing');
      const v = document.createElement('video');
      v.src = src; v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'metadata';
      card.insertBefore(v, card.firstChild);
      card.addEventListener('mouseenter', () => v.play().catch(()=>{}));
      card.addEventListener('mouseleave', () => v.pause());
    }).catch(() => {
      // Video file missing — show a subtle placeholder
      card.style.background = 'linear-gradient(135deg, rgba(124,92,255,.18), rgba(34,211,238,.12))';
      card.style.opacity = '.55';
    });
  });

  /* ============================================
     COVERAGE — real SEO pages catalog
     ============================================ */
  const covGrid = $('#covGrid');
  const covCount = $('#covCount');
  const covSearch = $('#covSearch');
  let covIndex = null;
  let activeKind = 'us-state';
  let query = '';

  function renderCoverage() {
    if (!covGrid || !covIndex) return;
    let pool;
    if (activeKind === 'niche') {
      pool = covIndex.niches.map(n => ({ ...n, kind: 'niche', label: 'Niche', display: n.niche, keyword: n.keyword }));
    } else {
      pool = covIndex.locations
        .filter(l => l.type === activeKind)
        .map(l => ({ ...l, kind: 'loc', label: kindLabel(l.type), display: l.place, keyword: l.keyword }));
    }
    const q = query.toLowerCase();
    const filtered = q ? pool.filter(p => p.display.toLowerCase().includes(q) || p.keyword.toLowerCase().includes(q)) : pool;
    const shown = filtered.slice(0, 120);
    covGrid.innerHTML = shown.map(p => `
      <a class="loc-card" href="location.html?slug=${p.slug}&type=${p.kind}">
        <div class="loc-card__service">${p.label}</div>
        <div class="loc-card__title">${p.keyword}</div>
        <div class="loc-card__meta"><span>${p.display}</span><span class="arrow">→</span></div>
      </a>
    `).join('');
    if (covCount) covCount.textContent = `${filtered.length.toLocaleString()} of ${(covIndex.locations.length + covIndex.niches.length).toLocaleString()} pages`;
  }
  function kindLabel(t) {
    return { 'us-state': 'US State', 'uk': 'United Kingdom', 'canada': 'Canada', 'eu-country': 'Europe', 'city': 'City' }[t] || 'Location';
  }

  fetch('data/index.json').then(r => r.json()).then(idx => {
    covIndex = idx;
    renderCoverage();
  }).catch(err => {
    if (covGrid) covGrid.innerHTML = '<div style="padding:40px;color:var(--text-mute)">Catalog is loading… make sure to open this via http:// (not file://).</div>';
    console.warn('coverage index load failed', err);
  });

  $$('#covTabs .coverage__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('#covTabs .coverage__tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      let kind = tab.dataset.kind;
      if (kind === 'eu') kind = 'eu-country';
      activeKind = kind;
      renderCoverage();
    });
  });
  if (covSearch) {
    covSearch.addEventListener('input', (e) => {
      query = e.target.value.trim();
      renderCoverage();
    });
  }

  })();
