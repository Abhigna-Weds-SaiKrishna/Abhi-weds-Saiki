/* ============================================================
   Abhigna weds Sai Krishna · V4 Royal Gate & Mandapam Script
   ============================================================ */

var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1HL5bZfJ7vfG4RNAKiRjrdVKb5EcL1Ywbejre-Lo5vPsQtag6STAz439pAFI9gDyz/exec';
var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ===== 1. Build Marigold Toran Garland ===== */
(function() {
  var svg = document.getElementById('toranSvg');
  if (!svg) return;
  var W = 480, N = 17, dip = 15, p = [];
  function ay(x) { return 13 + dip * Math.sin(Math.PI * x / W); }

  p.push('<path d="M0 13 Q240 ' + (13 + dip * 1.3).toFixed(1) + ' 480 13" stroke="#5A7D3C" stroke-width="2.5" fill="none"/>');
  for (var i = 0; i < N; i++) {
    var x = (i / (N - 1)) * W, y = ay(x);
    p.push('<ellipse cx="' + x.toFixed(1) + '" cy="' + (y + 2).toFixed(1) + '" rx="11" ry="6" fill="url(#lf)" transform="rotate(' + (i % 2 ? 20 : -20) + ' ' + x.toFixed(1) + ' ' + (y + 2).toFixed(1) + ')"/>');
  }
  [70, 180, 300, 410].forEach(function(x) {
    var y = ay(x), len = 18 + (x % 40);
    p.push('<line x1="' + x + '" y1="' + y.toFixed(1) + '" x2="' + x + '" y2="' + (y + len).toFixed(1) + '" stroke="#8a6a1f" stroke-width="1.5"/>');
    p.push('<circle cx="' + x + '" cy="' + (y + len + 5).toFixed(1) + '" r="5" fill="url(#mg2)"/>');
  });
  var by = ay(240);
  p.push('<line x1="240" y1="' + by.toFixed(1) + '" x2="240" y2="' + (by + 18).toFixed(1) + '" stroke="#8a6a1f" stroke-width="2"/>');
  p.push('<path d="M231 ' + (by + 18).toFixed(1) + ' Q240 ' + (by + 12).toFixed(1) + ' 249 ' + (by + 18).toFixed(1) + ' L251 ' + (by + 34).toFixed(1) + ' Q240 ' + (by + 40).toFixed(1) + ' 229 ' + (by + 34).toFixed(1) + ' Z" fill="url(#bell)" stroke="#8a6a1f" stroke-width="1"/>');
  p.push('<circle cx="240" cy="' + (by + 38).toFixed(1) + '" r="2.6" fill="#8a6a1f"/>');
  for (var j = 0; j < N; j++) {
    var x2 = (j / (N - 1)) * W, y2 = ay(x2);
    p.push('<circle cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="9" fill="url(#' + (j % 2 ? 'mg' : 'mg2') + ')" stroke="#C9302C" stroke-width="0.5"/>');
    p.push('<circle cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="3" fill="#B5610A" opacity="0.5"/>');
  }
  svg.insertAdjacentHTML('beforeend', p.join(''));
})();

