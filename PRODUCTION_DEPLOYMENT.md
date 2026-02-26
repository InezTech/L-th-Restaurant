# AUSZEIT | Enterprise Deployment & Demo Guide

This document outlines the final architecture and usage for the **AUSZEIT Restaurant Suite**. The system is now fully decoupled, secured, and ready for client presentation.

## 🚀 System Architecture
The suite consists of three interconnected modules:
1.  **Backend API (`/backend`)**: Node.js/Express server with SQLite persistence.
2.  **Customer Site (`/customer-site`)**: Vite/React frontend with luxury GSAP animations.
3.  **Manager Cockpit (`/admin-panel`)**: Production-grade dashboard for operational management.

---

## 🛠️ How to Launch the Demo
To show the client both views simultaneously, follow these steps:

1.  **Start the Backend**:
    *   `cd backend && npm install && npm run start`
    *   The API will be live on `http://localhost:5001`.

2.  **Start the Customer Site**:
    *   `cd customer-site && npm install && npm run dev`
    *   The site will be live on `http://localhost:5173`.

3.  **Start the Manager Cockpit**:
    *   `cd admin-panel && npm install --legacy-peer-deps && npm start`
    *   The dashboard will be live on `http://localhost:3000`.

---

## 💎 The "Perfect" Demo Flow
Open the **Showcase Portal** at: `file:///Users/omrawte/Documents/ausz/index.html`

### Phase 1: The Guest Experience
1.  Navigate to the **Customer Site**.
2.  Showcase the **Smooth Scroll (Lenis)** and **Parallax Hero**.
3.  Go to the **Gastronomy Gallery (Menu)** and show the luxury hover effects.
4.  Make a **live reservation** for a future date (e.g., Tomorrow). Select a specific time slot (e.g., 18:30).
5.  Observe the 120-minute duration disclosure.

### Phase 2: Operations Management
1.  Navigate to the **Manager Cockpit**.
2.  Observe the **Live Stats Bar** (Capacity & Occupancy).
3.  Click **"Next"** to find the reservation you just made.
4.  Highlight the **Exp. End Time** (e.g., 20:30) which manages the table duration automatically.
5.  Click **"Seat"** to simulate the guest's arrival.
6.  Once finished, click **"Clear Table"** to reset occupancy.

---

## 🔒 Production Hardening Applied
- **CORS Restricted**: API only accepts requests from specific vetted origins.
- **Environment Driven**: API endpoints are managed via `.env` files for easy server migration.
- **Persistence**: Switched to SQLite for a portable, single-file database that requires ZERO external infrastructure for this demo.
- **UX Consistency**: Standardized typography (Outfit & Inter) across both professional interfaces.

---
**Status: READY FOR SHIPPING**
