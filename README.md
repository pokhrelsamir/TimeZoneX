# ⏱️ TimeZoneX — World Clock & Timezone Converter

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/95e9ca94-85d6-4cce-bfe5-918c981964b9"
    alt="TimeZoneX World Clock"
    width="100%"
  >
</p>

### Supported Locations

- 🇳🇵 Kathmandu — Nepal
- 🇮🇳 New Delhi — India
- 🇧🇩 Dhaka — Bangladesh
- 🇹🇭 Bangkok — Thailand
- 🇸🇬 Singapore
- 🇨🇳 Shanghai — China
- 🇭🇰 Hong Kong
- 🇯🇵 Tokyo — Japan
- 🇰🇷 Seoul — South Korea
- 🇦🇪 Dubai — UAE
- 🇸🇦 Riyadh — Saudi Arabia
- 🇹🇷 Istanbul — Turkey
- 🇷🇺 Moscow — Russia
- 🇬🇧 London — United Kingdom
- 🇫🇷 Paris — France
- 🇩🇪 Berlin — Germany
- 🇮🇹 Rome — Italy
- 🇪🇸 Madrid — Spain
- 🇪🇬 Cairo — Egypt
- 🇿🇦 Johannesburg — South Africa
- 🇺🇸 New York — USA
- 🇺🇸 Chicago — USA
- 🇺🇸 Denver — USA
- 🇺🇸 Los Angeles — USA
- 🇺🇸 Honolulu — USA
- 🇨🇦 Toronto — Canada
- 🇨🇦 Vancouver — Canada
- 🇧🇷 São Paulo — Brazil
- 🇦🇷 Buenos Aires — Argentina
- 🇦🇺 Sydney — Australia
- 🇦🇺 Melbourne — Australia
- 🇦🇺 Perth — Australia
- 🇳🇿 Auckland — New Zealand

---

# 🔄 TIME CONVERTER

## Convert Timezones

The timezone converter allows users to select a date, time, source timezone, and destination timezone.

TimeZoneX calculates the corresponding local time in the destination timezone while accounting for timezone offsets and date changes.

### Screenshot

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/1410b779-5733-4f3e-914f-861500b3a5a2"
    alt="TimeZoneX Timezone Converter"
    width="100%"
  >
</p>

### Conversion Flow

```text
Date + Time
     │
     ▼
Source Timezone
     │
     ▼
UTC Conversion
     │
     ▼
Destination Timezone
     │
     ▼
Converted Date + Time
```

### Conversion Features

- 📅 Date selection
- 🕐 Time selection
- 🌍 Source timezone
- 🌎 Destination timezone
- 🔁 Swap timezones
- ⏱️ 12/24-hour output
- 📆 Automatic date rollover
- ☀️ Daylight-saving-aware timezone handling

---

# ⭐ SAVED ZONES

## Favorite Timezones

Frequently used locations can be saved as favorites for quick access.
Favorites are stored using the browser's LocalStorage, so they remain available after refreshing or reopening the application.

### Screenshot

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/0a59f16a-9540-4fe9-86aa-5a7e6f1857a7"
    alt="TimeZoneX Favorite Timezones"
    width="100%"
  >
</p>

### Favorite Features

- ⭐ Add timezone to favorites
- ⭐ Remove timezone from favorites
- 💾 Persistent LocalStorage storage
- ⚡ Quick access to frequently used zones
- 🔄 Favorites automatically update with live time

---


# 🕐 Time Format

Users can switch between 12-hour and 24-hour time formats.

**12-Hour Format**  
`7:45:32 PM`

**24-Hour Format**  
`19:45:32`

The selected format is stored locally and automatically applied to the world clocks and conversion results.

---

# 🧠 How It Works

TimeZoneX uses the browser's built-in JavaScript internationalization capabilities.
The application relies on `Intl.DateTimeFormat` along with IANA timezone identifiers such as:

- `Asia/Kathmandu`
- `Asia/Tokyo`
- `Europe/London`
- `America/New_York`
- `Australia/Sydney`

This allows the application to calculate and display timezone-aware dates and times directly in the browser.

---

# 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Application structure |
| **CSS3** | Styling and responsive layout |
| **JavaScript** | Application logic |
| **Intl.DateTimeFormat** | Timezone-aware date/time formatting |
| **LocalStorage** | Favorite and preference persistence |
| **Bootstrap Icons** | Interface icons |

---

# 📁 Project Structure

```text
TimeZoneX/
│
├── index.html
├── README.md
├── LICENSE
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    ├── clock.js
    ├── converter.js
    └── storage.js
```

## 📄 File Responsibilities

### `index.html`
Contains the complete application structure:
- Header
- Hero section
- World clock
- Timezone converter
- Favorite timezones
- Footer

### `css/style.css`
Responsible for:
- Layout
- Colors
- Typography
- Cards
- Responsive design
- Dark mode
- Buttons
- Converter interface

### `js/app.js`
Controls the main application:
- Application initialization
- Theme switching
- Time format switching
- Favorites interaction
- UI events
- Timezone dropdown generation

### `js/clock.js`
Handles:
- World clock generation
- Live time updates
- Date formatting
- Timezone labels
- Favorite buttons

### `js/converter.js`
Handles:
- Timezone conversion
- UTC calculations
- Date conversion
- Time formatting
- Timezone offset handling

### `js/storage.js`
Handles browser persistence:
- Favorites
- LocalStorage
- Saved preferences

---

# 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SamirPokhrel/TimeZoneX.git
```

### 2. Navigate to the Project

```bash
cd TimeZoneX
```

### 3. Run the Application

Because TimeZoneX is a frontend project, you can simply open `index.html` in your browser.  
For the best development experience, use VS Code Live Server or another local development server.

---

## 🌐 Live Demo

<p align="center">
  <a href="https://pokhrelsamir.github.io/TimeZoneX/">
    <img src="https://img.shields.io/badge/Live%20Demo-TimeZoneX-6366f1?style=for-the-badge&logo=github" alt="Live Demo">
  </a>
</p>


---

# 🔮 Future Improvements

Potential future additions include:

- 🔍 Searchable timezone selector
- 🌍 Interactive world map
- 📍 Automatic local timezone detection
- 📋 One-click copy converted time
- 🕘 More world locations
- 📅 Meeting time planner
- 🔔 Timezone-based reminders
- 🌓 Automatic system theme detection
- 📊 UTC offset visualization
- 🔗 Shareable timezone conversion links

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### Steps

```bash
git clone https://github.com/SamirPokhrel/TimeZoneX.git
cd TimeZoneX
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a pull request.

---

# 📜 License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for more information.

---

# 👨‍💻 Author

<div align="center">

### Samir Pokhrel

**B.Sc. CSIT Student | Web Developer | Networking Enthusiast**

Built using **HTML, CSS, and JavaScript**

<br>

<a href="https://github.com/pokhrelsamir">
  <img src="https://img.shields.io/badge/GitHub-pokhrelsamir-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>
<a href="https://www.linkedin.com/in/samirpokhrel/">
  <img src="https://img.shields.io/badge/LinkedIn-Samir%20Pokhrel-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>

</div>
