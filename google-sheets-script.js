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

/**
 * GET handler — returns anonymized, aggregated analytics.
 * No names or dates of birth are sent to the client.
 */
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  // Skip header row
  var rows = data.slice(1);
  var total = rows.length;

  var byAptitude = {};
  var byTheme = {};
  var byAgeGroup = {};
  var dateCounts = {};

  var now = new Date();

  for (var i = 0; i < rows.length; i++) {
    var dob = rows[i][1];       // Column B: Date of Birth
    var timestamp = rows[i][2]; // Column C: Timestamp
    var aptitude = rows[i][3];  // Column D: Aptitude
    var theme = rows[i][4];     // Column E: Theme

    // Count by aptitude
    if (aptitude) {
      byAptitude[aptitude] = (byAptitude[aptitude] || 0) + 1;
    }

    // Count by theme
    if (theme) {
      byTheme[theme] = (byTheme[theme] || 0) + 1;
    }

    // Compute age group from DOB (no DOB sent to client)
    if (dob) {
      var birth = new Date(dob);
      var age = now.getFullYear() - birth.getFullYear();
      var m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        age--;
      }
      var group = age <= 11 ? 'elementary' : (age <= 14 ? 'jrHigh' : 'highSchool');
      byAgeGroup[group] = (byAgeGroup[group] || 0) + 1;
    }

    // Count by date (YYYY-MM-DD from timestamp)
    if (timestamp) {
      var d = new Date(timestamp);
      var dateKey = d.toISOString().split('T')[0];
      dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;
    }
  }

  // Convert dateCounts to sorted array
  var byDate = Object.keys(dateCounts).sort().map(function(key) {
    return { date: key, count: dateCounts[key] };
  });

  var result = {
    total: total,
    byAptitude: byAptitude,
    byTheme: byTheme,
    byAgeGroup: byAgeGroup,
    byDate: byDate
  };

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