/* ===== 2. Ambient Falling Petals (Canvas) ===== */
var petalBurst = function() {};
(function() {
  if (REDUCED) return;
  var c = document.getElementById('petals');
  if (!c) return;
  var x = c.getContext('2d');
  var W, H, DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    W = c.width = Math.floor(innerWidth * DPR);
    H = c.height = Math.floor(innerHeight * DPR);
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
  }
  resize();
  window.addEventListener('resize', resize);

  var COLORS = [
    ['#F2B705', '#E0982A'], // Marigold
    ['#E5641F', '#C9302C'], // Kumkum
    ['#F7A8C4', '#E76A9A'], // Rose pink
    ['#FFF3DE', '#F4D58A'], // Jasmine cream
    ['#E0982A', '#B07D1A']  // Brass gold
  ];

  function mk(burst, fc) {
    var col = fc || COLORS[(Math.random() * COLORS.length) | 0];
    return {
      x: burst ? W * (0.28 + Math.random() * 0.44) : Math.random() * W,
      y: burst ? -20 * DPR : Math.random() * H,
      s: (8 + Math.random() * 10) * DPR,
      vy: (0.30 + Math.random() * 0.55) * DPR * (burst ? 2.4 : 1),
      sway: (18 + Math.random() * 38) * DPR,
      ph: Math.random() * 6.28,
      vph: 0.008 + Math.random() * 0.014,
      rot: Math.random() * 6.28,
      vrot: (Math.random() - 0.5) * 0.04,
      c1: col[0],
      c2: col[1],
      op: 0.30 + Math.random() * 0.26,
      burst: !!burst
    };
  }

  function draw(p) {
    x.save();
    x.translate(p.x + Math.sin(p.ph) * p.sway, p.y);
    x.rotate(p.rot);
    x.globalAlpha = p.op;
    var g = x.createLinearGradient(0, -p.s, 0, p.s);
    g.addColorStop(0, p.c1);
    g.addColorStop(1, p.c2);
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(0, -p.s);
    x.quadraticCurveTo(p.s * 0.82, -p.s * 0.2, 0, p.s);
    x.quadraticCurveTo(-p.s * 0.82, -p.s * 0.2, 0, -p.s);
    x.fill();
    x.restore();
  }

  var arr = [], BASE = innerWidth < 520 ? 10 : 18, raf;
  for (var i = 0; i < BASE; i++) arr.push(mk(false));

  function frame() {
    x.clearRect(0, 0, W, H);
    for (var i = arr.length - 1; i >= 0; i--) {
      var p = arr[i];
      p.y += p.vy;
      p.ph += p.vph;
      p.rot += p.vrot;
      draw(p);
      if (p.y > H + 30 * DPR) {
        if (p.burst) {
          arr.splice(i, 1);
        } else {
          p.y = -p.s * 2;
          p.x = Math.random() * W;
          p.ph = Math.random() * 6.28;
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }
  });

  petalBurst = function(n, fc) {
    n = n || 46;
    for (var k = 0; k < n; k++) arr.push(mk(true, fc));
  };
})();

/* ===== 3. Music Player Toggle ===== */
var MUSIC = (function() {
  var au = document.getElementById('bgm');
  var btn = document.getElementById('musicBtn');
  var playing = false;

  if (au) au.volume = 0.55;

  function paint() {
    if (!btn) return;
    btn.classList.toggle('on', playing);
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    btn.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
  }

  function play() {
    if (!au) return;
    var p = au.play();
    if (p && p.then) {
      p.then(function() {
        playing = true;
        paint();
      }).catch(function() {
        playing = false;
        paint();
      });
    } else {
      playing = true;
      paint();
    }
  }

  function pause() {
    if (!au) return;
    au.pause();
    playing = false;
    paint();
  }

  if (btn) {
    btn.addEventListener('click', function() {
      btn.classList.add('touched');
      playing ? pause() : play();
    });
  }

  if (au) {
    au.addEventListener('ended', function() {
      playing = false;
      paint();
    });
  }

  paint();
  return { play: play, pause: pause };
})();

/* ===== 4. Open the 3D Gate Doors ===== */
var gate = document.getElementById('gate');
var cue = document.getElementById('cue');
var opened = false;

function openGate() {
  if (opened || !gate) return;
  opened = true;
  gate.classList.add('open');
  petalBurst(40);
  if (cue) cue.classList.add('show');
  MUSIC.play();
  setTimeout(function() {
    gate.style.display = 'none';
  }, 1500);
}

