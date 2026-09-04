// All available timezones
const TIMEZONES = [
  { name: 'London', timezone: 'Europe/London', emoji: '🇬🇧' },
  { name: 'New York', timezone: 'America/New_York', emoji: '🗽' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', emoji: '🗾' },
  { name: 'Sydney', timezone: 'Australia/Sydney', emoji: '🦘' },
  { name: 'Dubai', timezone: 'Asia/Dubai', emoji: '🏜️' },
  { name: 'Singapore', timezone: 'Asia/Singapore', emoji: '🌴' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', emoji: '🏮' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata', emoji: '🐘' },
  { name: 'Bangkok', timezone: 'Asia/Bangkok', emoji: '🙏' },
  { name: 'Moscow', timezone: 'Europe/Moscow', emoji: '🥅' },
  { name: 'Paris', timezone: 'Europe/Paris', emoji: '🗼' },
  { name: 'Berlin', timezone: 'Europe/Berlin', emoji: '🍺' },
  { name: 'Toronto', timezone: 'America/Toronto', emoji: '🍁' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', emoji: '🌞' },
  { name: 'Mexico City', timezone: 'America/Mexico_City', emoji: '🌮' },
  { name: 'São Paulo', timezone: 'America/Sao_Paulo', emoji: '🇧🇷' },
  { name: 'Cairo', timezone: 'Africa/Cairo', emoji: '🐪' },
  { name: 'Johannesburg', timezone: 'Africa/Johannesburg', emoji: '🦁' },
  { name: 'Istanbul', timezone: 'Europe/Istanbul', emoji: '🕌' },
  { name: 'Jakarta', timezone: 'Asia/Jakarta', emoji: '🏝️' },
  { name: 'Manila', timezone: 'Asia/Manila', emoji: '🇵🇭' },
  { name: 'Seoul', timezone: 'Asia/Seoul', emoji: '🏯' },
  { name: 'Auckland', timezone: 'Pacific/Auckland', emoji: '🧅' },
];

// Default timezones to display
const DEFAULT_TIMEZONES = [
  'Europe/London',
  'America/New_York',
  'Asia/Tokyo',
  'Australia/Sydney'
];

const clocksContainer = document.getElementById('clocksContainer');
const timezoneSelect = document.getElementById('timezoneSelect');
const addBtn = document.getElementById('addBtn');
const resetBtn = document.getElementById('resetBtn');

let displayedTimezones = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populateDropdown();
  loadDisplayedTimezones();
  updateAllClocks();
  setInterval(updateAllClocks, 1000);
});

// Populate timezone dropdown
function populateDropdown() {
  const uniqueTimezones = [];
  const seen = new Set();

  TIMEZONES.forEach(tz => {
    if (!seen.has(tz.timezone)) {
      uniqueTimezones.push(tz);
      seen.add(tz.timezone);
    }
  });

  uniqueTimezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz.timezone;
    option.textContent = `${tz.emoji} ${tz.name}`;
    timezoneSelect.appendChild(option);
  });
}

// Load displayed timezones from localStorage
function loadDisplayedTimezones() {
  const saved = localStorage.getItem('displayedTimezones');
  if (saved) {
    displayedTimezones = JSON.parse(saved);
  } else {
    displayedTimezones = DEFAULT_TIMEZONES;
  }
  renderClocks();
}

// Save displayed timezones to localStorage
function saveDisplayedTimezones() {
  localStorage.setItem('displayedTimezones', JSON.stringify(displayedTimezones));
}

// Add new timezone
addBtn.addEventListener('click', () => {
  const selectedTimezone = timezoneSelect.value;
  if (selectedTimezone && !displayedTimezones.includes(selectedTimezone)) {
    displayedTimezones.push(selectedTimezone);
    saveDisplayedTimezones();
    renderClocks();
    timezoneSelect.value = '';
  }
});

