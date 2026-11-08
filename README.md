# HomeNest

A real estate UI project for browsing homes and rentals, built with React, TypeScript, and Tailwind CSS.

[Live demo](https://sandivd.github.io/homeNest/)

You can search by location, filter and sort listings, save homes, and open property details with price history charts, tax records, school information, and mortgage estimates. There are separate Buy and Rent pages, a mortgage information page, and light and dark themes.

This is a front-end demo with sample listings and rates. Accounts, saved homes, and tour plans use browser storage. Tour plans aren't sent to an agent, and the location overview isn't a geographic map.

## Run locally

```sh
git clone https://github.com/sandivd/homeNest.git
cd homeNest
npm ci
npm start
```

Open http://localhost:3000/homeNest/.

## Checks

```sh
npm run build
npx tsc --noEmit
CI=true npm test -- --watchAll=false --runInBand
```

Browser checks run against the production build: `npx playwright install chromium`, then `npm run test:browser`. These also run before deployment.

The app uses Create React App with CRACO and deploys to GitHub Pages through the workflow in `.github/workflows/deploy.yml`.
