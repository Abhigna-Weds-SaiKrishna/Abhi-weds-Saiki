// ==========================================================================
// SAI KRISHNA WEDS ABHIGNA — VERSION 2 LOGIC
// ==========================================================================

const V2_CONFIG = {
  couple: {
    groom: 'Sai Krishna',
    bride: 'Abhigna'
  },
  date: {
    weddingDay: 'Sunday, November 22, 2026',
    muhurtham: 'Muhurtham · 9:22 AM'
  },
  location: {
    wedding: 'Round Rock Conference Center and Banquet Hall at Wingate by Wyndham, 1209 I 35 N Frontage Rd, Round Rock, TX 78664',
    puja: '309 Redonda Dr, Liberty Hill, Texas'
  },
  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbw1HL5bZfJ7vfG4RNAKiRjrdVKb5EcL1Ywbejre-Lo5vPsQtag6STAz439pAFI9gDyz/exec'
};

// Helper selector
const $ = id => document.getElementById(id);

// Emoji burst effect
function triggerEmojiBurst(isAttending) {
  const emojis = isAttending
    ? ['🎉', '💖', '✨', '🥳', '💃', '🕺', '🥂', '🎊', '🌸', '💐']
    : ['😢', '😭', '🥺', '💔', '😞', '😔', '😿', '😥'];

  for (let i = 0; i < 35; i++) {
    const el = document.createElement('div');
    el.className = 'emoji-burst';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 22 + 18) + 'px';
    el.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
    el.style.animationDelay = (Math.random() * 0.3) + 's';

    const drift = (Math.random() - 0.5) * 300 + 'px';
    const rot = (Math.random() - 0.5) * 360 + 'deg';
    el.style.setProperty('--drift', drift);
    el.style.setProperty('--rot', rot);

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}

// Attendance Radio Selection Listener
document.querySelectorAll('input[name="Attending"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const isAttending = radio.value === 'Yes';
    triggerEmojiBurst(isAttending);

    const guestsGroup = $('guests-group');
    const guestsInput = $('guests');
    if (guestsGroup) guestsGroup.hidden = !isAttending;
    if (guestsInput) {
      guestsInput.disabled = !isAttending;
      guestsInput.required = isAttending;
    }
  });
});

// Smooth-scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId !== '#') {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Header scroll elevation
window.addEventListener('scroll', () => {
  const header = document.querySelector('.v2-header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
}, { passive: true });

// RSVP Form Submission
const rsvpForm = $('v2-rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', async e => {
    e.preventDefault();

    const nameInput = $('name');
    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) {
        nameInput.setCustomValidity('Please enter your full name.');
        nameInput.reportValidity();
      }
      return;
    }

    const attendingInput = document.querySelector('input[name="Attending"]:checked');
    const attendingVal = attendingInput ? attendingInput.value : 'Yes';
    const isAttending = attendingVal === 'Yes';

    const preparedResponse = {
      Timestamp: new Date().toISOString(),
      Name: nameInput.value.trim(),
      Attending: attendingVal,
      Events: isAttending ? 'Wedding, Satyanarayana Swami Vratam' : 'None',
      Guests: isAttending ? Number($('guests').value) || 1 : 0,
      Message: $('message') ? $('message').value.trim() : ''
    };

    const statusMsg = $('v2-status');
    const submitBtn = $('v2-submit-btn');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Recording your RSVP…';
    }

    try {
      const body = new URLSearchParams(preparedResponse);
      await fetch(V2_CONFIG.googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });

      if (statusMsg) {
        statusMsg.className = 'v2-status-msg ok';
        statusMsg.textContent = `Thank you, ${preparedResponse.Name}! Your RSVP has been received with love. ♡`;
      }
      rsvpForm.reset();
      const guestsGroup = $('guests-group');
      if (guestsGroup) guestsGroup.hidden = false;
    } catch (err) {
      if (statusMsg) {
        statusMsg.className = 'v2-status-msg warn';
        statusMsg.textContent = 'Your RSVP is recorded! Thank you for celebrating with us.';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send my RSVP ♡';
      }
    }
  });
}

/* ==========================================================================
   INTERACTIVE SUNLIT GOLD STARDUST (Touch & Cursor Repulsion)
   ========================================================================== */
