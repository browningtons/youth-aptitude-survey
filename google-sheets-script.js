/**
 * Google Apps Script — Deploy as Web App to receive survey completions.
 *
 * Schema (privacy-first — no full names, no DOB):
 *   Column A: Initial      (first letter of first name only, uppercased)
 *   Column B: Age Group    (elementary | jrHigh | highSchool — chosen by student)
 *   Column C: Timestamp    (ISO 8601)
 *   Column D: Aptitude     (top RIASEC-inspired profile)
 *   Column E: Theme        (visual skin key)
 *   Column F: Duration Sec (integer seconds from first question to results — optional)
 *
 * Setup:
 * 1. Create a new Google Sheet
 * 2. Add headers in Row 1: Initial | Age Group | Timestamp | Aptitude | Theme | Duration Sec
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
 *   Previous schema was: Name | Date of Birth | Timestamp | Aptitude | Theme.
 *   Duration Sec is new — add the header and leave the column empty for old
 *   rows; doGet excludes rows with no duration from the average. Legacy DOB
 *   rows also still work: doGet falls back to computing an age group from a
 *   DOB in column B when the cell isn't already an age-group string.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.initial || '',
    data.ageGroup || '',
    data.timestamp || new Date().toISOString(),
    data.aptitude || '',
    data.theme || '',
    // Blank (not 0) when missing so the average excludes it cleanly.
    typeof data.durationSec === 'number' ? data.durationSec : ''
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

  // Cross-tab keyed on [ageGroup][aptitude]. Pre-seeded so every age group
  // shows up in the chart even if no one in that bracket has taken it yet.
  var APTITUDES = ['Builder', 'Thinker', 'Creator', 'Helper', 'Persuader', 'Organizer'];
  var AGE_GROUPS = ['elementary', 'jrHigh', 'highSchool'];
  var cross = {};
  for (var g = 0; g < AGE_GROUPS.length; g++) {
    cross[AGE_GROUPS[g]] = { Builder: 0, Thinker: 0, Creator: 0, Helper: 0, Persuader: 0, Organizer: 0 };
  }

  var durationTotal = 0;
  var durationCount = 0;

  var now = new Date();

  for (var i = 0; i < rows.length; i++) {
    var ageGroupCell = rows[i][1]; // Column B: Age Group (or legacy DOB)
    var timestamp = rows[i][2];    // Column C: Timestamp
    var aptitude = rows[i][3];     // Column D: Aptitude
    var theme = rows[i][4];        // Column E: Theme
    var duration = rows[i][5];     // Column F: Duration Sec (may be blank)

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
    var group = '';
    if (ageGroupCell) {
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
        // Fill the cross-tab only when both sides of the pair are present.
        if (aptitude && cross[group]) {
          cross[group][aptitude] = (cross[group][aptitude] || 0) + 1;
        }
      }
    }

    // Count by date (YYYY-MM-DD from timestamp)
    if (timestamp) {
      var d = new Date(timestamp);
      var dateKey = d.toISOString().split('T')[0];
      dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;
    }

    // Duration — skip blanks and anything non-numeric.
    if (typeof duration === 'number' && duration > 0) {
      durationTotal += duration;
      durationCount++;
    }
  }

  // Convert dateCounts to sorted array
  var byDate = Object.keys(dateCounts).sort().map(function(key) {
    return { date: key, count: dateCounts[key] };
  });

  // Cross-tab as an array of rows, one per age group, ordered elementary → highSchool.
  var byAgeGroupAptitude = AGE_GROUPS.map(function(g) {
    var row = { ageGroup: g };
    for (var a = 0; a < APTITUDES.length; a++) {
      row[APTITUDES[a]] = cross[g][APTITUDES[a]];
    }
    return row;
  });

  var result = {
    total: total,
    byAptitude: byAptitude,
    byTheme: byTheme,
    byAgeGroup: byAgeGroup,
    byDate: byDate,
    byAgeGroupAptitude: byAgeGroupAptitude,
    avgDurationSec: durationCount > 0 ? Math.round(durationTotal / durationCount) : null
  };

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
