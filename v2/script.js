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
