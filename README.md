# LÉTHÉ | Enterprise Fine Dining Suite

![Status](https://img.shields.io/badge/Status-Production--Ready-gold?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20Node%20%7C%20SQLite-blue?style=for-the-badge)

**LÉTHÉ** is a premium, high-end restaurant management and guest experience ecosystem. Designed with a luxury aesthetic ("escapist fine dining"), it bridges the gap between sophisticated customer interaction and surgical operational control.

---

## 🏗️ System Architecture

The suite is built as an orchestrated monorepo containing four primary pillars:

1.  **Selection Portal (Root):** A high-performance, cinematic entry point for switching between the Guest and Manager environments.
2.  **Customer Site (`/customer-site`):** A React-based immersive experience featuring GSAP animations, 3D elements, and a seamless reservation engine.
3.  **Manager Cockpit (`/admin-panel`):** A professional operational dashboard for real-time reservation management, table seating, and turnover optimization.
4.  **Core API (`/backend`):** A robust Express/Node.js backend with SQLite persistence and hardened CORS security.

---

## ⚡ Quick Start (Demo Mode)

To experience the full ecosystem locally with integrated view-switching:

1.  **Prerequisites:** Ensure you have Node.js installed.
2.  **Clone & Install:**
    ```bash
    git clone <your-repo-url>
    cd lethe-enterprise-suite
    npm run install:all
    ```
3.  **Launch the Suite:**
    ```bash
    npm run demo
    ```
4.  **Access:** The system will automatically serve the portal at **[http://localhost:8080](http://localhost:8080)**.

---

## 💎 Features & Polishing

### Guest Experience
- **Cinematic Storytelling:** Scroll-triggered GSAP animations that fill dishes dynamically.
- **Glassmorphic UI:** Modern, translucent design tokens optimized for luxury aesthetics.
- **Switch-View Navigation:** A floating "Switch View" button for seamless transitions during demonstrations.

### Operational Excellence
- **Turnover Tracking:** Automatic tracking of the 120-minute fine-dining window for every table.
- **Occupancy Management:** Real-time table status (Booked, Seated, Available).
- **Hardened Security:** Unified CORS policy supporting multiple frontend origins.

---

## 🚀 Deployment Orchestration

This project is prepared for a "One-Stop" deployment on **Netlify** (Frontend) and **Render/Railway** (Backend).

- **Frontend:** The root `index.html` orchestrates sub-paths (`/admin` and `/site`).
- **Backend:** Environment variables (`FRONTEND_URL`, `ADMIN_URL`) allow for zero-config cross-origin requests in production.

---

© 2026 LÉTHÉ SOLUTIONS | Designed for Excellence.
