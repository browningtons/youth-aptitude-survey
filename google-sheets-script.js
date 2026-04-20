/**
 * Google Apps Script — Deploy as Web App to receive survey completions.
 *
 * Schema (privacy-first — no full names, no DOB):
 *   Column A: Initial      (first letter of first name only, uppercased)
 *   Column B: Age Group    (elementary | jrHigh | highSchool — chosen by student)
 *   Column C: Timestamp    (ISO 8601)
 *   Column D: Aptitude     (top RIASEC-inspired profile)
 *   Column E: Theme        (visual skin key)
 *
 * Setup:
 * 1. Create a new Google Sheet
 * 2. Add headers in Row 1: Initial | Age Group | Timestamp | Aptitude | Theme
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
 *
 * Migrating from the old schema?
 *   The previous schema was: Name | Date of Birth | Timestamp | Aptitude | Theme.
 *   After pasting this updated script, create a fresh sheet (or overwrite the
 *   header row) with the new columns above. Old rows will still be counted —
 *   doGet falls back to computing age group from a DOB in column B if present,
 *   so the dashboard stays intact during the transition.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.initial || '',
    data.ageGroup || '',
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
 * No initials or timestamps are correlated in the client payload.
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
    var ageGroupCell = rows[i][1]; // Column B: Age Group (or legacy DOB)
    var timestamp = rows[i][2];    // Column C: Timestamp
    var aptitude = rows[i][3];     // Column D: Aptitude
    var theme = rows[i][4];        // Column E: Theme

    // Count by aptitude
    if (aptitude) {
      byAptitude[aptitude] = (byAptitude[aptitude] || 0) + 1;
    }

    // Count by theme
    if (theme) {
      byTheme[theme] = (byTheme[theme] || 0) + 1;
    }

    // Age group — prefer the string literal; fall back to computing from DOB
    // for rows written by the previous schema.
    if (ageGroupCell) {
      var group = '';
      if (ageGroupCell === 'elementary' || ageGroupCell === 'jrHigh' || ageGroupCell === 'highSchool') {
        group = ageGroupCell;
      } else {
        // Legacy row: ageGroupCell is a DOB. Compute group from age.
        var birth = new Date(ageGroupCell);
        if (!isNaN(birth.getTime())) {
          var age = now.getFullYear() - birth.getFullYear();
          var m = now.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
            age--;
          }
          group = age <= 11 ? 'elementary' : (age <= 14 ? 'jrHigh' : 'highSchool');
        }
      }
      if (group) {
        byAgeGroup[group] = (byAgeGroup[group] || 0) + 1;
      }
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
