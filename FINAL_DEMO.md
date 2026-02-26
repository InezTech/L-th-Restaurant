# LÉTHÉ | Presentation & Demonstration Guide

This document outlines the professional flow for demonstrating the **LÉTHÉ Enterprise Suite** to stakeholders or clients.

---

## 🎭 The Demonstration Narrative

The goal of this demo is to show how LÉTHÉ handles the entire lifecycle of a luxury dining experience—from the first customer interaction to the final seating logic.

### 1. The Entrance (The Selection Portal)
*   **Action:** Open [http://localhost:8080](http://localhost:8080).
*   **Talking Point:** "LÉTHÉ is an all-in-one ecosystem. Instead of separate fractured tools, we provide a unified gateway that serves both the aesthetic needs of the guest and the operational needs of the house."
*   **Visual:** Show the interactive split-screen. Note how the imagery sharpens on hover, symbolizing focus.

### 2. The Sanctuary (The Guest Path)
*   **Action:** Click **"Guest"**. Navigate to **"Book a Table"**.
*   **Talking Point:** "We treat booking as an extension of the meal. Notice the smooth typography and cinematic scroll effects. This builds anticipation before the guest even enters the restaurant."
*   **Action:** Submit a reservation for **today** at a specific time.
*   **Success:** Point out the instant confirmation dialog.

### 3. The Seamless Transition
*   **Action:** Click the floating **"Switch View"** button in the bottom-right corner.
*   **Talking Point:** "As a consultant or manager, you need to verify the operational side instantly. One click brings us back to the command center."

### 4. The Cockpit (Management Path)
*   **Action:** Enter the **"Manager"** side. Go to the dashboard.
*   **Talking Point:** "The newly placed reservation is already here. The system calculates the standard 120-minute window automatically, helping you forecast turnover and table readiness."
*   **Action:** Click **"Seat"** on the reservation you just made.
*   **Visual:** Note how the table status updates to 'Seated' and the estimated departure time is displayed.

---

## 🛠️ Technical Hardening (Post-Polishing)

The system has been surgically updated to handle real-world deployment:

*   **Logic Resilience:** The "Switch View" button is port-aware. It knows if it's running in your demo environment or on a production URL.
*   **Legibility:** The Manager portal has been softened with subtle architectural imagery to ensure zero text-clash.
*   **Security:** Backend CORS is pre-configured to trust both local development and your future production domains.

---

**LÉTHÉ | Mastered for Excellence.**
