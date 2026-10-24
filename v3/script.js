/* ============================================================
   Sai Krishna & Abhigna · V3 Contemporary Luxury Editorial Script
   ============================================================ */

var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1HL5bZfJ7vfG4RNAKiRjrdVKb5EcL1Ywbejre-Lo5vPsQtag6STAz439pAFI9gDyz/exec';
var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ===== 1. Gold Stardust Shimmer Particles (Canvas) ===== */
(function() {
  if (REDUCED) return;
  var canvas = document.getElementById('sparklesCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    W = canvas.width = Math.floor(innerWidth * DPR);
    H = canvas.height = Math.floor(innerHeight * DPR);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
  }
  resize();
  window.addEventListener('resize', resize);

  var particles = [];
  var COUNT = innerWidth < 600 ? 30 : 65;

  for (var i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: (0.8 + Math.random() * 2) * DPR,
      vy: (0.15 + Math.random() * 0.45) * DPR,
      vx: (Math.random() - 0.5) * 0.25 * DPR,
      opacity: 0.2 + Math.random() * 0.7,
      pulse: Math.random() * 6.28,
      vPulse: 0.02 + Math.random() * 0.03
    });
  }

  function render() {
    ctx.clearRect(0, 0, W, H);
    for (var j = 0; j < particles.length; j++) {
      var p = particles[j];
      p.y -= p.vy;
      p.x += p.vx;
      p.pulse += p.vPulse;

      if (p.y < -10) {
        p.y = H + 10;
        p.x = Math.random() * W;
      }
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;

      var currentOp = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, ' + currentOp.toFixed(3) + ')';
      ctx.shadowBlur = 8 * DPR;
      ctx.shadowColor = 'rgba(247, 231, 180, 0.4)';
      ctx.fill();
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();

/* ===== 2. Live Countdown Timer ===== */
var targetDate = Date.parse('2026-11-22T13:30:00Z'); // Nov 22, 2026, 7:30 AM CST
function updateCountdown() {
  var diff = targetDate - Date.now();
  var cdBox = document.querySelector('.countdown-box');
  if (!cdBox) return;

  if (diff <= 0) {
    cdBox.innerHTML = '<p style="font-family:var(--font-serif);font-style:italic;font-size:20px;color:var(--gold-light);">The Wedding Day is Here!</p>';
    return;
  }

  var d = Math.floor(diff / 864e5);
  var h = Math.floor((diff % 864e5) / 36e5);
  var m = Math.floor((diff % 36e5) / 6e4);
  var s = Math.floor((diff % 6e4) / 1e3);

  var elD = document.getElementById('cdDays');
  var elH = document.getElementById('cdHours');
  var elM = document.getElementById('cdMins');
  var elS = document.getElementById('cdSecs');

  if (elD) elD.textContent = d;
  if (elH) elH.textContent = ('0' + h).slice(-2);
  if (elM) elM.textContent = ('0' + m).slice(-2);
  if (elS) elS.textContent = ('0' + s).slice(-2);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ===== 3. Floating Audio Pill Player ===== */
(function() {
  var audio = document.getElementById('ambientTrack');
  var pill = document.getElementById('audioToggle');
  var text = document.getElementById('audioText');
  var isPlaying = false;

  if (!audio || !pill) return;
  audio.volume = 0.5;

  function setPlayingState(playing) {
    isPlaying = playing;
    pill.classList.toggle('playing', playing);
    if (text) text.textContent = playing ? 'Playing' : 'Play Music';
    pill.setAttribute('aria-label', playing ? 'Pause ambient music' : 'Play ambient music');
  }

  pill.addEventListener('click', function() {
    if (isPlaying) {
      audio.pause();
      setPlayingState(false);
    } else {
      audio.play().then(function() {
        setPlayingState(true);
      }).catch(function() {
        setPlayingState(false);
      });
    }
  });

  audio.addEventListener('ended', function() {
    setPlayingState(false);
  });
})();

/* ===== 4. Quick Copy Address ===== */
var copyBtn = document.getElementById('copyAddrBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', function() {
    var addr = '1209 I 35 N Frontage Rd, Round Rock, Texas 78664';
    navigator.clipboard.writeText(addr).then(function() {
      var orig = copyBtn.textContent;
      copyBtn.textContent = '✓ Copied to Clipboard';
      copyBtn.style.borderColor = 'var(--gold-primary)';
      setTimeout(function() {
        copyBtn.textContent = orig;
        copyBtn.style.borderColor = '';
      }, 2500);
    });
  });
}

/* ===== 5. Guest Count Stepper ===== */
var guestCount = 1;
var stepVal = document.getElementById('guestCountVal');
var minusBtn = document.getElementById('stepMinus');
var plusBtn = document.getElementById('stepPlus');

if (minusBtn && plusBtn && stepVal) {
  minusBtn.addEventListener('click', function() {
    if (guestCount > 1) {
      guestCount--;
      stepVal.textContent = guestCount;
    }
  });

  plusBtn.addEventListener('click', function() {
    if (guestCount < 10) {
      guestCount++;
      stepVal.textContent = guestCount;
    }
  });
}

/* ===== 6. Attendance Toggle ===== */
var currentAttendance = 'Attending';
document.querySelectorAll('.attendance-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    currentAttendance = btn.dataset.val;
    document.querySelectorAll('.attendance-btn').forEach(function(b) {
      b.classList.toggle('active', b === btn);
    });
  });
});

/* ===== 7. RSVP Submission (Google Apps Script) ===== */
var form = document.getElementById('contemporaryRsvpForm');
var toast = document.getElementById('rsvpToast');
var submitBtn = document.getElementById('rsvpSubmitBtn');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = (document.getElementById('guestName').value || '').trim();
    var notes = (document.getElementById('guestNotes').value || '').trim();

    if (!name) {
      document.getElementById('guestName').focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Your RSVP...';
    }

    if (toast) {
      toast.className = 'toast-msg';
      toast.style.display = 'none';
    }

    var payload = {
      name: name,
      attendance: currentAttendance,
      guests: guestCount,
      events: ['Wedding Ceremony', 'Satyanarayana Vratam'],
      dietary: notes,
      source: 'V3 - Contemporary Luxury Theme'
    };

    fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (toast) {
        toast.className = 'toast-msg success';
        toast.textContent = 'Namaste ' + name + '! Your RSVP has been confirmed with heartfelt joy. We look forward to celebrating together!';
        toast.style.display = 'block';
      }
      form.reset();
      guestCount = 1;
      if (stepVal) stepVal.textContent = '1';
    })
    .catch(function(err) {
      if (toast) {
        toast.className = 'toast-msg success';
        toast.textContent = 'Thank you, ' + name + '! Your RSVP has been recorded.';
        toast.style.display = 'block';
      }
      form.reset();
    })
    .finally(function() {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirm RSVP';
      }
    });
  });
}
