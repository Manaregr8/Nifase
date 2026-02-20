/**
 * Google Apps Script Web App that appends website form submissions into a Google Sheet.
 *
 * Setup (once):
 * 1) Create a Google Sheet (e.g. "NIFASE Leads").
 * 2) Extensions -> Apps Script, paste this file.
 * 3) Set Script Properties (Project Settings -> Script properties):
 *    - SPREADSHEET_ID: your sheet id
 *    - SHEET_NAME: (optional) default "Leads"
 *    - WEBAPP_KEY: (optional) shared secret
 * 4) Deploy -> New deployment -> Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5) Copy the Web app URL and set it in Next.js as GOOGLE_SHEETS_WEBAPP_URL.
 */

const DEFAULT_SHEET_NAME = "Leads";

function getProp_(name) {
  return PropertiesService.getScriptProperties().getProperty(name);
}

function json_(obj, statusCode) {
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  // Note: ContentService doesn't reliably support custom headers (like CORS).
  // That's why this repo forwards requests server-side via /api/leads.
  return out;
}

function ensureHeaderRow_(sheet, headers) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 0) return;
  sheet.appendRow(headers);
  sheet.setFrozenRows(1);
}

function doGet() {
  return json_({ ok: true, message: "Lead collector is running" });
}

function doPost(e) {
  try {
    const spreadsheetId = getProp_("SPREADSHEET_ID");
    if (!spreadsheetId) {
      return json_({ ok: false, error: "Missing script property: SPREADSHEET_ID" });
    }

    const sheetName = getProp_("SHEET_NAME") || DEFAULT_SHEET_NAME;

    let payload = {};
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "";
    if (raw) {
      try {
        payload = JSON.parse(raw);
      } catch (parseErr) {
        return json_({ ok: false, error: "Invalid JSON" });
      }
    }

    const requiredKey = getProp_("WEBAPP_KEY") || "";
    if (requiredKey) {
      const incomingKey = payload && payload.key ? String(payload.key) : "";
      if (incomingKey !== requiredKey) {
        return json_({ ok: false, error: "Unauthorized" });
      }
    }

    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    const headers = [
      "submittedAt",
      "form",
      "name",
      "email",
      "phone",
      "subject",
      "course",
      "message",
      "pageUrl",
      "referer",
      "ip",
      "userAgent",
      "contextTitle",
      "defaultCourseSlug",
    ];

    ensureHeaderRow_(sheet, headers);

    const row = headers.map(function (h) {
      const v = payload && payload[h] !== undefined && payload[h] !== null ? payload[h] : "";
      if (typeof v === "object") return JSON.stringify(v);
      return String(v);
    });

    sheet.appendRow(row);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}
