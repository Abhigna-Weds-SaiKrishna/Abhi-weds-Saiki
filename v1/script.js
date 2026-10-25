// =========================================================================
// WEDDING INVITATION CONFIGURATION & PARAMETERS
// Edit any of the values in this object to customize the website.
// All names, dates, locations, calendar events, and texts update dynamically.
// =========================================================================
const WEDDING_CONFIG = {
  // Couple details
  couple: {
    groom: 'Sai Krishna',
    groomPrefix: 'S/O',
    groomParents: 'Ravindranath & Krishnaveni',
    bride: 'Abhigna',
    bridePrefix: 'D/O',
    brideParents: 'Venkateswara Rao & Anitha',
    initials: 'A & S'
  },

  // Dates & Times
  date: {
    heroBadge: 'SUNDAY · NOVEMBER 22, 2026',
    dayMonth: 'November 22',
    year: '2026',
    dayOfWeek: 'Sunday',
    muhurtham: 'Muhurtham · 9:22 AM',
    timeSummary: 'Sunday, 2026<br>Muhurtham · 9:22 AM',
    footerDate: '22 NOVEMBER 2026',
    // ISO 8601 UTC strings for Google Calendar & .ics files
    isoStart: '20261122T133000Z',
    isoEnd: '20261122T203000Z'
  },

  // Venue & Location
  location: {
    cityState: 'Round Rock, Texas',
    addressHtml: 'Round Rock Conference Center and Banquet Hall at Wingate by Wyndham<br>1209 I 35 N Frontage Rd<br>Round Rock, Texas 78664',
    addressPlain: 'Round Rock Conference Center and Banquet Hall at Wingate by Wyndham, 1209 I 35 N Frontage Rd, Round Rock, TX 78664',
    mapsUrl: 'https://maps.app.goo.gl/WfE8yPbkXVZMxpB6A'
  },

  // Story & Section Headings/Texts
  texts: {
    pageTitle: 'Abhigna weds Sai Krishna · Wedding Celebration',

    // Hero Section
    heroEyebrow: 'LET THE CELEBRATION BEGIN',
    heroLede1: 'With divine grace and the blessings of our families,<br>we warmly invite you to be part of our<br>wedding celebrations.',
    heroLede2: 'A little tradition, a lot of joy,<br>and a lifetime of togetherness.',
    heroCaption: '',

    // Events / Celebrations Section
    eventsEyebrow: '',
    eventsTitle: '',

    // Details Section
    detailsDateEyebrow: 'The auspicious day',
    detailsLocationEyebrow: 'Where love gathers',
    detailsBlessNote: 'Your presence is our greatest blessing.',

    // RSVP Section
    rsvpEyebrow: 'Come for the wedding, stay for the memories',
    rsvpTitle: 'A seat saved<br>with love.',
    rsvpDescription: 'We would love to celebrate this beautiful beginning with you. Let us know if you can join us.',
    rsvpYes: 'Yes, will be there!',
    rsvpDecline: 'No, cannot make it',
    rsvpDeclineIcon: '🥺',

    // Footer
    footerSubtext: 'MADE WITH LOVE'
  },

  // 2 Wedding Events (Marriage, Satyanarayana Vratam)
  events: [
    {
      id: 'marriage',
      badge: 'The Wedding',
      title: 'Wedding',
      timeDetail: 'Sunday, Nov 22, 2026<br>Starts at 7:30 AM<br>Muhurtham · 9:22 AM<br>Breakfast and lunch follows',
      actionText: 'Join our celebration ↓',
      locationHeading: 'Round Rock, TX',
      locationAddress: 'Round Rock Conference Center and Banquet Hall at Wingate by Wyndham<br>1209 I 35 N Frontage Rd<br>Round Rock, Texas 78664',
      mapsUrl: 'https://maps.app.goo.gl/WfE8yPbkXVZMxpB6A'
    },
    {
      id: 'satyanarayana-vratam',
      badge: 'Post-Wedding Puja',
      title: 'Satyanarayana Swami Vratam',
      timeDetail: 'Monday, Nov 23, 2026<br>Auspicious Puja · 5:00 AM',
      actionText: 'Seek divine blessings ↓',
      locationHeading: 'Liberty Hill, TX',
      locationAddress: '309 Redonda Dr<br>Liberty Hill, Texas',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=309+Redonda+Dr+Liberty+Hill+TX'
    }
  ],

  // Emojis for celebratory & declined RSVP responses
  emojis: {
    attending: ['🎉', '💖', '✨', '🥳', '💃', '🕺', '🥂', '🎊'],
    cannotCome: ['😢', '😭', '🥺', '💔', '😞', '😔', '😿', '😥']
  },

  // Calendar Event (.ics download & Google Calendar)
  calendar: {
    title: 'Abhigna weds Sai Krishna Wedding',
    description: 'Join us to celebrate the wedding of Abhigna and Sai Krishna (Starts at 7:30 AM, Muhurtham at 9:22 AM). Breakfast and lunch follows.',
    icsFilename: 'Abhigna-Sai-Krishna-Wedding.ics',
    uid: 'abhigna-sai-20261122@wedding'
  },

  // Google Apps Script Web App URL for recording RSVPs to Google Sheets
  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbw1HL5bZfJ7vfG4RNAKiRjrdVKb5EcL1Ywbejre-Lo5vPsQtag6STAz439pAFI9gDyz/exec'
};

