const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Load client secrets from a local file.
const KEYFILEPATH = path.join(__dirname, '../lucky-lead-458623-k7-55c1421c3b03.json'); // Update with your JSON file path
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; // Scope for Sheets API

async function appendDataToSheet(data) {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const request = {
        spreadsheetId: '1nCuXO-dPbwbHf4gpKrKmjUQ1WSDMj_cUd-gfrl4DvoM', // Replace with your Google Sheet ID
        range: 'Sheet1!A:D',
        valueInputOption: 'RAW',
        resource: {
            values: [data], // Data to append
        },
    };

    console.log('Appending to sheet:', request);
    try {
        const response = await sheets.spreadsheets.values.append(request);
        console.log('Data appended:', response.data);
    } catch (error) {
        console.error('Error appending data:', error);
    }
};

async function isDuplicateEmailOrPhone(email, phone) {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const request = {
        spreadsheetId: '1nCuXO-dPbwbHf4gpKrKmjUQ1WSDMj_cUd-gfrl4DvoM',
        range: 'Sheet1!A:D',
    };
    try {
        const response = await sheets.spreadsheets.values.get(request);
        const rows = response.data.values || [];
        console.log('Fetched rows:', rows);
        console.log('Checking for email:', email, 'and phone:', phone);
        // Skip header row if present
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const rowPhone = row[2] ? row[2].trim() : '';
            const rowEmail = row[3] ? row[3].trim().toLowerCase() : '';
            if ((rowEmail && rowEmail === email.trim().toLowerCase()) || (rowPhone && rowPhone === phone.trim())) {
                console.log('Duplicate found at row', i + 1, ':', row);
                return true;
            }
        }
        console.log('No duplicate found.');
        return false;
    } catch (error) {
        console.error('Error checking for duplicates:', error);
        // Fail safe: allow registration if error, but you may want to handle differently
        return false;
    }
}

// Uncomment to test manually
// (async () => {
//     const result = await isDuplicateEmailOrPhone('mostafakhalifaa1212@gmail.com', '+201550881126');
//     console.log('Test duplicate result:', result);
// })();

module.exports = { appendDataToSheet, isDuplicateEmailOrPhone };
