/*
  Diagnostic script: POST a sample payload to your Apps Script Web App.

  Usage (PowerShell):
    node scripts/test-appsscript.js

  It reads GOOGLE_SHEETS_WEBAPP_URL from process.env.
*/

import fs from "node:fs";
import path from "node:path";

const readEnvFile = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const lines = raw.split(/\r?\n/);
    const out = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx <= 0) continue;
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      out[key] = val;
    }
    return out;
  } catch {
    return {};
  }
};

const cwd = process.cwd();
const envLocal = readEnvFile(path.join(cwd, ".env.local"));
const env = readEnvFile(path.join(cwd, ".env"));

const url =
  process.env.GOOGLE_SHEETS_WEBAPP_URL ||
  envLocal.GOOGLE_SHEETS_WEBAPP_URL ||
  env.GOOGLE_SHEETS_WEBAPP_URL;

if (!url) {
  console.error("Missing GOOGLE_SHEETS_WEBAPP_URL (set it in .env.local/.env or in the shell env)");
  process.exit(1);
}

const payload = {
  form: "diag-test",
  name: "Diag Test",
  email: "diag@example.com",
  phone: "9876543210",
  submittedAt: new Date().toISOString(),
};

(async () => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();

  console.log("URL:", url);
  console.log("STATUS:", res.status);
  console.log("CONTENT-TYPE:", contentType);
  console.log("BODY (first 400 chars):\n", text.slice(0, 400));
})();
