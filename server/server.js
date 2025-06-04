const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the parent directory (root of the project: /app)
// This allows access to index.html, css, js, assets folders
app.use(express.static(path.join(__dirname, '..')));

const registrationsFilePath = path.join(__dirname, 'data', 'registrations.json');
const dataDir = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// API endpoint for form registration
app.post('/api/register', (req, res) => {
    const newRegistration = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        school: req.body.school,
        interest: req.body.interest,
        timestamp: new Date().toISOString()
    };

    // Basic validation
    if (!newRegistration.name || !newRegistration.email) {
        return res.status(400).json({ message: 'Name and Email are required.' });
    }

    fs.readFile(registrationsFilePath, 'utf8', (err, data) => {
        let registrations = [];
        if (err) {
            // If file doesn't exist (ENOENT) or other read error, we'll create a new file.
            if (err.code !== 'ENOENT') {
                console.error('Error reading registrations file:', err);
                // For errors other than file not found, it might be critical.
                // Depending on policy, you might not want to overwrite.
                // However, for this setup, we'll proceed to create/overwrite.
            }
        } else {
            // If file exists, try to parse it.
            try {
                registrations = JSON.parse(data);
                if (!Array.isArray(registrations)) {
                    console.warn('Registrations file does not contain a valid JSON array. Initializing with new data.');
                    registrations = []; // Initialize if not an array
                }
            } catch (parseErr) {
                console.error('Error parsing registrations.json:', parseErr, '. File content will be overwritten with new data.');
                // If parsing fails (e.g. corrupt file), initialize with an empty array.
                // Consider backing up the corrupt file here in a real scenario.
                registrations = [];
            }
        }

        registrations.push(newRegistration);

        fs.writeFile(registrationsFilePath, JSON.stringify(registrations, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to registrations.json:', writeErr);
                return res.status(500).json({ message: 'Error saving registration data.' });
            }
            res.status(201).json({ message: 'Registration successful!', data: newRegistration });
        });
    });
});

// Basic route for root to serve index.html from the parent directory
// This is generally handled by express.static serving 'index.html' by default from the static root,
// but this explicit route can be useful for clarity or specific handling.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Initialize registrations.json with an empty array if it doesn't exist or is invalid
    fs.readFile(registrationsFilePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') { // File doesn't exist
                fs.writeFile(registrationsFilePath, JSON.stringify([], null, 2), (writeErr) => {
                    if (writeErr) console.error('Error initializing empty registrations.json:', writeErr);
                    else console.log('Initialized empty registrations.json.');
                });
            } else {
                console.error('Error reading registrations.json on startup:', err);
            }
        } else {
            try {
                const parsedData = JSON.parse(data);
                if (!Array.isArray(parsedData)) {
                    throw new Error('Not a JSON array.');
                }
                 console.log('registrations.json is valid.');
            } catch (parseErr) {
                console.warn('registrations.json is invalid or corrupt on startup. Initializing with empty array.', parseErr);
                fs.writeFile(registrationsFilePath, JSON.stringify([], null, 2), (writeErr) => {
                    if (writeErr) console.error('Error re-initializing registrations.json:', writeErr);
                    else console.log('Re-initialized registrations.json to empty array.');
                });
            }
        }
    });
});