if (typeof window !== 'undefined') {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}

const $ = id => document.getElementById(id);

// =========================================================================
// DYNAMIC DOM POPULATION
// Applies all parameters from WEDDING_CONFIG to the HTML document.
// =========================================================================
function applyWeddingConfig() {
  const c = WEDDING_CONFIG;
  if (!c) return;

  // 1. Page Title
  if (c.texts && c.texts.pageTitle) {
    document.title = c.texts.pageTitle;
  }

  // 2. Header Brand
  const brandLink = $('brand-link');
  if (brandLink && c.couple) {
    brandLink.textContent = c.couple.initials || `${c.couple.groom[0]} & ${c.couple.bride[0]}`;
  }

  // 3. Hero Section
  const heroEyebrow = $('hero-eyebrow');
  if (heroEyebrow && c.texts) heroEyebrow.innerHTML = c.texts.heroEyebrow;

  const heroGroomName = $('hero-groom-name');
  if (heroGroomName && c.couple) heroGroomName.textContent = c.couple.groom;

  const heroGroomPrefix = $('hero-groom-prefix');
  if (heroGroomPrefix && c.couple) heroGroomPrefix.textContent = c.couple.groomPrefix || 'S/O';

  const heroGroomParents = $('hero-groom-parents');
  if (heroGroomParents && c.couple) heroGroomParents.textContent = c.couple.groomParents;

  const heroBrideName = $('hero-bride-name');
  if (heroBrideName && c.couple) heroBrideName.textContent = c.couple.bride;

  const heroBridePrefix = $('hero-bride-prefix');
  if (heroBridePrefix && c.couple) heroBridePrefix.textContent = c.couple.bridePrefix || 'D/O';

  const heroBrideParents = $('hero-bride-parents');
  if (heroBrideParents && c.couple) heroBrideParents.textContent = c.couple.brideParents;

  const heroLede1 = $('hero-lede-1');
  if (heroLede1 && c.texts) heroLede1.innerHTML = c.texts.heroLede1;

  const heroNames = $('hero-couple-heading');
  if (heroNames && c.couple) {
    heroNames.innerHTML = `${c.couple.groom}<span>&amp;</span>${c.couple.bride}`;
  }

  const heroLede2 = $('hero-lede-2');
  if (heroLede2 && c.texts) heroLede2.innerHTML = c.texts.heroLede2;

  const heroDate = $('hero-date');
  if (heroDate && c.date) heroDate.textContent = c.date.heroBadge;

  const heroLocation = $('hero-location');
  if (heroLocation && c.location) heroLocation.textContent = c.location.cityState;

  const heroCaption = $('hero-caption');
  if (heroCaption && c.texts) heroCaption.innerHTML = c.texts.heroCaption;

  // Google Calendar Link
  const gcalLink = $('gcal-link');
  if (gcalLink && c.calendar && c.date && c.location) {
    const gcalUrl = new URL('https://calendar.google.com/calendar/render');
    gcalUrl.searchParams.set('action', 'TEMPLATE');
    gcalUrl.searchParams.set('text', c.calendar.title);
    gcalUrl.searchParams.set('dates', `${c.date.isoStart}/${c.date.isoEnd}`);
    gcalUrl.searchParams.set('details', c.calendar.description);
    gcalUrl.searchParams.set('location', c.location.addressPlain);
    gcalLink.href = gcalUrl.toString();
  }

  // 4. Celebrations & Event Blocks
  const eventsEyebrow = $('events-eyebrow');
  if (eventsEyebrow && c.texts && c.texts.eventsEyebrow) eventsEyebrow.innerHTML = c.texts.eventsEyebrow;

  const eventsTitle = $('events-title');
  if (eventsTitle && c.texts && c.texts.eventsTitle) eventsTitle.innerHTML = c.texts.eventsTitle;

  if (c.events && Array.isArray(c.events)) {
    // 1. Marriage
    const ev2 = c.events.find(e => e.id === 'marriage') || c.events[0];
    if (ev2) {
      const b = $('event-2-badge'); if (b && ev2.badge) b.textContent = ev2.badge;
      const t = $('event-2-title'); if (t && ev2.title) t.textContent = ev2.title;
      const tm = $('event-2-time'); if (tm && ev2.timeDetail) tm.innerHTML = ev2.timeDetail;
      const a = $('event-2-action'); if (a && ev2.actionText) a.textContent = ev2.actionText;
      const lh = $('event-2-location'); if (lh && ev2.locationHeading) lh.textContent = ev2.locationHeading;
      const la = $('event-2-address'); if (la && ev2.locationAddress) la.innerHTML = ev2.locationAddress;
      const m = $('event-2-map'); if (m && ev2.mapsUrl) m.href = ev2.mapsUrl;
    }

    // 2. Satyanarayana Vratam
    const ev3 = c.events.find(e => e.id === 'satyanarayana-vratam') || c.events[1];
    if (ev3) {
      const b = $('event-3-badge'); if (b && ev3.badge) b.textContent = ev3.badge;
      const t = $('event-3-title'); if (t && ev3.title) t.textContent = ev3.title;
      const tm = $('event-3-time'); if (tm && ev3.timeDetail) tm.innerHTML = ev3.timeDetail;
      const a = $('event-3-action'); if (a && ev3.actionText) a.textContent = ev3.actionText;
      const lh = $('event-3-location'); if (lh && ev3.locationHeading) lh.textContent = ev3.locationHeading;
      const la = $('event-3-address'); if (la && ev3.locationAddress) la.innerHTML = ev3.locationAddress;
      const m = $('event-3-map'); if (m && ev3.mapsUrl) m.href = ev3.mapsUrl;
    }
  }

  // Fallback bindings for existing single-card IDs
  const detailsDateEyebrow = $('details-date-eyebrow');
  if (detailsDateEyebrow && c.texts) detailsDateEyebrow.innerHTML = c.texts.detailsDateEyebrow;

  const detailsDateHeading = $('details-date-heading');
  if (detailsDateHeading && c.date) detailsDateHeading.textContent = c.date.dayMonth;

  const detailsDateSub = $('details-date-sub');
  if (detailsDateSub && c.date) detailsDateSub.innerHTML = c.date.timeSummary;

  const detailsLocationEyebrow = $('details-location-eyebrow');
  if (detailsLocationEyebrow && c.texts) detailsLocationEyebrow.innerHTML = c.texts.detailsLocationEyebrow;

  const detailsLocationHeading = $('details-location-heading');
  if (detailsLocationHeading && c.location) detailsLocationHeading.textContent = c.location.cityState;

  const detailsLocationAddress = $('details-location-address');
  if (detailsLocationAddress && c.location) detailsLocationAddress.innerHTML = c.location.addressHtml;

  const directionsLink = $('directions-link');
  if (directionsLink && c.location) directionsLink.href = c.location.mapsUrl;

  const detailsBlessNote = $('details-bless-note');
  if (detailsBlessNote && c.texts) detailsBlessNote.innerHTML = c.texts.detailsBlessNote;

  // 5. RSVP Section
  const rsvpEyebrow = $('rsvp-eyebrow');
  if (rsvpEyebrow && c.texts) rsvpEyebrow.innerHTML = c.texts.rsvpEyebrow;

  const rsvpTitle = $('rsvp-title');
  if (rsvpTitle && c.texts) rsvpTitle.innerHTML = c.texts.rsvpTitle;

  const rsvpDesc = $('rsvp-desc');
  if (rsvpDesc && c.texts) rsvpDesc.innerHTML = c.texts.rsvpDescription;

  const rsvpYesLabel = $('rsvp-yes-label');
  if (rsvpYesLabel && c.texts && c.texts.rsvpYes) rsvpYesLabel.textContent = c.texts.rsvpYes;

  const rsvpDeclineLabel = $('rsvp-decline-label');
  if (rsvpDeclineLabel && c.texts && c.texts.rsvpDecline) rsvpDeclineLabel.textContent = c.texts.rsvpDecline;

  const rsvpDeclineIcon = $('rsvp-decline-icon');
  if (rsvpDeclineIcon && c.texts && c.texts.rsvpDeclineIcon) {
    rsvpDeclineIcon.textContent = c.texts.rsvpDeclineIcon;
  }


  // 6. Footer
  const footerNames = $('footer-names');
  if (footerNames && c.couple) footerNames.textContent = `${c.couple.groom} & ${c.couple.bride}`;

  const footerSub = $('footer-sub');
  if (footerSub && c.date && c.texts) {
    footerSub.textContent = `${c.date.footerDate} · ${c.texts.footerSubtext}`;
  }
}

