# 🕐 Digital Clock - Multiple Time Zones

A beautiful, real-time digital clock that displays the current time across multiple time zones simultaneously. Perfect for tracking time across different locations worldwide.

## Features

✨ **Multiple Time Zone Display**
- View time in multiple time zones at once
- Real-time clock updates every second
- Smooth animations and transitions
- Glassmorphism UI design

🌍 **Global Coverage**
- Support for 20+ major cities and time zones
- Includes all major cities across continents
- UTC offset calculation for each timezone
- Full date and day information

⏰ **Detailed Time Information**
- 24-hour digital format
- 12-hour format with AM/PM
- Full date with day name
- Hour, minute, and second breakdown
- UTC offset display

🎨 **Beautiful UI**
- Modern glassmorphism design
- Gradient backgrounds
- Glowing digital display
- Smooth animations
- Fully responsive design
- Mobile-friendly interface

💾 **Persistent Storage**
- Save your preferred timezones to local storage
- Automatically load your settings on next visit
- Reset to default timezones anytime

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: Intl.DateTimeFormat (Built-in JavaScript API)
- **Storage**: Browser Local Storage
- **Design**: CSS Grid, Flexbox, CSS Animations

## Getting Started

### Live Demo
Visit: https://009divil-lab.github.io/digital-clock-timezones/

### Local Installation

1. Clone the repository:
```bash
git clone https://github.com/009divil-lab/digital-clock-timezones.git
cd digital-clock-timezones
```

2. Open `index.html` in your web browser

## How to Use

1. **Add a Timezone**:
   - Select a city/timezone from the dropdown menu
   - Click the "+ Add" button to display it

2. **Remove a Timezone**:
   - Click the "×" button on any clock card to remove it

3. **Reset to Default**:
   - Click "Reset to Default" to restore the original timezones

4. **View Time Details**:
   - Each card shows detailed time information
   - Includes hour, minute, second, and UTC offset

## Supported Time Zones

The application includes timezones for these major cities:

- **Europe**: London, Paris, Berlin, Moscow, Istanbul
- **Asia**: Tokyo, Hong Kong, Singapore, Bangkok, Seoul, Mumbai, Jakarta, Manila
- **Americas**: New York, Los Angeles, Toronto, Mexico City, São Paulo
- **Africa**: Cairo, Johannesburg
- **Oceania**: Sydney, Auckland
- **Middle East**: Dubai

## Project Structure

```
digital-clock-timezones/
├── index.html              # Main HTML structure
├── styles.css              # All styling and animations
├── script.js               # Clock logic and timezone handling
├── README.md               # Documentation
└── .gitignore              # Git ignore file
```

## Key Code Features

### Real-Time Updates
The clock updates every second using `setInterval()` to keep time synchronized.

```javascript
setInterval(updateAllClocks, 1000);
```

### Timezone Handling
Uses the JavaScript `Intl.DateTimeFormat` API to get accurate time in any timezone:

```javascript
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: timezone,
  // ... formatting options
});
```

### Local Storage
Persists user's timezone preferences:

```javascript
localStorage.setItem('displayedTimezones', JSON.stringify(displayedTimezones));
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Development

- [ ] 12-hour/24-hour format toggle
- [ ] Custom timezone search
- [ ] Timezone comparison view
- [ ] Analog clock display option
- [ ] Sound alerts for specific times
- [ ] Daylight Saving Time indicators
- [ ] Favorite timezones
- [ ] Color themes

## CSS Features

### Glassmorphism Effect
```css
backdrop-filter: blur(20px);
border: 2px solid rgba(255, 255, 255, 0.2);
```

### Glowing Text Effect
```css
text-shadow: 0 0 10px #00ff88, 0 0 20px rgba(0, 255, 136, 0.5);
animation: glow 2s ease-in-out infinite;
```

### Responsive Grid
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Author

Created with ⏰ by [009divil-lab](https://github.com/009divil-lab)

## Support

If you have any questions or issues, please open a GitHub issue.

---

**Stay on time! 🕐**
