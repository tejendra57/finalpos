Real-Time Logistics Tracker

A real-time web application for dispatchers to monitor and manage delivery drivers using React, TypeScript, Redux, and WebSocket communication.

---

Project Overview

The Real-Time Logistics Tracker allows dispatchers to:
- View driver locations on a live map.
- Monitor and update delivery statuses in real-time.
- Perform dispatcher actions with Optimistic UI for better responsiveness.

---

Features

- Live Map Visualization
  Real-time driver location updates using Mapbox or Leaflet.

- Driver Dashboard
  View list of drivers with status, location, and ETA. Sort/filter based on delivery status.

- Real-Time Updates
  Receive driver updates through WebSockets and reflect them instantly in the UI.

- Optimistic UI
  Perform actions like pause/resume, mark complete, or reassign delivery with instant feedback and rollback support.

---

Tech Stack

- React + TypeScript
- Redux Toolkit for global state management
- WebSocket (mocked server)
- Leaflet for map integration
- Tailwind CSS for responsive styling
- Vite for project scaffolding

---

Folder Structure

src \
│ \
├── components/           # Reusable UI components (DriverCard, MapView, etc.) \
├── features/             # Redux slices (drivers, deliveries, ui) \
│   ├── drivers/ \
│   ├── deleveries/ \
├── pages/                # Main layout pages (Dashboard, Map, etc.) \
├── services/             # WebSocket and API handlers \
├── utils/                # Helper functions (mock ETA, coordinate formatters, etc.) \
├── App.tsx \
├── main.tsx \
└── index.css \

---

Getting Started

1. Clone the repository

git clone https://github.com/your-username/finalpos.git \
cd finalpos

2. Install dependencies

npm install

3. Run the development server

npm run dev

---

Mock WebSocket

For simulation, use a mock WebSocket server (\`ws://localhost:3000\`) that emits driver updates every few seconds.

---