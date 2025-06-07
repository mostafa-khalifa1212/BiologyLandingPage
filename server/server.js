const express = require('express');
const path = require('path');
const { appendDataToSheet, isDuplicateEmailOrPhone } = require('../js/sheets'); // Adjust path if needed

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the parent directory (root of the project: /app)
// This allows access to index.html, css, js, assets folders
app.use(express.static(path.join(__dirname, '..')));

// API endpoint for form registration
app.post('/api/register', async (req, res) => {
    console.log('Received registration:', req.body);
    const { name, email, phone, } = req.body;
    const timestamp = new Date().toISOString();

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required.' });
    }

    try {
        console.log('Checking for duplicate with email:', email, 'and phone:', phone);
        const isDuplicate = await isDuplicateEmailOrPhone(email, phone);
        console.log('Duplicate check result:', isDuplicate);
        if (isDuplicate) {
            console.log('Duplicate detected for email or phone:', email, phone);
            return res.status(409).json({ message: 'You have already registered with this email or phone number.' });
        }
        console.log('No duplicate found, proceeding to append data.');
        await appendDataToSheet([timestamp, name, phone, email]);
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({ message: 'Error saving registration data.' });
    }
});

// Basic route for root to serve index.html from the parent directory
// This is generally handled by express.static serving 'index.html' by default from the static root,
// but this explicit route can be useful for clarity or specific handling.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
