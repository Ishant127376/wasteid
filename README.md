# EcoSnap 🌿

**An offline-first Progressive Web App for smart recycling**

EcoSnap helps users identify recyclable waste using on-device machine learning and a barcode-based fallback system. Track your environmental impact and earn eco-points for every item you recycle correctly!

## ✨ Features

- **📷 Camera Classification**: Point your camera at any item to identify its material (plastic, paper, metal, glass)
- **🔍 Barcode Scanning**: Fallback to barcode scanning for verified product identification via Open Food Facts API
- **🏆 Eco-Points System**: Earn points for correct classifications (+10 ML, +5 barcode)
- **📊 Impact Dashboard**: Track your recycling stats and environmental contribution
- **📱 PWA Support**: Install on your device, works offline
- **🌐 Offline-First**: Core ML classification works without internet

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Modern browser with camera support

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ecosnap.git
cd ecosnap

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        EcoSnap PWA                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Camera    │  │  Barcode    │  │   Points Dashboard  │  │
│  │   Capture   │  │  Scanner    │  │   & Impact Tracker  │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
│         │                │                     │             │
│         ▼                ▼                     ▼             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  ML Model   │  │ Open Food   │  │  IndexedDB/Local    │  │
│  │ (Mock/TF.js)│  │ Facts API   │  │     Storage         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Service Worker                           │
│              (Caching, Offline Support)                     │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── BarcodeScanner.tsx   # Quagga2 barcode scanning
│   ├── CameraCapture.tsx    # Camera access & capture
│   ├── ClassificationDisplay.tsx  # ML results display
│   ├── OfflineIndicator.tsx # Online/offline status
│   ├── PointsDashboard.tsx  # User stats & impact
│   └── PWAInstallPrompt.tsx # PWA install banner
├── hooks/
│   ├── useCamera.ts         # Camera access hook
│   ├── useOnlineStatus.ts   # Network status hook
│   └── usePWAInstall.ts     # PWA install prompt hook
├── lib/
│   ├── classifier.ts        # ML classification logic
│   ├── storage.ts           # IndexedDB/localStorage
│   └── utils.ts             # Utility functions
├── pages/
│   └── Index.tsx            # Main app page
public/
├── manifest.json            # PWA manifest
└── sw.js                    # Service worker
```

## 🎯 Points System

| Action | Points |
|--------|--------|
| ML Classification (>70% confidence) | +10 |
| Barcode Verification | +5 |

## 🔧 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion
- **Storage**: IndexedDB (idb-keyval) + localStorage fallback
- **Barcode**: Quagga.js
- **PWA**: Service Worker + Web App Manifest
- **API**: Open Food Facts (barcode lookup)

## 📱 PWA Installation

1. Open the app in Chrome/Safari
2. Click "Install" when prompted, or
3. Use browser menu → "Add to Home Screen"

## 🌍 Environmental Impact Calculations

Based on average recycling data:
- **CO₂ Saved**: ~0.23 kg per item
- **Water Saved**: ~1.5 L per item
- **Energy Saved**: ~0.1 kWh per item

## 🔮 Future Enhancements

- [ ] Real TensorFlow.js model integration
- [ ] Geolocation-based recycling rules
- [ ] Social features & leaderboards
- [ ] Export impact reports as PDF
- [ ] Push notifications for recycling reminders
- [ ] Backend sync for cross-device stats

## 📄 License

MIT License - feel free to use for hackathons and personal projects!

---

Built with 💚 for the planet
