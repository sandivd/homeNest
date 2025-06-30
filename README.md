# DreamHome - Real Estate Listing Page

DreamHome is a modern, responsive web application for browsing real estate listings. It was built to demonstrate a clean user interface using React, TypeScript, and Tailwind CSS. The application features dynamic search, filtering capabilities, and a "favorites" system.

*(Feel free to replace this with your own screenshot!)*

## Features

-   **Interactive Property Cards:** Clean, modern cards to display property information.
-   **Dynamic Search:** Search for properties by title, city, or address.
-   **Advanced Filtering:** Filter listings by property type (House, Apartment, Condo) and price range.
-   **Favorites System:** Click the heart icon to add or remove a property from your favorites.
-   **Responsive Design:** The layout is optimized for both desktop and mobile devices.
-   **Featured Properties:** A dedicated section to highlight featured listings.

## Development Approach: Vibe Coding

This project was developed using a method known as **Vibe Coding**. Instead of manually writing every line of React and Tailwind CSS, the development process involved giving high-level instructions and refinement prompts to an AI assistant, which then generated the code.

> Vibe coding is a modern approach to software development where you use natural language—either spoken or typed—to describe what you want a program to do, and then an AI (usually a large language model, or LLM) generates the actual code for you. Instead of manually writing every line of code, you give the AI high-level instructions or prompts, and it handles the technical implementation.

This approach allowed for rapid prototyping and iteration, focusing on the overall structure and functionality of the application.

## Technologies Used

-   **React:** A JavaScript library for building user interfaces.
-   **TypeScript:** Adds static typing to JavaScript to improve code quality and developer experience.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
-   **Lucide React:** A beautiful and consistent icon library.
-   **Create React App:** Used as the initial project boilerplate.
-   **Craco:** Used to override the default Create React App configuration to enable Tailwind CSS.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your computer.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repository-name.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd your-repository-name
    ```

3.  **Install the dependencies:**
    This single command will install React, Tailwind CSS, Lucide React, Craco, and all other necessary packages defined in `package.json`.
    ```sh
    npm install
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload when you make changes.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## How to Modify the Property Listings

All property data is currently hard-coded in a mock array.

1.  **Open the main component file:** `src/zillowWebsiteOpus4.tsx`
2.  **Locate the `mockProperties` array:** This array contains all the property objects.
3.  **Add or edit a property:** You can add a new object to the array or modify an existing one. Ensure each property has a unique `id`.

**Example of a Property Object:**

```javascript
{
  id: 10, // Must be unique!
  title: "Rustic Countryside Cabin",
  price: 350000,
  address: "789 Forest Lane",
  city: "Asheville",
  state: "NC",
  type: "house",
  bedrooms: 2,
  bathrooms: 1,
  sqft: 1100,
  imageUrl: 'your-image-url-here.jpg',
  featured: false // Set to `true` to show in the "Featured" section
}