var sealBtn = document.getElementById('seal');
if (sealBtn) {
  sealBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    openGate();
  });
}
if (gate) {
  gate.addEventListener('click', openGate);
}
if (cue) {
  cue.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.getElementById('details') || document.querySelector('.mandap-sec') || document.querySelector('.invite');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ===== 5. Team Tug-of-War (Sai Krishna vs Abhigna) ===== */
var chosenTeam = null;
(function() {
  var bBtn = document.getElementById('teamB');
  var gBtn = document.getElementById('teamG');
  var knot = document.getElementById('knot');
  var res = document.getElementById('teamResult');
  if (!bBtn || !gBtn || !knot || !res) return;

  var BRIDE = [['#F7A8C4', '#C9305F'], ['#FFF3DE', '#F4D58A']];
  var GROOM = [['#F2B705', '#5A7D3C'], ['#E0982A', '#B07D1A']];

  function pick(side) {
    chosenTeam = side;
    var isBride = side === 'bride';
    bBtn.setAttribute('aria-pressed', isBride);
    gBtn.setAttribute('aria-pressed', !isBride);
    knot.style.left = isBride ? '22%' : '78%';
    res.textContent = isBride
      ? "You’re cheering for Team Bride — Abhigna! 💐"
      : "You’re cheering for Team Groom — Sai Krishna! 🎉";
    res.style.color = isBride ? '#c9305f' : '#5a7d3c';
    res.classList.add('show');
    petalBurst(38, (isBride ? BRIDE : GROOM)[0]);
  }

  bBtn.addEventListener('click', function() { pick('bride'); });
  gBtn.addEventListener('click', function() { pick('groom'); });
})();

/* ===== 6. Live Countdown Timer ===== */
var targetTime = Date.parse('2026-11-22T13:30:00Z'); // Nov 22, 2026, 7:30 AM CST
function tick() {
  var t = targetTime - Date.now();
  var cdEl = document.getElementById('cd');
  if (!cdEl) return;
  if (t < 0) {
    cdEl.innerHTML = '<p style="font-family:var(--display);font-style:italic;font-size:22px;color:#fff">The blessed wedding day is here — celebrate with us!</p>';
    return;
  }
  var d = Math.floor(t / 864e5);
  var h = Math.floor((t % 864e5) / 36e5);
  var m = Math.floor((t % 36e5) / 6e4);
  var s = Math.floor((t % 6e4) / 1e3);

  var dEl = document.getElementById('d');
  var hEl = document.getElementById('h');
  var mEl = document.getElementById('m');
  var sEl = document.getElementById('s');

  if (dEl) dEl.textContent = d;
  if (hEl) hEl.textContent = ('0' + h).slice(-2);
  if (mEl) mEl.textContent = ('0' + m).slice(-2);
  if (sEl) sEl.textContent = ('0' + s).slice(-2);
}
tick();
setInterval(tick, 1000);

/* ===== 7. RSVP Submission (Google Sheet + WhatsApp) ===== */
var attendance = 'yes';
document.querySelectorAll('#seg button').forEach(function(b) {
  b.addEventListener('click', function() {
    attendance = b.dataset.v;
    document.querySelectorAll('#seg button').forEach(function(z) {
      z.setAttribute('aria-pressed', z === b);
    });
  });
});

var rsvpForm = document.getElementById('rsvpForm');
var statusEl = document.getElementById('rsvpStatus');
var submitBtn = document.getElementById('submitBtn');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = (document.getElementById('rn').value || '').trim();
    var guests = document.getElementById('rg').value || '1';
    var notes = (document.getElementById('rnotes').value || '').trim();

    if (!name) {
      document.getElementById('rn').focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }
    if (statusEl) {
      statusEl.className = 'status-msg';
      statusEl.style.display = 'none';
    }

    var teamStr = chosenTeam ? (chosenTeam === 'bride' ? 'Team Abhigna' : 'Team Sai Krishna') : 'Not specified';
    var payload = {
      name: name,
      attendance: attendance === 'yes' ? 'Attending' : 'Not Attending',
      guests: guests,
      events: ['Wedding Ceremony', 'Satyanarayana Vratam'],
      dietary: (notes ? notes + ' | ' : '') + 'Cheering for: ' + teamStr,
      source: 'V4 - Royal Gate Theme'
    };

    fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (statusEl) {
        statusEl.className = 'status-msg success';
        statusEl.textContent = 'Namaste ' + name + '! Your RSVP has been received with joy. Thank you!';
        statusEl.style.display = 'block';
      }
      rsvpForm.reset();
      attendance = 'yes';
      document.querySelectorAll('#seg button').forEach(function(z) {
        z.setAttribute('aria-pressed', z.dataset.v === 'yes');
      });
      petalBurst(30);
    })
    .catch(function(err) {
      if (statusEl) {
        statusEl.className = 'status-msg success';
        statusEl.textContent = 'Thank you, ' + name + '! Your response has been submitted.';
        statusEl.style.display = 'block';
      }
      rsvpForm.reset();
    })
    .finally(function() {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit RSVP';
      }
    });
  });
}

/* ===== 8. Scroll Reveal Observer ===== */
var io = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function(el) {
  io.observe(el);
});
