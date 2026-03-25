/**
 * Google Apps Script — Deploy as Web App to receive survey completions.
 *
 * Setup:
 * 1. Create a new Google Sheet
 * 2. Add headers in Row 1: Name | Date of Birth | Timestamp | Aptitude | Theme
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code and save
 * 5. Click Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL
 * 7. Set it as VITE_SHEETS_WEBHOOK_URL in your .env file:
 *    VITE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
 * 8. For GitHub Pages, add it as a repository secret and pass it
 *    via the workflow, OR hardcode it in analytics.ts if the sheet is non-sensitive.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.name || '',
    data.dob || '',
    data.timestamp || new Date().toISOString(),
    data.aptitude || '',
    data.theme || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