// Function to spawn floating emojis
function triggerEmojiBurst(isAttending) {
  const c = WEDDING_CONFIG;
  const emojis = isAttending
    ? (c.emojis && c.emojis.attending ? c.emojis.attending : ['🎉', '💖', '✨', '🥳', '💃', '🕺', '🥂', '🎊'])
    : (c.emojis && c.emojis.cannotCome ? c.emojis.cannotCome : ['😢', '😭', '🥺', '💔', '😞', '😔', '😿', '😥']);

  const burstCount = 35;

  for (let i = 0; i < burstCount; i++) {
    const el = document.createElement('div');
    el.className = 'emoji-burst';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 24 + 16) + 'px';
    el.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
    el.style.animationDelay = (Math.random() * 0.4) + 's';

    const drift = (Math.random() - 0.5) * 300 + 'px';
    const rot = (Math.random() - 0.5) * 360 + 'deg';
    el.style.setProperty('--drift', drift);
    el.style.setProperty('--rot', rot);

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}

// Watch for radio button changes
document.querySelectorAll('input[name="Attending"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const isAttending = radio.value === 'Yes' || radio.value === 'Bride Side' || radio.value === 'Groom Side';

    triggerEmojiBurst(isAttending);

    const partyField = $('party-field');
    const guests = $('guests');
    if (partyField) partyField.hidden = !isAttending;
    if (guests) {
      guests.disabled = !isAttending;
      guests.required = isAttending;
    }
  });
});

