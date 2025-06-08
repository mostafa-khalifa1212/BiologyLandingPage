const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getGoogleCredentialsFromEnv() {
    return {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
        spreadsheetId: process.env.GOOGLE_SHEET_ID
    };
}

async function appendDataToSheet(data) {
    const auth = new google.auth.GoogleAuth({
        credentials: getGoogleCredentialsFromEnv(),
        scopes: SCOPES,
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const request = {
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:D',
        valueInputOption: 'RAW',
        resource: {
            values: [data],
        },
    };
    try {
        const response = await sheets.spreadsheets.values.append(request);
        console.log('Data appended:', response.data);
    } catch (error) {
        console.error('Error appending data:', error);
        throw error; // Re-throw to be caught by the main handler
    }
}

async function isDuplicateEmailOrPhone(email, phone) {
    const auth = new google.auth.GoogleAuth({
        credentials: getGoogleCredentialsFromEnv(),
        scopes: SCOPES,
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const request = {
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:D',
    };
    try {
        const response = await sheets.spreadsheets.values.get(request);
        const rows = response.data.values || [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const rowPhone = row[2] ? row[2].trim() : '';
            const rowEmail = row[3] ? row[3].trim().toLowerCase() : '';
            if ((rowEmail && rowEmail === email.trim().toLowerCase()) || (rowPhone && rowPhone === phone.trim())) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error checking for duplicates:', error);
        throw error; // Re-throw to be caught by the main handler
    }
}

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { name, email, phone } = JSON.parse(event.body);
        const timestamp = new Date().toISOString();

        if (!name || !email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Name and Email are required.' }),
            };
        }

        const isDuplicate = await isDuplicateEmailOrPhone(email, phone);
        if (isDuplicate) {
            return {
                statusCode: 409,
                body: JSON.stringify({ message: 'You have already registered with this email or phone number.' }),
            };
        }

        await appendDataToSheet([timestamp, name, phone, email]);

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Registration successful!' }),
        };
    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving registration data.', error: error.message }),
        };
    }
}; 