(function initInteractiveStardust() {
  const canvas = document.getElementById('v2SparklesCanvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, DPR = 1;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Pointer tracking (mouse and touch)
  const pointer = {
    x: -9999,
    y: -9999,
    radius: 120, // repulsion radius in CSS pixels
    power: 4.5,
    active: false,
    lastSeen: 0
  };

  function updatePointer(x, y) {
    pointer.x = x;
    pointer.y = y;
    pointer.active = true;
    pointer.lastSeen = performance.now();
  }

  window.addEventListener('pointermove', e => updatePointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointerdown', e => updatePointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', e => {
    if (e.touches && e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
  window.addEventListener('touchstart', e => {
    if (e.touches && e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('pointerleave', () => { pointer.active = false; }, { passive: true });
  window.addEventListener('touchend', () => { pointer.active = false; }, { passive: true });

  // Ethereal Radiant Pink & Rose Dust Palette
  const COLORS = [
    { r: 236, g: 72, b: 127 },   // Radiant Magenta Rose (#EC487F)
    { r: 244, g: 114, b: 160 },  // Vibrant Rose Pink (#F472A0)
    { r: 247, g: 143, b: 179 },  // Blossom Pink (#F78FB3)
    { r: 255, g: 160, b: 190 },  // Soft Rose Quartz (#FFA0BE)
    { r: 255, g: 182, b: 193 }   // Romantic Blush Pink (#FFB6C1)
  ];

  const COUNT = W < 640 ? 45 : 85;
  const particles = [];

  for (let i = 0; i < COUNT; i++) {
    const isStar = Math.random() < 0.45; // 45% pink star twinkles, 55% round pink motes
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: isStar ? (2.0 + Math.random() * 2.5) : (1.0 + Math.random() * 2.2),
      isStar: isStar,
      color: color,
      baseVx: (Math.random() - 0.5) * 0.3,
      baseVy: -(0.2 + Math.random() * 0.45), // gentle upward float
      vx: 0,
      vy: 0,
      phase: Math.random() * Math.PI * 2,
      freq: 0.02 + Math.random() * 0.04,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      twinkle: 1
    });
  }

  let rafId = null;

  function render() {
    ctx.clearRect(0, 0, W, H);

    const now = performance.now();
    let pointerStrength = pointer.active ? 1 : 0;
    if (pointer.active && now - pointer.lastSeen > 1200) {
      pointerStrength = Math.max(0, 1 - (now - pointer.lastSeen - 1200) / 600);
      if (pointerStrength <= 0) pointer.active = false;
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Interactive repulsion physics
      if (pointerStrength > 0) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);

        if (dist < pointer.radius && dist > 1) {
          const force = (1 - dist / pointer.radius) * pointerStrength;
          const push = force * pointer.power;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * push;
          p.vy += Math.sin(angle) * push;

          // Flare up twinkle and spin faster when repelled
          p.twinkle = Math.min(1.8, p.twinkle + force * 0.6);
          p.rot += p.rotSpeed * 5;
        }
      }

      // Physics damping & base drift recovery
      p.vx *= 0.93;
      p.vy = p.vy * 0.93 + p.baseVy * 0.07;
      p.x += p.baseVx + p.vx;
      p.y += p.vy;

      // Smooth wrap-around screen boundaries
      if (p.x < -30) p.x = W + 30;
      else if (p.x > W + 30) p.x = -30;
      if (p.y < -30) p.y = H + 30;
      else if (p.y > H + 30) p.y = -30;

      // Twinkle pulsation
      p.phase += p.freq;
      p.twinkle = Math.max(1, p.twinkle * 0.98); // decay flare back to 1
      const alphaWave = 0.5 + 0.5 * Math.sin(p.phase);
      const alpha = Math.min(0.95, (0.3 + 0.45 * alphaWave) * p.twinkle);

      p.rot += p.rotSpeed;

      const c = p.color;

      if (p.isStar) {
        // Draw 4-point Diamond Star Twinkle (✦)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        const starR = p.r * (0.9 + 0.4 * alphaWave) * p.twinkle;
        const inner = starR * 0.22;

        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
        ctx.shadowColor = `rgba(236, 72, 127, ${alpha * 0.9})`;
        ctx.shadowBlur = 9;

        ctx.beginPath();
        ctx.moveTo(0, -starR);
        ctx.quadraticCurveTo(0, -inner, inner, -inner);
        ctx.quadraticCurveTo(inner, 0, starR, 0);
        ctx.quadraticCurveTo(inner, 0, inner, inner);
        ctx.quadraticCurveTo(0, inner, 0, starR);
        ctx.quadraticCurveTo(0, inner, -inner, inner);
        ctx.quadraticCurveTo(-inner, 0, -starR, 0);
        ctx.quadraticCurveTo(-inner, 0, -inner, -inner);
        ctx.quadraticCurveTo(0, -inner, 0, -starR);
        ctx.closePath();
        ctx.fill();

        // Gleaming bright blush-white center glint
        ctx.fillStyle = `rgba(255, 245, 250, ${Math.min(1, alpha * 1.25)})`;
        ctx.beginPath();
        ctx.arc(0, 0, inner * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      } else {
        // Draw Soft Glowing Round Pink Dust Mote
        ctx.save();
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
        ctx.shadowColor = `rgba(244, 114, 160, ${alpha * 0.85})`;
        ctx.shadowBlur = 7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.85 + 0.35 * alphaWave), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    rafId = requestAnimationFrame(render);
  }

  rafId = requestAnimationFrame(render);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(render);
    }
  });
})();

/* ==========================================================================
   COUNTDOWN TIMER (Nov 22, 2026, 9:22 AM CST = 15:22 UTC)
   ========================================================================== */
(function initCountdownTimer() {
  const weddingDate = new Date('2026-11-22T15:22:00.000Z').getTime();

  const daysEl = $('timer-days');
  const hoursEl = $('timer-hours');
  const minutesEl = $('timer-minutes');
  const secondsEl = $('timer-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function update() {
    const now = Date.now();
    const diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      const note = document.querySelector('.v2-countdown-note');
      if (note) note.textContent = 'The auspicious celebrations have begun! ✨';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(d);
    hoursEl.textContent = pad(h);
    minutesEl.textContent = pad(m);
    secondsEl.textContent = pad(s);
  }

  update();
  setInterval(update, 1000);
})();