// Smooth-scroll navigation for all in-page buttons & links
document.querySelectorAll('[data-scroll]').forEach(link => {
  link.addEventListener('click', e => {
    const targetSelector = link.getAttribute('data-scroll');
    const target = document.querySelector(targetSelector);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Optional .ics calendar button support
const calendarBtn = $('calendar');
if (calendarBtn) {
  calendarBtn.addEventListener('click', () => {
    const c = WEDDING_CONFIG;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${c.couple.groom} and ${c.couple.bride}//Wedding//EN`,
      'BEGIN:VEVENT',
      `UID:${c.calendar.uid}`,
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      `DTSTART:${c.date.isoStart}`,
      `DTEND:${c.date.isoEnd}`,
      `SUMMARY:${c.calendar.title}`,
      `LOCATION:${c.location.addressPlain.replace(/,/g, '\\,')}`,
      `DESCRIPTION:${c.calendar.description}`,
      'END:VEVENT',
      'END:VCALENDAR',
      ''
    ].join('\r\n');
    downloadFile(c.calendar.icsFilename, icsContent, 'text/calendar;charset=utf-8');
  });
}

let preparedResponse = null;

const nameInput = $('name');
if (nameInput) {
  nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
}

const rsvpForm = $('rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', async e => {
    e.preventDefault();
    const nameField = $('name');
    if (!nameField || !nameField.value.trim()) {
      if (nameField) {
        nameField.setCustomValidity('Please enter your full name.');
        nameField.reportValidity();
      }
      return;
    }

    const attendingInput = document.querySelector('input[name="Attending"]:checked');
    const attendingVal = attendingInput ? attendingInput.value : '';
    const isAttending = attendingVal === 'Yes' || attendingVal === 'Bride Side' || attendingVal === 'Groom Side';

    preparedResponse = {
      Timestamp: new Date().toISOString(),
      Name: nameField.value.trim(),
      Attending: attendingVal,
      Events: isAttending ? 'Wedding, Satyanarayana Swami Vratam' : 'None',
      Guests: isAttending ? Number($('guests').value) || 1 : 0,
      Message: $('message') ? $('message').value.trim() : ''
    };

    const status = $('status');
    const button = $('submit');
    const downloadRsvp = $('download-rsvp');
    const scriptUrl = WEDDING_CONFIG.googleScriptUrl;
    const isConfigured = scriptUrl && !scriptUrl.includes('PASTE_YOUR_');

    if (!isConfigured) {
      if (status) {
        status.className = 'status warn';
        status.textContent = 'Thank you! Please click below to download your RSVP copy to share with the couple.';
      }
      if (downloadRsvp) downloadRsvp.hidden = false;
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }
    if (status) {
      status.className = 'status';
      status.textContent = '';
    }

    try {
      const body = new URLSearchParams(preparedResponse);
      await fetch(scriptUrl.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });

      if (status) {
        status.className = 'status ok';
        status.textContent = `Thank you, ${preparedResponse.Name}! Your RSVP has been recorded with love. ♡`;
      }
      if (downloadRsvp) downloadRsvp.hidden = false;
      rsvpForm.reset();
      const partyField = $('party-field');
      if (partyField) partyField.hidden = false;
    } catch (error) {
      if (status) {
        status.className = 'status warn';
        status.textContent = 'We could not confirm delivery right now. Please download a copy of your RSVP below.';
      }
      if (downloadRsvp) downloadRsvp.hidden = false;
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = 'Send my RSVP ♡';
      }
    }
  });
}

