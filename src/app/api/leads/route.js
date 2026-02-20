import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-info";

const LEAD_WINDOW_MS = 60_000;
const LEAD_ATTEMPT_LIMIT = 20;

const toText = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return String(value);
};

const trimOrEmpty = (value) => toText(value).trim();

const truncate = (value, maxLen = 4000) => {
  const text = toText(value);
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen);
};

export async function POST(request) {
  const ip = await getClientIp(request);

  const isAllowed = rateLimit({
    key: `leads:${ip}`,
    limit: LEAD_ATTEMPT_LIMIT,
    windowMs: LEAD_WINDOW_MS,
  });

  if (!isAllowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const scriptUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!scriptUrl) {
    return NextResponse.json(
      { error: "Google Sheets integration is not configured (missing GOOGLE_SHEETS_WEBAPP_URL)." },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const form = trimOrEmpty(body?.form || body?.source);
  if (!form) {
    return NextResponse.json({ error: "Missing required field: form" }, { status: 400 });
  }

  const nowIso = new Date().toISOString();
  const key = process.env.GOOGLE_SHEETS_WEBAPP_KEY || "";

  const payload = {
    ...body,
    form,
    submittedAt: nowIso,
    ip,
    userAgent: truncate(request.headers.get("user-agent") || ""),
    referer: truncate(request.headers.get("referer") || ""),
    key: key ? key : undefined,
  };

  for (const [k, v] of Object.entries(payload)) {
    if (typeof v === "string") {
      payload[k] = truncate(v);
    }
  }

  try {
    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") || "";
    const text = await upstream.text();

    const looksLikeHtml = contentType.includes("text/html") || /^\s*</.test(text);
    const looksLikeGoogleLogin = /accounts\.google\.com\/(text|signin)|google\.com\/v3\/signin|Sign in/i.test(text);
    const looksLikeDriveError = /unable to open the file at present|Page not found/i.test(text);

    const isProd = process.env.NODE_ENV === "production";

    const devDiagnostics = !isProd
      ? {
          upstreamStatus: upstream.status,
          upstreamContentType: contentType,
          upstreamBodyPreview: text.slice(0, 240),
        }
      : undefined;

    if (!upstream.ok) {
      console.error("POST /api/leads: Apps Script error", upstream.status, text);

      if (looksLikeHtml || looksLikeGoogleLogin || looksLikeDriveError) {
        return NextResponse.json(
          {
            error:
              "Google Apps Script Web App is not publicly accessible. Re-deploy it as a Web app with access set to 'Anyone' and use the /exec URL.",
            ...devDiagnostics,
          },
          { status: 502 },
        );
      }

      return NextResponse.json(
        {
          error: "Unable to record lead",
          ...devDiagnostics,
        },
        { status: 502 },
      );
    }

    if (looksLikeHtml || looksLikeGoogleLogin || looksLikeDriveError) {
      console.error("POST /api/leads: received HTML from Apps Script", { contentType });
      return NextResponse.json(
        {
          error:
            "Google Apps Script Web App returned an HTML page (likely auth redirect). Re-deploy it as a Web app with access set to 'Anyone' and use the /exec URL.",
          ...devDiagnostics,
        },
        { status: 502 },
      );
    }

    try {
      const json = JSON.parse(text);
      if (json && json.ok === false) {
        return NextResponse.json({ error: json.error || "Unable to record lead" }, { status: 502 });
      }
    } catch {
      // Apps Script may return plain text; treat as success if upstream OK.
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/leads failed", error);
    return NextResponse.json({ error: "Unable to reach Google Sheets endpoint" }, { status: 502 });
  }
}
