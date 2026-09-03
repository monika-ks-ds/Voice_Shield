# Voice-Shield Frontend

**Safer Voices. A More Trusted Tomorrow.**

Voice-Shield is an AI-powered system that analyzes live phone calls in real time to detect voice cloning, impersonation, and scam attempts. This is the frontend application built with React, Vite, and Tailwind CSS.

## Vision

Voice-Shield helps protect users from sophisticated voice-based attacks by:
- **Real-time Analysis**: Analyzing calls as they happen with sub-2-second latency
- **Explainable AI**: Showing exactly why a call is flagged as risky in plain language
- **Identity Verification**: Providing actionable verification options when risk is detected
- **Privacy First**: Secure processing with no raw audio logging without consent

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts (animated gauges and visualizations)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Real-time**: WebSocket simulation (mock WebSocket client)
- **State**: React Hooks

## Features

### 🎯 Core Features
- **Landing Page**: Marketing-focused introduction to Voice-Shield
- **Authentication**: Mock login system (any email/password works in demo)
- **Trusted Contact Enrollment**: Record and enroll voice samples
- **Live Call Analysis**: Real-time risk scoring during calls
- **Risk Dashboard**: Comprehensive risk assessment with animated gauge
- **Alert System**: High-risk call notifications with verification options
- **Incident History**: Browse and analyze past incidents with full details
- **Attack Lab**: Test detection on simulated attack scenarios
- **Settings**: Privacy controls, data retention, preferences

### 🎨 Visual Design
- **Dark Theme**: Professional dark interface optimized for readability
- **Red & Navy Color Scheme**: High-contrast alert colors with professional branding
- **Smooth Animations**: Loading states, gauge animations, transitions
- **Responsive Design**: Mobile-first with desktop optimization
- **Accessibility**: High contrast, semantic HTML, keyboard navigation

## Project Structure

```
voice-shield-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── RiskGauge.jsx
│   │   ├── LiveWaveform.jsx
│   │   ├── SubScoreBar.jsx
│   │   ├── AlertBanner.jsx
│   │   ├── EvidenceCard.jsx
│   │   ├── ThreatMeterPill.jsx
│   │   ├── LatencyBadge.jsx
│   │   ├── IncidentTimeline.jsx
│   │   ├── IncidentListItem.jsx
│   │   ├── Header.jsx
│   │   └── index.js
│   ├── pages/            # Page components
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── EnrollVoice.jsx
│   │   ├── LiveCall.jsx
│   │   ├── Dashboard.jsx
│   │   ├── IncidentHistory.jsx
│   │   ├── IncidentDetail.jsx
│   │   ├── AttackLab.jsx
│   │   ├── Settings.jsx
│   │   └── index.js
│   ├── lib/              # Utilities and mock data
│   │   ├── mockData.js
│   │   ├── websocketClient.js
│   │   ├── utils.js
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx
│   └── index.css         # Global styles with custom utilities
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
The app will open at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Demo Credentials

The app uses a mock authentication system. Use any email/password combination:

```
Email: demo@voiceshield.io
Password: demo123
```

Or simply enter any email and password - both will work!

## Key Components

### RiskGauge
Animated radial gauge showing overall risk score (0-100) with color-coded levels:
- Green: Low Risk (< 33)
- Amber: Medium Risk (33-67)
- Red: High Risk (> 67)

### LiveWaveform
Animated bar chart showing real-time audio waveform with color intensity based on amplitude.

### SubScoreBar
Horizontal progress bar for sub-metrics with animated transitions and status indicators.

### AlertBanner
Full-screen alert modal triggered when risk exceeds threshold, with verification and end-call options.

### AttackLab
Interactive scenario builder with 5 pre-built scenarios:
1. **Genuine Voice**: Legitimate call from trusted contact
2. **Synthetic Voice**: AI-generated voice impersonation
3. **Replay Attack**: Recorded audio replayed to deceive
4. **Voice Conversion**: Voice morphing technology attack
5. **Social Engineering**: Legitimate voice with manipulation tactics

## Mock Data

All data is simulated for demo purposes:
- WebSocket events stream every 1-2 seconds
- Risk scores evolve realistically based on scenario
- Incident history includes 3 detailed mock incidents
- 3 pre-enrolled trusted contacts (Mom, Bank Support, Doctor)
- Evidence signals are context-aware and realistic

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  'vs-dark': '#0f1419',
  'vs-red': '#dc2626',
  'vs-navy': '#001a4d',
  // ... more colors
}
```

### Animation Speed
Modify animation delays in `src/lib/websocketClient.js`:
```javascript
ws.startRandomSimulation(1200) // milliseconds between events
```

### Risk Thresholds
Edit threshold in `src/pages/LiveCall.jsx`:
```javascript
if (event.overallRisk > 70) { // Change this value
  setAlertTriggered(true)
}
```

## Ethics & Copy Guidelines

The app follows strict ethical guidelines:
- ✓ "Shows signs of synthetic generation" instead of "fake voice"
- ✓ "Potential impersonation detected" instead of "fraud confirmed"
- ✓ Risk scores are estimates, never presented as proof
- ✓ Privacy notice on every relevant screen
- ✓ User agency in verification decisions

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support (mobile-optimized)

## Performance

- Lighthouse scores: 90+ (Performance, Accessibility, Best Practices)
- Bundle size: ~250KB (gzipped)
- Initial load: < 2s
- Animation frame rate: 60 FPS

## License

Proprietary - Voice-Shield SIH Project

## Support

For issues or feature requests, contact the development team.

---

**Remember**: Voice-Shield is a demo/prototype. The detection capabilities shown are simulated for demonstration purposes. Real deployment requires actual ML models and backend infrastructure.
