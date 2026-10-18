// =========================================================================
// WEDDING INVITATION CONFIGURATION & PARAMETERS
// Edit any of the values in this object to customize the website.
// All names, dates, locations, calendar events, and texts update dynamically.
// =========================================================================
const WEDDING_CONFIG = {
  // Couple details
  couple: {
    groom: 'Sai Krishna',
    bride: 'Abhigna',
    initials: 'S & A'
  },

  // Dates & Times
  date: {
    heroBadge: 'SUNDAY · NOVEMBER 22, 2026',
    dayMonth: 'November 22',
    year: '2026',
    dayOfWeek: 'Sunday',
    muhurtham: 'Muhurtham · 9:30 AM',
    timeSummary: 'Sunday, 2026<br>Muhurtham · 9:30 AM',
    footerDate: '22 NOVEMBER 2026',
    // ISO 8601 UTC strings for Google Calendar & .ics files
    isoStart: '20261122T153000Z',
    isoEnd: '20261122T203000Z'
  },

  // Venue & Location
  location: {
    cityState: 'Liberty Hill, TX',
    addressHtml: '309 Redonda Dr<br>Liberty Hill, Texas',
    addressPlain: '309 Redonda Dr, Liberty Hill, TX',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=309+Redonda+Dr+Liberty+Hill+TX'
  },

  // Story & Section Headings/Texts
  texts: {
    pageTitle: 'Sai Krishna & Abhigna · Wedding Celebration',

    // Hero Section
    heroEyebrow: 'Let the celebration begin',
    heroLede1: 'With divine blessings & the love of our families',
    heroLede2: 'A little tradition, a lot of joy,<br>and a lifetime of togetherness.',
    heroCaption: 'With the divine blessings of Sri Ganesha & Sri Venkateswara',

    // Events / Celebrations Section
    eventsEyebrow: 'Celebrations &amp; Ceremonies',
    eventsTitle: 'Auspicious Occasions',

    // Details Section
    detailsDateEyebrow: 'The auspicious day',
    detailsLocationEyebrow: 'Where love gathers',
    detailsBlessNote: 'Your presence is our greatest blessing.',

    // RSVP Section
    rsvpEyebrow: 'Come for the wedding, stay for the memories',
    rsvpTitle: 'A seat saved<br>with love.',
    rsvpDescription: 'We would love to celebrate this beautiful beginning with you. Let us know if you can join us.',
    rsvpTeamBride: "Yes, Team Bride (Abhigna's Side)!",
    rsvpTeamGroom: "Yes, Team Groom (Sai Krishna's Side)!",
    rsvpDecline: 'Celebrating from the couch (Cannot make it)',
    rsvpDeclineIcon: '🥺',

    // Footer
    footerSubtext: 'MADE WITH LOVE'
  },

  // 3 Wedding Events (Pelli Koduku, Marriage, Satyanarayana Vratam)
  events: [
    {
      id: 'pelli-koduku',
      badge: 'Pre-Wedding Ceremony',
      title: 'Pelli Koduku',
      timeDetail: 'Friday, Nov 20, 2026<br>Morning · 8:30 AM',
      actionText: 'Join the celebrations ↓',
      locationHeading: 'Groom’s Residence',
      locationAddress: '309 Redonda Dr<br>Liberty Hill, Texas',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=309+Redonda+Dr+Liberty+Hill+TX'
    },
    {
      id: 'marriage',
      badge: 'The Auspicious Wedding',
      title: 'Marriage',
      timeDetail: 'Sunday, Nov 22, 2026<br>Muhurtham · 9:30 AM',
      actionText: 'Join our celebration ↓',
      locationHeading: 'Liberty Hill, TX',
      locationAddress: '309 Redonda Dr<br>Liberty Hill, Texas',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=309+Redonda+Dr+Liberty+Hill+TX'
    },
    {
      id: 'satyanarayana-vratam',
      badge: 'Post-Wedding Puja',
      title: 'Satyanarayana Vratam',
      timeDetail: 'Monday, Nov 23, 2026<br>Auspicious Puja · 10:00 AM',
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
    title: 'Sai Krishna & Abhigna Wedding',
    description: 'Join us to celebrate the wedding of Sai Krishna and Abhigna (Muhurtham at 9:30 AM CST).',
    icsFilename: 'Sai-Krishna-Abhigna-Wedding.ics',
    uid: 'sai-abhigna-20261122@wedding'
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
    c.events.forEach((ev, idx) => {
      const num = idx + 1;
      const badge = $(`event-${num}-badge`);
      if (badge && ev.badge) badge.textContent = ev.badge;

      const title = $(`event-${num}-title`);
      if (title && ev.title) title.textContent = ev.title;

      const time = $(`event-${num}-time`);
      if (time && ev.timeDetail) time.innerHTML = ev.timeDetail;

      const action = $(`event-${num}-action`);
      if (action && ev.actionText) action.textContent = ev.actionText;

      const locHeading = $(`event-${num}-location`);
      if (locHeading && ev.locationHeading) locHeading.textContent = ev.locationHeading;

      const locAddr = $(`event-${num}-address`);
      if (locAddr && ev.locationAddress) locAddr.innerHTML = ev.locationAddress;

      const mapLink = $(`event-${num}-map`);
      if (mapLink && ev.mapsUrl) mapLink.href = ev.mapsUrl;
    });
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

  const rsvpBrideLabel = $('rsvp-bride-label');
  if (rsvpBrideLabel && c.texts) rsvpBrideLabel.textContent = c.texts.rsvpTeamBride;

  const rsvpGroomLabel = $('rsvp-groom-label');
  if (rsvpGroomLabel && c.texts) rsvpGroomLabel.textContent = c.texts.rsvpTeamGroom;

  const rsvpDeclineLabel = $('rsvp-decline-label');
  if (rsvpDeclineLabel && c.texts) rsvpDeclineLabel.textContent = c.texts.rsvpDecline;

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
    const isAttending = radio.value === 'Bride Side' || radio.value === 'Groom Side';
    
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
    const isAttending = attendingVal === 'Bride Side' || attendingVal === 'Groom Side';

    preparedResponse = {
      Timestamp: new Date().toISOString(),
      Name: nameField.value.trim(),
      Attending: attendingVal,
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
