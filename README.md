# A2 Biology Landing Page - Mostafa Khalifa

This project is a fully functional, responsive landing page for "A2 Biology | Mostafa Khalifa," designed to attract students, offer free resources, and provide information about biology courses. It includes a frontend built with HTML, CSS, and JavaScript, and an optional Node.js/Express backend for handling registrations for free notes.

## Features

*   **Responsive Design:** Adapts to various screen sizes (desktop, tablet, mobile).
*   **Fixed Header & Navigation:** Easy navigation with anchor links to key sections.
*   **Hero Section:** Engaging full-screen hero image with overlay text and a call-to-action.
*   **About Section:** Information about the tutor, including bio, photo, social links, and credentials.
*   **Free Notes Registration:**
    *   Dedicated section for users to register for a free PDF copy of Chapter 1 notes.
    *   Modern UI with floating labels for form fields.
    *   Client-side validation.
    *   Backend API (`/api/register`) to save registration data to a JSON file on the server.
    *   Automatic PDF download upon successful registration.
*   **Course Features Section:** Highlights key benefits of the course with feature cards.
*   **Countdown Timer:** Dynamic countdown to a specific date (e.g., live class start).
*   **Pop-Up Modal:** Appears on page load with important announcements.
*   **Dark Theme:** A modern, cool, dark-themed user interface.
*   **Custom Fonts:** Utilizes "Gotham" and "Rubik" font families (with web-safe fallbacks).
*   **Contact & Footer:** Social media links, contact information, copyright, and a privacy policy page.
*   **Privacy Policy Page:** Basic placeholder page for privacy terms.

## File Structure Overview

```
.
├── README.md               // This file
├── index.html              // Main landing page HTML
├── privacy.html            // Privacy policy page
├── assets/                 // Static assets
│   ├── hero.jpg            // Hero section background image (placeholder)
│   ├── pfp.jpg             // Tutor's profile picture
│   └── free_chapter1.pdf   // Placeholder PDF for free notes
├── css/
│   └── styles.css          // Main stylesheet
├── js/
│   ├── main.js             // Main JavaScript for interactivity (modal, form submission)
│   └── countdown.js        // JavaScript for the countdown timer
└── server/                 // Backend Node.js application
    ├── data/
    │   └── registrations.json // Stores registration data (created automatically)
    ├── node_modules/       // Server dependencies (created by npm install)
    ├── package.json        // Server dependencies and scripts
    ├── package-lock.json   // Lockfile for server dependencies
    └── server.js           // Express server logic
```

## Getting Started

### Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
*   **For the backend functionality:** Node.js and npm (Node Package Manager) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

### Setup and Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Backend Setup (Required to save form registrations):**
    *   Navigate to the server directory:
        ```bash
        cd server
        ```
    *   Install server dependencies:
        ```bash
        npm install
        ```
    *   Return to the root directory:
        ```bash
        cd ..
        ```

## Running the Project

There are two ways to run the project:

### 1. Frontend Only (Static Site)

*   Simply open the `index.html` file directly in your web browser.
*   **Functionality Note:** All frontend features (animations, countdown, modal, PDF download trigger) will work. However, the "Free Notes" registration form **will not save data** as this requires the backend server. It will attempt to POST to `/api/register` which will fail if the server isn't running.

### 2. Full Stack (Frontend + Backend Server)

This enables the "Free Notes" registration form to save data.

1.  **Start the Node.js server:**
    *   Open your terminal.
    *   Navigate to the `server` directory:
        ```bash
        cd server
        ```
    *   Start the server using npm:
        ```bash
        npm start
        ```
    *   You should see a message like `Server running on http://localhost:3000`.

2.  **Access the landing page:**
    *   Open your web browser and go to `http://localhost:3000`.

The server will serve the `index.html` page and handle API requests from the registration form.

## Backend API

*   **`POST /api/register`**:
    *   Accepts JSON payload with user registration details: `name`, `email`, `phone`, `school`, `interest`.
    *   Saves the registration data along with a timestamp to `server/data/registrations.json`.
    *   Returns a JSON response indicating success or failure.

## Customization

*   **Countdown Timer:** The target date for the countdown is set in `js/countdown.js`. Modify the `countDownDate` variable.
*   **Hero Image:** Replace `assets/hero.jpg` with your desired image.
*   **Tutor Image:** Replace `assets/pfp.jpg` with your desired image.
*   **Free Notes PDF:** Replace `assets/free_chapter1.pdf` with the actual PDF file.
*   **Text Content:** All text content can be directly edited in `index.html` and `privacy.html`.
*   **Styling:** Colors, fonts (ensure availability), and layout can be modified in `css/styles.css`.

## Deployment

### Static Site (Frontend Only)

*   If you only need the frontend (and the registration form doesn't need to save data, or you modify it to point to a third-party service), you can deploy the root directory contents (`index.html`, `css/`, `js/`, `assets/`, `privacy.html`) to any static web hosting service like:
    *   GitHub Pages
    *   Netlify
    *   Vercel
    *   AWS S3

### Full Stack (with Node.js Backend)

*   To deploy the full application including the backend (for form data saving), you'll need a platform that supports Node.js applications. Popular choices include:
    *   **Heroku:** (Note: Heroku's free tier has changed, check current offerings)
    *   **Vercel:** Supports Node.js serverless functions which can be adapted from the Express server.
    *   **Render**
    *   **AWS Elastic Beanstalk, Google Cloud App Engine, Azure App Service**

*   **Key Considerations for Backend Deployment:**
    *   The server is configured to use `process.env.PORT` or default to `3000`. Hosting platforms usually set this environment variable automatically.
    *   The `server/data/registrations.json` file acts as a simple database. For production use on platforms with ephemeral filesystems (like Heroku's free dynos or serverless environments), this file may be reset on deploys or instance restarts. For persistent data, consider using a database service (e.g., MongoDB Atlas, Supabase, Firebase, PostgreSQL).
    *   Ensure your `server/package.json` has the correct `start` script (`"start": "node server.js"`), which it does.

---

This README provides a comprehensive guide to understanding, setting up, and running the A2 Biology landing page project.