// Reset to default
resetBtn.addEventListener('click', () => {
  displayedTimezones = [...DEFAULT_TIMEZONES];
  saveDisplayedTimezones();
  renderClocks();
  timezoneSelect.value = '';
});

// Render all clock cards
function renderClocks() {
  clocksContainer.innerHTML = '';

  if (displayedTimezones.length === 0) {
    clocksContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⏰</div>
        <p>No timezones added. Select one from the dropdown above!</p>
      </div>
    `;
    return;
  }

  displayedTimezones.forEach((timezone, index) => {
    const timezoneInfo = TIMEZONES.find(tz => tz.timezone === timezone);
    const name = timezoneInfo ? `${timezoneInfo.emoji} ${timezoneInfo.name}` : timezone;

    const card = document.createElement('div');
    card.className = 'clock-card';
    card.innerHTML = `
      <div class="clock-header">
        <div class="timezone-name">${name}</div>
        <button class="close-btn" onclick="removeClock(${index})">×</button>
      </div>
      <div class="digital-display">
        <div class="digital-time" id="time-${index}">--:--:--</div>
        <div class="digital-date" id="date-${index}">Loading...</div>
        <div class="digital-ampm" id="ampm-${index}"></div>
      </div>
      <div class="time-details">
        <div class="detail-item">
          <div class="detail-label">Hour</div>
          <div class="detail-value" id="hour-${index}">--</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Minute</div>
          <div class="detail-value" id="minute-${index}">--</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Second</div>
          <div class="detail-value" id="second-${index}">--</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">UTC Offset</div>
          <div class="detail-value" id="offset-${index}">--</div>
        </div>
      </div>
    `;
    clocksContainer.appendChild(card);
  });
}

// Remove a clock
function removeClock(index) {
  displayedTimezones.splice(index, 1);
  saveDisplayedTimezones();
  renderClocks();
}

// Update all clocks
function updateAllClocks() {
  displayedTimezones.forEach((timezone, index) => {
    updateClock(timezone, index);
  });
}

// Update individual clock
function updateClock(timezone, index) {
  try {
    // Get current time in the specified timezone
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const parts = formatter.formatToParts(now);
    const values = {};
    parts.forEach(part => {
      values[part.type] = part.value;
    });

    const hours = values.hour;
    const minutes = values.minute;
    const seconds = values.second;
    const month = values.month;
    const day = values.day;
    const year = values.year;

    // Calculate UTC offset
    const utcOffset = getUTCOffset(timezone);

    // Update time display
    const timeElement = document.getElementById(`time-${index}`);
    if (timeElement) {
      timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Update date
    const dateElement = document.getElementById(`date-${index}`);
    if (dateElement) {
      const dateObj = new Date(year, month - 1, day);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
      const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
      dateElement.textContent = `${dayName}, ${monthName} ${day}, ${year}`;
    }

    // Update AM/PM if needed
    const ampmElement = document.getElementById(`ampm-${index}`);
    if (ampmElement) {
      const hour24 = parseInt(hours);
      const ampm = hour24 >= 12 ? 'PM' : 'AM';
      const hour12 = hour24 % 12 || 12;
      ampmElement.textContent = `${String(hour12).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    }

    // Update details
    const hourElement = document.getElementById(`hour-${index}`);
    if (hourElement) hourElement.textContent = hours;

    const minuteElement = document.getElementById(`minute-${index}`);
    if (minuteElement) minuteElement.textContent = minutes;

    const secondElement = document.getElementById(`second-${index}`);
    if (secondElement) secondElement.textContent = seconds;

    const offsetElement = document.getElementById(`offset-${index}`);
    if (offsetElement) offsetElement.textContent = utcOffset;
  } catch (error) {
    console.error(`Error updating clock for ${timezone}:`, error);
  }
}

// Calculate UTC offset for a timezone
function getUTCOffset(timezone) {
  try {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);
    const sign = offset >= 0 ? '+' : '';
    return `UTC${sign}${offset.toFixed(1)}`;
  } catch (error) {
    return 'UTC';
  }
}
