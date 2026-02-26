# LÉTHÉ | Technical Deployment Reference

This document outlines the final technical architecture and production hardening steps applied to the **LÉTHÉ Enterprise Suite**.

---

## 🏗️ Technical Architecture

The suite consists of three interconnected modules orchestrated via a root portal:

1.  **Backend API (`/backend`)**: Node.js/Express server with SQLite persistence.
2.  **Customer Site (`/customer-site`)**: Vite/React frontend with luxury GSAP animations and immersive UI.
3.  **Manager Cockpit (`/admin-panel`)**: Production-grade React dashboard for surgical operational control.
4.  **Showcase Portal (Root)**: A cinematic landing page for selecting guest or management views.

---

## 🔒 Production Hardening & Security

The following measures have been implemented to ensure the suite is "Production-Ready" before deployment:

### 1. Hardened CORS Strategy
The backend (`/backend/src/app.js`) is configured with a dynamic CORS policy.
- **Local Dev:** Automatically trusts `localhost` variants for zero-friction demoing.
- **Production:** Prepared for `FRONTEND_URL` and `ADMIN_URL` environment variables to support cross-domain communication on services like Netlify and Render.

### 2. Environment Portability
- **Dynamic Endpoints:** The frontends use `.env` files and `process.env` to reference the API, allowing for instant migration from local to cloud servers.
- **SQLite Persistence:** The database is portable and requires zero external infrastructure (like AWS RDS or PostgreSQL) for initial demos.

### 3. Unified Branding & UX
- **Identity:** All references to the previous project name have been replaced with **LÉTHÉ**.
- **Performance:** Optimized GSAP triggers and smooth scroll (Lenis) across the guest-facing application.

---

## 🚀 Deployment Instructions

### Frontend (Netlify/Vercel)
1.  Run `npm run build` in both `/customer-site` and `/admin-panel`.
2.  Deploy the root folder and configure your hosting provider to serve the static `dist/` and `build/` folders as subdirectories if needed.

### Backend (Render/Railway/Heroku)
1.  Deploy the `/backend` folder.
2.  Set the `PORT` and `NODE_ENV` environment variables.
3.  The SQLite database will persist locally or can be migrated to a persistent volume.

---

**Status: DEPLOYMENT READY**
