/* ============================================================
   script.js — Para Ámbar 💖
   ============================================================ */

// ── FECHA DE INICIO ──────────────────────────────────────────
const START_DATE = new Date('2026-04-03T00:00:00');

// ── MENSAJE TYPEWRITER ───────────────────────────────────────
const MESSAGE = "Eres lo mejor que me ha podido pasar en mi vida. Desde que te conocí, te juro que soy más feliz. Cada vez que veo tu cara, sonrío. Cada vez que escucho tu voz, sonrío. Cada vez que pienso en ti, sonrío. Eres como mi alma gemela, tienes ese ser tan similar al mío, que lo único que haces es enamorarme más y más cada día. Si la reencarnación existe, lo único que pido es volverte a conocer. Eres mi mundo, mi niña hermosa.";

// ── PARTÍCULAS ───────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x    = Math.random() * canvas.width;
      this.y    = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.vx   = (Math.random() - 0.5) * 0.2;
      this.vy   = -Math.random() * 0.3 - 0.1;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '200,164,200' : '180,160,230';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -5) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

// ── PARALLAX ─────────────────────────────────────────────────
(function initParallax() {
  const bg      = document.getElementById('parallaxBg');
  const content = document.getElementById('heroContent');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bg.style.transform      = `translateY(${y * 0.4}px)`;
    content.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
})();

// ── TYPEWRITER ───────────────────────────────────────────────
(function initTypewriter() {
  const el     = document.getElementById('typewriter');
  const cursor = document.querySelector('.cursor');
  let index    = 0;
  let started  = false;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      type();
    }
  }, { threshold: 0.3 });

  observer.observe(el);

  function type() {
    if (index < MESSAGE.length) {
      el.textContent += MESSAGE[index++];
      const delay = MESSAGE[index - 1] === '.' ? 380
                  : MESSAGE[index - 1] === ',' ? 200
                  : 28 + Math.random() * 25;
      setTimeout(type, delay);
    } else {
      cursor.style.display = 'none';
    }
  }
})();

// ── CONTADOR ─────────────────────────────────────────────────
(function initCounter() {
  function update() {
    const now    = new Date();
    let   years  = now.getFullYear() - START_DATE.getFullYear();
    let   months = now.getMonth()    - START_DATE.getMonth();
    let   days   = now.getDate()     - START_DATE.getDate();

    if (days < 0) {
      months--;
      const prev = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) { years--; months += 12; }

    document.getElementById('cnt-years').textContent  = years;
    document.getElementById('cnt-months').textContent = months;
    document.getElementById('cnt-days').textContent   = days;
  }
  update();
  setInterval(update, 60000);
})();

// ── CONFETI ───────────────────────────────────────────────────
(function initConfetti() {
  const btn    = document.getElementById('confettiBtn');
  const canvas = document.getElementById('confettiCanvas');
  const ctx    = canvas.getContext('2d');
  let   pieces = [];
  let   running = false;

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const EMOJIS = ['💖','💜','✨','💕','🌸','💗','⭐'];

  function burst() {
    for (let i = 0; i < 60; i++) {
      pieces.push({
        x:    window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y:    window.innerHeight * 0.7,
        vx:   (Math.random() - 0.5) * 8,
        vy:   -(Math.random() * 10 + 4),
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        alpha: 1,
        size:  16 + Math.random() * 14,
        rot:   Math.random() * 360,
        rotV:  (Math.random() - 0.5) * 6
      });
    }
    if (!running) { running = true; loop(); }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces = pieces.filter(p => p.alpha > 0.01);
    pieces.forEach(p => {
      p.x   += p.vx;
      p.y   += p.vy;
      p.vy  += 0.25;
      p.alpha -= 0.012;
      p.rot += p.rotV;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.font        = `${p.size}px serif`;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();
    });
    if (pieces.length > 0) requestAnimationFrame(loop);
    else running = false;
  }

  btn.addEventListener('click', burst);
})();