const downloadRsvpBtn = $('download-rsvp');
if (downloadRsvpBtn) {
  downloadRsvpBtn.addEventListener('click', () => {
    if (!preparedResponse) return;
    const c = WEDDING_CONFIG;
    const lines = [
      `${c.couple.groom} & ${c.couple.bride} · Wedding RSVP (${c.date.dayMonth}, ${c.date.year})`,
      '--------------------------------------------------------',
      'Name: ' + preparedResponse.Name,
      'Attending: ' + preparedResponse.Attending,
      'Events Attending: ' + (preparedResponse.Events || 'None'),
      'Guests: ' + preparedResponse.Guests,
      'Message: ' + (preparedResponse.Message || '—'),
      ''
    ].join('\n');
    downloadFile('Wedding-RSVP-' + preparedResponse.Name.replace(/\s+/g, '-') + '.txt', lines, 'text/plain;charset=utf-8');
  });
}

// Scroll progress bar & header shadow on scroll
(() => {
  const header = document.querySelector('header');
  const progress = document.querySelector('.scroll-progress');
  let ticking = false;
  function updateScroll() {
    const y = window.scrollY || 0;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('scrolled', y > 12);
    if (progress) {
      progress.style.transform = 'scaleX(' + (height > 0 ? Math.min(1, Math.max(0, y / height)) : 0) + ')';
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();
})();

// Execute parameter application on load
applyWeddingConfig();
