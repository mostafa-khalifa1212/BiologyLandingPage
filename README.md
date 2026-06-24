# A2 Biology Landing Page - Mostafa Khalifa

A modern, fully responsive landing page for "A2 Biology | Mostafa Khalifa," designed to attract students, offer free resources, and provide information about biology courses. The project features a dynamic frontend and a Node.js/Express backend that saves registration data directly to Google Sheets using a Google Service Account.

## Features

*   **Responsive Design:** Works on desktop, tablet, and mobile.
*   **Fixed Header & Navigation:** Smooth anchor links to all sections.
*   **Hero Section:** Eye-catching hero video, overlay text, and call-to-action.
*   **About Section:** Tutor bio, photo, social links, and credentials.
*   **Free Notes Registration:**
    *   Modern UI with floating labels and server-side validation.
    *   Backend API (`/api/register`) saves registration data to Google Sheets.
    *   Duplicate prevention: users cannot register with the same email or phone twice.
*   **Course Features Section:** Highlights course benefits.
*   **Countdown Timer:** Dynamic countdown to live class start.
*   **Pop-Up Modal:** Announcement on page load.
*   **Dark Theme:** Modern, cool, dark-themed UI.
*   **Custom Fonts:** Uses "Inter" and "Rubik" fonts.
*   **Contact & Footer:** Social links, contact info, copyright, privacy policy.
*   **Privacy Policy Page:** Basic privacy terms.

## File Structure Overview

```
.
├── README.md                // This file
├── index.html               // Main landing page
├── privacy.html             // Privacy policy
├── assets/                  // Images, PDFs, etc.
│   ├── hero.jpg
│   ├── pfp.jpeg
│   └── free_chapter1.pdf
├── css/
│   └── styles.css
├── js/
│   ├── main.js              // Interactivity, form, modal
│   └── countdown.js         // Countdown timer
└── server/                  // Node.js backend
    ├── server.js            // Express server
    ├── package.json         // Backend dependencies
    ├── .env.example         // Example environment file (add your real .env here)
    └── ...
```

## Getting Started

### Prerequisites

*   Modern web browser (Chrome, Firefox, Safari, Edge)
*   **For backend:** Node.js and npm ([Download here](https://nodejs.org/))

### Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Backend Setup (Required for registration form):**
   - Go to the backend directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Copy `.env.example` to `.env` and fill in your Google Service Account credentials and Google Sheet ID:
     ```bash
     cp .env.example .env
     # Edit .env and add your real values
     ```
   - The `.env` file **must** be in the `/server` directory.

## Environment Variables

The backend requires a `.env` file in `/server` with the following variables:

```
GOOGLE_TYPE=service_account
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...your_key...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_CLIENT_X509_CERT_URL=your_client_x509_cert_url
GOOGLE_UNIVERSE_DOMAIN=googleapis.com
GOOGLE_SHEET_ID=your_google_sheet_id
```
- Use `.env.example` as a template.
- **Never commit your real `.env` file.**

## Running the Project

### 1. Frontend Only (Static Site)
- Open `index.html` in your browser.
- Registration form will **not** save data unless backend is running.

### 2. Full Stack (Frontend + Backend)
- From the `/server` directory, run:
  ```bash
  npm start
  ```
- Visit [http://localhost:3000](http://localhost:3000) in your browser.
- The backend serves the landing page and handles `/api/register` requests, saving data to Google Sheets.

## Deployment

### Static Site (Frontend Only)
- Deploy `index.html`, `css/`, `js/`, `assets/`, and `privacy.html` to any static host (GitHub Pages, Netlify, Vercel, AWS S3, etc.).
- Registration form will not work without backend.

### Full Stack (with Node.js Backend)
- Deploy the `/server` directory to a Node.js host (Render, Vercel, Heroku, AWS, etc.).
- **Set all environment variables in your host's dashboard (do not upload `.env`).**
- The backend will connect to Google Sheets using your credentials.

## Customization
- **Countdown Timer:** Edit `js/countdown.js` for your event date.
- **Images:** Replace files in `assets/` as needed.
- **Text/Content:** Edit `index.html` and `privacy.html`.
- **Styling:** Edit `css/styles.css`.

## Notes
- The backend no longer saves registrations to a local JSON file; all data is sent to Google Sheets.
- Duplicate registrations (by email or phone) are prevented server-side.
- For local development, keep your `.env` in `/server` and restart the server after changes.

---

This README is up to date with the `FinalTouches` branch and reflects the current state of the project.
