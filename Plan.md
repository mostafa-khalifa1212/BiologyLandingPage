
## Google Sheets Integration Details

### Free Notes Registration Sheet
- Sheet: [Free Notes Sheet](https://docs.google.com/spreadsheets/d/1nCuXO-dPbwbHf4gpKrKmjUQ1WSDMj_cUd-gfrl4DvoM/edit?gid=0#gid=0)
- Fields: TimeStamp, Student's_Name, Phone_Number, Email
- On form submit, send data to a Google Apps Script Webhook or Sheets API endpoint that appends a new row with the correct fields and timestamp.

### Course Registration Sheet (Future)
- Sheet: [Course Registration Sheet](https://docs.google.com/spreadsheets/d/10vlKnVFdhQ__htHhJiMP0xbwuw0DgCG7g908BuYhVVA/edit?gid=1310120683#gid=1310120683)
- Fields: Timestamp, Student's_Full_Name, Student's_Phone_Number, Parent's_Phone_Number, Grade, School, Retake?, Student's_Email, Subject
- On course registration form submit, send data to a similar webhook or API endpoint.

### Timestamp Handling
- Always use server-side timestamp (e.g., `new Date().toISOString()` in Node.js or Apps Script) to ensure accuracy.

---

## How to Implement Google Sheets Integration
1. **Google Apps Script Webhook (Recommended for Simplicity):**
   - Create a Google Apps Script bound to the target sheet.
   - Publish as a web app (deploy as "Anyone, even anonymous").
   - Accept POST requests and append data to the sheet.
   - Update backend `/api/register` to forward registration data to this webhook.

2. **Google Sheets API (Advanced, Secure):**
   - Create a Google Cloud project and enable Sheets API.
   - Use a Service Account and credentials JSON.
   - Use `googleapis` npm package in Node.js backend to append rows.

---

## Example Apps Script Webhook (for Free Notes Sheet)
```js
function doPost(e) {
  var sheet = SpreadsheetApp.openById('1nCuXO-dPbwbHf4gpKrKmjUQ1WSDMj_cUd-gfrl4DvoM').getSheets()[0];
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.email
  ]);
  return ContentService.createTextOutput(JSON.stringify({result: 'success'})).setMimeType(ContentService.MimeType.JSON);
}
```

---

## Next Steps (Actionable)
1. Set up the Apps Script webhook for the Free Notes sheet.
2. Update backend to POST registration data to the webhook.
3. Test end-to-end registration and data entry.
4. Polish UI/UX and deploy.
