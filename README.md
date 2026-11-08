# HomeNest - Modern Real Estate Platform

HomeNest is a comprehensive, modern real estate application built with React, TypeScript, and Tailwind CSS. It features a stunning glassmorphism UI, a complete authentication system, and dedicated sections for buying, renting, and mortgage information.

[View Live Demo](https://sandivd.github.io/homeNest/)

## ✨ Key Features

### 🏠 Property Browsing (Buy & Rent)
-   **Dual Modes:** Seamlessly toggle between "Buy" and "Rent" modes to view relevant listings.
-   **Advanced Filtering:** Filter by price range, property type (House, Condo, Apartment), and more.
-   **Interactive Cards:** Beautifully designed property cards with hover effects.
-   **Property Details:** A detailed modal view for each property featuring:
    -   Price and Tax History
    -   Nearby Schools and Commute Times
    -   Interior and Exterior Features
    -   Mortgage Calculator (for Buy mode)

### 🔐 Authentication System
-   **User Accounts:** Fully functional Sign Up and Sign In flows.
-   **Profile Management:** Users can update their profile, including role (Buyer/Seller/Renter) and price preferences.
-   **Persistence:** User sessions and data are persisted using local storage.
-   **Security:** Client-side password hashing for enhanced security.

### 🏦 Mortgage Center
-   **Dedicated Page:** A comprehensive resource for mortgage information.
-   **Live Rates:** Visual representation of current mortgage rates for various loan types.
-   **Educational Content:** FAQ and "Why Choose Us" sections.
-   **Testimonials:** A carousel of customer success stories.

### 🎨 Modern UI/UX
-   **Glassmorphism Design:** A sleek, modern aesthetic with frosted glass effects on the navbar and modals.
-   **Responsive Layout:** Fully optimized for mobile, tablet, and desktop.
-   **Dark Mode Support:** Polished UI that looks great in both light and dark themes.
-   **Animations:** Smooth transitions and entrance animations using Framer Motion.

## Refreshed HomeNest experience

The search and property details UI adapts the supplied premium website's cream, forest, and serif design to HomeNest. Both Buy and Rent retain the original sample listings. Features include location search, price/bedroom/property filters, price sorting, persistent saved homes, shareable property links, dated price/rent charts, tax history, school and interior details, and a mortgage estimate calculator for homes for sale.

Favorites and tour plans are stored in this browser's localStorage. Tour plans are **not sent to an agent**; no booking or email service is connected. The location view groups homes by city and is labeled as a schematic rather than a geographic map. Monthly payment estimates assume a 30-year loan, 20% down, 6.5% interest, recorded sample tax, and 0.35% annual insurance; HOA information is unavailable. Listing and rate data are illustrative, not live.

Photo URLs remain unchanged. If a photo host is unavailable, a labeled local illustration appears instead. Photo access needs `images.pexels.com`, `images.unsplash.com`, and `plus.unsplash.com`.

Run `npm run build`, `npx tsc --noEmit`, and `CI=true npm test -- --watchAll=false --runInBand` to validate. The custom Jest resolver supports React Router 7's public export paths with CRA's Jest 27 runner.

## 🛠️ Tech Stack

-   **React 18:** Component-based UI library.
-   **TypeScript:** Type-safe JavaScript for robust code.
-   **Tailwind CSS:** Utility-first CSS framework for styling.
-   **Framer Motion:** Library for production-ready animations.
-   **Lucide React:** Consistent and beautiful icon set.
-   **Craco:** Configuration override for Create React App.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/sandivd/homeNest.git
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Start the development server:**
    ```sh
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🧑‍💻 Development Journey

This project was built using a "Vibe Coding" approach, leveraging AI to rapidly prototype and refine features.

**Recent Major Updates:**
-   **UI Overhaul:** Implemented a rounded frame design and glassmorphism navbar.
-   **Feature Expansion:** Added Rent and Mortgage pages to make the platform a one-stop shop.
-   **Deep Dive Data:** Enhanced property data models to include realistic history and school info.

## 🧩 Future Roadmap

-   **Backend Integration:** Connect to a Node.js/Express backend for real data persistence.
-   **Map View:** Integrate Google Maps or Mapbox for a map-based search experience.
-   **User Dashboard:** Expand the profile section into a full dashboard for saving favorites and searches.
